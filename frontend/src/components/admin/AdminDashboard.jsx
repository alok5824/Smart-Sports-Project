import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export default function AdminDashboard(){
    const [details, setDetails]=useState([])
    const fetchData=()=>{
        ApiService.dashboard(null)
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




    const pieData = {
  labels: ["Users", "Coach", "Teams", "Sports"],
  datasets: [
    {
      label: "Platform Distribution",
      data: [
        details.totalUsers || 0,
        details.totalCoach || 0,
        details.totalTeam || 0,
        details.totalSport || 0
      ],
      backgroundColor: [
        "#36A2EB",
        "#4BC0C0",
        "#FFCE56",
        "#FF6384"
      ]
    }
  ]
};

const barData = {
  labels: ["Matches", "Bookings", "Applications"],
  datasets: [
    {
      label: "Activity",
      data: [
        details.totalMatch || 0,
        details.totalBooking || 0,
        details.totalMatchApplication || 0
      ],
      backgroundColor: ["#36A2EB", "#4BC0C0", "#FF6384"]
    }
  ]
};

const lineData = {
  labels: ["Users", "Coach", "Teams", "Matches", "Bookings"],
  datasets: [
    {
      label: "Platform Overview",
      data: [
        details.totalUsers || 0,
        details.totalCoach || 0,
        details.totalTeam || 0,
        details.totalMatch || 0,
        details.totalBooking || 0
      ],
      borderColor: "#2c7a7b",
      backgroundColor: "#2c7a7b",
      tension: 0.4
    }
  ]
};


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
            <div className="container py-5">
  <div className="row g-4">

    {/* Users */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon users">
          <i className="bi bi-person"></i>
        </div>

        <div className="card-info">
          <h6>Users</h6>
          <h3>{details.totalUsers}</h3>
        </div>
      </div>
    </div>

    {/* Coach */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon coach">
          <i className="bi bi-person-check"></i>
        </div>

        <div className="card-info">
          <h6>Coach</h6>
          <h3>{details.totalCoach}</h3>
        </div>
      </div>
    </div>

    {/* Match */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon match">
          <i className="fas fa-football-ball"></i>
        </div>

        <div className="card-info">
          <h6>Matches</h6>
          <h3>{details.totalMatch}</h3>
        </div>
      </div>
    </div>

    {/* Booking */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon booking">
          <i className="bi bi-envelope-arrow-down-fill"></i>
        </div>

        <div className="card-info">
          <h6>Bookings</h6>
          <h3>{details.totalBooking}</h3>
        </div>
      </div>
    </div>

    {/* Application */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon application">
          <i className="fas fa-table-tennis"></i>
        </div>

        <div className="card-info">
          <h6>Applications</h6>
          <h3>{details.totalMatchApplication}</h3>
        </div>
      </div>
    </div>

    {/* Sport */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon sport">
          <i className="fa-solid fa-person-skiing-nordic"></i>
        </div>

        <div className="card-info">
          <h6>Sports</h6>
          <h3>{details.totalSport}</h3>
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="col-lg-3 col-md-6">
      <div className="dashboard-card">
        <div className="icon team">
          <i className="bi bi-people"></i>
        </div>

        <div className="card-info">
          <h6>Teams</h6>
          <h3>{details.totalTeam}</h3>
        </div>
      </div>
    </div>

  </div>
</div>

  <div className="container my-5">

<div className="row g-4">

{/* Line Chart */}
<div className="col-lg-12">
<div className="card shadow p-4">
<h5 className="mb-3">Platform Overview</h5>
<Line data={lineData}/>
</div>
</div>

{/* Pie Chart */}
<div className="col-lg-6">
  <div className="card shadow p-4">
    <h5 className="mb-3">User Distribution</h5>

    <div style={{height:"350px"}}>
      <Pie data={pieData} options={{ maintainAspectRatio:false }} />
    </div>

  </div>
</div>

<div className="col-lg-6">
  <div className="card shadow p-4">
    <h5 className="mb-3">Activity Summary</h5>

    <div style={{height:"350px"}}>
      <Bar data={barData} options={{ maintainAspectRatio:false }} />
    </div>

  </div>
</div>

{/* Bar Chart */}


</div>
</div>



    </>
    
)
}