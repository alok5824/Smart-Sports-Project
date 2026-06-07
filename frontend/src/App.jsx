import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Bounce, ToastContainer } from 'react-toastify'
import Home from './components/pages/Home'
import Layout from './components/layouts/Layout'
import About from './components/pages/About'
import Service from './components/pages/Service'
import Properties from './components/pages/Properties'
import PropertiesDetail from './components/pages/PropertiesDetail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CoachRegister from './components/auth/CoachRegister'
import AddSport from './components/admin/sport/AddSport'
import AllSport from './components/admin/sport/AllSport'
import UpdateSport from './components/admin/sport/UpdateSport'
import AddTeam from './components/coach/team/AddTeam'
import AllTeam from './components/coach/team/AllTeam'
import UpdateTeam from './components/coach/team/UpdateTeam'
import AddMatchApplication from './components/coach/matchApplication/AddMatchApplication'
import AllMatchAppliction from './components/coach/matchApplication/AllMatchApplication'
import UpdateMatchApplication from './components/coach/matchApplication/UpdateMatchApplication'
import AddMatch from './components/admin/match/AddMatch'
import AllMatch from './components/admin/match/AllMatch'
import UpdateMatch from './components/admin/match/UpdateMatch'
import ManageSport from './components/user/sport/ManageSport'
import ManageMatch from './components/user/match/ManageMatch'
import ManageTeam from './components/user/team/ManageTeam'
import AddBooking from './components/user/booking/AddBooking'
import ManageBooking from './components/user/booking/ManageBooking'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminLayout from './components/layouts/AdminLayout'
import AllCoach from './components/admin/coach/AllCoach'
import AllBooking from './components/admin/booking/AllBooking'
import AdminTeam from './components/admin/team/AdminTeam'
import ManageUsers from './components/admin/user/ManageUsers'

import CoachLayout from './components/layouts/CoachLayout'
import CoachDashboard from './components/coach/CoachDashboard'
import CoachSport from './components/coach/sport/CoachSport'
import CoachMatch from './components/coach/sport/CoachMatch'
import CoachTeam from './components/coach/sport/CoachTeam'
import UserTeam from './components/user/team/UserTeam'
import AddAnnounce from './components/admin/announcment/AddAnnounce'
import AllAnnounce from './components/admin/announcment/AllAnnounce'
import CoachAnnounce from './components/coach/sport/CoachAnnounce'

import ManageMatchApplication from './components/admin/matchApplication/ManageMatchApplication'
import UpdateAnnounce from './components/admin/announcment/UpdateAnnounce'
import Contact from './components/pages/Contact'
import AllContact from './components/admin/booking/AllContact'

import AddPlayer from './components/coach/player/AddPlayer'
import AllPlayers from './components/coach/player/AllPlayers'
import UpdatePlayer from './components/coach/player/UpdatePlayer'

import ViewPlayers from './components/user/team/ViewPlayers'
import NotFound from './components/pages/NotFound'




// import './App.css'

function App() {

  return (
    <>


      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            {/* <Route path="service" element={<Service />} /> */}
            <Route path="properties" element={<Properties />} />
            <Route path="propertiesdetail" element={<PropertiesDetail />} />
            {/* <Route path="feature" element={<Feature />} />
            <Route path="testimonials" element={<Testimonial />} />

            <Route path="blog" element={<Blog />} />
            <Route path="product" element={<Product />} /> */}
            <Route path="contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/coachregister" element={<CoachRegister />} />




           
            


            <Route path="sport/manage" element={<ManageSport />} />
            <Route path="match/manage/:id" element={<ManageMatch />} />
            <Route path="team/manage/:id" element={<ManageTeam />} />

            <Route path="booking/add/:id" element={<AddBooking />} />
            <Route path="booking/manage" element={<ManageBooking />} />
            <Route path="/team/userTeam" element={<UserTeam />} />

            <Route path="team/players/:teamId" element={<ViewPlayers />} />















          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="sport/add" element={<AddSport />} />
            <Route path="sport/all" element={<AllSport />} />
            <Route path="sport/update/:id" element={<UpdateSport />} />
            <Route path="coach/all" element={<AllCoach />} />
            <Route path="booking/all" element={<AllBooking />} />
            <Route path="team/all" element={<AdminTeam />} />
            <Route path="contact/all" element={<AllContact />} />





            <Route path="match/add" element={<AddMatch />} />
            <Route path="match/all" element={<AllMatch />} />
            <Route path="match/update/:id" element={<UpdateMatch />} />


            <Route path="user/all" element={<ManageUsers />} />
            <Route path="matchapplication/manage" element={<ManageMatchApplication/>} />


            <Route path="announce/add" element={<AddAnnounce />} />
            <Route path="announce/all" element={<AllAnnounce />} />
            <Route path="announce/update/:id" element={<UpdateAnnounce />} />








          </Route>

          <Route path="/coach" element={<CoachLayout />}>
            <Route index element={<CoachDashboard />} />
              <Route path="team/add" element={<AddTeam />} />
            <Route path="team/all" element={<AllTeam />} />
            <Route path="team/update/:id" element={<UpdateTeam />} />
            <Route path="matchapplication/add/:id/:sportsId" element={<AddMatchApplication />} />
            <Route path="matchapplication/all" element={<AllMatchAppliction />} />

            <Route path="coach/matchApplication/update/:id" element={<UpdateMatchApplication />} />
            <Route path="coachsport/all" element={<CoachSport />} />
            <Route path="coachmatch/all/:id" element={<CoachMatch />} />
            <Route path="coachteam/all/:id" element={<CoachTeam />} />
            <Route path="coachannounce/all" element={<CoachAnnounce />} />

            <Route path="player/add" element={<AddPlayer />} />
            <Route path="player/all" element={<AllPlayers />} />
            <Route path="player/update/:id" element={<UpdatePlayer />} />


          </Route>



         <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}


      />
    </>
  )
}

export default App
