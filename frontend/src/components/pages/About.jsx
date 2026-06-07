export default function About(){
    return(
        <>

        <>
  
  <main className="main">
    {/* Page Title */}
    <div className="page-title">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="heading-title">About</h1>
              {/* <p className="mb-0">
                Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                quaerat ipsum dolorem.
              </p> */}
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
            <li className="current">About</li>
          </ol>
        </div>
      </nav>
    </div>
    {/* End Page Title */}
    {/* About Section */}
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row align-items-center mb-5">
          <div className="col-lg-7">
            <div
              className="intro-content"
              data-aos="fade-right"
              data-aos-delay={200}
            >
              <div className="section-badge">
                <i className="bi bi-house-heart" />
                <span> Revolutionizing the Arena</span>
              </div>
              <h2>From Raw Data to Game-Day Glory</h2>
              <p className="lead-text">
               Our platform isn't just a management tool; it’s a smart sports ecosystem. We bridge the gap between complex league administration and the ultimate fan experience using cutting-edge technology. By empowering Admins to curate leagues and Coaches to lead teams, we create the perfect stage for every match.
              </p>
              <p>
              AI-Powered Attendance Prediction: Our custom AI models analyze historical data, league popularity, and team rankings to predict crowd sizes. This helps Admins and Stadiums manage resources, security, and concessions with surgical precision.
              </p>
              <p>
             Smart Match Discovery: No more scrolling through endless lists. Tell us your favorite sport, and our engine instantly curates a personalized feed of upcoming matches, verified teams, and the best available seats tailored specifically to your interests
              </p>
              
            </div>
          </div>
          <div className="col-lg-5">
            <div
              className="visual-section"
              data-aos="fade-left"
              data-aos-delay={250}
            >
              <div className="main-image">
                <img
                  src="assets/img/sporty.jpg"
                  alt="Luxury Development"
                  className="img-fluid"
                />
                <div className="experience-badge">
                  <div className="badge-number">95%</div>
                  <div className="badge-text">Attendance Accuracy</div>
                </div>
              </div>
              <div className="overlay-image">
                <img
                  src="assets/img/sportsabout.avif"
                  alt="Interior Design"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="achievements-grid"
          data-aos="fade-up"
          data-aos-delay={350}
        >
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="achievement-item"
                data-aos="zoom-in"
                data-aos-delay={400}
              >
                <div className="achievement-icon">
                  <i className="bi bi-speedometer" />
                </div>
                <div className="achievement-number">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={2850}
                    data-purecounter-duration={2}
                    className="purecounter"
                  />
                  0.5
                </div>
                <div className="achievement-label">Recommendation speed</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="achievement-item"
                data-aos="zoom-in"
                data-aos-delay={450}
              >
                <div className="achievement-icon">
                  <i className="bi bi-person-fill-add" />
                </div>
                <div className="achievement-number">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={98}
                    data-purecounter-duration={2}
                    className="purecounter"
                  />
                  95%
                </div>
                <div className="achievement-label">Attendance Accuracy</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="achievement-item"
                data-aos="zoom-in"
                data-aos-delay={500}
              >
                <div className="achievement-icon">
                  <i className="bi bi-person-check " />
                </div>
                <div className="achievement-number">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={35}
                    data-purecounter-duration={2}
                    className="purecounter"
                  />
                  45+
                </div>
                <div className="achievement-label">Verified Leagues</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="achievement-item"
                data-aos="zoom-in"
                data-aos-delay={550}
              >
                <div className="achievement-icon">
                  <i className="bi bi-award" />
                </div>
                <div className="achievement-number">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={127}
                    data-purecounter-duration={2}
                    className="purecounter"
                  />
                  90%
                </div>
                <div className="achievement-label">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
        {/* End Achievements Grid */}
        <div
          className="timeline-section"
          data-aos="fade-up"
          data-aos-delay={400}
        >
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-header text-center mb-5">
                <h3>Our Journey of Excellence</h3>
                <p>
                  Our platform isn’t just a database—it’s an AI-driven ecosystem designed to optimize every match. We use advanced machine learning to bridge the gap between stadium logistics and fan passion.
                </p>
              </div>
              <div className="timeline">
                <div
                  className="timeline-item"
                  data-aos="fade-right"
                  data-aos-delay={450}
                >
                  <div className="timeline-year">1</div>
                  <div className="timeline-content">
                    <h4>The Architect of the Arena</h4>
                    <p>
                      he journey begins with the Administrator. Using a centralized dashboard, the Admin defines the sports landscape by adding new sports categories and launching official leagues. This stage sets the rules, the timeline, and the verified framework for everything that follows.
                    </p>
                  </div>
                </div>
                <div
                  className="timeline-item"
                  data-aos="fade-left"
                  data-aos-delay={500}
                >
                  <div className="timeline-year">2</div>
                  <div className="timeline-content">
                    <h4>Building the Dream Roster</h4>
                    <p>
                     Once the leagues are live, Coaches enter the ecosystem. They register their professional profiles and build their teams within the platform. To compete, coaches apply for specific leagues. This "Permission-Based" model ensures that only qualified teams proceed to the scheduling phase.
                    </p>
                  </div>
                </div>
                <div
                  className="timeline-item"
                  data-aos="fade-right"
                  data-aos-delay={550}
                >
                  <div className="timeline-year">3</div>
                  <div className="timeline-content">
                    <h4>Ensuring Fair Play & Integrity</h4>
                    <p>
                      No match happens by accident. The Admin reviews team applications; once verified, the system facilitates the match-making process between two opposing teams. This is where your AI Integration shines—predicting match attendance based on team rankings and league popularity to help stadiums prepare.
                    </p>
                  </div>
                </div>
                <div
                  className="timeline-item"
                  data-aos="fade-left"
                  data-aos-delay={600}
                >
                  <div className="timeline-year">4</div>
                  <div className="timeline-content">
                    <h4>Bringing the Fans to the Stands</h4>
                    <p>
                      Finally, the User enters a curated marketplace. Instead of searching through noise, users see a personalized feed based on their favorite sports. They can view the verified team lineups, check real-time seat availability, and book their spot instantly via secure payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline Section */}
        <div className="team-preview" data-aos="fade-up" data-aos-delay={450}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3>The Intelligence Behind the Game</h3>
              <p className="team-description">
                Our platform isn’t just a database—it’s an AI-driven ecosystem designed to optimize every match
              </p>
              <div className="team-grid">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div
                      className="team-member"
                      data-aos="flip-up"
                      data-aos-delay={500}
                    >
                      <div className="member-image">
                        <img
                          src="assets/img/aiatten.png"
                          alt="Team Member"
                          className="img-fluid"
                        />
                      </div>
                      <div className="member-info">
                        <h5>Predictive Attendance Engine</h5>
                        <span>Know the crowd before the whistle blows</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div
                      className="team-member"
                      data-aos="flip-up"
                      data-aos-delay={550}
                    >
                      <div className="member-image">
                        <img
                          src="assets/img/aimatch.png"
                          alt="Team Member"
                          className="img-fluid"
                        />
                      </div>
                      <div className="member-info">
                        <h5>Smart-Match Discovery & Personalization</h5>
                        <span>The right game, for the right fan, at the right time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/team/userTeam" className="view-team-btn">
                View Teams
              </a>
            </div>
          </div>
        </div>
        {/* End Team Preview */}
      </div>
    </section>
    {/* /About Section */}
  </main>
  
  {/* Preloader
  <div id="preloader" /> */}
  {/* Vendor JS Files */}
  {/* Main JS File */}
</>

        </>
    )
}