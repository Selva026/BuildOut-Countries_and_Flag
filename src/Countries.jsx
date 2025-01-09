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
    const [data, setData] = useState([]); // State for countries data
    const [error, setError] = useState(null); // State for error tracking
    const [loading, setLoading] = useState(true); // State for loading tracking

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(API);

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error("Error fetching data:", err.message); // Log error to console
                setError(err.message); // Update error state
            } finally {
                setLoading(false); // Ensure loading ends
            }
        };

        fetchCountries();
    }, []);

    if (loading) {
        return <div className={styles.Loading}>Loading countries...</div>;
    }

    if (error) {
        return <div className={styles.Error}>Error fetching data: {error}</div>;
    }

    return (
        <div className={styles.Countries}>
            {data.map((country) => (
                <CountryCard
                    key={country.abbr || country.name}
                    name={country.name}
                    flag={country.flag}
                />
            ))}
        </div>
    );
}

export default Countries;
