import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { MoonLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"

export default function UpdatePlayer() {
    const { id } = useParams()
    const nav = useNavigate()
    const [load, setLoad] = useState(false)
    const [currentPhoto, setCurrentPhoto] = useState(null)
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        ApiService.singlePlayer({ _id: id })
            .then((res) => {
                if (res.data.success) {
                    const p = res.data.data
                    setValue("playerName", p.playerName)
                    setValue("age", p.age)
                    setValue("position", p.position)
                    setValue("jerseyNumber", p.jerseyNumber)
                    setCurrentPhoto(p.photo)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => toast.error(err.message))
    }

    const handleForm = (data) => {
        setLoad(true)

        const formData = new FormData()
        formData.append("_id", id)
        formData.append("playerName", data.playerName)
        formData.append("age", data.age)
        formData.append("position", data.position)
        formData.append("jerseyNumber", data.jerseyNumber)

        // Photo sirf tab append karo jab naya select kiya ho
        if (data.photo && data.photo[0]) {
            formData.append("photo", data.photo[0])
        }

        ApiService.updatePlayer(formData)
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

    const handleError = (errors) => {
        console.log("err", errors)
    }

    return (
        <>
            {load ? (
                <div style={{
                    position: "fixed", inset: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", zIndex: 9999
                }}>
                    <div style={{ transform: "translateY(-40px)" }}>
                        <MoonLoader size={50} />
                    </div>
                </div>
            ) : (
                <main className="main">
                    <section id="contact-2" className="contact-2 section mt-5">
                        <div className="container">
                            <div className="row justify-content-center" data-aos="fade-up" data-aos-delay={300}>
                                <div className="col-lg-10">
                                    <div className="contact-form-wrapper">
                                        <h2 className="text-center mb-4">Update Player</h2>

                                        {/* Current Photo Preview */}
                                        {currentPhoto && (
                                            <div className="text-center mb-3">
                                                <img
                                                    src={currentPhoto}
                                                    alt="Current"
                                                    style={{
                                                        width: 80, height: 80,
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        border: "1px solid #ddd"
                                                    }}
                                                />
                                                <p className="text-muted mt-1" style={{ fontSize: 12 }}>
                                                    Current Photo
                                                </p>
                                            </div>
                                        )}

                                        <form
                                            method="POST"
                                            onSubmit={handleSubmit(handleForm, handleError)}
                                            className="php-email-form"
                                        >
                                            <div className="row g-3">

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
                                                                placeholder="Position"
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
                                                                    min: { value: 1, message: "Minimum is 1" },
                                                                    max: { value: 99, message: "Maximum is 99" }
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
                                                        <small className="text-muted">
                                                            Leave empty to keep current photo
                                                        </small>
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
                                                        Update Player
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