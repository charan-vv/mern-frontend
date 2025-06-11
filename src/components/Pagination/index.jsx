/* eslint-disable react/prop-types */
import { IoMdSkipForward as SkipNextFilled } from "react-icons/io";
import { IoMdSkipBackward as SkipPreviousFilled } from "react-icons/io";
import { GrFormNext as NextIcon } from "react-icons/gr";
import { IoIosArrowBack as BackIcon } from "react-icons/io";

import "./style.scss";

const Pagination = (props) => {
  const { label = false, customHeaderBg = "#b8ff67" } = props;
  const activeStyle = {
    backgroundColor: customHeaderBg,
  };

  const isInFirstPage = () => {
    return props?.currentPage === 1;
  };

  const isInLastPage = () => {
    if (props?.totalPages === 0) {
      return true;
    }
    return props?.currentPage === props?.totalPages;
  };

  const startPage = () => {
    // When on the first page
    if (props?.currentPage === 1) {
      return 1;
    }
    // When on the last page
    if (props?.totalPages < props?.maxVisibleButtons) {
      return 1;
    }
    if (props?.currentPage === props?.totalPages) {
      return props?.totalPages - props?.maxVisibleButtons + 1;
    }
    // When in between
    return props?.currentPage - 1;
  };

  const endPage = () => {
    if (props?.totalPages === 0) {
      return 1;
    }
    if (props?.totalPages < props?.maxVisibleButtons) {
      return props.totalPages;
    }
    return Math.min(
      startPage() + props?.maxVisibleButtons - 1,
      props?.totalPages
    );
  };

  const onClickFirstPage = () => {
    if (isInFirstPage()) {
      return false;
    }
    props?.onPageChanged(1);
  };

  const onClickPreviousPage = () => {
    if (isInFirstPage()) {
      return false;
    }
    props?.onPageChanged(props?.currentPage - 1);
  };

  const onClickPage = (page) => {
    props?.onPageChanged(page);
  };

  const onClickNextPage = () => {
    if (isInLastPage()) {
      return false;
    }
    props?.onPageChanged(props?.currentPage + 1);
  };

  const onClickLastPage = () => {
    if (isInLastPage()) {
      return false;
    }
    props?.onPageChanged(props.totalPages);
  };

  const isPageActive = (page) => {
    return props?.currentPage === page;
  };

  const onChangeRecordsPerPage = (e) => {
    props.onChangeRecordsPerPage(e);
  };

  var pages = [];
  for (let i = startPage(); i <= endPage(); i++) {
    pages.push(
      <li key={i} className="pagination-item whitespace-nowrap">
        <button
          onClick={() => {
            onClickPage(i);
          }}
          style={isPageActive(i) ? activeStyle : {}}
          className={isPageActive(i) ? "active" : ""}
        >
          {i}
        </button>
      </li>
    );
  }
  return (
    <div
      className={`custom-pagination flex w-[100%] justify-between ${props?.className}`}
    >
      <ul className="showItems">
        <li>
          <select onChange={onChangeRecordsPerPage}>
            <option value={10} key={10}>
              10
            </option>
            <option value={20} key={20}>
              20
            </option>
            <option value={50} key={50}>
              50
            </option>
            <option value={75} key={75}>
              75
            </option>
            <option value={100} key={100}>
              100
            </option>
          </select>
        </li>
        {label || ""} {label ? "per" : "Per"} page
      </ul>
      <ul className="pagination flex">
        <li className="pagination-item">
          <button
            onClick={() => onClickFirstPage()}
            className={isInFirstPage() ? "disabled" : ""}
            disabled={isInFirstPage()}
          >
            <SkipPreviousFilled />
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={() => onClickPreviousPage()}
            className={isInFirstPage() ? "disabled" : ""}
            disabled={isInFirstPage()}
          >
            <BackIcon />
          </button>
        </li>
        {pages}
        <li className="pagination-item">
          <button
            onClick={() => onClickNextPage()}
            className={isInLastPage() ? "disabled" : ""}
            disabled={isInLastPage()}
          >
            <NextIcon />
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={() => onClickLastPage()}
            className={isInLastPage() ? "disabled" : ""}
            disabled={isInLastPage()}
          >
            {" "}
            <SkipNextFilled />{" "}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
