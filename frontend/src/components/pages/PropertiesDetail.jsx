export default function PropertiesDetail() {
    return (
        <>
        <>
  <header id="header" className="header d-flex align-items-center fixed-top">
    <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a
        href="index.html"
        className="logo d-flex align-items-center me-auto me-xl-0"
      >
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="assets/img/logo.webp" alt=""> */}
        <h1 className="sitename">TheProperty</h1>
      </a>
      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
          <li>
            <a href="properties.html">Properties</a>
          </li>
          <li>
            <a href="services.html">Services</a>
          </li>
          <li>
            <a href="agents.html">Agents</a>
          </li>
          <li>
            <a href="blog.html">Blog</a>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>More Pages</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <a href="property-details.html" className="active">
                  Property Details
                </a>
              </li>
              <li>
                <a href="service-details.html">Service Details</a>
              </li>
              <li>
                <a href="agent-profile.html">Agent Profile</a>
              </li>
              <li>
                <a href="blog-details.html">Blog Details</a>
              </li>
              <li>
                <a href="terms.html">Terms</a>
              </li>
              <li>
                <a href="privacy.html">Privacy</a>
              </li>
              <li>
                <a href="404.html">404</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>Dropdown</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <a href="#">Dropdown 1</a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Deep Dropdown</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </a>
                <ul>
                  <li>
                    <a href="#">Deep Dropdown 1</a>
                  </li>
                  <li>
                    <a href="#">Deep Dropdown 2</a>
                  </li>
                  <li>
                    <a href="#">Deep Dropdown 3</a>
                  </li>
                  <li>
                    <a href="#">Deep Dropdown 4</a>
                  </li>
                  <li>
                    <a href="#">Deep Dropdown 5</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Dropdown 2</a>
              </li>
              <li>
                <a href="#">Dropdown 3</a>
              </li>
              <li>
                <a href="#">Dropdown 4</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="contact.html">Contact</a>
          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list" />
      </nav>
      <a className="btn-getstarted" href="properties.html">
        Get Started
      </a>
    </div>
  </header>
  <main className="main">
    {/* Page Title */}
    <div className="page-title">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="heading-title">Property Details</h1>
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
            <li className="current">Property Details</li>
          </ol>
        </div>
      </nav>
    </div>
    {/* End Page Title */}
    {/* Property Details Section */}
    <section id="property-details" className="property-details section">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-8">
            {/* Property Gallery */}
            <div
              className="property-gallery"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="main-image-container image-zoom-container">
                <img
                  id="main-product-image"
                  src="assets/img/real-estate/property-exterior-3.webp"
                  alt="Property Exterior"
                  className="img-fluid main-property-image"
                  data-zoom="assets/img/real-estate/property-exterior-3.webp"
                />
                <div className="image-nav-buttons">
                  <button className="image-nav-btn prev-image" type="button">
                    <i className="bi bi-chevron-left" />
                  </button>
                  <button className="image-nav-btn next-image" type="button">
                    <i className="bi bi-chevron-right" />
                  </button>
                </div>
              </div>
              <div className="thumbnail-gallery thumbnail-list">
                <div
                  className="thumbnail-item active"
                  data-image="assets/img/real-estate/property-exterior-3.webp"
                >
                  <img
                    src="assets/img/real-estate/property-exterior-3.webp"
                    alt="Property Exterior"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-1.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-1.webp"
                    alt="Living Room"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-2.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-2.webp"
                    alt="Kitchen"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-3.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-3.webp"
                    alt="Master Bedroom"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-exterior-4.webp"
                >
                  <img
                    src="assets/img/real-estate/property-exterior-4.webp"
                    alt="Garden View"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-4.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-4.webp"
                    alt="Bathroom"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-5.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-5.webp"
                    alt="Dining Room"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-exterior-5.webp"
                >
                  <img
                    src="assets/img/real-estate/property-exterior-5.webp"
                    alt="Front View"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-6.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-6.webp"
                    alt="Guest Room"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-7.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-7.webp"
                    alt="Office Space"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-exterior-6.webp"
                >
                  <img
                    src="assets/img/real-estate/property-exterior-6.webp"
                    alt="Side View"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="thumbnail-item"
                  data-image="assets/img/real-estate/property-interior-8.webp"
                >
                  <img
                    src="assets/img/real-estate/property-interior-8.webp"
                    alt="Balcony"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* End Property Gallery */}
            {/* Property Description */}
            <div
              className="property-description"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <h3>About This Property</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium.
              </p>
              <p>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit.
              </p>
            </div>
            {/* End Property Description */}
            {/* Amenities */}
            <div
              className="property-amenities"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <h3>Amenities &amp; Features</h3>
              <div className="row">
                <div className="col-md-6">
                  <h4>Interior Features</h4>
                  <ul className="features-list">
                    <li>
                      <i className="bi bi-check-circle" />
                      Hardwood Floors
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Updated Kitchen
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Walk-in Closets
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Central Air Conditioning
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Fireplace
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      High Ceilings
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4>Exterior Features</h4>
                  <ul className="features-list">
                    <li>
                      <i className="bi bi-check-circle" />
                      2-Car Garage
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Swimming Pool
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Garden
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Patio/Deck
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Security System
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Sprinkler System
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End Amenities */}
            {/* Map Section */}
            <div
              className="property-map"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <h3>Location</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0824050173574!2d-87.63000000000002!3d41.88844360000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height={400}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
              <div className="location-details">
                <h4>Neighborhood Information</h4>
                <p>
                  Located in the heart of downtown, this property offers easy
                  access to shopping, dining, and entertainment. Public
                  transportation and major highways are just minutes away.
                </p>
              </div>
            </div>
            {/* End Map Section */}
          </div>
          <div className="col-lg-4">
            {/* Property Overview */}
            <div
              className="property-overview sticky-top"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="price-tag">$875,000</div>
              <div className="property-status">For Sale</div>
              <div className="property-address">
                <h4>1234 Maple Street</h4>
                <p>Chicago, IL 60601</p>
              </div>
              <div className="property-stats">
                <div className="stat-item">
                  <i className="bi bi-house" />
                  <div>
                    <span className="value">4</span>
                    <span className="label">Bedrooms</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-droplet" />
                  <div>
                    <span className="value">3</span>
                    <span className="label">Bathrooms</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-rulers" />
                  <div>
                    <span className="value">2,450</span>
                    <span className="label">Sq Ft</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-tree" />
                  <div>
                    <span className="value">0.25</span>
                    <span className="label">Acre Lot</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-calendar" />
                  <div>
                    <span className="value">2018</span>
                    <span className="label">Year Built</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-car-front" />
                  <div>
                    <span className="value">2</span>
                    <span className="label">Garage</span>
                  </div>
                </div>
              </div>
              {/* Agent Info */}
              <div className="agent-info">
                <div className="agent-avatar">
                  <img
                    src="assets/img/real-estate/agent-3.webp"
                    alt="Sarah Johnson"
                    className="img-fluid"
                  />
                </div>
                <div className="agent-details">
                  <h4>Sarah Johnson</h4>
                  <p className="agent-title">Licensed Real Estate Agent</p>
                  <p className="agent-phone">
                    <i className="bi bi-telephone" />
                    +1 (555) 123-4567
                  </p>
                  <p className="agent-email">
                    <i className="bi bi-envelope" />
                    sarah@example.com
                  </p>
                </div>
              </div>
              {/* End Agent Info */}
              {/* Contact Form */}
              <div className="contact-form">
                <h4>Schedule a Tour</h4>
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-12 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required=""
                      />
                    </div>
                    <div className="col-12 form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required=""
                      />
                    </div>
                    <div className="col-12 form-group">
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Your Phone"
                      />
                    </div>
                    <div className="col-12 form-group">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Schedule a Tour for date: "
                        defaultValue="Schedule a Tour for date: "
                      />
                    </div>
                    <div className="col-12 form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={4}
                        placeholder="Your Message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Schedule Tour
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* End Contact Form */}
              {/* Social Share */}
              <div className="social-share">
                <h5>Share This Property</h5>
                <div className="share-buttons">
                  <a href="#" className="share-btn facebook">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#" className="share-btn twitter">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#" className="share-btn whatsapp">
                    <i className="bi bi-whatsapp" />
                  </a>
                  <a href="#" className="share-btn email">
                    <i className="bi bi-envelope" />
                  </a>
                  <a href="#" className="share-btn print">
                    <i className="bi bi-printer" />
                  </a>
                </div>
              </div>
              {/* End Social Share */}
            </div>
            {/* End Property Overview */}
          </div>
        </div>
      </div>
    </section>
    {/* /Property Details Section */}
  </main>
  <footer id="footer" className="footer position-relative">
    <div className="container">
      <div className="row gy-5">
        <div className="col-lg-4">
          <div className="footer-content">
            <a
              href="index.html"
              className="logo d-flex align-items-center mb-4"
            >
              <span className="sitename">TheProperty</span>
            </a>
            <p className="mb-4">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae. Donec velit neque auctor sit amet aliquam
              vel ullamcorper sit amet ligula.
            </p>
            <div className="newsletter-form">
              <h5>Stay Updated</h5>
              <form
                action="forms/newsletter.php"
                method="post"
                className="php-email-form"
              >
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required=""
                  />
                  <button type="submit" className="btn-subscribe">
                    <i className="bi bi-send" />
                  </button>
                </div>
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">Thank you for subscribing!</div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-6">
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> About
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Careers
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Press
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Blog
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-6">
          <div className="footer-links">
            <h4>Solutions</h4>
            <ul>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Digital Strategy
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Cloud Computing
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Data Analytics
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> AI Solutions
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right" /> Cybersecurity
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-geo-alt" />
              </div>
              <div className="contact-info">
                <p>
                  2847 Maple Avenue
                  <br />
                  Los Angeles, CA 90210
                  <br />
                  United States
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-telephone" />
              </div>
              <div className="contact-info">
                <p>+1 (555) 987-6543</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-envelope" />
              </div>
              <div className="contact-info">
                <p>contact@example.com</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#">
                <i className="bi bi-facebook" />
              </a>
              <a href="#">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="#">
                <i className="bi bi-linkedin" />
              </a>
              <a href="#">
                <i className="bi bi-youtube" />
              </a>
              <a href="#">
                <i className="bi bi-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="copyright">
              <p>
                © <span>Copyright</span>{" "}
                <strong className="px-1 sitename">MyWebsite</strong>{" "}
                <span>All Rights Reserved</span>
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you've purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Scroll Top */}
  <a
    href="#"
    id="scroll-top"
    className="scroll-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
  {/* Preloader */}
  <div id="preloader" />
  {/* Vendor JS Files */}
  {/* Main JS File */}
</>

        </>
    )
}