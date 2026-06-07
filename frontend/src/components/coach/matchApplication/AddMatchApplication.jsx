import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ClipLoader, MoonLoader } from "react-spinners";
import ApiService from "../../../services/ApiService";

export default function AddMatchApplication() {
    let nav = useNavigate()
    const{id,sportsId}=useParams()
    const [load, setload] = useState(false)
    const userId=sessionStorage.getItem("userId")

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    //  const [sport, setSport] = useState([])
    // const [sportId, setSportId] = useState("")
    const [coach, setCoach] = useState([])
    const [coachId, setCoachId] = useState("")
    const [team, setTeam] = useState([])
    const [teamId, setTeamId] = useState("")




const fetchData = () => {
   const coachData={
        userId:userId
    }
    


        // ApiService.allSport()
        //     .then((res) => {
        //         console.log(res)
        //         if (res.data.success) {
        //             setSport(res.data.data)


        //         }
        //         else {
        //             // toast.error(res.data.message)
        //         }
        //     })
        //     .catch((err) => {
        //         toast.error(err.message)
        //     })

        ApiService.allCoach(coachData)
         
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    
                    setCoach(res.data.data)


                }
                else {
                    // toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            ApiService.allTeam({coachId:userId,status:"Active"})
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setTeam(res.data.data)


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
        data.sportsId=sportsId
        data.coachId=coachId
        data.teamId=teamId

        setload(true)
        // const formData = new FormData();

        // formData.append("sportName", data.sportName);
        // formData.append("description", data.description);
        // formData.append("maxPlayers", data.maxPlayers);
        // formData.append("matchDuration", data.matchDuration);



        // SINGLE IMAGE
        // formData.append("image", data.image[0]);
        data.sportsId=sportsId
        data.leagueId=id
        data.coachId=userId

        console.log("form Submitted", data);
        ApiService.addMatchApplication(data)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)


                    nav("/coach/matchapplication/all")
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
                                            <h2 className="text-center mb-4">Apply Match Application</h2>
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
                                                    </div> */}
                                                    {/* <div className="col-md-6">
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
                                                    </div> */}

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
                                                    </div>
                                                    {/* <div className="col-md-6">
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
                                                                    required

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
                                                    </div> */}

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
                                                            Apply
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