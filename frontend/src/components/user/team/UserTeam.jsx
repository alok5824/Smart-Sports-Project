import { useEffect, useState } from "react"

import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import ClipLoader from "react-spinners/ClipLoader"

export default function UserTeam() {
    const [team, setTeam] = useState([])
    const { id } = useParams()
    const [previewImage, setPreviewImage] = useState(null);
    const[loading,setLoading]=useState(false)
    const [selectedSport, setSelectedSport] = useState("All");


    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     _id: id
        // }
        ApiService.allTeam()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setTeam(res.data.data)


                }
                else {
                    toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const filteredTeams =
        selectedSport === "All"
            ? team
            : team.filter(
                (el) => el?.sportsId?._id === selectedSport
            );


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



            <main className="main">
                {/* Page Title */}
                <div className="page-title">
                    <div className="heading" style={{ backgroundColor: "#2c7a7b" }}>
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title text-white">Teams</h1>

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
                                    <a href="/#">Home</a>
                                </li>
                                <li className="current">Teams /</li>
                                <div className="d-flex justify-content-center mx-3">
                                    <select
                                        className="form-select form-select-sm w-auto"
                                        value={selectedSport}
                                        onChange={(e) => setSelectedSport(e.target.value)}
                                    >
                                        <option value="All">All Sports</option>

                                        {[...new Map(
                                            team
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
                {/* End Page Title */}
                {/* Properties Section */}
                <section id="properties" className="properties section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="properties-header mb-4">
                                    {/* <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                        <div className="view-toggle d-flex gap-2">
                                            <button
                                                className="btn btn-outline-secondary btn-sm view-btn active"
                                                data-view="grid"
                                            >
                                                <i className="bi bi-grid-3x3-gap" /> Grid
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary btn-sm view-btn"
                                                data-view="list"
                                            >
                                                <i className="bi bi-list" /> List
                                            </button>
                                        </div>
                                        <div className="sort-dropdown">
                                            <select className="form-select form-select-sm">
                                                <option>Sort by: Newest</option>
                                                <option>Price: Low to High</option>
                                                <option>Price: High to Low</option>
                                                <option>Most Viewed</option>
                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                                <div
                                    className="properties-grid view-grid active"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="row g-4">
                                        {filteredTeams.length > 0 ? (
                                            filteredTeams.map((el) => (
                                                <div className="col-lg-4 col-md-6" key={el._id}>
                                                    <div
                                                        className="card h-100 shadow-sm border-0"
                                                        style={{ transition: "0.3s" }}
                                                    >

                                                        {/* Sport badge */}
                                                        <div className="text-center mt-3">
                                                            <span className="badge bg-success">
                                                                {el?.sportsId?.sportName}
                                                            </span>
                                                        </div>

                                                        {/* Team logo */}
                                                        <div
                                                            className="d-flex justify-content-center mt-3"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <div style={{ height: "180px", overflow: "hidden" }}>
                                                                {el?.logo ? (
                                                                    <img
                                                                        src={el.logo}
                                                                        alt="team"
                                                                        onClick={() => setPreviewImage(el.logo)}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                            cursor: "pointer"
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div
                                                                        className="d-flex align-items-center justify-content-center text-muted"
                                                                        style={{ height: "100%" }}
                                                                    >
                                                                        No Image
                                                                    </div>
                                                                )}
                                                            </div>

                                                        </div>

                                                        {/* Card body */}
                                                        <div className="card-body text-center">
                                                            <h5 className="text-primary fw-bold">
                                                                {el.teamName}
                                                            </h5>

                                                            <p className="mb-1">
                                                                <strong>Players:</strong> {el.playersCount}
                                                            </p>

                                                            <p className="mb-1">
                                                                <strong>Coach:</strong> {el?.coachId?.name || "N/A"}
                                                            </p>

                                                            <p className="text-muted small mt-2">
                                                                {el.description}
                                                            </p>
                                                        </div>

                                                        {/* Optional footer */}
                                                        {/* 
        <div className="card-footer bg-white border-0">
          <Link
            to={`/team/details/${el._id}`}
            className="btn btn-outline-primary w-100 btn-sm"
          >
            View Team
          </Link>
        </div> 
        */}

         <div className="card-footer bg-white border-0">
                                                            <Link
                                                                to={`/team/players/${el._id}`}
                                                                className="btn btn-outline-primary w-100 btn-sm"
                                                            >
                                                                <i className="bi bi-people me-1"></i>
                                                                View Players
                                                            </Link>
                                                        </div>

                                        
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center">
                                                <h4 className="text-muted">No teams available</h4>
                                            </div>
                                        )}

                                    </div>


                                </div>


                            </div>

                        </div>
                    </div>
                </section>
                {/* /Properties Section */}
            </main>
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