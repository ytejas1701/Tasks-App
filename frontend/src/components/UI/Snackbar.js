import styles from './Snackbar.module.css';

const Snackbar = ({messageType, messageText})=>{
    return(
    <div className={`${styles.snackbar} ${messageType==='faliure' ? styles.faliure : styles.success}`}>
        <span>{messageText}</span>
        {/* <span className={styles.undo} onClick={undoAction}>Undo</span> */}
    </div>
);
}

export default Snackbar;