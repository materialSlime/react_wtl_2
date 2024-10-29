import { useState, useEffect } from "react";
import { pb, formatDate2, formatTime2 } from "./utility";
import Table from "./Table";

const tankerPrice = 70;

function getClients(set) {
  console.log("getting clients list");
  pb.collection("users")
    .getFullList({
      sort: "-created",
    })
    .then((data) => {
      set(data);
    });
}
function getLastRecords(set, set2) {
  console.log("getting last logs");
  pb.collection("tanker_logs")
    .getList(1, 3, {
      sort: "-created",
    })
    .then((data) => {
      // console.log(data.items);
      set(data.items);
      if (data.items.length > 0) {
        set2((prev) => ({
          ...prev,
          time: formatTime2(data.items[0].date_time),
          date: formatDate2(data.items[0].date_time),
        }));
      }
    });
}
function updateRecords(event, set, newLog) {
  event.preventDefault();
  let data = {
    name: newLog.name,
    client: newLog.id,
    date_time: `${newLog.date} ${newLog.time}:00.000Z`,
  };
  console.log(data);
  pb.collection("tanker_logs")
    .create(data)
    .then(() => {
      console.log("submitted");
      getLastRecords(set);
    })
    .catch((err) => {
      console.log(err);
    });

  pb.collection("users")
    .getFirstListItem(`id="${newLog.id}"`)
    .then((data) => {
      pb.collection("users")
        .update(newLog.id, {
          balance: data.balance + tankerPrice,
          tanker_count: data.tanker_count + 1,
        })
        .then(() => {
          console.log("updated");
        });
    });
}

export default function Entry({}) {
  const [clients, setClients] = useState([]);
  const [lastLogs, setLastLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    date: "",
    time: "",
    name: "",
    id: "",
  });

  useEffect(() => {
    getLastRecords(setLastLogs, setNewLog);
    getClients(setClients);
  }, []);

  function handleChange(event) {
    if (event.target.name === "name") {
      let clientName = Array.from(event.target.options).find(
        (o) => o.value === event.target.value
      ).text;
      setNewLog((prev) => ({
        ...prev,
        ["id"]: event.target.value,
        ["name"]: clientName,
      }));
    } else {
      setNewLog((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }
  return (
    <>
      <div className="form-container">
        <h1 className="title">Input Record Entry</h1>
        <form onSubmit={(e) => updateRecords(e, setLastLogs, newLog)}>
          <label htmlFor="name">Name: </label>
          <select onChange={handleChange} required name="name" id="name">
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <label htmlFor="date">Date: </label>
          <input
            onChange={handleChange}
            required
            type="date"
            name="date"
            id="date"
            value={newLog.date}
          ></input>
          <label htmlFor="time">Time:</label>
          <input
            onChange={handleChange}
            required
            type="time"
            name="time"
            id="time"
            value={newLog.time}
          />
          <button className="submit-btn" name="submit">
            Submit
          </button>
        </form>
      </div>
      {lastLogs.length > 0 && (
        <div className="table-container">
          <h1>Last Logs</h1>
          <Table
            tableType="entry"
            showDate={2}
            records={lastLogs}
            effect={() => getLastRecords(setLastLogs, setNewLog)}
          />
        </div>
      )}
    </>
  );
}
