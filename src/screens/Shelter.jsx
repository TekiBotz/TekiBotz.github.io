/**
 * Project: AnimalShelter
 * File: screens/Shelter.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 *          Integrates with HomeScreen component and uses pagination.
 */

import { useQuery } from '@tanstack/react-query'
import { Container } from 'react-bootstrap'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HomeScreen } from '../components/HomeScreen'
import { getAnimals } from '../api/animals'
import { useState } from 'react'

// Shelter component
export function Shelter() {
  const ITEMS_PER_PAGE = 12 // Number of animals per page (adjust as needed)

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch animals
  const {
    data: allAnimals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['animals', currentPage], // Include current page in query key
    queryFn: ({ page = currentPage }) => getAnimals({ page }), // Pass page to getAnimals
  })

  // Calculate the starting index of animals for the current page.
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  // Slice the animals array to display only the current page's animals.
  const displayedAnimals = allAnimals?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  // Function to handle page changes by updating the current page state.
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen
            animals={displayedAnimals}
            isLoading={isLoading}
            error={error}
            onPageChange={handlePageChange}
          />
        </Container>
      </main>
      <Footer />
    </>
  )
}
