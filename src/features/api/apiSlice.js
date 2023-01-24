import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (filter) => {
                if (filter) {
                    const { status, colors } = filter;
                    let queryString = "";
                    let queryStatus = "";
                    if (status === "Complete") {
                        queryStatus = `completed_like=true`;
                    }
                    if (status === "Incomplete") {
                        queryStatus = `completed_like=false`;
                    }

                    queryString =
                        colors?.length > 0
                            ? colors
                                  ?.map((color) => `color_like=${color}`)
                                  .join("&")
                            : "";

                    return `/todos?${
                        queryStatus !== ""
                            ? queryString !== ""
                                ? queryStatus + "&" + queryString
                                : queryStatus
                            : queryString
                    }`;
                } else {
                    return `/todos`;
                }
            },
            providesTags: ["Todos"],
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
} = apiSlice;
