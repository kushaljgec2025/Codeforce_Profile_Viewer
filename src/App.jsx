import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { lastseen } from "./Functions/LastSeen.js";
import { FaSearch } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import Rating from "./Components/Rating";
import { user_rating, user_info, Message } from "./Index/api.jsx";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const [user_arry, setUser_array] = useState();
  const [rating_array, setRating_array] = useState();

  const user_rating_color = {
    newbie: "bg-gray-400",
    pupil: "bg-green-400",
    specialist: "bg-teal-400",
    expert: "bg-indigo-600",
    "candidate master": "bg-purple-600",
    master: "bg-orange-400",
    "international master": "bg-orange-600",
    " grandmaster": "bg-red-400",
    "international grandmaster": "bg-red-600",
    "legendary grandmaster": "bg-red-900",
  };
  const handleSubmit = async (user_name) => {
    console.log(user_name);

    const userInfoPromise = user_info(user_name);
    const userInfo = await userInfoPromise;
    console.log(userInfo);
    setUser_array(userInfo.result[0]);
    const rating_info = user_rating(user_name);
    const rating = await rating_info;
    console.log(rating);
    setRating_array(rating);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-5  max-w-[80vw] m-auto">
        <input
          type="text"
          value={user || ""}
          onChange={(e) => setUser(e.target.value)}
          className="text-gray-700 text-xl p-4 rounded-lg w-[50vw]   "
          placeholder="User_name"
        />

        <button
          type="submit"
          className="bg-gray-600 p-5 rounded-full "
          onClick={() => handleSubmit(user)}
        >
          <FaSearch className="text-3xl " />
        </button>
      </div>
      <Message />
      <div className="flex justify-center m-4  max-w-[80vw]">
        {user_arry && (
          <div className="dashboard w-[90vw] bg-slate-600 p-6 rounded-3xl flex lg:justify-evenly justify-center items-center flex-wrap">
            <div className="flex flex-col justify-center row-span-2 items-center grid-flow-col">
              <img
                src={user_arry?.titlePhoto}
                alt="avatar"
                className="rounded-full w-40 h-40 m-2 ring-4 ring-sky-400"
              />
              <span>
                {"Last Seen: " +
                  lastseen(user_arry?.lastOnlineTimeSeconds).split(" ")[3]}
              </span>
              <h1 className="text-3xl font-bold">
                {user_arry?.firstName + " "}
                {user_arry?.lastName}
              </h1>
              <div className="mt-4">
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                  <div className="flex items-center">
                    <FaHandsHelping className="text-xl" />
                    <span className="ml-2">
                      Contributions: {user_arry.contribution}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <IoPeopleSharp className="text-xl" />

                    <span className="ml-2">
                      Friends: {user_arry.friendOfCount}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-3 font-bold bg-slate-700 p-3 rounded-lg  mt-4">
                {user_arry?.city + " , " + user_arry?.country}
              </p>
              <h1 className="text-3 font-bol mt-4">
                Organization :{" "}
                <span className="font-thin"> {user_arry?.organization}</span>
              </h1>
            </div>
            <div className="flex flex-col  justify-center items-center">
              <div className="maxrating my-3 ">
                <h1 className="text-xl">Current Rank</h1>
                <h1
                  className={`font-semibold p-3 text-xl rounded-lg ${
                    user_rating_color[user_arry?.rank]
                  }  `}
                >
                  {user_arry?.rank}
                </h1>
                <p
                  className={`text-3 font-bold my-4 bg-slate-700 ring-white ring-2 ring-${
                    user_rating_color[user_arry?.rank]
                  } p-2 rounded-md`}
                >
                  Current Rating :{" "}
                  <span className="font-semibold ">{user_arry?.rating}</span>
                </p>
              </div>
              <div className="maxrating my-3 bg-slate-200 p-6 rounded-lg max-w-[80vw]">
                <h1
                  className={`font-semibold p-3 text-xl rounded-lg  ${
                    user_rating_color[user_arry?.maxRank]
                  } max-w-[80vw]`}
                >
                  {user_arry?.maxRank}
                </h1>
                <p
                  className={`text-3 font-bold my-4 bg-slate-700  p-2 rounded-md max-w-[80vw]`}
                >
                  Maximum Rating :{" "}
                  <span className="font-semibold ">{user_arry?.maxRating}</span>
                </p>
              </div>
            </div>

            <div className="col-span-2">
              <Rating rating_info={rating_array} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
