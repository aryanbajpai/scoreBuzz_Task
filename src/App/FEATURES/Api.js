import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const teamApi = createApi({
    reducerPath: 'teamApi',
    //Fetch the Server
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/'
    }),

    //for AutoFetching
    tagTypes: ['First', 'Second'],

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
        addHistoryOne: builder.mutation({
            query: (history) => ({
                url: '/first',
                method: 'POST',
                body: JSON.stringify(history)
            }),
            invalidatesTags: ['First'],
        }),//CREATE data in Server
        addHistoryTwo: builder.mutation({
            query: (history) => ({
                url: '/second',
                method: 'POST',
                body: JSON.stringify(history)
            }),
            invalidatesTags: ['Second'],
        }),
        useHistoryOne: builder.query({
            query: () => 'first',
            providesTags: ['First']
        }),
        useHistoryTwo: builder.query({
            query: () => 'second',
            providesTags: ['Second']
        }),

        //DELETE data from Server
        undoHistory: builder.mutation({
            query: (commentId) => ({
                url: `/commentary/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Commentary'],
        }),
    })
});

export const { useGetTeamOneQuery, useGetTeamTwoQuery, useAddHistoryOneMutation, useAddHistoryTwoMutation, useUseHistoryOneQuery, useUseHistoryTwoQuery, useUndoHistoryMutation } = teamApi;
//use this HOOK in App Component to fetch data