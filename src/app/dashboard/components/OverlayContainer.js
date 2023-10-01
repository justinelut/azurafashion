import styles from "@/components/OverlayContainer/OverlayContainer.module.css";
const OverlayContainer = ({children}) => (
    <div className={`${styles.imgContainer}`}>
        {children}
        <div className={styles.imgOverlay}></div>
        <div className={styles.overlayBorder}></div>
        <div className={styles.overlayBorder2}></div>
    </div>
);

export default OverlayContainer;
