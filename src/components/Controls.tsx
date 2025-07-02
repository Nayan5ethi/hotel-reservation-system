import React from "react";
import { Button } from "./ui/Button";
import "./Controls.css";

interface ControlsProps {
  bookingCount: number;
  setBookingCount: (count: number) => void;
  handleBookRooms: () => void;
  handleRandomOccupancy: () => void;
  handleReset: () => void;
  error: string | null;
}

const Controls: React.FC<ControlsProps> = ({
  bookingCount,
  setBookingCount,
  handleBookRooms,
  handleRandomOccupancy,
  handleReset,
  error,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 1 && Number(value) <= 5)) {
      setBookingCount(Number(value) || 0);
    }
  };

  return (
    <div className="controls">
      <label htmlFor="roomCount">Number of Rooms to Reserve (1-5):</label>
      <input
        id="roomCount"
        type="number"
        min="1"
        max="5"
        value={bookingCount || ""}
        onChange={handleInputChange}
      />
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <Button onClick={handleBookRooms}>Reserve Rooms</Button>
        <Button onClick={handleRandomOccupancy}>
          Generate Random Room Availability
        </Button>
        <Button onClick={handleReset}>Reset All</Button>
      </div>
    </div>
  );
};

export default Controls;
