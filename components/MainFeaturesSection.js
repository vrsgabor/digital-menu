import styles from '../styles/Home.module.css';

const MainFeaturesSection = () => (
    <section className={`${styles['section-style']} ${styles['fo-funkciok']}`}>
        <h3 className={styles['heading-5']}>Fő funkciók</h3>
        <img src="/images/underline.svg" loading="lazy" alt="underline" className={styles['underline-section2']} />
        <div className={styles['cards-container']}>
            <a href="#" className={styles['card-wrapper']}>
                <div className={styles['card-under']}></div>
                <div className={styles['card-upper']}><img src="/images/qrcode.svg" loading="lazy" alt="QR code" className={styles['card-image']} />
                    <h4 className={styles['heading-3']}>Digitális étlap</h4>
                </div>
            </a>
            <a href="#" className={styles['card-wrapper']}>
                <div className={styles['card-under']}></div>
                <div className={styles['card-upper']}><img src="/images/translation.svg" loading="lazy" alt="Translation" className={styles['card-image']} />
                    <h4 className={styles['heading-3']}>Fordítás idegen nyelvre</h4>
                </div>
            </a>
            <a href="#" className={styles['card-wrapper']}>
                <div className={styles['card-under']}></div>
                <div className={styles['card-upper']}><img src="/images/calendar.svg" loading="lazy" alt="Calendar" className={styles['card-image']} />
                    <h4 className={styles['heading-3']}>Online asztalfoglalás</h4>
                </div>
            </a>
        </div>
    </section>
);

export default MainFeaturesSection;
