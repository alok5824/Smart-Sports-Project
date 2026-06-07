const { uploadImg } = require("../../utilities/helper")
const SportModel=require("./SportModel")

add=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.sportName){
        validation+="Sport name is required"
    }
     if(!formData.description){
        validation+="Description is required"
    }
    
     if(!formData.maxPlayers){
        validation+="MaxPlayers is required"
    }
     if(!formData.matchDuration){
        validation+="MatchDuration is required"
    }
     if(!req.file){
        validation+="Image is required"
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
        SportModel.findOne({sportName:formData.sportName})
        .then(async (sportData)=>{
            if(!sportData){
                let sportObj= new SportModel()
                sportObj.sportName=formData.sportName
                sportObj.description=formData.description
                sportObj.maxPlayers=formData.maxPlayers
                sportObj.matchDuration=formData.matchDuration

                let url=await uploadImg(req.file.buffer)
                sportObj.image=url

                sportObj.save()
                .then((sportData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Sport Added!!",
                        data:sportData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Sport already exist on given name"
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
       
    }
}

all=(req,res)=>{
    let formData=req.body
    SportModel.find(req.body)
    // .populate({
    //     path:"sportId",
    //     select:"sportName keyword"
    // })
    .then((sportData)=>{
        if(sportData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Sports Data is as:",
                data:sportData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"There are no sports"
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
        SportModel.findOne({_id:req.body._id})
        // .populate({
        //     path:"sportId",
        //     select:"sportName keyword"
        // })
        .then((sportData)=>{
            if(!sportData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no sport "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Sport Data is as",
                    data:sportData
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
        validation+="_Id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        SportModel.findOne({_id:req.body._id})
        .then(async(sportData)=>{
            if(!sportData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                if(!!formData.sportName){
                   sportData.sportName=formData.sportName 
                }
                
                if(!!formData.description){
                   sportData.description=formData.description 
                }
                if(!!formData.maxPlayers){
                    sportData.maxPlayers=formData.maxPlayers
                }
                if(!!formData.matchDuration){
                    sportData.matchDuration=formData.matchDuration
                }
                if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    sportData.image = imageUrl;
                }
                sportData.save()
                .then((sportData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Sport Updated",
                        data: sportData
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
        validation+="_Id IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        SportModel.findOne({_id:req.body._id})
        .then((sportData)=>{
           if(!sportData){
            res.json({
                status:404,
                sucess:false,
                message:"There is no sport found on this id"
            })
           }
           else{
            sportData.status = sportData.status === "Active" ? "Inactive" : "Active";
            
            sportData.save()
            .then((sportData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Sport updated",
                    data:sportData
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
        SportModel.findOne({_id:req.body._id})
        .then((sportData)=>{
            if(!sportData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                SportModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Sport deleted!!"
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