import CenterContent from './components/UI/CenterContent';
import { Routes, Route, Navigate, } from "react-router-dom";
import UserInfo from './components/UserInfo/UserInfo';
import TaskBox from './components/Tasks/TaskBox';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { useSelector } from 'react-redux/es/exports'; 
import CompletedTasks from './components/CompletedTasks/CompletedTasks';

function App() {
  const token = useSelector((state)=>state.Auth.token);
  return (
        <Routes>
            <Route path='/' element={token!==undefined&&token!==null?<CenterContent/>:<Navigate to='login'/>}>
              <Route index element={<Navigate to='home'/>}/>
              <Route path='/home' element={<Home/>} />
              <Route path='/me' element={<UserInfo/>} />
              <Route path='/tasks' element={<CompletedTasks/>}/>
              <Route path='tasks/:id' element={<TaskBox/>}/>
            </Route>
            <Route path='/login' element={token!=null?<Navigate to='/'/>:<Login/>}/>
            <Route path='/signup' element={token!=null?<Navigate to='/'/>:<Signup/>}/>
        </Routes>
  );
}

export default App;
