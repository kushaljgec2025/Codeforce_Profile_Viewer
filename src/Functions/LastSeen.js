export const lastseen = (time) => {
    const unixTimestamp = time;

    // Convert Unix timestamp to milliseconds
    const milliseconds = unixTimestamp * 1000;

    // Create a new Date object with the milliseconds
    const dateObject = new Date(milliseconds);

    // Get hours and minutes
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    // Format the time
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Construct the final string
    const finalString = `last online at ${formattedTime}`;
    return finalString;
}