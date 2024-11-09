import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import moment from "moment";

const OutLook = () => {
  const [page, setPage] = useState(1);
  const [totalMail, setTotalMail] = useState(0);
  const [showMail, setShowMail] = useState(null);
  const [showSingleMailDetials, setShowSingleMailDetials] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [filterEmailDetails, setFilterEmailDetials] = useState(null);
  const [addId, setAddId] = useState({
    read: [],
    favorite: [],
  });

  const [button, setButton] = useState([
    { id: 1, name: "Read", isActive: false },
    { id: 2, name: "Unread", isActive: false },
    { id: 3, name: "Favorite", isActive: false },
  ]);

  const getAllEmailData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}?page=${page}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await res.json();
      // console.log(data);

      setEmailData(data.list);
      setFilterEmailDetials(data.list);
      setTotalMail(data.total);
    } catch (error) {
      throw new Error(error);
    }
  };
  const getAllEmailDataById = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}?id=${1}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await res.json();
      console.log("single mail data", data);
      setShowSingleMailDetials(true);
      setShowMail(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleReadMail = (mailId) => {
    if (addId.read.includes(mailId)) {
      setAddId((prevId) => ({ ...prevId, read: [prevId] }));
    } else {
      setAddId((prevaddId) => ({
        ...prevaddId,
        read: [...prevaddId.read, ...mailId],
      }));
    }
  };

  const addMialToFavorite = (mailId) => {
    if (addId.favorite.includes(mailId)) {
      setAddId((prevId) => ({ ...prevId, favorite: [prevId] }));
    } else {
      setAddId((prevaddId) => ({
        ...prevaddId,
        favorite: [...prevaddId.favorite, ...mailId],
      }));
    }
  };

  const handleFilter = (name) => {
    switch (name) {
      case "Unread":
        const filterUnreadmail = emailData.filter(
          (mail) => !addId.read.includes(mail.id)
        );
        setFilterEmailDetials(filterUnreadmail);
        break;
      // console.log("check unread ", filterUnreadmail);
      case "Read":
        const filterReadmail = emailData.filter((mail) =>
          addId.read.includes(mail.id)
        );
        setFilterEmailDetials(filterReadmail);
        break;
      case "Favorite":
        const filterFavoritemail = emailData.filter((mail) =>
          addId.favorite.includes(mail.id)
        );
        setFilterEmailDetials(filterFavoritemail);
        break;
      default:
        break;
    }
  };
  console.log(addId);
  console.log("filter filter", filterEmailDetails);

  useEffect(() => {
    getAllEmailData();
  }, [page]);

  const extractTextFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <div>
      <div className="h-[200px] w-full flex align-middle items-center ">
        <p>Filter By:</p>
        {button.map(({ id, name, isActive }) => (
          <div key={id}>
            <button
              className="p-3 m-3 border-2 border-black rounded"
              onClick={() => handleFilter(name)}
            >
              {name}
            </button>
          </div>
        ))}
      </div>
      <div className="   mx-auto">
        {filterEmailDetails &&
          filterEmailDetails.map((items, index) => {
            const { from, date, id, short_description, subject } = items;
            return (
              <div
                key={index}
                className="w-full flex m-3 h-[120px] bg-[#ffff] border-2 border-[#CFD2DC] rounded-lg  "
                onClick={() => {
                  handleReadMail(id);
                  getAllEmailDataById(id);
                }}
              >
                <div className="p-2  flex">
                  <div>
                    <div className="w-[50px] h-[50px] bg-[#E54065] flex items-center justify-center rounded-full">
                      <p className="text-[25px] font-bold text-white">F</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex w-full">
                    <p>From :</p>

                    <p>{`${from.name} <${from.email}> `}</p>
                  </div>
                  <div className="flex w-full">
                    <p>Subject :</p>

                    <p>${subject}</p>
                  </div>
                  <div>
                    <p>{short_description}</p>
                  </div>
                  <p>{moment(date).format("DD/MM/YYYY hh:mm a")}</p>
                </div>
              </div>
            );
          })}
      </div>
      {showSingleMailDetials && (
        <div className="w-full border-2 border-[#CFD2DC] bg-[#ffff] flex  rounded-lg">
          <div className="flex items-end">
            <button
              className="bg-[#E54065] border-1 border-[#E54065] text-[white] rounded"
              onClick={() => setShowSingleMailDetials(false)}
            >
              Close
            </button>
          </div>
          <div></div>
          <div>
            <div className=" w-full flex items-center justify-between p-2 m-2">
              <h3>hello charle</h3>
              <button
                className="bg-[#E54065] border-1 border-[#E54065] text-[white] rounded"
                onClick={() => addMialToFavorite(showMail?.id)}
              >
                Mark as favorite
              </button>
            </div>

            <p>{extractTextFromHTML(showMail?.body)}</p>
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-between p-3">
        <p className="font-bold">Total: {totalMail}</p>
        <div className="w-300px flex items-center justify-center">
          <button
            className="bg-[#E54065] p-2 m-2 border-1 border-[#E54065] text-[white] rounded"
            onClick={() => setPage((prevpage) => --prevpage)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="bg-[#E54065] p-2 m-2 border-1 border-[#E54065] text-[white] rounded"
            onClick={() => setPage((prevpage) => ++prevpage)}
            disabled={page === 2}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutLook;

// background color :"#F4F5F9"
// border color :"#CFD2DC"
// filter button color :"#E1E4EA"
// text color :"#636363"
// button color :"#E54065"
// filter readback color :"#F2F2F2"
