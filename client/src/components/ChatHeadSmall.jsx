import {  ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";


const ChatHeadSmall = () => {
     const navigate = useNavigate();
     const { selectedUser, setSelectedUser } = useChatStore();
      const { onlineUsers } = useAuthStore();

      const handleClick = ()=>{
        setSelectedUser(null)
        navigate("/")
      }
  return (
     <div className="w-full  p-2.5  border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

        {/* return button */}

        <button onClick={handleClick} >
          <ArrowLeft/>
        </button>


          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ChatHeadSmall