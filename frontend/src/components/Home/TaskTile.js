import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SnackbarActions, TasksActions } from '../../store/store';
import { Link } from 'react-router-dom';
import styles from './TaskTile.module.css';

const Task = ({id, title, date, isLate, completed})=>{
    const token = useSelector(state=>state.Auth.token);
    const dispatch = useDispatch();

    const deleteTaskHandler = (taskId)=>{
        const deleteTask = async function(){
            try{
                const response = await fetch('http://localhost:8000/tasks/'+taskId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token,
                    },
                });
                console.log(response);
                if(!response.ok){
                    throw new Error();
                }else{
                    const responseObject = await response.json();
                    dispatch(TasksActions.removeTask(responseObject._id));
                    dispatch(SnackbarActions.showSnackbar({
                        messageType:'success',
                        messageText:'Task deleted!'
                    }));
                    setTimeout(()=>{dispatch(SnackbarActions.hideSnackbar())}, 4000);
                }
            }catch(error){
                dispatch(SnackbarActions.showSnackbar({
                    messageType:'faliure',
                    messageText:'Unable to delete task!'
                }));
                setTimeout(()=>{dispatch(SnackbarActions.hideSnackbar())}, 4000);
            }
        }
        deleteTask();
    } 

    const updateTaskHandler = (taskId)=>{
        const updateTask = async function(){
            try{
                const response = await fetch('http://localhost:8000/tasks/'+taskId, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token,
                    },
                    body: JSON.stringify({
                        'completed':true,
                    })
                });
                if(!response.ok){
                    throw new Error();
                }else{
                    const responseObject = await response.json();
                    dispatch(TasksActions.removeTask(responseObject._id));
                    dispatch(SnackbarActions.showSnackbar({
                        messageType:'success',
                        messageText:'Task marked done!'
                    }));
                    setTimeout(()=>{dispatch(SnackbarActions.hideSnackbar())}, 4000);
                }
            }catch(error){
                dispatch(SnackbarActions.showSnackbar({
                    messageType:'faliure',
                    messageText:'Unable to update task'
                }));
                setTimeout(()=>{dispatch(SnackbarActions.hideSnackbar())}, 4000);
            }
        }
        updateTask();
    } 

    
    const completedIcon = (<svg
        className={styles.completedIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="20" 
        height="20"
        viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>    
    </svg>);

    const uncompletedIcon = (<svg
        className={styles.uncomplete}
        onClick={()=>updateTaskHandler(id, true)}
        xmlns="http://www.w3.org/2000/svg"
        width="20" 
        height="20" 
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg>);

    const [icon, setIcon] = useState(uncompletedIcon);
    
    const iconBox = (
        <div
            className={styles.iconBox}
            onMouseOver={()=>{setIcon(completedIcon)}}
            onMouseLeave={()=>{setIcon(uncompletedIcon)}}
            onClick={()=>{updateTaskHandler(id)}}>
            {icon}
        </div>
    );

    
    return (
        <div className={styles.task}>
            {iconBox}
            <Link to={`/tasks/${id}`}>
                <div className={styles.taskInfo}>
                        <span className={styles.taskTitle}>
                            {title}
                        </span>
                    <span className={`${styles.taskDate} ${isLate&&styles.late}`}>
                        {date}
                    </span>
                </div>
            </Link>
            <div className={styles.taskActions}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    fill="#444"
                    viewBox="0 0 16 16"
                    onClick={()=>{deleteTaskHandler(id)}}>
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg> 
           </div>
        </div>
    );
}

export default Task;