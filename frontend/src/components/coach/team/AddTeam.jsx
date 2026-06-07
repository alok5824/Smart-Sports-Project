import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { ClipLoader, MoonLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"


export default function AddTeam() {

    const userId = sessionStorage.getItem("userId")

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
    const [sport, setSport] = useState([])
    const [sportId, setSportId] = useState("")
    const [coach, setCoach] = useState([])
    const [coachId, setCoachId] = useState("")
    const [maxPlayers, setMaxPlayers] = useState(null)
    const [selectedSport, setSelectedSport] = useState(""); // empty means none selected
    const [coachSportId, setCoachSportId] = useState(null)



    const data = {
        status: "Approved"
    }


    // const fetchData = () => {


    //     ApiService.allSport({status:"Active"})
    //         .then((res) => {
    //             console.log(res)
    //             if (res.data.success) {
    //                 setSport(res.data.data)


    //             }
    //             else {
    //                 // toast.error(res.data.message)
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error(err.message)
    //         })

    //     ApiService.allCoach(data)
    //         .then((res) => {
    //             console.log(res)
    //             if (res.data.success) {
    //                 setCoach(res.data.data)


    //             }
    //             else {
    //                 // toast.error(res.data.message)
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error(err.message)
    //         })




    // }

    const fetchData = () => {

    // 1. Fetch all coaches
    ApiService.allCoach({ status: "Approved" })
        .then((res) => {
            if (res.data.success) {
                const coachList = res.data.data;

                // find logged-in coach
                const myCoach = coachList.find(
                    c => c.userId?._id === userId
                );

                if (myCoach?.sportsId) {
                   setCoachSportId(myCoach.sportsId._id);

                }
            }
        })
        .catch(err => toast.error(err.message));


    // 2. Fetch all sports
    ApiService.allSport({ status: "Active" })
        .then((res) => {
            if (res.data.success) {
                setSport(res.data.data);
            }
        })
        .catch(err => toast.error(err.message));
};


    // const fetchData = async () => {
    //     try {
    //         // 1️⃣ get all sports
    //         const sportRes = await ApiService.allSport({ status: "Active" });
    //         if (!sportRes.data.success) return;

    //         // 2️⃣ get all coaches
    //         const coachRes = await ApiService.allCoach({ status: "Approved" });
    //         if (!coachRes.data.success) return;

    //         // 3️⃣ find logged-in coach
    //         const loggedCoach = coachRes.data.data.find(
    //             c => c.userId?._id === userId
    //         );

    //         if (!loggedCoach) {
    //             toast.error("Coach not found");
    //             return;
    //         }

    //         // 4️⃣ get coach sportId
    //         const coachSportId = loggedCoach.sportId?._id || loggedCoach.sportId;

    //         // 5️⃣ filter sport list
    //         const filteredSport = sportRes.data.data.filter(
    //             s => s._id === coachSportId
    //         );

    //         setSport(filteredSport);
    //         setSportId(coachSportId);          // auto-select
    //         setMaxPlayers(filteredSport[0]?.maxPlayers || 0);
    //         setValue("playersCount", filteredSport[0]?.maxPlayers || 0);

    //     } catch (err) {
    //         toast.error(err.message);
    //     }
    // };


    useEffect(() => {
        fetchData()
    }, [])
    const filteredSports = sport.filter(
    s => s._id === coachSportId
);
useEffect(() => {
    if (filteredSports.length === 1) {
        const s = filteredSports[0];
        setSportId(s._id);
        setMaxPlayers(s.maxPlayers);
        setValue("playersCount", s.maxPlayers);
    }
}, [filteredSports]);





    const handleForm = (data) => {
        setload(true)

        const formData = new FormData();
        formData.append("teamName", data?.teamName);
        formData.append("description", data?.description);

        formData.append("playersCount", data?.playersCount);
        formData.append("sportsId", sportId)
        formData.append("coachId", userId)



        formData.append("logo", data.logo[0]);



        console.log("form Submitted", formData);
        ApiService.addTeam(formData)
            .then((res) => {
                console.log(res)

                if (res.data.success) {
                    setload(false)
                    toast.success(res.data.message)
                    nav("/coach/team/all")


                } else {
                    setload(false)
                    toast.error(res.data.message)
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

    const handleError = (errors) => {
        setload(false);
        console.log("Form Errors:", errors);
        toast.error(
            errors.response?.data?.message ||
            errors.message ||
            "Something went wrong"
        );
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

                        <section id="contact-2" className="contact-2 section mt-5">



                            <div className="container">
                                <div
                                    className="row justify-content-center"
                                    data-aos="fade-up"
                                    data-aos-delay={300}
                                >
                                    <div className="col-lg-10">
                                        <div className="contact-form-wrapper">
                                            <h2 className="text-center mb-4">Add Team</h2>
                                            <form
                                                action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}
                                                className="php-email-form"
                                            >
                                                <div className="row g-3">


                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i class="fas fa-volleyball-ball"></i>

                                                                <select
                                                                    className="form-control"
                                                                    value={sportId}
                                                                    onChange={(e) => {
                                                                        const selectedSportId = e.target.value;
                                                                        setSportId(selectedSportId);

                                                                        const selectedSport = filteredSports.find(
                                                                            s => s._id === selectedSportId
                                                                        );

                                                                        const max = selectedSport?.maxPlayers || 0;
                                                                        setMaxPlayers(max);
                                                                        setValue("playersCount", max);
                                                                    }}
                                                                >
                                                                    <option value="" disabled>Select sport</option>

                                                                    {filteredSports.map((el) => (
                                                                        <option key={el._id} value={el._id}>
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
                                                                <input
                                                                    required
                                                                    readOnly
                                                                    max={maxPlayers}
                                                                    type="number"
                                                                    className="form-control "
                                                                    placeholder="Players Count"
                                                                    style={{ height: 55 }}
                                                                    {...register("playersCount", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "playersCount is req"
                                                                        },
                                                                        max: {
                                                                            value: maxPlayers,
                                                                            message: `Max players allowed is ${maxPlayers}`
                                                                        }
                                                                    })}
                                                                />
                                                            </div>

                                                            {/* ⚠️ Warning if no sport selected */}
                                                            {!selectedSport && (
                                                                <p className="text-danger mt-1">Please select a sport first</p>
                                                            )}
                                                        </div></div>


                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-body-text" />
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
                                                                <i className="bi bi-chat" />
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
                                                                <i className="bi bi-image" />
                                                                <input
                                                                    required
                                                                    type="file"
                                                                    accept="image/*"
                                                                    placeholder="Logo"
                                                                    className="form-control"
                                                                    {...register("logo", {
                                                                        required: "logo is required"
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
                                                            Add team
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