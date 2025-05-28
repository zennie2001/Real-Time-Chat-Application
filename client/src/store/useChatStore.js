import {create} from "zustand"
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create(persist((set, get)=>({
    messages:[],
    users: [],
    selectedUser: null,
    isUserLoading : false,
    isMessageLoading : false,



    getUsers: async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users")
            console.log(res.data);
            set({users:res.data})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load users");

            
        }finally{
             set({isUserLoading: false});
        }
    },

   getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      console.log(userId);
      console.log(res.data);
      
      
      
      set({ messages: res.data });
    
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage:async(messageData) =>{
        const {selectedUser, messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages:[...messages, res.data]})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    },

    subscribeToMessages: ()=>{
      const {selectedUser} = get()
      if(!selectedUser) return;

      const socket = useAuthStore.getState().socket

      socket.on("newMessage", (newMessage)=>{
        set({
          messages: [...get().messages, newMessage]
        })
      })
    },

    unsubscribeFromMessages: ()=>{
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage")
    },

    setSelectedUser: (selectedUser)=> set({selectedUser}),
    
}),

  

    {
      name: "chat-storage", // localStorage key
      partialize: (state) => ({ selectedUser: state.selectedUser }),
    }
))