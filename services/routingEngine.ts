
import { BUS_DATA, STOP_COORDS, ALL_LOCATIONS_COORDS } from '../busData';
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

  let startCoord: [number, number];
  let startDisplayName: string;
  if (typeof start === 'string') {
    startCoord = ALL_LOCATIONS_COORDS[start];
    startDisplayName = start;
  } else {
    startCoord = start;
    startDisplayName = 'আপনার অবস্থান';
  }
  
  let endCoord: [number, number];
  let endDisplayName: string;
  if (typeof end === 'string') {
    endCoord = ALL_LOCATIONS_COORDS[end];
    endDisplayName = end;
  } else {
    endCoord = end;
    endDisplayName = 'গন্তব্য';
  }

  if (!startCoord || !endCoord) return [];

  // Step 1: Find nearest BUS STOPS for origin and destination
  const nearestStartStop = findNearestStop(startCoord[0], startCoord[1]);
  const nearestEndStop = findNearestStop(endCoord[0], endCoord[1]);

  if (!nearestStartStop || !nearestEndStop) return [];

  // Generate initial segment (Origin -> Nearest Stop)
  let initialSegment: RouteSegment | null = null;
  if (startDisplayName !== nearestStartStop.name) {
    const isRickshaw = nearestStartStop.distance > 0.4;
    const fare = isRickshaw ? calculateRickshawFare(nearestStartStop.distance) : '';
    initialSegment = {
      type: isRickshaw ? 'RICKSHAW' : 'WALK',
      from: startDisplayName,
      to: nearestStartStop.name,
      fromCoord: startCoord,
      toCoord: nearestStartStop.coord as [number, number],
      description: isRickshaw 
        ? `${startDisplayName} থেকে রিকশায় ${nearestStartStop.name} বাস স্টপেজে যান (আনুমানিক ভাড়া: ${fare})।` 
        : `${startDisplayName} থেকে হেঁটে ${nearestStartStop.name} বাস স্টপেজে যান। এটি খুব কাছেই।`,
      distanceKm: nearestStartStop.distance
    };
  }

  // Generate final segment (Last Stop -> Destination POI)
  let finalSegment: RouteSegment | null = null;
  if (endDisplayName !== nearestEndStop.name) {
    const distToTarget = getDistance(nearestEndStop.coord[0], nearestEndStop.coord[1], endCoord[0], endCoord[1]);
    const isRickshaw = distToTarget > 0.4;
    const fare = isRickshaw ? calculateRickshawFare(distToTarget) : '';
    finalSegment = {
      type: isRickshaw ? 'RICKSHAW' : 'WALK',
      from: nearestEndStop.name,
      to: endDisplayName,
      fromCoord: nearestEndStop.coord as [number, number],
      toCoord: endCoord,
      description: isRickshaw 
        ? `${nearestEndStop.name} থেকে রিকশায় আপনার গন্তব্য ${endDisplayName}-এ পৌঁছান (ভাড়া প্রায়: ${fare})।` 
        : `${nearestEndStop.name} থেকে হেঁটে আপনার গন্তব্য ${endDisplayName}-এ পৌঁছান।`,
      distanceKm: distToTarget
    };
  }

  const startStopName = nearestStartStop.name;
  const endStopName = nearestEndStop.name;

  // Step 2: Find Direct Bus Connections
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

  // Step 3: Find 1-Transfer Connections if direct buses are few
  if (suggestions.length < 4) {
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
