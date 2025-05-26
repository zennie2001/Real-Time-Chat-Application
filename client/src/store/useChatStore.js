import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set)=>({
    messages:[],
    users: [],
    selectedUser: null,
    isUserLoading : false,
    isMessageLoading : false,



    getUsers: async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users")
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message);

            
        }finally{
             set({isUserLoading: false});
        }
    },

    getMessages:async (userId)=>{
        set({isMessageLoading:true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading:false})
        }
    },

    setSelectedUser: (selectedUser)=> set({selectedUser}),
}))