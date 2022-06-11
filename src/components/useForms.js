import {useState} from "react";

const UseForms = (initialValue) => {  //Custom Hook Creation
    const [value, setValue] = useState(initialValue)

    return [
        value,
        (event) => {
            setValue({
                ...value, [event.target.name]: event.target.value,
            })
        }
    ]
}

export default UseForms
