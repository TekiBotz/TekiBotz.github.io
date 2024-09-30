/**
 * Project: AnimalRescue
 * File: Paginate.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-27
 * Purpose: Provides pagination for lists with multiple pages of data. 
 *          It displays a range of page numbers and allows navigation between them. 
 *          This file also details the specific pagination algorithm implemented and
 *          how it corresponds to optimization, time complexity, and efficiency.
 * 
 * Algorithm: The pagination algorithm displays a maximum of 6 page
 *            numbers at a time, dynamically calculating the 
 *            start and end pages based on the current page. It allows 
 *            users to navigate between pages using previous and next 
 *            buttons, and highlights the current page. The link destinations 
 *            vary depending on the user's role and whether a keyword is being searched.
 * 
 * Optimization, Time Complexity, and Efficiency:
 *    The Pagination and SearchBar algorithms significantly improves optimization, time complexity, 
 *    and efficiency compared to the native pagination without a search bar used in the original artifact. 
 *    By filtering data through the search bar, the pagination algorithm reduces the number of records 
 *    processed and pages rendered, improving load times and user experience. The dynamic calculation 
 *    of page ranges and the ability to jump directly to specific pages further enhance the efficiency 
 *    and responsiveness of the pagination.
 */

import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // Range of pages to display in the pagination component
  const pageRange = 6;

  // Calculate the starting and ending page numbers for pagination
  const startPage = Math.max(1, page - Math.floor(pageRange / 2));
  const endPage = Math.min(pages, page + Math.floor(pageRange / 2));

  return (
    pages > 1 && (
      <Pagination>
        {/* Previous button */}
        {page > 1 && (
          <Pagination.First
            as={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page - 1}`  // Navigate to the previous page with search keyword
                  : `/page/${page - 1}`  // Navigate to the previous page without search keyword
                : `/admin/animallist/${page - 1}`  // Admin view of the previous page
            }
          />
        )}

        {/* Loop through the calculated page range */}
        {[...Array(endPage - startPage + 1).keys()].map((x) => (
          <Pagination.Item
            key={startPage + x}
            as={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${startPage + x}`  // Navigate to specific page with search keyword
                  : `/page/${startPage + x}`  // Navigate to specific page without search keyword
                : `/admin/animallist/${startPage + x}`  // Admin view of the specific page
            }
            active={startPage + x === page}  // Highlight current page
          >
          {startPage + x}  {/*Display page numbers*/}
          </Pagination.Item>
        ))}

        {/* Next button */}
        {page < pages && (
          <Pagination.Last
            as={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`  // Navigate to the next page with search keyword
                  : `/page/${page + 1}`  // Navigate to the next page without search keyword
                : `/admin/animallist/${page + 1}`  // Admin view of the next page
            }
          />
        )}
      </Pagination>
    )
  );
};

export default Paginate;