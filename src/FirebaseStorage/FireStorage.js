import React, {useEffect, useState} from 'react'
import {storage} from "../firebase/config"
import  {ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

const FireStorage = () => {
    const [imageUpload, setImageUpload] = useState(null)
    const[imageList,setImageList]=useState([]) //getting image urls

    const ImageListRef=ref(storage,"images/")


    useEffect(()=>{
        listAll(ImageListRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                })
            })
        })
        console.log("succesfull")
    },[])



    const UploadImage = () => {
        if (imageUpload === null) return;
        const imageRef=ref(storage,`images/${imageUpload.name+v4()}`)
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
           getDownloadURL(snapshot.url).then((url)=>{
               setImageList((prev)=>[...prev,url])
           })
        })
    }


    return (
        <div className="d-flex flex-column p-3">
            <input className="py-2" type="file" onChange={(event) => setImageUpload(event.target.files[0])}/>
            <button onClick={UploadImage}>Upload</button>
            {imageList.map((imgURL,key)=>{
                return(
                    <img className='py-2' key={key} src={imgURL} alt="image"/>
                )
            })
            }
        </div>
    )
}

export default FireStorage
