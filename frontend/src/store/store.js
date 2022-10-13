import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";

const AddTaskSlice = createSlice({
    name:'AddTask',
    initialState:{isVisible:false},
    reducers:{
        showAddTask: (state)=>{
            state.isVisible=true;
        },
        hideAddTask: (state)=>{
            state.isVisible=false;
        }
    }
});

const SnackbarSlice = createSlice({
    name:'Snackbar',
    initialState:{isVisible:false, messageType:'success', messageText:null},
    reducers:{
        showSnackbar: (state, action)=>{
            state.isVisible=true;
            state.messageType = action.payload.messageType;
            state.messageText = action.payload.messageText;
        },
        hideSnackbar: (state)=>{
            state.isVisible=false;
            state.type='success';
            state.messageText='';
        }
    }
})

const AuthSlice = createSlice({
    name:'Auth',
    initialState:{token:localStorage.getItem('token')},
    reducers:{
        login: (state, action)=>{
            console.log('trying to login...')
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state)=>{
            state.token = null;
            localStorage.removeItem('token');
        }
    },
});

const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (token)=>{
        const tasks = await fetch('http://localhost:8000/tasks', {
            method:'GET',
            headers:{
                'Authorization':'Bearer ' + token
            },
        });
        const tasksObject = await tasks.json();
        return tasksObject.filter((task)=>task.completed===false);
    }
)

const TasksSlice = createSlice({
    name: 'Tasks',
    initialState:{tasks:[]},
    reducers:{
        addTask: (state,{payload})=>{
            state.tasks = [...state.tasks, payload];
        },
        removeTask: (state, {payload})=>{
            state.tasks = state.tasks.filter((task)=>task.id!=payload);
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchTasks.fulfilled, (state, {payload})=>{
            state.tasks = payload.map(({_id, title, dueDate, completed})=>{
                return {
                    id: _id,
                    title,
                    completed,
                    dueDate,
                }
            });
        })
    }
  })

const store = configureStore({
    reducer:{
        AddTask: AddTaskSlice.reducer,
        Snackbar: SnackbarSlice.reducer,
        Auth: AuthSlice.reducer,
        Tasks: TasksSlice.reducer,
    }
});

export default store;
export const AddTaskActions = AddTaskSlice.actions;
export const SnackbarActions = SnackbarSlice.actions;
export const AuthActions = AuthSlice.actions;
export const TasksActions = TasksSlice.actions;
export {fetchTasks};