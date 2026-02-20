
import { GoogleGenAI } from "@google/genai";
import { TripSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Resolves a text search (Bangla or English) to coordinates using Google Maps grounding.
 */
export const resolveLocation = async (query: string, userCoords?: [number, number]): Promise<{ name: string, coord: [number, number] } | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Identify the precise geographical coordinates (latitude and longitude) for the place or institution named "${query}" in Dhaka, Bangladesh. Focus on schools, colleges, or hospitals if mentioned. Return the response in this format: [LAT, LNG]`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userCoords ? { latitude: userCoords[0], longitude: userCoords[1] } : undefined
          }
        }
      }
    });

    const text = response.text || "";
    // Robust extraction for [23.123, 90.123] format
    const coordMatch = text.match(/\[(\d+\.\d+),\s*(\d+\.\d+)\]/);
    
    if (coordMatch) {
      return {
        name: query,
        coord: [parseFloat(coordMatch[1]), parseFloat(coordMatch[2])]
      };
    }
    
    // Fallback regex for loose text
    const fallbackMatch = text.match(/(\d+\.\d+),\s*(\d+\.\d+)/);
    if (fallbackMatch) {
      return {
        name: query,
        coord: [parseFloat(fallbackMatch[1]), parseFloat(fallbackMatch[2])]
      };
    }
    return null;
  } catch (error) {
    console.error("Location Resolution Error:", error);
    return null;
  }
};

export const getTravelGuidance = async (start: string, end: string, trip: TripSuggestion): Promise<string> => {
  const prompt = `
    আমি ঢাকার মধ্যে ভ্রমণ করছি। শুরুস্থান: ${start}, গন্তব্য: ${end}।
    নিচের রুটটির জন্য আমাকে একটি পূর্ণাঙ্গ "ভ্রমণ গাইডলাইন" তৈরি করে দিন।
    
    রুট ডিটেইলস: ${trip.segments.map(s => `${s.type}: ${s.from} থেকে ${s.to} ${s.busName ? `(বাস: ${s.busName})` : ''}`).join(' -> ')}।
    
    অনুগ্রহ করে বাংলায় (Bangla) বিস্তারিতভাবে লিখুন:
    ১. ভ্রমণ প্রবাহ: ধাপে ধাপে কী করতে হবে?
    ২. রিকশা গাইড: বাসে ওঠার আগে বা পরে রিকশা নিতে হলে ভাড়া কত হতে পারে এবং চালককে কী বলবেন?
    ৩. ল্যান্ডমার্ক: গন্তব্যের আশেপাশে কোনো পরিচিত স্কুল, কলেজ বা হাসপাতাল থাকলে তা উল্লেখ করুন।
    ৪. সতর্কতা: ভিড় বা জ্যামের বিষয়ে স্থানীয় পরামর্শ।
    
    তথ্যগুলো বুলেট পয়েন্টে এবং সাহসী (Bold) টেক্সট ব্যবহার করে লিখুন।
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "দুঃখিত, বিস্তারিত গাইডলাইন তৈরি করা সম্ভব হয়নি।";
  } catch (error) {
    return "ম্যাপের নির্দেশনাগুলো অনুসরণ করুন।";
  }
};
