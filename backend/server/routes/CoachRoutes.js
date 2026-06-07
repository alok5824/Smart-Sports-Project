const express=require("express")
const router=express.Router()
const multer=require("multer")
const UserController=require("../apis/User/UserController")
const SportController=require("../apis/Sport/SportController")
const MatchController=require("../apis/Match/MatchController")
const CoachController=require("../apis/Coach/CoachController")
const MatchApplicationController=require("../apis/MatchApplication/MatchApplicationController")
const BookingController=require("../apis/Booking/BookingController")
const TeamController=require("../apis/Team/TeamController")
const PlayerController=require("../apis/Player/PlayerController")





router.use(require("../middleware/CoachTokenChecker"))


let CoachStorage= multer.memoryStorage()
const CoachUpload = multer({ storage: CoachStorage })

router.post("/coach/update",CoachUpload.single("profileImage"),CoachController.update)


router.post("/matchapplication/add",MatchApplicationController.add)
router.post("/matchapplication/update",MatchApplicationController.update)


router.post("/team/add",CoachUpload.single("logo"),TeamController.add)

router.post("/team/update",CoachUpload.single("logo"),TeamController.update)
router.post("/team/changeStatus",TeamController.changeStatus)
router.post("/team/delete",TeamController.Delete)



// Player Routes
router.post("/player/add", CoachUpload.single("photo"), PlayerController.add)
router.post("/player/update", CoachUpload.single("photo"), PlayerController.update)
router.post("/player/changeStatus", PlayerController.changeStatus)
router.post("/player/delete", PlayerController.Delete)

module.exports=router