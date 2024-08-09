import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

/*
 * The apiSlice serves as the base API configuration and
 * provides the common setup for all API slices that extend it.
 * https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery
 */
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Animal', 'User'],  // Tag types for cache invalidation and refetching
    endpoints: (builder) => ({}),  // Endpoints in extended API slices
});