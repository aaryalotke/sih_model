import React from 'react'

import {auth, provider} from "../../firebase";
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const Auth = ({setIsAuth}) => {

    const signInWithGoogle = async () =>{

        try{

            const result = await signInWithPopup(auth, provider);
            setIsAuth(true);
            cookies.set("auth-token", result.user.refreshToken);
        }
        catch(e){
            console.error(e);
        }

    }


  return (
    <div className='Auth'>
        <p>
            Sign in with google to continue
        </p>
        <button onClick={signInWithGoogle}>
            Sign in with google
        </button>
    </div>
  )
}

export default Auth;