import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'; // Import your Firebase configuration
import { createUserWithEmailAndPassword } from 'firebase/auth';

const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    userName: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPass: z.string().min(6, "Confirm password must be at least 6 characters long"),
  }).refine((data) => data.password === data.confirmPass, {
    path: ['confirmPass'], 
    message: "Passwords don't match",
  });

function Signup() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm({
            defaultValues: {
                name: '',
                userName:'',
                email:'',
                password:'',
                confirmPass:'',
            },
            resolver : zodResolver(formSchema)
    })

    const onSubmit =async (data)=>{
        try{
          const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

          // POST request to save additional user details
          await axios.post('https://auctionex-62baa-default-rtdb.firebaseio.com/Users.json', {
              ...data,
              uid: user.uid, // Include UID for reference
              confirmPass: null // Remove confirmPass from saved data
          });

          console.log('User registered and details saved successfully');
          navigate('/login');

        }
        catch(error)
        {
            console.log('error error error' , error)
        }

    }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Your Full Name" {...register('name')} />
      {errors.name && <span className="error-message">{errors.name.message}</span>}

      <input type="text" placeholder="Username of your choice" {...register('userName')} />
      {errors.userName && <span className="error-message">{errors.userName.message}</span>}

      <input type="text" placeholder="Your Email Address" {...register('email')} />
      {errors.email && <span className="error-message">{errors.email.message}</span>}

      <input type="password" placeholder="Enter a Password" {...register('password')} />
      {errors.password && <span className="error-message">{errors.password.message}</span>}

      <input type="password" placeholder="Retype your Password" {...register('confirmPass')} />
      {errors.confirmPass && <span className="error-message">{errors.confirmPass.message}</span>}

      <button type="submit" disabled = {isSubmitting}>{isSubmitting ? 'Loading....' : 'Register'}</button>
    </form>
    </div>
  )
}

export default Signup
