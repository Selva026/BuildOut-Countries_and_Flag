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
    const [data, setData] = useState([]); // Stores API data
    const [error, setError] = useState(null); // Tracks any API errors
    const [loading, setLoading] = useState(true); // Tracks loading state

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(API);

                // Handle HTTP errors
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message); // Set error state if something goes wrong
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false); // End loading state regardless of success or failure
            }
        };

        fetchCountries();
    }, []);

    // Render loading message while fetching data
    if (loading) {
        return <div className={styles.Loading}>Loading countries...</div>;
    }

    // Render error message if an error occurs
    if (error) {
        return <div className={styles.Error}>Error: {error}</div>;
    }

    // Render countries if data is successfully fetched
    return (
        <div className={styles.Countries}>
            {data.map((country) => (
                <CountryCard
                    key={country.abbr || country.name} // Use abbr as unique key, fallback to name
                    name={country.name}
                    flag={country.flag}
                />
            ))}
        </div>
    );
}

export default Countries;
