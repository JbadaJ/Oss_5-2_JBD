import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UsagiGif from '../assets/usagi4.gif';

function Update() {
    const [data, setData] = useState([]);
    const [updateCount, setUpdateCount] = useState(0); // 수정 횟수 상태 추가

    // Fetch data from API
    useEffect(() => {
        fetch("https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleInputChange = (id, key, value) => {
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, [key]: value } : item
        );

        setData(updatedData);

        // 서버에 즉시 반영 (PUT 요청)
        const updatedItem = updatedData.find((item) => item.id === id);
        fetch(`https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
        })
            .then(() => setUpdateCount((prev) => prev + 1)) // 수정 횟수 증가
            .catch((error) => console.error("Error updating data:", error));
    };

    const handleDelete = (id) => {
        fetch(`https://67296b8f6d5fa4901b6d1461.mockapi.io/my_data/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setData(data.filter((item) => item.id !== id));
            })
            .catch((error) => console.error("Error deleting data:", error));
    };

    return (
        <div className="container mt-4">
            {/* 총 데이터 개수 및 수정 횟수 표시 */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h2>총 데이터 개수: {data.length}</h2>
                <h2>총 수정 횟수: {updateCount}</h2>
            </div>

            {/* 데이터 테이블 */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Artist</th>
                        <th>Website</th>
                        <th>Episodes</th>
                        <th>Views</th>
                        <th>Genre</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {Object.keys(item)
                                .filter((key) => key !== "id")
                                .slice(0, 8) // 요소를 8개로 제한
                                .map((key) => (
                                    <td key={key}>
                                        <input
                                            type="text"
                                            value={item[key]}
                                            onChange={(e) =>
                                                handleInputChange(item.id, key, e.target.value)
                                            }
                                            style={{
                                                width: "100%",
                                                padding: "5px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                            }}
                                        />
                                    </td>
                                ))}
                            {/* 삭제 버튼 */}
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 중앙 정렬된 이미지 */}
            <img
                src={UsagiGif}
                alt="Usagi Animation"
                style={{
                    width: '500px',
                    height: 'auto',
                    borderRadius: '10px',
                    border: '2px solid pink',
                    display: 'block',
                    margin: 'auto',
                }}
            />
        </div>
    );
}

export default Update;
