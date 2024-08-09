import { ANIMALS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

/*
* Used to inject endpoints into the parent apiSlice.
* getAnimals will make a query to ANIMALS_URL and 
* that query will be exported as useGetAnimalsQuery used in HomeScreen.
*/
export const animalsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Endpoint for fetching a list of animals with optional search keywords and pagination.
		getAnimals: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: ANIMALS_URL,  // Base URL for the animals API
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,  // Cache data for 5 seconds before refeatching
		}),
		// Endpoint for fetching details of a specific animal by its ID.
		getAnimalDetails: builder.query({
			query: (animalID) => ({
				url: `${ANIMALS_URL}/${animalID}`,  // URL to fetch details of a specific animal
			}),
			keepUnusedDataFor: 5,  // Cache data for 5 seconds before refeatching
		}),
	}),
});

export const { useGetAnimalsQuery, useGetAnimalDetailsQuery } = animalsApiSlice;