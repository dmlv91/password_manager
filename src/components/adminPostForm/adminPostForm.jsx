"use client"

import { addPost } from "@/lib/actions";
import styles from "./adminPostForm.module.css"
import {useFormState} from "react-dom"
import { useState } from "react";

const AdminPostForm = ({userId}) => {

    const [state,formAction] = useFormState(addPost,undefined);
    const [image,setImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
  return (
    <form action={formAction} className={styles.container}>
        <h1>Pievienot jaunu ierakstu</h1>
        <input type="hidden" name="userId" value={userId}/>
        <input type="text" name="title" placeholder="Virsraksts"/>
        <input type="text" name="slug" placeholder="slug"/>
        <input type="file" name="img" onChange={handleImageChange} accept="image/*" placeholder="attēls"/>
        <textarea type="text" name="descr" placeholder="Apraksts" rows={10}/>
        <button>Ievietot</button>
        {state && state.error}
    </form>
  )
}

export default AdminPostForm