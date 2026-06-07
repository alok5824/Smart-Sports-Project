import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ClipLoader from "react-spinners/ClipLoader"
import ApiService from "../../../services/ApiService"

export default function ViewPlayers() {
    const { teamId } = useParams()
    const [players, setPlayers] = useState([])
    const [teamName, setTeamName] = useState("")
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)

    const fetchData = () => {
        setLoading(true)

        // Team name fetch karo
        ApiService.singleTeam({ _id: teamId })
            .then((res) => {
                if (res.data.success) {
                    setTeamName(res.data.data.teamName)
                }
            })
            .catch((err) => toast.error(err.message))

        // Players fetch karo
        ApiService.allPlayer({ teamId })
            .then((res) => {
                if (res.data.success) {
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
    }, [teamId])

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

            <main className="main">
                {/* Page Title */}
                <div className="page-title">
                    <div className="heading" style={{ backgroundColor: "#2c7a7b" }}>
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title text-white">
                                        {teamName ? `${teamName} — Players` : "Players"}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="breadcrumbs">
                        <div className="container">
                            <ol>
                                <li><a href="/#">Home</a></li>
                                <li><Link to="/team/userTeam">Teams</Link></li>
                                <li className="current">Players</li>
                            </ol>
                        </div>
                    </nav>
                </div>

                {/* Players Section */}
                <section id="properties" className="properties section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row g-4">
                                    {players.length > 0 ? (
                                        players.map((el) => (
                                            <div className="col-lg-3 col-md-6" key={el._id}>
                                                <div
                                                    className="card h-100 shadow-sm border-0"
                                                    style={{ transition: "0.3s" }}
                                                >
                                                    {/* Jersey Badge */}
                                                    <div className="text-center mt-3">
                                                        <span className="badge bg-success">
                                                            #{el?.jerseyNumber}
                                                        </span>
                                                    </div>

                                                    {/* Player Photo */}
                                                    <div
                                                        className="d-flex justify-content-center mt-3"
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <div style={{ height: "220px", width: "100%", overflow: "hidden" }}>
                                                            {el?.photo ? (
                                                                <img
                                                                    src={el.photo}
                                                                    alt="player"
                                                                    onClick={() => setPreviewImage(el.photo)}
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                        objectPosition: "top",
                                                                        cursor: "pointer"
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="d-flex align-items-center justify-content-center text-muted"
                                                                    style={{
                                                                        height: "100%",
                                                                        background: "#f0f0f0",
                                                                        fontSize: 48
                                                                    }}
                                                                >
                                                                    <i className="bi bi-person" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Card Body */}
                                                    <div className="card-body text-center">
                                                        <h5 className="text-primary fw-bold">
                                                            {el?.playerName}
                                                        </h5>
                                                        <p className="mb-1">
                                                            <strong>Position:</strong> {el?.position}
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>Age:</strong> {el?.age}
                                                        </p>
                                                        <span className={`badge ${el?.status === "Active" ? "bg-success" : "bg-danger"}`}>
                                                            {el?.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12 text-center mt-5">
                                            <h4 className="text-muted">No players found for this team</h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Image Preview */}
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