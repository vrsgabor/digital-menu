import styles from '../styles/Home.module.css';

const DigitalMenuSection = () => (
    <section className={`${styles['section-style']} ${styles['digitalis-etlap']}`}>
        <h3 className={styles['heading-5']}>Digitális étlap</h3>
        <img src="/images/underline.svg" loading="lazy" alt="underline" className={styles['underline-section2']} />
        <p className={styles.paragraph}>A QR-kód segítségével az étterem vendégei hozzáférhetnek a digitális menühöz. Kezeld ételeid és italaid az étterem portál segítségével pár kattintással. A QR-kód bármilyen okostelefonnal vagy táblagéppel beolvasható, és matricákon, asztali állványokon, szalvétákon feltüntethető az étteremben.</p>
    </section>
);

export default DigitalMenuSection;
