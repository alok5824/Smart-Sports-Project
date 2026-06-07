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




let UserStorage= multer.memoryStorage()
const UserUpload = multer({ storage: UserStorage })

router.post("/user/login",UserController.login)
router.post("/user/register",UserUpload.single("profileImage"),UserController.register)

router.post("/user/update",UserUpload.single("profileImage"),UserController.update)



router.use(require("../middleware/UserTokenChecker"))


router.post("/booking/add",BookingController.add)
router.post("/booking/update",BookingController.update)



module.exports=router