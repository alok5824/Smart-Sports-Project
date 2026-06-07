import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CloseIcon from "@mui/icons-material/Close";
import "./SportSuggestion.css";
import ApiService from "../../services/ApiService";

export default function SportSuggestion() {
  const [open, setOpen] = useState(false);
  const [sport, setSport] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   if (!sport) return;

  //   try {
  //     setLoading(true);

  //     const res = await ApiService.getMatchesBySport({
  //       sportName: sport
  //     });

  //     console.log("FULL API:", res.data);

  //     // correct structure
  //     setResult(res.data.data.matches);

  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
  if (!sport) return;

  try {
    setLoading(true);

    const res = await ApiService.getMatchesBySport({
      sportName: sport
    });

    console.log("FULL RESPONSE:", res);

    if (res && res.data && res.data.success) {
      setResult(res.data.data.matches);
    } else {
      console.log("API failed");
      setResult([]);
    }

  } catch (err) {
    console.error("API ERROR:", err.response || err.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      {/* Floating Bubble */}
      <div className="sport-bubble" onClick={() => setOpen(true)}>
        <SportsSoccerIcon />
      </div>

      {/* Popup Panel */}
      {open && (
        <Paper elevation={6} className="sport-panel">
          <div className="panel-header">
            <h3>Matches Info</h3>
            <CloseIcon className="close-icon" onClick={() => setOpen(false)} />
          </div>

          <TextField
            label="Sport name"
            placeholder="Eg: Cricket"
            fullWidth
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            margin="normal"
          />

          {Array.isArray(result) && result.length > 0 && (
            <div className="result">
              <h4>Matches Found:</h4>
           

              {result.map((match, index) => {
                const formattedDate = new Date(match.matchDate).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                 
                  <div key={index} style={{ marginBottom: "15px" }}>
                     <h5>{match.matchName}</h5>
                   <p><b>{match.teams?.join(" vs ")}</b></p>

                    <p>Date: {formattedDate}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}



          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            className="submit-btn"
          >
            {loading ? "Loading..." : "GET SUGGESTION"}
          </Button>




        </Paper>
      )}
    </>
  );
}
