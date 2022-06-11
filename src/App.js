import {db} from "./firebase/config"
import {collection, getDocs} from 'firebase/firestore';
import {useEffect, useState} from "react";

function App() {

    const [products, setProducts] = useState([])
    const collectionRef = collection(db, "products")

    useEffect(() => {
        getDocs(collectionRef).then((response)=>{
           setProducts(response.docs.map((obj)=>({...obj.data(),id:obj.id})))
            })
    }, [])


    return (
        <div className="App">
            <h1>Products</h1>
            {products.map((value) => {
                return (
                    <div>
                        <p>
                            name:{value.name}<br/>
                            price:{value.price}<br/>
                            quantity:{value.quantity}<br/>
                        </p>
                    </div>
                )
            })
            }
        </div>
    );
}

export default App;
