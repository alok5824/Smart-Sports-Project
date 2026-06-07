import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ClipLoader, MoonLoader } from "react-spinners";
import ApiService from "../../../services/ApiService";

export default function AddAnnounce() {
    let nav = useNavigate()
    const [load, setload] = useState(false)
    const [sport, setSport] = useState([])
    const [sportId, setSportId] = useState("")
    const today = new Date().toISOString().split("T")[0];

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const data = {
        status: "Active"
    }

    const fetchData = () => {


        ApiService.allSport(data)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setSport(res.data.data)


                }
                else {
                    // toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })



    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleForm = (data) => {
        setload(true)
        const formData = new FormData();
        formData.append("leagueName", data.leagueName)
        formData.append("venue", data.venue);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("sportsId", sportId)
        formData.append("description", data.description);

        formData.append("maxTeams", data.maxTeams);
        formData.append("lastApplyDate", data.lastApplyDate);



        // SINGLE IMAGE
        formData.append("image", data.image[0]);

        console.log("form Submitted", data);
        ApiService.addAnnouncment(formData)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)
                    reset()


                    nav("/admin/announce/all")
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
            .finally(()=>{
                setload(false)
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
                    (<div style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}>
                        <div style={{ transform: "translateY(-40px)" }}>
                            <ClipLoader size={50} />
                        </div>
                    </div>)
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
                                            <h2 className="text-center mb-4">Add League Announcment</h2>
                                            <form
                                                action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}
                                                className="php-email-form"
                                            >
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">SportName</label>
                                                            <div className="input-with-icon">
                                                                <i class="fas fa-volleyball-ball"></i>

                                                                <select
                                                                    required
                                                                    className="form-control"
                                                                    value={sportId}
                                                                    onChange={(e) => setSportId(e.target.value)}
                                                                >
                                                                    <option value="" disabled>
                                                                        Select sport
                                                                    </option>

                                                                    {sport.map((el, index) => (
                                                                        <option key={index} value={el._id}>
                                                                            {el.sportName}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">League Name</label>
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-trophy" />

                                                                <input
                                                                    required

                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="League Name"
                                                                    style={{ height: 55 }}
                                                                    {...register("leagueName", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "leagueName is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Venue</label>
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-geo-fill"></i>
                                                                <input
                                                                    required

                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Venue"
                                                                    style={{ height: 55 }}
                                                                    {...register("venue", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "venue is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Description</label>
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-chat-dots message-icon" />

                                                                <input
                                                                    required

                                                                    type="text"
                                                                    className="form-control "
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
                                                            <label htmlFor="">Start Date</label>

                                                            <div className="input-with-icon">

                                                                <i class="bi bi-calendar-fill"></i>


                                                                <input

                                                                    required
                                                                    type="date"
                                                                    className="form-control  "
                                                                    placeholder="Start Date"
                                                                    style={{ height: 55 }}
                                                                    min={today}
                                                                    {...register("startDate", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "startDate is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">End Date</label>
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-calendar-fill"></i>

                                                                <input
                                                                    required
                                                                    min={today}
                                                                    type="date"
                                                                    className="form-control  "
                                                                    placeholder="End Date"
                                                                    style={{ height: 55 }}
                                                                    {...register("endDate", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "endDate is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Last Apply Date</label>
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-calendar-fill"></i>
                                                                <input
                                                                    required
                                                                    min={today}
                                                                    type="date"
                                                                    className="form-control "
                                                                    placeholder="Last Apply Date "
                                                                    style={{ height: 55 }}
                                                                    {...register("lastApplyDate", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "lastApplyDate is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">MaxTeams</label>
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
                                                                <input
                                                                    required

                                                                    type="number"
                                                                    className="form-control "
                                                                    placeholder="Max Teams"
                                                                    style={{ height: 55 }}
                                                                    {...register("maxTeams", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "maxTeams is req"
                                                                        },
                                                                        min: {
                                                                            value: 2,
                                                                            message: "Minimum 2 teams are required"
                                                                        }

                                                                    })}
                                                                />
                                                                {errors.maxTeams && (
                                                                    <small className="text-danger">
                                                                        {errors.maxTeams.message}
                                                                    </small>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="">Image</label>
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-image" />
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