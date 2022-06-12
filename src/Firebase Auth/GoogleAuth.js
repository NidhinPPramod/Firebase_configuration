import React from 'react'
import {signInWithGoogle} from "../firebase/config"

const GoogleAuth = () => {

    const googleAuth = () => {
        signInWithGoogle().then((response) => {
            const name=response.user.displayName
            const email=response.user.email
            const profPic=response.user.photoURL

            localStorage.setItem("name",name)
            localStorage.setItem("email",email)
            localStorage.setItem("profilePic",profPic)
        }).catch((err=>{
            console.log(err)
        }))
    }
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <button className="btn btn-outline-primary my-3" onClick={googleAuth}>Sign In With Google
                <i className="fa-brands fa-google mx-2"/></button>
            <div className="bg-black d-flex flex-column p-5 rounded text-white">
                <h1>Google details</h1>
                <h2>Name:{localStorage.getItem("name")}</h2>
                <h2>Email:{localStorage.getItem("email")}</h2>
                <img className="rounded-circle my-2" src={localStorage.getItem("profilePic")} alt="profileimg"/>
            </div>
        </div>
    )
}

export default GoogleAuth
