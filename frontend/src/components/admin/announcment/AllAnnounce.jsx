import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"


export default function AllAnnounce() {
    const [announce, setAnnounce] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedSport, setSelectedSport] = useState("All");
const[loading,setLoading]=useState(false)



    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allAnnouncment()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setAnnounce(res.data.data)


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
    const filteredAnnouncements =
        selectedSport === "All"
            ? announce
            : announce.filter(
                (el) => el?.sportsId?._id === selectedSport
            );




    const changeStatus = (id, oldStatus, newStatus) => {

        if (oldStatus === newStatus) return

        Swal.fire({
            title: "Are you sure?",
            text: `Change status to "${newStatus}"?`,
            icon: "warning",
            confirmButtonColor: "#2c7a7b",
            showCancelButton: true,
            confirmButtonText: "Yes, update"
        }).then((result) => {

            if (!result.isConfirmed) {
                fetchData() // rollback UI
                return
            }

            ApiService.changeStatusAnnouncment({
                _id: id,
                status: newStatus
            })
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
                })
                .catch(() => fetchData()) // rollback on error
        })
    }

    const deleteAnnouncment = (id) => {
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
                ApiService.DeleteAnnouncment(data)
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
                                    <h1 className="display-1 text-white mb-md-4">All Announcments</h1>
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
                                <h1 className="heading-title text-white">All Announcments</h1>
                                {/* <div className="d-flex justify-content-center mt-3">
                                    <select
                                        className="form-select form-select-sm w-auto"
                                        value={selectedSport}
                                        onChange={(e) => setSelectedSport(e.target.value)}
                                    >
                                        <option value="All">All Sports</option>

                                        {[...new Map(
                                            announce
                                                .filter(el => el?.sportsId)
                                                .map(el => [el.sportsId._id, el.sportsId])
                                        ).values()].map((sport) => (
                                            <option key={sport._id} value={sport._id}>
                                                {sport.sportName}
                                            </option>
                                        ))}
                                    </select>
                                </div> */}

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
                            <li className="current">All League Announcments /</li>
                            <div className="d-flex justify-content-center mx-2">
                                    <select
                                        className="form-select form-select-sm w-auto"
                                        value={selectedSport}
                                        onChange={(e) => setSelectedSport(e.target.value)}
                                    >
                                        <option value="All">All Sports</option>

                                        {[...new Map(
                                            announce
                                                .filter(el => el?.sportsId)
                                                .map(el => [el.sportsId._id, el.sportsId])
                                        ).values()].map((sport) => (
                                            <option key={sport._id} value={sport._id}>
                                                {sport.sportName}
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
                        {filteredAnnouncements.length > 0 ? (
                            <div className="table-responsive spacing ">
                               <div className="table-responsive">
  <table className="table align-middle table-hover shadow-sm border rounded">
    <thead style={{ backgroundColor: "#f8f9fa" }}>
      <tr>
        <th>#</th>
        <th>League</th>
        <th>Sport</th>
        <th>Teams</th>
        <th>Dates</th>
        <th>Status</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredAnnouncements.map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {/* ✅ League + Image Combined */}
          <td>
            <div className="d-flex align-items-center gap-3">
              {el?.image ? (
                <img
                  src={el.image}
                  alt="league"
                  width="55"
                  height="55"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "1px solid #ddd"
                  }}
                  onClick={() => setPreviewImage(el.image)}
                />
              ) : (
                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    background: "#e9ecef",
                    borderRadius: "8px"
                  }}
                />
              )}

              <div>
                <h6 className="mb-0 fw-semibold">{el?.leagueName}</h6>
                <small className="text-muted">
                  Last Apply:{" "}
                  {el?.lastApplyDate
                    ? new Date(el.lastApplyDate).toLocaleDateString("en-GB")
                    : "-"}
                </small>
              </div>
            </div>
          </td>

          <td>{el?.sportsId?.sportName}</td>

          <td>
            <span className="badge edit">
              {el?.maxTeams} Teams
            </span>
          </td>

          {/* ✅ Dates Combined */}
          <td>
            <div className="small">
              <div>
                <strong>Start:</strong>{" "}
                {el?.startDate
                  ? new Date(el.startDate).toLocaleDateString("en-GB")
                  : "-"}
              </div>
              <div>
                <strong>End:</strong>{" "}
                {el?.endDate
                  ? new Date(el.endDate).toLocaleDateString("en-GB")
                  : "-"}
              </div>
            </div>
          </td>

          {/* ✅ Clean Status Badge */}
          <td>
            <span
              className={`badge px-3 py-2 ${
                el.status === "Open"
                  ? "bg-success"
                  : el.status === "Upcoming"
                  ? "bg-info text-dark"
                  : el.status === "Closed"
                  ? "bg-warning text-dark"
                  : "bg-dark"
              }`}
            >
              {el.status}
            </span>
          </td>

          {/* ✅ Clean Actions */}
          <td className="text-center">
            <div className="d-flex justify-content-center gap-2">

              <select
                className="form-select form-select-sm w-auto"
                value={el.status}
                onChange={(e) =>
                  changeStatus(el._id, el.status, e.target.value)
                }
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Completed">Completed</option>
              </select>

              <Link
                to={`/admin/announce/update/${el._id}`}
                className="btn btn-sm  edit "
              >
                <i className="bi bi-pencil-fill"></i>
              </Link>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteAnnouncment(el._id)}
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
                                    No Announcments available
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