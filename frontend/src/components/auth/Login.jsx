import { useState } from "react"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader, MoonLoader } from "react-spinners"

export default function Login() {



    let nav = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [load, setload] = useState(false)

    const changeEmail = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)

    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleForm = (e) => {
        setload(true)
        e.preventDefault()
        let data = {
            email: email,
            password: password,

        }
        ApiService.login(data)
            .then((res) => {
                console.log(res);
                setload(false);

                if (res.data.success) {


                    if (res.data.data.status === false) {
                        toast.error("Your account is inactive. Please contact admin.");
                        return;
                    }
                    toast.success(res.data.message)

                    sessionStorage.setItem("isLogin", true)
                    sessionStorage.setItem("token", res.data.token)
                    sessionStorage.setItem("name", res.data.data.name)
                    sessionStorage.setItem("email", res.data.data.email)
                    sessionStorage.setItem("userType", res.data.data.userType)
                    sessionStorage.setItem("userId", res.data.data._id)
                    if (res.data.data.userType == "admin") {
                        nav("/admin")
                    }
                    else if (res.data.data.userType == "coach") {
                        nav("/coach")
                    }
                    else {
                        nav("/")
                    }

                } else {
                    setload(false)
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                setload(false)
                toast.error(err.message)
            })
             .finally(()=>{
                setload(false)
            })

    }


    return (
        <>
         {
                load ?
                   (
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
)
                    :
            <main className="main">

                <section id="contact-2" className="contact-2 section my-5">

                    {/* Google Maps (Full Width) */}

                    {/* Contact Form Section (Overlapping) */}
                    <div className="container pt-5">
                        <div
                            className="row justify-content-center "
                            data-aos="fade-up"
                            data-aos-delay={300}
                        >
                            <div className="col-lg-6">
                                <div className="contact-form-wrapper">
                                    <h2 className="text-center mb-4">Login</h2>
                                    <form
                                        action="" method="POST" onSubmit={handleForm}
                                        className="php-email-form"
                                    >
                                        <div className="row g-3">

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <i className="bi bi-envelope" />
                                                        <input
                                                            required
                                                            onChange={changeEmail}
                                                            type="email"
                                                            className="form-control  "
                                                            placeholder="Your Email"
                                                            style={{ height: 55 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <i className="bi bi-text-left" />
                                                        <input
                                                            required
                                                            onChange={changePassword}
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Your Password"
                                                            style={{ height: 55 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="loading">Loading</div>
                                                <div className="error-message" />
                                                <div className="sent-message">
                                                    Your message has been sent. Thank you!
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <button type="submit" className="btn btn-primary btn-submit mb-3">
                                                    Login
                                                </button>
                                                <p><Link to="/register" style={{ color: "#2c7a7b" }} >Signup as USER </Link>| <Link to="/coachregister">Coach</Link></p>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Contact 2 Section */}
            </main>
}
        </>
    )
}
