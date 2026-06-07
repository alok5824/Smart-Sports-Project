import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"

export default function AddPlayer() {
    const userId = sessionStorage.getItem("userId")
    const nav = useNavigate()
    const [load, setLoad] = useState(false)
    const [teams, setTeams] = useState([])
    const [teamId, setTeamId] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        // Coach ki apni team fetch karo
        ApiService.allTeam({ coachId: userId })
            .then((res) => {
                if (res.data.success) {
                    setTeams(res.data.data)
                    // Agar sirf ek team hai toh auto select
                    if (res.data.data.length === 1) {
                        setTeamId(res.data.data[0]._id)
                    }
                }
            })
            .catch((err) => toast.error(err.message))
    }, [])

    const handleForm = (data) => {
        if (!teamId) {
            toast.error("Please select a team")
            return
        }
        setLoad(true)

        const formData = new FormData()
        formData.append("playerName", data.playerName)
        formData.append("age", data.age)
        formData.append("position", data.position)
        formData.append("jerseyNumber", data.jerseyNumber)
        formData.append("teamId", teamId)
        if (data.photo && data.photo[0]) {
            formData.append("photo", data.photo[0])
        }

        ApiService.addPlayer(formData)
            .then((res) => {
                setLoad(false)
                if (res.data.success) {
                    toast.success(res.data.message)
                    nav("/coach/player/all")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                setLoad(false)
                toast.error(err.message)
            })
    }

    const handleError = () => {
        toast.error("Please fill all required fields")
    }

    return (
        <>
            {load ? (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100vw", height: "100vh",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    display: "flex", justifyContent: "center",
                    alignItems: "center", zIndex: 9999
                }}>
                    <ClipLoader color="#000000" size={60} />
                </div>
            ) : (
                <main className="main">
                    <section id="contact-2" className="contact-2 section mt-5">
                        <div className="container">
                            <div className="row justify-content-center" data-aos="fade-up" data-aos-delay={300}>
                                <div className="col-lg-10">
                                    <div className="contact-form-wrapper">
                                        <h2 className="text-center mb-4">Add Player</h2>
                                        <form
                                            method="POST"
                                            onSubmit={handleSubmit(handleForm, handleError)}
                                            className="php-email-form"
                                        >
                                            <div className="row g-3">

                                                {/* Team Select */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-people" />
                                                            <select
                                                                className="form-control"
                                                                value={teamId}
                                                                onChange={(e) => setTeamId(e.target.value)}
                                                            >
                                                                <option value="" disabled>Select Team</option>
                                                                {teams.map((el) => (
                                                                    <option key={el._id} value={el._id}>
                                                                        {el.teamName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Player Name */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-person" />
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Player Name"
                                                                style={{ height: 55 }}
                                                                {...register("playerName", {
                                                                    required: "Player name is required"
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Age */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-calendar" />
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Age"
                                                                style={{ height: 55 }}
                                                                {...register("age", {
                                                                    required: "Age is required",
                                                                    min: { value: 10, message: "Minimum age is 10" },
                                                                    max: { value: 60, message: "Maximum age is 60" }
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Position */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-trophy" />
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Position (e.g. Forward, Goalkeeper)"
                                                                style={{ height: 55 }}
                                                                {...register("position", {
                                                                    required: "Position is required"
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Jersey Number */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-hash" />
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Jersey Number"
                                                                style={{ height: 55 }}
                                                                {...register("jerseyNumber", {
                                                                    required: "Jersey number is required",
                                                                    min: { value: 1, message: "Minimum jersey number is 1" },
                                                                    max: { value: 99, message: "Maximum jersey number is 99" }
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Photo */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-with-icon">
                                                            <i className="bi bi-image" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="form-control"
                                                                {...register("photo")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 text-center">
                                                    <button type="submit" className="btn btn-primary btn-submit">
                                                        Add Player
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
            )}
        </>
    )
}