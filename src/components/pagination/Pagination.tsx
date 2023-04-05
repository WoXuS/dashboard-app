import React, { SetStateAction, Dispatch, useEffect } from "react";
import "./Pagination.css";
interface PaginatioProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}
const Pagination: React.FC<PaginatioProps> = ({
  setCurrentPage,
  currentPage,
  totalPages,
}) => {
  const handlePreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, setCurrentPage, currentPage]);

  return (
    <div className="pagination">
      <button
        className="button contained"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="button contained"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
