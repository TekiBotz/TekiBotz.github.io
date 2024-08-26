/**
 * Project: AnimalShelter
 * File: compontnts/AnimalTable.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-23
 * Purpose: AnimalTable component renders a table displaying a list of animals.
 */

import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

// AnimalTable component
export function AnimalTable({ animals }) {
  return (
    <>
      {/* Table displaying animal data */}
      <Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>DOB</th>
            <th>Sex</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {animals.length > 0 ? (
            animals.map((animal) => {
              return (
                <tr key={animal._id}>
                  <td>{animal._id}</td>
                  <td>{animal.name || 'Need A Name'}</td>
                  <td>{animal.animal_type}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.date_of_birth}</td>
                  <td>{animal.sex_upon_outcome}</td>
                  <td>{animal.location_lat}</td>
                  <td>{animal.location_long}</td>
                  <td>
                    <a href={`/animal/${animal._id}`}>View Details</a>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan='7'>No animals found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

AnimalTable.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      breed: PropTypes.string.isRequired,
      date_of_birth: PropTypes.string.isRequired,
      sex_upon_outcome: PropTypes.string.isRequired,
      animal_type: PropTypes.oneOf(['Dog', 'Cat']).isRequired,
      location_lat: PropTypes.number,
      location_long: PropTypes.number,
    }),
  ).isRequired,
}
