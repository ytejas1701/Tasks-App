import styles from './InfoField.module.css';

const InfoField = ({label, value})=>{
    return (
        <div className={styles.infoField}>
            <div className={styles.heading}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
            </div>
            <button>{`Change ${label}`}</button>
        </div>
    );
}

export default InfoField;