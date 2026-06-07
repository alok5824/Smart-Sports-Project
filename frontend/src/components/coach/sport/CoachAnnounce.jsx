import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { ClipLoader } from "react-spinners";

export default function CoachAnnounce() {
    const [announce, setAnnounce] = useState([]);

    const [coachSportId, setCoachSportId] = useState(null);
const[loading,setLoading]=useState(false)


    const [previewImage, setPreviewImage] = useState(null);
    

   


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

        const sportId = myCoach.sportsId._id;
        setCoachSportId(sportId);

        // 2️⃣ get announcements
        const announceRes = await ApiService.allAnnouncment({ status: "Open" });
        if (!announceRes.data.success) return;

        // 3️⃣ filter by coach sport
        const filtered = announceRes.data.data.filter(
            el => el.sportsId?._id === sportId
        );

        setAnnounce(filtered);

    } catch (err) {
        toast.error(err.message);
    }
    finally{
        setLoading(false)
    }
};


    useEffect(() => {
        fetchData();
       
    }, []);

   
    

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
                {/* Page Title ... */}

                <div className="page-title">
                    <div className="heading" style={{ backgroundColor: "#2c7a7b",color:"white"  }}>
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title text-white">Leagues</h1>
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
                                <li className="current">Leagues</li>
                            </ol>
                        </div>
                    </nav>
                </div>
                <section id="properties" className="properties section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="properties-header mb-4">
                                    <div className="d-flex justify-content-end mb-3">
                                        

                                        
                                    </div>
                                </div>

                                {/* Leagues Grid */}
                                <div className="properties-grid view-grid active" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="row g-4">
                                        {announce.length > 0 ? (
                                            announce.map((el) => (
                                                <div key={el._id} className="col-lg-4 col-md-6">
                                                    <div className="property-card">
                                                        <div className="property-image">
                                                            {el.image ? (
                                                                <img
                                                                    onClick={() => setPreviewImage(el.image)}
                                                                    src={el.image}
                                                                    alt={el.leagueName}
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "4px",
                                                                        border: "1px solid #ddd",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span>No Image</span>
                                                            )}
                                                        </div>
                                                        <div className="property-content">
                                                            <div className="property-price">{el.leagueName}</div>
                                                            <h4 className="property-title">
                                                                Venue: {el.venue}
                                                                <br />
                                                                Description: {el.description}
                                                            </h4>
                                                            <h4 className="property-title">
                                                                Max-Teams: {el.maxTeams} 
                                                            </h4>
                                                            <h4 className="property-title">
                                                                League Start Date:{" "}
                                                                {el.startDate
                                                                    ? new Date(el.startDate).toLocaleDateString("en-GB")
                                                                    : "-"}
                                                            </h4>
                                                            <h4 className="property-title">
                                                                League End Date:{" "}
                                                                {el.endDate
                                                                    ? new Date(el.endDate).toLocaleDateString("en-GB")
                                                                    : "-"}
                                                            </h4>
                                                            <h4 className="property-title">
                                                                Last Apply Date:{" "}
                                                                {el.lastApplyDate
                                                                    ? new Date(el.lastApplyDate).toLocaleDateString("en-GB")
                                                                    : "-"}
                                                            </h4>
                                                            <Link
                                                                to={`/coach/matchApplication/add/${el._id}/${el.sportsId._id}`}
                                                                className="btn btn-primary w-100"
                                                            >
                                                                Apply
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center">
                                                <h4 className="text-muted">No Leagues available</h4>
                                                <p>Please check back later.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
                            zIndex: 1000,
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
            </main>
        </>
    );
}
