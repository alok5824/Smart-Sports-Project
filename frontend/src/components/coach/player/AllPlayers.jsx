import { useEffect, useState } from "react"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"

export default function AllPlayers() {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const userId = sessionStorage.getItem("userId")

    const fetchData = () => {
        setLoading(true)
        // Coach ki apni team ka userId se pehle teamId dhundho
        ApiService.allTeam({ coachId: userId })
            .then((res) => {
                if (res.data.success && res.data.data.length > 0) {
                    const teamId = res.data.data[0]._id
                    return ApiService.allPlayer({ teamId })
                } else {
                    setLoading(false)
                    toast.error("No team found")
                }
            })
            .then((res) => {
                if (res?.data?.success) {
                    setPlayers(res.data.data)
                } else {
                    setPlayers([])
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false))
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
                ApiService.changeStatusPlayer({ _id: id })
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                confirmButtonColor: "#2c7a7b",
                                icon: "success"
                            })
                            fetchData()
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => toast.error(err.message))
            }
        })
    }

    const deletePlayer = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2c7a7b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                ApiService.deletePlayer({ _id: id })
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                confirmButtonColor: "#2c7a7b",
                                icon: "success"
                            })
                            fetchData()
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => toast.error(err.message))
            }
        })
    }

    return (
        <>
            {loading && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100vw", height: "100vh",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    display: "flex", justifyContent: "center",
                    alignItems: "center", zIndex: 9999
                }}>
                    <ClipLoader color="#000000" size={60} />
                </div>
            )}

            <div className="page-title">
                <div className="heading" style={{ backgroundColor: "#2c7a7b", color: "white" }}>
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">PLAYERS</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li><Link to="/coach">Home</Link></li>
                            <li className="current">All Players</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <div className="container mt-3 mb-5">
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/coach/player/add" className="btn btn-primary btn-submit">
                        + Add Player
                    </Link>
                </div>
                <div className="row">
                    <div className="col">
                        {players.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table align-middle table-hover shadow-sm rounded border">
                                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                                        <tr>
                                            <th>#</th>
                                            <th>Player</th>
                                            <th>Age</th>
                                            <th>Position</th>
                                            <th className="text-center">Jersey No.</th>
                                            <th>Team</th>
                                            <th>Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {players.map((el, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>

                                                {/* Player Photo + Name */}
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        {el?.photo ? (
                                                            <img
                                                                src={el.photo}
                                                                alt="player"
                                                                width="55"
                                                                height="55"
                                                                onClick={() => setPreviewImage(el.photo)}
                                                                style={{
                                                                    objectFit: "cover",
                                                                    borderRadius: "8px",
                                                                    cursor: "pointer",
                                                                    border: "1px solid #ddd"
                                                                }}
                                                            />
                                                        ) : (
                                                            <div style={{
                                                                width: "55px", height: "55px",
                                                                background: "#e9ecef",
                                                                borderRadius: "8px",
                                                                display: "flex", alignItems: "center",
                                                                justifyContent: "center"
                                                            }}>
                                                                <i className="bi bi-person text-muted fs-4" />
                                                            </div>
                                                        )}
                                                        <div className="fw-semibold">{el?.playerName}</div>
                                                    </div>
                                                </td>

                                                <td>{el?.age}</td>
                                                <td>{el?.position}</td>

                                                {/* Jersey Number */}
                                                <td className="text-center">
                                                    <span className="badge edit px-3 py-2">
                                                        #{el?.jerseyNumber}
                                                    </span>
                                                </td>

                                                <td>{el?.teamId?.teamName}</td>

                                                {/* Status */}
                                                <td>
                                                    <span className={`badge px-3 py-2 ${el?.status === "Active" ? "bg-success" : "bg-danger"}`}>
                                                        {el?.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
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
                                                            to={`/coach/player/update/${el._id}`}
                                                            className="btn btn-sm edit"
                                                        >
                                                            <i className="bi bi-pencil-fill"></i>
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => deletePlayer(el?._id)}
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
                            <div className="col-12 text-center mt-5">
                                <h4 className="text-muted">No players found</h4>
                                <p>Add your first player using the button above.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
                    style={{
                        position: "fixed", top: 0, left: 0,
                        width: "100vw", height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", zIndex: 1000
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: "90%", maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}
        </>
    )
}