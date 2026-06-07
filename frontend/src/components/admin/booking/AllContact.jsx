import { useEffect, useState } from "react"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"

export default function AllContact() {

    const [contact, setContact] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        setLoading(true)

        ApiService.allContact()
            .then((res) => {
                if (res.data.success) {
                    setContact(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const changeStatus = (id, status) => {

        Swal.fire({
            title: "Change Status?",
            text: "You can revert this later",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: status === "Active" ? "Deactivate" : "Activate"
        }).then((result) => {

            if (result.isConfirmed) {

                const data = { _id: id }

                ApiService.changeStatusContact(data)
                    .then((res) => {

                        if (res.data.success) {

                            Swal.fire({
                                title: res.data.message,
                                icon: "success"
                            })

                            fetchData()

                        } else {
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

            {/* Loader */}
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
                    <ClipLoader size={60} color="#000" />
                </div>
            )}


            {/* Page Title */}
            <div className="page-title">
                <div className="heading" style={{ backgroundColor: "#2c7a7b", color: "white" }}>
                    <div className="container text-center">
                        <h1 className="text-white">All Queries</h1>
                    </div>
                </div>
            </div>


            {/* Table */}
            <div className="container mt-4">

                {contact.length > 0 ? (

                    <div className="table-responsive">

                        <table className="table align-middle table-hover shadow-sm rounded border">

                            <thead style={{ backgroundColor: "#f8f9fa" }}>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {contact.map((el, index) => (

                                    <tr key={index}>

                                        <td>{index + 1}</td>

                                        {/* Name */}
                                        <td className="fw-semibold">
                                            {el.name}
                                        </td>

                                        {/* Email */}
                                        <td>
                                            {el.email}
                                        </td>

                                        {/* Subject */}
                                        <td>
                                            {el.subject}
                                        </td>

                                        {/* Message */}
                                        <td style={{ maxWidth: "250px" }}>
                                            <small className="text-muted">
                                                {el.message}
                                            </small>
                                        </td>


                                        {/* Status */}
                                        <td>

                                            <span >
                                                {el?.status ? "Resolved" : "Pending"}
                                            </span>

                                        </td>


                                        {/* Action */}
                                        <td className="text-center">

                                            <button className="btn">
                                                        <ReactSwitch
                                                            checked={el?.status}
                                                            onChange={() => changeStatus(el?._id, el?.status)}
                                                        />
                                                    </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="text-center">
                        <h4 className="text-muted">No Contact Messages</h4>
                        <p>Please check back later.</p>
                    </div>

                )}

            </div>

        </>
    )
}