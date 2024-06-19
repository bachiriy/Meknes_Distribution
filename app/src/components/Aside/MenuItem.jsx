import { Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";

const handlePage = (pageValue, pageLink, setPage) => {
  setPage(10);
  setTimeout(() => {
    setPage(pageValue);
  }, 1000);
  // window.location.href = pageLink;
};

export const MenuItem = ({
  pageValue,
  pageLink,
  tooltip,
  icon,
  page,
  setPage,
}) => (
  <div
    onClick={() => handlePage(pageValue, pageLink, setPage)}
    className={`h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white ${
      page === pageValue ? "text-white" : "text-neutral-600"
    }`}
  >
    {" "}
    <Link to={pageLink}>
      <Tooltip
        content={tooltip}
        placement="right"
        animation="duration-500"
        className="text-center"
      >
        {icon}
      </Tooltip>
    </Link>
  </div>
);
