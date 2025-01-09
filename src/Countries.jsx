import React, { useState, useEffect } from 'react';
import styles from './Countries.module.css';
const CountryCard = ({
  flag,
  name
}) => {
    return (
        <div className={styles.Card}>
        <img src={flag} alt={`flag of $(name)`} className={styles['Card-img']} />
        <h2>{name}</h2>
        </div>
    );  
}
const API = "https://xcountries-backend.azurewebsites.net/all"
function Countries() {
  const [data,setData] = useState([])

    useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API)
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.log( "Error fetching: ", error )
      }
      
    }
    fetchCountries()
  }, []);
  return (
    <div className={styles.Countries}>
      {data.map((countryData) => (
        <CountryCard key= {countryData.abbr} name={countryData.name} flag={countryData.flag} />))}
    </div>
  );
}

export default Countries;