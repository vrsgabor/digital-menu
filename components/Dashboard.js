import styles from '../styles/Etterem.module.css';
import DonutChart from '../components/DonutChart';
import TreemapChart from '../components/TreemapChart'
const Dashboard = () => (
    <div className={styles.dashboardWrapper}>
        <div className={styles.dashKpi}>
            <div className={styles.dashboardBgKpi}>
                <div className={styles.KpiCard}>
                    <p className={styles.KpiCardValue}>329e</p>
                    <p className={styles.KpiCardTitle}>Aktuális havi árbevétel (Ft)</p>
                </div>
                <div className={styles.KpiCard}>
                <p className={styles.KpiCardValue}>286e</p>
                <p className={styles.KpiCardTitle}>Aktuális havi profit (Ft)</p>
                </div>
                <div className={styles.KpiCard}>
                <p className={styles.KpiCardValue}>4.6 / 5</p>
                <p className={styles.KpiCardTitle}>Vásárlói elégedettség</p>
                </div>
            </div>
        </div>
        <div className={styles.dashDonut}>
            <div className={styles.dashsecond}>
                <div className={styles.donutChartWrapper}>
                <DonutChart />
                </div>
                <div style={{ width: '100%', height: '200px' }}>
                    <TreemapChart />
                </div>  
            </div>
        </div>
        <div className={styles.dashBar}>
            <div className={styles.dashboardBg}>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
            </div>
        </div>
        <div className={styles.dashLine}>
            <div className={styles.dashboardBg}>
                <p>Valami</p>
                <p>Valami</p>
            </div>
        </div>
    </div>
);

export default Dashboard;
