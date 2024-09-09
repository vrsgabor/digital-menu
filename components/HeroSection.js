import styles from '../styles/Home.module.css';

const HeroSection = () => (
    <section className={`${styles.hero} ${styles['section-style']}`} style={{ backgroundImage: "url('/images/background-shape.svg')" }}>
        <h1 className={styles.heading}>Egyszerű és hatékony módszer online étlapok készítésére</h1>
        <h2 className={styles['heading-2']}>Lehetővé tesszük, hogy gyorsan és könnyedén létrehozz modern és vonzó étlapokat éttermed vagy kávézód számára</h2>
        <a href="/login" className={styles['button-hero']}>
            <div className={styles['btn-text-home']}>Kezdés</div>
        </a>
        <img src="/images/spoon.svg" loading="lazy" alt="spoon" className={styles.spoon} />
        <img src="/images/leaf.svg" loading="lazy" alt="leaf" className={styles.leaf} />
        <img src="/images/tomato.svg" loading="lazy" alt="tomato" className={styles.tomato} />
        <img src="/images/basil.svg" loading="lazy" alt="basil" className={styles.basil} />
    </section>
);

export default HeroSection;
