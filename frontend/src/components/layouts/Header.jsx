import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            to="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.webp" alt=""> */}
            <h1 className="sitename">Sports </h1>
          </Link>
          <nav id="navmenu" className={`navmenu ${mobileOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>

              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* <li>
                <Link to="/properties">Properties</Link>
              </li> */}
              <li>
                <Link to="/sport/manage">Sports</Link>
              </li>

              <li>
                <Link to="/team/userTeam">Teams</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>



              {/* <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li className="dropdown">
            <Link to="/#">
              <span>More Pages</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </Link>
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
          </li>
          <li className="dropdown">
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
           {isLogin ?
           <>
              <li>
                <Link to="/booking/manage">Bookings</Link>
              </li>
              </>
              :
              ""
            }


            </ul>


          </nav>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          />
          {/* <Link className="btn-getstarted" to="/">
           
          </Link> */}
          {isLogin ?

            <>

              {/* <Link to="/booking/manage" className="nav-item nav-link">All Booking</Link> */}

              <li style={{listStyle:"none"}} >
                <Link to="#" className="btn-getstarted" onClick={logout} >Logout {name}</Link>
              </li>
            </>

            :
            <>
            <li>
              <Link className="btn-getstarted" to="/login"> Login</Link>
            </li>
            </>
          }
        </div>
      </header>
    </>
  )
}