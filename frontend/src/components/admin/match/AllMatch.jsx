import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"

export default function AllMatch() {
    const [match, setMatch] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
      const [selectedSport, setSelectedSport] = useState("All");

const[loading,setLoading]=useState(false)


    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allMatch()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setMatch(res.data.data)


                }
                else {
                    toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
     const filteredMatch =
        selectedSport === "All"
            ? match
            : match.filter(
                (el) => el?.sportsId?._id === selectedSport
            );

     const statuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"]
   

    const changeStatus = (id, newStatus) => {

  Swal.fire({
    title: "Are you sure?",
    text: `Change status to "${newStatus}"?`,
    icon: "warning",
    confirmButtonColor: "#2c7a7b",
    showCancelButton: true,
    confirmButtonText: "Yes, update"
  }).then((result) => {
    if (result.isConfirmed) {
      ApiService.changeStatusMatch({
        _id: id,
        status: newStatus
      })
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
    title: res.data.message,

    icon: "success",
    confirmButtonColor: "#2c7a7b",
   
  })
            fetchData()
          }
        })
        .catch((err) => toast.error(err.message))
    }
  })
}


    const deleteMatch = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
             confirmButtonColor: "#2c7a7b",
            cancelButtonColor: "#d33",
            confirmButtonText: `${!id ? "Enable" : "Delete"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.DeleteMatch(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                  confirmButtonColor: "#2c7a7b",
                                // text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })


    }


    return (
        <>


 {loading && (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    }}>
        <ClipLoader
            color="#000000"
            size={60}
        />
    </div>
)}




            {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h1 className="display-1 text-white mb-md-4">All teams</h1>
                                    <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                        Home
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="page-title "  >
                <div className="heading" style={{backgroundColor: "#2c7a7b",color:"white"  }} >
                    <div className="container " >
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">Match </h1>
                              
                                <p className="mb-0">

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li>
                                <Link href="/admin">Home</Link>
                            </li>
                            <li className="current">All Match /</li>
                              <div className="d-flex justify-content-center mx-2">
                                    <select
                                        className="form-select form-select-sm w-auto "
                                        value={selectedSport}
                                        onChange={(e) => setSelectedSport(e.target.value)}
                                    >
                                        <option value="All">All Sports</option>

                                        {[...new Map(
                                            match
                                                .filter(el => el?.sportsId)
                                                .map(el => [el.sportsId._id, el.sportsId])
                                        ).values()].map((sport) => (
                                            <option key={sport._id} value={sport._id}>
                                                {sport.sportName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                           
                                 
                                    
                                
                            
                        </ol>
                    </div>
                    
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        {filteredMatch.length > 0 ? (
                            <div className="table-responsive spacing">
                         <div className="table-responsive">
  <table className="table align-middle table-hover shadow-sm rounded border">
    <thead style={{ backgroundColor: "#f8f9fa" }}>
      <tr>
        <th>#</th>
        <th>Match</th>
        <th>Sport</th>
        <th>Venue</th>
        <th>Date & Time</th>
        <th>Status</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredMatch.map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {/* ✅ Match + Teams Combined */}
          <td>
            <div>
              <h6 className="mb-1 fw-semibold">{el?.matchName}</h6>
              <small className="text-muted">
                {el?.teamId?.map(t => t.teamName).join(" vs ")}
              </small>
            </div>
          </td>

          <td>
            <span className="badge edit">
              {el?.sportsId?.sportName}
            </span>
          </td>

          <td>{el?.venue}</td>

          {/* ✅ Date + Time Combined */}
          <td>
            <div className="small">
              <div>
                {el?.matchDate
                  ? new Date(el.matchDate).toLocaleDateString("en-GB")
                  : "-"}
              </div>
              <div className="text-muted">{el?.matchTime}</div>
            </div>
          </td>

          {/* ✅ Clean Status Badge */}
          <td>
            <span
              className={`badge px-3 py-2 ${
                el.status === "Upcoming"
                  ? "bg-info text-dark"
                  : el.status === "Ongoing"
                  ? "bg-success"
                  : el.status === "Completed"
                  ? "bg-dark"
                  : "bg-danger"
              }`}
            >
              {el.status}
            </span>
          </td>

          {/* ✅ Clean Actions */}
          <td className="text-center">
            <div className="d-flex justify-content-center gap-2">

              <select
                className="form-select form-select-sm w-auto"
                value={el.status}
                onChange={(e) =>
                  changeStatus(el._id, e.target.value)
                }
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <Link
                to={`/admin/match/update/${el._id}`}
                className="btn btn-sm edit"
              >
                <i className="bi bi-pencil-fill"></i>
              </Link>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteMatch(el._id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No match available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>



        </>
    )
}