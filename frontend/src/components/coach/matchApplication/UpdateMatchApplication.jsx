import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"

export default function UpdateMatch() {

    let { id } = useParams()
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
    const [load, setLoad] = useState(false)
    
    useEffect(() => {
        fetchData()
    }, [])
    

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleMatch(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("venue", res.data.data.venue);
                    
                    setValue("adminRemarks", res.data.data.adminRemarks);
                    setValue("preferredDate", res.data.data.preferredDate
            ? new Date(res.data.data.preferredDate).toISOString().split("T")[0]
            : "")




                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })



    }


    const handleForm = (data) => {

        data._id = id

        ApiService.updateMatch(data)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/match/all")
                }
                else {
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
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
                                            <h2 className="text-center mb-4">Update Match Application</h2>
                                            <form
                                                action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}
                                                className="php-email-form"
                                            >
                                                <div className="row g-3">

                                                    {/* <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
                                                                <select
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
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
                                                                <select
                                                                    className="form-control"
                                                                    value={coachId}
                                                                    onChange={(e) => setCoachId(e.target.value)}
                                                                >
                                                                    <option value="" disabled>
                                                                        Select Coach
                                                                    </option>

                                                                    {coach.map((el, index) => (
                                                                        <option key={index} value={el.userId._id}>
                                                                            {el?.userId?.name}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
                                                                <select
                                                                    className="form-control"
                                                                    value={teamId}
                                                                    onChange={(e) => setTeamId(e.target.value)}
                                                                >
                                                                    <option value="" disabled>
                                                                        Select team
                                                                    </option>

                                                                    {team.map((el, index) => (
                                                                        <option key={index} value={el._id}>
                                                                            {el.teamName}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
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
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-text-left" />
                                                                <input


                                                                    type="date"
                                                                    className="form-control "
                                                                    placeholder="Preferred Date"
                                                                    style={{ height: 55 }}
                                                                    {...register("preferredDate", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "preferredDate is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-person" />
                                                                <input
                                                                    required

                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="AdminRemarks"
                                                                    style={{ height: 55 }}
                                                                    {...register("adminRemarks", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "adminRemarks is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="col-12">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-text-left" />
                                                                <input
                                                        required
                                                        type="file"
                                                        accept="image/*"
                                                        className="form-control"
                                                        {...register("profileImage", {
                                                            required: "profileImage is required"
                                                        })}
                                                    />
                                                            </div>
                                                        </div>
                                                    </div> */}
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
}