import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";
import ApiService from "../../../services/ApiService";
import SeatsLayout from "./SeatsLayout";


export default function AddBooking() {
     let isLogin = sessionStorage.getItem("isLogin")
    const userId = sessionStorage.getItem("userId"); // logged in user
    const { id } = useParams(); // match id from URL
    let nav = useNavigate()

    const [match, setMatch] = useState(null);

    const [loading, setLoading] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);



    const totalAmount = selectedSeats.reduce(
        (sum, s) => sum + s.price,
        0
    );


    // Fetch match data
    const fetchMatch = () => {
        setLoading(true);
        ApiService.allMatch({ _id: id })
            .then((res) => {
                if (res.data.success && res.data.data.length > 0) {
                    setMatch(res.data.data[0]);
                } else {
                    toast.error(res.data.message || "Match not found");
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMatch();
    }, []);




    // Handle seat input

    function groupByRow(seats) {
    const map = {};
    seats.forEach((s) => {
        if (!map[s.rowName]) {
            map[s.rowName] = {
                rowName: s.rowName,
                price: s.price,
                seatNumbers: []
            };
        }
        // Extract seat number from seatId (e.g., "A1" -> "1")
        
        map[s.rowName].seatNumbers.push(s.seatNo);

    });
    return Object.values(map);
}




    // Razorpay payment
    const handlePayment = () => {

         if (!selectedSeats.length) {
        toast.error("Please select seats");
        return;
    }

    if (selectedSeats.length > match.availableSeats) {
        toast.error(`Only ${match.availableSeats} seats are available`);
        return;
    }

    // Group selected seats by row
    const seatsDetail = groupByRow(selectedSeats);
    

    // Extract all seat numbers from seatsDetail

    const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);


        const options = {
            key: "rzp_test_Q8bKRaQdmgftXW", // Replace with your Razorpay key
            amount: totalAmount * 100,
            currency: "INR",
            name: "Test Project",
            description: "Match Booking",
            handler: function (response) {
                const bookingData = {
                    matchId: match._id,
                    seatsDetail,                 // 👈 grouped row-wise seats
                    seatsBooked: selectedSeats.length,

                    userId,

                    totalAmount,
                    transactionId: response.razorpay_payment_id,
                    paymentStatus: "Paid",
                };



                ApiService.addBooking(bookingData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success("Booking successful!");
                          
                            setSelectedSeats([]); // reset UI
                            fetchMatch();
                            nav("/booking/manage")
                        
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => toast.error(err.message));
            },
            prefill: {
                name: sessionStorage.getItem("name") || "Guest",
                email: sessionStorage.getItem("email") || "guest@example.com",
                contact: sessionStorage.getItem("contact") || "9999999999",
            },
            theme: { color: "#e34f05" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    if (loading || !match) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <MoonLoader size={50} />
            </div>
        );
    }

    return (
        <>
         <div className="page-title">
                    <div className="heading" style={{backgroundColor:"#2c7a7b"}}>
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title" >Add Booking</h1>
                                    <p className="mb-0">

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="breadcrumbs">
                        <div className="container">
                            <ol>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="current">Add Booking</li>
                            </ol>
                        </div>
                    </nav>
                </div>
        <div className="container my-5">
            <h2 className="mb-4 text-center py-5">Book Match: {match.matchName}</h2>

            {/* <div className="mb-3">
                <label className="form-label">Ticket Price (per seat):</label>
                <input type="number" className="form-control" value={match.ticketPrice} disabled />
            </div> */}

            {/* <div className="mb-3">
                <label className="form-label">Available Seats:</label>
                <input type="number" className="form-control" value={match.availableSeats} disabled />
            </div> */}

            <SeatsLayout
                seatLayout={match.seatLayout || []} // default to empty array
                onSeatChange={(seats) => {
                    setSelectedSeats(seats);
                    // setSeatsNumbers(seats.map((s) => s.seatId));
                }}
            />



<div className="row d-flex justify-content-center mt-3">
     <div className="mb-3 col-4">
                <label className="form-label">Seats Booked:</label>
                <input type="number" className="form-control" value={selectedSeats.length}
                    disabled />
            </div>

            <div className="mb-3 col-4">
                <label className="form-label">Total Amount:</label>
                <input
                    type="number"
                    className="form-control"
                    value={totalAmount}
                    disabled
                />
            </div>

</div>
 { isLogin?

            <button className="btn btn-primary d-block mx-auto " onClick={handlePayment}>
                Pay & Book
            </button>
            :
            <>
            
            <button className="btn btn-primary d-block mx-auto "><Link  to="/login" className=" text-white">Please Login </Link></button>


            </>
            
            
            
            }
           

          
        </div>
        </>
    );
}
