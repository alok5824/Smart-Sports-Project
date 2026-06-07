import { Link } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Home() {
    return (
        <>
            <>
              
                <main className="main">

                    
                    {/* Hero Section */}
                    <section id="hero" className="hero section">
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="hero-content">
                                <div className="row align-items-center">
                                    <div
                                        className="col-lg-6 hero-text"
                                        data-aos="fade-right"
                                        data-aos-delay={200}
                                    >
                                        <div className="hero-badge">
                                            <i className="bi bi-star-fill" />
                                            <span>Sports Managment</span>
                                        </div>
                                        <h1>Where Professional Play Meets Passionate Fans</h1>
                                        <p>
                                           A complete sports ecosystem. Admins curate elite leagues, coaches build championship-ready rosters, and fans secure the best seats in the house. From team registration to the final whistle, we manage it all.
                                        </p>
                                       
                                        <div
                                            className="hero-stats"
                                            data-aos="fade-up"
                                            data-aos-delay={400}
                                        >
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="stat-item">
                                                        <h3>
                                                            <span
                                                                data-purecounter-start={0}
                                                                data-purecounter-end={2847}
                                                                data-purecounter-duration={1}
                                                                className="purecounter"
                                                            />
                                                            80+
                                                        </h3>
                                                        <p>Leagues</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="stat-item">
                                                        <h3>
                                                            <span
                                                                data-purecounter-start={0}
                                                                data-purecounter-end={156}
                                                                data-purecounter-duration={1}
                                                                className="purecounter"
                                                            />
                                                            60+
                                                        </h3>
                                                        <p>Verified Pyments</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="stat-item">
                                                        <h3>
                                                            <span
                                                                data-purecounter-start={0}
                                                                data-purecounter-end={98}
                                                                data-purecounter-duration={1}
                                                                className="purecounter"
                                                            />
                                                            80%
                                                        </h3>
                                                        <p>Client Satisfaction</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Hero Text */}
                                    <div
                                        className="col-lg-6 hero-images"
                                        data-aos="fade-left"
                                        data-aos-delay={400}
                                    >
                                        <div className="image-stack">
                                            <div className="main-image">
                                                <img
                                                    src="/assets/img/sport.avif"
                                                    alt="Luxury Property"
                                                    className="img-fluid"
                                                />
                                                <div className="property-tag">
                                                    <span className="price">₹1200</span>
                                                    <span className="type">Match Ticket</span>
                                                </div>
                                            </div>
                                            <div className="secondary-image">
                                                <img
                                                    src="/assets/img/sport.avif"
                                                    alt="Property Interior"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="floating-card">
                                                <div className="agent-info">
                                                    
                                                    <div className="agent-details">
                                                        <h5>India vs Australia </h5>
                                                        <p>Wankhede Stadium</p>
                                                        <div className="rating">
                                                            <i className="bi bi-star-fill" />
                                                            <i className="bi bi-star-fill" />
                                                            <i className="bi bi-star-fill" />
                                                            <i className="bi bi-star-fill" />
                                                            <i className="bi bi-star-fill" />
                                                            <span> 4.8 (12k bookings)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Hero Images */}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /Hero Section */}
                    {/* Home About Section */}
                    <section id="home-about" className="home-about section">
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row align-items-center gy-5">
                                <div
                                    className="col-lg-6 order-lg-2"
                                    data-aos="fade-left"
                                    data-aos-delay={200}
                                >
                                    <div className="image-section">
                                        <div className="main-image-wrapper">
                                            <img
                                                src="/assets/img/stadium.jpg"
                                                alt="Premium Property"
                                                className="img-fluid main-image"
                                            />
                                            <div className="floating-card">
                                                <div className="card-content">
                                                    <div className="icon">
                                                        <i className="bi bi-award" />
                                                    </div>
                                                    <div className="text">
                                                        <span className="number">
                                                            <span
                                                                data-purecounter-start={0}
                                                                data-purecounter-end={12}
                                                                data-purecounter-duration={1}
                                                                className="purecounter"
                                                            />
                                                            +
                                                        </span>
                                                        <span className="label">Awards Won</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="secondary-images">
                                            <div className="small-image">
                                                <img
                                                    src="/assets/img/basketball.jpg"
                                                    alt="Interior Design"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="small-image">
                                                <img
                                                    src="/assets/img/cricket.jpg"
                                                    alt="Expert Agent"
                                                    className="img-fluid"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-6 order-lg-1"
                                    data-aos="fade-right"
                                    data-aos-delay={300}
                                >
                                    <div className="content-wrapper">
                                        <div className="section-badge">
                                            <i className="bi bi-buildings" />
                                            <span>The Power Behind the Play</span>
                                        </div>
                                        <h2>The Ultimate Arena for Admins, Coaches, and Fans.</h2>
                                        <p>
                                            From league creation to the final whistle. Admins build the stage, coaches lead the charge, and fans witness the glory. A complete lifecycle for professional sports management.

                                        </p>
                                        <div className="stats-grid">
                                            <div
                                                className="stat-item"
                                                data-aos="zoom-in"
                                                data-aos-delay={400}
                                            >
                                                <div className="stat-number">
                                                    <span
                                                        data-purecounter-start={0}
                                                        data-purecounter-end={2800}
                                                        data-purecounter-duration={2}
                                                        className="purecounter"
                                                    />
                                                   50+
                                                </div>
                                                <div className="stat-label"> Active Leagues</div>
                                            </div>
                                            <div
                                                className="stat-item"
                                                data-aos="zoom-in"
                                                data-aos-delay={450}
                                            >
                                                <div className="stat-number">
                                                    <span
                                                        data-purecounter-start={0}
                                                        data-purecounter-end={95}
                                                        data-purecounter-duration={1}
                                                        className="purecounter"
                                                    />
                                                   150+
                                                </div>
                                                <div className="stat-label">🎯 Registered Teams</div>
                                            </div>
                                            <div
                                                className="stat-item"
                                                data-aos="zoom-in"
                                                data-aos-delay={500}
                                            >
                                                <div className="stat-number">
                                                    <span
                                                        data-purecounter-start={0}
                                                        data-purecounter-end={24}
                                                        data-purecounter-duration={1}
                                                        className="purecounter"
                                                    />
                                                  98%	
                                                </div>
                                                <div className="stat-label">Verification Rate</div>
                                            </div>
                                        </div>
                                        <div className="features-list">
                                            <div className="feature-item">
                                                <i className="bi bi-check-circle" />
                                                <span>✔Multi-Tier Management</span>

                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check-circle" />
                                                <span>✔ Coach-to-Field Pipeline</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check-circle" />
                                                <span>✔ Automated Verification</span>
                                            </div>
                                        </div>
                                        <div className="cta-wrapper">
                                            <a href="/sport/manage" className="btn-primary">
                                                <span>✔ RInteractive Fan Experience</span>
                                                <i className="bi bi-arrow-right-circle" />
                                            </a>
                                            <div className="contact-quick">
                                                <i className="bi bi-headset" />
                                                <div className="contact-text">
                                                    <span>Need assistance?</span>
                                                    <a href="tel:+15559876543">+91 98765 43210</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                   
                 
                               
                        {/* </div>
                    </section> */} 
                    {/* /Featured Properties Section */}
                    {/* Featured Services Section */}
                    <section id="featured-services" className="featured-services section">
                        {/* Section Title */}
                        <div className="container section-title" data-aos="fade-up">
                            <h2>Features
                            </h2>
                            <p>
                                Discover an all-in-one sports platform designed for fans and organizers alike. From finding the best seats to managing events effortlessly, we make every game day seamless and unforgettable.
                            </p>
                        </div>
                       
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row g-4 justify-content-center">
                                <div
                                    className="col-lg-3 col-md-6"
                                    data-aos="zoom-in"
                                    data-aos-delay={200}
                                >
                                    <div className="service-card">
                                        <div className="service-header">
                                            <div className="service-icon">
                                                <i className="bi bi-search" />
                                            </div>
                                            <div className="service-number">01</div>
                                        </div>
                                        <div className="service-content">
                                            <h3>
                                                <Link to="/sport/manage">Match Discovery</Link>
                                            </h3>
                                            <p>
                                                Find upcoming matches across cricket, football, badminton, and more with real-time availability and trusted venues.
                                            </p>
                                            <ul className="service-features">
                                                <li>

                                                    <i className="bi bi-check2" /> Live Match Listings
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" />Stadium & Team Filters
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Real-time Seat Availability
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="service-action">
                                            <Link to="/sport/manage" className="service-btn">
                                                <span>Explore Matches</span>
                                                <i className="bi bi-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* End Service Item */}
                                <div
                                    className="col-lg-3 col-md-6"
                                    data-aos="zoom-in"
                                    data-aos-delay={300}
                                >
                                    <div className="service-card featured">
                                        <div className="service-header">
                                            <div className="service-icon">
                                                <i className="bi bi-graph-up" />
                                            </div>
                                            <div className="service-number">02</div>
                                        </div>
                                        <div className="service-content">
                                            <h3>
                                                <Link to="/sport/manage">Match Insights</Link>
                                            </h3>
                                            <p>
                                                Get detailed match information to help you choose the best games, seats, and ticket options.
                                            </p>
                                            <ul className="service-features">
                                                <li>
                                                    <i className="bi bi-check2" /> Price Trend Reports
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Special Offers
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Best User View
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="service-action">
                                            <Link to="/sport/manage" className="service-btn">
                                                <span>Get Analysis</span>
                                                <i className="bi bi-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* End Service Item */}
                                <div
                                    className="col-lg-3 col-md-6"
                                    data-aos="zoom-in"
                                    data-aos-delay={400}
                                >
                                    <div className="service-card">
                                        <div className="service-header">
                                            <div className="service-icon">
                                                <i className="bi bi-key" />
                                            </div>
                                            <div className="service-number">03</div>
                                        </div>
                                        <div className="service-content">
                                            <h3>
                                                <Link to="/sport/manage">Sports Management</Link>
                                            </h3>
                                            <p>
                                                We offer complete sports management solutions to organize events, manage teams, and streamline operations. From scheduling matches to handling registrations, we ensure everything runs smoothly on and off the field.
                                            </p>
                                            <ul className="service-features">
                                                <li>
                                                    <i className="bi bi-check2" /> Player Screening
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Match & Fee Collection
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Training & Facility Maintenance
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="service-action">
                                            <Link to="/sport/manage" className="service-btn">
                                                <span>Manage Now</span>
                                                <i className="bi bi-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* End Service Item */}
                                <div
                                    className="col-lg-3 col-md-6"
                                    data-aos="zoom-in"
                                    data-aos-delay={500}
                                >
                                    <div className="service-card">
                                        <div className="service-header">
                                            <div className="service-icon">
                                                <i className="bi bi-shield-check" />
                                            </div>
                                            <div className="service-number">04</div>
                                        </div>
                                        <div className="service-content">
                                            <h3>
                                                <Link to="/sport/manage">Legal Support</Link>
                                            </h3>
                                            <p>
                                                We provide reliable legal support for sports organizations, clubs, and events. From compliance to dispute resolution, our experts ensure smooth operations while protecting the interests of teams, players, and organizers.
                                            </p>
                                            <ul className="service-features">
                                                <li>
                                                    <i className="bi bi-check2" /> Contract Review
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Title Verification
                                                </li>
                                                <li>
                                                    <i className="bi bi-check2" /> Legal Documentation
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="service-action">
                                            <Link to="/sport/manage" className="service-btn">
                                                <span>Learn More</span>
                                                <i className="bi bi-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* End Service Item */}
                            </div>
                            <div className="text-center" data-aos="fade-up" data-aos-delay={600}>
                                <Link to="/sport/manage" className="btn-all-services">
                                    <span>Discover All Our sports</span>
                                    <i className="bi bi-arrow-up-right" />
                                </Link>
                            </div>
                        </div>
                    </section>
                    {/* /Featured Services Section */}
                    {/* Featured Agents Section */}
                    {/* <section id="featured-agents" className="featured-agents section">
                       
                        <div className="container section-title" data-aos="fade-up">
                            <h2>Featured Agents</h2>
                            <p>
                                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                                consectetur velit
                            </p>
                        </div>
                       
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row gy-5 justify-content-center">
                                <div
                                    className="col-lg-6 col-xl-4"
                                    data-aos="fade-up"
                                    data-aos-delay={100}
                                >
                                    <div className="agent-card">
                                        <div className="agent-image">
                                            <img
                                                src="/assets/img/real-estate/agent-5.webp"
                                                alt="Top Agent"
                                                className="img-fluid"
                                            />
                                            <div className="agent-overlay">
                                                <div className="contact-buttons">
                                                    <a
                                                        href="tel:+14159876543"
                                                        className="btn-contact"
                                                        title="Call Agent"
                                                    >
                                                        <i className="bi bi-telephone" />
                                                    </a>
                                                    <a
                                                        href="mailto:lisa.thompson@example.com"
                                                        className="btn-contact"
                                                        title="Email Agent"
                                                    >
                                                        <i className="bi bi-envelope" />
                                                    </a>
                                                    <a href="#" className="btn-contact" title="WhatsApp">
                                                        <i className="bi bi-whatsapp" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="status-badge top-agent">Top Agent</div>
                                        </div>
                                        <div className="agent-info">
                                            <div className="agent-meta">
                                                <h3 className="agent-name">Lisa Thompson</h3>
                                                <p className="agent-title">Luxury Property Expert</p>
                                            </div>
                                            <div className="agent-stats">
                                                <div className="stat-item">
                                                    <span className="stat-number">150+</span>
                                                    <span className="stat-label">Properties Sold</span>
                                                </div>
                                                <div className="stat-divider" />
                                                <div className="stat-item">
                                                    <span className="stat-number">4.9</span>
                                                    <span className="stat-label">Rating</span>
                                                </div>
                                            </div>
                                            <div className="location-tag">
                                                <i className="bi bi-geo-alt" />
                                                <span>Miami Beach</span>
                                            </div>
                                            <div className="specialties">
                                                <span className="specialty-tag">Waterfront</span>
                                                <span className="specialty-tag">High-Rise</span>
                                            </div>
                                            <a href="/" className="profile-link">
                                                View Full Profile
                                            </a>
                                        </div>
                                    </div>
                                </div>
                              
                                <div
                                    className="col-lg-6 col-xl-4"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="agent-card">
                                        <div className="agent-image">
                                            <img
                                                src="/assets/img/real-estate/agent-4.webp"
                                                alt="Top Agent"
                                                className="img-fluid"
                                            />
                                            <div className="agent-overlay">
                                                <div className="contact-buttons">
                                                    <a
                                                        href="tel:+14159876544"
                                                        className="btn-contact"
                                                        title="Call Agent"
                                                    >
                                                        <i className="bi bi-telephone" />
                                                    </a>
                                                    <a
                                                        href="mailto:robert.chen@example.com"
                                                        className="btn-contact"
                                                        title="Email Agent"
                                                    >
                                                        <i className="bi bi-envelope" />
                                                    </a>
                                                    <a href="#" className="btn-contact" title="WhatsApp">
                                                        <i className="bi bi-whatsapp" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="status-badge certified">Certified</div>
                                        </div>
                                        <div className="agent-info">
                                            <div className="agent-meta">
                                                <h3 className="agent-name">Robert Chen</h3>
                                                <p className="agent-title">Commercial Specialist</p>
                                            </div>
                                            <div className="agent-stats">
                                                <div className="stat-item">
                                                    <span className="stat-number">90+</span>
                                                    <span className="stat-label">Commercial Sales</span>
                                                </div>
                                                <div className="stat-divider" />
                                                <div className="stat-item">
                                                    <span className="stat-number">4.8</span>
                                                    <span className="stat-label">Rating</span>
                                                </div>
                                            </div>
                                            <div className="location-tag">
                                                <i className="bi bi-geo-alt" />
                                                <span>Downtown</span>
                                            </div>
                                            <div className="specialties">
                                                <span className="specialty-tag">Office Space</span>
                                                <span className="specialty-tag">Retail</span>
                                            </div>
                                            <a href="/" className="profile-link">
                                                View Full Profile
                                            </a>
                                        </div>
                                    </div>
                                </div>
                              
                                <div
                                    className="col-lg-6 col-xl-4"
                                    data-aos="fade-up"
                                    data-aos-delay={300}
                                >
                                    <div className="agent-card">
                                        <div className="agent-image">
                                            <img
                                                src="/assets/img/real-estate/agent-8.webp"
                                                alt="Top Agent"
                                                className="img-fluid"
                                            />
                                            <div className="agent-overlay">
                                                <div className="contact-buttons">
                                                    <a
                                                        href="tel:+14159876545"
                                                        className="btn-contact"
                                                        title="Call Agent"
                                                    >
                                                        <i className="bi bi-telephone" />
                                                    </a>
                                                    <a
                                                        href="mailto:maria.gonzalez@example.com"
                                                        className="btn-contact"
                                                        title="Email Agent"
                                                    >
                                                        <i className="bi bi-envelope" />
                                                    </a>
                                                    <a href="#" className="btn-contact" title="WhatsApp">
                                                        <i className="bi bi-whatsapp" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="status-badge new-star">Rising Star</div>
                                        </div>
                                        <div className="agent-info">
                                            <div className="agent-meta">
                                                <h3 className="agent-name">Maria Gonzalez</h3>
                                                <p className="agent-title">Residential Advisor</p>
                                            </div>
                                            <div className="agent-stats">
                                                <div className="stat-item">
                                                    <span className="stat-number">75+</span>
                                                    <span className="stat-label">Happy Families</span>
                                                </div>
                                                <div className="stat-divider" />
                                                <div className="stat-item">
                                                    <span className="stat-number">4.9</span>
                                                    <span className="stat-label">Rating</span>
                                                </div>
                                            </div>
                                            <div className="location-tag">
                                                <i className="bi bi-geo-alt" />
                                                <span>Suburbs</span>
                                            </div>
                                            <div className="specialties">
                                                <span className="specialty-tag">Family Homes</span>
                                                <span className="specialty-tag">First-Time</span>
                                            </div>
                                            <a href="/" className="profile-link">
                                                View Full Profile
                                            </a>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                            <div
                                className="text-center mt-5"
                                data-aos="fade-up"
                                data-aos-delay={400}
                            >
                                <a href="/" className="explore-agents-btn">
                                    <span>Explore All Our Agents</span>
                                    <i className="bi bi-arrow-right-circle" />
                                </a>
                            </div>
                        </div>
                    </section> */}
                    {/* /Featured Agents Section */}
                   
                    
                                                   
                                   
                    {/* /Testimonials Section */}
                    {/* Why Us Section */}
                    <section id="why-us" className="why-us section">
                        {/* Section Title */}
                        <div className="container section-title" data-aos="fade-up">
                            <h2>Why Us</h2>
                            <p>
                                We offer complete sports management solutions to organize events, manage teams, and streamline operations. From scheduling matches to handling registrations, we ensure everything runs smoothly on and off the field.
                            </p>
                        </div>
                       
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row align-items-center gy-5">
                                <div className="col-lg-5" data-aos="fade-right" data-aos-delay={200}>
                                    <div className="image-showcase">
                                        <div className="main-image-wrapper">
                                            <img
                                                src="/assets/img/football.jpg"
                                                alt="Premium Property"
                                                className="img-fluid main-image"
                                            />
                                            <div className="image-overlay">
                                                <a
                                                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                                                    className="glightbox"
                                                >
                                                    <div className="overlay-content">
                                                        <i className="bi bi-play-circle-fill play-icon" />
                                                        <span>Watch Our Story</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="floating-stats">
                                            <div className="stat-badge">
                                                <span className="stat-number">15+</span>
                                                <span className="stat-text">Years Excellence</span>
                                            </div>
                                            <div className="stat-badge">
                                                <span className="stat-number">3.2K</span>
                                                <span className="stat-text">Happy Clients</span>
                                            </div>
                                        </div>
                                        <div className="experience-card">
                                            <div className="card-icon">
                                                <i className="bi bi-gem" />
                                            </div>
                                            <div className="card-content">
                                               <h5>Premier Service</h5>
