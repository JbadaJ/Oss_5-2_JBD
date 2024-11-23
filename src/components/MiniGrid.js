import React from "react";

function MiniGrid({ data = [] }) {
    return (
        <div className="grid-container">
            {data.map((item) => (
                <div key={item.id} className="grid-item">
                    <div className="webtoon-title">{item.title}</div>
                    <div>글 작가: {item.writer}</div>
                    <div>그림 작가: {item.artist}</div>
                    <div>웹사이트: {item.website}</div>
                    <div>에피소드 수: {item.episodes}</div>
                    <div>조회수: {item.views}</div>
                    <div>장르: {item.genre}</div>
                    <div>연령대: {item.age}</div>
                </div>
            ))}
        </div>
    );
}

export default MiniGrid;
