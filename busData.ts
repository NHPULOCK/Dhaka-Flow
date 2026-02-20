import { BusRoute, Amenity, AmenityType } from './types';

export const BUS_DATA: BusRoute[] = [
  { name: "আছিম পরিবহন", description: "গাবতলী ⇄ ডেমরা স্টাফ কোয়ার্টার", totalStops: 27, stops: ["গাবতলী", "টেকনিক্যাল", "আনসার ক্যাম্প", "মিরপুর ১", "সনি সিনেমা হল", "মিরপুর ২", "মিরপুর ১০", "মিরপুর ১১", "পুরবী", "কালশী", "ইসিবি স্কয়ার", "এমইএস", "শেওড়া", "কুড়িল বিশ্ব রোড", "যমুনা ফিউচার পার্ক", "বসুন্ধরা", "নদ্দা", "নতুন বাজার", "বাঁশতলা", "শাহজাদপুর", "উত্তর বাড্ডা", "বাড্ডা", "মধ্য বাড্ডা", "মেরুল বাড্ডা", "রামপুরা ব্রিজ", "বনশ্রী", "স্টাফ কোয়ার্টার"], stopsEn: ["Gabtoli", "Technical", "Ansar Camp", "Mirpur 1", "Sony Cinema Hall", "Mirpur 2", "Mirpur 10", "Mirpur 11", "Purobi", "Kalshi", "ECB Square", "MES", "Shewra", "Kuril Bishwa Road", "JFP", "Bashundhara", "Nadda", "Notun Bazar", "Bashtola", "Shahjadpur", "Uttar Badda", "Badda", "Madhya Badda", "Merul Badda", "Rampura Bridge", "Banasree", "Staff Quarter"] },
  { name: "এক্টিভ পরিবহন", description: "শিয়া মসজিদ ⇄ আব্দুল্লাহপুর", totalStops: 23, stops: ["শিয়া মসজিদ", "আদাবর", "শ্যামলী", "টেকনিক্যাল", "আনসার ক্যাম্প", "মিরপুর ১", "সনি সিনেমা হল", "মিরপুর ২", "মিরপুর ১০", "মিরপুর ১১", "পুরবী", "কালশী", "ইসিবি স্কয়ার", "এমইএস", "শেওড়াপাড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর"], stopsEn: ["Shia Masjid", "Adabor", "Shyamoli", "Technical", "Ansar Camp", "Mirpur 1", "Sony Cinema Hall", "Mirpur 2", "Mirpur 10", "Mirpur 11", "Purobi", "Kalshi", "ECB Square", "MES", "Shewrapara", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur"] },
  { name: "অগ্রদূত", description: "সাভার ⇄ নতুন বাজার", totalStops: 20, stops: ["সাভার", "হেমায়েতপুর", "আমিন বাজার", "গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "শিশু মেলা", "আগারগাঁও", "জিয়া উদ্যান", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "ওয়্যারলেস", "গুলশান ১", "বাড্ডা লিংক রোড", "বাঁশতলা", "শাহজাদপুর", "উত্তর বাড্ডা", "নতুন বাজার"], stopsEn: ["Savar", "Hemayetpur", "Amin Bazar", "Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Shishu Mela", "Agargaon", "Zia Uddyan", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Wireless", "Gulshan 1", "Badda Link Road", "Bashtola", "Shahjadpur", "Uttar Badda", "Notun Bazar"] },
  { name: "এয়ারপোর্ট বঙ্গবন্ধু এভিনিউ", description: "ফুলবাড়িয়া ⇄ আব্দুল্লাহপুর", totalStops: 29, stops: ["ফুলবাড়িয়া", "গোলাপ শাহ মাজার", "জিপিও", "পল্টন", "প্রেস ক্লাব", "উচ্চ আদালত", "মৎস্য ভবন", "শাহবাগ", "বাংলা মোটর", "কাওরান বাজার", "ফার্মগেট", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "চেয়ারম্যান বাড়ী", "সৈনিক ক্লাব", "বনানী", "কাকলী", "স্টাফ রোড", "এমইএস", "কুর্মিটোলা", "শেওড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর"], stopsEn: ["Fulbaria", "Golap Shah Mazar", "GPO", "Paltan", "Press Club", "High Court", "Matsya Bhaban", "Shahbagh", "Bangla Motor", "Kawran Bazar", "Farmgate", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Chairman Bari", "Sainik Club", "Banani", "Kakali", "Staff Road", "MES", "Kurmitola", "Shewra", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "House Building", "Abdullahpur"] },
  { name: "আজমেরী গ্লোরী", description: "সদরঘাট ⇄ চন্দ্রা", totalStops: 32, stops: ["সদরঘাট", "রায় সাহেব বাজার", "নয়া বাজার", "গোলাপ শাহ মাজার", "জিপিও", "পল্টন", "কাকরাইল", "শান্তিনগর", "মালিবাগ", "মৌচাক", "নাবিস্কো", "মহাখালী", "সৈনিক ক্লাব", "বনানী", "কাকলী", "স্টাফ রোড", "এমইএস", "শেওড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর", "টঙ্গী", "স্টেশন রোড", "মিল গেট", "বোর্ড বাজার", "গাজীপুর বাইপাস", "কোনাবারি", "চন্দ্রা"], stopsEn: ["Sadarghat", "Ray Saheb Bazar", "Naya Bazar", "Golap Shah Mazar", "GPO", "Paltan", "Kakrail", "Shantinagar", "Malibagh", "Mouchak", "Nabisco", "Mohakhali", "Sainik Club", "Banani", "Kakali", "Staff Road", "MES", "Shewra", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur", "Tongi", "Station Road", "Mill Gate", "Board Bazar", "Gazipur Bypass", "Konabari", "Chandra"] },
  { name: "আজমী", description: "ধামরাই ⇄ চট্টগ্রাম রোড", totalStops: 21, stops: ["ধামরাই", "সাভার", "হেমায়েতপুর", "আমিন বাজার", "গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "শিশু মেলা", "কলেজ গেট", "আসাদ গেট", "ধানমন্ডি ২৭", "ধানমন্ডি ৩২", "কলাবাগান", "সিটি কলেজ", "নিউ মার্কেট", "নীলক্ষেত", "আজিমপুর", "বকশী বাজার", "গুলিস্তান", "চট্টগ্রাম রোড"], stopsEn: ["Dhamrai", "Savar", "Hemayetpur", "Amin Bazar", "Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Shishu Mela", "College Gate", "Asad Gate", "Dhanmondi 27", "Dhanmondi 32", "Kalabagan", "City College", "New Market", "Nilkhet", "Azimpur", "Bakshi Bazar", "Gulistan", "Chittagong Road"] },
  { name: "আকাশ", description: "কদমতলী ⇄ টঙ্গী", totalStops: 32, stops: ["কদমতলী", "কেরাণীগঞ্জ", "বাবুবাজার", "নয়া বাজার", "গোলাপ শাহ মাজার", "জিপিও", "পল্টন", "কাকরাইল", "শান্তিনগর", "মালিবাগ", "মৌচাক", "মালিবাগ রেলগেট", "হাজীপাড়া", "রামপুরা বাজার", "মেরুল বাড্ডা", "বাড্ডা", "শাহজাদপুর", "বাঁশতলা", "নতুন বাজার", "নদ্দা", "বসুন্ধরা", "যমুনা ফিউচার পার্ক", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর", "টঙ্গী"], stopsEn: ["Kadamtali", "Keraniganj", "Babubazar", "Naya Bazar", "Golap Shah Mazar", "GPO", "Paltan", "Kakrail", "Shantinagar", "Malibagh", "Mouchak", "Malibagh Railgate", "Hazipara", "Rampura Bazar", "Merul Badda", "Badda", "Shahjadpur", "Bashtola", "Notun Bazar", "Nadda", "Bashundhara", "JFP", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur", "Tongi"] },
  { name: "আল মক্কা", description: "মতিঝিল ⇄ মিরপুর ১", totalStops: 20, stops: ["মতিঝিল", "গুলিস্তান", "জিপিও", "পল্টন", "কাকরাইল", "শান্তিনগর", "মালিবাগ", "মৌচাক", "মগবাজার", "নাবিস্কো", "মহাখালী", "চেয়ারম্যান বাড়ী", "কাকলী", "বনানী", "ইসিবি স্কয়ার", "কালশী", "পুরবী", "মিরপুর ১০", "মিরপুর ২", "মিরপুর ১"], stopsEn: ["Motijheel", "Gulistan", "GPO", "Paltan", "Kakrail", "Shantinagar", "Malibagh", "Mouchak", "Moghbazar", "Nabisco", "Mohakhali", "Chairman Bari", "Kakali", "Banani", "ECB Square", "Kalshi", "Purobi", "Mirpur 10", "Mirpur 2", "Mirpur 1"] },
  { name: "আলিফ (রুট ১)", description: "মিরপুর ১৪ ⇄ নন্দন পার্ক", totalStops: 14, stops: ["মিরপুর ১৪", "মিরপুর ১০", "মিরপুর ২", "সনি সিনেমা হল", "মিরপুর ১", "মাজার রোড", "কোনাবারি", "রূপনগর", "বেড়িবাঁধ", "বিরুলিয়া", "আশুলিয়া", "জিরাবো", "ফ্যান্টাসি কিংডম", "নন্দন পার্ক"], stopsEn: ["Mirpur 14", "Mirpur 10", "Mirpur 2", "Sony Cinema Hall", "Mirpur 1", "Mazar Road", "Konabari", "Rupnagar", "Beribadh", "Birulia", "Ashulia", "Zirabo", "Fantasy Kingdom", "Nandan Park"] },
  { name: "আলিফ (রুট ২)", description: "শিয়া মসজিদ ⇄ বনশ্রী", totalStops: 17, stops: ["শিয়া মসজিদ", "জাপান গার্ডেন সিটি", "আদাবর", "শ্যামলী", "শিশু মেলা", "আগারগাঁও", "জিয়া উদ্যান", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "ওয়্যারলেস", "গুলশান ১", "বাড্ডা লিংক রোড", "মধ্য বাড্ডা", "মেরুল বাড্ডা", "রামপুরা ব্রিজ", "বনশ্রী"], stopsEn: ["Shia Masjid", "Japan Garden City", "Adabor", "Shyamoli", "Shishu Mela", "Agargaon", "Zia Uddyan", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Wireless", "Gulshan 1", "Badda Link Road", "Madhya Badda", "Merul Badda", "Rampura Bridge", "Banasree"] },
  { name: "আলিফ (রুট ৪)", description: "রিং রোড ⇄ আব্দুল্লাহপুর", totalStops: 25, stops: ["রিং রোড", "জাপান গার্ডেন সিটি", "আদাবর", "শ্যামলী", "শিশু মেলা", "আগারগাঁও", "জিয়া উদ্যান", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "চেয়ারম্যান বাড়ী", "সৈনিক ক্লাব", "কাকলী", "বনানী", "স্টাফ রোড", "এমইএস", "শেওড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর"], stopsEn: ["Ring Road", "Japan Garden City", "Adabor", "Shyamoli", "Shishu Mela", "Agargaon", "Zia Uddyan", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Chairman Bari", "Sainik Club", "Kakali", "Banani", "Staff Road", "MES", "Shewra", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur"] },
  { name: "অনাবিল সুপার", description: "সাইন বোর্ড ⇄ গাজীপুর চৌরাস্তা", totalStops: 32, stops: ["সাইন বোর্ড", "শনির আখরা", "যাত্রাবাড়ি", "মুগদাপাড়া", "বাসাবো", "খিলগাঁও", "মালিবাগ রেলগেট", "হাজীপাড়া", "রামপুরা বাজার", "রামপুরা ব্রিজ", "মেরুল বাড্ডা", "উত্তর বাড্ডা", "শাহজাদপুর", "বাঁশতলা", "নতুন বাজার", "নদ্দা", "বসুন্ধরা", "যমুনা ফিউচার পার্ক", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর", "টঙ্গী", "স্টেশন রোড", "মিল গেট", "বোর্ড বাজার", "গাজীপুর বাইপাস", "গাজীপুর চৌরাস্তা"], stopsEn: ["Signboard", "Shonir Akhra", "Jatrabari", "Mugdapara", "Basabo", "Khilgaon", "Malibagh Railgate", "Hazipara", "Rampura Bazar", "Rampura Bridge", "Merul Badda", "Uttar Badda", "Shahjadpur", "Bashtola", "Notun Bazar", "Nadda", "Bashundhara", "JFP", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur", "Tongi", "Station Road", "Mill Gate", "Board Bazar", "Gazipur Bypass", "Gazipur Chourasta"] },
  { name: "বাহন", description: "মিরপুর ১৪ ⇄ বাসাবো", totalStops: 27, stops: ["মিরপুর ১", "মিরপুর ১৪", "মিরপুর ১০", "মিরপুর ২", "আনসার ক্যাম্প", "বাংলা কলেজ", "টেকনিক্যাল", "দারুসসালাম", "কল্যাণপুর", "শ্যামলী", "আসাদ গেট", "ধানমন্ডি ২৭", "ধানমন্ডি ৩২", "কলাবাগান", "সায়েন্স ল্যাব", "কাটাবন", "শাহবাগ", "উচ্চ আদালত", "প্রেস ক্লাব", "পল্টন", "দৈনিক বাংলা মোড়", "মতিঝিল", "আরামবাগ", "কমলাপুর", "মুগদাপাড়া", "খিলগাঁও", "বাসাবো"], stopsEn: ["Mirpur 1", "Mirpur 14", "Mirpur 10", "Mirpur 2", "Ansar Camp", "Bangla College", "Technical", "Darussalam", "Kallyanpur", "Shyamoli", "Asad Gate", "Dhanmondi 27", "Dhanmondi 32", "Kalabagan", "Science Lab", "Katabon", "Shahbagh", "High Court", "Press Club", "Paltan", "Dainik Bangla Moor", "Motijheel", "Arambagh", "Kamalapur", "Mugdapara", "Khilgaon", "Basabo"] },
  { name: "বলাকা", description: "সায়দাবাদ ⇄ গাজীপুর চৌরাস্তা", totalStops: 31, stops: ["সায়দাবাদ", "মানিক নগর", "টিটি পাড়া", "কমলাপুর", "মালিবাগ মোড়", "মৌচাক", "মগবাজার", "সাত রাস্তা", "নাবিস্কো", "মহাখালী", "চেয়ারম্যান বাড়ী", "বনানী", "কাকলী", "স্টাফ রোড", "এমইএস", "শেওড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর", "টঙ্গী", "স্টেশন রোড", "মিল গেট", "বোর্ড বাজার", "গাজীপুর বাইপাস", "গাজীপুর চৌরাস্তা"], stopsEn: ["Sayedabad", "Manik Nagar", "TT Para", "Kamalapur", "Malibag Moor", "Mouchak", "Moghbazar", "Sat rasta", "Nabisco", "Mohakhali", "Chairman Bari", "Banani", "Kakali", "Staff Road", "MES", "Shewra", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur", "Tongi", "Station Road", "Mill Gate", "Board Bazar", "Gazipur Bypass", "Gazipur Chourasta"] },
  { name: "বিহঙ্গ", description: "মিরপুর ১২ ⇄ নতুন বাজার", totalStops: 14, stops: ["মিরপুর ১২", "মিরপুর ১১", "মিরপুর ১০", "কাজীপাড়া", "শেওড়াপাড়া", "আগারগাঁও", "বিজয় সরণি", "জাহাঙ্গীর গেট", "মহাখালী", "ওয়্যারলেস", "গুলশান ব্রিজ", "গুলশান ১", "বাড্ডা", "নতুন বাজার"], stopsEn: ["Mirpur 12", "Mirpur 11", "Mirpur 10", "Kazipara", "Shewrapara", "Agargaon", "Bijoy Sarani", "Jahangir Gate", "Mohakhali", "Wireless", "Gulshan Bridge", "Gulshan 1", "Badda", "Notun Bazar"] },
  { name: "বিকল্প অটো", description: "মিরপুর ১২ ⇄ মতিঝিল", totalStops: 21, stops: ["মিরপুর ১২", "পল্লবী", "পুরবী", "মিরপুর ১১", "মিরপুর ১", "কাজীপাড়া", "শেওড়াপাড়া", "তালতলা", "আগারগাঁও", "বিজয় সরণি", "ফার্মগেট", "কাওরান বাজার", "বাংলা মোটর", "শাহবাগ", "মৎস্য ভবন", "উচ্চ আদালত", "প্রেস ক্লাব", "পল্টন", "জিপিও", "গুলিস্তান", "মতিঝিল"], stopsEn: ["Mirpur 12", "Pallabi", "Purobi", "Mirpur 11", "Mirpur 1", "Kazipara", "Shewrapara", "Taltola", "Agargaon", "Bijoy Sarani", "Farmgate", "Kawran Bazar", "Bangla Motor", "Shahbagh", "Matsya Bhaban", "High Court", "Press Club", "Paltan", "GPO", "Gulistan", "Motijheel"] },
  { name: "বিকাশ", description: "আজিমপুর ⇄ কামারপাড়া", totalStops: 20, stops: ["আজিমপুর", "নীলক্ষেত", "নিউ মার্কেট", "সিটি কলেজ", "কলাবাগান", "ধানমন্ডি ২৭", "ধানমন্ডি ৩২", "খামার বাড়ি", "ফার্মগেট", "জাহাঙ্গীর গেট", "মহাখালী", "সৈনিক ক্লাব", "বনানী", "কাকলী", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "আব্দুল্লাহপুর", "কামারপাড়া"], stopsEn: ["Azimpur", "Nilkhet", "New Market", "City College", "Kalabagan", "Dhanmondi 27", "Dhanmondi 32", "Khamar Bari", "Farmgate", "Jahangir Gate", "Mohakhali", "Sainik Club", "Banani", "Kakali", "Kuril Bishwa Road", "Khilkhet", "Airport", "Abdullahpur", "Kamarpara"] },
  { name: "বোরাক", description: "পলাশী ⇄ মেঘনা ঘাট", totalStops: 5, stops: ["পলাশী", "চট্টগ্রাম রোড", "সোনারগাঁও", "চাষারা", "মেঘনা ঘাট"], stopsEn: ["Palashi", "Chittagong Road", "Sonargaon", "Chasara", "Meghna Ghat"] },
  { name: "বিআরটিসি (রুট ২)", description: "মতিঝিল ⇄ টঙ্গী", totalStops: 26, stops: ["মতিঝিল", "গুলিস্তান", "জিপিও", "পল্টন", "প্রেস ক্লাব", "উচ্চ আদালত", "মৎস্য ভবন", "শাহবাগ", "বাংলা মোটর", "কাওরান বাজার", "ফার্মগেট", "জাহাঙ্গীর গেট", "মহাখালী", "চেয়ারম্যান বাড়ী", "কাকলী", "বনানী", "স্টাফ রোড", "এমইএস", "শেওড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর", "টঙ্গী"], stopsEn: ["Motijheel", "Gulistan", "GPO", "Paltan", "Press Club", "High Court", "Matsya Bhaban", "Shahbagh", "Bangla Motor", "Kawran Bazar", "Farmgate", "Jahangir Gate", "Mohakhali", "Chairman Bari", "Kakali", "Banani", "Staff Road", "MES", "Shewra", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Abdullahpur", "Tongi"] },
  { name: "দেওয়ান", description: "আজিমপুর ⇄ কুড়িল বিশ্ব রোড", totalStops: 26, stops: ["আজিমপুর", "ইডেন কলেজ", "নীলক্ষেত", "নিউ মার্কেট", "সায়েন্স ল্যাব", "সিটি কলেজ", "কাটাবন", "শাহবাগ", "বাংলা মোটর", "কাওরান বাজার", "ফার্মগেট", "জাহাঙ্গীর গেট", "মহাখালী", "ওয়্যারলেস", "গুলশান ১", "বাড্ডা", "বাড্ডা লিংক রোড", "উত্তর বাড্ডা", "শাহজাদপুর", "বাঁশতলা", "নতুন বাজার", "নদ্দা", "বসুন্ধরা", "যমুনা ফিউচার পার্ক", "কুড়িল বিশ্ব রোড"], stopsEn: ["Azimpur", "Eden College", "Nilkhet", "New Market", "Science Lab", "City College", "Katabon", "Shahbagh", "Bangla Motor", "Kawran Bazar", "Farmgate", "Jahangir Gate", "Mohakhali", "Wireless", "Gulshan 1", "Badda", "Badda Link Road", "Uttar Badda", "Shahjadpur", "Bashtola", "Notun Bazar", "Nadda", "Bashundhara", "JFP", "Kuril Bishwa Road"] },
  { name: "হিমাচল", description: "সনি সিনেমা হল ⇄ খিলগাঁও", totalStops: 10, stops: ["সনি সিনেমা হল", "মিরপুর ১০", "কাজীপাড়া", "শেওড়াপাড়া", "মহাখালী", "গুলশান ১", "বাড্ডা", "রামপুরা ব্রিজ", "রামপুরা বাজার", "খিলগাঁও খিদমাহ হাসপাতাল"], stopsEn: ["Sony Cinema Hall", "Mirpur 10", "Kazipara", "Shewrapara", "Mohakhali", "Gulshan 1", "Badda", "Rampura Bridge", "Rampura Bazar", "Khilgaon Khidmah Hospital"] },
  { name: "জাবালে নূর (রুট ১)", description: "মিরপুর ১০ ⇄ আব্দুল্লাহপুর", totalStops: 16, stops: ["মিরপুর ১০", "মিরপুর ১১", "পুরবী", "পল্লবী", "কালশী", "আগারগাঁও", "তালতলা", "শেওড়াপাড়া", "কাজীপাড়া", "কুড়িল বিশ্ব রোড", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর"], stopsEn: ["Mirpur 10", "Mirpur 11", "Purobi", "Pallabi", "Kalshi", "Agargaon", "Taltola", "Shewrapara", "Kazipara", "Kuril Bishwa Road", "Airport", "Jashimuddin", "Rajlakshmi", "House Building", "Abdullahpur"] },
  { name: "লাব্বাইক", description: "সাভার ⇄ সাইন বোর্ড", totalStops: 32, stops: ["সাভার", "হেমায়েতপুর", "আমিন বাজার", "গাবতলী", "টেকনিক্যাল", "কল্যাণপুর", "শ্যামলী", "শিশু মেলা", "কলেজ গেট", "আসাদ গেট", "খামার বাড়ি", "ফার্মগেট", "কাওরান বাজার", "বাংলা মোটর", "মগবাজার", "মৌচাক", "মালিবাগ মোড়", "রাজারবাগ", "খিলগাঁও ফ্লাইওভার", "বাসাবো", "মুগদাপাড়া", "মানিক নগর", "গোলাপবাগ চৌরাস্তা", "সায়দাবাদ", "জনপথ মোড়", "যাত্রাবাড়ি", "কাজলা", "শনির আখরা", "রায়েরবাগ", "মাতুয়াইল", "সাইন বোর্ড"], stopsEn: ["Savar", "Hemayetpur", "Amin Bazar", "Gabtoli", "Technical", "Kallyanpur", "Shyamoli", "Shishu Mela", "College Gate", "Asad Gate", "Khamar Bari", "Farmgate", "Kawran Bazar", "Bangla Motor", "Moghbazar", "Mouchak", "Malibag Moor", "Rajarbag", "Khilgaon flyover", "Basabo", "Mugdapara", "Manik Nagar", "Golapbagh Chowrasta", "Sayedabad", "Janapoth Moor", "Jatrabari", "Kazla", "Shonir Akhra", "Rayerbag", "Matuail", "Signboard"] },
  { name: "মিডলাইন", description: "মোহাম্মদপুর ⇄ খিলগাঁও", totalStops: 19, stops: ["মোহাম্মদপুর", "শঙ্কর", "স্টার কাবাব", "ধানমন্ডি ১৫", "জিগাতোলা", "সিটি কলেজ", "সায়েন্স ল্যাব", "বাটা সিগন্যাল", "শাহবাগ", "মৎস্য ভবন", "উচ্চ আদালত", "প্রেস ক্লাব", "পল্টন", "গুলিস্তান", "মতিঝিল", "আরামবাগ", "কমলাপুর", "বাসাবো", "খিলগাঁও"], stopsEn: ["Mohammadpur", "Shankar", "Star Kabab", "Dhanmondi 15", "Jigatola", "City College", "Science Lab", "Bata Signal", "Shahbagh", "Matsya Bhaban", "High Court", "Press Club", "Paltan", "Gulistan", "Motijheel", "Arambagh", "Kamalapur", "Basabo", "Khilgaon"] },
  { name: "মিরপুর লিংক", description: "ইসিবি স্কয়ার ⇄ আজিমপুর", totalStops: 12, stops: ["ইসিবি স্কয়ার", "মিরপুর ১১", "মিরপুর ১০", "পুরবী", "কাজীপাড়া", "শেওড়াপাড়া", "আগারগাঁও", "খামার বাড়ি", "ধানমন্ডি ২৭", "ধানমন্ডি ৩২", "সিটি কলেজ", "নিউ মার্কেট", "নীলক্ষেত", "আজিমপুর"], stopsEn: ["ECB Square", "Mirpur 11", "Mirpur 10", "Purobi", "Kazipara", "Shewrapara", "Agargaon", "Khamar Bari", "Dhanmondi 27", "Dhanmondi 32", "City College", "New Market", "Nilkhet", "Azimpur"] },
  { name: "প্রজাপতি", description: "বসিলা ⇄ কামারপাড়া", totalStops: 28, stops: ["বসিলা", "মোহাম্মদপুর", "আসাদ গেট", "কলেজ গেট", "শ্যামলী", "কল্যাণপুর", "দারুসসালাম", "টেকনিক্যাল", "বাংলা কলেজ", "আনসার ক্যাম্প", "মিরপুর ১", "মিরপুর ২", "মিরপুর ১০", "মিরপুর ১১", "পুরবী", "কালশী", "ইসিবি স্কয়ার", "এমইএস", "শেওড়া", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "হাউজ বিল্ডিং", "আব্দুল্লাহপুর", "কামারপাড়া"], stopsEn: ["Basila", "Mohammadpur", "Asad Gate", "College Gate", "Shyamoli", "Kallyanpur", "Darussalam", "Technical", "Bangla College", "Ansar Camp", "Mirpur 1", "Mirpur 2", "Mirpur 10", "Mirpur 11", "Purobi", "Kalshi", "ECB Square", "MES", "Shewra", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "House Building", "Abdullahpur", "Kamarpara"] },
  { name: "রাইদা", description: "পোস্তগোলা ⇄ দিয়া বাড়ি", totalStops: 29, stops: ["পোস্তগোলা", "ধলাইড়পাড়", "যাত্রাবাড়ি", "জনপথ মোড়", "সায়দাবাদ", "মুগদাপাড়া", "বাসাবো", "খিলগাঁও", "মালিবাগ রেলগেট", "রামপুরা বাজার", "রামপুরা ব্রিজ", "মেরুল বাড্ডা", "বাড্ডা", "উত্তর বাড্ডা", "Bashtola", "নতুন বাজার", "নদ্দা", "বসুন্ধরা", "যমুনা ফিউচার পার্ক", "কুড়িল চৌরাস্তা", "কুড়িল বিশ্ব রোড", "খিলক্ষেত", "বিমানবন্দর", "জসিমউদ্দিন", "রাজলক্ষ্মী", "আজমপুর", "হাউজ বিল্ডিং", "দিয়া বাড়ি"], stopsEn: ["Postogola", "Dholairpar", "Jatrabari", "Janapoth Moor", "Sayedabad", "Mugdapara", "Basabo", "Khilgaon", "Malibagh Railgate", "Rampura Bazar", "Rampura Bridge", "Merul Badda", "Badda", "Uttar Badda", "Bashtola", "Notun Bazar", "Nadda", "Bashundhara", "JFP", "Kuril Chourasta", "Kuril Bishwa Road", "Khilkhet", "Airport", "Jashimuddin", "Rajlakshmi", "Azampur", "House Building", "Dia Bari"] },
  { name: "রজনীগন্ধা", description: "চট্টগ্রাম রোড ⇄ মোহাম্মদপুর", totalStops: 20, stops: ["চট্টগ্রাম রোড", "সাইন বোর্ড", "মাতুয়াইল", "রায়েরবাগ", "শনির আখরা", "যাত্রাবাড়ি", "সায়দাবাদ", "গুলিস্তান", "জিপিও", "পল্টন", "প্রেস ক্লাব", "উচ্চ আদালত", "শাহবাগ", "বাটা সিগন্যাল", "সায়েন্স ল্যাব", "জিগাতোলা", "ধানমন্ডি", "স্টার কাবাব", "শঙ্কর", "মোহাম্মদপুর"], stopsEn: ["Chittagong Road", "Signboard", "Matuail", "Rayerbag", "Shonir Akhra", "Jatrabari", "Sayedabad", "Gulistan", "GPO", "Paltan", "Press Club", "High Court", "Shahbagh", "Bata Signal", "Science Lab", "Jigatola", "Dhanmondi", "Star Kabab", "Shankar", "Mohammadpur"] },
  { name: "স্বাধীন", description: "বসিলা ⇄ ডেমরা স্টাফ কোয়ার্টার", totalStops: 16, stops: ["বসিলা", "মোহাম্মদপুর", "আসাদ গেট", "খামার বাড়ি", "ফার্মগেট", "কাওরান বাজার", "বাংলা মোটর", "মগবাজার", "মৌচাক", "মালিবাগ রেলগেট", "হাজীপাড়া", "রামপুরা বাজার", "রামপুরা ব্রিজ", "বনশ্রী", "স্টাফ কোয়ার্টার"], stopsEn: ["Basila", "Mohammadpur", "Asad Gate", "Khamar Bari", "Farmgate", "Kawran Bazar", "Bangla Motor", "Moghbazar", "Mouchak", "Malibagh Railgate", "Hazipara", "Rampura Bazar", "Rampura Bridge", "Banasree", "Staff Quarter"] },
  { name: "ভিক্টর ক্লাসিক", description: "সদরঘাট ⇄ কুড়িল বিশ্ব রোড", totalStops: 25, stops: ["সদরঘাট", "রায় সাহেব বাজার", "নয়া বাজার", "গোলাপ শাহ মাজার", "জিপিও", "পল্টন", "কাকরাইল", "শান্তিনগর", "মালিবাগ মোড়", "মৌচাক", "মালিবাগ রেলগেট", "হাজীপাড়া", "রামপুরা বাজার", "রামপুরা ব্রিজ", "মেরুল বাড্ডা", "বাড্ডা", "শাহজাদপুর", "বাঁশতলা", "নতুন বাজার", "নদ্দা", "বসুন্ধরা", "যমুনা ফিউচার পার্ক", "কুড়িল বিশ্ব রোড"], stopsEn: ["Sadarghat", "Ray Saheb Bazar", "Naya Bazar", "Golap Shah Mazar", "GPO", "Paltan", "Kakrail", "Shantinagar", "Malibaag Moor", "Mouchak", "Malibagh Railgate", "Hazipara", "Rampura Bazar", "Rampura Bridge", "Merul Badda", "Badda", "Shahjadpur", "Bashtola", "Notun Bazar", "Nadda", "Bashundhara", "JFP", "Kuril Bishwa Road"] },
  { name: "৯ নম্বর", description: "কলেজ গেট ⇄ মিরপুর ১২", totalStops: 15, stops: ["কলেজ গেট", "শিশু মেলা", "শ্যামলী", "কল্যাণপুর", "দারুসসালাম", "টেকনিক্যাল", "বাংলা কলেজ", "টোলারবাগ", "আনসার ক্যাম্প", "মিরপুর ১", "সনি সিনেমা হল", "মিরপুর ২", "প্রশিকা মোড়", "পল্লবী", "মিরপুর ১২"], stopsEn: ["College Gate", "Shishu Mela", "Shyamoli", "Kallyanpur", "Darussalam", "Technical", "Bangla College", "Tolarbag", "Ansar Camp", "Mirpur 1", "Sony Cinema Hall", "Mirpur 2", "Proshika Moor", "Pallabi", "Mirpur 12"] }
];

export const STOP_COORDS: Record<string, [number, number]> = {
  "Gabtoli": [23.7845, 90.3444],
  "Technical": [23.7885, 90.3505],
  "Ansar Camp": [23.7930, 90.3520],
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
  "Sony Cinema Hall": [23.8040, 90.3630],
  "Mirpur 2": [23.8060, 90.3640],
  "Mirpur 10": [23.8069, 90.3687],
  "Mirpur 11": [23.8120, 90.3680],
  "Mirpur 12": [23.8210, 90.3630],
  "Mirpur 14": [23.8000, 90.3850],
  "Pallabi": [23.8150, 90.3640],
  "Purobi": [23.8160, 90.3670],
  "Kalshi": [23.8200, 90.3700],
  "ECB Square": [23.8230, 90.3950],
  "MES": [23.8200, 90.4100],
  "Shewra": [23.8250, 90.4150],
  "Kuril Bishwa Road": [23.8188, 90.4200],
  "JFP": [23.8136, 90.4242],
  "Bashundhara": [23.8190, 90.4300],
  "Nadda": [23.8100, 90.4200],
  "Notun Bazar": [23.7979, 90.4235],
  "Bashtola": [23.7950, 90.4250],
  "Shahjadpur": [23.7920, 90.4250],
  "Uttar Badda": [23.7880, 90.4250],
  "Badda": [23.7800, 90.4250],
  "Madhya Badda": [23.7840, 90.4250],
  "Merul Badda": [23.7750, 90.4250],
  "Rampura Bridge": [23.7650, 90.4250],
  "Banasree": [23.7650, 90.4350],
  "Staff Quarter": [23.7200, 90.4900],
  "Shia Masjid": [23.7650, 90.3500],
  "Adabor": [23.7700, 90.3500],
  "Khilkhet": [23.8300, 90.4150],
  "Airport": [23.8517, 90.4005],
  "Jashimuddin": [23.8650, 90.3950],
  "Rajlakshmi": [23.8720, 90.3900],
  "Azampur": [23.8800, 90.3880],
  "House Building": [23.8880, 90.3850],
  "Abdullahpur": [23.8950, 90.3850],
  "Savar": [23.8500, 90.2600],
  "Hemayetpur": [23.8100, 90.2700],
  "Amin Bazar": [23.7850, 90.3200],
  "Agargaon": [23.7770, 90.3750],
  "Zia Uddyan": [23.7680, 90.3850],
  "Bijoy Sarani": [23.7600, 90.3900],
  "Jahangir Gate": [23.7700, 90.3950],
  "Mohakhali": [23.7776, 90.4005],
  "Wireless": [23.7780, 90.4100],
  "Gulshan 1": [23.7790, 90.4150],
  "Badda Link Road": [23.7850, 90.4200],
  "Gulistan": [23.7230, 90.4100],
  "GPO": [23.7280, 90.4110],
  "Paltan": [23.7300, 90.4100],
  "Kakrail": [23.7400, 90.4100],
  "Shantinagar": [23.7450, 90.4150],
  "Malibagh": [23.7500, 90.4150],
  "Mouchak": [23.7490, 90.4080],
  "Moghbazar": [23.7490, 90.4020],
  "Nabisco": [23.7650, 90.4000],
  "Sainik Club": [23.7850, 90.4000],
  "Banani": [23.7940, 90.4043],
  "Kakali": [23.8000, 90.4040],
  "Staff Road": [23.8100, 90.4050],
  "Tongi": [23.8814, 90.4005],
  "Station Road": [23.8950, 90.4000],
  "Mill Gate": [23.9050, 90.4000],
  "Board Bazar": [23.9300, 90.4050],
  "Gazipur Bypass": [23.9700, 90.4150],
  "Konabari": [23.9900, 90.2800],
  "Chandra": [24.0100, 90.2500],
  "Dhamrai": [23.9200, 90.2200],
  "Dhanmondi 27": [23.7550, 90.3750],
  "Dhanmondi 32": [23.7500, 90.3770],
  "Bakshi Bazar": [23.7250, 90.3950],
  "Chittagong Road": [23.6950, 90.5050],
  "Kadamtali": [23.7050, 90.4250],
  "Keraniganj": [23.7150, 90.3800],
  "Babubazar": [23.7130, 90.4000],
  "Malibagh Railgate": [23.7550, 90.4180],
  "Hazipara": [23.7580, 90.4200],
  "Rampura Bazar": [23.7612, 90.4208],
  "Motijheel": [23.7330, 90.4173],
  "Ray Saheb Bazar": [23.7120, 90.4100],
  "Naya Bazar": [23.7180, 90.4100],
  "Golap Shah Mazar": [23.7230, 90.4100],
  "Signboard": [23.6930, 90.4730],
  "Shonir Akhra": [23.7050, 90.4550],
  "Jatrabari": [23.7120, 90.4340],
  "Mugdapara": [23.7300, 90.4300],
  "Basabo": [23.7450, 90.4350],
  "Khilgaon": [23.7500, 90.4250],
  "Gazipur Chourasta": [23.9999, 90.4203],
  "Basila": [23.7500, 90.3400],
  "Sayedabad": [23.7180, 90.4320],
  "Arambagh": [23.7300, 90.4210],
  "Kamalapur": [23.7340, 90.4250],
  "Shahbagh": [23.7390, 90.3950],
  "Dhanmondi": [23.7460, 90.3740],
  "Mohammadpur": [23.7650, 90.3580],
  "Khamar Bari": [23.7560, 90.3850],
  "Farmgate": [23.7560, 90.3870],
  "Kawran Bazar": [23.7510, 90.3920],
  "Bangla Motor": [23.7460, 90.3960],
  "Taltola": [23.7750, 90.3800],
  "Shewrapara": [23.7900, 90.3750],
  "Kazipara": [23.7950, 90.3750],
  "Darussalam": [23.7850, 90.3500],
  "Mazar Road": [23.7980, 90.3480],
  "Japan Garden City": [23.7680, 90.3500],
  "Ring Road": [23.7710, 90.3530]
};

export const POI_COORDS: Record<string, [number, number]> = {
  // Hospitals
  "ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH)": [23.7250, 90.3970],
  "স্কয়ার হাসপাতাল (Square Hospital)": [23.7525, 90.3815],
  "ল্যাবএইড স্পেশালাইজড হাসপাতাল (LabAid)": [23.7485, 90.3820],
  "বারডেম হাসপাতাল (BIRDEM)": [23.7380, 90.3960],
  "ইউনাইটেড হাসপাতাল (United Hospital)": [23.7930, 90.4240],
  "এভারকেয়ার হাসপাতাল (Evercare)": [23.8110, 90.4320],
  "হলি ফ্যামিলি রেড ক্রিসেন্ট হাসপাতাল": [23.7450, 90.3990],
  "জাতীয় হৃদরোগ ইনস্টিটিউট": [23.7690, 90.3710],
  "অ্যাপোলো হাসপাতাল": [23.8110, 90.4320],
  "ইবনে সিনা ডায়াগনস্টিক সেন্টার": [23.7480, 90.3780],
  "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)": [23.7400, 90.3960],
  "বিআরবি হাসপাতাল": [23.7540, 90.3840],
  "শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ হাসপাতাল": [23.7700, 90.3680],
  "রাজারবাগ পুলিশ হাসপাতাল": [23.7420, 90.4180],
  "বারডেম ২ (সেগুনবাগিচা)": [23.7340, 90.4040],

  // Schools & Colleges
  "ঢাকা বিশ্ববিদ্যালয় (DU)": [23.7330, 90.3930],
  "বুয়েট (BUET)": [23.7260, 90.3920],
  "ঢাকা কলেজ": [23.7370, 90.3840],
  "ইডেন মহিলা কলেজ": [23.7300, 90.3800],
  "নটর ডেম কলেজ": [23.7340, 90.4200],
  "ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ": [23.7460, 90.4070],
  "রাজউক উত্তরা মডেল কলেজ": [23.8820, 90.3970],
  "আইডিয়াল স্কুল অ্যান্ড কলেজ (মতিঝিল)": [23.7470, 90.4220],
  "সাউথ পয়েন্ট স্কুল অ্যান্ড কলেজ": [23.8210, 90.4230],
  "নর্থ সাউথ বিশ্ববিদ্যালয় (NSU)": [23.8150, 90.4260],
  "ব্র্যাক বিশ্ববিদ্যালয়": [23.7760, 90.4060],
  "ইস্ট ওয়েস্ট বিশ্ববিদ্যালয়": [23.7680, 90.4250],
  "ঢাকা রেসিডেনসিয়াল মডেল কলেজ": [23.7630, 90.3650],
  "সেন্ট যোসেফ উচ্চ মাধ্যমিক বিদ্যালয়": [23.7550, 90.3680],
  "সেন্ট গ্রেগরি হাই স্কুল": [23.7120, 90.4150],
  "গভর্নমেন্ট ল্যাবরেটরি হাই স্কুল": [23.7390, 90.3820],
  "মতিঝিল মডেল স্কুল অ্যান্ড কলেজ": [23.7350, 90.4230],
  "আদমজী ক্যান্টনমেন্ট কলেজ": [23.7880, 90.3940],
  "ঢাকা সিটি কলেজ": [23.7440, 90.3820],
  "হলি ক্রস গার্লস হাই স্কুল ও কলেজ": [23.7570, 90.3900],

  // Landmarks & Others
  "জাতীয় সংসদ ভবন": [23.7620, 90.3780],
  "জাতীয় জাদুঘর": [23.7375, 90.3940],
  "বসুন্ধরা সিটি শপিং মল": [23.7510, 90.3910],
  "বঙ্গবন্ধু স্টেডিয়াম": [23.7290, 90.4120],
  "বায়তুল মোকাররম মসজিদ": [23.7300, 90.4120],
  "কার্জন হল": [23.7275, 90.4000],
  "সোহরাওয়ার্দী উদ্যান": [23.7350, 90.3980],
  "হাতিরঝিল (এম্ফিথিয়েটার)": [23.7650, 90.4100],
  "মিরপুর শের-ই-বাংলা স্টেডিয়াম": [23.8070, 90.3630],
  "যমুনা ফিউচার পার্ক": [23.8136, 90.4242],
  "পুলিশ প্লাজা": [23.7670, 90.4120]
};

// Unified Location Coordinates for Search
export const ALL_LOCATIONS_COORDS: Record<string, [number, number]> = {
  ...STOP_COORDS,
  ...POI_COORDS
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

// Combined pairs for dropdown (Stops + POIs)
export const ALL_LOCATION_PAIRS = [
  ...UNIQUE_STOPS_PAIRS,
  ...Object.keys(POI_COORDS).map(name => ({ en: name, bn: name }))
].sort((a, b) => a.bn.localeCompare(b.bn));

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