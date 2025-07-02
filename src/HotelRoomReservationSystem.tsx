import { useState } from "react";
import Controls from "./components/Controls";
import HotelLayout from "./components/HotelLayout";
import { calculateTravelTime, getBestRooms } from "./utils/utils";

const initialAvailableRooms: Record<number, number[]> = {
  1: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
  2: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
  3: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310],
  4: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410],
  5: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
  6: [601, 602, 603, 604, 605, 606, 607, 608, 609, 610],
  7: [701, 702, 703, 704, 705, 706, 707, 708, 709, 710],
  8: [801, 802, 803, 804, 805, 806, 807, 808, 809, 810],
  9: [901, 902, 903, 904, 905, 906, 907, 908, 909, 910],
  10: [1001, 1002, 1003, 1004, 1005, 1006, 1007],
};

const HotelRoomReservationSystem = () => {
  const [availableRooms, setAvailableRooms] = useState<
    Record<number, number[]>
  >(initialAvailableRooms);
  const [bookingCount, setBookingCount] = useState<number>(1);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleBookRooms = () => {
    if (bookingCount < 1 || bookingCount > 5) {
      setError("Please enter a valid number of rooms to book (1-5).");
      return;
    }
    setError(null);
    const rooms = getBestRooms(availableRooms, bookingCount);
    setSelectedRooms(rooms);
    setTravelTime(calculateTravelTime(rooms));

    // Mark selected rooms as unavailable
    const updatedRooms: Record<number, number[]> = { ...availableRooms };
    rooms.forEach((room) => {
      const floor = Math.floor(room / 100);
      updatedRooms[floor] = updatedRooms[floor].filter(
        (r: number) => r !== room
      );
    });
    setAvailableRooms(updatedRooms);
  };

  const handleRandomOccupancy = () => {
    const updatedRooms: Record<number, number[]> = { ...initialAvailableRooms };
    Object.keys(updatedRooms).forEach((floor) => {
      updatedRooms[+floor] = updatedRooms[+floor].filter(
        () => Math.random() > 0.3
      );
    });
    setAvailableRooms(updatedRooms);
    setSelectedRooms([]);
    setTravelTime(0);
    setError(null);
  };

  const handleReset = () => {
    setAvailableRooms(initialAvailableRooms);
    setSelectedRooms([]);
    setTravelTime(0);
    setError(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hotel Room Reservation</h1>
      <Controls
        bookingCount={bookingCount}
        setBookingCount={setBookingCount}
        handleBookRooms={handleBookRooms}
        handleRandomOccupancy={handleRandomOccupancy}
        handleReset={handleReset}
        error={error}
      />
      <HotelLayout
        availableRooms={availableRooms}
        initialAvailableRooms={initialAvailableRooms}
        selectedRooms={selectedRooms}
      />
      {selectedRooms.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Selected Rooms:</h2>
          <p>{selectedRooms.join(", ")}</p>
          <p>Total Travel Time: {travelTime} minutes</p>
        </div>
      )}
    </div>
  );
};

export default HotelRoomReservationSystem;
