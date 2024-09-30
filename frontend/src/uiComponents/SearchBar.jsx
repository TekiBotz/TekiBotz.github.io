/**
 * Project: AnimalRescue
 * File: SearchBar.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-27
 * Purpose: Provides a search bar for users to search for animals. 
 *          It handles user input and navigates to a search results page based on the search term.
 *          The file also details the specific search algorithm implemented and
 *          how it corresponds to optimization, time complexity, and efficiency.
 * 
 * Algorithm: The search algorithm first checks if a keyword is provided in the URL. 
 *            If found, it initializes the keyword state variable. The user can then 
 *            enter or modify the keyword in the search bar, and the state is updated accordingly. 
 *            When the form is submitted, the algorithm checks if a keyword exists. If it does, 
 *            it trims the keyword, redirects the user to the search results page, and clears 
 *            the input field. If no keyword is provided, the user is redirected to the homepage.
 * 
 * Optimization, Time Complexity, and Efficiency:
 *    The Pagination and SearchBar algorithms significantly improves optimization, time complexity, 
 *    and efficiency compared to the native pagination without a search bar used in the original artifact. 
 *    By filtering data through the search bar, the pagination algorithm reduces the number of records 
 *    processed and pages rendered, improving load times and user experience. The dynamic calculation 
 *    of page ranges and the ability to jump directly to specific pages further enhance the efficiency 
 *    and responsiveness of the pagination.
 */

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();

  // Extract 'keyword' from the URL, if available
  const { keyword: urlKeyword } = useParams();

  // State to control the input value for the search keyword
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');  // Clear input field after submission
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      {/* Input field for entering the search query. 
        It updates the 'keyword' state as the user types. */}
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Animals...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      {/* Submit button */}
      <Button type='submit' variant='outline-light' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;