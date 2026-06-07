const { uploadImg } = require("../../utilities/helper")
const MatchModel=require("./MatchModel")



const add = (req, res) => {
  let formData = req.body;

  let totalSeats = formData.seatLayout.reduce(
  (sum, row) => sum + Number(row.seats || 0),
  0
);

  // ✅ Parse teamId correctly
  Promise.resolve(formData.teamId)
    .then((teamId) => {
      // If already an array, return it
      if (Array.isArray(teamId)) return teamId;

      // If a string, try to parse JSON
      if (typeof teamId === "string") {
        try {
          const parsed = JSON.parse(teamId);
          if (Array.isArray(parsed)) return parsed;
        } catch (err) {
          // Not JSON, treat as comma-separated
          return teamId.split(',').map(t => t.trim());
        }
      }

      // Default fallback: empty array
      return [];
    })
    .then((parsedTeamId) => {
      formData.teamId = parsedTeamId;

      // parse seatLayout if it's a string
      if (typeof formData.seatLayout === "string") {
        formData.seatLayout = JSON.parse(formData.seatLayout);
      }

      let validation = "";

      if (!formData.sportsId) validation += "SportsId is required, ";
      
      if (!formData.leagueId) validation += "LeagueId is required, ";
      if (!formData.teamId || formData.teamId.length < 2) validation += "Minimum 2 teams required, ";
      if (!formData.matchName) validation += "MatchName is required, ";
      if (!formData.matchDate) validation += "MatchDate is required, ";
      if (!formData.matchTime) validation += "MatchTime is required, ";
      if (!formData.venue) validation += "Venue is required, ";
      if (!formData.seatLayout || formData.seatLayout.length === 0)
        validation += "SeatLayout is required";

      if (validation) {
        return res.status(422).json({
          success: false,
          message: validation
        });
      }

      // 🔍 Check duplicate match
      MatchModel.findOne({ matchName: formData.matchName })
        .then((matchData) => {
          if (matchData) {
            return res.json({
              success: false,
              message: "Match already exists with this name"
            });
          }

          // 🔥 Calculate total seats
          let totalSeats = 0;
          formData.seatLayout.forEach((row) => {
            totalSeats += row.seats;
          });

          // ✅ Create match object
          const matchObj = new MatchModel({
            sportsId: formData.sportsId,
            leagueId:formData.leagueId,
            teamId: formData.teamId,
            matchName: formData.matchName,
            matchDate: formData.matchDate,
            matchTime: formData.matchTime,
            venue: formData.venue,
            seatLayout: formData.seatLayout,
            totalSeats: totalSeats,
            availableSeats: totalSeats
          });

          matchObj.save()
            .then((savedMatch) => {
              res.json({
                success: true,
                message: "Match added successfully",
                data: savedMatch
              });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({
                success: false,
                message: "Error while saving match"
              });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            success: false,
            message: "Database error"
          });
        });
    });
};







all=(req,res)=>{
    let formData=req.body
    MatchModel.find(req.body)
    
    .populate("teamId")
    .populate({
        path:"sportsId",
        select:"sportName keyword"
    })
    .then((matchData)=>{
        if(matchData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Matchs Data is as:",
                data:matchData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"There are no matchs"
            })
            
        }
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err.message
        })
    })
}

single=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        MatchModel.findOne({_id:req.body._id})
        // .populate({
        //     path:"matchId",
        //     select:"matchName keyword"
        // })
        .then((matchData)=>{
            if(!matchData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no Match "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Match Data is as",
                    data:matchData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })
    }
}
const update = async (req, res) => {
  try {
    let formData = req.body;

    if (!formData._id) {
      return res.status(422).json({
        success: false,
        message: "_Id is required"
      });
    }

    // ✅ Parse teamId safely
    if (typeof formData.teamId === "string") {
      try {
        formData.teamId = JSON.parse(formData.teamId);
      } catch {
        formData.teamId = formData.teamId.split(",").map(t => t.trim());
      }
    }

    // ✅ Parse seatLayout safely
    if (typeof formData.seatLayout === "string") {
      formData.seatLayout = JSON.parse(formData.seatLayout);
    }

    // 🔍 Get existing match
    const existingMatch = await MatchModel.findById(formData._id);

    if (!existingMatch) {
      return res.status(404).json({
        success: false,
        message: "Match not found"
      });
    }

    // 🔥 Calculate already booked seats
    const alreadyBookedSeats =
      existingMatch.totalSeats - existingMatch.availableSeats;

    // 🔥 Build seatLayout WITHOUT LOSING bookedSeats
    let newTotalSeats = 0;

    const mergedSeatLayout = formData.seatLayout.map((row) => {
      newTotalSeats += Number(row.seats || 0);

      const oldRow = existingMatch.seatLayout.find(
        r => r.rowName === row.rowName
      );

      return {
        rowName: row.rowName,
        price: Number(row.price),
        seats: Number(row.seats),
        bookedSeats: oldRow?.bookedSeats || []   // 🔴 PRESERVED
      };
    });

    // ❌ Prevent reducing below booked seats
    if (newTotalSeats < alreadyBookedSeats) {
      return res.status(400).json({
        success: false,
        message: `Cannot reduce seats below already booked (${alreadyBookedSeats})`
      });
    }

    existingMatch.sportsId = formData.sportsId;
    existingMatch.leagueId = formData.leagueId;
    existingMatch.teamId = formData.teamId;
    existingMatch.matchName = formData.matchName;
    existingMatch.matchDate = formData.matchDate;
    existingMatch.matchTime = formData.matchTime;
    existingMatch.venue = formData.venue;
    existingMatch.seatLayout = mergedSeatLayout;
    existingMatch.totalSeats = newTotalSeats;
    existingMatch.availableSeats = newTotalSeats - alreadyBookedSeats;

    await existingMatch.save();

    res.json({
      success: true,
      message: "Match updated successfully",
      data: existingMatch
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// Admin: Force update match status
changeStatus= (req, res) => {
    const formData = req.body;
    const allowedStatus = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

    if (!formData._id || !allowedStatus.includes(formData.status)) {
        return res.json({
            status: 422,
            success: false,
            message: "Invalid data"
        });
    }

    

    MatchModel.findOne({_id:req.body._id})
        .then((matchData) => {
            if (!matchData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Match Data not found"
                });
            }

            
            matchData.status = formData.status;

            return matchData.save();
        })
        .then((matchData) => {
            if (matchData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `Match status updated to ${matchData.status}`,
                    data: matchData
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.json({
                status: 500,
                success: false,
                message: "Internal server error"
            });
        });
};





Delete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        MatchModel.findOne({_id:req.body._id})
        .then((matchData)=>{
            if(!matchData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                MatchModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Match deleted!!"
                        })
                    })
                    .catch((err) => {
                        res.json({
                            status: 500,
                            success: false,
                            message: "Internal server error"
                        })
                    })
            }

        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })    

    }


}


module.exports={add,all,single,update,changeStatus,Delete}