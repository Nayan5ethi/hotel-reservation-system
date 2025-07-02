export const calculateTravelTime = (rooms: number[]): number => {
  if (rooms.length <= 1) return 0;

  const sortedRooms = rooms.slice().sort((a, b) => a - b); // Avoid mutation
  const first = sortedRooms[0];
  const last = sortedRooms[rooms.length - 1];

  const firstFloor = Math.floor(first / 100);
  const lastFloor = Math.floor(last / 100);
  const verticalTime = Math.abs(firstFloor - lastFloor) * 2;
  const horizontalTime = Math.abs((last % 100) - (first % 100));

  return verticalTime + horizontalTime;
};

export const getBestRooms = (
  availableRooms: Record<number, number[]>,
  bookingCount: number
): number[] => {
  const allRooms: { floor: number; room: number }[] = [];

  // Flatten available rooms into a single array with floor information
  Object.keys(availableRooms).forEach((floor) => {
    availableRooms[+floor].forEach((room) => {
      allRooms.push({ floor: +floor, room });
    });
  });

  // Sort rooms by floor and room number
  allRooms.sort((a, b) => a.floor - b.floor || a.room - b.room);

  // Try to find rooms on the same floor first
  for (const floor of Object.keys(availableRooms)) {
    const roomsOnFloor = availableRooms[+floor];
    if (roomsOnFloor.length >= bookingCount) {
      return roomsOnFloor.slice(0, bookingCount);
    }
  }

  // If not enough rooms on the same floor, minimize travel time across floors
  const selectedRooms: number[] = [];
  const usedRooms = new Set<number>();

  while (selectedRooms.length < bookingCount) {
    let bestRoom: { floor: number; room: number } | null = null;
    let minTravelTime = Infinity;

    for (const room of allRooms) {
      if (usedRooms.has(room.room)) continue;

      const travelTime = calculateTravelTime([...selectedRooms, room.room]);
      if (travelTime < minTravelTime) {
        minTravelTime = travelTime;
        bestRoom = room;
      }
    }

    if (bestRoom) {
      selectedRooms.push(bestRoom.room);
      usedRooms.add(bestRoom.room);
    } else {
      break; // No more rooms available
    }
  }

  return selectedRooms;
};

export const getCombinations = (arr: number[], k: number): number[][] => {
  const results: number[][] = [];

  const backtrack = (start: number, path: number[]) => {
    if (path.length === k) {
      results.push([...path]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);
  return results;
};
