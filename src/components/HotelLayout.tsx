import React from "react";
import SquareBox from "./ui/SquareBox";
import "./HotelLayout.css";

interface HotelLayoutProps {
  availableRooms: Record<number, number[]>;
  initialAvailableRooms: Record<number, number[]>;
  selectedRooms: number[];
}

const HotelLayout: React.FC<HotelLayoutProps> = ({
  availableRooms,
  initialAvailableRooms,
  selectedRooms,
}) => {
  return (
    <div className="hotel-layout">
      <h2 className="layout-title">Hotel Room Availability</h2>

      <div className="layout-grid">
        {Object.keys(initialAvailableRooms).map((floor) => (
          <div key={floor} className="floor-row">
            {initialAvailableRooms[+floor].map((room: number) => (
              <SquareBox
                key={room}
                room={room}
                isAvailable={availableRooms[+floor].includes(room)}
                isSelected={selectedRooms.includes(room)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelLayout;
