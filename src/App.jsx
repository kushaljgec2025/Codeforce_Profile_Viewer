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
  const [isLoading, setIsLoading] = useState(false);

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
  const handleSubmit = async (e, user_name) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(user_name);

    const userInfoPromise = user_info(user_name);
    const userInfo = await userInfoPromise;
    console.log(userInfo);
    setUser_array(userInfo.result[0]);
    const rating_info = user_rating(user_name);
    const rating = await rating_info;
    console.log(rating);
    setRating_array(rating);
    setIsLoading(false);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e, user)}
        className="form flex justify-center items-center gap-5  max-w-[80vw] m-auto"
      >
        <input
          type="text"
          value={user || ""}
          onChange={(e) => setUser(e.target.value)}
          className="text-gray-700 bg-slate-100 text-xl p-4 rounded-lg w-[50vw]   "
          placeholder="User_name"
        />

        <button type="submit" className="bg-gray-600 p-5 rounded-full ">
          <FaSearch className="text-3xl " />
        </button>
      </form>
      <Message />
      {isLoading && (
        <button
          type="button"
          class="bg-slate-500 flex p-4 rounded-md items-center justify-center gap-2 text-white font-semibold w-40 h-12 m-4 "
          disabled
        >
          <div className="mx-2">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 m-auto"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <div>Loading...</div>
        </button>
      )}
      {!isLoading && (
        <div className="flex justify-center m-4  lg:w-[80vw] ">
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
              <div className="flex flex-col  justify-center items-center ">
                <div className="maxrating  my-3 w-full bg-slate-200 p-6 rounded-lg max-w-[80vw] space-y-2">
                  <span className="text-slate-600 font-semibold">
                    Current Rank
                  </span>
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
                <div className="maxrating my-3 w-full bg-zinc-200 p-6 rounded-lg max-w-[80vw] space-y-2">
                  <span className="font-semibold text-orange-500 ">
                    Maximum Rank
                  </span>
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
                    <span className="font-semibold ">
                      {user_arry?.maxRating}
                    </span>
                  </p>
                </div>
              </div>

              <div className="col-span-2">
                <Rating rating_info={rating_array} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
