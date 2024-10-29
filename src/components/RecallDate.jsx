import { useState } from "react";
import { pb } from "./utility";
import Table from "./Table";

async function getLogs(start, end) {
  let res = await pb.collection("tanker_logs").getList(1, 1000, {
    filter: `(date_time >= "${start} 00:00:00.000Z") && (date_time <= "${end} 23:59:59.999Z" )`,
  });
  return res.items;
}
async function getByDate(event, set) {
  event.preventDefault();
  let date = event.target.children[1].value;
  set(await getLogs(date, date));
}
async function getByDateRange(event, set) {
  event.preventDefault();
  let start = event.target.children[1].value;
  let end = event.target.children[3].value;
  set(await getLogs(start, end));
}

export default function RecallDate() {
  const [show, setShow] = useState(0);
  const [logs, setLogs] = useState([]);

  return (
    <>
      <div className="form-container">
        <h1 className="title">Search Records</h1>
        <h2>Search by specific date</h2>
        <form
          onSubmit={(event) => {
            getByDate(event, setLogs);
            setShow(1);
          }}
        >
          <label htmlFor="date">Enter a date:</label>
          <input type="date" id="date" name="date" required />
          <button className="submit-btn">Submit</button>
        </form>
        <h2>Search by date range</h2>
        <form
          onSubmit={(event) => {
            getByDateRange(event, setLogs);
            setShow(2);
          }}
        >
          <label htmlFor="start-date">Enter start date:</label>
          <input type="date" id="start-date" name="start-date" required />
          <label htmlFor="end-date">Enter end date:</label>
          <input type="date" id="end-date" name="end-date" required />
          <button className="submit-btn">Submit</button>
        </form>
      </div>
      {!show ? null : (
        <div className="table-container">
          <h1>Query Results</h1>
          <Table
            tableType="recalls"
            records={logs}
            showDate={show}
            effect={setLogs}
          />
        </div>
      )}
    </>
  );
}
