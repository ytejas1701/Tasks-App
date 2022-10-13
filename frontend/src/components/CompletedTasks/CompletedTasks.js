import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CompletedTasks.module.css';

const CompletedTasks = ()=>{
    const token = useSelector(state=>state.Auth.token);
    const [completedTasks, setCompletedTasks]= useState([]);
    const completedIcon = (<svg 
        xmlns="http://www.w3.org/2000/svg"
        width="20" 
        height="20"
        viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>    
    </svg>);


    useEffect(()=>{
        const fetchTasks = async ()=>{
                const tasks = await fetch('http://localhost:8000/tasks', {
                    method:'GET',
                    headers:{
                        'Authorization':'Bearer ' + token
                    },
                });
                const tasksObject = await tasks.json();
                setCompletedTasks(tasksObject.filter((task)=>task.completed===true));
            }
        fetchTasks();        
    }, []);
    const taskTiles = completedTasks.map((task)=>{
        return(
            <div 
                className={styles.task}
                key={task._id}>
                    {completedIcon}
                <span className={styles.title}>{task.title}</span>
                <span className={styles.date}>{new Date(task.dueDate).toLocaleDateString('en-in')}</span>
            </div>);

    });
    return (
        <div className={styles.mainContent}>
            {taskTiles}
        </div>
    );
}

export default CompletedTasks;