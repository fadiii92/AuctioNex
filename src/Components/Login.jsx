import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../firebaseConfig'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState(null);
const navigate = useNavigate()


  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      navigate('/')
    } catch (error) {
      console.error('Login error:', error.message);
      setLoginError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Your Email Address"
        {...register('email', { required: "Email is required" })}
      />
      {errors.email && <span className="error-message">{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Your Password"
        {...register('password', { required: "Password is required" })}
      />
      {errors.password && <span className="error-message">{errors.password.message}</span>}

      {loginError && <span className="error-message">{loginError}</span>}

      <button type="submit" disabled = {isSubmitting}>{isSubmitting ? '....Loading' : 'Submit'}</button>
    </form>
  );
};

export default Login;
