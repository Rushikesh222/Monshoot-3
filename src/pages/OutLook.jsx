import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import moment from "moment";
import { list } from "postcss";
import Footer from "../component/Footer";
import EmailBody from "../component/EmailBody";

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
      setEmailData(data.list);
      setFilterEmailDetials(data.list);
      setTotalMail(data.total);
    } catch (error) {
      throw new Error(error);
    }
  };
  const getAllEmailDataById = async (id, fromname, formdate) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}?id=${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await res.json();

      setShowSingleMailDetials(true);
      setShowMail({ ...data, name: fromname, date: formdate });
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
    const buttonActive = button.map((list) =>
      list.name === name
        ? { ...list, isActive: true }
        : { ...list, isActive: false }
    );
    setButton(buttonActive);

    switch (name) {
      case "Unread":
        const filterUnreadmail = emailData.filter(
          (mail) => !addId.read.includes(mail.id)
        );
        setFilterEmailDetials(filterUnreadmail);
        break;
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
      case "Clear":
        setFilterEmailDetials(emailData);
        break;

      default:
        break;
    }
  };

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
      <div className="h-[100px] w-full flex align-middle item-center justify-between px-5 py-0  flex-wrap">
        <div className="flex items-center ">
          <p className="font-semibold ">Filter By:</p>
          {button.map(({ id, name, isActive }) => (
            <div key={id}>
              <button
                className={
                  isActive
                    ? `text-[#636363] font-semibold  border-2 border-[#CFD2DC] bg-[#E1E4EA] rounded-[20px] h-[40px] w-[70px]`
                    : ` h-[40px] w-[70px] font-semibold`
                }
                onClick={() => handleFilter(name)}
              >
                {name}
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center ">
          <button
            onClick={() => handleFilter("Clear")}
            className="bg-[#E54065] border-1 w-[80px] text-center font-semibold h-[30px] rounded-[20px] border-[#E54065] text-[white]"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex w-full">
        <div
          className={showSingleMailDetials ? `lg:w-[40%]` : ` lg:w-full mx-2`}
        >
          {filterEmailDetails &&
            filterEmailDetails.map((items, index) => {
              const { from, date, id, short_description, subject } = items;
              return (
                <div
                  key={index}
                  className={
                    addId.read.includes(id)
                      ? " flex m-3 h-fit  bg-[#ffff] border-2 border-[#CFD2DC] rounded-lg hover:cursor-pointer "
                      : " flex m-3 h-fit  bg-[#E1E4EA] border-2 border-[#CFD2DC] rounded-lg hover:cursor-pointer "
                  }
                  onClick={() => {
                    handleReadMail(id);
                    getAllEmailDataById(id, from.name, date);
                  }}
                >
                  <div className="flex gap-4 py-2">
                    <div className="py-2 pl-4  flex">
                      <div>
                        <div className="w-[50px] h-[50px] bg-[#E54065]  flex items-center justify-center rounded-full">
                          <p className="text-[25px] font-bold text-white">F</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex w-full">
                        <p>From:</p>

                        <p className="text-[#636363] font-semibold">{`${from.name} <${from.email}> `}</p>
                      </div>
                      <div className="flex w-full">
                        <p>Subject:</p>

                        <p className="text-[#636363] font-semibold">
                          {subject}
                        </p>
                      </div>
                      <div>
                        <p
                          className={
                            showSingleMailDetials
                              ? `truncate py-3 max-w-[300px]`
                              : `w-100 py-3`
                          }
                        >
                          {short_description}
                        </p>
                      </div>
                      <div className="w-full flex justify-between">
                        <p>{moment(date).format("DD/MM/YYYY hh:mm a")}</p>
                        {addId.favorite.includes(id) && (
                          <p className=" font-semibold text-[15px] text-[#E54065]">
                            Favorite
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className="w-[60%]"
          style={{ display: showSingleMailDetials ? "flex" : "none" }}
        >
          {showSingleMailDetials && (
            <EmailBody
              setShowSingleMailDetials={setShowSingleMailDetials}
              showMail={showMail}
              addMialToFavorite={addMialToFavorite}
              addId={addId}
            />
          )}
        </div>
      </div>
      <div className="">
        <Footer page={page} setPage={setPage} totalMail={totalMail} />
      </div>
    </div>
  );
};

export default OutLook;
