
import { BusRoute, Amenity, AmenityType } from './types';

export const BUS_DATA: BusRoute[] = [
  { name: "Achim Paribahan", description: "Gabtoli to Demra", totalStops: 20, stops: ["গাবতলী", "টেকনিক্যাল", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "যমুনা ফিউচার পার্ক", "বসুন্ধরা", "নতুন বাজার", "বাড্ডা", "রামপুরা", "বনশ্রী", "স্টাফ কোয়ার্টার"], stopsEn: ["Gabtoli", "Technical", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "JFP", "Bashundhara", "Notun Bazar", "Badda", "Rampura", "Banasree", "Staff Quarter"] },
  { name: "Active Paribahan", description: "Shia Masjid to Abdullahpur", totalStops: 18, stops: ["শিয়া মসজিদ", "শ্যামলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Shia Masjid", "Shyamoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "Agradut", description: "Savar to Notun Bazar", totalStops: 17, stops: ["সাভার", "হেমায়েতপুর", "গাবতলী", "শ্যামলী", "আগারগাঁও", "বিজয় সরণি", "মহাখালী", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Savar", "Hemayetpur", "Gabtoli", "Shyamoli", "Agargaon", "Bijoy Sarani", "Mohakhali", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "Airport Bangabandhu Avenue", description: "Fulbaria to Abdullahpur", totalStops: 19, stops: ["ফুলবাড়িয়া", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Fulbaria", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "Azmeri Glory", description: "Sadarghat to Gazipur", totalStops: 20, stops: ["সদরঘাট", "গুলিস্তান", "পল্টন", "মগবাজার", "মহাখালী", "বনানী", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর চৌরাস্তা"], stopsEn: ["Sadarghat", "Gulistan", "Paltan", "Moghbazar", "Mohakhali", "Banani", "Airport", "Uttara", "Tongi", "Gazipur Chourasta"] },
  { name: "Ajmi", description: "Dhamrai to Motijheel", totalStops: 18, stops: ["ধামরাই", "সাভার", "গাবতলী", "শ্যামলী", "আসাদ গেট", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "মতিঝিল"], stopsEn: ["Dhamrai", "Savar", "Gabtoli", "Shyamoli", "Asad Gate", "Farmgate", "Shahbagh", "Gulistan", "Motijheel"] },
  { name: "Akash", description: "Kanchpur to Abdullahpur", totalStops: 17, stops: ["কাঁচপুর", "যাত্রাবাড়ী", "মুগদা", "খিলগাঁও", "রামপুরা", "বাড্ডা", "কুড়িল", "বিমানবন্দর", "আব্দুল্লাহপুর"], stopsEn: ["Kanchpur", "Jatrabari", "Mugda", "Khilgaon", "Rampura", "Badda", "Kuril", "Airport", "Abdullahpur"] },
  { name: "Akik", description: "Ansar Camp to Sayedabad", totalStops: 15, stops: ["আনসার ক্যাম্প", "মিরপুর ১", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "সায়েদাবাদ"], stopsEn: ["Ansar Camp", "Mirpur 1", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Sayedabad"] },
  { name: "Al Makka", description: "Gabtoli to Sadarghat", totalStops: 16, stops: ["গাবতলী", "টেকনিক্যাল", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "নিউ মার্কেট", "আজিমপুর", "সদরঘাট"], stopsEn: ["Gabtoli", "Technical", "Shyamoli", "Asad Gate", "Science Lab", "New Market", "Azimpur", "Sadarghat"] },
  { name: "Al Madina Plus One", description: "Narayanganj to Gabtoli", totalStops: 19, stops: ["নারায়ণগঞ্জ", "চাষাড়া", "সাইনবোর্ড", "যাত্রাবাড়ী", "গুলিস্তান", "শাহবাগ", "ফার্মগেট", "শ্যামলী", "গাবতলী"], stopsEn: ["Narayanganj", "Chashara", "Signboard", "Jatrabari", "Gulistan", "Shahbagh", "Farmgate", "Shyamoli", "Gabtoli"] },
  { name: "Alif (Route 1)", description: "Mirpur 1 to Banani", totalStops: 15, stops: ["মিরপুর ১", "মিরপুর ১০", "আগারগাঁও", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "বনানী"], stopsEn: ["Mirpur 1", "Mirpur 10", "Agargaon", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Banani"] },
  { name: "Anabil Super", description: "Signboard to Gazipur", totalStops: 20, stops: ["সাইনবোর্ড", "যাত্রাবাড়ী", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Signboard", "Jatrabari", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "Anik", description: "Azimpur to Tongi", totalStops: 17, stops: ["আজিমপুর", "নিউ মার্কেট", "সায়েন্স ল্যাব", "শাহবাগ", "ফার্মগেট", "মহাখালী", "কুড়িল", "বিমানবন্দর", "টঙ্গী"], stopsEn: ["Azimpur", "New Market", "Science Lab", "Shahbagh", "Farmgate", "Mohakhali", "Kuril", "Airport", "Tongi"] },
  { name: "Bahon", description: "Mirpur to Sadarghat", totalStops: 16, stops: ["মিরপুর", "কালশী", "কুড়িল", "বাড্ডা", "রামপুরা", "মালিবাগ", "পল্টন", "সদরঘাট"], stopsEn: ["Mirpur", "Kalshi", "Kuril", "Badda", "Rampura", "Malibagh", "Paltan", "Sadarghat"] },
  { name: "Balaka", description: "Sadarghat to Gazipur", totalStops: 19, stops: ["সদরঘাট", "গুলিস্তান", "শাহবাগ", "ফার্মগেট", "বনানী", "বিমানবন্দর", "আব্দুল্লাহপুর", "টঙ্গী", "গাজীপুর"], stopsEn: ["Sadarghat", "Gulistan", "Shahbagh", "Farmgate", "Banani", "Airport", "Abdullahpur", "Tongi", "Gazipur"] },
  { name: "Basumati", description: "Gabtoli to Gazipur", totalStops: 18, stops: ["গাবতলী", "মিরপুর ১০", "কালশী", "কুড়িল", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "বোর্ড বাজার", "গাজীপুর"], stopsEn: ["গাবতলী", "Mirpur 10", "Kalshi", "Kuril", "Airport", "Uttara", "Tongi", "Board Bazar", "Gazipur"] },
  { name: "Bikash", description: "Azimpur to Gazipur", totalStops: 20, stops: ["আজিমপুর", "সায়েন্স ল্যাব", "ফার্মগেট", "মহাখালী", "বনানী", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Azimpur", "Science Lab", "Farmgate", "Mohakhali", "Banani", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "Bikolpo", description: "Mirpur 12 to Motijheel", totalStops: 15, stops: ["মিরপুর ১২", "মিরপুর ১০", "কাজীপাড়া", "ফার্মগেট", "শাহবাগ", "প্রেসক্লাব", "মতিঝিল"], stopsEn: ["Mirpur 12", "Mirpur 10", "Kazipara", "Farmgate", "Shahbagh", "Press Club", "Motijheel"] },
  { name: "Borak", description: "Khilgaon to Gabtoli", totalStops: 14, stops: ["খিলগাঁও", "মালিবাগ", "মগবাজার", "কাওরান বাজার", "ফার্মগেট", "আসাদ গেট", "শ্যামলী", "গাবতলী"], stopsEn: ["Khilgaon", "Malibagh", "Moghbazar", "Karwan Bazar", "Farmgate", "Asad Gate", "Shyamoli", "Gabtoli"] },
  { name: "BRTC (AC)", description: "Motijheel to Uttara", totalStops: 12, stops: ["মতিঝিল", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "বিমানবন্দর", "উত্তরা"], stopsEn: ["Motijheel", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Airport", "Uttara"] },
  { name: "City Link", description: "Chittagong Road to Gulistan", totalStops: 13, stops: ["চট্টগ্রাম রোড", "সাইনবোর্ড", "যাত্রাবাড়ী", "সায়েদাবাদ", "গুলিস্তান"], stopsEn: ["Chittagong Road", "Signboard", "Jatrabari", "Sayedabad", "Gulistan"] },
  { name: "Desh Bangla", description: "Gabtoli to Jatrabari", totalStops: 15, stops: ["গাবতলী", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী"], stopsEn: ["Gabtoli", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Jatrabari"] },
  { name: "Dewan", description: "Azimpur to Gazipur", totalStops: 20, stops: ["আজিমপুর", "নিউ মার্কেট", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "বিমানবন্দর", "টঙ্গী", "গাজীপুর"], stopsEn: ["Azimpur", "New Market", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Airport", "Tongi", "Gazipur"] },
  { name: "Deep (Dipon)", description: "Gabtoli to Motijheel", totalStops: 12, stops: ["গাবতলী", "আসাদ গেট", "ফার্মগেট", "শাহবাগ", "প্রেসক্লাব", "মতিঝিল"], stopsEn: ["Gabtoli", "Asad Gate", "Farmgate", "Shahbagh", "Press Club", "Motijheel"] },
  { name: "Duronto", description: "Mirpur to Motijheel", totalStops: 14, stops: ["মিরপুর", "মিরপুর ১০", "আগারগাঁও", "ফার্মগেট", "শাহবাগ", "পল্টন", "মতিঝিল"], stopsEn: ["Mirpur", "Mirpur 10", "Agargaon", "Farmgate", "Shahbagh", "Paltan", "Motijheel"] },
  { name: "Elite (ETC)", description: "Savar to Motijheel", totalStops: 16, stops: ["সাভার", "গাবতলী", "শ্যামলী", "আসাদ গেট", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "মতিঝিল"], stopsEn: ["Savar", "Gabtoli", "Shyamoli", "Asad Gate", "Farmgate", "Shahbagh", "Gulistan", "Motijheel"] },
  { name: "Falgun", description: "Azimpur to Banani", totalStops: 13, stops: ["আজিমপুর", "নিউ মার্কেট", "সায়েন্স ল্যাব", "ফার্মগেট", "মহাখালী", "বনানী"], stopsEn: ["Azimpur", "New Market", "Science Lab", "Farmgate", "Mohakhali", "Banani"] },
  { name: "Green Dhaka", description: "Mirpur to Nadda", totalStops: 14, stops: ["মিরপুর", "মিরপুর ১০", "কালশী", "কুড়িল", "যমুনা ফিউচার পার্ক", "বসুন্ধরা", "নদ্দা"], stopsEn: ["Mirpur", "Mirpur 10", "Kalshi", "Kuril", "JFP", "Bashundhara", "Nadda"] },
  { name: "Himachol", description: "Mirpur to Gulshan", totalStops: 15, stops: ["মিরপুর", "মিরপুর ১০", "আগারগাঁও", "মহাখালী", "গুলশান ১", "গুলশান ২"], stopsEn: ["Mirpur", "Mirpur 10", "Agargaon", "Mohakhali", "Gulshan 1", "Gulshan 2"] },
  { name: "Labbaik", description: "Savar to Motijheel", totalStops: 17, stops: ["সাভার", "গাবতলী", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "মতিঝিল"], stopsEn: ["Savar", "Gabtoli", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Motijheel"] },
  { name: "Midline", description: "Mohammadpur to Notun Bazar", totalStops: 16, stops: ["মোহাম্মদপুর", "ধানমন্ডি", "সায়েন্স ল্যাব", "শাহবাগ", "মগবাজার", "রামপুরা", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Mohammadpur", "Dhanmondi", "Science Lab", "Shahbagh", "Moghbazar", "Rampura", "Badda", "Notun Bazar"] },
  { name: "Mirpur Link", description: "Mirpur to Motijheel", totalStops: 15, stops: ["মিরপুর", "মিরপুর ১০", "কাজীপাড়া", "ফার্মগেট", "শাহবাগ", "প্রেসক্লাব", "মতিঝিল"], stopsEn: ["Mirpur", "Mirpur 10", "Kazipara", "Farmgate", "Shahbagh", "Press Club", "Motijheel"] },
  { name: "Moitri", description: "Mohammadpur to Sayedabad", totalStops: 14, stops: ["মোহাম্মদপুর", "আসাদ গেট", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী", "সায়েদাবাদ"], stopsEn: ["Mohammadpur", "Asad Gate", "Farmgate", "Shahbagh", "Gulistan", "Jatrabari", "Sayedabad"] },
  { name: "Nilachal", description: "Gazipur to Sadarghat", totalStops: 20, stops: ["গাজীপুর", "টঙ্গী", "আব্দুল্লাহপুর", "বিমানবন্দর", "বনানী", "মহাখালী", "শাহবাগ", "গুলিস্তান", "সদরঘাট"], stopsEn: ["Gazipur", "Tongi", "Abdullahpur", "Airport", "Banani", "Mohakhali", "Shahbagh", "Gulistan", "Sadarghat"] },
  { name: "Nur-E-Makka", description: "Mirpur to Gulistan", totalStops: 14, stops: ["মিরপুর", "মিরপুর ১০", "কাজীপাড়া", "শেওড়াপাড়া", "ফার্মগেট", "শাহবাগ", "গুলিস্তান"], stopsEn: ["Mirpur", "Mirpur 10", "Kazipara", "Shewrapara", "Farmgate", "Shahbagh", "Gulistan"] },
  { name: "Projapoti", description: "Mohammadpur to Abdullahpur", totalStops: 18, stops: ["মোহাম্মদপুর", "শ্যামলী", "মিরপুর ১", "মিরপুর ১০", "কালশী", "কুড়িল", "বিমানবন্দর", "আব্দুল্লাহপুর"], stopsEn: ["Mohammadpur", "Shyamoli", "Mirpur 1", "Mirpur 10", "Kalshi", "Kuril", "Airport", "Abdullahpur"] },
  { name: "Raida", description: "Postogola to Diabari", totalStops: 19, stops: ["পোস্তগোলা", "যাত্রাবাড়ী", "রামপুরা", "বাড্ডা", "কুড়িল", "বিমানবন্দর", "উত্তরা", "দিয়াবাড়ি"], stopsEn: ["Postogola", "Jatrabari", "Rampura", "Badda", "Kuril", "Airport", "Uttara", "Diabari"] },
  { name: "Rajanigandha", description: "Basila to Notun Bazar", totalStops: 16, stops: ["বসিলা", "মোহাম্মদপুর", "আসাদ গেট", "ফার্মগেট", "মহাখালী", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Basila", "Mohammadpur", "Asad Gate", "Farmgate", "Mohakhali", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "Safety", description: "Mirpur to Sayedabad", totalStops: 15, stops: ["মিরপুর", "মিরপুর ১০", "আগারগাঁও", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "সায়েদাবাদ"], stopsEn: ["Mirpur", "Mirpur 10", "Agargaon", "Farmgate", "Shahbagh", "Gulistan", "Sayedabad"] },
  { name: "Shikor", description: "Mirpur to Jatrabari", totalStops: 16, stops: ["মিরপুর", "মিরপুর ১০", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী"], stopsEn: ["Mirpur", "Mirpur 10", "Farmgate", "Shahbagh", "Gulistan", "Jatrabari"] },
  { name: "Somoy", description: "Gabtoli to Chittagong Road", totalStops: 18, stops: ["গাবতলী", "শ্যামলী", "আসাদ গেট", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী", "চট্টগ্রাম রোড"], stopsEn: ["Gabtoli", "Shyamoli", "Asad Gate", "Shahbagh", "Gulistan", "Jatrabari", "Chittagong Road"] },
  { name: "Suprobhat", description: "Sadarghat to Gazipur", totalStops: 20, stops: ["সদরঘাট", "গুলিস্তান", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Sadarghat", "Gulistan", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "Thikana", description: "Savar to Sayedabad", totalStops: 17, stops: ["সাভার", "গাবতলী", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "সায়েদাবাদ"], stopsEn: ["Savar", "Gabtoli", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Sayedabad"] },
  { name: "Trans Silva", description: "Mohammadpur to Sayedabad", totalStops: 15, stops: ["মোহাম্মদপুর", "ধানমন্ডি", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী", "সায়েদাবাদ"], stopsEn: ["Mohammadpur", "Dhanmondi", "Science Lab", "Shahbagh", "Gulistan", "Jatrabari", "Sayedabad"] },
  { name: "Turag", description: "Jatrabari to Tongi", totalStops: 18, stops: ["যাত্রাবাড়ী", "মুগদা", "খিলগাঁও", "রামপুরা", "বাড্ডা", "কুড়িল", "বিমানবন্দর", "টঙ্গী"], stopsEn: ["Jatrabari", "Mugda", "Khilgaon", "Rampura", "Badda", "Kuril", "Airport", "Tongi"] },
  { name: "Victor Classic", description: "Sadarghat to Abdullahpur", totalStops: 19, stops: ["সদরঘাট", "গুলিস্তান", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Sadarghat", "Gulistan", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Abdullahpur"] },
  { name: "Welcome", description: "Savar to Motijheel", totalStops: 16, stops: ["সাভার", "গাবতলী", "শ্যামলী", "আসাদ গেট", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Savar", "Gabtoli", "Shyamoli", "Asad Gate", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "Skylark", description: "Mirpur to Motijheel", totalStops: 14, stops: ["মিরপুর", "মিরপুর ১০", "কাজীপাড়া", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Mirpur", "Mirpur 10", "Kazipara", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "Bhuiyan", description: "Narayanganj to Motijheel", totalStops: 12, stops: ["নারায়ণগঞ্জ", "চাষাড়া", "সাইনবোর্ড", "যাত্রাবাড়ী", "মতিঝিল"], stopsEn: ["Narayanganj", "Chashara", "Signboard", "Jatrabari", "Motijheel"] },
  { name: "6 Number", description: "Gabtoli to Sadarghat", totalStops: 15, stops: ["গাবতলী", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "আজিমপুর", "সদরঘাট"], stopsEn: ["Gabtoli", "Shyamoli", "Asad Gate", "Science Lab", "Azimpur", "Sadarghat"] }
];

// List of all unique stops in English for selection
export const UNIQUE_STOPS = Array.from(new Set(BUS_DATA.flatMap(bus => bus.stopsEn))).sort();

// Mock coordinates for major Dhaka intersections (for visual map simulation)
export const STOP_COORDS: Record<string, [number, number]> = {
  "Gabtoli": [23.7845, 90.3444],
  "Mirpur 1": [23.7956, 90.3537],
  "Mirpur 10": [23.8069, 90.3687],
  "Farmgate": [23.7561, 90.3872],
  "Shahbagh": [23.7390, 90.3957],
  "Gulistan": [23.7230, 90.4100],
  "Motijheel": [23.7330, 90.4173],
  "Sadarghat": [23.7050, 90.4080],
  "Uttara": [23.8759, 90.3795],
  "Airport": [23.8517, 90.4005],
  "Banani": [23.7940, 90.4043],
  "Mohakhali": [23.7776, 90.4005],
  "Badda": [23.7800, 90.4250],
  "Kuril": [23.8188, 90.4200],
  "Notun Bazar": [23.7979, 90.4235],
  "Rampura": [23.7612, 90.4208],
  "Jatrabari": [23.7120, 90.4340],
  "Signboard": [23.6930, 90.4730],
  "Tongi": [23.8814, 90.4005],
  "Gazipur": [23.9999, 90.4203],
  "Sayedabad": [23.7180, 90.4320],
  "Science Lab": [23.7375, 90.3833],
  "Shyamoli": [23.7711, 90.3672],
  "Asad Gate": [23.7602, 90.3725],
  "Dhanmondi": [23.7461, 90.3742],
  "Mohammadpur": [23.7658, 90.3582],
  "Agargaon": [23.7770, 90.3750],
  "Azimpur": [23.7300, 90.3850],
  "Basila": [23.7500, 90.3400],
  "Kalshi": [23.8200, 90.3700],
  "ECB Square": [23.8230, 90.3950],
  "JFP": [23.8136, 90.4242],
  "Bashundhara": [23.8190, 90.4300],
  "Banasree": [23.7650, 90.4350],
  "Staff Quarter": [23.7300, 90.4800],
  "Technical": [23.7880, 90.3500],
  "Moghbazar": [23.7490, 90.4020],
  "Paltan": [23.7300, 90.4100],
  "Khilgaon": [23.7500, 90.4250],
  "Mugda": [23.7350, 90.4350],
  "Narayanganj": [23.6238, 90.5000],
  "Chashara": [23.6200, 90.4950],
  "Savara": [23.8500, 90.2600],
  "Hemayetpur": [23.8100, 90.2700],
  "Bijoy Sarani": [23.7600, 90.3900],
  "Gulshan 1": [23.7790, 90.4150],
  "Gulshan 2": [23.7925, 90.4162],
  "Karwan Bazar": [23.7510, 90.3930],
  "Postogola": [23.6900, 90.4300],
  "Diabari": [23.8600, 90.3500],
  "Savar": [23.8500, 90.2600],
  "Malibagh": [23.7500, 90.4150],
  "Press Club": [23.7300, 90.4050],
  "Board Bazar": [23.9500, 90.4100],
  "Chittagong Road": [23.6950, 90.5050],
  "New Market": [23.7333, 90.3833],
  "Dhamrai": [23.9100, 90.2100],
  "Khilkhet": [23.8300, 90.4150],
  "Ansar Camp": [23.7900, 90.3500],
  "Jahangir Gate": [23.7700, 90.3950],
  "Kazipara": [23.7950, 90.3750],
  "Mirpur 12": [23.8150, 90.3650],
  "Shewrapara": [23.7900, 90.3750],
  "Nadda": [23.8100, 90.4200],
  "Shia Masjid": [23.7650, 90.3500]
};

// Function to generate mock nearby amenities for a stop
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
  
  // Seed for consistency based on stop name
  let seed = 0;
  for (let i = 0; i < stopName.length; i++) seed += stopName.charCodeAt(i);

  for (let i = 0; i < 4; i++) {
    const type = types[(seed + i) % types.length];
    const names = banglaNames[type];
    const name = names[(seed * (i + 1)) % names.length];
    
    // Tiny random offset for coordinate
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
