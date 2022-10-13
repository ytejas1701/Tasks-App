import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Home.module.css';
import TaskTile from './TaskTile';
import { useDispatch } from 'react-redux/es/exports';
import { fetchTasks } from '../../store/store';
import Task from './TaskTile';

const Home = ()=>{
    const token = useSelector(state=>state.Auth.token);
    const tasksData = useSelector(state=>state.Tasks.tasks);
    const taskTiles = tasksData.map((element)=>{
        const due = new Date(element.dueDate);
        return <TaskTile
            key={element.id}
            id={element.id}
            title={element.title}
            isLate={false}
            date={due.toLocaleDateString('en-us')}
            completed={element.completed}
        />});
    const now = new Date();
    now.setHours(0,0,0,0);
    const prev = tasksData.filter((task)=>{
        const date = new Date(task.dueDate);

        return date<now;
    });
    const curr = tasksData.filter((task)=>{
        const date = new Date(task.dueDate);
        return date.toLocaleDateString('en-us')===now.toLocaleDateString('en-us');
    });
    const upcm = tasksData.filter((task)=>{
        const date = new Date(task.dueDate);
        return date>now;
    });
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchTasks(token));
    }, [fetchTasks]);

    return (
        <div className={styles.home}>
            {curr.length>0&&<div className={styles.label}>
                TODAY
            </div>}
            {prev.map((element)=>{
                const due = new Date(element.dueDate);
                return <TaskTile
                    key={element.id}
                    id={element.id}
                    title={element.title}
                    isLate={true}
                    date={due.toLocaleDateString('en-in')}
                    completed={element.completed}
            />})}
            {curr.map((element)=>{
                const due = new Date(element.dueDate);
                return <TaskTile
                    key={element.id}
                    id={element.id}
                    title={element.title}
                    isLate={false}
                    date={due.toLocaleDateString('en-in')}
                    completed={element.completed}
            />})}
            {upcm.length>0&&<div className={styles.label}>
                UPCOMING
            </div>}
            {upcm.map((element)=>{
                const due = new Date(element.dueDate);
                return <TaskTile
                    key={element.id}
                    id={element.id}
                    title={element.title}
                    isLate={false}
                    date={due.toLocaleDateString('en-in')}
                    completed={element.completed}
            />})}

        </div>
    );
}

export default Home;