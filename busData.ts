
import { BusRoute, Amenity, AmenityType } from './types';

export const BUS_DATA: BusRoute[] = [
  { name: "৬ নম্বর", description: "গাবতলী থেকে সদরঘাট", totalStops: 12, stops: ["গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "শিশু মেলা", "কলেজ গেট", "আসাদ গেট", "কলাবাগান", "সায়েন্স ল্যাব", "নিউ মার্কেট", "আজিমপুর", "সদরঘাট"], stopsEn: ["Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Shishu Mela", "College Gate", "Asad Gate", "Kalabagan", "Science Lab", "New Market", "Azimpur", "Sadarghat"] },
  { name: "অচিম পরিবহন", description: "গাবতলী থেকে ডেমরা", totalStops: 18, stops: ["গাবতলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "যমুনা ফিউচার পার্ক", "বসুন্ধরা", "নদ্দা", "নতুন বাজার", "বাড্ডা", "রামপুরা", "বনশ্রী", "স্টাফ কোয়ার্টার"], stopsEn: ["Gabtoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "JFP", "Bashundhara", "Nadda", "Notun Bazar", "Badda", "Rampura", "Banasree", "Staff Quarter"] },
  { name: "অ্যাক্টিভ পরিবহন", description: "শিয়া মসজিদ থেকে আব্দুল্লাহপুর", totalStops: 15, stops: ["শিয়া মসজিদ", "শ্যামলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Shia Masjid", "Shyamoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "অগ্রদূত", description: "সাভার থেকে নতুন বাজার", totalStops: 14, stops: ["সাভার", "হেমায়েতপুর", "গাবতলী", "শ্যামলী", "আগারগাঁও", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Savar", "Hemayetpur", "Gabtoli", "Shyamoli", "Agargaon", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "আজমেরী গ্লোরি", description: "সদরঘাট থেকে গাজীপুর", totalStops: 16, stops: ["সদরঘাট", "গুলিস্তান", "পল্টন", "কাকরাইল", "মগবাজার", "মহাখালী", "বনানী", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর চৌরাস্তা"], stopsEn: ["Sadarghat", "Gulistan", "Paltan", "Kakrail", "Moghbazar", "Mohakhali", "Banani", "Khilkhet", "Airport", "Uttara", "Tongi", "Gazipur Chourasta"] },
  { name: "আলিফ (রুট ১)", description: "মিরপুর ১ থেকে বনানী", totalStops: 12, stops: ["মিরপুর ১", "মিরপুর ১০", "আগারগাঁও", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "গুলশান ১", "বনানী"], stopsEn: ["Mirpur 1", "Mirpur 10", "Agargaon", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Gulshan 1", "Banani"] },
  { name: "অনাবিল সুপার", description: "সাইনবোর্ড থেকে গাজীপুর", totalStops: 18, stops: ["সাইনবোর্ড", "যাত্রাবাড়ী", "বিশ্বরোড", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Signboard", "Jatrabari", "Bishwa Road", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "আজিমপুর ট্রান্সপোর্ট", description: "আজিমপুর থেকে আব্দুল্লাহপুর", totalStops: 14, stops: ["আজিমপুর", "নিউ মার্কেট", "সায়েন্স ল্যাব", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "আব্দুল্লাহপুর"], stopsEn: ["Azimpur", "New Market", "Science Lab", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Khilkhet", "Airport", "Abdullahpur"] },
  { name: "বলাকা", description: "সদরঘাট থেকে গাজীপুর", totalStops: 17, stops: ["সদরঘাট", "গুলিস্তান", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Sadarghat", "Gulistan", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Khilkhet", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "বিকাশ", description: "আজিমপুর থেকে গাজীপুর", totalStops: 20, stops: ["আজিমপুর", "সায়েন্স ল্যাব", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Azimpur", "Science Lab", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Khilkhet", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "বিকল্প", description: "মিরপুর ১২ থেকে মতিঝিল", totalStops: 10, stops: ["মিরপুর ১২", "মিরপুর ১০", "কাজীপাড়া", "শেওড়াপাড়া", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Mirpur 12", "Mirpur 10", "Kazipara", "Shewrapara", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "দেশ বাংলা", description: "গাবতলী থেকে যাত্রাবাড়ী", totalStops: 12, stops: ["গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "মতিঝিল", "যাত্রাবাড়ী"], stopsEn: ["Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Motijheel", "Jatrabari"] },
  { name: "মিডলাইন", description: "মোহাম্মদপুর থেকে নতুন বাজার", totalStops: 12, stops: ["মোহাম্মদপুর", "ধানমন্ডি", "সায়েন্স ল্যাব", "শাহবাগ", "মগবাজার", "মালিবাগ", "রামপুরা", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Mohammadpur", "Dhanmondi", "Science Lab", "Shahbagh", "Moghbazar", "Malibagh", "Rampura", "Badda", "Notun Bazar"] },
  { name: "প্রজাপতি", description: "মোহাম্মদপুর থেকে আব্দুল্লাহপুর", totalStops: 15, stops: ["মোহাম্মদপুর", "শ্যামলী", "মিরপুর ১", "মিরপুর ১০", "কালসী", "ইসিবি চত্বর", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Mohammadpur", "Shyamoli", "Mirpur 1", "Mirpur 10", "Kalshi", "ECB Square", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "রাইদা", description: "পোস্তগোলা থেকে দিয়াবাড়ি", totalStops: 18, stops: ["পোস্তগোলা", "যাত্রাবাড়ী", "বিশ্বরোড", "মালিবাগ", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "বিমানবন্দর", "উত্তরা", "দিয়াবাড়ি"], stopsEn: ["Postogola", "Jatrabari", "Bishwa Road", "Malibagh", "Rampura", "Badda", "Notun Bazar", "Kuril", "Airport", "Uttara", "Diabari"] },
  { name: "রজনীগন্ধা", description: "বসিলা থেকে নতুন বাজার", totalStops: 14, stops: ["বসিলা", "মোহাম্মদপুর", "আসাদ গেট", "ফার্মগেট", "মহাখালী", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Basila", "Mohammadpur", "Asad Gate", "Farmgate", "Mohakhali", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "ভিক্টর ক্লাসিক", description: "সদরঘাট থেকে আব্দুল্লাহপুর", totalStops: 19, stops: ["সদরঘাট", "গুলিস্তান", "পল্টন", "মগবাজার", "রামপুরা", "বাড্ডা", "নতুন বাজার", "কুড়িল", "খিলক্ষেত", "বিমানবন্দর", "উত্তরা", "আব্দুল্লাহপুর"], stopsEn: ["Sadarghat", "Gulistan", "Paltan", "Moghbazar", "Rampura", "Badda", "Notun Bazar", "Kuril", "Khilkhet", "Airport", "Uttara", "Abdullahpur"] },
  { name: "আবীর পরিবহন", description: "গাবতলী থেকে যাত্রাবাড়ী", totalStops: 14, stops: ["গাবতলী", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী"], stopsEn: ["Gabtoli", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Jatrabari"] },
  { name: "বাহন", description: "মিরপুর থেকে সদরঘাট", totalStops: 15, stops: ["মিরপুর", "কালসী", "কুড়িল", "বাড্ডা", "রামপুরা", "মালিবাগ", "মতিঝিল", "সদরঘাট"], stopsEn: ["Mirpur", "Kalshi", "Kuril", "Badda", "Rampura", "Malibagh", "Motijheel", "Sadarghat"] },
  { name: "বসুন্ধরা পরিবহন", description: "গাবতলী থেকে গাজীপুর", totalStops: 16, stops: ["গাবতলী", "মিরপুর ১০", "কালসী", "কুড়িল", "বিমানবন্দর", "উত্তরা", "টঙ্গী", "গাজীপুর"], stopsEn: ["Gabtoli", "Mirpur 10", "Kalshi", "Kuril", "Airport", "Uttara", "Tongi", "Gazipur"] },
  { name: "ভুঁইয়া পরিবহন", description: "নারায়ণগঞ্জ থেকে মতিঝিল", totalStops: 10, stops: ["নারায়ণগঞ্জ", "চাষাড়া", "সাইনবোর্ড", "যাত্রাবাড়ী", "মতিঝিল"], stopsEn: ["Narayanganj", "Chashara", "Signboard", "Jatrabari", "Motijheel"] },
  { name: "সিটি লিংক", description: "চট্টগ্রাম রোড থেকে গুলিস্তান", totalStops: 8, stops: ["চট্টগ্রাম রোড", "সাইনবোর্ড", "যাত্রাবাড়ী", "সায়েদাবাদ", "গুলিস্তান"], stopsEn: ["Chittagong Road", "Signboard", "Jatrabari", "Sayedabad", "Gulistan"] },
  { name: "দেওয়ান পরিবহন", description: "আজিমপুর থেকে গাজীপুর", totalStops: 18, stops: ["আজিমপুর", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী", "কুড়িল", "বিমানবন্দর", "টঙ্গী", "গাজীপুর"], stopsEn: ["Azimpur", "Shahbagh", "Farmgate", "Mohakhali", "Banani", "Kuril", "Airport", "Tongi", "Gazipur"] },
  { name: "দুরন্ত", description: "মিরপুর থেকে মতিঝিল", totalStops: 12, stops: ["মিরপুর", "মিরপুর ১০", "আগারগাঁও", "ফার্মগেট", "শাহবাগ", "পল্টন", "মতিঝিল"], stopsEn: ["Mirpur", "Mirpur 10", "Agargaon", "Farmgate", "Shahbagh", "Paltan", "Motijheel"] },
  { name: "এলিট", description: "সাভার থেকে মতিঝিল", totalStops: 12, stops: ["সাভার", "গাবতলী", "শ্যামলী", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Savar", "Gabtoli", "Shyamoli", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "ফাল্গুন পরিবহন", description: "আজিমপুর থেকে বনানী", totalStops: 10, stops: ["আজিমপুর", "নিউ মার্কেট", "সায়েন্স ল্যাব", "শাহবাগ", "ফার্মগেট", "মহাখালী", "বনানী"], stopsEn: ["Azimpur", "New Market", "Science Lab", "Shahbagh", "Farmgate", "Mohakhali", "Banani"] },
  { name: "গ্রিন ঢাকা", description: "মিরপুর থেকে নদ্দা", totalStops: 10, stops: ["মিরপুর", "কালসী", "কুড়িল", "যমুনা ফিউচার পার্ক", "বসুন্ধরা", "নদ্দা"], stopsEn: ["Mirpur", "Kalshi", "Kuril", "JFP", "Bashundhara", "Nadda"] },
  { name: "হিমাচল পরিবহন", description: "মিরপুর থেকে গুলশান", totalStops: 12, stops: ["মিরপুর", "মিরপুর ১০", "আগারগাঁও", "মহাখালী", "গুলশান ১", "গুলশান ২"], stopsEn: ["Mirpur", "Mirpur 10", "Agargaon", "Mohakhali", "Gulshan 1", "Gulshan 2"] },
  { name: "কনক", description: "গাবতলী থেকে যাত্রাবাড়ী", totalStops: 14, stops: ["গাবতলী", "শ্যামলী", "আসাদ গেট", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী"], stopsEn: ["Gabtoli", "Shyamoli", "Asad Gate", "Shahbagh", "Gulistan", "Jatrabari"] },
  { name: "লাব্বাইক পরিবহন", description: "সাভার থেকে মতিঝিল", totalStops: 14, stops: ["সাভার", "গাবতলী", "শ্যামলী", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "মতিঝিল"], stopsEn: ["Savar", "Gabtoli", "Shyamoli", "Asad Gate", "Science Lab", "Shahbagh", "Motijheel"] },
  { name: "মিরপুর লিংক", description: "মিরপুর থেকে মতিঝিল", totalStops: 12, stops: ["মিরপুর", "মিরপুর ১০", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Mirpur", "Mirpur 10", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "মৈত্রী পরিবহন", description: "মোহাম্মদপুর থেকে সায়েদাবাদ", totalStops: 12, stops: ["মোহাম্মদপুর", "আসাদ গেট", "সায়েন্স ল্যাব", "শাহবাগ", "গুলিস্তান", "সায়েদাবাদ"], stopsEn: ["Mohammadpur", "Asad Gate", "Science Lab", "Shahbagh", "Gulistan", "Sayedabad"] },
  { name: "নীলাচল", description: "গাজীপুর থেকে সদরঘাট", totalStops: 18, stops: ["গাজীপুর", "টঙ্গী", "বিমানবন্দর", "বনানী", "মহাখালী", "শাহবাগ", "গুলিস্তান", "সদরঘাট"], stopsEn: ["Gazipur", "Tongi", "Airport", "Banani", "Mohakhali", "Shahbagh", "Gulistan", "Sadarghat"] },
  { name: "সেফটি", description: "মিরপুর থেকে সায়েদাবাদ", totalStops: 14, stops: ["মিরপুর", "মিরপুর ১০", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "সায়েদাবাদ"], stopsEn: ["Mirpur", "Mirpur 10", "Farmgate", "Shahbagh", "Gulistan", "Sayedabad"] },
  { name: "শিকর পরিবহন", description: "মিরপুর থেকে যাত্রাবাড়ী", totalStops: 15, stops: ["মিরপুর", "মিরপুর ১০", "ফার্মগেট", "শাহবাগ", "গুলিস্তান", "যাত্রাবাড়ী"], stopsEn: ["Mirpur", "Mirpur 10", "Farmgate", "Shahbagh", "Gulistan", "Jatrabari"] },
  { name: "স্কাইলাইন", description: "মিরপুর থেকে মতিঝিল", totalStops: 12, stops: ["মিরপুর", "কাজীপাড়া", "ফার্মগেট", "শাহবাগ", "মতিঝিল"], stopsEn: ["Mirpur", "Kazipara", "Farmgate", "Shahbagh", "Motijheel"] },
  { name: "তুরাগ পরিবহন", description: "যাত্রাবাড়ী থেকে টঙ্গী", totalStops: 16, stops: ["যাত্রাবাড়ী", "খিলগাঁও", "রামপুরা", "বাড্ডা", "কুড়িল", "বিমানবন্দর", "টঙ্গী"], stopsEn: ["Jatrabari", "Khilgaon", "Rampura", "Badda", "Kuril", "Airport", "Tongi"] },
  { name: "উইনার", description: "মোহাম্মদপুর থেকে ডেমরা", totalStops: 12, stops: ["মোহাম্মদপুর", "সায়েন্স ল্যাব", "শাহবাগ", "মগবাজার", "মালিবাগ", "খিলগাঁও", "বাসাবো", "ডেমরা"], stopsEn: ["Mohammadpur", "Science Lab", "Shahbagh", "Moghbazar", "Malibagh", "Khilgaon", "Basabo", "Demra"] }
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
  "Gulshan 2": [23.7925, 90.4162],
  "Gulistan": [23.7230, 90.4100],
  "Paltan": [23.7300, 90.4100],
  "Kakrail": [23.7400, 90.4100],
  "Moghbazar": [23.7490, 90.4020],
  "Banani": [23.7940, 90.4043],
  "Tongi": [23.8814, 90.4005],
  "Gazipur Chourasta": [23.9999, 90.4203],
  "Gazipur": [23.9999, 90.4203],
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
  "Sayedabad": [23.7180, 90.4320],
  "Chashara": [23.6200, 90.4950],
  "Narayanganj": [23.6238, 90.5000],
  "Chittagong Road": [23.6950, 90.5050],
  "Mirpur": [23.8050, 90.3650]
};

export const STOP_NAME_MAP: Record<string, string> = {};
BUS_DATA.forEach(bus => {
  bus.stopsEn.forEach((en, i) => {
    STOP_NAME_MAP[en] = bus.stops[i];
  });
});

export const getStopBn = (en: string) => STOP_NAME_MAP[en] || en;

export const UNIQUE_STOPS_PAIRS = Array.from(new Set(BUS_DATA.flatMap(bus => 
  bus.stopsEn.map((en, i) => JSON.stringify({ en, bn: bus.stops[i] }))
))).map(s => JSON.parse(s) as { en: string, bn: string }).sort((a, b) => a.bn.localeCompare(b.bn));

export const UNIQUE_STOPS = UNIQUE_STOPS_PAIRS.map(p => p.en);

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
