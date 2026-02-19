
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Bus, Navigation, ArrowRight, Info, Loader2, Map as MapIcon, Compass, UserCircle, Footprints, Bike, ArrowLeftRight, MessageCircle, X, List, Pill, Coffee, Building, GraduationCap, School, ChevronRight, MapPinned, Layers } from 'lucide-react';
import { BUS_DATA, UNIQUE_STOPS_PAIRS, STOP_COORDS, getNearbyAmenities, getStopBn } from './busData';
import { findRoutes } from './services/routingEngine';
import { getTravelGuidance } from './services/geminiService';
import { TripSuggestion, RouteSegment, Amenity, AmenityType, BusRoute } from './types';

// Leaflet is loaded via script tag in index.html
declare const L: any;

const BRAND_GREEN = '#004b23'; 
const BRAND_BLUE = '#003566';  
const BRAND_ORANGE = '#ff7b00'; 
const BUS_COLORS = [BRAND_BLUE, '#16a34a', BRAND_ORANGE, '#db2777', '#0891b2'];

const AmenityIcon = ({ type, size = "w-4 h-4" }: { type: AmenityType, size?: string }) => {
  switch (type) {
    case 'PHARMACY': return <Pill className={`${size} text-rose-600`} />;
    case 'FOOD': return <Coffee className={`${size} text-amber-600`} />;
    case 'MOSQUE': return <Building className={`${size} text-emerald-700`} />;
    case 'COLLEGE': return <GraduationCap className={`${size} text-indigo-700`} />;
    case 'SCHOOL': return <School className={`${size} text-blue-600`} />;
    case 'RESTROOM': return <Info className={`${size} text-slate-500`} />;
    default: return <MapPin className={`${size}`} />;
  }
};

