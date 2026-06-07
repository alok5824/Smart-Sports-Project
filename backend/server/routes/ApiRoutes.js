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

const DashboardController=require("../apis/Dashboard/DashboardController")
const AnnouncmentController=require("../apis/Announcment/AnnouncmentController")
const ContactController=require("../apis/Contact/ContactController")











router.post("/user/login",UserController.login)

let UserStorage= multer.memoryStorage()
const UserUpload = multer({ storage: UserStorage })

router.post("/user/register",UserUpload.single("profileImage"),UserController.register)
router.post("/user/update",UserUpload.single("profileImage"),UserController.update)



router.post("/user/all",UserController.all)
router.post("/user/single",UserController.single)



let CoachStorage= multer.memoryStorage()
const CoachUpload = multer({ storage: CoachStorage })
router.post("/coach/register",CoachUpload.single("profileImage"),CoachController.register)




router.post("/announcment/all",AnnouncmentController.all)
router.post("/announcment/single",AnnouncmentController.single)


router.post("/match/single",MatchController.single)
router.post("/match/all",MatchController.all)

router.post("/sport/all",SportController.all)
router.post("/sport/single",SportController.single)


router.post("/coach/all",CoachController.all)
router.post("/coach/single",CoachController.single)

router.post("/team/all",TeamController.all)

router.post("/team/single",TeamController.single)

router.post("/player/all", PlayerController.all)
router.post("/player/single", PlayerController.single)


router.post("/matchapplication/all",MatchApplicationController.all)
router.post("/matchapplication/single",MatchApplicationController.single)


router.post("/booking/all",BookingController.all)
router.post("/booking/single",BookingController.single)

router.post("/contact/add",ContactController.add)



router.post("/dashboard",DashboardController.Dashboard)


module.exports=router