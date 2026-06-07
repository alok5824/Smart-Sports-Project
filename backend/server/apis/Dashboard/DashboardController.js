const express=require("express")
const mongoose=require("mongoose")

const router=express.Router()
const UserModel=require("../User/UserModel")
const TeamModel=require("../Team/TeamModel")
const BookingModel=require("../Booking/BookingModel")
const MatchModel=require("../Match/MatchModel")
const MatchApplicationModel=require("../MatchApplication/MathApplicationModel")
const SportModel=require("../Sport/SportModel")
const CoachModel=require("../Coach/CoachModel")


const Dashboard=async(req,res)=>{
    var totalSport = 0
    var totalCoach = 0
    var totalUsers = 0
    var totalMatch = 0
    var totalTeam = 0

    var totalMatchApplication = 0
    var totalBooking = 0
    var totalCoachTeam=0
      var totalCoachMatch=0
        var totalCoachMatchApplication=0
    

    await UserModel.countDocuments()
   .then((tUsers)=>{
            totalUsers = tUsers
   })
  
   await CoachModel.countDocuments()
   .then((tCoach)=>{
            totalCoach = tCoach
   })
    
   await SportModel.countDocuments()
   .then((tSport)=>{
            totalSport = tSport
   })
   await TeamModel.countDocuments()
   .then((tTeam)=>{
            totalTeam = tTeam
   })
   await MatchModel.countDocuments()
   .then((tMatch)=>{
            totalMatch = tMatch
   })
   await MatchApplicationModel.countDocuments()
   .then((tMatchApplication)=>{
            totalMatchApplication = tMatchApplication
   })
   
   await BookingModel.countDocuments()
   .then((tBooking)=>{
            totalBooking = tBooking
   })
   await TeamModel.countDocuments({coachId:req.body.coachId})
   .then((tCoachTeam)=>{
            totalCoachTeam = tCoachTeam
   })
  const coachTeamIds = await TeamModel.distinct("_id", {
  coachId: req.body.coachId
});

totalCoachMatch = await MatchModel.countDocuments({
  teamId: { $in: coachTeamIds }
});

   await MatchApplicationModel.countDocuments({coachId:req.body.coachId})
   .then((tCoachMatchApplication)=>{
            totalCoachMatchApplication = tCoachMatchApplication
   })

    
    



   res.send({
        status:200,
        success:true,
        message:"dashboard loaded!!",
        totalUsers:totalUsers,
        // totaltrainers:totalTrainer,
        totalCoach:totalCoach,
     
        totalTeam:totalTeam,
        totalSport:totalSport,
        totalMatch:totalMatch,
        totalBooking:totalBooking,
        totalMatchApplication:totalMatchApplication,
        totalCoachTeam:totalCoachTeam,
        totalCoachMatch:totalCoachMatch,
        totalCoachMatchApplication:totalCoachMatchApplication
   })



}


module.exports= {Dashboard}