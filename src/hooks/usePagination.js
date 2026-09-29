import { useState, useMemo } from 'react';

export const DOTS = '...';

export const usePagination = ({
  totalPages,
  initialPage = 1,
  siblingCount = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    // Case 1: small number of pages → show all
    if (totalPageNumbers >= totalPages) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    // Case 2: only right dots
    if (!showLeftDots && showRightDots) {
      const leftRange = [...Array(3 + siblingCount)].map((_, i) => i + 1);
      return [...leftRange, DOTS, lastPage];
    }

    // Case 3: only left dots
    if (showLeftDots && !showRightDots) {
      const start = lastPage - (2 + siblingCount);
      const rightRange = [...Array(3 + siblingCount)].map((_, i) => start + i);
      return [firstPage, DOTS, ...rightRange];
    }

    // Case 4: both dots
    const middleRange = [...Array(rightSibling - leftSibling + 1)].map(
      (_, i) => leftSibling + i
    );
    return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
  }, [currentPage, totalPages, siblingCount]);

  return {
    currentPage,
    setCurrentPage,
    paginationRange,
    goToPage,
    nextPage,
    prevPage,
    totalPages,
  };
};
