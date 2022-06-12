import React, {useEffect, useState} from 'react'
import UseForms from "../components/useForms";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut,signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase/config"

const Auth = () => {

    const [value, handleChange] = UseForms({signemail: "", signpass: "", logemail: "", logpass: ""})

    const [user, setUser] = useState({})

    useEffect(()=>{
       onAuthStateChanged(auth,async (currentuser)=>{
                setUser(currentuser)
        })
    },[])


    const register = async () => {                //CREATE USER
        try {
            const user = await createUserWithEmailAndPassword(auth, value.signemail, value.signpass)
            console.log(user)
        } catch (err) {
            console.log(err.message)
        }
    }

    const login = async () => {                                             //USER LOGIN
        try {
            const user = await signInWithEmailAndPassword(auth, value.logemail, value.logpass)
            console.log(user)
        } catch (err) {
            console.log(err.message)
        }
    }

    const logout = async () => {                                            //USER LOGOUT
        await signOut(auth)
    }

    return (
        <div className="d-flex flex-column">
            <div className="p-3">
                <h1>Sign up</h1>
                <input type="email" placeholder="Email" value={value.signemail} name="signemail"
                       onChange={handleChange}/>
                <input type="password" value={value.signpass} name="signpass" placeholder="Password"
                       onChange={handleChange}/>
                <button className="btn btn-dark" onClick={register}>Sign Up</button>
            </div>
            <div className="p-3">
                <h1>Log In</h1>
                <input placeholder="Email" value={value.logemail} name="logemail" onChange={handleChange}/>
                <input type="password" value={value.logpass} name="logpass" placeholder="Password"
                       onChange={handleChange}/>
                <button className="btn btn-dark"onClick={login}>Log in</button>
            </div>
            <div className="p-3">
                <h3>User Logged in:{user?.email}</h3>
                <button className="btn btn-success" onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Auth
