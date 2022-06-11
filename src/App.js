import {db} from "./firebase/config"
import {collection, getDocs, addDoc, updateDoc, doc,deleteDoc} from 'firebase/firestore';
import {useEffect, useState} from "react";
import UseForms from "./components/useForms";

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

    const deleteUser=async (id)=>{                                                          //DELETE
        const userdoc = doc(db, "products", id)
        await deleteDoc(userdoc)
    }

    return (
        <div className="App">
            <div>
                <h1>Create Products</h1>
                <input type="text" value={value.name} name="name" placeholder="Enter name" onChange={handleChange}/>
                <input type="number" value={value.price} name="price" placeholder="Enter price"
                       onChange={handleChange}/>
                <input type="number" value={value.quantity} name="quantity" placeholder="Enter Quantity"
                       onChange={handleChange}/>
                <button onClick={addDocs}>Submit</button>
            </div>

            <h1>Products</h1>
            {products.map((value) => {
                return (
                    <div>
                        <p>
                            name:{value.name}<br/>
                            price:{value.price}<br/>
                            quantity:{value.quantity}<br/>
                            <button onClick={() => Updatedoc(value.id, value.quantity)}>Increase quantity</button><br/>
                            <button onClick={()=>deleteUser(value.id)}>Delete Product</button>
                        </p>
                    </div>
                )
            })
            }
        </div>
    );
}

export default App;
