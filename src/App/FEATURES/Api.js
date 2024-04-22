import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const teamApi = createApi({
    reducerPath: 'teamApi',
    //Fetch the Server
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/'
    }),

    //for AutoFetching
    tagTypes: ['Commentary'],

    //Add the ENDPOINTS => uses BUILDER pattern
    endpoints: (builder) => ({

        //READ data from Server
        getTeamOne: builder.query({
            query: () => 'T1',
        }),
        getTeamTwo: builder.query({
            query: () => 'T2',
        }),

        //CREATE data in Server
        addHistory: builder.mutation({
            query: (history) => ({
                url:'/commentary',
                method: 'POST',
                body: JSON.stringify(history)
            }),
            invalidatesTags: ['Commentary'],
        }),
        useHistory: builder.query({
            query: () => 'commentary',
            providesTags: ['Commentary']
        }),

        //DELETE data from Server
        undoHistory: builder.mutation({
            query: (commentId) => ({
                url: `/commentary/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Commentary'],
        })
    })
});

export const { useGetTeamOneQuery, useGetTeamTwoQuery, useAddHistoryMutation, useUseHistoryQuery, useUndoHistoryMutation } = teamApi;
//use this HOOK in App Component to fetch data