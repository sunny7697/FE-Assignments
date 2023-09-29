import styled from '@emotion/styled';

const StyledPagination = styled.div`
  .pagination-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination-button {
    padding: 8px 16px;
    background-color: var(--blue3);
    color: var(--white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 4px;
  }

  .pagination-button:hover {
    background-color: var(--purple);
  }

  .pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .page-select {
    padding: 8px;
    width: 70px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 4px;
    appearance: none;
    background-size: 16px;
  }

  .page-select-div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .total-pages-label {
    margin: 0 8px;
  }

  @media (min-width: 500px) {
    .page-select-div {
      flex-direction: row;
      gap: 0rem;
    }
  }
`;

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: Function;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: IPaginationProps) => {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSelectChange = (event: any) => {
    const selectedPage = parseInt(event.target.value, 10);
    setCurrentPage(selectedPage);
  };

  const renderPageOptions = () => {
    const options = [];

    for (let i = 1; i <= totalPages; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleFirstClick = () => {
    handlePageChange(1);
  };

  const handleLastClick = () => {
    handlePageChange(totalPages);
  };

  return (
    <StyledPagination>
      <div className='pagination-container'>
        <button
          className='pagination-button'
          onClick={handleFirstClick}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className='pagination-button'
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className='page-select-div'>
          <select
            className='page-select'
            value={currentPage}
            onChange={handleSelectChange}
          >
            {renderPageOptions()}
          </select>
          <span className='total-pages-label'>of {totalPages}</span>
        </div>
        <button
          className='pagination-button'
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className='pagination-button'
          onClick={handleLastClick}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </StyledPagination>
  );
};

export default Pagination;
