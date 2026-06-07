import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import ApiService from "../../../services/ApiService";
import Select from "../../pages/TeamSelect";
import TeamSelect from "../../pages/TeamSelect";
import { ClipLoader } from "react-spinners";

export default function AddMatch() {
    let nav = useNavigate()
    const [load, setload] = useState(false)
    const today = new Date().toISOString().split("T")[0];


    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const [sport, setSport] = useState([])
    const [sportId, setSportId] = useState("")
    const [applications, setApplications] = useState([])
    const [leagueList, setLeagueList] = useState([])
    const [leagueId, setLeagueId] = useState("")
    // const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [announcementDates, setAnnouncementDates] = useState({ startDate: "", endDate: "" });
    const [predictedAttendance, setPredictedAttendance] = useState(null);




    // const [coach, setCoach] = useState([])
    // const [coachId, setCoachId] = useState("")
    const [team, setTeam] = useState([])
    const [teamId, setTeamId] = useState("")
    const [seatLayout, setSeatLayout] = useState([
        { rowName: "", price: "", seats: "" },
        { rowName: "", price: "", seats: "" },
        { rowName: "", price: "", seats: "" },
    ]);


    const data = {
        status: "Active"
    }


    const matchDate = watch("matchDate");
    const matchTime = watch("matchTime");
    const matchName = watch("matchName");

    useEffect(() => {
        if (!matchDate || !matchTime || !matchName) return;

        const matchData = { matchDate, matchTime, matchName };

        ApiService.predictAttendance(matchData)
            .then(res => {
                if (res.data && res.data.data && res.data.data.attendance != null) {
                    setPredictedAttendance(res.data.data.attendance);
                }
            })
            .catch(err => {
                console.log("Attendance prediction error:", err);
                setPredictedAttendance(null);
            });
    }, [matchDate, matchTime, matchName]);










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


        ApiService.allMatchApplication({ status: "Approved" })
            .then((res) => {
                if (res.data.success) {
                    setApplications(res.data.data)
                }
            })
            .catch(err => toast.error(err.message))







    }
    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        if (!sportId || !leagueId) {
            setTeam([])
            setTeamId("")
            return
        }

        const filteredTeams = applications
            .filter(app =>
                app.sportsId?._id === sportId &&
                app.leagueId?._id === leagueId &&
                app.status === "Approved"
            )
            .map(app => app.teamId)

        const uniqueTeams = [
            ...new Map(filteredTeams.map(t => [t._id, t])).values()
        ]

        setTeam(uniqueTeams)
    }, [sportId, leagueId, applications])


    useEffect(() => {
        if (!sportId) {
            setLeagueList([])
            setLeagueId("")
            return
        }

        const filteredLeagues = applications
            .filter(app =>
                app.sportsId?._id === sportId &&
                app.status === "Approved"
            )
            .map(app => app.leagueId)

        // remove duplicate leagues
        const uniqueLeagues = [
            ...new Map(filteredLeagues.map(l => [l._id, l])).values()
        ]

        setLeagueList(uniqueLeagues)
    }, [sportId, applications])


    // Fetch all announcements
    // Fetch all announcements once
    useEffect(() => {
        if (!leagueId || leagueList.length === 0) {
            setAnnouncementDates({ startDate: "", endDate: "" });
            return;
        }

        // leagueId already IS announcementId
        const selectedAnnouncement = leagueList.find(
            l => l._id.toString() === leagueId.toString()
        );

        if (!selectedAnnouncement?.startDate || !selectedAnnouncement?.endDate) {
            setAnnouncementDates({ startDate: "", endDate: "" });
            return;
        }

        const formatDate = (d) =>
            new Date(d).toISOString().split("T")[0];
        console.log("League:", selectedAnnouncement);
        console.log("Dates:", announcementDates);

        setAnnouncementDates({
            startDate: formatDate(selectedAnnouncement.startDate),
            endDate: formatDate(selectedAnnouncement.endDate),
        });
    }, [leagueId, leagueList]);
















    const handleForm = (data) => {
        const formattedSeats = seatLayout.map(row => ({
            rowName: row.rowName,
            price: Number(row.price),
            seats: Number(row.seats)
        }));
        data.sportsId = sportId
        data.leagueId = leagueId
        data.seatLayout = seatLayout

        data.teamId = teamId

        setload(true)
        // const formData = new FormData();

        // formData.append("sportName", data.sportName);
        // formData.append("description", data.description);
        // formData.append("maxPlayers", data.maxPlayers);
        // formData.append("matchDuration", data.matchDuration);



        // SINGLE IMAGE
        // formData.append("image", data.image[0]);

        console.log("form Submitted", data);
        ApiService.addMatch(data)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)


                    nav("/admin/match/all")
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
                                            <h2 className="text-center mb-4">Add Match </h2>
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
                                                            <div className="input-with-icon">
                                                                <i className="bi bi-trophy" />
                                                                <select
                                                                required
                                                                    className="form-control"
                                                                    value={leagueId}
                                                                    onChange={(e) => setLeagueId(e.target.value)}
                                                                    disabled={!sportId}
                                                                >
                                                                    <option value="" disabled>
                                                                        Select League
                                                                    </option>

                                                                    {leagueList.map((league, index) => (
                                                                        <option key={index} value={league._id}>
                                                                            {league.leagueName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>








                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-body-text"></i>
                                                                <input
                                                                    required

                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Match Name"
                                                                    style={{ height: 55 }}
                                                                    {...register("matchName", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "matchName is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
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
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-calendar-fill"></i>
                                                                <input
                                                                    required
                                                                    type="date"
                                                                    className="form-control"

                                                                    min={announcementDates.startDate || today}
                                                                    max={announcementDates.endDate || undefined}
                                                                    {...register("matchDate", {
                                                                        required: "matchDate is required"
                                                                    })}
                                                                />

                                                                {announcementDates.startDate && announcementDates.endDate && (
                                                                    <small className="text-muted">
                                                                        Match date must be between{" "}
                                                                        {announcementDates.startDate} and {announcementDates.endDate}
                                                                    </small>
                                                                )}







                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="input-with-icon">
                                                                <i class="bi bi-clock-fill"></i>
                                                                <input
                                                                    required

                                                                    type="time"
                                                                    className="form-control "
                                                                    placeholder="Match Time"
                                                                    style={{ height: 55 }}
                                                                    {...register("matchTime", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "matchTime is req"
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {predictedAttendance !== null && (
                                                        <div className="alert alert-info mt-2">
                                                            Predicted Attendance: {predictedAttendance}
                                                        </div>
                                                    )}





                                                    <div className="col-md-6">
                                                        <div className="form-group">


                                                            <div className="input-with-icon">

                                                                {/* <TeamSelect
                                                                    team={team}
                                                                    teamId={teamId}
                                                                    setTeamId={setTeamId}
                                                                /> */}
                                                                <TeamSelect
                                                                    team={leagueId ? team : []}
                                                                    teamId={teamId}
                                                                    setTeamId={setTeamId}
                                                                />
                                                                {!leagueId && (
                                                                    <small className="text-muted">
                                                                        Please select a league first
                                                                    </small>
                                                                )}



                                                            </div>

                                                            {/* <small className="text-muted">
                                                                Hold Ctrl (Windows) / Cmd (Mac) to select exactly 2 teams
                                                            </small> */}
                                                        </div>
                                                    </div>



                                                    <div className="col-12">
                                                        <h5>Seat Layout</h5>
                                                        <label htmlFor=""> Add: RowName, Price, Seat Number</label>
                                                        {seatLayout.map((row, index) => (
                                                            <div className="row g-2 mb-2" key={index}>

                                                                {/* Row Name */}
                                                                <div className="col-md-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Row Name"
                                                                        value={row.rowName}
                                                                        onChange={(e) => {
                                                                            const newLayout = [...seatLayout];
                                                                            newLayout[index].rowName = e.target.value;
                                                                            setSeatLayout(newLayout);
                                                                        }}
                                                                    />
                                                                </div>

                                                                {/* Price */}
                                                                <div className="col-md-4">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Price"
                                                                        value={row.price}
                                                                        onChange={(e) => {
                                                                            const newLayout = [...seatLayout];
                                                                            newLayout[index].price = e.target.value;
                                                                            setSeatLayout(newLayout);
                                                                        }}
                                                                    />
                                                                </div>

                                                                {/* Seats */}
                                                                <div className="col-md-3">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Seats"
                                                                        value={row.seats}
                                                                        onChange={(e) => {
                                                                            const newLayout = [...seatLayout];
                                                                            newLayout[index].seats = e.target.value;
                                                                            setSeatLayout(newLayout);
                                                                        }}
                                                                    />
                                                                </div>

                                                                {/* Remove Row Button */}
                                                                <div className="col-md-1">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            const newLayout = seatLayout.filter((_, i) => i !== index);
                                                                            setSeatLayout(newLayout);
                                                                        }}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        ))}

                                                        {/* Add Row Button */}
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary mt-2"
                                                            onClick={() => setSeatLayout([...seatLayout, { rowName: "", price: "", seats: "" }])}
                                                        >
                                                            Add Row
                                                        </button>
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