import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useJobsCotext } from "../pages/AllJobs";
import customFetch from "../utils/customFetch";

const PageBtnContainer = () => {
  const {
    data: { numberOfPages, page },
  } = useJobsCotext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  console.log(search, pathname);

  const handlePageChange = async (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams}`);
  };

  function addPageButton({ pageNumber, activeClass }) {
    return (
      <button
        onClick={() => handlePageChange(pageNumber)}
        key={pageNumber}
        className={`btn page-btn ${activeClass && "active"}`}
      >
        {pageNumber}
      </button>
    );
  }

  const renderPageButton = () => {
    const pageButtons = [];
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    if (page !== 1 && page !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: page - 1,
          activeClass: false,
        })
      );
    }

    if (page > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      );
    }

    if (page !== 1 && page !== numberOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: page,
          activeClass: true,
        })
      );
    }

    if (page !== numberOfPages && page !== numberOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: page + 1,
          activeClass: false,
        })
      );
    }

    if (page < numberOfPages - 2) {
      pageButtons.push(
        <span className=" page-btn dots" key="dots+1">
          ....
        </span>
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numberOfPages,
        activeClass: page === numberOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = page;
          handlePageChange(prevPage);
        }}
        className="btn prev-btn"
        disabled={page <= 1}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButton()}</div>
      <button
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage > numberOfPages) nextPage = numberOfPages;
          handlePageChange(nextPage);
        }}
        className="btn next-btn"
        disabled={page === numberOfPages}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
