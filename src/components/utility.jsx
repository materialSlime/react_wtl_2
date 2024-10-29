import pocketBase from "pocketbase";
import.meta.env.REACT_APP_PB_PORT;

const port = import.meta.env.VITE_REACT_APP_PB_PORT || 8090;
const ip = import.meta.env.VITE_REACT_APP_PB_IP;
const pb = new pocketBase(`http://${ip}:${port}/`);

function formatTime(timeStr) {
  // Create a Date object from the input time string
  const date = new Date(timeStr);

  // Get hours and minutes
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  // Determine AM or PM suffix
  let suffix = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12; // Convert '0' hour to '12'

  // Format minutes to always have two digits
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time
  return `${hours}:${minutes} ${suffix}`;
}
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { month: "short" };
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { ...options, timeZone: "UTC" });
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}
function formatDate2(dateStr) {
  // yyyy-MM-dd
  const date = new Date(dateStr);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
}
function formatTime2(timeStr) {
  //  HH:mm
  const date = new Date(timeStr);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export { pb, formatTime, formatDate, formatDate2, formatTime2 };
