const { uploadImg } = require("../../utilities/helper")
const MatchApplication = require("./MathApplicationModel")

add = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData.coachId) {
        validation += "CoachId is required"
    }
    if (!formData.sportsId) {
        validation += "SportsId is required"
    }
    if (!formData.teamId) {
        validation += "TeamId is required"
    }
    if (!formData.leagueId) {
        validation += "LeagueId is required"
    }



    
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        //duplicacy     
        MatchApplication.findOne({ sportsId: formData.sportsId, teamId: formData.teamId })
            .then(async (matchData) => {
                if (!matchData) {
                    let matchObj = new MatchApplication()
                    matchObj.coachId = req.decoded.userId
                    matchObj.sportsId = formData.sportsId
                    matchObj.teamId = formData.teamId
                    matchObj.leagueId = formData.leagueId







                    // let url=await uploadImg(req.file.buffer)
                    // matchObj.logo=url

                    matchObj.save()
                        .then((matchData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Match Application Added!!",
                                data: matchData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error",
                                error: err.message
                            })
                        })
                } else {
                    res.json({
                        status: 200,
                        success: false,
                        message: "Match application already exist on given name"
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!",
                    error: err.message
                })
            })

    }
}



all = (req, res) => {
    let formData = req.body
    MatchApplication.find(req.body)
        .populate({
            path: "teamId",

        })
        .populate({
            path: "sportsId",

        })
        .populate({
            path: "coachId",

        })
        .populate({
            path: "leagueId",

        })

        .then((matchData) => {
            if (matchData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Match application Data is as:",
                    data: matchData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "There are no matchs"
                })

            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
}

single = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_Id IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        MatchApplication.findOne({ _id: req.body._id })
            // .populate({
            //     path:"matchId",
            //     select:"matchName keyword"
            // })
            .then((matchData) => {
                if (!matchData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no match "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Match Application Data is as",
                        data: matchData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })
    }
}
update = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_Id IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        MatchApplication.findOne({ _id: req.body._id })
            .then(async (matchData) => {
                if (!matchData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {

                    if (!!formData.preferredDate) {
                        matchData.preferredDate = formData.preferredDate
                    }
                    if (!!formData.adminRemarks) {
                        matchData.adminRemarks = formData.adminRemarks
                    }
                    if (!!formData.venue) {
                        matchData.venue = formData.venue
                    }

                    // if(!!formData.sportsId){
                    //     matchData.sportsId=formData.sportsId
                    // }
                    // if (req.file) {
                    //     const imageUrl = await uploadImg(req.file.buffer);
                    //     matchData.logo = imageUrl;
                    // }
                    matchData.save()
                        .then((matchData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Match Updated",
                                data: matchData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error",
                                error: err.message

                            })
                        })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message

                })
            })

    }
}



// Admin: Change Match Application Status
changeStatus = (req, res) => {

    console.log("RAW BODY:", req.body);
    console.log("STATUS CHECK:", req.body.status, typeof req.body.status);
    console.log(
      "ALLOWED?",
      ["Pending", "Approved", "Rejected"].includes(req.body.status)
    );
    const formData = req.body;
    const allowedStatus = ["Pending", "Approved", "Rejected"];

    // Validate request
    if (!formData._id || !allowedStatus.includes(formData.status)) {
        return res.json({
            status: 422,
            success: false,
            message: "Invalid data"
        });
    }



    MatchApplication.findOne({ _id: req.body._id })
        .then((matchData) => {
            if (!matchData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Match application not found"
                });
            }

            // Update status only
            matchData.status = formData.status;

            return matchData.save();
        })
        .then((matchData) => {
            if (matchData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `Match application status updated to ${matchData.status}`,
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





Delete = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        MatchApplication.findOne({ _id: req.body._id })
            .then((matchData) => {
                if (!matchData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {
                    MatchApplication.deleteOne({ _id: req.body._id })
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
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })

    }


}


module.exports = { add, all, single, update, changeStatus, Delete }