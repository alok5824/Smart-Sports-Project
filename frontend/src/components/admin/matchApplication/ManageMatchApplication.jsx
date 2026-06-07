import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"

export default function ManageMatchApplication() {
    const [matchApplication, setMatchApplication] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const userId = sessionStorage.getItem("userId")
    const [selectedSport, setSelectedSport] = useState("All");
const[loading,setLoading]=useState(false)




    const fetchData = () => {
        setLoading(true)


        ApiService.allMatchApplication()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setMatchApplication(res.data.data)


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

    const filteredMatchApplications =
        selectedSport === "All"
            ? matchApplication
            : matchApplication.filter(
                (el) => el?.sportsId?._id === selectedSport
            );





    const changeStatus = (id, oldStatus, newStatus) => {

        if (oldStatus === newStatus) return

        Swal.fire({
            title: "Are you sure?",
            text: `Change status to "${newStatus}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2c7a7b",
            confirmButtonText: "Yes, update"
        }).then((result) => {

            if (!result.isConfirmed) {
                fetchData() // rollback UI
                return
            }

            ApiService.changeStatusMatchApplication({
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


    const deleteMatchApplication = (id) => {
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
                ApiService.DeleteMatchApplication(data)
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
                                    <h1 className="display-1 text-white mb-md-4">All teams</h1>
                                    <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                        Home
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="page-title">
                <div className="heading" style={{backgroundColor: "#2c7a7b", color:"white" }}>
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">Match Application</h1>
                               

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
                                <Link href="/">Home</Link>
                            </li>
                            <li className="current">All Match Application /</li>
                             <div className="d-flex justify-content-center mx-2">
                                    <select
                                        className="form-select form-select-sm w-auto"
                                        value={selectedSport}
                                        onChange={(e) => setSelectedSport(e.target.value)}
                                    >
                                        <option value="All">All Sports</option>

                                        {[...new Map(
                                            matchApplication
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
                        {filteredMatchApplications.length > 0 ? (
                            <div className="table-responsive spacing">
                               <div className="table-responsive">
  <table className="table align-middle table-hover shadow-sm rounded border">
    <thead style={{ backgroundColor: "#f8f9fa" }}>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th>Sport</th>
        <th>Status</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredMatchApplications.map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {/* ✅ Team + Coach Combined */}
          <td>
            <div>
              <h6 className="mb-1 fw-semibold">
                {el?.teamId?.teamName}
              </h6>
              <small className="text-muted">
                Coach: {el?.coachId?.name}
              </small>
            </div>
          </td>

          <td>
            <span className="badge bg-secondary">
              {el?.sportsId?.sportName}
            </span>
          </td>

          {/* ✅ Clean Status Badge */}
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
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteMatchApplication(el._id)}
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
                                    No matchApplication available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>



        </>
    )
}