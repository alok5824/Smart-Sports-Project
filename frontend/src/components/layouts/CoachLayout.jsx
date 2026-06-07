import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CoachHeader from "./CoachHeader";
import { MoonLoader } from "react-spinners";
import ChatWidget from "../coach/chat/ChatWidget";

import AIChatBot from "../common/AIChatBot"

import AdminHeader from "./AdminHeader";
import Header from "./Header";
// import CropBubble from "../pages/CropBubble";


export default function CoachLayout(){
    
    let isLogin=sessionStorage.getItem("isLogin")
    let userType=sessionStorage.getItem("userType")
    let nav=useNavigate()
    useEffect(()=>{
        if(!isLogin || userType!="coach"){
            toast.error("Please login to access this page")
            nav("/login")
        }
    },[isLogin])
    
            
                // Decide which header to render
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
        <ChatWidget/>
        <AIChatBot/>
         {/* <CropBubble/> */}
        {/* <Footer/> */}
        </>
    )
}