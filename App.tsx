
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Bus, Navigation, ArrowRight, Info, Loader2, Map as MapIcon, Compass, UserCircle, Footprints, Bike, ArrowLeftRight, MessageCircle, X, List, Pill, Coffee, Building, GraduationCap, School } from 'lucide-react';
import { UNIQUE_STOPS, STOP_COORDS, getNearbyAmenities } from './busData';
import { findRoutes } from './services/routingEngine';
import { getTravelGuidance } from './services/geminiService';
import { TripSuggestion, RouteSegment, Amenity, AmenityType } from './types';

// Leaflet is loaded via script tag in index.html
declare const L: any;

const BRAND_GREEN = '#004b23'; 
const BRAND_BLUE = '#003566';  
const BRAND_ORANGE = '#ff7b00'; 
const BUS_COLORS = [BRAND_BLUE, '#16a34a', BRAND_ORANGE, '#db2777', '#0891b2'];

const AmenityIcon = ({ type }: { type: AmenityType }) => {
  switch (type) {
    case 'PHARMACY': return <Pill className="w-3.5 h-3.5 text-red-600" />;
    case 'FOOD': return <Coffee className="w-3.5 h-3.5 text-orange-600" />;
    case 'MOSQUE': return <Building className="w-3.5 h-3.5 text-green-700" />;
    case 'COLLEGE': return <GraduationCap className="w-3.5 h-3.5 text-blue-700" />;
    case 'SCHOOL': return <School className="w-3.5 h-3.5 text-indigo-600" />;
    case 'RESTROOM': return <Info className="w-3.5 h-3.5 text-slate-600" />;
    default: return <MapPin className="w-3.5 h-3.5" />;
  }
};

