const { uploadImg } = require("../../utilities/helper")
const TeamModel=require("./TeamModel")

add=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.teamName){
        validation+="Team name is required"
    }
     if(!formData.description){
        validation+="Description is required"
    }
    
     if(!formData.playersCount){
        validation+="PlayersCount is required"
    }
     if(!formData.sportsId){
        validation+="SportId is required"
    }
    if(!formData.coachId){
        validation+="CoachId is required"
    }
    if(!req.file){
        validation+="Logo is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
   else{
        //duplicacy     
        TeamModel.findOne({coachId:formData.coachId})
        .then(async (teamData)=>{
            if(!teamData){
                let teamObj= new TeamModel()
                teamObj.teamName=formData.teamName
                teamObj.description=formData.description
                teamObj.playersCount=formData.playersCount
                teamObj.sportsId=formData.sportsId
                teamObj.coachId=req.decoded.userId


                let url=await uploadImg(req.file.buffer)
                teamObj.logo=url

                teamObj.save()
                .then((teamData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Team Added!!",
                        data:teamData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Team already for this coach "
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!",
                error:err.message
            })
        })
       
    }
}



all=(req,res)=>{
    let formData=req.body
    TeamModel.find(req.body)
        .populate({
            path: "coachId",
            
        })
   .populate({
        path:"sportsId",
        select:"sportName keyword"
    })
    
    
    .then((teamData)=>{
        if(teamData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Teams Data is as:",
                data:teamData
            })
        }
        else{


            res.json({
                status:404,
                success:false,
                message:"There are no teams"
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
        TeamModel.findOne({_id:req.body._id})
        // .populate({
        //     path:"teamId",
        //     select:"teamName keyword"
        // })
        .then((teamData)=>{
            if(!teamData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no team "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Team Data is as",
                    data:teamData
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
        validation+="_Id IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        TeamModel.findOne({_id:req.body._id})
        .then(async(teamData)=>{
            if(!teamData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                 if(!!formData.teamName){
                   teamData.teamName=formData.teamName 
                }
                
                if(!!formData.description){
                   teamData.description=formData.description 
                }
                if(!!formData.playersCount){
                    teamData.playersCount=formData.playersCount
                }
                // if(!!formData.sportId){
                //     teamData.sportId=formData.sportId
                // }
                if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    teamData.logo = imageUrl;
                }
                teamData.save()
                .then((teamData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Team Updated",
                        data: teamData
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

changeStatus=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_id IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        TeamModel.findOne({_id:req.body._id})
        .then((teamData)=>{
           if(!teamData){
            res.json({
                status:404,
                sucess:false,
                message:"There is no team found on this id"
            })
           }
           else{
            teamData.status = teamData.status === "Active" ? "Inactive" : "Active";
            
            teamData.save()
            .then((teamData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Team status updated",
                    data:teamData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error"
                })
            })
           }

        })
        .catch((err)=>{
            console.log(err);
            
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }

}
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
        TeamModel.findOne({_id:req.body._id})
        .then((teamData)=>{
            if(!teamData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                TeamModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Team deleted!!"
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