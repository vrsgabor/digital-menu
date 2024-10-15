"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/Subscription.module.css';
import { FaCheck } from "react-icons/fa";

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState('Alap');

  useEffect(() => {
    // Fetch current plan from the API
    fetch('/api/Plan')
      .then((res) => res.json())
      .then((data) => {
        setSelectedPlan(data.currentPlan);
      });
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Update the plan in the JSON file using the API
    fetch('/api/Plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPlan: plan }),
    });
  };

  return (
    <div className={styles.contentWrapper}>
      <div
        className={`${styles.card} ${
          selectedPlan === 'Alap' ? styles.activeCard : ''
        }`}
      >
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>Alap</h3>
          <p className={styles.subTitle}>Ingyenes</p>
        </div>
        <button
          className={styles.regButton}
          type="button"
          onClick={() => handlePlanSelect('Alap')}
        >
          Kiválaszt
        </button>
      </div>
      <div
        className={`${styles.card} ${
          selectedPlan === 'Prémium' ? styles.activeCard : ''
        }`}
      >
        <div className={styles.cardContentWrapper}>
          <h3 className={styles.cardTitle}>Prémium</h3>
          <p className={styles.subTitle}>3990 Ft / Hónap</p>
          <div className={styles.content}>
            <div className={styles.listItemWrapper}>
              <FaCheck className={styles.icon} />
              <p className={styles.listItem}>Logó feltöltés</p>
            </div>
            <div className={styles.listItemWrapper}>
              <FaCheck className={styles.icon} />
              <p className={styles.listItem}>QR kód szín testreszabása</p>
            </div>
          </div>
        </div>
        <button
          className={styles.regButton}
          type="button"
          onClick={() => handlePlanSelect('Prémium')}
        >
          Kiválaszt
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;
