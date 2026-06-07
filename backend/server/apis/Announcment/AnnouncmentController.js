const { uploadImg } = require("../../utilities/helper")
const AnnouncmentModel = require("./AnnouncmentModel")

add = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData.leagueName) {
        validation += "LeagueName is required, "
    }

    if (!formData.venue) {
        validation += "Venue is required, "
    }
    if (!req.file) {
        validation += "Image is required"
    }

    if (!formData.sportsId) {
        validation += "SportsId is required, "
    }

    if (!formData.startDate) {
        validation += "StartDate is required, "
    }

    if (!formData.endDate) {
        validation += "EndDate is required, "
    }

    if (!formData.lastApplyDate) {
        validation += "LastApplyDate is required, "
    }

    if (!formData.maxTeams) {
        validation += "MaxTeams is required, "
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        // 🔁 DUPLICACY CHECK
        // Same league name + same sport + same start date
        AnnouncmentModel.findOne({
            leagueName: formData.leagueName,
            sportsId: formData.sportsId,
            startDate: formData.startDate
        })
            .then(async (AnnouncmentData) => {
                if (!AnnouncmentData) {
                    let AnnouncmentObj = new AnnouncmentModel()

                    AnnouncmentObj.leagueName = formData.leagueName
                    AnnouncmentObj.venue = formData.venue
                    AnnouncmentObj.sportsId = formData.sportsId
                    AnnouncmentObj.startDate = formData.startDate
                    AnnouncmentObj.endDate = formData.endDate
                    AnnouncmentObj.lastApplyDate = formData.lastApplyDate
                    AnnouncmentObj.maxTeams = formData.maxTeams
                    AnnouncmentObj.description = formData.description || ""
                    let url = await uploadImg(req.file.buffer)
                    AnnouncmentObj.image = url

                    // Optional: auto status based on date
                    if (new Date(formData.lastApplyDate) <= new Date()) {
                        AnnouncmentObj.status = "Closed"
                    } else {
                        AnnouncmentObj.status = "Open"
                    }

                    AnnouncmentObj.save()
                        .then((announcmentData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Announcment added successfully!!",
                                data: announcmentData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"
                            })
                        })
                } else {
                    res.json({
                        status: 200,
                        success: false,
                        message: "Announcment already exists for this league"
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!",
                    error:err.message
                })
            })
    }
}



all = (req, res) => {
    let formData = req.body
    AnnouncmentModel.find(req.body)
        .populate({
            path:"sportsId",
            select:"sportName keyword"
        })
        .then((AnnouncmentData) => {
            if (AnnouncmentData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Announcments Data is as:",
                    data: AnnouncmentData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "There are no Announcments"
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
        AnnouncmentModel.findOne({ _id: req.body._id })
            // .populate({
            //     path:"AnnouncmentId",
            //     select:"AnnouncmentName keyword"
            // })
            .then((AnnouncmentData) => {
                if (!AnnouncmentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no Announcment "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Announcment Data is as",
                        data: AnnouncmentData
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
    } else {
        AnnouncmentModel.findOne({ _id: req.body._id })
            .then(async(announcmentData) => {
                if (!announcmentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                } else {

                    if (!!formData.leagueName) {
                        announcmentData.leagueName = formData.leagueName
                    }

                    if (!!formData.venue) {
                        announcmentData.venue = formData.venue
                    }

                    if (!!formData.sportsId) {
                        announcmentData.sportsId = formData.sportsId
                    }

                    if (!!formData.startDate) {
                        announcmentData.startDate = formData.startDate
                    }

                    if (!!formData.endDate) {
                        announcmentData.endDate = formData.endDate
                    }

                    if (!!formData.lastApplyDate) {
                        announcmentData.lastApplyDate = formData.lastApplyDate
                    }

                    if (!!formData.maxTeams) {
                        announcmentData.maxTeams = formData.maxTeams
                    }

                    if (!!formData.description) {
                        announcmentData.description = formData.description
                    }

                    if (!!formData.status) {
                        announcmentData.status = formData.status
                    }
                    if (req.file) {
                        const imageUrl = await uploadImg(req.file.buffer);
                        sportData.image = imageUrl;
                    }

                    announcmentData.save()
                        .then((updatedData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Announcment Updated",
                                data: updatedData
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
        validation += "Announcment id is required, "
    }

    if (!formData.status) {
        validation += "Status is required, "
    }

    // allowed statuses
    const allowedStatus = ["Upcoming", "Open", "Closed", "Completed"]

    if (formData.status && !allowedStatus.includes(formData.status)) {
        validation += "Invalid status value, "
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        AnnouncmentModel.findById(formData._id)
            .then((AnnouncmentData) => {
                if (!AnnouncmentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Announcment not found"
                    })
                } else {
                    AnnouncmentData.status = formData.status

                    AnnouncmentData.save()
                        .then((updatedData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Announcment status updated successfully!!",
                                data: updatedData
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
        AnnouncmentModel.findOne({ _id: req.body._id })
            .then((AnnouncmentData) => {
                if (!AnnouncmentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {
                    AnnouncmentModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Announcment deleted!!"
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
