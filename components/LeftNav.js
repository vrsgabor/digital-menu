"use client"
import { useRouter } from 'next/navigation'; // Use the router to redirect after logout
import styles from '../styles/Etlap.module.css';

const LeftNav = () => {
  const router = useRouter(); // Initialize the router

  const handleLogout = async () => {
    // Send a request to the logout API
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    if (res.ok) {
      // Redirect to the homepage or login page after successful logout
      router.push('/');
    }
  };

  return (
    <div className={styles['left-navigation']}>
      <div className={styles['navigation-top']}>
        <a href="/" className={styles['navigation-text']}>Kezdőlap</a>
        <a href="/Etlap" className={styles['navigation-text']}>Étlap</a>
        <a href="/foglalasok" className={styles['navigation-text']}>Foglalások</a>
        <img className={styles['line']} src="/images/line.svg" alt="line" />
        <a href="/Qrcode" className={styles['navigation-text']}>QR kód</a>
        <a href="/Etterem" className={styles['navigation-text']}>Étterem</a>
        <a href="/elofizetesek" className={styles['navigation-text']}>Előfizetések</a>
        <img className={styles['line']} src="/images/line.svg" alt="line" />
        <a href="/Account" className={styles['navigation-text']}>Fiók kezelése</a>
      </div>
      {/* Call handleLogout on click to log out the user */}
      <div className={styles['navigation-text']} onClick={handleLogout}>
        Kijelentkezés
      </div>
    </div>
  );
};

export default LeftNav;
