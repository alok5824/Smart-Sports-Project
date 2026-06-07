import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"
import ApiService from "../../../services/ApiService";
import { ClipLoader } from "react-spinners";

export default function CoachSport() {

    const [previewImage, setPreviewImage] = useState(null);
    const [sport, setSport] = useState([]);
const[loading,setLoading]=useState(false)



    // const fetchData = () => {

    //     const data = {
    //         status: "Active"
            
    //     }
    //     ApiService.allSport(data)
    //         .then((res) => {
    //             console.log(res)
    //             if (res.data.success) {
    //                 setSport(res.data.data)


    //             }
    //             else {
    //                 toast.error(res.data.essage)
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error(err.message)
    //         })
    // }


    const [coachSportId, setCoachSportId] = useState(null);


    const fetchData = async () => {
        setLoading(true)
    try {
        // 1️⃣ get all coaches
        const coachRes = await ApiService.allCoach({ status: "Approved" });
        if (!coachRes.data.success) return;

        const myCoach = coachRes.data.data.find(
            c => c.userId?._id === sessionStorage.getItem("userId")
        );

        if (!myCoach?.sportsId?._id) {
            toast.error("Coach not Approved");
            return;
        }

        const coachSportId = myCoach.sportsId._id;
        setCoachSportId(coachSportId);

        // 2️⃣ get all sports
        const sportRes = await ApiService.allSport({ status: "Active" });
        if (!sportRes.data.success) return;

        // 3️⃣ filter only coach sport
        const filtered = sportRes.data.data.filter(
            s => s._id === coachSportId
        );

        setSport(filtered);

    } catch (err) {
        toast.error(err.message);
    }
    finally{
        setLoading(false)
    }
};


    useEffect(() => {
        fetchData()
    }, [])
    // const sport =
    //     selectedSport === "All"
    //         ? sport
    //         : sport.filter((el) => el._id === selectedSport);


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
                    <div className="heading" style={{ backgroundColor: "#2c7a7b",color:"white"  }}>
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title text-white">Sports</h1>
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
                                    <Link href="/coach">Home</Link>
                                </li>
                                <li className="current">Sports</li>
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
                                    {/* <div className="d-flex justify-content-end mb-3">
                                        <div className="sort-dropdown" style={{ maxWidth: "250px" }}>
                                            <select
                                                className="form-select form-select-sm"
                                                value={selectedSport}
                                                onChange={(e) => setSelectedSport(e.target.value)}
                                            >
                                                <option value="All">All Sports</option>
                                                {sport.map((el) => (
                                                    <option key={el._id} value={el._id}>
                                                        {el.sportName}
                                                    </option>
                                                ))}
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
                                        {sport.length > 0 ? (
                                            sport.map((el, index) => (

                                                <div className="col-lg-4 col-md-6">
                                                    <div className="property-card">
                                                        <div className="property-image">
                                                            {el?.image ? (
                                                                <img
                                                                    onClick={() => setPreviewImage(el.image)}
                                                                    src={el.image}
                                                                    alt="land"
                                                                    width="70"
                                                                    height="55"
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "4px",
                                                                        border: "1px solid #ddd"
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span>No Image</span>
                                                            )}
                                                            {/* <div className="property-badges">
                                                                <span className="badge featured">Featured</span>
                                                                <span className="badge for-sale">For Sale</span>
                                                            </div> */}
                                                            {/* <div className="property-overlay">
                                                                <button className="favorite-btn">
                                                                    <i className="bi bi-heart" />
                                                                </button>
                                                                <button className="gallery-btn" data-count={12}>
                                                                    <i className="bi bi-images" />
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                        <div className="property-content">
                                                            <div className="property-price">{el.sportName}</div>
                                                            <h4 className="property-title">

                                                                Description: {el.description}
                                                            </h4>

                                                            <h4 className="property-title" style={{ display: "inline" }}>

                                                                Match Duration: {el.matchDuration} mins
                                                            </h4>
                                                            <h4 className="property-title">
                                                                Max-players:
                                                                {el.maxPlayers}
                                                            </h4>

                                                            <Link to={`/coach/coachmatch/all/${el._id}`} className="btn btn-primary w-100">
                                                                View Matchs
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>



                                            ))
                                        ) : (
                                            <div className="col-12 text-center">
                                                <h4 className="text-muted">
                                                    No Sports available
                                                </h4>
                                                <p>Please check back later.</p>
                                            </div>
                                        )}
                                    </div>


                                    
                                </div>
                              
                                {/* <nav className="mt-5" data-aos="fade-up" data-aos-delay={300}>
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" tabIndex={-1}>
                                                    Previous
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="#">
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    Next
                                                </a>
                                            </li>
                                        </ul>
                                    </nav> */}
                            </div>
                           
                        </div>
                    </div>
                </section>
                {/* /Properties Section */}
            </main>

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
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
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "6px" }}
                    />
                </div>
            )}

        </>
    )
}