import styles from './auth.module.css';
import doodle from './doodle.png';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../store/store';

const Signup = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const signupHandler = async (event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredUsername = usernameRef.current.value;
        const data = JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            name:enteredUsername,
        });
        console.log(enteredEmail, enteredPassword, enteredUsername)
        try{
                const response = await fetch('http://localhost:8000/users', {
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
            alert("Invalid Signup Credentials");
        }
    } 

    return(
        <div className={styles.layout}>
            <img className={styles.sideBlock} src={doodle}></img>    
            <div className={styles.mainContent}>
                <form onSubmit={signupHandler}>
                    <input
                        onChange={(e)=>setEmail(e.target.value)}
                        ref={emailRef}
                        placeholder='email'/>
                    <input
                        type='password'
                        onChange={(e)=>setPassword(e.target.value)}
                        ref={passwordRef}
                        placeholder='password'/>
                    <input
                        type='password'
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        placeholder='confirm password'/>
                    <input
                        onChange={(e)=>setUsername(e.target.value)}
                        ref={usernameRef}
                        placeholder='username'/>
                    <button
                        disabled={email===''||password.length<6||confirmPassword!==password||username===''}>
                        Signup
                    </button>
                    <Link to='/login'>Already have an account? Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;