'use client';
import styles from '../../styles/Login.module.css'
import '../../styles/global.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Update this import to next/navigation
import cookie from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // This is now from next/navigation

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      router.push('/Etterem'); // Redirect to the protected page if already authenticated
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/Etterem'); // Redirect to the protected page after login
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <div className={styles.pagewrapper}>
          <div className={styles.leftdiv}>
            <div className={styles.contentWrapper}>
            <h2 className={styles.subTitle}>Üdvözöljük újra!</h2>
            <p className={styles.paragraph}>Legutóbbi látogatása óta frissítettük a bejelentkezési oldal kialakítását és mobileszközökre optimalizáltuk. Reméljük elnyeri tetszését. Jó szórakozást digitális menüje leghatékonyabb kezeléséhez.</p>
          </div>
          
        </div>
        <div className={styles.rightdiv}>
        <h1 className={styles.title}>Bejelentkezés</h1>
        
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
          />
          <button className={styles.regButton} type="submit">Bejelentkezés</button>
          <p className={styles.loginLink}>Nincs még fiókja?<a className={styles.link} href="/signup">Kattintson ide.</a></p>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>

    
  );
}
