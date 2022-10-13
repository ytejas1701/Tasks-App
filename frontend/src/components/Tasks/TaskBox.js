import { useState } from 'react';
import Appbar from '../UI/Appbar';
import CenterContent from '../UI/CenterContent';
import styles from './TaskBox.module.css';

const TaskBox = ({id, title, date, description, isLate})=>{
    const uncompletedIcon = (<svg 
        xmlns="http://www.w3.org/2000/svg"
        width="20" 
        height="20" 
        onClick={()=>{setIcon(completedIcon);}}
        className={styles.boomboom}
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg>);
    const completedIcon = (<svg 
        xmlns="http://www.w3.org/2000/svg"
        width="20" 
        height="20"
        onClick={()=>{setIcon(uncompletedIcon);}} 
        className={styles.boomboom}
        viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>    
    </svg>);

    const [icon, setIcon] = useState(uncompletedIcon);

    return(
            <div className={styles.mainContent}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    className={styles.nav}
                    viewBox="0 0 16 16">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
                <div className={styles.taskBox}>
                    <div className={styles.heading}>
                        {icon}
                        <span className={styles.title}>Kill Your Neighbour</span>
                        <span className={styles.date}>17 Jul</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            className={styles.trash}
                            viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg> 
                    </div>
                    <span className={styles.description}>Description</span>
                </div>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    className={styles.nav}
                    viewBox="0 0 16 16">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
    );
}

export default TaskBox;