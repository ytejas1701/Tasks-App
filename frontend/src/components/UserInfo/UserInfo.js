import InfoField from './InfoField';
import styles from './UserInfo.module.css';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { AuthActions } from '../../store/store';
import { useEffect, useState } from 'react';

const UserInfo = ()=>{
    const token = useSelector(state=>state.Auth.token);

    const [userInfo, setUserInfo] = useState({});
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        dispatch(AuthActions.logout());
    }
    useEffect(()=>{
        const fetchData = async function (){
            const response = await fetch('http://localhost:8000/me', {
                method:'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                }
            });
            const responseObject = await response.json();
            setUserInfo(responseObject);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.userInfo}>
            <InfoField 
                label={'Username'} 
                value={userInfo.name}/>
            <InfoField 
                label={'Email'} 
                value={userInfo.email}/>
            <InfoField 
                label={'Password'} 
                value={userInfo.password}/>
            <button className={styles.delete} onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default UserInfo;