import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Modal from "../components/ModalCase";
import "bootstrap/dist/css/bootstrap.min.css";
import UsagiGif from '../assets/usagi4.gif';
function Update() {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            // Update
            fetch(
                `https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data/${selectedData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                }
            )
                .then((response) => response.json())
                .then((updatedData) => {
                    setData(
                        data.map((item) =>
                            item.id === updatedData.id ? updatedData : item
                        )
                    );
                    setIsModalOpen(false);
                });
        } else {
            // Create
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
                    setIsModalOpen(false);
                });
        }
    };

    return (
        <div className="container mt-4">

            <Grid
                data={data}
                onEdit={(item) => {
                    setSelectedData(item);
                    setIsModalOpen(true);
                }}
                onDelete={handleDelete}
            />
            {isModalOpen && (
                <Modal
                    data={selectedData}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <img 
                src={UsagiGif} 
                alt="Usagi Animation" 
                style={{
                    width: '500px',
                    height: 'auto',
                    borderRadius: '10px',
                    border: '2px solid pink',
                    display: 'block', // 중앙 정렬
                    margin: 'auto' // 상하좌우 여백을 자동으로 설정
                }} 
            />
        </div>
    );
}

export default Update;
