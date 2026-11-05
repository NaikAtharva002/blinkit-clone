import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationInfo } from '../types';

interface LocationContextType {
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  detectingLocation: boolean;
  detectCurrentLocation: () => void;
}

const DEFAULT_LOCATION: LocationInfo = {
  title: 'B-Block, Sector 49',
  address: 'B-Block, Sector 49, South City II, Gurugram, Haryana 122018',
  city: 'Gurugram',
  deliveryTime: '8 MINS'
};

const LOCATION_STORAGE_KEY = 'blinkit_selected_location_v1';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  const detectCurrentLocation = () => {
    setDetectingLocation(true);
    setTimeout(() => {
      const detected: LocationInfo = {
        title: 'DLF Phase 2',
        address: 'Tower 4, Cyber City, DLF Phase 2, Gurugram, Haryana 122002',
        city: 'Gurugram',
        deliveryTime: '10 MINS'
      };
      setLocation(detected);
      setDetectingLocation(false);
      setIsLocationModalOpen(false);
    }, 1200);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isLocationModalOpen,
        openLocationModal: () => setIsLocationModalOpen(true),
        closeLocationModal: () => setIsLocationModalOpen(false),
        detectingLocation,
        detectCurrentLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
