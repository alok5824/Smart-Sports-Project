export default function Footer(){
    return(
        <>
        <footer id="footer" className="footer position-relative">
    <div className="container">
      <div className="row gy-5 d-flex justify-content-center">
        
        <div className="col-lg-2 col-3">
          <div className="footer-links">
            <h4>Sports</h4>
            <ul>
              <li>
                <a href="/about">
                  <i className="bi bi-chevron-right" /> About
                </a>
              </li>
              
              <li>
                <a href="/team/userTeam">
                  <i className="bi bi-chevron-right" />Teams
                </a>
              </li>
              <li>
                <a href="/sport/manage">
                  <i className="bi bi-chevron-right" /> Sports
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="bi bi-chevron-right" /> Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-6">
          <div className="footer-links">
            <h4>Sports</h4>
            <ul>
              <li>
                <a href="/sport/manage">
                  <i className="bi bi-chevron-right" /> Cricket
                </a>
              </li>
              <li>
                <a href="/sport/manage">
                  <i className="bi bi-chevron-right" /> Badminton
                </a>
              </li>
              <li>
                <a href="/sport/manage">
                  <i className="bi bi-chevron-right" /> Football
                </a>
              </li>
              <li>
                <a href="/sport/manage">
                  <i className="bi bi-chevron-right" /> Basketball
                </a>
              </li>
              <li>
                <a href="/sport/manage">
                  <i className="bi bi-chevron-right" /> Rugby
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
                 123 Jalandhar
                  <br />
                  Punjab
                  <br />
                  India
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-telephone" />
              </div>
              <div className="contact-info">
                <p>+91 9876543210</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-envelope" />
              </div>
              <div className="contact-info">
                <p>sports@example.com</p>
              </div>
            </div>
            {/* <div className="social-links">
              <a href="www.facebook.com">
                <i className="bi bi-facebook" />
              </a>
              <a href="www.twitter.com">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="www.linkedin.com">
                <i className="bi bi-linkedin" />
              </a>
              <a href="www.youtube.com">
                <i className="bi bi-youtube" />
              </a>
              <a href="">
                <i className="bi bi-github" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row d-flex justify-content-center ">
          <div className="col-lg-3 align-item-center">
            <div className="copyright">
              <p>
                © <span>Copyright</span>{" "}
                <strong className="px-1 sitename">Sports</strong>{" "}
                <span>All Rights Reserved</span>
              </p>
            </div>
          </div>
          {/* <div className="col-lg-6">
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className="credits">
              All the links in the footer should remain intact. 
             You can delete the links only if you've purchased the pro version. 
             Licensing information: https://bootstrapmade.com/license/ 
             Purchase the pro version with working PHP/AJAX contact form: [buy-url]
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </footer>
        </>
    )
}