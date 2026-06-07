import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { MoonLoader } from "react-spinners"

export default function UpdateTeam() {

    let { id } = useParams()
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
        const [load, setload] = useState(false)
    

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleTeam(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("teamName", res.data.data.teamName);
                    setValue("playersCount", res.data.data.playersCount);
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
           setload(true)
        const formData = new FormData();

        formData.append("teamName", data.teamName);
        // formData.append("duration", data.duration);
        formData.append("description", data.description);
        // formData.append("seasonId", seasonId);
        // formData.append("landId", landId);
        formData.append("_id",id)
        // append image ONLY if selected
        if (data.logo && data.logo[0]) {
            formData.append("logo", data.logo[0]);
        }

        
        console.log("form Submitted", data);
        ApiService.updateTeam(formData)
            .then((res) => {
                if (res.data.success) {
                       setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/coach/team/all")
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
                                        <h2 className="text-center mb-4">Update Team</h2>
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
                                                                required

                                                                type="text"
                                                                className="form-control "
                                                                placeholder="Team Name"
                                                                style={{ height: 55 }}
                                                                {...register("teamName", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "teamName is req"
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
                                               
                                               

                                                {/* <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-person" />
                                                            <input
                                                                required

                                                                type="number"
                                                                className="form-control "
                                                                placeholder="Players Count"
                                                                style={{ height: 55 }}
                                                                {...register("playersCount", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "playersCount is req"
                                                                    }
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div> */}
                                                {/* <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-person" />
                                                            <input
                                                                required

                                                                type="text"
                                                                className="form-control "
                                                                placeholder="Bio"
                                                                style={{ height: 55 }}
                                                                {...register("bio", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "bio is req"
                                                                    }
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div> */}
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
                                                                    <option key={index} value={el.userId}>
                                                                        {el?.userId?.name}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-text-left" />
                                                            <input
                                                               
                                                                type="file"
                                                                accept="image/*"
                                                                placeholder="Logo"
                                                                className="form-control"
                                                                {...register("logo")}
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
                                                       Update team
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