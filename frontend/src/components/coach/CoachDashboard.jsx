import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService";


export default function CoachDashboard(){
    const [details, setDetails]=useState([])
   const id = sessionStorage.getItem("userId");
    const fetchData=()=>{
      const data = {
            coachId: id,
            
        };
      
        ApiService.dashboard(data)
         .then((res)=>{
                    console.log(res)
                    if(res.data.success){
                        setDetails(res.data)
        
                    }
                    else{
                        toast.error(res.data.message)
                    }
                })
                .catch((err)=>{
                    toast.error(err.message)
                })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(
  <>
    <div className="page-title "  >
                <div className="heading"style={{backgroundColor: "#2c7a7b",color:"white" }} >
                    <div className="container " >
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">Dashboard</h1>
                                <p className="mb-0">
                                   
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
             <div className="container-fluid py-5">
    <div className="container">
      <div className="row g-5">
        {/* <div className="col-lg-4 col-md-6">
          <div className="mb-3">
            <h6 className="text-primary text-uppercase">Land</h6>
            <h1 className="display-5">{details.totalLand}</h1>
          </div>
          
        </div> */}
        {/* <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i class="bi bi-person-square fs-1"></i>
            <h4>Users</h4>
            <p className="mb-0">
              {details.totalUsers}            </p>
          </div>
        </div> */}

        {/* <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
           <i class="bi bi-person-check fs-1"></i>
            <h4>Coach</h4>
            <p className="mb-0">
                 { details.totalCoach}
            </p>
          </div>
        </div> */}


        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
           <i class="fas fa-football-ball fs-1" ></i>
            <h4>Match</h4>
            <p className="mb-0">
             { details.totalCoachMatch}
            </p>
          </div>
        </div>
        {/* <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i class="bi bi-envelope-arrow-down-fill fs-1"></i>
            <h4>Bookings</h4>
            <p className="mb-0">
            { details.totalBooking}            </p>
          </div>
        </div> */}
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i class="fas fa-table-tennis fs-1"></i>
            <h4>Match Application</h4>
            <p className="mb-0">
            { details.totalCoachMatchApplication}
            </p>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
          <i class="fa-solid fa-shirt fs-1"></i>
            <h4>Sport</h4>
            <p className="mb-0">
                 { details.totalSport}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
           <i class="bi bi-people fs-1"></i>
            <h4>Team</h4>
            <p className="mb-0">
              {details.totalCoachTeam}            </p>
          </div>
        </div>
      </div>
    </div>
  </div>



    </>
    
)
}