import styles from '../styles/Etlap.module.css';

const HeaderEtlap = () => (
  <div className={styles.header}>
    <h2 className={styles.normal}>Étlap</h2>
    <a href="#" className={styles.previewLinkBlock}>
      <div className={styles.paragraphEtlap}>Előnézet</div>
      <img src="/images/preview-svg.svg" alt="preview" className={styles.previewSvg} />
    </a>
  </div>
);

export default HeaderEtlap;
