import styles from './AddTask.module.css';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { AddTaskActions, SnackbarActions, TasksActions } from '../../store/store';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const AddTask = ()=>{
    const dispatch = useDispatch();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef= useRef();
    const token = useSelector(state=>state.Auth.token);
    const [title, setTitle] = useState('');
    const tasksData = useSelector(state=>state.Tasks.tasks);

    const submitHandler = (event)=>{
        event.preventDefault();
        const data = JSON.stringify({
            title:titleRef.current.value,
            dueDate:new Date(dueDateRef.current.value).setHours(0,0,0,0),
        });
        const createTask = async function () {
            try{
                const response = await fetch('http://localhost:8000/tasks', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token,
                    },
                    body: data
                });
                if(response.ok){
                    const responseObject = await response.json();
                    dispatch(TasksActions.addTask({
                        id:responseObject._id,
                        title:responseObject.title,
                        dueDate:responseObject.dueDate,
                        completed:false
                    }));
                    dispatch(AddTaskActions.hideAddTask());
                    dispatch(SnackbarActions.showSnackbar({
                        messageType:'success',
                        messageText:'Task Added!'
                    }));
                    setTimeout(()=>{dispatch(SnackbarActions.hideSnackbar())}, 4000);        
                }else{
                    throw new Error();
                }
            }catch(error){
                dispatch(SnackbarActions.showSnackbar({
                    messageType:'faliure',
                    messageText:'Unable to add Task!'
                }));
                setTimeout(()=>{dispatch(SnackbarActions.hideSnackbar())}, 4000);        
            }
        }

        createTask();
    }

    return(
        <form className={styles.addTask} onSubmit={submitHandler}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="#444"
                viewBox="0 0 16 16"
                onClick={()=>{dispatch(AddTaskActions.hideAddTask())}}
                className={styles.cancel}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg> 
            <input 
                className={styles.addTitle}
                ref={titleRef}
                onChange={(e)=>{setTitle(e.target.value);}}
                placeholder='Title'/>
            <textarea 
                className={styles.addDescription}
                ref={descriptionRef}
                placeholder='Description'/>
            <input 
                className={styles.addDate}
                ref={dueDateRef}
                defaultValue={new Date().toLocaleDateString('en-CA')}
                type='date'/>
            <button
                disabled={title===''}>
                Add
            </button>
        </form>
    );
}

export default AddTask;