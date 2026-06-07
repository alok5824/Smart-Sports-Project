export default function Properties() {
    return (
        <>
            <>
                
                <main className="main">
                    {/* Page Title */}
                    <div className="page-title">
                        <div className="heading">
                            <div className="container">
                                <div className="row d-flex justify-content-center text-center">
                                    <div className="col-lg-8">
                                        <h1 className="heading-title">Properties</h1>
                                        <p className="mb-0">
                                            Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                            quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                                            dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                                            quaerat ipsum dolorem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="breadcrumbs">
                            <div className="container">
                                <ol>
                                    <li>
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li className="current">Properties</li>
                                </ol>
                            </div>
                        </nav>
                    </div>
                    {/* End Page Title */}
                    {/* Properties Section */}
                    <section id="properties" className="properties section">
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="properties-header mb-4">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
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
                                        </div>
                                    </div>
                                    <div
                                        className="properties-grid view-grid active"
                                        data-aos="fade-up"
                                        data-aos-delay={200}
                                    >
                                        <div className="row g-4">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="property-card">
                                                    <div className="property-image">
                                                        <img
                                                            src="assets/img/real-estate/property-exterior-1.webp"
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
                                                                src="assets/img/real-estate/agent-1.webp"
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
                                            {/* End Property Item */}
                                            <div className="col-lg-6 col-md-6">
                                                <div className="property-card">
                                                    <div className="property-image">
                                                        <img
                                                            src="assets/img/real-estate/property-exterior-3.webp"
                                                            alt="Downtown Luxury Condo"
                                                            className="img-fluid"
                                                        />
                                                        <div className="property-badges">
                                                            <span className="badge new">New</span>
                                                            <span className="badge for-sale">For Sale</span>
                                                        </div>
                                                        <div className="property-overlay">
                                                            <button className="favorite-btn">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <button className="gallery-btn" data-count={8}>
                                                                <i className="bi bi-images" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="property-content">
                                                        <div className="property-price">$1,250,000</div>
                                                        <h4 className="property-title">
                                                            Downtown Luxury Condominium
                                                        </h4>
                                                        <p className="property-location">
                                                            <i className="bi bi-geo-alt" /> 1542 Main Avenue,
                                                            Manhattan, NY 10001
                                                        </p>
                                                        <div className="property-features">
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
                                                        <div className="property-agent">
                                                            <img
                                                                src="assets/img/real-estate/agent-3.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <div className="agent-info">
                                                                <strong>Michael Chen</strong>
                                                                <div className="agent-contact">
                                                                    <small>
                                                                        <i className="bi bi-telephone" /> +1 (555)
                                                                        234-5678
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
                                            {/* End Property Item */}
                                            <div className="col-lg-6 col-md-6">
                                                <div className="property-card">
                                                    <div className="property-image">
                                                        <img
                                                            src="assets/img/real-estate/property-interior-4.webp"
                                                            alt="Suburban Villa"
                                                            className="img-fluid"
                                                        />
                                                        <div className="property-badges">
                                                            <span className="badge for-rent">For Rent</span>
                                                        </div>
                                                        <div className="property-overlay">
                                                            <button className="favorite-btn">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <button className="gallery-btn" data-count={15}>
                                                                <i className="bi bi-images" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="property-content">
                                                        <div className="property-price">
                                                            $4,500<span>/month</span>
                                                        </div>
                                                        <h4 className="property-title">
                                                            Spacious Suburban Villa
                                                        </h4>
                                                        <p className="property-location">
                                                            <i className="bi bi-geo-alt" /> 789 Pine Ridge Drive,
                                                            Austin, TX 73301
                                                        </p>
                                                        <div className="property-features">
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
                                                        <div className="property-agent">
                                                            <img
                                                                src="assets/img/real-estate/agent-5.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <div className="agent-info">
                                                                <strong>Emma Rodriguez</strong>
                                                                <div className="agent-contact">
                                                                    <small>
                                                                        <i className="bi bi-telephone" /> +1 (555)
                                                                        345-6789
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
                                            {/* End Property Item */}
                                            <div className="col-lg-6 col-md-6">
                                                <div className="property-card">
                                                    <div className="property-image">
                                                        <img
                                                            src="assets/img/real-estate/property-exterior-6.webp"
                                                            alt="Waterfront Townhouse"
                                                            className="img-fluid"
                                                        />
                                                        <div className="property-badges">
                                                            <span className="badge open-house">Open House</span>
                                                            <span className="badge for-sale">For Sale</span>
                                                        </div>
                                                        <div className="property-overlay">
                                                            <button className="favorite-btn">
                                                                <i className="bi bi-heart" />
                                                            </button>
                                                            <button className="gallery-btn" data-count={20}>
                                                                <i className="bi bi-images" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="property-content">
                                                        <div className="property-price">$695,000</div>
                                                        <h4 className="property-title">
                                                            Waterfront Townhouse with Dock
                                                        </h4>
                                                        <p className="property-location">
                                                            <i className="bi bi-geo-alt" /> 456 Harbor View Lane,
                                                            Miami, FL 33101
                                                        </p>
                                                        <div className="property-features">
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
                                                        <div className="property-agent">
                                                            <img
                                                                src="assets/img/real-estate/agent-7.webp"
                                                                alt="Agent"
                                                                className="agent-avatar"
                                                            />
                                                            <div className="agent-info">
                                                                <strong>David Williams</strong>
                                                                <div className="agent-contact">
                                                                    <small>
                                                                        <i className="bi bi-telephone" /> +1 (555)
                                                                        456-7890
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
                                            {/* End Property Item */}
                                        </div>
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
                                                            src="assets/img/real-estate/property-exterior-1.webp"
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
                                                                    src="assets/img/real-estate/agent-1.webp"
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
                                                            src="assets/img/real-estate/property-exterior-3.webp"
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
                                                                    src="assets/img/real-estate/agent-3.webp"
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
                                                            src="assets/img/real-estate/property-interior-4.webp"
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
                                                                    src="assets/img/real-estate/agent-5.webp"
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
                                                            src="assets/img/real-estate/property-exterior-6.webp"
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
                                                                    src="assets/img/real-estate/agent-7.webp"
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
                                    <nav className="mt-5" data-aos="fade-up" data-aos-delay={300}>
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
                                    </nav>
                                </div>
                                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="properties-sidebar">
                                        <div className="filter-widget">
                                            <h5 className="filter-title">Filter Properties</h5>
                                            <div className="filter-section">
                                                <label className="form-label">Property Type</label>
                                                <select className="form-select">
                                                    <option>All Types</option>
                                                    <option>House</option>
                                                    <option>Apartment</option>
                                                    <option>Condo</option>
                                                    <option>Townhouse</option>
                                                    <option>Commercial</option>
                                                </select>
                                            </div>
                                            <div className="filter-section">
                                                <label className="form-label">Price Range</label>
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Min Price"
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Max Price"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="filter-section">
                                                <label className="form-label">Bedrooms</label>
                                                <div className="bedroom-filter">
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn active">
                                                        Any
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        1+
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        2+
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        3+
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        4+
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="filter-section">
                                                <label className="form-label">Bathrooms</label>
                                                <div className="bathroom-filter">
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn active">
                                                        Any
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        1+
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        2+
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm filter-btn">
                                                        3+
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="filter-section">
                                                <label className="form-label">Location</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter city or neighborhood"
                                                />
                                            </div>
                                            <div className="filter-section">
                                                <label className="form-label">Features</label>
                                                <div className="features-filter">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="garage"
                                                        />
                                                        <label className="form-check-label" htmlFor="garage">
                                                            Garage
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="pool"
                                                        />
                                                        <label className="form-check-label" htmlFor="pool">
                                                            Swimming Pool
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="balcony"
                                                        />
                                                        <label className="form-check-label" htmlFor="balcony">
                                                            Balcony
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="garden"
                                                        />
                                                        <label className="form-check-label" htmlFor="garden">
                                                            Garden
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary w-100">Apply Filters</button>
                                        </div>
                                        <div className="featured-properties mt-4">
                                            <h5>Featured Properties</h5>
                                            <div className="featured-item">
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-5">
                                                        <img
                                                            src="assets/img/real-estate/property-exterior-8.webp"
                                                            alt="Property"
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                    <div className="col-7">
                                                        <h6 className="mb-1">Luxury Penthouse</h6>
                                                        <p className="text-muted small mb-1">Manhattan, NY</p>
                                                        <strong className="text-primary">$2,850,000</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="featured-item">
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-5">
                                                        <img
                                                            src="assets/img/real-estate/property-interior-7.webp"
                                                            alt="Property"
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                    <div className="col-7">
                                                        <h6 className="mb-1">Modern Studio</h6>
                                                        <p className="text-muted small mb-1">Brooklyn, NY</p>
                                                        <strong className="text-primary">$3,200/mo</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="featured-item">
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-5">
                                                        <img
                                                            src="assets/img/real-estate/property-exterior-9.webp"
                                                            alt="Property"
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                    <div className="col-7">
                                                        <h6 className="mb-1">Family Home</h6>
                                                        <p className="text-muted small mb-1">Queens, NY</p>
                                                        <strong className="text-primary">$895,000</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /Properties Section */}
                </main>
                
                {/* Scroll Top */}
                <a
                    href="#"
                    id="scroll-top"
                    className="scroll-top d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-arrow-up-short" />
                </a>
              
                {/* Vendor JS Files */}
                {/* Main JS File */}
            </>

        </>
    )
}