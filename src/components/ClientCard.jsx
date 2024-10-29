export default function ClientCard({ driver, records }) {
  return (
    <div className="client-card">
      <h4 className="client-name">{driver.name}</h4>
      <h4 className="total">Total: {driver.count}</h4>
      <hr />
      <table>
        <tr>
          <th>Date</th>
          <th>Count</th>
        </tr>
        {Object.keys(records).map((date) => (
          <tr>
            <td>{date}</td>
            <td>{records[date]}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
