"use client";

import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";

export default function MapLocator() {
  const [zipcode, setZipcode] = useState("");
  const [showMap, setShowMap] = useState(false);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipcode.trim()) {
      setShowMap(true);
    }
  };

  return (
    <div className="w-full bg-card rounded-[var(--radius-card)] p-6 border border-border shadow-sm flex flex-col gap-4">
      <h3 className="font-bold text-lg heading-font flex items-center gap-2">
        <MapPin className="text-brand-600" />
        Find Your Polling Booth
      </h3>
      
      <form onSubmit={handleSearch} className="flex gap-2 w-full">
        <div className="relative flex-1">
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter your Zipcode or City"
            aria-label="Enter your Zipcode or City to find polling booth"
            className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm text-foreground"
          />
        </div>
        <button 
          type="submit"
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-5 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-sm"
          aria-label="Search"
        >
          <Search size={18} aria-hidden="true" />
        </button>
      </form>

      {showMap && (
        <div className="w-full h-64 rounded-xl overflow-hidden border border-border mt-2 relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          {googleMapsApiKey && googleMapsApiKey !== "your_google_maps_api_key" ? (
            <iframe
              title="Polling Booth Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=Polling+Booth+${encodeURIComponent(zipcode)}`}
            ></iframe>
          ) : (
            <div className="text-center p-4">
              <MapPin size={32} className="mx-auto text-brand-300 mb-2" />
              <p className="text-sm font-medium text-foreground/70">Google Maps API Key not configured.</p>
              <p className="text-xs text-foreground/50 mt-1">Showing mock location for {zipcode}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
