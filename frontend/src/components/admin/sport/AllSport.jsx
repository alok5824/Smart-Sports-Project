import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"

export default function AllSport() {
    const [sport, setSport] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
const[loading,setLoading]=useState(false)



    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allSport()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setSport(res.data.data)


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


    const changeStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2c7a7b",
            cancelButtonColor: "#d33",
            confirmButtonText: status === "Active" ? "Deactivate" : "Activate"
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.changeStatusSport(data)
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

    const deleteSport = (id) => {
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
                ApiService.DeleteSport(data)
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
                                    <h1 className="display-1 text-white mb-md-4">All Sports</h1>
                                    <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                        Home
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="page-title "  >
                <div className="heading" style={{backgroundColor: "#2c7a7b",color:"white"  }} >
                    <div className="container " >
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">All Sports</h1>
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
                            <li className="current">All Sports</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        {sport.length > 0 ? (
                            <div className="table-responsive spacing">
  <table className="table align-middle table-hover shadow-sm rounded border">
    <thead style={{ backgroundColor: "#f8f9fa" }}>
      <tr>
        <th>#</th>
        <th>Sport</th>
        <th>Players</th>
        <th>Duration</th>
        <th>Description</th>
        <th>Status</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {sport.map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {/* ✅ Image + Sport Name Combined */}
          <td>
            <div className="d-flex align-items-center gap-3">
              {el?.image ? (
                <img
                  src={el.image}
                  alt="sport"
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
                <h6 className="mb-1 fw-semibold">
                  {el?.sportName}
                </h6>
                <small className="text-muted">
                  Max {el?.maxPlayers} Players
                </small>
              </div>
            </div>
          </td>

          <td>
            <span className="badge bg-secondary">
              {el?.maxPlayers}
            </span>
          </td>

          <td>
            <span className="badge edit">
              {el?.matchDuration} mins
            </span>
          </td>

          <td style={{ maxWidth: "220px" }}>
            <small className="text-muted">
              {el?.description?.length > 80
                ? el.description.substring(0, 80) + "..."
                : el?.description}
            </small>
          </td>

          {/* ✅ Clean Status Badge */}
          <td>
            <span
              className={`badge px-3 py-2 ${
                el?.status === "Active"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {el?.status === "Active" ? "Active" : "Inactive"}
            </span>
          </td>

          {/* ✅ Clean Actions */}
          <td className="text-center">
            <div className="d-flex justify-content-center align-items-center gap-2">

              <ReactSwitch
                checked={el?.status === "Active"}
                onChange={() => changeStatus(el?._id, el?.status)}
                onColor="#198754"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />

              <Link
                to={`/admin/sport/update/${el._id}`}
                className="btn btn-sm edit"
              >
                <i className="bi bi-pencil-fill"></i>
              </Link>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteSport(el._id)}
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
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No sport available
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