<p>Trusted match ticket booking with guaranteed seat selection</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7" data-aos="fade-left" data-aos-delay={300}>
                                    <div className="content-wrapper">
                                        <div className="section-badge">
                                            <i className="bi bi-star-fill me-2" />
                                          The Hub of Sporting Excellence
                                        </div>
                                        <h2>Professional sports solutions built for fans and organizers</h2>
                                        <p className="lead-text">
                                          We bridge the gap between sports administration and the roar of the crowd. Our platform is a three-tiered ecosystem designed to empower Admins to build leagues, Coaches to manage talent, and Fans to experience the game—all in one unified flow.
                                        </p>
                                        <div className="benefits-grid">
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={400}
                                            >
                                                <div className="benefit-icon">
                                                    <i className="bi bi-geo-alt-fill" />
                                                </div>
                                                <div className="benefit-content">
                                                    <h4>Unified League Management</h4>
                                                    <p>
                                                        A centralized dashboard for Admins to oversee every sport, league, and team application.
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={450}
                                            >
                                                <div className="benefit-icon">
                                                    <i className="bi bi-shield-fill-check" />
                                                </div>
                                                <div className="benefit-content">
                                                    <h4>Pro-Coach Tools</h4>
                                                    <p>
                                                      Simplified team registration and league applications with real-time status tracking.
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={500}
                                            >
                                                <div className="benefit-icon">
                                                    <i className="bi bi-clock-fill" />
                                                </div>
                                                <div className="benefit-content">
                                                    <h4>Verified Match Integrity</h4>
                                                    <p>
                                                        Every match shown to fans is first vetted and scheduled through our rigorous admin-verification process.
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={550}
                                            >
                                                <div className="benefit-icon">
                                                    <i className="bi bi-people-fill" />
                                                </div>
                                                <div className="benefit-content">
                                                    <h4>Expert Team</h4>
                                                    <p>
                                                        Our team carefully reviews player contracts, sponsorship agreements,
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="achievement-highlights"
                                            data-aos="fade-up"
                                            data-aos-delay={600}
                                        >
                                            <div className="highlight-item">
                                                <span
                                                    className="highlight-number purecounter"
                                                    data-purecounter-start={0}
                                                    data-purecounter-end={94}
                                                    data-purecounter-duration={2}
                                                />
                                                70%<span className="highlight-label">Success Rate</span>
                                            </div>
                                            <div className="highlight-divider" />
                                            <div className="highlight-item">
                                                <span
                                                    className="highlight-number purecounter"
                                                    data-purecounter-start={0}
                                                    data-purecounter-end={1800}
                                                    data-purecounter-duration={2}
                                                />
                                                1.2k+<span className="highlight-label">Registered Teams</span>
                                            </div>
                                            <div className="highlight-divider" />
                                            <div className="highlight-item">
                                                <span
                                                    className="highlight-number purecounter"
                                                    data-purecounter-start={0}
                                                    data-purecounter-end={24}
                                                    data-purecounter-duration={2}
                                                />
                                                
                                              24/7  <span className="highlight-label">Support Available</span>
                                            </div>
                                        </div>
                                        <div
                                            className="action-buttons"
                                            data-aos="fade-up"
                                            data-aos-delay={650}
                                        >
                                            <a href="/sport/manage" className="btn btn-primary">
                                                Explore Matches
                                            </a>
                                            <a href="/sport/manage" className="btn btn-outline">
                                                Schedule Tickets
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /Why Us Section */}
                    {/* Recent Blog Posts Section */}
                    {/* <section id="recent-blog-posts" className="recent-blog-posts section">
                      
                        <div className="container section-title" data-aos="fade-up">
                            <h2>Recent Blog Posts</h2>
                            <p>
                                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                                consectetur velit
                            </p>
                        </div>
                     
                        <div className="container">
                            <div className="row gy-5">
                                <div
                                    className="col-xl-4 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay={100}
                                >
                                    <div className="post-item position-relative h-100">
                                        <div className="post-img position-relative overflow-hidden">
                                            <img
                                                src="/assets/img/blog/blog-post-1.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                            <span className="post-date">December 12</span>
                                        </div>
                                        <div className="post-content d-flex flex-column">
                                            <h3 className="post-title">
                                                Eum ad dolor et. Autem aut fugiat debitis
                                            </h3>
                                            <a href="blog-details.html" className="readmore stretched-link">
                                                <span>Read More</span>
                                                <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>             
                                <div
                                    className="col-xl-4 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="post-item position-relative h-100">
                                        <div className="post-img position-relative overflow-hidden">
                                            <img
                                                src="/assets/img/blog/blog-post-2.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                            <span className="post-date">July 17</span>
                                        </div>
                                        <div className="post-content d-flex flex-column">
                                            <h3 className="post-title">
                                                Et repellendus molestiae qui est sed omnis
                                            </h3>
                                            <a href="blog-details.html" className="readmore stretched-link">
                                                <span>Read More</span>
                                                <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div
                                    className="col-xl-4 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay={300}
                                >
                                    <div className="post-item position-relative h-100">
                                        <div className="post-img position-relative overflow-hidden">
                                            <img
                                                src="/assets/img/blog/blog-post-3.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                            <span className="post-date">September 05</span>
                                        </div>
                                        <div className="post-content d-flex flex-column">
                                            <h3 className="post-title">
                                                Quia assumenda est et veritati tirana ploder
                                            </h3>
                                            <a href="blog-details.html" className="readmore stretched-link">
                                                <span>Read More</span>
                                                <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </section> */}
                    
                    <section
                        className="call-to-action-2 call-to-action section light-background"
                        id="call-to-action"
                    >
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row align-items-center">
                                <div
                                    className="col-lg-6 order-2 order-lg-1"
                                    data-aos="fade-right"
                                    data-aos-delay={200}
                                >
                                    <div className="cta-content">
                                        <div className="section-badge">
                                            Your Sports Journey Starts Here
                                        </div>
                                        <h2>Ready to Book the Perfect Match Experience?</h2>
                                        <p>
                                            Discover an all-in-one sports platform designed for fans and organizers alike. From finding the best seats to managing events effortlessly, we make every game day seamless and unforgettable.
                                        </p>
                                        <div className="benefits-list">
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={300}
                                            >
                                                <i className="bi bi-check-circle-fill" />
                                                <span>Expert match insights and schedules</span>
                                            </div>
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={350}
                                            >
                                                <i className="bi bi-check-circle-fill" />
                                                <span>Personalized seat and ticket recommendations</span>
                                            </div>
                                            <div
                                                className="benefit-item"
                                                data-aos="fade-up"
                                                data-aos-delay={400}
                                            >
                                                <i className="bi bi-check-circle-fill" />
                                                <span>End-to-end booking and event support</span>
                                            </div>
                                        </div>
                                        <div className="cta-actions">
                                            <a href="/sport/manage" className="btn btn-primary">
                                                <i className="bi bi-person-lines-fill" />
                                               Get your Tickets
                                            </a>
                                            <a href="/" className="btn btn-secondary">
                                                <i className="bi bi-telephone-fill" />
                                                Call +91 9876543210
                                            </a>
                                        </div>
                                    </div>
                                    {/* End CTA Content */}
                                </div>
                                {/* End Left Column */}
                                <div
                                    className="col-lg-6 order-1 order-lg-2"
                                    data-aos="fade-left"
                                    data-aos-delay={250}
                                >
                                    <div className="cta-visual">
                                        <div className="main-image">
                                            <img
                                                src="/assets/img/cricket.jpg"
                                                alt="Property Investment"
                                                className="img-fluid"
                                            />
                                            <div className="overlay-badge">
                                                <i className="bi bi-star-fill" />
                                                <span>Trusted by 500+ Clients</span>
                                            </div>
                                        </div>
                                        <div className="floating-stats">
                                            <div
                                                className="stat-card"
                                                data-aos="zoom-in"
                                                data-aos-delay={450}
                                            >
                                                <div className="stat-icon">
                                                    <i className="bi bi-house-heart-fill" />
                                                </div>
                                                <div className="stat-info">
                                                    <span className="stat-number">850+</span>
                                                    <span className="stat-label">Tickets Sold</span>
                                                </div>
                                            </div>
                                            <div
                                                className="stat-card"
                                                data-aos="zoom-in"
                                                data-aos-delay={500}
                                            >
                                                <div className="stat-icon">
                                                    <i className="bi bi-trophy-fill" />
                                                </div>
                                                <div className="stat-info">
                                                    <span className="stat-number">15</span>
                                                    <span className="stat-label">Years Experience</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End CTA Visual */}
                                </div>
                                {/* End Right Column */}
                            </div>
                        </div>
                    </section>
                    {/* /Call To Action Section */}
                </main>
               

            </>

        </>
    )
}