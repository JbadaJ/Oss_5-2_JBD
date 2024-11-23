import React, { useState, useEffect } from "react";

function Modal({ data, onSave, onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        writer: "",
        artist: "",
        website: "",
        episodes: "",
        views: "",
        genre: "",
        age: "",
    });

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="form-container" style={containerStyle}>
            <h2 style={{ color: "blue", fontSize: "2rem", marginBottom: "20px" }}>
                {data ? "정보 수정" : "정보 생성"}
            </h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key} style={{ marginBottom: "15px" }}>
                        <label
                            htmlFor={key}
                            style={{ fontSize: "1.5rem", color: "blue" }}
                        >
                            {key}
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "1rem",
                                marginTop: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        fontSize: "1rem",
                        color: "#fff",
                        backgroundColor: "blue",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    저장
                </button>
            </form>
        </div>
    );
}

// Custom styles for the container
const containerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
};

export default Modal;
