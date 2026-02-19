
import { GoogleGenAI } from "@google/genai";
import { TripSuggestion } from "../types";

export const getTravelGuidance = async (start: string, end: string, trip: TripSuggestion): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    আমি ঢাকার মধ্যে ভ্রমণ করছি। নিচের রুটটির জন্য আমাকে একটি পূর্ণাঙ্গ "ভ্রমণ প্যাকেজ" বা গাইডলাইন তৈরি করে দিন।
    
    রুট ডিটেইলস: ${trip.segments.map(s => `${s.type}: ${s.from} থেকে ${s.to} ${s.busName ? `(বাস: ${s.busName})` : ''}`).join(' -> ')}।
    
    অনুগ্রহ করে নিচের বিষয়গুলো বাংলায় (Bangla) বিস্তারিতভাবে লিখুন:
    ১. পূর্ণাঙ্গ প্রবাহ (Full Flow): শুরু থেকে শেষ পর্যন্ত আমাকে কী কী করতে হবে? 
    ২. লোকাল ট্রান্সপোর্ট (Walking/Rickshaw): যদি হেঁটে বা রিকশায় যেতে হয়, তবে আনুমানিক কত টাকা ভাড়া হতে পারে এবং রিকশাচালককে কী বলতে হবে?
    ৩. বাস স্টপেজ এবং দিকনির্দেশনা: বাসে ওঠার জন্য রাস্তার কোন পাশে দাঁড়াতে হবে? বাসটি চেনার উপায় কী?
    ৪. ল্যান্ডমার্ক (Landmarks): ট্রান্সফার পয়েন্ট বা গন্তব্যের আশেপাশে পরিচিত কোনো জায়গা বা ল্যান্ডমার্কের নাম উল্লেখ করুন।
    ৫. বিশেষ পরামর্শ: জ্যাম বা ভিড় এড়াতে কোনো বিশেষ টিপস থাকলে দিন।
    
    পুরো তথ্যটি বুলেট পয়েন্ট আকারে এবং সুন্দরভাবে গুছিয়ে লিখুন যাতে একজন নতুন মানুষও সহজে বুঝতে পারে।
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "দুঃখিত, নির্দেশিকা তৈরি করা যায়নি। ম্যাপের রুটটি অনুসরণ করুন।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ম্যাপের নির্দেশনাগুলো মনোযোগ দিয়ে দেখুন। রুট পরিবর্তনের সময় রিকশা ব্যবহার করতে পারেন।";
  }
};