const getAmenityHtml = (type: AmenityType) => {
  let color = 'slate';
  let svg = '';
  switch (type) {
    case 'PHARMACY': color = 'rose-500'; svg = '<path d="M17 11h-4V7l-2-2H7l-2 2v4H1v4l2 2h4v4l2 2h4l2-2v-4h4l2-2v-4h4l2-2v-4l-2-2z"/>'; break;
    case 'FOOD': color = 'amber-500'; svg = '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>'; break;
    case 'MOSQUE': color = 'emerald-600'; svg = '<path d="M3 21h18M3 7l9-4 9 4v14H3V7zm9 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>'; break;
    case 'COLLEGE': color = 'indigo-600'; svg = '<path d="m22 10-10-5L2 10l10 5 10-5zM6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>'; break;
    case 'SCHOOL': color = 'blue-600'; svg = '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5a2.5 2.5 0 0 1 2.5-2.5H20v14.5"/>'; break;
    case 'RESTROOM': color = 'slate-500'; svg = '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'; break;
  }
  return `
    <div class="bg-white p-2 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-bounce-slow">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-${color}">
        ${svg}
      </svg>
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
      
      // Initial state
      if (isSatellite) {
        satelliteLayerRef.current.addTo(mapRef.current);
        labelLayerRef.current.addTo(mapRef.current);
      } else {
        streetLayerRef.current.addTo(mapRef.current);
      }

      // Draw static network
      Object.entries(STOP_COORDS).forEach(([nameEn, coord]) => {
        const nameBn = getStopBn(nameEn);
        const networkMarker = L.circleMarker(coord, {
          radius: 5,
          fillColor: '#ffffff',
          color: BRAND_BLUE,
          weight: 2,
          opacity: 1,
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
      userMarker.bindPopup("<div class='font-black text-slate-900'>আপনি এখানে আছেন</div>");
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
        
        marker.bindPopup(`<b>${stopBn}</b><br/>${selectedBusRoute.name} এর স্টপেজ।`);
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
        marker.bindPopup(`<b>${fromBn}</b><br/>${seg.description}`);
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
          const lastMarker = L.marker(seg.toCoord, {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-white border-4 border-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-2xl transform -translate-x-1/2 -translate-y-1/2 scale-110 z-[3000]">
                       <div class="w-6 h-6 rounded-full bg-red-500 animate-pulse"></div>
                     </div>`,
              iconSize: [0, 0]
            }),
            zIndexOffset: 1800
          }).addTo(mapRef.current);
          lastMarker.on('click', (e: any) => {
             L.DomEvent.stopPropagation(e);
             onStopSelect(seg.to, seg.toCoord);
          });
          lastMarker.bindPopup(`<b>${toBn}</b> (গন্তব্য)`);
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
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLoc([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    const startInput = origin || (userLoc as [number, number]);
    const endInput = destination;
    if (!startInput || !endInput) {
      setIsSearching(false);
      return;
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
    const guidance = await getTravelGuidance(origin || "আপনার অবস্থান", destination, trip);
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

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden md:flex-row text-slate-900">
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, -50%) translateY(-5%); }
          50% { transform: translate(-50%, -50%) translateY(5%); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite ease-in-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* Mobile View Switcher */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] flex bg-white rounded-full shadow-2xl border border-slate-200 p-1">
        <button onClick={() => setActiveView('list')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'list' ? 'bg-[#003566] text-white shadow-lg' : 'text-slate-500'}`}><List className="w-4 h-4" /> রুট লিস্ট</button>
        <button onClick={() => setActiveView('map')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'map' ? 'bg-[#003566] text-white shadow-lg' : 'text-slate-500'}`}><MapIcon className="w-4 h-4" /> ম্যাপ ভিউ</button>
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
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">স্মার্ট ট্রানজিট অ্যাসিস্ট্যান্ট</p>
          </div>
        </header>

        {/* Sidebar Tabs */}
        <div className="flex border-b border-slate-100 flex-shrink-0">
          <button onClick={() => setSidebarTab('search')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${sidebarTab === 'search' ? 'border-[#003566] text-[#003566]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>রুট খুজুন</button>
          <button onClick={() => setSidebarTab('routes')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${sidebarTab === 'routes' ? 'border-[#003566] text-[#003566]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>সবগুলো বাস</button>
        </div>

        <div className="p-4 md:p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {sidebarTab === 'search' ? (
            <>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative space-y-3">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">শুরুস্থান</label>
                    <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-[#003566] transition-all shadow-sm">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                      <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                        <option value="">আমার অবস্থান (অটো)</option>
                        {UNIQUE_STOPS_PAIRS.map(pair => <option key={pair.en} value={pair.en}>{pair.bn}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">গন্তব্য</label>
                    <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-red-600 transition-all shadow-sm">
                      <Search className="w-4 h-4 text-red-500 shrink-0" />
                      <select value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                        <option value="">গন্তব্য নির্বাচন করুন...</option>
                        {UNIQUE_STOPS_PAIRS.map(pair => <option key={pair.en} value={pair.en}>{pair.bn}</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={handleSearch} disabled={!destination && !isSearching} style={{ backgroundColor: BRAND_BLUE }} className="w-full hover:opacity-95 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm mt-2">
                    {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                    ভ্রমণ নির্দেশিকা তৈরি করুন
                  </button>
                </div>
              </div>

              <div className="space-y-3 pb-24 md:pb-5">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">রুট ফলাফল</h2>
                {results.map(trip => (
                  <button key={trip.id} onClick={() => selectTrip(trip)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all block group ${selectedTrip?.id === trip.id ? 'border-[#003566] bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md ${trip.totalTransfers === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {trip.totalTransfers === 0 ? 'সরাসরি বাস' : 'বাস পরিবর্তন'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#003566] transition-colors" />
                    </div>
                    <h3 className="font-black text-slate-800 text-base">{trip.summary}</h3>
                    <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-slate-500">
                      <span className="flex items-center gap-1.5"><MapIcon className="w-3.5 h-3.5" /> {trip.segments.length} ধাপ</span>
                      <span style={{ color: BRAND_BLUE }}>৳৩০ - ৯০ আনুমানিক ভাড়া</span>
                    </div>
                  </button>
                ))}
                {results.length === 0 && !isSearching && (
                  <div className="text-center py-16 px-10">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bus className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">রুট খুজতে উপরে শুরু এবং শেষ স্থান দিন। আমরা আপনাকে সেরা বাসটি সাজেস্ট করব।</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3 pb-24 md:pb-5">
              <div className="px-1 flex justify-between items-center mb-1">
                 <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">ঢাকার বাস রুটসমূহ ({BUS_DATA.length})</h2>
              </div>
              <div className="grid gap-2.5">
                {BUS_DATA.map(bus => (
                  <button 
                    key={bus.name} 
                    onClick={() => handleBusRouteSelect(bus)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 group ${selectedBusRoute?.name === bus.name ? 'border-[#003566] bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Bus className="w-5 h-5 text-[#003566]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800">{bus.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{bus.description}</p>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-full bg-slate-50 text-slate-300 group-hover:text-[#003566] group-hover:bg-white transition-all">
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
        
        {/* Map Layer Toggle Button */}
        <button 
          onClick={() => setIsSatellite(!isSatellite)}
          className="absolute top-6 right-16 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white z-[1800] hover:bg-white transition-all group flex items-center gap-2"
        >
          <Layers className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black text-slate-800 hidden md:block">
            {isSatellite ? 'মানচিত্র ভিউ' : 'স্যাটেলাইট ভিউ'}
          </span>
        </button>

        {/* Selected Bus Info Bar (Top of Map) */}
        {selectedBusRoute && (
          <div className="absolute top-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[450px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-5 z-[1800] flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-200/50">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">{selectedBusRoute.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{selectedBusRoute.stops.length} টি স্টপেজ</span>
                   <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                   <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">পুরো রুট ম্যাপ</span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedBusRoute(null)} className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Selected Stop / Amenity Panel */}
        {selectedStopName && (
          <div className="absolute top-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-5 z-[1800] animate-in fade-in slide-in-from-left-4 duration-500 max-h-[80vh] flex flex-col">
             <div className="flex justify-between items-center mb-4 flex-shrink-0">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-800 text-white rounded-xl shadow-md">
                    <MapPinned className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{getStopBn(selectedStopName)}</h4>
                   <p className="text-[10px] text-slate-500 font-bold">আশেপাশের প্রয়োজনীয় স্থান</p>
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
                    <p className="text-xs font-bold">এই স্টপেজের আশেপাশে কোনো তথ্য পাওয়া যায়নি।</p>
                 </div>
               )}
             </div>

             <div className="mt-4 pt-4 border-t border-slate-100 flex-shrink-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">ডেটা ডেমো হিসেবে দেখানো হচ্ছে</p>
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
                  <h2 className="font-black text-slate-900 text-lg md:text-xl tracking-tight">ভ্রমণ গাইড (বিস্তারিত পরিকল্পনা)</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">এআই চালিত ভ্রমণ সহকারী</p>
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
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter text-center line-clamp-1">{getStopBn(seg.from)}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{seg.type === 'WALK' ? 'হাঁটা' : seg.type === 'RICKSHAW' ? 'রিকশা' : 'বাস'}</span>
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
                    <h3 className="font-black text-slate-800 text-base mb-1">এআই পরামর্শ তৈরি করছে</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tight leading-relaxed">আপনার জন্য সেরা রুট, ভাড়া এবং যাতায়াতের সঠিক গাইডলাইন প্রস্তুত হচ্ছে...</p>
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
                  <h4 className="text-sm font-black text-orange-900 mb-1">প্রো-টিপস (পরামর্শ)</h4>
                  <p className="text-xs text-orange-800 font-medium leading-relaxed">
                    উপরের ম্যাপের যেকোনো <strong>স্টপ আইকনে</strong> ক্লিক করে সেই জায়গার আশেপাশে থাকা মসজিদ, স্কুল বা ফার্মেসির লোকেশন ম্যাপে দেখে নিতে পারেন। জ্যাম থাকলে বা কোনো বিশেষ ল্যান্ডমার্ক খুজতে এটি বেশ সাহায্য করবে।
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
