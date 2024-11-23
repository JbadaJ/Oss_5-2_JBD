import React, { useState } from 'react';
import UsagiVideo from '../assets/usagi2.mp4';

function List({ data = [], onSave }) { // data의 기본값을 빈 배열로 설정
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

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 저장 핸들러
    const handleSave = (e) => {
        e.preventDefault();
        onSave(formData); 
        setFormData({
            title: "",
            writer: "",
            artist: "",
            website: "",
            episodes: "",
            views: "",
            genre: "",
            age: "",
        });
    };

    return (
        <div>
            <h1>정보 추가</h1>
            <p>정보를 입력하고 저장 버튼을 누르세요.</p>
            <form onSubmit={handleSave} style={{ marginBottom: "20px" }}>
                {Object.keys(formData).map((key) => (
                    <div key={key} style={{ marginBottom: "10px" }}>
                        <label
                            htmlFor={key}
                            style={{ display: "block", fontSize: "1.2rem", fontWeight: "bold" }}
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
                                padding: "8px",
                                fontSize: "1rem",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">
                    저장
                </button>
            </form>
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

export default List;
