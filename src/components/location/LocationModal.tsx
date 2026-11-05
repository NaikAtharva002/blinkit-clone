import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';
import { LocationInfo } from '../../types';
import { X, MapPin, Navigation, Search, Check, Building2, Home } from 'lucide-react';

const PRESET_ADDRESSES: (LocationInfo & { tag: string })[] = [
  {
    tag: 'Home',
    title: 'B-Block, Sector 49',
    address: 'B-Block, Sector 49, South City II, Gurugram, Haryana 122018',
    city: 'Gurugram',
    deliveryTime: '8 MINS'
  },
  {
    tag: 'Office',
    title: 'Cyber City Tower 4',
    address: 'DLF Cyber City, Sector 24, Gurugram, Haryana 122002',
    city: 'Gurugram',
    deliveryTime: '10 MINS'
  },
  {
    tag: 'Other',
    title: 'Vasant Kunj Sector C',
    address: 'Pocket 2, Sector C, Vasant Kunj, New Delhi 110070',
    city: 'Delhi NCR',
    deliveryTime: '12 MINS'
  },
  {
    tag: 'Other',
    title: 'Indiranagar 100ft Road',
    address: '12th Main Rd, Indiranagar, Bengaluru, Karnataka 560038',
    city: 'Bengaluru',
    deliveryTime: '10 MINS'
  },
  {
    tag: 'Other',
    title: 'Pali Hill, Bandra West',
    address: 'Dr Ambedkar Rd, Pali Hill, Mumbai, Maharashtra 400050',
    city: 'Mumbai',
    deliveryTime: '10 MINS'
  }
];

const POPULAR_CITIES = [
  'Gurugram',
  'Delhi NCR',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Chandigarh',
  'Jaipur'
];

export const LocationModal: React.FC = () => {
  const {
    location,
    setLocation,
    isLocationModalOpen,
    closeLocationModal,
    detectingLocation,
    detectCurrentLocation
  } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredAddresses = PRESET_ADDRESSES.filter(
    (addr) =>
      addr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (addr: LocationInfo) => {
    setLocation(addr);
    closeLocationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-extrabold text-[#1C1C1C]">Change Location</h3>
            <p className="text-xs text-gray-500">Select delivery address to check product availability</p>
          </div>
          <button
            onClick={closeLocationModal}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Detection Button */}
        <div className="mt-4">
          <button
            onClick={detectCurrentLocation}
            disabled={detectingLocation}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#0C831F] hover:bg-[#096618] text-white font-bold text-xs transition-all shadow-sm active:scale-98 disabled:opacity-75"
          >
            <Navigation className={`w-4 h-4 ${detectingLocation ? 'animate-spin' : ''}`} />
            <span>
              {detectingLocation ? 'Detecting your GPS location...' : 'Detect my location automatically'}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mt-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search delivery location or apartment..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#1C1C1C] placeholder:text-gray-400 focus:outline-none focus:border-[#0C831F] focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Popular Cities Pills */}
        <div className="mt-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Popular Cities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  handleSelect({
                    title: `Central ${city}`,
                    address: `Downtown Main Street, ${city}`,
                    city,
                    deliveryTime: '10 MINS'
                  });
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  location.city === city
                    ? 'border-[#0C831F] bg-[#F7FFF9] text-[#0C831F] font-bold'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Saved & Suggested Addresses */}
        <div className="mt-5 max-h-60 overflow-y-auto space-y-2 pr-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Saved & Recent Locations
          </span>

          {filteredAddresses.map((addr) => {
            const isSelected = location.title === addr.title && location.city === addr.city;
            return (
              <div
                key={addr.title}
                onClick={() => handleSelect(addr)}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-[#0C831F] bg-[#F7FFF9] shadow-xs'
                    : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-[#0C831F] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {addr.tag === 'Home' ? <Home className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1C1C1C]">{addr.title}</span>
                      <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.2 rounded">
                        {addr.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{addr.address}</p>
                    <span className="text-[10px] font-bold text-[#0C831F] mt-1 block">
                      ⚡ Delivery in {addr.deliveryTime}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-[#0C831F] shrink-0 mt-1" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
