import React, { useState, useEffect } from 'react';
import styles from './Countries.module.css';

const CountryCard = ({ flag, name }) => {
    return (
        <div className={styles.Card}>
            <img src={flag} alt={`Flag of ${name}`} className={styles['Card-img']} />
            <h2>{name}</h2>
        </div>
    );
};

const API = "https://xcountries-backend.azurewebsites.net/all";

function Countries() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null); // State to track errors
    const [loading, setLoading] = useState(true); // State to show loading state

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(API);

                if (!response.ok) {
                    // If the response status is not OK , throw an error
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message); // Set the error message
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchCountries();
    }, []);

    if (loading) {
        return <div className={styles.Loading}>Loading countries...</div>;
    }

    if (error) {
        return <div className={styles.Error}>Error: {error}</div>;
    }

    return (
        <div className={styles.Countries}>
            {data.map((countryData) => (
                <CountryCard
                    key={countryData.abbr || countryData.name} // Fallback to name if abbr is missing
                    name={countryData.name}
                    flag={countryData.flag}
                />
            ))}
        </div>
    );
}

export default Countries;
