
import { BusRoute, Amenity, AmenityType } from './types';

export const BUS_DATA: BusRoute[] = [
  { name: "6 Number", description: "Gabtoli to Sadarghat", totalStops: 12, stops: ["গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "শিশু মেলা", "কলেজ গেট", "আসাদ গেট", "কলাবাগান", "সায়েন্স ল্যাব", "নিউ মার্কেট", "আজিমপুর", "সদরঘাট"], stopsEn: ["Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Shishu Mela", "College Gate", "Asad Gate", "Kalabagan", "Science Lab", "New Market", "Azimpur", "Sadarghat"] },
  { name: "Achim Paribahan", description: "Gabtoli to Demra", totalStops: 18, stops: ["গাবতলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "যমুনা ফিউচার পার্ক", "বসুন্ধরা", "নদ্দা", "নতুন বাজার", "বাড্ডা", "রামপুরা", "বনশ্রী", "স্টাফ কোয়ার্টার"], stopsEn: ["Gabtoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "JFP", "Bashundhara", "Nadda", "Notun Bazar", "Badda", "Rampura", "Banasree", "Staff Quarter"] },
  { name: "Active Paribahan", description: "Shia Masjid to Abdullahpur", totalStops: 15, stops: ["শিয়া মসজিদ", "শ্যামলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Shia Masjid", "Shyamoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "Agradut", description: "Savar to Notun Bazar", totalStops: 14, stops: ["সাভার", "হেমায়েতপুর", "গাবতলী", "শ্যামলী", "আগারগাঁও", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Savar", "Hemayetpur", "Gabtoli", "Shyamoli", "Agargaon", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "Ajmeri Glory", description: "Sadarghat to Gazipur", totalStops: 16, stops: ["সদরঘাট", "গুলিস্তান", "পল্টন", "কাকরাইল", "মগবাজার", "মহাখালী", "বনানী", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর চৌরাস্তা"], stopsEn: ["Sadarghat", "Gulistan", "Paltan", "Kakrail", "Moghbazar", "Mohakhali", "Banani", "Khilkhet", "Airport", "Uttara", "Tongi", "Gazipur Chourasta"] },
  { name: "Alif (Route 1)", description: "Mirpur 1 to Banani", totalStops: 12, stops: ["মিরপুর ১", "মিরপুর ১০", "আগারগাঁও", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "গুলশান ১", "বনানী"], stopsEn: ["Mirpur 1", "Mirpur 10", "Agargaon", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Gulshan 1", "Banani"] },
  { name: "Anabil Super", description: "Signboard to Gazipur", totalStops: 18, stops: ["সাইনবোর্ড", "যাত্রাবাড়ী", "বিশ্বরোড", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Signboard", "Jatrabari", "Bishwa Road", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "Azimpur Transport", description: "Azimpur to Abdullahpur", totalStops: 14, stops: ["আজিমপুর", "নিউ মার্কেট", "সায়েন্স ল্যাব", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "আব্দুল্লাহপুর"], stopsEn: ["Azimpur", "New Market", "Science Lab", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Khilkhet", "Airport", "Abdullahpur"] },
  { name: "Balaka", description: "Sadarghat to Gazipur", totalStops: 17, stops: ["সদরঘাট", "গুলিস্তান", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Sadarghat", "Gulistan", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Khilkhet", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "Bikash", description: "Azimpur to Gazipur", totalStops: 20, stops: ["আজিমপুর", "সায়েন্স ল্যাব", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Azimpur", "Science Lab", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Khilkhet", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "Bikolpo", description: "Mirpur 12 to Motijheel", totalStops: 10, stops: ["মিরপুর ১২", "মিরপুর ১০", "কাজীপাড়া", "শেওড়াপাড়া", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Mirpur 12", "Mirpur 10", "Kazipara", "Shewrapara", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "Desh Bangla", description: "Gabtoli to Jatrabari", totalStops: 12, stops: ["গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "মতিঝিল", "যাত্রাবাড়ী"], stopsEn: ["Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Motijheel", "Jatrabari"] },
  { name: "Midline", description: "Mohammadpur to Notun Bazar", totalStops: 12, stops: ["মোহাম্মদপুর", "ধানমন্ডি", "সায়েন্স ল্যাব", "শাহবাগ", "মগবাজার", "মালিবাগ", "রামপুরা", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Mohammadpur", "Dhanmondi", "Science Lab", "Shahbagh", "Moghbazar", "Malibagh", "Rampura", "Badda", "Notun Bazar"] },
  { name: "Projapoti", description: "Mohammadpur to Abdullahpur", totalStops: 15, stops: ["মোহাম্মদপুর", "শ্যামলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Mohammadpur", "Shyamoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "Raida", description: "Postogola to Diabari", totalStops: 18, stops: ["পোস্তগোলা", "যাত্রাবাড়ী", "বিশ্বরোড", "মালিবাগ", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "দিয়াবাড়ি"], stopsEn: ["Postogola", "Jatrabari", "Bishwa Road", "Malibagh", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Diabari"] },
  { name: "Rajanigandha", description: "Basila to Notun Bazar", totalStops: 14, stops: ["বসিলা", "মোহাম্মদপুর", "আসাদ গেট", "ফার্মগেট", "মহাখালী", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Basila", "Mohammadpur", "Asad Gate", "Farmgate", "Mohakhali", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "Victor Classic", description: "Sadarghat to Abdullahpur", totalStops: 19, stops: ["সদরঘাট", "গুলিস্তান", "পল্টন", "মগবাজার", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Sadarghat", "Gulistan", "Paltan", "Moghbazar", "Rampura", "Badda", "Notun Bazar", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "Winner", description: "Mohammadpur to Demra", totalStops: 12, stops: ["মোহাম্মদপুর", "সায়েন্স ল্যাব", "শাহবাগ", "মগবাজার", "মালিবাগ", "খিলগাঁও", "বাসাবো", "ডেমরা"], stopsEn: ["Mohammadpur", "Science Lab", "Shahbagh", "Moghbazar", "Malibagh", "Khilgaon", "Basabo", "Demra"] }
];

export const STOP_COORDS: Record<string, [number, number]> = {
  "Gabtoli": [23.7845, 90.3444],
  "Technical": [23.7885, 90.3505],
  "Kallyanpur": [23.7840, 90.3565],
  "Shyamoli": [23.7711, 90.3672],
  "Shishu Mela": [23.7685, 90.3695],
  "College Gate": [23.7645, 90.3715],
  "Asad Gate": [23.7602, 90.3725],
  "Kalabagan": [23.7515, 90.3805],
  "Science Lab": [23.7375, 90.3833],
  "New Market": [23.7333, 90.3833],
  "Azimpur": [23.7300, 90.3850],
  "Sadarghat": [23.7050, 90.4080],
  "Mirpur 1": [23.7956, 90.3537],
  "Mirpur 10": [23.8069, 90.3687],
  "Mirpur 12": [23.8210, 90.3630],
  "Kalshi": [23.8200, 90.3700],
  "ECB Square": [23.8230, 90.3950],
  "Kuril": [23.8188, 90.4200],
  "JFP": [23.8136, 90.4242],
  "Bashundhara": [23.8190, 90.4300],
  "Nadda": [23.8100, 90.4200],
  "Notun Bazar": [23.7979, 90.4235],
  "Badda": [23.7800, 90.4250],
  "Rampura": [23.7612, 90.4208],
  "Banasree": [23.7650, 90.4350],
  "Staff Quarter": [23.7300, 90.4800],
  "Shia Masjid": [23.7650, 90.3500],
  "Khilkhet": [23.8300, 90.4150],
  "Airport": [23.8517, 90.4005],
  "Uttara": [23.8759, 90.3795],
  "Abdullahpur": [23.8900, 90.3900],
  "Savar": [23.8500, 90.2600],
  "Hemayetpur": [23.8100, 90.2700],
  "Agargaon": [23.7770, 90.3750],
  "Bijoy Sarani": [23.7600, 90.3900],
  "Jahangir Gate": [23.7700, 90.3950],
  "Mohakhali": [23.7776, 90.4005],
  "Gulshan 1": [23.7790, 90.4150],
  "Gulistan": [23.7230, 90.4100],
  "Paltan": [23.7300, 90.4100],
  "Kakrail": [23.7400, 90.4100],
  "Moghbazar": [23.7490, 90.4020],
  "Banani": [23.7940, 90.4043],
  "Tongi": [23.8814, 90.4005],
  "Gazipur Chourasta": [23.9999, 90.4203],
  "Jatrabari": [23.7120, 90.4340],
  "Bishwa Road": [23.7250, 90.4400],
  "Shahbagh": [23.7390, 90.3957],
  "Farmgate": [23.7561, 90.3872],
  "Kazipara": [23.7950, 90.3750],
  "Shewrapara": [23.7900, 90.3750],
  "Motijheel": [23.7330, 90.4173],
  "Mohammadpur": [23.7658, 90.3582],
  "Dhanmondi": [23.7461, 90.3742],
  "Malibagh": [23.7500, 90.4150],
  "Postogola": [23.6900, 90.4300],
  "Diabari": [23.8600, 90.3500],
  "Basila": [23.7500, 90.3400],
  "Khilgaon": [23.7500, 90.4250],
  "Basabo": [23.7450, 90.4350],
  "Demra": [23.7200, 90.4800],
  "Signboard": [23.6930, 90.4730],
  "Sayedabad": [23.7180, 90.4320]
};

export const UNIQUE_STOPS = Array.from(new Set(BUS_DATA.flatMap(bus => bus.stopsEn))).sort();

export const getNearbyAmenities = (coord: [number, number], stopName: string): Amenity[] => {
  const types: AmenityType[] = ['PHARMACY', 'FOOD', 'RESTROOM', 'SCHOOL', 'COLLEGE', 'MOSQUE'];
  const banglaNames: Record<AmenityType, string[]> = {
    PHARMACY: ['লাজ ফার্মা', 'মেডিক্স ফার্মা', 'জনতা ড্রাগ হাউস', 'শাপলা ফার্মেসি'],
    FOOD: ['হাজী বিরিয়ানি', 'ক্যাফে ঝিলিক', 'ঢাকা কনফেকশনারি', 'ফুড ভিলা'],
    RESTROOM: ['পাবলিক টয়লেট', 'কমিউনিটি ওয়াশ রুম'],
    SCHOOL: ['আদর্শ উচ্চ বিদ্যালয়', 'প্রগতি পাঠশালা', 'ল্যাবরেটরি হাই স্কুল'],
    COLLEGE: ['ঢাকা সিটি কলেজ', 'গভ: মডেল কলেজ', 'আইডিয়াল কলেজ'],
    MOSQUE: ['বায়তুল আমান জামে মসজিদ', 'খানকা শরীফ মসজিদ', 'কেন্দ্রীয় জামে মসজিদ']
  };

  const amenities: Amenity[] = [];
  let seed = 0;
  for (let i = 0; i < stopName.length; i++) seed += stopName.charCodeAt(i);

  for (let i = 0; i < 4; i++) {
    const type = types[(seed + i) % types.length];
    const names = banglaNames[type];
    const name = names[(seed * (i + 1)) % names.length];
    const latOffset = (Math.sin(seed + i) * 0.001);
    const lngOffset = (Math.cos(seed + i) * 0.001);

    amenities.push({
      id: `amenity-${stopName}-${i}`,
      name: `${name} (${stopName})`,
      type,
      coord: [coord[0] + latOffset, coord[1] + lngOffset],
      description: `${stopName}-এর কাছেই অবস্থিত একটি গুরুত্বপূর্ণ ${type === 'MOSQUE' ? 'মসজিদ' : 'স্থান'}।`
    });
  }
  return amenities;
};
