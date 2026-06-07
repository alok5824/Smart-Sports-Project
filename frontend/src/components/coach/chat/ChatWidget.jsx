import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";
import ApiService from "../../../services/ApiService";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [users, setUsers] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType"); // "admin" or "coach"

  useEffect(() => {
   
  console.log("Session userId:", userId);
  console.log("Session userType:", userType);

  if (!userId || !userType) return; // API won't call if these are missing

    if (!userId || !userType) return;

    const fetchUsers = async () => {
      try {
        let usersList = [];

        if (userType === "admin") {
          const res = await ApiService.getAllCoaches({});
          console.log("Admin fetch coaches:", res.data);

          if (res.data.success && Array.isArray(res.data.data)) {
            usersList = res.data.data
              .filter(u => u && u._id) // safety filter
              .map(u => ({
                _id: u._id,
                name: u.name || "Unnamed Coach",
                userType: u.userType || "coach",
                profileImage: u.profileImage || null,
              }));
          }
        }

        if (userType === "coach") {
          // const res = await axios.post("http://localhost:5000/chat/get-admin");
          const res=await ApiService.getAdmin({});
          console.log("Coach fetch admins:", res.data);

          if (res.data.success && Array.isArray(res.data.data)) {
            usersList = res.data.data
              .filter(u => u && u._id)
              .map(u => ({
                _id: u._id,
                name: u.name || "Admin",
                userType: u.userType || "admin",
                profileImage: u.profileImage || null,
              }));
          }
        }

        console.log("Final users list:", usersList);
        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching chat users:", err);
      }
    };

    fetchUsers();
  }, [userId, userType]);

  return (
    <div style={styles.widget}>
      {!open && (
        <button style={styles.floatingButton} onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
      <div style={{
                    ...styles.chatContainer,
                    display: receiverId ? "flex" : "block",
                }}>
          {/* Sidebar */}
          {!receiverId && (
            <div style={styles.sidebar}>
              <div style={styles.sidebarHeader}>
                <span>{userType === "admin" ? "Coaches" : "Admin"}</span>
                <button style={styles.closeBtn} onClick={() => setOpen(false)}>
                  X
                </button>
              </div>
              <div style={styles.userList}>
                {users.length ? (
                  users.map((u) => (
                    <div
                      key={u._id}
                      style={styles.userItem}
                      onClick={() => setReceiverId(u._id)}
                    >
                      {u.profileImage ? (
                        <img
                          src={u.profileImage}
                          alt={u.name}
                          style={styles.avatar}
                        />
                      ) : (
                        <div style={styles.avatarPlaceholder}>{u.name.charAt(0)}</div>
                      )}
                      <span style={{ marginLeft: 8 }}>
                        {u.name} {u.userType === "admin" ? "(Admin)" : ""}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: 10 }}>No users available</div>
                )}
              </div>
            </div>
          )}

          {/* Chat panel */}
          {receiverId && (
            <div style={styles.chatPanel}>
              <div style={styles.chatHeader}>
                <button
                  onClick={() => setReceiverId(null)}
                  style={styles.backBtn}
                >
                  ←
                </button>
                <span>{users.find((u) => u._id === receiverId)?.name || "Chat"}</span>
                <button onClick={() => setOpen(false)} style={styles.closeBtn}>
                  X
                </button>
              </div>
              
                 <div style={styles.chatPanelInner}>
    <Chat receiverId={receiverId} />
  </div>
            
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  widget: { position: "fixed", bottom: 20, right: 20, zIndex: 9999 },
  floatingButton: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    fontSize: 24,
    background: "rgb(44, 122, 123)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  chatContainer: {
    display: "flex",
    width: 350,
    height: 500,
    background: "#fff",
    
    borderRadius: 10,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
  },
  sidebar: {
    width: "100%",
    borderRight: "1px solid rgb(44, 122, 123)",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    padding: 10,
    fontWeight: "bold",
    background: "rgb(44, 122, 123)",
    color:"white",
    display: "flex",
    justifyContent: "space-between",
  },
  userList: { flex: 1, overflowY: "auto" },
  userItem: {
    padding: 10,
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    display: "flex",
    alignItems: "center", 
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    objectFit: "cover",
    
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "rgb(44, 122, 123)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
chatPanel: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,        // allows chat box to shrink inside flex
  position: "relative", // for header z-index stacking
},

chatHeader: {
  padding: 10,
  background: "rgb(44, 122, 123)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: "bold",
  position: "relative", // <-- add this
  zIndex: 10            // <-- higher than chat area
},

chatPanelInner: {
  flex: 1,
  overflowY: "auto",   // scrollable messages
  padding: 0,
}
,
  closeBtn: { border: "none", background: "transparent", cursor: "pointer",color:"white" },
  backBtn: { border: "none", background: "transparent", cursor: "pointer", fontSize: 18,color:"white" },
};
