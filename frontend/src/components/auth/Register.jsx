import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { ClipLoader, MoonLoader } from "react-spinners"


export default function Register() {

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleForm = (data) => {
        setload(true)

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("contact", data?.contact);
        formData.append("profileImage", data.profileImage[0]);



        console.log("form Submitted", formData);
        ApiService.register(formData)
            .then((res) => {
                console.log(res)
                  if (res.data.success === false) {
      setload(false)
      toast.error("User already exists")
      return
    }
                

                if (res.data.success) {

                    
                    setload(false)
                    toast.success(res.data.message)

                    let logindata = {
                        email: data.email,
                        password: data.password
                    }
                    console.log(logindata);

                    ApiService.login(logindata)
                        .then((result) => {
                            console.log(result);
                            if (result.data.success) {
                                toast.success(result.data.message)
                                setload(false)
                                sessionStorage.setItem("isLogin", true)

                                sessionStorage.setItem("token", result.data.token)
                                sessionStorage.setItem("name", result.data.data.name)
                                sessionStorage.setItem("email", result.data.data.email)
                                sessionStorage.setItem("userType", result.data.data.userType)
                                sessionStorage.setItem("userId", result.data.data._id)
                                if (result.data.data.userType == "admin") {
                                    nav("/admin")
                                }
                                else if (result.data.data.userType == "coach") {
                                    nav("/farmer")
                                }
                                else {
                                    nav("/")
                                }

                            } else {
                                toast.error("something went wrong")
                            }
                        })
                        .catch((err) => {
                            setload(false)
                            toast.error(
                                err.response?.data?.message ||
                                err.message ||
                                "Something went wrong"
                            );
                            console.log("1", err);

                        })
                }
            })
            .catch((err) => {
                setload(false)
                toast.error(
                    err.response?.data?.message ||
                    err.message ||
                    "Something went wrong"
                );

            })

             .finally(()=>{
                setload(false)
            })
            
    }

    const handleError = (errors) => {
        setload(false);
        console.log("Form Errors:", errors);
        const firstError = Object.values(errors)[0];
        toast.error(firstError?.message || "Form has errors");
    };










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



                            <div className="container pt-5">
                                <div
                                    className="row justify-content-center"
                                    data-aos="fade-up"
                                    data-aos-delay={300}
                                >
                                    <div className="col-lg-10">
                                        <div className="contact-form-wrapper">
                                            <h2 className="text-center mb-4">Register</h2>
                                            <form
                                                action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}
                                                className="php-email-form"
                                            >
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
                                                                <input
                                                                   

                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Name"
                                                                    style={{ height: 55 }}
                                                                    {...register("name", {
                                                                        required: {
                                                                value: true,
                                                                message: "Name is required"
                                                            },
                                                            minLength: {
                                                                value: 3,
                                                                message: "Name must be at least 3 characters"
                                                            },
                                                            pattern: {
                                                                value: /^[A-Za-z\s]+$/,
                                                                message: "Name should contain only letters"
                                                            },
                                                            validate: (value) => {
                                                                if (value.trim().length === 0) {
                                                                    return "Name cannot be only spaces";
                                                                }
                                                                return true;
                                                            }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-envelope" />
                                                                <input
                                                                   
                                                                    type="email"
                                                                    className="form-control  "
                                                                    placeholder="Your Email"
                                                                    style={{ height: 55 }}
                                                                    {...register("email", {
                                                                        required: {
                                                                value: true,
                                                                message: "Email is required"
                                                            },
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Invalid email format"
                                                            }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-text-left" />
                                                                <input
                                                                   

                                                                    type="password"
                                                                    className="form-control "
                                                                    placeholder="Password"
                                                                    style={{ height: 55 }}
                                                                    {...register("password", {
                                                                         required: {
                                                                value: true,
                                                                message: "Password is required"
                                                            },
                                                            minLength: {
                                                                value: 8,
                                                                message: "Password must be at least 8 characters"
                                                            },
                                                            pattern: {
                                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                                                message: "Password must be 8+ chars, include uppercase, lowercase, number & special character"
                                                            }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-person-lines-fill"></i>
                                                                <input
                                                                   
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    maxLength={10}
                                                                     minLength={10}



                                                                    className="form-control "
                                                                    placeholder="Contact"
                                                                    style={{ height: 55 }}
                                                                    {...register("contact", {
                                                                        required: {
                                                                value: true,
                                                                message: "Contact is required"
                                                            },
                                                            pattern: {
                                                                value: /^[0-9]{10}$/,
                                                                message: "Contact must be exactly 10 digits not string"
                                                            }, validate: (value) =>
                                                                !/^0+$/.test(value) || "Invalid contact number"


                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-image"></i>
                                                                <input
                                                                    
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="form-control"
                                                                    {...register("profileImage", {
                                                                        required: "ProfileImage is required"
                                                                    })}
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
                                                        <button type="submit" className="btn btn-primary btn-submit">
                                                            Register
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </main>

            }
        </>
    )
}