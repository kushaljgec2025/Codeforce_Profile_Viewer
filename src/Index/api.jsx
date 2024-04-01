import { ToastContainer, toast } from "react-toastify";

const api_key = "b582eabfe83fbdbc70f9703eede1ec5ea96a2d4b";

const user_info = async (user_name) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${user_name}&checkHistoricHandles=false`
    );

    if (!response.ok) {
      toast.error("User not found");
      throw new Error("Failed to fetch user information");
    }
    toast.success("User found successfully");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user information:", error.message);
    throw error;
  }
};

const user_rating = async (user_name) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.rating?handle=${user_name}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user information:", error.message);
    throw error;
  }
};

export function Message() {
  return (
    <div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export { user_info, user_rating };
