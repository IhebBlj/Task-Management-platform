import { apiSlice } from "../apiSlice";

const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include", 
            })
        }),
        updateName:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-name/${data.userId}`,
                method: "PUT",
                body: data,
                credentials: "include", 
            })
        })
        ,
        getTeamList: builder.query({
            query: () => ({
                url: `${USER_URL}/get-team`, 
                method: "GET",
                credentials: "include",
            })
        }),
        getTeam:builder.query({
    query:(userID)=>({
    url: `${USER_URL}/${userID}/team`, 
    method: "GET",
    credentials: "include",
        }),
        providesTags: ['Team'],
        }),
        sendInviation:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/send-invitation`, 
                method: "POST",
                body: data,
                credentials: "include",
            })
        }),
        invitaionResponse:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/response-invitaion`, 
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Team'], 
        }),

        // deleteUser: builder.mutation({
        //     query: (id) => ({
        //         url: `${USER_URL}/${id}`, 
        //         method: "DELETE",
        //         credentials: "include",
        //     })
        // }),
        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`, 
                method: "PUT",
                body:data,
                credentials: "include",
            })
        }),
        
        // getNotifications : builder.query({
        //     query: () => ({
        //         url: `${USER_URL}/notifications`, 
        //         method: "GET",
        //         credentials: "include",
        //     }),
        // }),

        markNotiAsRead : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`, 
                method: "PUT",
                body:data,
                credentials: "include",
            }),
        }),
        changePassword : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.userId}/change-password`, 
                method: "PATCH",
                body:data,
                credentials: "include",
            })
        }),
        getInvitations:builder.query({
            query: (userId) => ({
                url: `${USER_URL}/${userId}/invitations`, 
                method: "GET",
                credentials: "include",
            })

        }),
        deleteNotification:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/notifications/${data.notificationId}`,
                method:"DELETE" ,
                credentials:"include"

            }),invalidatesTags: ['Notification'], 
        }),
        deleteTeamMember:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/team/${data.email}`, 
                method: "DELETE",
                body:data,
                credentials: "include",
            }),
            invalidatesTags: ['Team'], 

        }),
        getNotifications:builder.query({
            query:(data)=>({
                url:`${USER_URL}/${data.userId}/notifications`,
                method:"GET",
                credentials:"include"
            }), providesTags: ['Notification'],

        }),
        getUsers:builder.query({
            query:(data)=>({
                url:`${USER_URL}/users`,
                method:"GET",
                credentials:"include"
            })
        }),
        deleteUser:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/users/${data.userId}`, 
                method: "DELETE",
                body:data,
                credentials: "include",
            }),
           
        }),
        postInquiries:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/inquiries`,
                method:"POST",
                body:data,
                credentials:"include"
            })
        }),
        getInquiries:builder.query({
            query:(data)=>({
                url:`${USER_URL}/inquiries`,
                method:"Get",
               
                credentials:"include"
            })
        }),
        addUserByadmin:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/add-user`,
                method:"POST",
                body:data,
                credentials:"include"
            })

        })

    })
});

export const { useUpdateUserMutation, 
    useGetTeamListQuery , 
   
     useUserActionMutation,
     useGetNotificationsQuery,
     useMarkNotiAsReadMutation,
     useChangePasswordMutation,
     useGetTeamQuery,
     useSendInviationMutation,
     useInvitaionResponseMutation,
     useGetInvitationsQuery,
     useDeleteTeamMemberMutation,
     useUpdateNameMutation,
     useDeleteNotificationMutation,
     useGetUsersQuery,
     useDeleteUserMutation,
     usePostInquiriesMutation,
     useGetInquiriesQuery,
     useAddUserByadminMutation
       } = userApiSlice;
