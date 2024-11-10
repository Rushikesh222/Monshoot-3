import React from "react";

const Footer = ({ page, setPage, totalMail }) => {
  return (
    <div className="w-full flex items-center justify-between p-3">
      <p className="font-bold pl-3">
        Total: {totalMail} Number of Page: {page}
      </p>
      <div className="w-300px flex items-center justify-center">
        <button
          className="bg-[#E54065] w-[60px] p-2 m-2 border-1 border-[#E54065] text-[white] rounded"
          onClick={() => setPage((prevpage) => --prevpage)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="bg-[#E54065] w-[60px] p-2 m-2 border-1 border-[#E54065] text-[white] rounded"
          onClick={() => setPage((prevpage) => ++prevpage)}
          disabled={page === 2}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Footer;
