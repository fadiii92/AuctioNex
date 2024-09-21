import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
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
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      userName: '',
      email: '',
      password: '',
      confirmPass: '',
    },
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      
      await axios.post('https://auctionex-62baa-default-rtdb.firebaseio.com/Users.json', {
        ...data,
        uid: user.uid, 
        confirmPass: null 
      });

      console.log('User registered and details saved successfully');
      navigate('/login');

    } catch (error) {
      console.log('error error error', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('name')}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Username of your choice"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('userName')}
            />
            {errors.userName && <span className="text-red-500 text-sm">{errors.userName.message}</span>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Your Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email')}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter a Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password')}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Retype your Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('confirmPass')}
            />
            {errors.confirmPass && <span className="text-red-500 text-sm">{errors.confirmPass.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Loading....' : 'Register'}
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Signup;
