import { apiSlice } from "../apiSlice";

const PROJECT_URL = "/task";

export const ProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${PROJECT_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllProject: builder.query({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.userId}`,
        
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['Projects'],
      
    }), 
      getProject: builder.query({
      query: (taskID) => ({
        url: `${PROJECT_URL}/${taskID}`,
        method: "GET",
        credentials: "include",
      }),
      // providesTags: ['Tasks'],
    })
    ,

    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['Projects'], 
    }),

    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/update`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
       invalidatesTags: ['Projects'],
    }),


    deleteProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.taskId}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ['Projects'],
    }),
    deleteTask:builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/subtasks/${data.subTaskId}/delete`,
        method: "DELETE",
        credentials: "include",
        body:data
      }),
      invalidatesTags: ['Tasks'],
    })
    ,
    addTask: builder.mutation({
      query: ({ id, subTaskData }) => ({
        url: `${PROJECT_URL}/${id}/create-subtask`,
        method: "POST",
        body: subTaskData, 
        credentials: "include",
      }),
      invalidatesTags: ['Tasks'],
    }),
    getAllSubtask: builder.query({
      query: ({ taskId }) => ({
        url: `${PROJECT_URL}/${taskId}/subtasks`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['Tasks'],
    }),
 
    updateTask: builder.mutation({
      query: ({ taskId, subTaskId, subTaskData }) => ({
        url: `${PROJECT_URL}/update-subtask/${taskId}/${subTaskId}`,
        method: "PUT",
        body: subTaskData,
        credentials: "include",
      }),
      invalidatesTags: ['Tasks'],
    }),
updateSubtaskStage:builder.mutation({
  query: (data) => ({
    url: `${PROJECT_URL}/subtasks/${data.subTaskId}/update-stage`,
    method: "PUT",
    body: data,
    credentials: "include",
  }),
  invalidatesTags: ['Tasks','Projects'],
}),
updateSubTask:builder.mutation({
  query: (data) => ({
    url: `${PROJECT_URL}/subtasks/${data.subTaskId}/update`,
    method: "PUT",
    body: data,
    credentials: "include",
  }),
  invalidatesTags: ['Tasks','Projects'],
})
,
    getSingleProject : builder.query({
      query : (id) =>({
        url: `${PROJECT_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }
      )
    }),

    postProjectActivity: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/activity`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    deleteRestoreProject: builder.mutation({
      query: (id, actionType) => ({
        url: `${PROJECT_URL}/delete-restore/${id}?actionType=${actionType}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    
  }),
});


export const {
  useGetDashboardStatsQuery,
  useGetAllProjectQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddTaskMutation,
  useGetSingleProjectQuery,
  usePostProjectActivityMutation,
  useDeleteRestoreProjectMutation,
  useUpdateTaskMutation,
  useGetAllSubtaskQuery,
  useUpdateSubtaskStageMutation,
  useDeleteTaskMutation,
  useUpdateSubTaskMutation
} = ProjectApiSlice;
