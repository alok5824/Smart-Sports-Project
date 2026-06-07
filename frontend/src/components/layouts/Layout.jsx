import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import SportSuggestion from "../pages/SportSuggestion";

import AIChatBot from "../common/AIChatBot"


import AdminHeader from "./AdminHeader";
import CoachHeader from "./CoachHeader";
// import SportSuggestion from "../pages/SportSuggestion";
// import { MoonLoader } from "react-spinners";
// import CropBubble from "../pages/CropBubble";

export default function Layout(){
    const userType = sessionStorage.getItem("userType")
        
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
        <SportSuggestion/>
        <AIChatBot/>
        
        {/* <CropBubble/> */}
        <Footer/>
        </>
    )
}