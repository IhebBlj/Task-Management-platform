import { apiSlice } from "../apiSlice";

const EVENT_URL = "/event";

export const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addEvent: builder.mutation({
            query: (data) => ({
                url: `${EVENT_PATH}/add-event`, 
                method: "POST",
                body: data,
                credentials: "include", 
            })
        }),



    })
});

export const { useAddEventMutation } = eventApiSlice;
