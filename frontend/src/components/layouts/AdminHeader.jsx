import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";
import { useState } from "react";

export default function AdminHeader() {

  let { pathname } = useLocation
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null)
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }




  let isLogin = sessionStorage.getItem("isLogin")
  let name = sessionStorage.getItem("name")
  const nav = useNavigate()
  const logout = () => {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
       confirmButtonColor: "#2c7a7b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        nav("/login")
        Swal.fire({
          title: "Logout!",
           confirmButtonColor: "#2c7a7b",
          text: "Logout successfully.",
          icon: "success"
        });
      }
    });
  }

  return (
    <>

      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link
            to="/admin"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.webp" alt=""> */}
            <h1 className="sitename">Sports</h1>
          </Link>
          <nav id="navmenu" className={`navmenu ${mobileOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
              </li>
              <li className={`dropdown ${openDropdown === "sports" ? "dropdown-active" : ""}`}>
                <span
                  className="dropdown-toggle d-flex align-items-center justify-content-between mx-3 fw-semibold "
                  onClick={() => toggleDropdown("sports")}
                >
                  Sports
                  {/* <i className="bi bi-chevron-down toggle-dropdown" /> */}
                </span>

                <ul>
                  <li>
                    <Link to="/admin/sport/add">Add Sports</Link>
                  </li>
                  <li>
                    <Link to="/admin/sport/all">All Sports</Link>
                  </li>


                </ul>
              </li>


               <li className={`dropdown ${openDropdown === "announce" ? "dropdown-active" : ""}`}>
                <span
                  className="dropdown-toggle d-flex align-items-center justify-content-between mx-3 fw-semibold"
                  onClick={() => toggleDropdown("announce")}
                >

                   League Announcements
                  {/* <i className="bi bi-chevron-down toggle-dropdown" /> */}
                </span>

                <ul>
                  <li>
                    <Link to="/admin/announce/add" onClick={() => setMobileOpen(false)}>
                      Add  League Announcements
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/announce/all" onClick={() => setMobileOpen(false)}>
                      All  League Announcements
                    </Link>
                  </li>
                </ul>
              </li>



              <li className={`dropdown ${openDropdown === "match" ? "dropdown-active" : ""}`}>
                <span
                  className="dropdown-toggle d-flex align-items-center justify-content-between mx-3 fw-semibold"
                  onClick={() => toggleDropdown("match")}
                >
                Match
                  {/* <i className="bi bi-chevron-down toggle-dropdown" /> */}
                </span>

                <ul>
                  <li>
                    <Link to="/admin/match/add">Add Match</Link>
                  </li>
                  <li>
                    <Link to="/admin/match/all">All Match</Link>
                  </li>


                </ul>
              </li>
             

              <li>
                <Link to="/admin/matchapplication/manage">Match Applications</Link>
              </li>

              <li>
                <Link to="/admin/team/all">Team</Link>
              </li>
              <li className={`dropdown ${openDropdown === "match" ? "dropdown-active" : ""}`}>
                <span
                  className="dropdown-toggle d-flex align-items-center justify-content-between mx-2 fw-semibold"
                  onClick={() => toggleDropdown("match")}
                >
                 Users
                  {/* <i className="bi bi-chevron-down toggle-dropdown" /> */}
                </span>

                <ul>
                  <li>
                    <Link to="/admin/coach/all">Coach</Link>
                  </li>
                  <li>
                    <Link to="/admin/user/all">User</Link>
                  </li>


                </ul>
              </li>
              {/* <li>
                <Link to="/admin/coach/all">Coach</Link>
              </li>
              <li>
                <Link to="/admin/user/all">User</Link>
              </li> */}
              <li>
                <Link to="/admin/booking/all">Booking</Link>
              </li>
              <li>
                <Link to="/admin/contact/all">Queries</Link>
              </li>
              












              {/* <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/properties">Properties</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li> */}
              {/* <li>
            <Link to="/agents">Agents</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li> */}
              {/* <li className="dropdown">
            <a href="/#">
              <span>Sports</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <Link to="/sport/add">Add Sports</Link>
              </li>
              <li>
                <Link to="/service-details">Service Details</Link>
              </li>
              <li>
                <Link to="/agent-profile">Agent Profile</Link>
              </li>
              <li>
                <Link to="/blog-details">Blog Details</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/404">404</Link>
              </li>
            </ul>
          </li> */}
              {/* <li className="dropdown">
            <a href="/#">
              <span>More Pages</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <Link to="/property-details">Property Details</Link>
              </li>
              <li>
                <Link to="/service-details">Service Details</Link>
              </li>
              <li>
                <Link to="/agent-profile">Agent Profile</Link>
              </li>
              <li>
                <Link to="/blog-details">Blog Details</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/404">404</Link>
              </li>
            </ul>
          </li> */}
              {/* <li className="dropdown">
                <Link to="/#">
                  <span>Dropdown</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </Link>
                <ul>
                  <li>
                    <Link to="/#">Dropdown 1</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/#">
                      <span>Deep Dropdown</span>{" "}
                      <i className="bi bi-chevron-down toggle-dropdown" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/#">Deep Dropdown 1</Link>
                      </li>
                      <li>
                        <Link to="/#">Deep Dropdown 2</Link>
                      </li>
                      <li>
                        <Link to="/#">Deep Dropdown 3</Link>
                      </li>
                      <li>
                        <Link to="/#">Deep Dropdown 4</Link>
                      </li>
                      <li>
                        <Link to="/#">Deep Dropdown 5</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/#">Dropdown 2</Link>
                  </li>
                  <li>
                    <Link to="/#">Dropdown 3</Link>
                  </li>
                  <li>
                    <Link to="/#">Dropdown 4</Link>
                  </li>
                </ul>
              </li> */}


            </ul>

          </nav>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          />
          {isLogin ?

            <>

            

              <li >
                <Link to="#" className="btn-getstarted" onClick={logout} >Logout {name}</Link>
              </li>
            </>

            :
            <li >
              <Link className="btn-getstarted" to="/login" >Login</Link>
            </li>
          }
        </div>
      </header>
    </>
  )
}