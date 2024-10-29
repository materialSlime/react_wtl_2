import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import ClientCard from "./ClientCard";
import { pb, formatDate } from "./utility";

export default function Clients() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let users = await pb.collection("users").getFullList();
      let tankerRecord = await pb.collection("tanker_logs").getFullList();
      let clients = users.map((item) => ({
        id: item.id,
        name: item.name,
        balance: item.balance,
        count: item.tanker_count,
        records: tankerRecord.filter((record) => record.client === item.id),
      }));
      setDrivers(clients);
      console.log("Data fetched:", clients);
    };
    fetchData();
  }, []);

  const ClientsCards = drivers.map((driver) => {
    let dateCount = {};
    driver.records.forEach((d) => {
      let date = formatDate(d.date_time);
      dateCount[date] = (dateCount[date] || 0) + 1;
    });
    if (driver.records.length > 0) {
      return <ClientCard key={nanoid()} driver={driver} records={dateCount} />;
    }
  });

  return <div className="clients-container">{ClientsCards}</div>;
}
