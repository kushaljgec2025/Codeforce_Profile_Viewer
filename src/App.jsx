import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { user_info } from "./Index/api.js";
import { lastseen } from "./Functions/LastSeen.js";
import { FaSearch } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import Rating from "./Components/Rating";
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const [user_arry, setUser_array] = useState();
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
  };

  return (
    <>
      <div className="flex justify-center gap-5  w-full">
        <input
          type="text"
          value={user || ""}
          onChange={(e) => setUser(e.target.value)}
          className="text-gray-700 text-xl p-4 rounded-lg w-[40vw]  "
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
      <div className="flex justify-center m-4">
        {user_arry && (
          <div className="dashboard w-[90vw] bg-slate-600 p-6 rounded-3xl grid grid-cols-2  ">
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
              <div>
                <div className="flex gap-4 mt-4">
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

              <p className="text-3 font-bold bg-slate-700 p-3 rounded-lg ">
                {user_arry?.city + " , " + user_arry?.country}
              </p>
              <h1 className="text-3 font-bol">
                Organization :{" "}
                <span className="font-thin"> {user_arry?.organization}</span>
              </h1>
            </div>
            <div className="maxrating my-3">
              <h1 className="text-xl">Current Rank</h1>
              <h1
                className={`font-semibold p-3 text-xl rounded-lg ${
                  user_rating_color[user_arry?.rank]
                }`}
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
            <div className="maxrating my-3 bg-slate-200 p-6 rounded-lg">
              <h1
                className={`font-semibold p-3 text-xl rounded-lg  ${
                  user_rating_color[user_arry?.maxRank]
                } `}
              >
                {user_arry?.maxRank}
              </h1>
              <p
                className={`text-3 font-bold my-4 bg-slate-700  p-2 rounded-md`}
              >
                Maximum Rating :{" "}
                <span className="font-semibold ">{user_arry?.maxRating}</span>
              </p>
            </div>
            <div className="col-span-2">
              <Rating />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
