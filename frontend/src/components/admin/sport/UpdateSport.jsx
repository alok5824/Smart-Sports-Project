import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { MoonLoader } from "react-spinners"

export default function UpdateSport() {

    let { id } = useParams()
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
    const[load,setLoad]=useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleSport(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("sportName", res.data.data.sportName);
                    setValue("maxPlayers", res.data.data.maxPlayers);
                    setValue("matchDuration", res.data.data.matchDuration);
                    setValue("description", res.data.data.description);



                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })

       

    }


    const handleForm = (data) => {
         setLoad(true)
         const formData = new FormData();

        formData.append("sportName", data.sportName);
        formData.append("description", data.description);
        formData.append("maxPlayers", data.maxPlayers);
        formData.append("matchDuration", data.matchDuration);
         formData.append("_id",id)
        // append image ONLY if selected
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        ApiService.updateSport(formData)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    toast.success(res.data.message)
                    setLoad(false)
                    nav("/admin/sport/all")
                }
                else {
                       setLoad(false)
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                   setLoad(false)
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
           setLoad(false)
        console.log("err", error);

    }


    return (
        <>

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
                            <MoonLoader size={50} />
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
                                            <h2 className="text-center mb-4">Update Sport</h2>
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
                                                                    placeholder=" Sport Name"
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
                                                        
                                                        type="file"
                                                        accept="image/*"
                                                        className="form-control"
                                                        {...register("image")}
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
                                                          Update
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
        </>
    )
}