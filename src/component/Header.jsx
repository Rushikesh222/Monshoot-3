import React from "react";

const Header = ({}) => {
  return (
    <>
      <div className="w-full  h-[150px] fixed border-2 border-green-600">
        <div className="h-full flex items-end justify-start w-[800px] ">
          <div className="w-full h-[40px] mx-2 ml-[30px] mb-3  py-2 border-2 border-red-600">
            <div className="flex w-full">
              <p>Filter By:</p>
              <div className="flex gap-2 ml-3">
                {" "}
                <button>Unread</button>
                <button>Read</button>
                <button>Favaorite</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
