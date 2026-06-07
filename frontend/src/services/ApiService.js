import axios from "axios"
import { io } from "socket.io-client"
const BASEURL=import.meta.env.VITE_API_URL

class ApiServices{
    getToken(){
        let token=sessionStorage.getItem("token")
        let headers={
                Authorization:token
            }
        return headers
    }


    
    login(data){
        return axios.post(BASEURL+"/api/user/login", data,{headers:this.getToken()})
    }
    softDeleteUser(data){
        return axios.post(BASEURL+"/admin/user/softDelete", data, {headers:this.getToken()})
    }
    register(data){
        return axios.post(BASEURL+"/api/user/register", data)
    }
    coachregister(data){
        return axios.post(BASEURL+"/api/coach/register", data)
    }
    allUser(data){
        return axios.post(BASEURL+"/api/user/all",data )
    }
    addSport(data){
        return axios.post(BASEURL+"/admin/sport/add", data,{headers:this.getToken()})
    }
    allSport(data){
        return axios.post(BASEURL+"/api/sport/all",data )
    }
    changeStatusSport(data){
        return axios.post(BASEURL+"/admin/sport/changeStatus", data, {headers:this.getToken()})
    }
    singleSport(data){
        return axios.post(BASEURL+"/api/sport/single",data)
    }
    updateSport(data){
        return axios.post(BASEURL+"/admin/sport/update",data,{headers:this.getToken()})
    }
    DeleteSport(data){
        return axios.post(BASEURL+"/admin/sport/delete",data,{headers:this.getToken()})
    }
    addTeam(data){
        return axios.post(BASEURL+"/coach/team/add", data,{headers:this.getToken()})
    }
    allTeam(data){
        return axios.post(BASEURL+"/api/team/all", data,{headers:this.getToken()})
    }
    changeStatusTeam(data){
        return axios.post(BASEURL+"/coach/team/changeStatus", data, {headers:this.getToken()})
    }
    singleTeam(data){
        return axios.post(BASEURL+"/api/team/single",data)
    }
    updateTeam(data){
        return axios.post(BASEURL+"/coach/team/update",data,{headers:this.getToken()})
    }
    DeleteTeam(data){
        return axios.post(BASEURL+"/coach/team/delete",data,{headers:this.getToken()})
    }
    
    allCoach(data){
        return axios.post(BASEURL+"/api/coach/all", data,{headers:this.getToken()})
    }
    changeStatusCoach(data){
        return axios.post(BASEURL+"/admin/coach/changeStatus", data, {headers:this.getToken()})
    }
    singleCoach(data){
        return axios.post(BASEURL+"/api/coach/single",data)
    }
    updateCoach(data){
        return axios.post(BASEURL+"/admin/coach/update",data,{headers:this.getToken()})
    }
    DeleteCoach(data){
        return axios.post(BASEURL+"/admin/coach/delete",data,{headers:this.getToken()})
    }
    addBooking(data){
        return axios.post(BASEURL+"/user/booking/add", data,{headers:this.getToken()})
    }
    allBooking(data){
        return axios.post(BASEURL+"/api/booking/all", data,{headers:this.getToken()})
    }
    changeStatusBooking(data){
        return axios.post(BASEURL+"/admin/booking/changeStatus", data, {headers:this.getToken()})
    }
    singleBooking(data){
        return axios.post(BASEURL+"/api/booking/single",data)
    }
    updateBooking(data){
        return axios.post(BASEURL+"/user/user/booking/update",data,{headers:this.getToken()})
    }
    DeleteBooking(data){
        return axios.post(BASEURL+"/farmer/booking/delete",data,{headers:this.getToken()})
    }

