import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*
 * Paginate component to improve optimization, time complexity, and efficiency.
 * 
 * Improvements made possible by reducing data fetched per request, found in (animalController.js),
 * from all 10,000 documents at once, before pagination,
 * to 12 documents per page, after pagination.
 * 
 * Optimization result: GET request time reduced from 1266ms to 119ms,
 * and data size reduced from 4.8MB to 6.25KB.
 * 
 * Time Complexity: Each fetch operation reduced from O(n) -> O(1).
 * Where n represents all documents in the database and
 * 1 represents the number of documents per page.
 * 
 * Efficiency: Pagination improved memory usage, reduced server load, 
 * and created a better user experience due to faster response times.
 */
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
                : `/admin/productlist/${page - 1}`  // Admin view of the previous page
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
                : `/admin/productlist/${startPage + x}`  // Admin view of the specific page
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
                : `/admin/productlist/${page + 1}`  // Admin view of the next page
            }
          />
        )}
      </Pagination>
    )
  );
};

export default Paginate;