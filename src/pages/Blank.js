import React from 'react';
import UsagiImage from '../assets/usagi1.webp'; 

function Blank() {
    return (
        <div>
            <h1>페이지 설명</h1>
            <p>Main: 페이지별 간단한 설명.</p>
            <p>Add: 원하는 정보 추가.</p>
            <p>List: 정보를 리스트형태로 확인(수정 불가).</p>
            <p>Update: 정보를 수정 및 삭제.</p>

            
            <img
                src={UsagiImage} 
                alt="Usagi"
                className="usagi-image"
                style={{
                    display: 'block',
                    margin: '20px auto',
                    maxWidth: '300px',
                    border: '2px solid #FFD9E3', 
                    borderRadius: '10px',
                }}
            />
        </div>
    );
}

export default Blank;
