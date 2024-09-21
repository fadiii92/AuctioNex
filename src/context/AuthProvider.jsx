import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';


function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, isLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
            isLoading(false)

        })



        return ()=>unsubscribe()
    }, [])

   

    const logout = async () => {
      try {
          await signOut(auth)
          setCurrentUser(null)
          console.log('User signed out');
      } catch (error) {
          console.error('Logout error:', error.message);
      }

    }


    if(loading) return <div>Loading ... ...</div>

  return (
    <AuthContext.Provider value = {{currentUser,setCurrentUser, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const AuthContext = React.createContext()

export default AuthProvider
