import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"

export default function Contact(){

const {register, handleSubmit, reset, formState:{errors}} = useForm()
const [load,setLoad] = useState(false)

const handleForm=(data)=>{
    setLoad(true)

    ApiService.addContact(data)
    .then((res)=>{
        if(res.data.success){
            toast.success(res.data.message)
            reset()
        }
        else{
            toast.error(res.data.message)
        }
        setLoad(false)
    })
    .catch((err)=>{
        setLoad(false)
        toast.error(err.response?.data?.message || err.message)
    })
}

const handleError=()=>{
    toast.error("All fields are required")
}

return(
<>
<main className="main">

{/* Page Title */}
<div className="page-title">
<div className="heading">
<div className="container">
<div className="row d-flex justify-content-center text-center">
<div className="col-lg-8">
<h1 className="heading-title">Contact</h1>
<p className="mb-0">
Send us your message and we will respond soon.
</p>
</div>
</div>
</div>
</div>
</div>


{/* Contact Section */}
<section id="contact-2" className="contact-2 section">

<div className="container">

{/* Contact Info */}
<div className="row gy-4 mb-5">

<div className="col-lg-4">
<div className="contact-info-box">
<div className="icon-box">
<i className="bi bi-geo-alt"></i>
</div>
<div className="info-content">
<h4>Our Address</h4>
<p>Jalandhar, Punjab, India</p>
</div>
</div>
</div>

<div className="col-lg-4">
<div className="contact-info-box">
<div className="icon-box">
<i className="bi bi-envelope"></i>
</div>
<div className="info-content">
<h4>Email Address</h4>
<p>info@example.com</p>
</div>
</div>
</div>

<div className="col-lg-4">
<div className="contact-info-box">
<div className="icon-box">
<i className="bi bi-headset"></i>
</div>
<div className="info-content">
<h4>Support</h4>
<p>Mon - Sat : 9AM - 6PM</p>
</div>
</div>
</div>

</div>
</div>


{/* Google Map */}
<div className="map-section">

<iframe
width="100%"
height="500"
style={{border:0}}
loading="lazy"
src="https://maps.google.com/maps?q=jalandhar&t=&z=13&ie=UTF8&iwloc=&output=embed"
/>

</div>


{/* Contact Form */}
<div className="container form-container-overlap">

<div className="row justify-content-center">

<div className="col-lg-10">

<div className="contact-form-wrapper">

<h2 className="text-center mb-4">Get in Touch</h2>

<form onSubmit={handleSubmit(handleForm,handleError)}>

<div className="row g-3">

{/* Name */}
<div className="col-md-6">
<div className="form-group">
<div className="input-with-icon">
<i className="bi bi-person"></i>

<input
type="text"
className="form-control"
placeholder="Your Name"
{...register("name",{required:true})}
/>

</div>
</div>
</div>


{/* Email */}
<div className="col-md-6">
<div className="form-group">
<div className="input-with-icon">
<i className="bi bi-envelope"></i>

<input
type="email"
className="form-control"
placeholder="Email Address"
{...register("email",{required:true})}
/>

</div>
</div>
</div>


{/* Subject */}
<div className="col-md-12">
<div className="form-group">
<div className="input-with-icon">
<i className="bi bi-text-left"></i>

<input
type="text"
className="form-control"
placeholder="Subject"
{...register("subject",{required:true})}
/>

</div>
</div>
</div>


{/* Message */}
<div className="col-12">
<div className="form-group">
<div className="input-with-icon">
<i className="bi bi-chat-dots message-icon"></i>

<textarea
className="form-control"
placeholder="Write Message..."
style={{height:180}}
{...register("message",{required:true})}
/>

</div>
</div>
</div>


{/* Loader */}
{load && (
<div className="text-center">
<div className="spinner-border text-primary"></div>
</div>
)}


{/* Button */}
<div className="col-12 text-center">

<button
type="submit"
className="btn btn-primary btn-submit"
disabled={load}
>
{load ? "Sending..." : "SEND MESSAGE"}

</button>

</div>

</div>
</form>

</div>

</div>

</div>

</div>

</section>

</main>
</>
)
}