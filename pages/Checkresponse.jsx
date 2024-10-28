// pages/fetchData.js

import { useEffect, useState } from "react";

export default function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getResponse"); // Adjust this to your actual endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Check if any data was returned
        if (result.length > 0) {
          setData(result.reverse()); // Set the entire array of data
        } else {
          setError("No data found.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-fit py-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Fetched Data</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg shadow-lg bg-black mb-4">
            <h2 className="font-semibold">Name: {item.data.name}</h2>
            <p>Email: {item.data.email}</p>
            <p>Purpose: {item.data.purpose}</p>
            <p>Message: {item.data.message}</p>
          </div>
        ))
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}
