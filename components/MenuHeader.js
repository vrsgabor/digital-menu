"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/Menu.module.css';

const MenuHeader = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: '',
    restaurantAddress: ''
  });

  // Fetch restaurant info when the component mounts
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await fetch('/restaurantInfo.json');
        const data = await response.json();
        setRestaurantInfo({
          restaurantName: data.restaurantName,
          restaurantAddress: data.restaurantAddress,
        });
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
      }
    };

    fetchRestaurantInfo();
  }, []);

  return (
    <div className={styles.MenuHeader}>
      <h1 className={styles.Title}>{restaurantInfo.restaurantName || 'Loading...'}</h1>
      <h2 className={styles.SubTitle}>{restaurantInfo.restaurantAddress || 'Loading...'}</h2>
    </div>
  );
};

export default MenuHeader;
