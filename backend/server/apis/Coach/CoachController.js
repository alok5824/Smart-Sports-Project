const UserModel = require("../User/UserModel")
const bcryptjs=require("bcryptjs")
const CoachModel = require("./CoachModel")
const { uploadImg } = require("../../utilities/helper")
register=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.name){
        validation+="Name is required"
    }
    if(!formData.email){
        validation+="Email is required"
    }
    if(!formData.password){
        validation+="Password is required"
    }
    if(!formData.experience){
        validation+="Experience is required"
    }
    if(!req.file){
        validation+="ProfileImage is required"
    }
    if(!formData.bio){
        validation+="Bio is required"
    }
    if(!formData.contact){
        validation+="Contact is required"
    }
    if(!formData.organisationName){
        validation+="OrganisationName is required"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        
        UserModel.findOne({email:formData.email})
        .then(async(userData)=>{
            if(!userData){
                let userObj=new UserModel()
                
                userObj.name=formData.name
                userObj.email=formData.email
                userObj.password=bcryptjs.hashSync(formData.password, 10)
                userObj.userType="coach"
                 userObj.contact=formData.contact
                let url=await uploadImg(req.file.buffer)
                userObj.profileImage=url
                userObj.isVerified=userObj.userType === "coach" ? false : true
                userObj.save()
               
                .then(async(userData)=>{
                    let coachObj=new CoachModel()
                    
                    coachObj.userId=userData._id
                    coachObj.sportsId=formData.sportsId
                    coachObj.bio=formData.bio
                    coachObj.experience=formData.experience
                    coachObj.organisationName=formData.organisationName
                    
                    coachObj.save()
                    .then((coachData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Coach Registered",
                            coachData,
                            userData
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error"
                        }) 
                    })

                })
                .catch((err)=>{
                    console.log(err)
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                    })
                })
                
            }
            else{
                res.json({
                    status:200,
                    success:false,
                    message:"User already exist with same email",
                    data:userData
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.json({
                status:500,
                sucess:false,
                message:"Internal server error"
            })
        })
    }
}


all=(req,res)=>{
    let formData=req.body
    CoachModel.find(req.body)
    .populate({
        path:"userId",
       
    })
    .populate({
        path:"sportsId",
       select:"sportName "
    })
    .then((coachData)=>{
        if(coachData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Coachs Data is as:",
                data:coachData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"there are no Coachs"
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
        CoachModel.findOne({_id:req.body._id})
        // .populate({
        //     path:"coachId",
        //     select:"coachName keyword"
        // })
        .then((coachData)=>{
            if(!coachData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no coach "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Coach Data is as",
                    data:coachData
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
update=(req,res)=>{
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
        CoachModel.findOne({_id:req.body._id})
        .then(async(coachData)=>{
            if(!coachData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                
                if(!!formData.organisationName){
                   coachData.organisationName=formData.organisationName 
                }
                if(!!formData.bio){
                    coachData.bio=formData.bio
                }
                if(!!formData.experience){
                    coachData.experience=formData.experience
                }
                // if (req.file) {
                //     const imageUrl = await uploadImg(req.file.buffer);
                //     coachData.image = imageUrl;
                // }
                coachData.save()
                .then((coachData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Coach Updated",
                        data: coachData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                       
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


changeStatus = (req, res) => {
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

    

    CoachModel.findOne({_id:req.body._id})
        .then((coachData) => {
            if (!coachData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Coach not found"
                });
            }

            // Update status only
            coachData.status = formData.status;

            return coachData.save();
        })
        .then((coachData) => {
            if (coachData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `Coach status updated to ${coachData.status}`,
                    data: coachData
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
        CoachModel.findOne({_id:req.body._id})
        .then((coachData)=>{
            if(!coachData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                CoachModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Coach deleted!!"
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


module.exports={register,all,single,update,changeStatus,Delete}
