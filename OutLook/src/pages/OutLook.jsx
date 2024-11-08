import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import moment from "moment";

const OutLook = () => {
  const [page, setPage] = useState(1);
  const [emailData, setEmailData] = useState(null);

  const getAllEmailData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}?page=${page}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await res.json();
      console.log(data);

      setEmailData(data.list);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getAllEmailData();
  }, []);

  console.log(emailData);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="max-w-[1200px] mx-auto">
        {emailData &&
          emailData.map((items, index) => {
            const { from, date, id, short_description, subject } = items;
            const formattedDate = moment(date).format("DD/MM/YYYY", "LT");
            return (
              <div
                key={index}
                className="w-[800px] m-3 h-[200px] bg-[#ffff] border-2 border-[#CFD2DC]  "
              >
                <div className="p-2">
                  <div>
                    <img src="" className="" />
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
    </div>
  );
};

export default OutLook;
