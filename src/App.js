import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import List from './pages/list'; 
import Update from './pages/Update';
import Blank from './pages/Blank'; 
import Footer from './components/Footer';
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetch("https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleSave = (newData) => {
    if (selectedData) {
      // Update existing data
      fetch(`https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data/${selectedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((updatedData) => {
          setData(
            data.map((item) =>
              item.id === updatedData.id ? updatedData : item
            )
          );
        });
    } else {
      // Create new data
      fetch("https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((createdData) => {
          setData([...data, createdData]);
        });
    }
  };

  return (
    <Router>
      <div className="usagi">
        <Header />
        <Routes>
          <Route path="/" element={<Blank />} /> 
          <Route
            path="/Detail"
            element={
              <Detail
                data={data}
                onEdit={setSelectedData}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            path="/List"
            element={<List data={data} onSave={handleSave} />}
          />
          <Route path="/Update" element={<Update />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
