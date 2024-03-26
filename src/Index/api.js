const api_key = "b582eabfe83fbdbc70f9703eede1ec5ea96a2d4b";

const user_info = async (user_name) => {

    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${user_name}&checkHistoricHandles=false`);

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching user information:', error.message);
        throw error;
    }
}

export { user_info };
