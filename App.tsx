
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Bus, Navigation, ArrowRight, Info, Loader2, Map as MapIcon, Compass, UserCircle, Footprints, Bike, ArrowLeftRight, MessageCircle, X, List, Pill, Coffee, Building, GraduationCap, School, ChevronRight, MapPinned, Layers, Search as SearchIcon, Hospital, LocateFixed } from 'lucide-react';
import { BUS_DATA, UNIQUE_STOPS_PAIRS, STOP_COORDS, getNearbyAmenities, getStopBn, ALL_LOCATION_PAIRS, ALL_LOCATIONS_COORDS, POI_COORDS } from './busData';
import { findRoutes } from './services/routingEngine';
import { getTravelGuidance, resolveLocation } from './services/geminiService';
import { TripSuggestion, RouteSegment, Amenity, AmenityType, BusRoute } from './types';

// Leaflet is loaded via script tag in index.html
declare const L: any;

const BRAND_GREEN = '#004b23'; 
const BRAND_BLUE = '#003566';  
const BRAND_ORANGE = '#ff7b00'; 
const BUS_COLORS = [BRAND_BLUE, '#16a34a', BRAND_ORANGE, '#db2777', '#0891b2'];

const LocationSearchInput: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  icon: React.ReactNode;
  onChange: (val: string) => void;
  onSelect: (name: string, isCoords?: boolean) => void;
  showCurrentLocation?: boolean;
  userLoc?: [number, number] | null;
}> = ({ label, placeholder, value, icon, onChange, onSelect, showCurrentLocation, userLoc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const query = value.toLowerCase().trim();
  const suggestions = query.length > 0 
    ? ALL_LOCATION_PAIRS.filter(p => 
        p.bn.toLowerCase().includes(query) || 
        p.en.toLowerCase().includes(query)
      ).slice(0, 15)
    : ALL_LOCATION_PAIRS.slice(0, 8);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">{label}</label>
      <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-blue-600 transition-all shadow-sm">
        <div className="shrink-0">{icon}</div>
        <input 
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none"
        />
        {value && (
          <button onClick={() => { onChange(''); onSelect(''); }} className="text-slate-300 hover:text-slate-500">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-[3500] w-full mt-2 bg-white/98 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {showCurrentLocation && (
              <button 
                onClick={() => {
                  if (userLoc) {
                    onSelect("আমার বর্তমান অবস্থান", true);
                    onChange("আমার বর্তমান অবস্থান (Current Location)");
                    setIsOpen(false);
                  } else {
                    alert("দয়া করে লোকেশন পারমিশন দিন");
                  }
                }}
                className="w-full text-left px-4 py-4 hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-slate-100 group"
              >
                <div className="p-2 rounded-xl bg-blue-600 text-white animate-pulse">
                  <LocateFixed className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-black text-blue-700">আমার বর্তমান অবস্থান (Use GPS)</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">অটো-ট্র্যাকিং / AUTO-TRACK</div>
                </div>
              </button>
            )}

            {suggestions.map((p, idx) => {
              const isHospital = p.bn.includes('হাসপাতাল') || p.bn.includes('Hospital') || p.bn.includes('Medical');
              const isSchool = p.bn.includes('স্কুল') || p.bn.includes('School') || p.bn.includes('কলেজ') || p.bn.includes('College') || p.bn.includes('University') || p.bn.includes('বিশ্ববিদ্যালয়');
              const isPoi = !!POI_COORDS[p.en];
              
              return (
                <button 
                  key={idx}
                  onClick={() => {
                    onSelect(p.en);
                    onChange(`${p.bn} (${p.en})`);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0 group"
                >
                  <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${isHospital ? 'bg-rose-50 text-rose-600' : isSchool ? 'bg-indigo-50 text-indigo-600' : isPoi ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    {isHospital ? <Hospital className="w-4 h-4" /> : isSchool ? <GraduationCap className="w-4 h-4" /> : isPoi ? <Building className="w-4 h-4" /> : <Bus className="w-4 h-4" />}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-slate-800 leading-tight truncate">
                      {p.bn} <span className="text-slate-400 font-medium ml-1 text-xs">/ {p.en}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                      {isHospital ? 'চিকিৎসা কেন্দ্র / Hospital' : isSchool ? 'শিক্ষা প্রতিষ্ঠান / Institution' : isPoi ? 'প্রতিষ্ঠাস / Landmark' : 'বাস স্টপেজ / Bus Stop'}
                    </div>
                  </div>
                </button>
              );
            })}
            
            {query.length > 0 && suggestions.length === 0 && (
              <div className="p-5 text-center">
                 <p className="text-xs font-bold text-slate-400">এই নামে কোনো স্টপেজ নেই। AI দিয়ে ম্যাপে খোঁজা হবে।</p>
                 <p className="text-[10px] text-slate-300 font-bold uppercase mt-1">NO DIRECT MATCH. AI SEARCH ENABLED.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AmenityIcon: React.FC<{ type: AmenityType }> = ({ type }) => {
  switch (type) {
    case 'PHARMACY': return <Pill className="w-4 h-4 text-rose-600" />;
    case 'FOOD': return <Coffee className="w-4 h-4 text-orange-600" />;
    case 'RESTROOM': return <Info className="w-4 h-4 text-blue-600" />;
    case 'SCHOOL': return <School className="w-4 h-4 text-indigo-600" />;
    case 'COLLEGE': return <GraduationCap className="w-4 h-4 text-purple-600" />;
    case 'MOSQUE': return <Building className="w-4 h-4 text-emerald-600" />;
    default: return <MapPin className="w-4 h-4 text-slate-400" />;
  }
};

const getAmenityHtml = (type: AmenityType) => {
  let color = '#64748b';
  let emoji = '📍';
  
  if (type === 'PHARMACY') { color = '#e11d48'; emoji = '💊'; }
  else if (type === 'FOOD') { color = '#f97316'; emoji = '🍽️'; }
  else if (type === 'RESTROOM') { color = '#2563eb'; emoji = '🚻'; }
  else if (type === 'SCHOOL') { color = '#4f46e5'; emoji = '🏫'; }
  else if (type === 'COLLEGE') { color = '#7c3aed'; emoji = '🎓'; }
  else if (type === 'MOSQUE') { color = '#059669'; emoji = '🕌'; }

  return `
    <div class="bg-white border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2" style="box-shadow: 0 4px 15px -3px rgba(0,0,0,0.3)">
       <div class="w-full h-full flex items-center justify-center text-sm rounded-full" style="background: ${color}15; color: ${color}">
          ${emoji}
       </div>
    </div>
  `;
};

const MapComponent: React.FC<{ 
  selectedTrip: TripSuggestion | null, 
  selectedBusRoute: BusRoute | null,
  userLoc: [number, number] | null,
  activeAmenities: Amenity[],
  onStopSelect: (name: string, coord: [number, number]) => void,
  isSatellite: boolean
}> = ({ selectedTrip, selectedBusRoute, userLoc, activeAmenities, onStopSelect, isSatellite }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const networkMarkersRef = useRef<any[]>([]);
  const layersRef = useRef<any[]>([]);
  const amenityMarkersRef = useRef<any[]>([]);
  
  const satelliteLayerRef = useRef<any>(null);
  const streetLayerRef = useRef<any>(null);
  const labelLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([23.8103, 90.4125], 12);
      
      satelliteLayerRef.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
      });

      streetLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      });

      labelLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        zIndex: 1000
      });

      L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
      
      if (isSatellite) {
        satelliteLayerRef.current.addTo(mapRef.current);
        labelLayerRef.current.addTo(mapRef.current);
      } else {
        streetLayerRef.current.addTo(mapRef.current);
      }

      Object.entries(STOP_COORDS).forEach(([nameEn, coord]) => {
        const nameBn = getStopBn(nameEn);
        const networkMarker = L.circleMarker(coord, {
          radius: 5,
          fillColor: '#ffffff',
          color: BRAND_BLUE,
          weight: 2,
          opacity: 0.8,
          fillOpacity: 1
        }).addTo(mapRef.current);
        
        networkMarker.bindTooltip(nameBn, { 
          permanent: false, 
          direction: 'top',
          className: 'bg-white/90 backdrop-blur-sm border-0 shadow-lg text-[10px] font-black text-slate-900 rounded-md px-2 py-1'
        });
        
        networkMarker.on('click', (e: any) => {
          L.DomEvent.stopPropagation(e);
          onStopSelect(nameEn, coord);
        });
        
        networkMarkersRef.current.push(networkMarker);
      });

      Object.entries(POI_COORDS).forEach(([name, coord]) => {
        const poiMarker = L.circleMarker(coord, {
          radius: 4,
          fillColor: '#ffffff',
          color: '#7c3aed',
          weight: 1.5,
          opacity: 0.6,
          fillOpacity: 0.8
        }).addTo(mapRef.current);
        
        poiMarker.bindTooltip(name, { 
          permanent: false, 
          direction: 'top',
          className: 'bg-white/90 backdrop-blur-sm border-0 shadow-lg text-[10px] font-black text-purple-900 rounded-md px-2 py-1'
        });
        
        networkMarkersRef.current.push(poiMarker);
      });
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (isSatellite) {
      mapRef.current.removeLayer(streetLayerRef.current);
      mapRef.current.addLayer(satelliteLayerRef.current);
      mapRef.current.addLayer(labelLayerRef.current);
    } else {
      mapRef.current.removeLayer(satelliteLayerRef.current);
      mapRef.current.removeLayer(labelLayerRef.current);
      mapRef.current.addLayer(streetLayerRef.current);
    }
  }, [isSatellite]);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    layersRef.current.forEach(l => l.remove());
    layersRef.current = [];

    if (userLoc) {
      const userMarker = L.circleMarker(userLoc, { color: '#ffffff', fillColor: BRAND_BLUE, fillOpacity: 1, weight: 3, radius: 10 }).addTo(mapRef.current);
      userMarker.bindPopup("<div class='font-black text-slate-900 text-sm'>আপনি এখানে আছেন / You are here</div>");
      markersRef.current.push(userMarker);
    }

    if (selectedBusRoute) {
      const stopCoordsList = selectedBusRoute.stopsEn
        .map(s => STOP_COORDS[s])
        .filter(c => !!c);
      
      const routeLine = L.polyline(stopCoordsList, {
        color: isSatellite ? '#ffcc00' : BRAND_BLUE,
        weight: 8,
        opacity: 0.9,
        lineCap: 'round'
      }).addTo(mapRef.current);
      layersRef.current.push(routeLine);

      selectedBusRoute.stopsEn.forEach((stopEn, idx) => {
        const coord = STOP_COORDS[stopEn];
        const stopBn = selectedBusRoute.stops[idx];
        if (!coord) return;

        const isStart = idx === 0;
        const isEnd = idx === selectedBusRoute.stopsEn.length - 1;

        const markerHtml = `
          <div class="bg-white border-4 ${isStart ? 'border-green-500' : isEnd ? 'border-red-500' : 'border-blue-500'} rounded-full w-7 h-7 flex items-center justify-center shadow-2xl transform -translate-x-1/2 -translate-y-1/2">
             <div class="w-2.5 h-2.5 rounded-full ${isStart ? 'bg-green-500' : isEnd ? 'bg-red-500' : 'bg-blue-500'}"></div>
          </div>
        `;

        const marker = L.marker(coord, { 
          icon: L.divIcon({ className: 'custom-bus-stop', html: markerHtml, iconSize: [0, 0] }),
          zIndexOffset: 1500
        }).addTo(mapRef.current);
        
        marker.on('click', (e: any) => {
          L.DomEvent.stopPropagation(e);
          onStopSelect(stopEn, coord);
        });
        
        marker.bindPopup(`<b>${stopBn} (${stopEn})</b><br/>${selectedBusRoute.name} এর স্টপেজ।`);
        markersRef.current.push(marker);
      });

      const group = L.featureGroup([...markersRef.current, ...layersRef.current]);
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    } else if (selectedTrip) {
      let busCount = 0;
      selectedTrip.segments.forEach((seg, idx) => {
        let color = '#ffffff';
        if (seg.type === 'BUS') {
          color = BUS_COLORS[busCount % BUS_COLORS.length];
          if (isSatellite && color === BRAND_BLUE) color = '#38bdf8'; 
          busCount++;
        } else if (seg.type === 'RICKSHAW') {
          color = '#22c55e';
        } else {
          color = '#94a3b8';
        }

        const isTransfer = idx > 0 && selectedTrip.segments[idx-1].type === 'BUS' && seg.type === 'WALK';
        const fromBn = getStopBn(seg.from);
        
        const markerIcon = L.divIcon({
          className: 'custom-div-icon',
          html: isTransfer 
            ? `<div class="bg-white border-4 border-orange-500 rounded-full w-10 h-10 flex items-center justify-center shadow-2xl transform -translate-x-1/2 -translate-y-1/2 cursor-pointer scale-110 z-[3000]">
                 <div class="w-6 h-6 text-orange-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="9" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="15" y2="16"></line></svg>
                 </div>
               </div>`
            : `<div class="bg-white border-4 border-slate-900 rounded-full w-8 h-8 flex items-center justify-center shadow-2xl transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-[3000]">
                 <div class="w-4 h-4 rounded-full" style="background: ${color}"></div>
               </div>`,
          iconSize: [0, 0]
        });

        const marker = L.marker(seg.fromCoord, { icon: markerIcon, zIndexOffset: 1800 }).addTo(mapRef.current);
        marker.on('click', (e: any) => {
          L.DomEvent.stopPropagation(e);
          onStopSelect(seg.from, seg.fromCoord);
        });
        marker.bindPopup(`<b>${fromBn} (${seg.from})</b><br/>${seg.description}`);
        markersRef.current.push(marker);

        const line = L.polyline([seg.fromCoord, seg.toCoord], { 
          color, 
          weight: seg.type === 'BUS' ? 9 : 6, 
          dashArray: seg.type === 'BUS' ? null : '15, 15',
          opacity: 1 
        }).addTo(mapRef.current);
        layersRef.current.push(line);
        
        if (idx === selectedTrip.segments.length - 1) {
          const toBn = getStopBn(seg.to);
          const isPoi = !!POI_COORDS[seg.to];
          const lastMarker = L.marker(seg.toCoord, {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-white border-4 ${isPoi ? 'border-purple-600' : 'border-red-500'} rounded-full w-10 h-10 flex items-center justify-center shadow-2xl transform -translate-x-1/2 -translate-y-1/2 scale-110 z-[3000]">
                       <div class="w-6 h-6 rounded-full ${isPoi ? 'bg-purple-600' : 'bg-red-500'} animate-pulse"></div>
                     </div>`,
              iconSize: [0, 0]
            }),
            zIndexOffset: 1800
          }).addTo(mapRef.current);
          lastMarker.on('click', (e: any) => {
             L.DomEvent.stopPropagation(e);
             onStopSelect(seg.to, seg.toCoord);
          });
          lastMarker.bindPopup(`<b>${toBn} (${seg.to})</b> (গন্তব্য / Destination)`);
          markersRef.current.push(lastMarker);
        }
      });

      const group = L.featureGroup([...markersRef.current, ...layersRef.current]);
      mapRef.current.fitBounds(group.getBounds().pad(0.3));
    }
  }, [selectedTrip, selectedBusRoute, userLoc, isSatellite]);

  useEffect(() => {
    if (!mapRef.current) return;
    amenityMarkersRef.current.forEach(m => m.remove());
    amenityMarkersRef.current = [];

    activeAmenities.forEach(amenity => {
      const markerIcon = L.divIcon({
        className: 'amenity-div-icon',
        html: getAmenityHtml(amenity.type),
        iconSize: [0, 0]
      });

      const marker = L.marker(amenity.coord, { 
        icon: markerIcon, 
        zIndexOffset: 2500 
      }).addTo(mapRef.current);
      
      marker.bindPopup(`
        <div class="p-2 min-w-[140px]">
          <p class="font-black text-slate-900 text-sm mb-1">${amenity.name}</p>
          <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight mb-2">
             <div class="w-2 h-2 rounded-full bg-slate-300"></div>
             ${amenity.type}
          </div>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">${amenity.description || ''}</p>
        </div>
      `, { closeButton: false });
      
      amenityMarkersRef.current.push(marker);
    });

    if (activeAmenities.length > 0) {
      const group = L.featureGroup(amenityMarkersRef.current);
      mapRef.current.flyToBounds(group.getBounds().pad(1.2), { duration: 1.5 });
    }
  }, [activeAmenities]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default function App() {
  const [origin, setOrigin] = useState<string | [number, number]>('');
  const [originQuery, setOriginQuery] = useState('');
  const [destination, setDestination] = useState<string | [number, number]>('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);
  const [results, setResults] = useState<TripSuggestion[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<TripSuggestion | null>(null);
  const [selectedBusRoute, setSelectedBusRoute] = useState<BusRoute | null>(null);
  const [aiGuidance, setAiGuidance] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');
  const [activeAmenities, setActiveAmenities] = useState<Amenity[]>([]);
  const [selectedStopName, setSelectedStopName] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'search' | 'routes'>('search');
  const [isSatellite, setIsSatellite] = useState(true);
  const [busSearchQuery, setBusSearchQuery] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLoc([pos.coords.latitude, pos.coords.longitude]);
      }, (err) => console.error("Geolocation Error", err));
    }
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    
    let startInput = origin;
    let endInput = destination;

    if (!origin && originQuery) {
       // Support bilingual cleanup if user pasted formatted string back
       const cleanQuery = originQuery.split(' (')[0];
       const resolved = await resolveLocation(cleanQuery, userLoc || undefined);
       if (resolved) startInput = resolved.coord;
       else startInput = cleanQuery;
    } else if (origin === 'আমার বর্তমান অবস্থান' && userLoc) {
       startInput = userLoc;
    }

    if (!destination && destinationQuery) {
       const cleanDest = destinationQuery.split(' (')[0];
       const resolved = await resolveLocation(cleanDest, userLoc || undefined);
       if (resolved) {
         endInput = resolved.coord;
       } else {
         alert("আপনার গন্তব্য খুঁজে পাওয়া যায়নি। দয়া করে সঠিক নাম ব্যবহার করুন। / Destination not found.");
         setIsSearching(false);
         return;
       }
    } else if (!destination && !destinationQuery) {
      alert("গন্তব্য নির্বাচন করুন / Select Destination");
      setIsSearching(false);
      return;
    }

    if (!startInput) {
       if (userLoc) startInput = userLoc;
       else {
         alert("শুরুস্থান নির্বাচন করুন / Select Origin");
         setIsSearching(false);
         return;
       }
    }

    const routes = findRoutes(startInput, endInput);
    setResults(routes);
    setSelectedTrip(null);
    setSelectedBusRoute(null);
    setAiGuidance('');
    setActiveAmenities([]);
    setSelectedStopName(null);
    setIsSearching(false);
    setActiveView('list');
    setSidebarTab('search');
  };

  const selectTrip = async (trip: TripSuggestion) => {
    setSelectedTrip(trip);
    setSelectedBusRoute(null);
    setActiveAmenities([]);
    setSelectedStopName(null);
    setActiveView('map');
    setIsAiLoading(true);
    const guidance = await getTravelGuidance(originQuery || "আপনার অবস্থান", destinationQuery, trip);
    setAiGuidance(guidance);
    setIsAiLoading(false);
  };

  const handleBusRouteSelect = (bus: BusRoute) => {
    setSelectedBusRoute(bus);
    setSelectedTrip(null);
    setActiveAmenities([]);
    setSelectedStopName(null);
    setActiveView('map');
  };

  const handleStopSelect = (nameEn: string, coord: [number, number]) => {
    const nameBn = getStopBn(nameEn);
    const amenities = getNearbyAmenities(coord, nameBn);
    setActiveAmenities(amenities);
    setSelectedStopName(nameEn);
    if (activeView === 'list') setActiveView('map');
  };

  const filteredBuses = BUS_DATA.filter(bus => 
    bus.name.toLowerCase().includes(busSearchQuery.toLowerCase()) ||
    bus.description.toLowerCase().includes(busSearchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden md:flex-row text-slate-900">
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, -50%) translateY(-5%); }
          50% { transform: translate(-50%, -50%) translateY(5%); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite ease-in-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] flex bg-white rounded-full shadow-2xl border border-slate-200 p-1">
        <button onClick={() => setActiveView('list')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'list' ? 'bg-[#003566] text-white shadow-lg' : 'text-slate-500'}`}><List className="w-4 h-4" /> রুট লিস্ট / List</button>
        <button onClick={() => setActiveView('map')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'map' ? 'bg-[#003566] text-white shadow-lg' : 'text-slate-500'}`}><MapIcon className="w-4 h-4" /> ম্যাপ / Map</button>
      </div>

      <div className={`w-full md:w-[450px] bg-white border-r border-slate-200 shadow-xl z-[1500] flex flex-col h-full transition-transform duration-300 md:translate-x-0 ${activeView === 'map' ? 'hidden md:flex' : 'flex'}`}>
        <header className="px-5 py-6 bg-white border-b border-slate-100 flex-shrink-0 flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
             <div className="absolute inset-0 bg-green-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                <div className="absolute bottom-0 w-full h-1/2 bg-slate-200"></div>
                <div className="z-10 bg-white p-1 rounded-md shadow-sm">
                   <Bus className="w-6 h-6 text-green-800" />
                </div>
                <div className="absolute top-2 w-10 h-10 border-t-2 border-green-200 opacity-20 rotate-45"></div>
             </div>
             <div className="absolute -left-1 bottom-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white scale-75 shadow-md">
                <ArrowRight className="w-4 h-4 rotate-135" />
             </div>
          </div>
          <div>
            <div className="flex items-center leading-none">
              <span style={{ color: BRAND_GREEN }} className="text-2xl font-black tracking-tight">Dhaka</span>
              <span style={{ color: BRAND_BLUE }} className="text-2xl font-black tracking-tight ml-1">Flow</span>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Smart City Transit Assistant</p>
          </div>
        </header>

        <div className="flex border-b border-slate-100 flex-shrink-0">
          <button onClick={() => setSidebarTab('search')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${sidebarTab === 'search' ? 'border-[#003566] text-[#003566]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>রুট খুজুন / Search</button>
          <button onClick={() => setSidebarTab('routes')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${sidebarTab === 'routes' ? 'border-[#003566] text-[#003566]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>সব বাস / All Buses</button>
        </div>

        <div className="p-4 md:p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {sidebarTab === 'search' ? (
            <>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative space-y-3">
                  
                  <LocationSearchInput 
                    label="শুরুস্থান / Origin"
                    placeholder="Search Stop, Hospital, School..."
                    value={originQuery}
                    onChange={setOriginQuery}
                    onSelect={(name, isCoords) => {
                       if (isCoords) setOrigin('আমার বর্তমান অবস্থান');
                       else setOrigin(name);
                    }}
                    showCurrentLocation
                    userLoc={userLoc}
                    icon={<MapPin className="w-4 h-4 text-blue-500 shrink-0" />}
                  />

                  <LocationSearchInput 
                    label="গন্তব্য / Destination"
                    placeholder="Where are you going?"
                    value={destinationQuery}
                    onChange={setDestinationQuery}
                    onSelect={(name) => setDestination(name)}
                    icon={<SearchIcon className="w-4 h-4 text-red-500 shrink-0" />}
                  />

                  <button onClick={handleSearch} disabled={isSearching} style={{ backgroundColor: BRAND_BLUE }} className="w-full hover:opacity-95 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm mt-2">
                    {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                    ভ্রমণ গাইড তৈরি করুন / Plan Trip
                  </button>
                </div>
              </div>

              <div className="space-y-3 pb-24 md:pb-5">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">রুট ফলাফল / Route Results</h2>
                {results.map(trip => (
                  <button key={trip.id} onClick={() => selectTrip(trip)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all block group ${selectedTrip?.id === trip.id ? 'border-[#003566] bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md ${trip.totalTransfers === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {trip.totalTransfers === 0 ? 'সরাসরি / Direct' : 'পরিবর্তন / Connecting'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#003566] transition-colors" />
                    </div>
                    <h3 className="font-black text-slate-800 text-base">{trip.summary}</h3>
                    <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-slate-500">
                      <span className="flex items-center gap-1.5"><MapIcon className="w-3.5 h-3.5" /> {trip.segments.length} ধাপে / Steps</span>
                      <span style={{ color: BRAND_BLUE }}>৳৩০ - ১২০ (Approx Fare)</span>
                    </div>
                  </button>
                ))}
                {results.length === 0 && !isSearching && (
                  <div className="text-center py-16 px-10">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Compass className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">Search any Stop, School, or Hospital in Bangla/English for smart route guidance.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3 pb-24 md:pb-5">
              <div className="px-1 space-y-4 mb-2">
                 <div className="flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dhaka Bus Network ({BUS_DATA.length})</h2>
                 </div>
                 <div className="relative group">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="বাসের নাম / Bus Name..." 
                      value={busSearchQuery}
                      onChange={(e) => setBusSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                    />
                 </div>
              </div>
              <div className="grid gap-2.5 overflow-hidden">
                {filteredBuses.map(bus => (
                  <button 
                    key={bus.name} 
                    onClick={() => handleBusRouteSelect(bus)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 group ${selectedBusRoute?.name === bus.name ? 'border-[#003566] bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'}`}
                  >
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Bus className="w-5 h-5 text-[#003566]" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-black text-slate-800 truncate">{bus.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight line-clamp-1">{bus.description}</p>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-full bg-slate-50 text-slate-300 group-hover:text-[#003566] group-hover:bg-white transition-all shrink-0">
                       <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`flex-1 flex flex-col h-full bg-slate-100 relative ${activeView === 'list' ? 'hidden md:flex' : 'flex'}`}>
        <MapComponent selectedTrip={selectedTrip} selectedBusRoute={selectedBusRoute} userLoc={userLoc} activeAmenities={activeAmenities} onStopSelect={handleStopSelect} isSatellite={isSatellite} />
        
        <button 
          onClick={() => setIsSatellite(!isSatellite)}
          className="absolute top-6 right-16 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white z-[1800] hover:bg-white transition-all group flex items-center gap-2"
        >
          <Layers className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black text-slate-800 hidden md:block">
            {isSatellite ? 'মানচিত্র / Map' : 'স্যাটেলাইট / Satellite'}
          </span>
        </button>

        {selectedBusRoute && (
          <div className="absolute top-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[450px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-5 z-[1800] flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-200/50">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">{selectedBusRoute.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{selectedBusRoute.stops.length} Stops</span>
                   <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                   <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Full Route Map</span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedBusRoute(null)} className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {selectedStopName && (
          <div className="absolute top-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-5 z-[1800] animate-in fade-in slide-in-from-left-4 duration-500 max-h-[80vh] flex flex-col">
             <div className="flex justify-between items-center mb-4 flex-shrink-0">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-800 text-white rounded-xl shadow-md">
                    <MapPinned className="w-5 h-5" />
                 </div>
                 <div className="overflow-hidden">
                   <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight truncate">{getStopBn(selectedStopName)}</h4>
                   <p className="text-[10px] text-slate-500 font-bold">আশেপাশের স্থান / Nearby Places</p>
                 </div>
               </div>
               <button onClick={() => {setSelectedStopName(null); setActiveAmenities([]);}} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400"><X className="w-4 h-4" /></button>
             </div>
             
             <div className="space-y-2.5 overflow-y-auto pr-1 custom-scrollbar">
               {activeAmenities.length > 0 ? (
                 activeAmenities.map(amenity => (
                   <div key={amenity.id} className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-default shadow-sm hover:shadow-md">
                     <div className="p-2.5 bg-white rounded-xl shadow-sm shrink-0">
                        <AmenityIcon type={amenity.type} />
                     </div>
                     <div>
                       <p className="text-xs font-black text-slate-800 leading-tight">{amenity.name}</p>
                       <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{amenity.description}</p>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-6 text-slate-400">
                    <p className="text-xs font-bold">No data found near this stop.</p>
                 </div>
               )}
             </div>

             <div className="mt-4 pt-4 border-t border-slate-100 flex-shrink-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Zoom map for accuracy</p>
             </div>
          </div>
        )}

        {selectedTrip && (
          <div className="absolute bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[700px] bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-[0_-15px_50px_rgba(0,0,0,0.25)] p-6 md:p-8 border border-slate-200 z-[2500] flex flex-col overflow-hidden max-h-[80vh] md:max-h-[65vh] animate-in slide-in-from-bottom-6 duration-700">
            <div className="w-14 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: BRAND_BLUE }} className="p-3.5 rounded-2xl text-white shadow-xl shadow-blue-100"><Compass className="w-6 h-6" /></div>
                <div>
                  <h2 className="font-black text-slate-900 text-lg md:text-xl tracking-tight">ভ্রমণ গাইড / Travel Guide</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">AI POWERED TRIP PLANNER</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrip(null)} className="p-3 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600 shadow-sm"><X className="w-6 h-6" /></button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <div className="flex items-center gap-3 mb-8 overflow-x-auto py-4 scrollbar-hide shrink-0 px-2 bg-slate-50/50 rounded-3xl border border-slate-100">
                {selectedTrip.segments.map((seg, i) => (
                  <React.Fragment key={i}>
                    <button onClick={() => handleStopSelect(seg.from, seg.fromCoord)} className="flex flex-col items-center min-w-[100px] relative transition-all hover:scale-105 active:scale-95 group">
                      <div className={`p-4 rounded-2xl mb-2 shadow-md transition-all group-hover:shadow-lg ${seg.type === 'BUS' ? 'bg-white text-blue-700' : seg.type === 'RICKSHAW' ? 'bg-white text-emerald-700' : 'bg-white text-slate-700'}`} style={seg.type === 'BUS' ? {borderColor: BUS_COLORS[i % BUS_COLORS.length], borderWidth: '2px'} : {}}>
                        {seg.type === 'BUS' ? <Bus className="w-6 h-6" /> : seg.type === 'RICKSHAW' ? <Bike className="w-6 h-6" /> : <Footprints className="w-6 h-6" />}
                      </div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter text-center line-clamp-1 px-1">{getStopBn(seg.from)}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{seg.type === 'WALK' ? 'WALK' : seg.type === 'RICKSHAW' ? 'RICKSHAW' : 'BUS'}</span>
                    </button>
                    {i < selectedTrip.segments.length - 1 && <ArrowRight className="w-4 h-4 text-slate-200 mx-2 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>

              {isAiLoading ? (
                <div className="space-y-5 py-8 text-center">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Loader2 className="w-8 h-8 text-blue-600 animate-pulse" />
                    </div>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <h3 className="font-black text-slate-800 text-base mb-1">এআই পরামর্শ তৈরি করছে / AI PLANNING...</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tight leading-relaxed">Finding the perfect path to your destination institution...</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap prose prose-slate max-w-none">
                  <div className="font-medium prose-p:my-2 prose-strong:text-slate-900 prose-li:my-1">{aiGuidance}</div>
                </div>
              )}

              <div className="mt-8 mb-4 p-5 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex gap-4 shadow-sm">
                <div className="p-3 bg-white rounded-2xl shadow-sm self-start">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-orange-900 mb-1">Bilingual Pro-Tip</h4>
                  <p className="text-xs text-orange-800 font-medium leading-relaxed">
                    Using "আমার বর্তমান অবস্থান" (Current Location) ensures the most accurate start point. Our AI calculates Rickshaw fares and landmarks specifically for Dhaka city context.
                  </p>
                </div>
              </div>
              <div className="h-12 md:hidden"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
