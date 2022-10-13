import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import doodle from './doodle.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions, SnackbarActions } from '../../store/store';
import { useRef, useState } from 'react';

const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const data = JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
        });
        try{
            const response = await fetch('http://localhost:8000/users/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
            if(!response.ok){
                throw new Error();
            }
            const responseObject = await response.json();
            dispatch(AuthActions.login({token:responseObject.token}));
            navigate('/home', {replace:true});
        }catch(error){
            alert("Invalid Login Credentials");
        }
    }
    return(
        <div className={styles.layout}>
            <img className={styles.sideBlock} src={doodle}></img>    
            <div className={styles.mainContent}>
                <form onSubmit={loginHandler}>
                    <input
                        onChange={(e)=>setEmail(e.target.value)}
                        ref={emailRef}
                        placeholder='email'/>
                    <input
                        onChange={(e)=>setPassword(e.target.value)}
                        ref={passwordRef}
                        type='password'
                        placeholder='password'/>
                    <button 
                        disabled={email===''||password.length<6}
                        type='submit'>
                        Login
                    </button>
                    <Link to='/signup'>Don't have an account? Signup</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;