import React, { useState } from 'react'
import Navbarauth from '../../components/NavbarAuth/Navbarauth';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../../context/AppContext'
import './HealthSpot.css'
export default function HealthSpot() {
  const { isLoading, places, GetPlaces } = useGlobalContext();
  const [place, setPlace] = useState('');
  const handleSearchPlace = () => {
    GetPlaces({ place });
  }
  return (
    <>
      <Navbarauth />
      <div className='find-doctor-container'>
        <div className='search-box'>
          <div className='search'>
            <span className='search-icon'><FaSearch /></span>
            <input
              type='text'
              placeholder="Enter your city, area, or address"
              className='search-input'
              value={place}
              onChange={e => setPlace(e.target.value)}
            />
          </div>
          <button className='search-btn' onClick={handleSearchPlace}>Search</button>
        </div>
        <p style={{ color: '#555' }}>Enter your location to find nearby clinics and doctors.</p>
        {isLoading && <p style={{color:'red'}}>Loading  the Hospitals</p>}
        {places && places.length > 0 && (
          <div className='places-list'>
            {places.map((place, index) => (
              <div className='place-card' key={index}>
                <h3>{place.display_name.split(',')[0]}</h3>
                <p><strong>Type:</strong> {place.type || 'Unknown'}</p>
                <p><strong>Address:</strong> {place.display_name}</p>
                <a
                  className="map-btn"
                  href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=18/${place.lat}/${place.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Show on Map
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
