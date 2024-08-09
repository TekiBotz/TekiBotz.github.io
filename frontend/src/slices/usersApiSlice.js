import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

/*
* Injects user-related endpoints into the base apiSlice.
* Each endpoint corresponds to a specific API operation and is exported for use in React components.
*/
export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Endpoint for user login
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
			}),
		}),
		// Endpoint for user registration
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
			}),
		}),
		// Endpoint for user logout
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		// Endpoint for updating user profile
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),
		// Endpoint for fetching a list of users
		getUsers: builder.query({
			query: () => ({
				url: `${USERS_URL}`,
			}),
			providesTags: ['Users'],  // Allows you to see the deleted user without reloading the page
			keepUnusedDataFor: 5,
		}),
		// Endpoint for deleting a user
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
		}),
		// Endpoint for fetching details of a specific user
		getUserDetials: builder.query({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		// Endpoint for updating user details
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const { 
	useLoginMutation, 
	useLogoutMutation, 
	useRegisterMutation, 
	useProfileMutation, 
	useGetUsersQuery, 
	useDeleteUserMutation,
	useGetUserDetialsQuery,
	useUpdateUserMutation,
} = usersApiSlice;