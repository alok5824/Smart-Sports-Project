import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ClipLoader from "react-spinners/ClipLoader"

export default function ManageTeam() {
    const [match, setMatch] = useState(null)
    const { id } = useParams()
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false)


    const fetchData = () => {
        setLoading(true)

        const data = {
            _id: id
        }
        ApiService.allMatch(data)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setMatch(res.data.data[0])


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
                    <div className="heading" style={{ backgroundColor: "#2c7a7b", color: "white" }}>
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
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="current">Teams</li>
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
                                    {/* <div className="row g-4">
                                        {match?.teamId?.length > 0 ? (
                                            match.teamId.map((el, index) => (
                                                <div className="col-lg-6 col-md-6" key={el._id}>
                                                    <div className="property-card">

                                                        <div  className="img-fluid">
                                                            {el?.logo ? (
                                                                <img
                                                                onClick={() => setPreviewImage(el.logo)}
                                                                className="img-fluid"
                                                                    src={el.logo}
                                                                    alt="team"
                                                                    
                                                                    style={{  width:"200px",
                                                                    height:"100px" }}
                                                                />
                                                            ) : (
                                                                <span>No Image</span>
                                                            )}
                                                        </div>

                                                        <div className="property-content">
                                                            <h4 className="property-title text-center">
                                                                {index === 0 ? "Home Team" : "Away Team"}
                                                            </h4>

                                                            <h4 className="property-title text-primary">
                                                                {el.teamName}
                                                            </h4>

                                                            <h5>Players: {el.playersCount}</h5>
                                                            <p>Coach : {el?.coachId?.userId?.name }</p>

                                                            <p>Description: {el.description}</p>

                                                           
                                                        </div>

                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center">
                                                <h4 className="text-muted">No teams available</h4>
                                            </div>
                                        )}
                                    </div> */}
                                    <h3 className="text-center mb-4">
                                        {match?.matchName}
                                    </h3>
                                    <p className="text-center text-muted">
                                        {match?.venue} | {match?.matchDate ? new Date(match.matchDate).toLocaleDateString("en-GB") : "-"}| {match?.matchTime}

                                    </p>

                                    {match?.teamId?.length === 2 ? (
                                        <div className="row justify-content-center">
                                            <div className="col-lg-10">
                                                <div className="card shadow-lg p-4">
                                                    <div className="row align-items-center text-center">

                                                        {/* Home Team */}
                                                        <div className="col-md-5">
                                                            <img
                                                                src={match.teamId[0]?.logo}
                                                                alt="Home Team"
                                                                onClick={() => setPreviewImage(match.teamId[0]?.logo)}
                                                                style={{ width: "150px", height: "100px", objectFit: "contain" }}
                                                                className="mb-3"
                                                            />
                                                            <h4 className="text-primary">{match.teamId[0]?.teamName}</h4>
                                                            <p>Players: {match.teamId[0]?.playersCount}</p>

                                                        </div>

                                                        {/* VS */}
                                                        <div className="col-md-2">
                                                            <div
                                                                style={{
                                                                    fontSize: "32px",
                                                                    fontWeight: "bold",
                                                                    color: "#2c7a7b"
                                                                }}
                                                            >
                                                                VS
                                                            </div>
                                                        </div>

                                                        {/* Away Team */}
                                                        <div className="col-md-5">
                                                            <img
                                                                src={match.teamId[1]?.logo}
                                                                alt="Away Team"
                                                                onClick={() => setPreviewImage(match.teamId[1]?.logo)}
                                                                style={{ width: "150px", height: "100px", objectFit: "contain" }}
                                                                className="mb-3"
                                                            />
                                                            <h4 className="text-danger">{match.teamId[1]?.teamName}</h4>
                                                            <p>Players: {match.teamId[1]?.playersCount}</p>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <h4 className="text-muted">Teams not finalized yet</h4>
                                        </div>
                                    )}




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