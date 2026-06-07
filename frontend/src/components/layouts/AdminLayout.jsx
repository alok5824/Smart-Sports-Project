import { Outlet, useNavigate } from "react-router-dom";

import AIChatBot from "../common/AIChatBot"

import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import ChatWidget from "../coach/chat/ChatWidget";
import CoachHeader from "./CoachHeader";
import Header from "./Header";
// import CropBubble from "../pages/CropBubble";


export default function AdminLayout(){
    let isLogin=sessionStorage.getItem("isLogin")
    let userType=sessionStorage.getItem("userType")
    
    let nav=useNavigate()
    useEffect(()=>{
        if(!isLogin || userType!="admin"){
            toast.error("Please login to access this page")
            nav("/login")
        }
    },[isLogin])
    const renderHeader = () => {
                
                        switch (userType) {
                
                            case "admin":   // Admin
                                return <AdminHeader/>
                
                            case "coach":
                                return <CoachHeader />
                
                            case "investor":   // Normal User
                                return <Header />
                
                            default:    // Not logged in
                                return <Header />
                        }
                    }


   
    return(
        <>
              {renderHeader()}

               <Outlet/>
                <AIChatBot/>
                {/* <CropBubble/> */}
                <ChatWidget/>

                {/* <Footer /> */}
           
        </>
    )
}


