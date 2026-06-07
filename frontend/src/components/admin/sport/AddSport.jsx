import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { MoonLoader } from "react-spinners";
import ApiService from "../../../services/ApiService";

export default function AddSport() {
    let nav = useNavigate()
    const [load, setload] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleForm = (data) => {
        setload(true)
        const formData = new FormData();

        formData.append("sportName", data.sportName);
        formData.append("description", data.description);
        formData.append("maxPlayers", data.maxPlayers);
        formData.append("matchDuration", data.matchDuration);



        // SINGLE IMAGE
        formData.append("image", data.image[0]);

        console.log("form Submitted", data);
        ApiService.addSport(formData)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)


                    nav("/admin/sport/all")
                }
                else {
                    setload(false)
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                setload(false)
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
        setload(false)
        console.log("err", error);

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

                        <section id="contact-2" className="contact-2 section mt-5">



                            <div className="container">
                                <div
                                    className="row justify-content-center"
                                    data-aos="fade-up"
                                    data-aos-delay={300}
                                >
                                    <div className="col-lg-10">
                                        <div className="contact-form-wrapper">
                                            <h2 className="text-center mb-4">Add Sport</h2>
                                            <form
                                                action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}
                                                className="php-email-form"
                                            >
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i class="fas fa-volleyball-ball"></i>
                                                                <input
                                                                    required

                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Sport Name"
                                                                    style={{ height: 55 }}
                                                                    {...register("sportName", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "sportName is req"
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
                                                                    required
                                                                    type="text"
                                                                    className="form-control  "
                                                                    placeholder="Description"
                                                                    style={{ height: 55 }}
                                                                    {...register("description", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "description is req"
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
                                                                    required

                                                                    type="number"
                                                                    className="form-control "
                                                                    placeholder="Max Players"
                                                                    style={{ height: 55 }}
                                                                    {...register("maxPlayers", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "maxPlayers is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                               <i class="bi bi-stopwatch-fill"></i>
                                                                 <input
                                                                    required

                                                                    type="number"
                                                                    className="form-control "
                                                                    placeholder="Match Duration in Mins"
                                                                    style={{ height: 55 }}
                                                                    {...register("matchDuration", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "matchDuration is req"
                                                                        }
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
                                                        required
                                                        type="file"
                                                        accept="image/*"
                                                        className="form-control"
                                                        {...register("image", {
                                                            required: "image is required"
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
                                                          Add
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