import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"
import ApiService from "../../../services/ApiService"
import ClipLoader from "react-spinners/ClipLoader"


export default function MangeSport() {
    const [sport, setSport] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [loading,setLoading]=useState(false)
    const data = {
        status: "Active"
    }


    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allSport(data)
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
                                    <h1 className="heading-title text-white">Sports</h1>

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
                                                            
                                                            
                                                        </div>
                                                        <div className="property-content">
                                                            <div className="property-price">{el.sportName}</div>
                                                            <h4 className="property-title mb-2 ">
                                                                <i class="bi bi-list me-3"></i>

                                                                Description: {el.description}
                                                            </h4>

                                                            <h4 className="property-title mb-3" style={{ display: "inline" }}>
                                                                <i class="bi bi-hourglass-split me-3"></i>

                                                                Match Duration: {el.matchDuration} mins
                                                            </h4>
                                                            <h4 className="property-title mb-3">
                                                                <i class="bi bi-person-fill me-3"></i>
                                                                Max Players:   {el.maxPlayers}
                                                            </h4>

                                                            <Link to={`/match/manage/${el._id}`} className="btn btn-primary w-100">
                                                                View Matches
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


                                    {/* <div className="row g-4">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-card">
                                                    <div className="property-image">
                                                        <img
                                                            src="/assets/img/real-estate/property-exterior-1.webp"
                                                            alt="Modern Family Home"
                                                            className="img-fluid"
                                                        />
                                                        <div className="property-badges">
                                                            <span className="badge featured">Featured</span>
                                                            <span className="badge for-sale">For Sale</span>
                                                        </div>
                                                        <div className="property-overlay">
                                                            <button className="favorite-btn">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <button className="gallery-btn" data-count={12}>
                                                                <i className="bi bi-images" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="property-content">
                                                        <div className="property-price">$875,000</div>
                                                        <h4 className="property-title">
                                                            Modern Family Home with Garden
                                                        </h4>
                                                        <p className="property-location">
                                                            <i className="bi bi-geo-alt" /> 2847 Oak Street, Beverly
                                                            Hills, CA 90210
                                                        </p>
                                                        <div className="property-features">
                                                            <span>
                                                                <i className="bi bi-house" /> 4 Bed
                                                            </span>
                                                            <span>
                                                                <i className="bi bi-water" /> 3 Bath
                                                            </span>
                                                            <span>
                                                                <i className="bi bi-arrows-angle-expand" /> 2,400 sqft
                                                            </span>
                                                        </div>
                                                        <div className="property-agent">
                                                            <img
                                                                src="/assets/img/real-estate/agent-1.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <div className="agent-info">
                                                                <strong>Sarah Johnson</strong>
                                                                <div className="agent-contact">
                                                                    <small>
                                                                        <i className="bi bi-telephone" /> +1 (555)
                                                                        123-4567
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href="#" className="btn btn-primary w-100">
                                                            View Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div> */}
                                </div>
                                <div
                                    className="properties-list view-list"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="property-list-item">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                                <div className="property-image">
                                                    <img
                                                        src="/assets/img/real-estate/property-exterior-1.webp"
                                                        alt="Modern Family Home"
                                                        className="img-fluid"
                                                    />
                                                    <div className="property-badges">
                                                        <span className="badge featured">Featured</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="property-content">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h4 className="property-title mb-1">
                                                                Modern Family Home with Garden
                                                            </h4>
                                                            <p className="property-location mb-2">
                                                                <i className="bi bi-geo-alt" /> 2847 Oak Street,
                                                                Beverly Hills, CA 90210
                                                            </p>
                                                        </div>
                                                        <div className="property-price">$875,000</div>
                                                    </div>
                                                    <div className="property-features mb-3">
                                                        <span>
                                                            <i className="bi bi-house" /> 4 Bed
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-water" /> 3 Bath
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-arrows-angle-expand" /> 2,400 sqft
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="property-agent">
                                                            <img
                                                                src="/assets/img/real-estate/agent-1.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <span>Sarah Johnson</span>
                                                        </div>
                                                        <div className="property-actions">
                                                            <button className="btn btn-outline-secondary btn-sm">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <a href="#" className="btn btn-primary btn-sm">
                                                                View Details
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Property List Item */}
                                    <div className="property-list-item">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                                <div className="property-image">
                                                    <img
                                                        src="/assets/img/real-estate/property-exterior-3.webp"
                                                        alt="Downtown Luxury Condo"
                                                        className="img-fluid"
                                                    />
                                                    <div className="property-badges">
                                                        <span className="badge new">New</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="property-content">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h4 className="property-title mb-1">
                                                                Downtown Luxury Condominium
                                                            </h4>
                                                            <p className="property-location mb-2">
                                                                <i className="bi bi-geo-alt" /> 1542 Main Avenue,
                                                                Manhattan, NY 10001
                                                            </p>
                                                        </div>
                                                        <div className="property-price">$1,250,000</div>
                                                    </div>
                                                    <div className="property-features mb-3">
                                                        <span>
                                                            <i className="bi bi-house" /> 2 Bed
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-water" /> 2 Bath
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-arrows-angle-expand" /> 1,800 sqft
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="property-agent">
                                                            <img
                                                                src="/assets/img/real-estate/agent-3.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <span>Michael Chen</span>
                                                        </div>
                                                        <div className="property-actions">
                                                            <button className="btn btn-outline-secondary btn-sm">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <a href="#" className="btn btn-primary btn-sm">
                                                                View Details
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Property List Item */}
                                    <div className="property-list-item">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                                <div className="property-image">
                                                    <img
                                                        src="/assets/img/real-estate/property-interior-4.webp"
                                                        alt="Suburban Villa"
                                                        className="img-fluid"
                                                    />
                                                    <div className="property-badges">
                                                        <span className="badge for-rent">For Rent</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="property-content">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h4 className="property-title mb-1">
                                                                Spacious Suburban Villa
                                                            </h4>
                                                            <p className="property-location mb-2">
                                                                <i className="bi bi-geo-alt" /> 789 Pine Ridge
                                                                Drive, Austin, TX 73301
                                                            </p>
                                                        </div>
                                                        <div className="property-price">
                                                            $4,500<span>/month</span>
                                                        </div>
                                                    </div>
                                                    <div className="property-features mb-3">
                                                        <span>
                                                            <i className="bi bi-house" /> 5 Bed
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-water" /> 4 Bath
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-arrows-angle-expand" /> 3,200 sqft
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="property-agent">
                                                            <img
                                                                src="/assets/img/real-estate/agent-5.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <span>Emma Rodriguez</span>
                                                        </div>
                                                        <div className="property-actions">
                                                            <button className="btn btn-outline-secondary btn-sm">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <a href="#" className="btn btn-primary btn-sm">
                                                                View Details
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Property List Item */}
                                    <div className="property-list-item">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                                <div className="property-image">
                                                    <img
                                                        src="/assets/img/real-estate/property-exterior-6.webp"
                                                        alt="Waterfront Townhouse"
                                                        className="img-fluid"
                                                    />
                                                    <div className="property-badges">
                                                        <span className="badge open-house">Open House</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="property-content">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h4 className="property-title mb-1">
                                                                Waterfront Townhouse with Dock
                                                            </h4>
                                                            <p className="property-location mb-2">
                                                                <i className="bi bi-geo-alt" /> 456 Harbor View
                                                                Lane, Miami, FL 33101
                                                            </p>
                                                        </div>
                                                        <div className="property-price">$695,000</div>
                                                    </div>
                                                    <div className="property-features mb-3">
                                                        <span>
                                                            <i className="bi bi-house" /> 3 Bed
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-water" /> 2 Bath
                                                        </span>
                                                        <span>
                                                            <i className="bi bi-arrows-angle-expand" /> 2,100 sqft
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="property-agent">
                                                            <img
                                                                src="/assets/img/real-estate/agent-7.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <span>David Williams</span>
                                                        </div>
                                                        <div className="property-actions">
                                                            <button className="btn btn-outline-secondary btn-sm">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <a href="#" className="btn btn-primary btn-sm">
                                                                View Details
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Property List Item */}
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

