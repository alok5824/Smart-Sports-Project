const BookingModel = require("./BookingModel")
const UserModel = require("../User/UserModel")



const MatchModel = require("../Match/MatchModel");

const add = (req, res) => {
    const {
        matchId,
        userId,
        transactionId,
        seatsDetail,  // [{ rowName, seatNumbers, price }]
        paymentMode = "Upi",
        paymentStatus = "Pending"
    } = req.body;

    if (!matchId || !userId || !seatsDetail) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // 1️⃣ Fetch the match
    MatchModel.findById(matchId)
        .then(match => {
            if (!match) {
                return res.status(404).json({ success: false, message: "Match not found." });
            }

            // 2️⃣ Check if seats are already booked
            BookingModel.find({ matchId, status: "Confirmed" })
                .then(existingBookings => {
                    // Flatten all booked seats from existing bookings
                    let bookedSeatsMap = {};
                    existingBookings.forEach(booking => {
                        booking.seatsDetail.forEach(row => {
                            if (!bookedSeatsMap[row.rowName]) bookedSeatsMap[row.rowName] = [];
                            bookedSeatsMap[row.rowName].push(...row.seatNumbers);
                        });
                    });

                    // Check for conflicts with requested seats
                    for (let row of seatsDetail) {
                        const booked = bookedSeatsMap[row.rowName] || [];
                        const conflict = row.seatNumbers.some(seat => booked.includes(seat));
                        if (conflict) {
                            return res.status(400).json({ success: false, message: "Some seats are already booked." });
                        }
                    }

                    // 3️⃣ Calculate total amount
                    let totalAmount = 0;
                    seatsDetail.forEach(row => {
                        totalAmount += row.price * row.seatNumbers.length;
                    });

                    // 4️⃣ Create booking
                    BookingModel.create({
                        matchId,
                        userId,
                        seatsBooked: seatsDetail.reduce((sum, r) => sum + r.seatNumbers.length, 0),
                        seatsDetail,
                        transactionId,
                        totalAmount,
                        paymentMode,
                        paymentStatus,
                        status: "Confirmed"
                    })
                        .then(booking => {
                            // 5️⃣ Update match seatLayout
                            if (match.seatLayout && match.seatLayout.length > 0) {
                                match.seatLayout = match.seatLayout.map(row => {
                                    const bookedRow = seatsDetail.find(r => r.rowName === row.rowName);
                                    if (bookedRow) {
                                        const existing = (row.bookedSeats || []).map(Number);
                                        const incoming = bookedRow.seatNumbers.map(Number);
                                        row.bookedSeats = Array.from(new Set([...existing, ...incoming]));
                                    }
                                    return row;
                                });

                                match.markModified("seatLayout"); // 👈 REQUIRED

                                match.save()
                                    .then(() => res.status(201).json({ success: true, data: booking, message: "Booking successful" }))
                                    .catch(err => res.status(500).json({ success: false, message: "Booking saved but failed to update match: " + err.message }));
                            } else {
                                res.status(201).json({ success: true, data: booking, message: "Booking successful" });
                            }
                        })
                        .catch(err => res.status(500).json({ success: false, message: err.message }));

                })
                .catch(err => res.status(500).json({ success: false, message: err.message }));
        })
        .catch(err => res.status(500).json({ success: false, message: err.message }));
};




all = (req, res) => {
    let formData = req.body
    BookingModel.find(req.body)
        .populate({
            path: "matchId",
            select: "matchName keyword"
        }).populate({
            path: "userId",
            select: "name keyword"
        })
        .then((bookingData) => {
            if (bookingData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Bookings Data is as:",
                    data: bookingData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "There are no bookings"
                })

            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
}

single = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_Id IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        BookingModel.findOne({ _id: req.body._id })
            // .populate({
            //     path:"bookingId",
            //     select:"bookingName keyword"
            // })
            .then((bookingData) => {
                if (!bookingData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no booking "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Booking Data is as",
                        data: bookingData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })
    }
}
update = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        BookingModel.findOne({ _id: req.body._id })
            .then(async (bookingData) => {
                if (!bookingData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {

                    if (!!formData.seatsBooked) {
                        bookingData.seatsBooked = formData.seatsBooked
                    }
                    if (!!formData.totalAmount) {
                        bookingData.totalAmount = formData.totalAmount
                    }
                    if (!!formData.paymentMode) {
                        bookingData.paymentMode = formData.paymentMode
                    }
                    // if (req.file) {
                    //     const imageUrl = await uploadImg(req.file.buffer);
                    //     bookingData.image = imageUrl;
                    // }
                    bookingData.save()
                        .then((bookingData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Booking Updated",
                                data: bookingData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"

                            })
                        })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"

                })
            })

    }
}

changeStatus = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_Id IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            sucess: false,
            message: validation
        })
    }
    else {
        BookingModel.findOne({ _id: req.body._id })
            .then((bookingData) => {
                if (!bookingData) {
                    res.json({
                        status: 404,
                        sucess: false,
                        message: "There is no booking found on this id"
                    })
                }
                else {
                    bookingData.status = bookingData.status === "Confirmed" ? "Cancelled" : "Confirmed";

                    bookingData.save()
                        .then((bookingData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "booking status updated",
                                data: bookingData
                            })
                        })
                        .catch((err) => {
                            console.log(1);

                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"
                            })
                        })
                }

            })
            .catch((err) => {
                console.log(err);

                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!"
                })
            })
    }

}
Delete = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        BookingModel.findOne({ _id: req.body._id })
            .then((bookingData) => {
                if (!bookingData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {
                    BookingModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Booking deleted!!"
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"
                            })
                        })
                }

            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })

    }


}


module.exports = { add, all, single, update, changeStatus, Delete }