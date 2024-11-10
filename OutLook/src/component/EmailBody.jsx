import moment from "moment";
import React from "react";

const EmailBody = ({
  setShowSingleMailDetials,
  addId,
  showMail,
  addMialToFavorite,
}) => {
  const extractTextFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="m-4 border-2 border-[#CFD2DC] bg-[#ffff] flex  h-max rounded-lg">
      <div className="m-[40px]">
        <div className="flex items-end relative">
          <button
            className="absolute top-[-20] w-9 h-9 right-[-35px] hover:cursor-pointer  flex items-center justify-center bg-[#E54065] border-1 border-[#E54065] text-[white] rounded-full"
            onClick={() => setShowSingleMailDetials(false)}
          >
            <span className="font-bold text-[10px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </span>
          </button>
        </div>
        <div className="flex">
          <div className="flex items-center justify-center px-4 pt-6  h-full">
            <div className="w-[50px] h-[50px] bg-[#E54065] flex items-center justify-center rounded-full">
              <p className="text-[25px] font-bold text-white">F</p>
            </div>
          </div>

          <div>
            <div className=" w-full flex items-center justify-between py-2 m-2">
              <div className="p-0">
                <h1 className="text-[40px] font-semibold">{showMail?.name}</h1>
              </div>
              <div>
                <button
                  className="bg-[#E54065] border-1 w-[160px] text-center font-semibold h-[30px] rounded-[20px] border-[#E54065] text-[white] "
                  onClick={() => addMialToFavorite(showMail?.id)}
                >
                  {addId.favorite.includes(showMail?.id)
                    ? "Unmark as favorite"
                    : "Mark as favorite"}
                </button>
              </div>
            </div>
            <div className="pb-8">
              <p>{moment(showMail?.date).format("DD/MM/YYYY hh:mm a")}</p>
            </div>
            <p className="text-ellipsis">
              {extractTextFromHTML(showMail?.body)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBody;
