import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"


export default function AllBooking() {
    const [Booking, setBooking] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
      const [selectedMatch, setSelectedMatch] = useState("All");
    const[loading,setLoading]=useState(false)




    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allBooking()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setBooking(res.data.data)


                }
                else {
                    toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
     const filteredBooking =
        selectedMatch === "All"
            ? Booking
            : Booking.filter(
                (el) => el?.matchId?._id === selectedMatch
            );


    const changeStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
              confirmButtonColor: "#2c7a7b",
            cancelButtonColor: "#d33",
            confirmButtonText: status === "Confirmed" ? "Cancelled" : "Confirmed"
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.changeStatusBooking(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                  confirmButtonColor: "#2c7a7b",
                                title: res.data.message,
                                // text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })
    }

    const deleteBooking = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
         confirmButtonColor: "#2c7a7b",
            cancelButtonColor: "#d33",
            confirmButtonText: `${!id ? "Enable" : "Delete"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.DeleteBooking(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                  confirmButtonColor: "#2c7a7b",
                                // text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })


    }


    return (
        <>
         {loading && (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    }}>
        <ClipLoader
            color="#000000"
            size={60}
        />
    </div>
)}





            {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h1 className="display-1 text-white mb-md-4">All Bookings</h1>
                                    <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                        Home
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="page-title "  >
                <div className="heading" style={{ backgroundColor: "#2c7a7b" }} >
                    <div className="container " >
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">All Bookings</h1>
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
                                <Link href="/admin">Home</Link>
                            </li>
                            <li className="current">All Bookings /</li>
                            <div className="d-flex justify-content-center mx-2">
                                    <select
                                        className="form-select form-select-sm w-auto "
                                        value={selectedMatch}
                                        onChange={(e) => setSelectedMatch(e.target.value)}
                                    >
                                        <option value="All">All Matchs</option>

                                        {[...new Map(
                                            Booking
                                                .filter(el => el?.matchId)
                                                .map(el => [el.matchId._id, el.matchId])
                                        ).values()].map((match) => (
                                            <option key={match._id} value={match._id}>
                                                {match.matchName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                        </ol>
                    </div>
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        {filteredBooking.length > 0 ? (
                           <div className="table-responsive spacing">
  <table className="table align-middle table-hover shadow-sm rounded border">
    <thead style={{ backgroundColor: "#f8f9fa" }}>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Match</th>
        <th>Seats</th>
        <th>Seat Numbers</th>
        <th>Amount</th>
        <th>Payment</th>
        <th>Status</th>
        <th className="text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredBooking?.map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {/* ✅ User Name */}
          <td>
            <div className="fw-semibold">
              {el?.userId?.name}
            </div>
          </td>

          {/* ✅ Match Name */}
          <td>
            <span className="badge bg-secondary">
              {el?.matchId?.matchName}
            </span>
          </td>

          {/* ✅ Seats Count */}
          <td>
            <span className="badge edit">
              {el?.seatsBooked}
            </span>
          </td>

          {/* ✅ Seat Numbers Clean Display */}
          <td style={{ maxWidth: "220px" }}>
            <div className="d-flex flex-wrap gap-1 ">
              {el?.seatsDetail?.map((row, rowIndex) =>
                row?.seatNumbers?.map((seat, seatIndex) => (
                  <span
                    key={`${rowIndex}-${seatIndex}`}
                    className="badge edit"
                  >
                    {row.rowName}{seat}
                  </span>
                ))
              )}
            </div>
          </td>

          {/* ✅ Amount */}
          <td>
            <span className="fw-semibold text-success">
              ₹ {el?.totalAmount}
            </span>
          </td>

          {/* ✅ Payment Info */}
          <td>
            <div>
              <span className="d-block small">
                {el?.paymentMode}
              </span>
              <span
                className={`badge mt-1 ${
                  el?.paymentStatus === "Paid"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }`}
              >
                {el?.paymentStatus}
              </span>
            </div>
          </td>

          {/* ✅ Booking Status */}
          <td>
            <span
              className={`badge px-3 py-2 ${
                el?.status === "Confirmed"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {el?.status}
            </span>
          </td>

          {/* ✅ Switch Action */}
          <td className="text-center">
            <ReactSwitch
              checked={el?.status === "Confirmed"}
              onChange={() => changeStatus(el?._id, el?.status)}
              onColor="#198754"
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Booking available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)} // click outside closes
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        onClick={(e) => e.stopPropagation()} // clicking image does not close
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}



        </>
    )
}