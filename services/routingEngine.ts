
import { BUS_DATA, STOP_COORDS } from '../busData';
import { TripSuggestion, RouteSegment, SegmentType } from '../types';

// Helper to calculate distance between two coordinates in KM
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateRickshawFare = (distanceKm: number): string => {
  if (distanceKm < 0.5) return "৳২০ - ৩০";
  if (distanceKm < 1.0) return "৳৩০ - ৫০";
  if (distanceKm < 2.0) return "৳৬০ - ৮০";
  return "৳১০০+";
};

const findNearestStop = (lat: number, lng: number) => {
  let nearest = null;
  let minDistance = Infinity;

  for (const [name, coord] of Object.entries(STOP_COORDS)) {
    const dist = getDistance(lat, lng, coord[0], coord[1]);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = { name, coord, distance: dist };
    }
  }
  return nearest;
};

export const findRoutes = (start: string | [number, number], end: string | [number, number]): TripSuggestion[] => {
  const suggestions: TripSuggestion[] = [];

  let startStopName = typeof start === 'string' ? start : '';
  let startCoord: [number, number] = typeof start === 'string' ? STOP_COORDS[start] : start;
  
  let endStopName = typeof end === 'string' ? end : '';
  let endCoord: [number, number] = typeof end === 'string' ? STOP_COORDS[end] : end;

  let initialSegment: RouteSegment | null = null;
  if (typeof start !== 'string' || !STOP_COORDS[start]) {
    const nearest = findNearestStop(startCoord[0], startCoord[1]);
    if (nearest) {
      const isRickshaw = nearest.distance > 0.4;
      const fare = isRickshaw ? calculateRickshawFare(nearest.distance) : '';
      initialSegment = {
        type: isRickshaw ? 'RICKSHAW' : 'WALK',
        from: 'আপনার অবস্থান',
        to: nearest.name,
        fromCoord: startCoord,
        toCoord: nearest.coord as [number, number],
        description: isRickshaw 
          ? `আপনার অবস্থান থেকে রিকশায় ${nearest.name} বাস স্টপেজে যান (আনুমানিক ভাড়া: ${fare})।` 
          : `আপনার অবস্থান থেকে হেঁটে ${nearest.name} বাস স্টপেজে যান। এটি খুব কাছেই।`,
        distanceKm: nearest.distance
      };
      startStopName = nearest.name;
    }
  }

  let finalSegment: RouteSegment | null = null;
  if (typeof end !== 'string' || !STOP_COORDS[end]) {
    const nearest = findNearestStop(endCoord[0], endCoord[1]);
    if (nearest) {
      const isRickshaw = nearest.distance > 0.4;
      const fare = isRickshaw ? calculateRickshawFare(nearest.distance) : '';
      finalSegment = {
        type: isRickshaw ? 'RICKSHAW' : 'WALK',
        from: nearest.name,
        to: 'গন্তব্য',
        fromCoord: nearest.coord as [number, number],
        toCoord: endCoord,
        description: isRickshaw 
          ? `${nearest.name} থেকে রিকশায় গন্তব্যে পৌঁছান (ভাড়া প্রায়: ${fare})।` 
          : `${nearest.name} থেকে হেঁটে গন্তব্যে পৌঁছান।`,
        distanceKm: nearest.distance
      };
      endStopName = nearest.name;
    }
  }

  const directBuses = BUS_DATA.filter(bus => 
    bus.stopsEn.includes(startStopName) && bus.stopsEn.includes(endStopName)
  );

  directBuses.forEach(bus => {
    const sIdx = bus.stopsEn.indexOf(startStopName);
    const eIdx = bus.stopsEn.indexOf(endStopName);
    
    if (sIdx < eIdx) {
      const segments: RouteSegment[] = [];
      if (initialSegment) segments.push(initialSegment);
      
      segments.push({
        type: 'BUS',
        busName: bus.name,
        from: startStopName,
        to: endStopName,
        fromCoord: STOP_COORDS[startStopName],
        toCoord: STOP_COORDS[endStopName],
        description: `${bus.name} বাসে উঠুন এবং ${endStopName} এ নামুন।`
      });

      if (finalSegment) segments.push(finalSegment);

      suggestions.push({
        id: `route-${bus.name}-${Math.random()}`,
        totalTransfers: 0,
        summary: `${bus.name} (সরাসরি)`,
        segments
      });
    }
  });

  if (suggestions.length < 3) {
    const startBuses = BUS_DATA.filter(b => b.stopsEn.includes(startStopName));
    const endBuses = BUS_DATA.filter(b => b.stopsEn.includes(endStopName));

    for (const bA of startBuses) {
      const sIdxA = bA.stopsEn.indexOf(startStopName);
      for (const tStop of bA.stopsEn.slice(sIdxA + 1)) {
        for (const bB of endBuses) {
          const tIdxB = bB.stopsEn.indexOf(tStop);
          const eIdxB = bB.stopsEn.indexOf(endStopName);
          if (tIdxB !== -1 && tIdxB < eIdxB && bA.name !== bB.name) {
             const segments: RouteSegment[] = [];
             if (initialSegment) segments.push(initialSegment);
             
             segments.push({
               type: 'BUS', busName: bA.name, from: startStopName, to: tStop,
               fromCoord: STOP_COORDS[startStopName], toCoord: STOP_COORDS[tStop],
               description: `${bA.name} বাসে ${tStop} পর্যন্ত যান।`
             });
             
             segments.push({
               type: 'WALK', from: tStop, to: tStop,
               fromCoord: STOP_COORDS[tStop], toCoord: STOP_COORDS[tStop],
               description: `${tStop}-এ বাস পরিবর্তন করুন (${bA.name} থেকে ${bB.name})। প্রয়োজনে এখানে কিছুক্ষণ অপেক্ষা করুন।`
             });

             segments.push({
               type: 'BUS', busName: bB.name, from: tStop, to: endStopName,
               fromCoord: STOP_COORDS[tStop], toCoord: STOP_COORDS[endStopName],
               description: `${bB.name} বাসে ${endStopName} এ পৌঁছান।`
             });

             if (finalSegment) segments.push(finalSegment);

             suggestions.push({
               id: `transfer-${bA.name}-${bB.name}-${tStop}`,
               totalTransfers: 1,
               summary: `${bA.name} ➔ ${bB.name}`,
               segments
             });
             if (suggestions.length > 5) break;
          }
        }
        if (suggestions.length > 5) break;
      }
      if (suggestions.length > 5) break;
    }
  }

  return suggestions.slice(0, 5);
};
