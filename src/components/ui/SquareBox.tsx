import React from "react";
import "./SquareBox.css";

interface SquareBoxProps {
  room: number;
  isAvailable: boolean;
  isSelected?: boolean;
}

const SquareBox: React.FC<SquareBoxProps> = ({ room, isAvailable, isSelected }) => {
  return (
    <div
      className={`square-box ${
        isSelected ? "selected" : isAvailable ? "available" : "occupied"
      }`}
    >
      {room}
    </div>
  );
};

export default SquareBox;
