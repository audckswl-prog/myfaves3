
'use client';

import React from 'react';

type WobblyCommentIconProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
};

const WobblyCommentIcon: React.FC<WobblyCommentIconProps> = ({ onClick, style }) => {
  return (
    <div onClick={onClick} style={style}>
      <div className="wobbly-comment-icon">
        <div className="wobbly-comment-icon-dot"></div>
        <div className="wobbly-comment-icon-dot"></div>
        <div className="wobbly-comment-icon-dot"></div>
      </div>
      <style jsx>{`
        .wobbly-comment-icon {
          position: relative;
          width: 28px;
          height: 28px;
          border: 2px solid black;
          border-radius: 73% 27% 59% 41% / 61% 57% 43% 39%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
        }
        .wobbly-comment-icon::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 4px;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-top-color: black;
          transform: rotate(20deg);
        }
        .wobbly-comment-icon-dot {
            width: 4px;
            height: 4px;
            background-color: black;
            border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default WobblyCommentIcon;
