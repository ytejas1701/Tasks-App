import styles from './CenterContent.module.css';
import { useSelector } from 'react-redux';
import Appbar from './Appbar';
import AddTask from '../AddTask/AddTask';
import Snackbar from './Snackbar';
import { Outlet } from "react-router-dom";



const CenterContent = ()=>{
    const isAddTaskVisible = useSelector((state)=>state.AddTask.isVisible);
    const isSnackbarVisible = useSelector((state)=>state.Snackbar.isVisible);
    const messageText = useSelector((state)=>state.Snackbar.messageText);
    const messageType = useSelector((state)=>state.Snackbar.messageType);
    return (
        <div className={styles.centerContent}>
            <Appbar></Appbar>
            {isAddTaskVisible&&<AddTask/>}
            <Outlet></Outlet>
            {isSnackbarVisible&&<Snackbar messageType={messageType} messageText={messageText}/>}
        </div>
    );
}

export default CenterContent;