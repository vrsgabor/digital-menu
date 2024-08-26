import styles from '../styles/Etlap.module.css';

const Modal = () => (
    <div className={styles['modalWrapper']}>
         <div className={styles['modal']}>
            <div className={styles['modalContent']}>
            <input
              type="text"
              placeholder="Név"
              className={styles.modalInput}
            />
            <input
              type="text"
              placeholder="Ár (Ft)"
              className={styles.modalInput}
            />
            <textarea
              placeholder="Leírás"
              className={styles.modalTextArea}
            />
            <input
              type="text"
              placeholder="Allergének"
              className={styles.modalInput}
            />
            <input
              type="file"
              className={styles.modalFileInput}
            />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalButton}>Ok</button>
              <button className={styles.modalButton}>Mégsem</button>
            </div>
         </div>
    </div>
  );

export default Modal;