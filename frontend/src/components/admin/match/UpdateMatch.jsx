import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import ApiService from "../../../services/ApiService";
import TeamSelect from "../../pages/TeamSelect";

export default function UpdateMatch() {
  const { id } = useParams();
  const nav = useNavigate();
  const [load, setLoad] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const { register, handleSubmit, setValue } = useForm();
  const [sport, setSport] = useState([]);
  const [sportId, setSportId] = useState("");
  const [applications, setApplications] = useState([]);
  const [leagueList, setLeagueList] = useState([]);
  const [leagueId, setLeagueId] = useState("");
  const [team, setTeam] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [seatLayout, setSeatLayout] = useState([]);

  const [isEditLoaded, setIsEditLoaded] = useState(false);

  // Fetch all sports & applications
  const fetchData = () => {
    ApiService.allSport({ status: "Active" })
      .then((res) => {
        if (res.data.success) setSport(res.data.data);
      })
      .catch((err) => toast.error(err.message));

    ApiService.allMatchApplication({ status: "Approved" })
      .then((res) => {
        if (res.data.success) setApplications(res.data.data);
      })
      .catch((err) => toast.error(err.message));
  };

  // Fetch match data
 const fetchMatch = () => {
  ApiService.singleMatch({ _id: id })
    .then((res) => {
      if (res.data.success) {
        const match = res.data.data;

        setSportId(match.sportsId?._id || "");
        setLeagueId(match.leagueId?._id || "");
        setTeamId(match.teamId?._id || "");
        setSeatLayout(match.seatLayout || []);

        setValue("matchName", match.matchName);
        setValue("venue", match.venue);
        setValue(
          "matchDate",
          match.matchDate
            ? new Date(match.matchDate).toISOString().split("T")[0]
            : ""
        );
        setValue("matchTime", match.matchTime);

        setIsEditLoaded(true); // ⭐ ADD THIS
      }
    })
    .catch((err) => toast.error(err.message));
};


  useEffect(() => {
    fetchData();
    fetchMatch();
  }, []);

  // Filter leagues by sport
  
  // ✅ Filter leagues by sport (EDIT SAFE)
useEffect(() => {
  if (!sportId) {
    setLeagueList([]);
    if (isEditLoaded) setLeagueId("");
    return;
  }

  const leagues = applications
    .filter(
      (app) =>
        String(app.sportsId?._id) === String(sportId) &&
        app.status === "Approved"
    )
    .map((app) => app.leagueId);

  setLeagueList([
    ...new Map(leagues.map((l) => [l._id, l])).values(),
  ]);
}, [sportId, applications, isEditLoaded]);

  // Filter teams by sport & league
  
  
useEffect(() => {
  if (!sportId || !leagueId) {
    setTeam([]);
    if (isEditLoaded) setTeamId("");
    return;
  }

  const teams = applications
    .filter(
      (app) =>
        String(app.sportsId?._id) === String(sportId) &&
        String(app.leagueId?._id) === String(leagueId) &&
        app.status === "Approved"
    )
    .map((app) => app.teamId);

  setTeam([
    ...new Map(teams.map((t) => [t._id, t])).values(),
  ]);
}, [sportId, leagueId, applications, isEditLoaded]);



//test





  // Handle form submit
  const handleForm = (data) => {
    const formattedSeats = seatLayout.map((row) => ({
      rowName: row.rowName,
      price: Number(row.price),
      seats: Number(row.seats),
      bookedSeats: row.bookedSeats || [] 
    }));

    data._id = id;
    data.sportsId = sportId;
    data.leagueId = leagueId;
    data.teamId = teamId;
    data.seatLayout = formattedSeats;

    setLoad(true);

    ApiService.updateMatch(data)
      .then((res) => {
        setLoad(false);
        if (res.data.success) {
          toast.success(res.data.message);
          nav("/admin/match/all");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoad(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      {load && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ transform: "translateY(-40px)" }}>
            <MoonLoader size={50} />
          </div>
        </div>
      )}

      <main className="main">
        <section id="contact-2" className="contact-2 section mt-5">
          <div className="container">
            <div className="row justify-content-center" data-aos="fade-up" data-aos-delay={300}>
              <div className="col-lg-10">
                <div className="contact-form-wrapper">
                  <h2 className="text-center mb-4">Update Match</h2>
                  <form onSubmit={handleSubmit(handleForm)} className="php-email-form">
                    <div className="row g-3">
                      {/* Sport Select */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-with-icon">
                            <i className="fas fa-volleyball-ball"></i>
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

                      {/* League Select */}
                    
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

                      {/* Match Name */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-with-icon">
                            <i className="bi bi-body-text"></i>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Match Name"
                              {...register("matchName", { required: true })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-with-icon">
                            <i className="bi bi-geo-fill"></i>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Venue"
                              {...register("venue", { required: true })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Match Date */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-with-icon">
                            <i className="bi bi-calendar-fill"></i>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Match Date"
                              min={today}
                              {...register("matchDate", { required: true })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Match Time */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-with-icon">
                            <i className="bi bi-clock-fill"></i>
                            <input
                              type="time"
                              className="form-control"
                              placeholder="Match Time"
                              {...register("matchTime", { required: true })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Team Select */}
                      <div className="col-md-6">
                        
                        <TeamSelect required team={leagueId ? team : []} teamId={teamId} setTeamId={setTeamId} />
                      </div>

                      {/* Seat Layout */}
                      <div className="col-12">
                        <h5>Seat Layout</h5>
                        {seatLayout.map((row, index) => (
                          <div className="row g-2 mb-2" key={index}>
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
                            <div className="col-md-1">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() =>
                                  setSeatLayout(seatLayout.filter((_, i) => i !== index))
                                }
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          onClick={() =>
                            setSeatLayout([...seatLayout, { rowName: "", price: "", seats: "" }])
                          }
                        >
                          Add Row
                        </button>
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
    </>
  );
}
