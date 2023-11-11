import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://dailymail-server.vercel.app' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Post'],

    endpoints: (builder) => ({

        ////////// LOGIN, REGISTER & USER API //////////
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/v1/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post']
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/v1/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post']
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: '/auth/v1/message',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post']
        }),
        getAllUsers: builder.query({
            query: () => '/auth/v1/all',
            providesTags: ['Post']
        }),
        getSingleUser: builder.query({
            query: (id) => `/auth/v1/user/${id}`,
            providesTags: ['Post']
        }),
        getUserData: builder.query({
            query: (email) => `/auth/v1/user?email=${email}`,
            providesTags: ['Post']
        }),
        UserTotalPostAndVideosCount: builder.query({
            query: (email) => `/auth/v1/combine?email=${email}`,
            providesTags: ['Post']
        }),
        userDataByEmail: builder.query({
            query: (email) => `/auth/v1/user-data?email=${email}`,
            providesTags: ['Post']
        }),
        getMessageByEmail: builder.query({
            query: (email) => `/auth/v1/recieved?email=${email}`,
            providesTags: ['Post']
        }),


        ////////// POSTS API ///////////
        getAllPost: builder.query({
            query: () => '/posts/v1/all-posts',
            providesTags: ['Post']
        }),
        categoryByPosts: builder.query({
            query: (data) => `/posts/v1/category=${data}`,
            providesTags: ['Post']
        }),
        getSinglePost: builder.query({
            query: (id) => `/posts/v1/post/${id}`,
            providesTags: ['Post']
        }),
        createComments: builder.mutation({
            query: (data) => {
                const { id, ...body } = data
                // console.log('apiSlice-comments-data', body)
                // console.log('apiSlice-Update-ID', id)
                return {
                    url: `/posts/v1/comments/${id}`,
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Post']
        }),
        createLikes: builder.mutation({
            query: (data) => {
                const { id, ...body } = data
                // console.log('apiSlice-comments-data', body)
                // console.log('apiSlice-Update-ID', id)
                return {
                    url: `/posts/v1/likes/${id}`,
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Post']
        }),
        increaseViews: builder.mutation({
            query: (data) => {
                const { id } = data
                return {
                    url: `/posts/v1/post/${id}/views`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['Post']
        }),
        increaseVideoViews: builder.mutation({
            query: (data) => {
                const { id } = data
                return {
                    url: `/videos/v1/post/${id}/views`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['Post']
        }),
        /////////// CATEGORY API ///////////
        getCategory: builder.query({
            query: () => '/category/v1/get',
            providesTags: ['Post']
        }),
        getSingleCategory: builder.query({
            query: (id) => `/category/v1/get/${id}`,
            providesTags: ['Post']
        }),
        getCategoryPosts: builder.query({
            query: (params) => `/category/v1/filter?category=${params}`,
            providesTags: ['Post']
        }),
        getCategoryvideos: builder.query({
            query: (params) => `/category/v1/filter-videos?category=${params}`,
            providesTags: ['Post']
        }),

        /////// VIDEO API /////////
        getAllVideos: builder.query({
            query: () => '/videos/v1/all',
            providesTags: ['Post']
        }),
        getSingleVideos: builder.query({
            query: (id) => `/videos/v1/all/${id}`,
            providesTags: ['Post']
        }),



    }),


})


export const {

    // LOGIN, REGISTER AND USERS
    useLoginMutation,
    useRegisterMutation,
    useGetUserDataQuery,
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useUserDataByEmailQuery,
    useUserTotalPostAndVideosCountQuery,
    useSendMessageMutation,
    useGetMessageByEmailQuery,

    // POST
    useGetAllPostQuery,
    useCategoryByPostsQuery,
    useGetSinglePostQuery,
    useCreateCommentsMutation,
    useCreateLikesMutation,
    useIncreaseViewsMutation,

    // CATEGORY
    useGetCategoryQuery,
    useGetSingleCategoryQuery,
    useGetCategoryPostsQuery,
    useGetCategoryvideosQuery,

    // VIDEO
    useGetAllVideosQuery,
    useGetSingleVideosQuery,
    useIncreaseVideoViewsMutation,


} = api