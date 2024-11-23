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
        <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {data ? "정보 수정" : "정보 생성"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {Object.keys(formData).map((key) => (
                                <div key={key} className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor={key}
                                        style={{ fontSize: "1.5rem" ,color:"blue"}}
                                    >
                                        {key}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={key}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                저장
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
