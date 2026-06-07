import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"


export default function AllCoach() {
    const [coach, setCoach] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
const[loading,setLoading]=useState(false)



    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allCoach()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setCoach(res.data.data)


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


    const getNextStatus = (current) => {
            if (current === "Pending") return "Approved"
            if (current === "Approved") return "Rejected"
            return "Pending" // Rejected → Pending
        }
    
        const changeStatus = (id, currentStatus) => {
            const nextStatus = getNextStatus(currentStatus)
    
            Swal.fire({
                title: "Are you sure?",

                text: `Change status from ${currentStatus} to ${nextStatus}?`,
                icon: "warning",
                  confirmButtonColor: "#2c7a7b",
                showCancelButton: true,
                confirmButtonText: nextStatus
            }).then((result) => {
                if (result.isConfirmed) {
                    ApiService.changeStatusCoach({
                        _id: id,
                        status: nextStatus
                    })
                        .then((res) => {
                            if (res.data.success) {
                                Swal.fire({
                                title: res.data.message,
                                  confirmButtonColor: "#2c7a7b",
                                // text: "Your file has been deleted.",
                                icon: "success"
                            })
                                fetchData()
                            }
                        })
                        .catch((err) => toast.error(err.message))
                }
            })
        }

    const deleteCoach = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,  confirmButtonColor: "#2c7a7b",
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
                ApiService.DeleteCoach(data)
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
                                    <h1 className="display-1 text-white mb-md-4">All coachs</h1>
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
                                <h1 className="heading-title text-white">All coachs</h1>
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
                            <li className="current">All coachs</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        {coach.length > 0 ? (
                            <div className="table-responsive spacing">
                               <div className="table-responsive">
  <table className="table align-middle table-hover shadow-sm rounded border">
    <thead style={{ backgroundColor: "#f8f9fa" }}>
      <tr>
        <th>#</th>
        <th>Coach</th>
        <th>Organisation</th>
        <th>Sport</th>
        <th>Contact</th>
        <th>Experience</th>
        <th>Bio</th>
        <th>Status</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {coach?.map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {/* ✅ Coach Image + Name + Email */}
          <td>
            <div className="d-flex align-items-center gap-3">
              {el?.userId?.profileImage ? (
                <img
                  src={el?.userId?.profileImage}
                  alt="coach"
                  width="50"
                  height="50"
                  onClick={() => setPreviewImage(el?.userId?.profileImage)}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "1px solid #ddd"
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#e9ecef",
                    borderRadius: "50%"
                  }}
                />
              )}

              <div>
                <div className="fw-semibold">
                  {el?.userId?.name}
                </div>
                <small className="text-muted">
                  {el?.userId?.email}
                </small>
              </div>
            </div>
          </td>

          {/* Organisation */}
          <td>{el?.organisationName}</td>

          {/* Sport */}
          <td>
            <span className="badge edit">
              {el?.sportsId?.sportName}
            </span>
          </td>

          {/* Contact */}
          <td>{el?.userId?.contact}</td>

          {/* Experience */}
          <td>
            <span className="badge edit">
              {el?.experience} yrs
            </span>
          </td>

          {/* Bio */}
          <td style={{ maxWidth: "220px" }}>
            <small className="text-muted">
              {el?.bio?.length > 80
                ? el.bio.substring(0, 80) + "..."
                : el?.bio}
            </small>
          </td>

          {/* ✅ Status Badge */}
          <td>
            <span
              className={`badge px-3 py-2 ${
                el.status === "Approved"
                  ? "bg-success"
                  : el.status === "Rejected"
                  ? "bg-danger"
                  : "bg-warning text-dark"
              }`}
            >
              {el.status}
            </span>
          </td>

          {/* ✅ Actions */}
          <td className="text-center">
            <div className="d-flex justify-content-center align-items-center gap-2">

              <ReactSwitch
                checked={el?.status === "Approved"}
                onChange={() => changeStatus(el?._id, el?.status)}
                onColor="#198754"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteCoach(el?._id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No coach available
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