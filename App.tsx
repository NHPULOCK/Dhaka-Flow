
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Bus, Navigation, ArrowRight, Info, Loader2, Map as MapIcon, Compass, UserCircle, Footprints, Bike, ArrowLeftRight, MessageCircle } from 'lucide-react';
import { UNIQUE_STOPS, STOP_COORDS } from './busData';
import { findRoutes } from './services/routingEngine';
import { getTravelGuidance } from './services/geminiService';
import { TripSuggestion, RouteSegment } from './types';

// Leaflet is loaded via script tag in index.html
declare const L: any;

const BUS_COLORS = ['#2563eb', '#9333ea', '#ea580c', '#db2777', '#0891b2'];

const MapComponent: React.FC<{ selectedTrip: TripSuggestion | null, userLoc: [number, number] | null }> = ({ selectedTrip, userLoc }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const layersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([23.8103, 90.4125], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Clear previous markers and layers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    layersRef.current.forEach(l => l.remove());
    layersRef.current = [];

    if (userLoc) {
      const userMarker = L.circleMarker(userLoc, { color: '#3b82f6', fillOpacity: 0.8, radius: 8 }).addTo(mapRef.current);
      userMarker.bindPopup("আপনি এখানে আছেন");
      markersRef.current.push(userMarker);
    }

    if (selectedTrip) {
      let busCount = 0;
      
      selectedTrip.segments.forEach((seg, idx) => {
        let color = '#94a3b8'; // Default Walk/Generic
        if (seg.type === 'BUS') {
          color = BUS_COLORS[busCount % BUS_COLORS.length];
          busCount++;
        } else if (seg.type === 'RICKSHAW') {
          color = '#16a34a';
        }

        // Marker for start of segment
        const isTransfer = idx > 0 && selectedTrip.segments[idx-1].type === 'BUS' && seg.type === 'WALK';
        
        const markerIcon = L.divIcon({
          className: 'custom-div-icon',
          html: isTransfer 
            ? `<div class="bg-white border-2 border-orange-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                 <div class="w-5 h-5 text-orange-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="9" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="15" y2="16"></line></svg>
                 </div>
               </div>`
            : `<div class="bg-white border-2 border-blue-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform -translate-x-1/2 -translate-y-1/2">
                 <div class="w-2.5 h-2.5 rounded-full" style="background: ${color}"></div>
               </div>`,
          iconSize: [0, 0]
        });

        const marker = L.marker(seg.fromCoord, { icon: markerIcon }).addTo(mapRef.current);
        marker.bindPopup(`<b>${seg.from}</b><br/>${seg.description}${isTransfer ? ' (বাস পরিবর্তন করুন)' : ''}`);
        markersRef.current.push(marker);

        // Draw line for segment
        const line = L.polyline([seg.fromCoord, seg.toCoord], { 
          color, 
          weight: seg.type === 'BUS' ? 6 : 4, 
          dashArray: seg.type === 'BUS' ? null : '10, 10',
          opacity: 0.9 
        }).addTo(mapRef.current);
        layersRef.current.push(line);
        
        // Final destination marker
        if (idx === selectedTrip.segments.length - 1) {
          const lastMarker = L.marker(seg.toCoord, {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-white border-2 border-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                       <div class="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
                     </div>`,
              iconSize: [0, 0]
            })
          }).addTo(mapRef.current);
          lastMarker.bindPopup(`<b>${seg.to}</b> (গন্তব্য)`);
          markersRef.current.push(lastMarker);
        }
      });

      const group = L.featureGroup([...markersRef.current, ...layersRef.current]);
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [selectedTrip, userLoc]);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[400px]" />;
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
    
    if (!startInput || !endInput) return;

    const routes = findRoutes(startInput, endInput);
    setResults(routes);
    setSelectedTrip(null);
    setAiGuidance('');
    setIsSearching(false);
  };

  const selectTrip = async (trip: TripSuggestion) => {
    setSelectedTrip(trip);
    setIsAiLoading(true);
    const guidance = await getTravelGuidance(origin || "আপনার অবস্থান", destination, trip);
    setAiGuidance(guidance);
    setIsAiLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[450px] bg-white border-r border-slate-200 shadow-xl z-20 flex flex-col h-full">
        <header className="p-6 bg-blue-600 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">ঢাকা ফ্লো</h1>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-widest">স্মার্ট ট্রানজিট প্যাকেজ</p>
            </div>
          </div>
        </header>

        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">আপনার অবস্থান (শুরু)</label>
              <div className="flex items-center gap-3 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-blue-500 transition-all shadow-sm">
                <MapPin className="w-5 h-5 text-blue-500" />
                <select 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer"
                >
                  <option value="">বর্তমান অবস্থান (স্বয়ংক্রিয়)</option>
                  {UNIQUE_STOPS.map(stop => <option key={stop} value={stop}>{stop}</option>)}
                </select>
                {userLoc && <UserCircle className="w-4 h-4 text-green-500" />}
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">গন্তব্য (কোথায় যাবেন?)</label>
              <div className="flex items-center gap-3 bg-white px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-red-500 transition-all shadow-sm">
                <Search className="w-5 h-5 text-red-500" />
                <select 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer"
                >
                  <option value="">গন্তব্য নির্বাচন করুন...</option>
                  {UNIQUE_STOPS.map(stop => <option key={stop} value={stop}>{stop}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSearch}
              disabled={!destination && !isSearching}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
              ভ্রমণ নির্দেশিকা তৈরি করুন
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">উপলব্ধ রুটসমূহ</h2>
            {results.length === 0 && !isSearching && origin && destination && (
              <p className="text-center text-slate-400 py-10 text-sm">কোনো সরাসরি রুট পাওয়া যায়নি।</p>
            )}
            {results.map(trip => (
              <div 
                key={trip.id}
                onClick={() => selectTrip(trip)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTrip?.id === trip.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 text-[10px] font-black uppercase rounded-md ${trip.totalTransfers === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {trip.totalTransfers === 0 ? 'সরাসরি বাস' : 'বাস পরিবর্তন'}
                  </span>
                  <Bus className="w-5 h-5 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-800">{trip.summary}</h3>
                <div className="flex items-center gap-4 mt-3 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1"><MapIcon className="w-3 h-3" /> {trip.segments.length} টি ধাপ</span>
                  <span className="flex items-center gap-1"><Info className="w-3 h-3" /> আনুমানিক ৳৩০ - ৮০</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map & AI Package Content */}
      <div className="flex-1 flex flex-col h-full bg-slate-100">
        <div className="relative flex-1">
          <MapComponent selectedTrip={selectedTrip} userLoc={userLoc} />
          
          {selectedTrip && (
            <div className="absolute bottom-6 left-6 right-6 md:left-1/2 md:translate-x-[-50%] md:w-[650px] bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 z-[1000] overflow-y-auto max-h-[50vh]">
              <div className="flex items-center justify-between mb-4 border-b pb-4 border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 rounded-2xl">
                    <Compass className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-800 text-lg">আপনার পূর্ণাঙ্গ ভ্রমণ প্যাকেজ</h2>
                    <p className="text-xs text-slate-500 font-medium">এআই-চালিত উন্নত গাইডলাইন</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTrip(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-500 rotate-90 md:rotate-0" />
                </button>
              </div>

              {/* Segment Flow Icons with Details */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto py-2 scrollbar-hide">
                {selectedTrip.segments.map((seg, i) => {
                  const isBus = seg.type === 'BUS';
                  const isRickshaw = seg.type === 'RICKSHAW';
                  const isLast = i === selectedTrip.segments.length - 1;
                  return (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center min-w-[100px] text-center">
                        <div className={`p-3 rounded-2xl mb-1 relative ${
                          seg.type === 'BUS' ? 'bg-blue-100 text-blue-600' : 
                          seg.type === 'RICKSHAW' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                        }`} style={isBus ? {backgroundColor: `${BUS_COLORS[i % BUS_COLORS.length]}20`, color: BUS_COLORS[i % BUS_COLORS.length]} : {}}>
                          {seg.type === 'BUS' ? <Bus className="w-5 h-5" /> : 
                           seg.type === 'RICKSHAW' ? <Bike className="w-5 h-5" /> : <Footprints className="w-5 h-5" />}
                          
                          {seg.distanceKm && (
                            <div className="absolute -top-1 -right-1 bg-white border border-slate-200 rounded-md px-1 py-0.5 text-[8px] font-black text-slate-600 shadow-sm">
                              {seg.distanceKm.toFixed(1)}km
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{seg.type === 'WALK' ? 'হাঁটা' : seg.type === 'RICKSHAW' ? 'রিকশা' : 'বাস'}</span>
                        {seg.busName && <span className="text-[9px] font-black text-slate-800 truncate max-w-[90px] mt-0.5">{seg.busName}</span>}
                      </div>
                      {!isLast && (
                        <div className="flex items-center shrink-0 px-1">
                          {selectedTrip.segments[i+1].type === 'WALK' && isBus ? 
                            <ArrowLeftRight className="w-4 h-4 text-orange-400" /> : 
                            <ArrowRight className="w-4 h-4 text-slate-300" />
                          }
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {isAiLoading ? (
                <div className="space-y-4 py-4">
                  <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded w-4/6 animate-pulse"></div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>এআই আপনার জন্য রিকশা ভাড়া এবং সেরা পথ খুজছে...</span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -top-3 left-4 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">
                    AI Travel Tips
                  </div>
                  <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                    {aiGuidance}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-orange-800 mb-1">প্রয়োজনীয় টিপস:</h4>
                  <p className="text-orange-700 leading-snug">রিকশা ভাড়া করার সময় অবশ্যই "মামা" বলে সম্বোধন করবেন এবং গন্তব্যের নাম পরিষ্কার করে বলবেন। ভিড়ের মধ্যে মোবাইল সাবধানে রাখবেন।</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
