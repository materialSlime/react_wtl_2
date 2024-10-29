import { formatDate, formatTime } from "./utility";
import { pb } from "./utility";

const tankerPrice = 70;

function deleteRecord(event, eff, tT) {
  pb.collection("tanker_logs")
    .delete(event.target.value)
    .then(() => {
      console.log("deleted");
      if (tT === "entry") {
        eff();
      } else {
        eff((prev) => {
          return prev.filter((item) => event.target.value !== item.id);
        });
      }
    });
  let client_id = event.target.getAttribute("client");
  pb.collection("users")
    .getOne(client_id)
    .then((data) => {
      pb.collection("users").update(data.id, {
        balance: data.balance - tankerPrice,
        tanker_count: data.tanker_count - 1,
      });
    });
}

export default function Table({ tableType, showDate, records, effect }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time</th>
          {showDate == 2 && <th>Date</th>}
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {records.map((log) => (
          <tr key={log.id}>
            <td>{log.name}</td>
            <td>{formatTime(log.date_time)}</td>
            {showDate == 2 && <td>{formatDate(log.date_time)}</td>}
            <td>
              <button
                className="delete-btn"
                client={log.client}
                value={log.id}
                onClick={(e) => deleteRecord(e, effect, tableType)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
