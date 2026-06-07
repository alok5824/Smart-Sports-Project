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

const AnnouncmentController=require("../apis/Announcment/AnnouncmentController")
const ContactController=require("../apis/Contact/ContactController")








let SportStorage= multer.memoryStorage()
const SportUpload = multer({ storage: SportStorage })

let AnnounceStorage= multer.memoryStorage()
const AnnounceUpload = multer({ storage: AnnounceStorage })

router.use(require("../middleware/AdminTokenChecker"))


router.post("/user/softDelete",UserController.softDelete)
router.post("/user/delete",UserController.Delete)



//sport
router.post("/sport/add",SportUpload.single("image"),SportController.add)

router.post("/sport/update",SportUpload.single("image"),SportController.update)
router.post("/sport/changeStatus",SportController.changeStatus)
router.post("/sport/delete",SportController.Delete)

//match

router.post("/match/add",MatchController.add)

router.post("/match/update",MatchController.update)
router.post("/match/changeStatus",MatchController.changeStatus)
router.post("/match/delete",MatchController.Delete)

//

router.post("/announcment/add",AnnounceUpload.single("image"),AnnouncmentController.add)
router.post("/announcment/update",AnnounceUpload.single("image"),AnnouncmentController.update)
router.post("/announcment/changeStatus",AnnouncmentController.changeStatus)
router.post("/announcment/delete",AnnouncmentController.Delete)




//

router.post("/contact/all",ContactController.all)
router.post("/contact/changeStatus",ContactController.changeStatus)




router.post("/coach/changeStatus",CoachController.changeStatus)
router.post("/coach/delete",CoachController.Delete)




router.post("/matchapplication/changeStatus",MatchApplicationController.changeStatus)
router.post("/matchapplication/delete",MatchApplicationController.Delete)





router.post("/booking/changeStatus",BookingController.changeStatus)
router.post("/booking/delete",BookingController.Delete)


// Player Routes
router.post("/player/all", PlayerController.all)

module.exports=router