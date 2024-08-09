import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AlertMessage from '../../uiComponents/AlertMessage';
import LoadingSpinner from '../../uiComponents/LoadingSpinner';
import Paginate from '../../uiComponents/Paginate';
import { useGetAnimalsQuery } from '../../slices/animalsApiSlice';

const AnimalListScreen = () => {
  const { pageNumber } = useParams();  // Extracts pageNumber parameter from the URL
  const { data, isLoading, error } = useGetAnimalsQuery({ pageNumber });  // Fetches animal data based on page number

  return (
    <>
      {/* Header Row */}
      <Row className='align-items-center'>
        <Col>
          <h1>Animals In Shelter</h1>
        </Col>
      </Row>

      {/* Conditional rendering */}
      {isLoading ? (
        <LoadingSpinner /> 
      ) : error ? (
      <AlertMessage varient='danger'>{error.data.message}</AlertMessage> 
      ) : (
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
                <th>Sex Upon Outcome</th>
                <th>Outcome Type</th>
                <th>Outcome Subtype</th>
                <th>Outcome Datetime</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {data.animals.map((animal) => (
                <tr key={animal._id}>
                  <td>{animal._id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.animal_type}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.date_of_birth}</td>
                  <td>{animal.sex_upon_outcome}</td>
                  <td>{animal.outcome_type}</td>
                  <td>{animal.outcome_subtype}</td>
                  <td>{animal.datetime}</td>
                  <td>{animal.location_lat}</td>
                  <td>{animal.location_long}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
        </>
        
      )}
    </>
  );
};

export default AnimalListScreen