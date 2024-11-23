import React, { useState, useEffect } from "react";
import Modal from "../components/ModalCase";
import MiniGrid from "../components/MiniGrid.js"
import "bootstrap/dist/css/bootstrap.min.css";
import UsagiVideo from '../assets/usagi3.mp4';
function Detail() {
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

            <MiniGrid
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

            <video
                autoPlay
                loop
                muted
                style={{
                    display: 'block',
                    margin: '20px auto',
                    maxWidth: '500px',
                    border: '2px solid #FFD9E3',
                    borderRadius: '10px',
                }}
            >
                <source src={UsagiVideo} type="video/mp4" />
                동영상이 지원되지 않는 브라우저입니다.
            </video>
        </div>
        
    );
}

export default Detail;
