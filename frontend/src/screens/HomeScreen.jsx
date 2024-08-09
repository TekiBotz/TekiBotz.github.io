import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimalCard from '../uiComponents/AnimalCard';
import LoadingSpinner from '../uiComponents/LoadingSpinner';
import AlertMessage from '../uiComponents/AlertMessage';
import Paginate from '../uiComponents/Paginate';
import { useGetAnimalsQuery } from '../slices/animalsApiSlice';


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();  // Extracts pageNumber and keyword from the URL
  const { data, isLoading, error } = useGetAnimalsQuery({ keyword, pageNumber });  // Fetching animals based on the keyword and pageNumber

  return (
    <>
      {/* Back arrow allows users to naviate to home screen */}
      {keyword && (
        <Link to='/'>
          <i className="bi bi-arrow-left-circle-fill text-dark fs-1"></i>
        </Link>
      )}
      {/* Conditional rendering */}
      { isLoading ? (
          <LoadingSpinner/>
      ) : error ? (
        <AlertMessage varient='danger'>
          {error?.data?.message || error.error}
        </AlertMessage>
      ) : (
      <>
        <div className='my-2'>
        <h2>Rescue A Pet</h2>
        </div>
        <Row>
            {data.animals.map((animal) => (
                <Col key={animal._id} sm={12} md={6} lg={4} xl={3}>
                    <AnimalCard animal={animal} />
                </Col>
            ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
      </>) 
      }
    </>
  );
};

export default HomeScreen