const MapComponent: React.FC<{ 
  selectedTrip: TripSuggestion | null, 
  userLoc: [number, number] | null,
  onStopSelect: (name: string, coord: [number, number]) => void
}> = ({ selectedTrip, userLoc, onStopSelect }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const layersRef = useRef<any[]>([]);
  const amenityMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([23.8103, 90.4125], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
    }

    // Clear previous
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    layersRef.current.forEach(l => l.remove());
    layersRef.current = [];
    amenityMarkersRef.current.forEach(m => m.remove());
    amenityMarkersRef.current = [];

    if (userLoc) {
      const userMarker = L.circleMarker(userLoc, { color: BRAND_BLUE, fillOpacity: 0.8, radius: 8 }).addTo(mapRef.current);
      userMarker.bindPopup("আপনি এখানে আছেন");
      markersRef.current.push(userMarker);
    }

    if (selectedTrip) {
      let busCount = 0;
      
      selectedTrip.segments.forEach((seg, idx) => {
        let color = '#94a3b8';
        if (seg.type === 'BUS') {
          color = BUS_COLORS[busCount % BUS_COLORS.length];
          busCount++;
        } else if (seg.type === 'RICKSHAW') {
          color = '#16a34a';
        }

        const isTransfer = idx > 0 && selectedTrip.segments[idx-1].type === 'BUS' && seg.type === 'WALK';
        
        const markerIcon = L.divIcon({
          className: 'custom-div-icon',
          html: isTransfer 
            ? `<div class="bg-white border-2 border-orange-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer scale-125">
                 <div class="w-5 h-5 text-orange-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="9" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="15" y2="16"></line></svg>
                 </div>
               </div>`
            : `<div class="bg-white border-2 border-blue-900 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                 <div class="w-2.5 h-2.5 rounded-full" style="background: ${color}"></div>
               </div>`,
          iconSize: [0, 0]
        });

        const marker = L.marker(seg.fromCoord, { icon: markerIcon }).addTo(mapRef.current);
        marker.on('click', () => onStopSelect(seg.from, seg.fromCoord));
        marker.bindPopup(`<b>${seg.from}</b><br/>${seg.description}<br/><span class="text-blue-600 font-bold text-[10px] cursor-pointer">আশেপাশের জায়গা দেখতে ক্লিক করুন</span>`);
        markersRef.current.push(marker);

        const line = L.polyline([seg.fromCoord, seg.toCoord], { 
          color, 
          weight: seg.type === 'BUS' ? 6 : 4, 
          dashArray: seg.type === 'BUS' ? null : '10, 10',
          opacity: 0.9 
        }).addTo(mapRef.current);
        layersRef.current.push(line);
        
        if (idx === selectedTrip.segments.length - 1) {
          const lastMarker = L.marker(seg.toCoord, {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-white border-2 border-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 scale-110">
                       <div class="w-4 h-4 rounded-full bg-red-600 animate-pulse"></div>
                     </div>`,
              iconSize: [0, 0]
            })
          }).addTo(mapRef.current);
          lastMarker.on('click', () => onStopSelect(seg.to, seg.toCoord));
          lastMarker.bindPopup(`<b>${seg.to}</b> (গন্তব্য)`);
          markersRef.current.push(lastMarker);
        }
      });

      const group = L.featureGroup([...markersRef.current, ...layersRef.current]);
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [selectedTrip, userLoc]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default function App() {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);
  const [results, setResults] = useState<TripSuggestion[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<TripSuggestion | null>(null);
  const [aiGuidance, setAiGuidance] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');
  const [activeAmenities, setActiveAmenities] = useState<Amenity[]>([]);
  const [selectedStopName, setSelectedStopName] = useState<string | null>(null);

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
    setAiGuidance('');
    setActiveAmenities([]);
    setSelectedStopName(null);
    setIsSearching(false);
    setActiveView('list');
  };

  const selectTrip = async (trip: TripSuggestion) => {
    setSelectedTrip(trip);
    setActiveAmenities([]);
    setSelectedStopName(null);
    setActiveView('map');
    setIsAiLoading(true);
    const guidance = await getTravelGuidance(origin || "আপনার অবস্থান", destination, trip);
    setAiGuidance(guidance);
    setIsAiLoading(false);
  };

  const handleStopSelect = (name: string, coord: [number, number]) => {
    const amenities = getNearbyAmenities(coord, name);
    setActiveAmenities(amenities);
    setSelectedStopName(name);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden md:flex-row">
      {/* Mobile View Switcher */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] flex bg-white rounded-full shadow-2xl border border-slate-200 p-1">
        <button onClick={() => setActiveView('list')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'list' ? 'bg-[#003566] text-white shadow-lg' : 'text-slate-500'}`}><List className="w-4 h-4" /> রুট লিস্ট</button>
        <button onClick={() => setActiveView('map')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'map' ? 'bg-[#003566] text-white shadow-lg' : 'text-slate-500'}`}><MapIcon className="w-4 h-4" /> ম্যাপ ভিউ</button>
      </div>

      {/* Sidebar Panel */}
      <div className={`w-full md:w-[450px] bg-white border-r border-slate-200 shadow-xl z-[1500] flex flex-col h-full transition-transform duration-300 md:translate-x-0 ${activeView === 'map' ? 'hidden md:flex' : 'flex'}`}>
        <header className="px-5 py-6 bg-white border-b border-slate-100 flex-shrink-0 flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
             {/* Logo Representation strictly matching the image provided */}
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
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">SMART TRANSIT ASSISTANT</p>
          </div>
        </header>

        <div className="p-4 md:p-5 space-y-4 overflow-y-auto flex-1">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="relative space-y-3">
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">START POINT</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-[#003566] transition-all shadow-sm">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                  <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                    <option value="">আমার অবস্থান (Auto)</option>
                    {UNIQUE_STOPS.map(stop => <option key={stop} value={stop}>{stop}</option>)}
                  </select>
                </div>
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">DESTINATION</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-red-600 transition-all shadow-sm">
                  <Search className="w-4 h-4 text-red-500 shrink-0" />
                  <select value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                    <option value="">গন্তব্য নির্বাচন করুন...</option>
                    {UNIQUE_STOPS.map(stop => <option key={stop} value={stop}>{stop}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleSearch} disabled={!destination && !isSearching} style={{ backgroundColor: BRAND_BLUE }} className="w-full hover:opacity-90 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                ভ্রমণ নির্দেশিকা তৈরি করুন
              </button>
            </div>
          </div>

          <div className="space-y-3 pb-24 md:pb-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">রুট রেজাল্টস</h2>
            {results.map(trip => (
              <button key={trip.id} onClick={() => selectTrip(trip)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all block ${selectedTrip?.id === trip.id ? 'border-[#003566] bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md ${trip.totalTransfers === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {trip.totalTransfers === 0 ? 'Direct Bus' : 'Bus Connection'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{trip.summary}</h3>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-500">
                  <span className="flex items-center gap-1"><MapIcon className="w-3 h-3" /> {trip.segments.length} Steps</span>
                  <span style={{ color: BRAND_BLUE }}>৳৩০ - ৯০ আনুমানিক</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className={`flex-1 flex flex-col h-full bg-slate-100 relative ${activeView === 'list' ? 'hidden md:flex' : 'flex'}`}>
        <MapComponent selectedTrip={selectedTrip} userLoc={userLoc} onStopSelect={handleStopSelect} />
        
        {/* Nearby Amenities Overlay */}
        {selectedStopName && activeAmenities.length > 0 && (
          <div className="absolute top-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white p-4 z-[1800] animate-in fade-in slide-in-from-top-4 duration-300">
             <div className="flex justify-between items-center mb-3">
               <div>
                 <h4 className="font-black text-slate-800 text-xs uppercase tracking-tight">{selectedStopName}</h4>
                 <p className="text-[10px] text-slate-500 font-bold">আশেপাশের প্রয়োজনীয় স্থানসমূহ</p>
               </div>
               <button onClick={() => {setSelectedStopName(null); setActiveAmenities([]);}} className="p-1 hover:bg-slate-100 rounded-full transition-colors"><X className="w-4 h-4 text-slate-400" /></button>
             </div>
             <div className="space-y-2">
               {activeAmenities.map(amenity => (
                 <div key={amenity.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-default">
                   <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                      <AmenityIcon type={amenity.type} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-800">{amenity.name}</p>
                     <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{amenity.description}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* AI Bottom Sheet */}
        {selectedTrip && (
          <div className="absolute bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[650px] bg-white rounded-t-3xl md:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] p-5 md:p-6 border border-slate-200 z-[2500] flex flex-col overflow-hidden max-h-[75vh] md:max-h-[60vh]">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 md:hidden"></div>
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div style={{ backgroundColor: BRAND_BLUE }} className="p-2 rounded-xl text-white"><Compass className="w-5 h-5" /></div>
                <div>
                  <h2 className="font-black text-slate-800 text-base md:text-lg">ভ্রমণ গাইড (Travel Package)</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">AI Generated Assistant</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrip(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
              <div className="flex items-center gap-2 mb-6 overflow-x-auto py-3 scrollbar-hide shrink-0 px-1">
                {selectedTrip.segments.map((seg, i) => (
                  <React.Fragment key={i}>
                    <button onClick={() => handleStopSelect(seg.from, seg.fromCoord)} className="flex flex-col items-center min-w-[90px] relative transition-transform active:scale-95 group">
                      <div className={`p-3 rounded-2xl mb-1 shadow-sm transition-all group-hover:shadow-md ${seg.type === 'BUS' ? 'bg-blue-100 text-blue-800' : seg.type === 'RICKSHAW' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`} style={seg.type === 'BUS' ? {backgroundColor: `${BUS_COLORS[i % BUS_COLORS.length]}15`, color: BUS_COLORS[i % BUS_COLORS.length]} : {}}>
                        {seg.type === 'BUS' ? <Bus className="w-5 h-5" /> : seg.type === 'RICKSHAW' ? <Bike className="w-5 h-5" /> : <Footprints className="w-5 h-5" />}
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase">{seg.type === 'WALK' ? 'হাঁটা' : seg.type === 'RICKSHAW' ? 'রিকশা' : 'বাস'}</span>
                    </button>
                    {i < selectedTrip.segments.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300 mx-1" />}
                  </React.Fragment>
                ))}
              </div>

              {isAiLoading ? (
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-3 text-blue-800 bg-blue-50/80 p-5 rounded-2xl border border-blue-100 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-bold text-sm">এআই আপনার জন্য সেরা রুট সাজাচ্ছে...</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-sm leading-relaxed text-slate-700 whitespace-pre-wrap prose prose-slate max-w-none">
                  <div className="font-medium">{aiGuidance}</div>
                </div>
              )}

              <div style={{ borderColor: `${BRAND_ORANGE}30`, backgroundColor: `${BRAND_ORANGE}05` }} className="mt-5 p-4 rounded-2xl border flex gap-3">
                <MessageCircle style={{ color: BRAND_ORANGE }} className="w-5 h-5 shrink-0 mt-0.5" />
                <p style={{ color: BRAND_BLUE }} className="text-[11px] font-bold leading-snug">
                  <strong>ম্যাপ টিপস:</strong> উপরের কোনো স্টপ আইকনে ক্লিক করে সেই জায়গার আশেপাশে থাকা মসজিদ, স্কুল বা ফার্মেসির লোকেশন ম্যাপে দেখে নিতে পারেন।
                </p>
              </div>
              <div className="h-10 md:hidden"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