    addMatchApplication(data){
        return axios.post(BASEURL+"/coach/matchapplication/add", data,{headers:this.getToken()})
    }
    allMatchApplication(data){
        return axios.post(BASEURL+"/api/matchapplication/all", data,{headers:this.getToken()})
    }
    changeStatusMatchApplication(data){
        return axios.post(BASEURL+"/admin/matchapplication/changeStatus", data, {headers:this.getToken()})
    }
    singleMatchApplication(data){
        return axios.post(BASEURL+"/api/matchapplication/single",data)
    }
    updateMatchApplication(data){
        return axios.post(BASEURL+"/coach/matchapplication/update",data,{headers:this.getToken()})
    }
    DeleteMatchApplication(data){
        return axios.post(BASEURL+"/admin/matchapplication/delete",data,{headers:this.getToken()})
    }
    addMatch(data){
        return axios.post(BASEURL+"/admin/match/add", data,{headers:this.getToken()})
    }
    allMatch(data){
        return axios.post(BASEURL+"/api/match/all", data,{headers:this.getToken()})
    }
    changeStatusMatch(data){
        return axios.post(BASEURL+"/admin/match/changeStatus", data, {headers:this.getToken()})
    }
    singleMatch(data){
        return axios.post(BASEURL+"/api/match/single",data)
    }
    updateMatch(data){
        return axios.post(BASEURL+"/admin/match/update",data,{headers:this.getToken()})
    }
    DeleteMatch(data){
        return axios.post(BASEURL+"/admin/match/delete",data,{headers:this.getToken()})
    }
    dashboard(data){
        return axios.post(BASEURL+"/api/dashboard",data)
    }

    addAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/add", data,{headers:this.getToken()})
    }
    allAnnouncment(data){
        return axios.post(BASEURL+"/api/announcment/all", data,{headers:this.getToken()})
    }
    changeStatusAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/changeStatus", data,{headers:this.getToken()})
    }
    singleAnnouncment(data){
        return axios.post(BASEURL+"/api/announcment/single", data,{headers:this.getToken()})
    }
    updateAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/update", data,{headers:this.getToken()})
    }
    deleteAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/delete", data,{headers:this.getToken()})
    }

    getGeminiCropSuggestion(data) {
    return axios.post(
      BASEURL + "/gemini/suggest",
      data,
       // optional auth
    );
  }

  predictAttendance(matchData) {
  // matchData should be { matchDate, matchTime, matchName }
  return axios.post(BASEURL+  "/ai/predict-attendance", matchData);
}


  

  
getMatchesBySport(data) {
  return axios.post(
    BASEURL + "/ai/get-matches-by-sport",
    data
  );
}


    // Player APIs
    addPlayer(data){
        return axios.post(BASEURL+"/coach/player/add", data, {headers:this.getToken()})
    }
    allPlayer(data){
        return axios.post(BASEURL+"/api/player/all", data, {headers:this.getToken()})
    }
    singlePlayer(data){
        return axios.post(BASEURL+"/api/player/single", data, {headers:this.getToken()})
    }
    updatePlayer(data){
        return axios.post(BASEURL+"/coach/player/update", data, {headers:this.getToken()})
    }
    changeStatusPlayer(data){
        return axios.post(BASEURL+"/coach/player/changeStatus", data, {headers:this.getToken()})
    }
    deletePlayer(data){
        return axios.post(BASEURL+"/coach/player/delete", data, {headers:this.getToken()})
    }
    adminAllPlayer(data){
        return axios.post(BASEURL+"/admin/player/all", data, {headers:this.getToken()})
    }

    chatBot(data){
        return axios.post(BASEURL+"/ai/chatbot", data)
    }



getAllCoaches(data) {
    return axios.post(
      BASEURL + "/chat/get-all-coaches",
      data,
      { headers: this.getToken() }
    );
  }

  // ✅ Get Admin (User → Admin)
  getAdmin(data) {
    return axios.post(
      BASEURL + "/chat/get-admin",
      data,
      { headers: this.getToken() }
    );
  }

  


   getMessages(data) {
    return axios.post(`${BASEURL}/chat/get-messages`, data);
  }

  addContact(data){
    return axios.post(BASEURL+"/api/contact/add", data)
  }
  allContact(data){
    return axios.post(BASEURL+"/admin/contact/all", data,{headers:this.getToken()})
  }changeStatusContact(data){
    return axios.post(BASEURL+"/admin/contact/changeStatus", data,{headers:this.getToken()})
  }


    
}
export default new ApiServices
