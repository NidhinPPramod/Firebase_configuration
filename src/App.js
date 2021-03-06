import {db} from "./firebase/config"
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {useEffect, useState} from "react";
import UseForms from "./components/useForms";
import Auth from "./Firebase Auth/Auth";
import GoogleAuth from "./Firebase Auth/GoogleAuth";
import FireStorage from "./FirebaseStorage/FireStorage";

function App() {

    const [products, setProducts] = useState([])
    const collectionRef = collection(db, "products")

    const [value, handleChange] = UseForms({name: "", price: "", quantity: ""})


    useEffect(() => {                                                                       //READ
        getDocs(collectionRef).then((response) => {
            setProducts(response.docs.map((obj) => ({...obj.data(), id: obj.id})))
        })
    }, [])

    const addDocs = async () => {                                                           //CREATE
        await addDoc(collectionRef, {name: value.name, price: value.price, quantity: Number(value.quantity)})
    }

    const Updatedoc = async (id, quantity) => {                                             //UPDATE
        const userdoc = doc(db, "products", id)
        await updateDoc(userdoc, {quantity: quantity + 1})
    }

    const deleteUser = async (id) => {                                                          //DELETE
        const userdoc = doc(db, "products", id)
        await deleteDoc(userdoc)
    }

    return (
        <div className="App">
            <div className="p-3">
                <h1>Create Products</h1>
                <input type="text" value={value.name} name="name" placeholder="Enter name" onChange={handleChange}/>
                <input type="number" value={value.price} name="price" placeholder="Enter price"
                       onChange={handleChange}/>
                <input type="number" value={value.quantity} name="quantity" placeholder="Enter Quantity"
                       onChange={handleChange}/>
                <button onClick={addDocs}>Submit</button>
            </div>

            <h1 className="p-3">Products</h1>
            {products.map((value) => {
                return (
                    <div>
                        <p>
                            name:{value.name}<br/>
                            price:{value.price}<br/>
                            quantity:{value.quantity}<br/>
                            <button onClick={() => Updatedoc(value.id, value.quantity)}>Increase quantity</button>
                            <br/>
                            <button onClick={() => deleteUser(value.id)}>Delete Product</button>
                        </p>
                    </div>
                )
            })
            }
            <div className="d-flex flex-column justify-content-center align-items-center p-3">
                <h1>Firebase AUTHENTICATION</h1>
                <Auth/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-3 mt-2">
                <h1>Google Authentication</h1>
                <GoogleAuth/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-3 mt-2">
                <h1>File Upload</h1>
                <FireStorage/>
            </div>

        </div>
    );
}

export default App;
