"use client"

import { addPost } from "@/lib/actions";
import styles from "./adminPostForm.module.css"
import {useFormState} from "react-dom"
import { useState } from "react";

const AdminPostForm = ({userId}) => {

    const [state,formAction] = useFormState(addPost,undefined);
    const [formData, setFormData] = useState({
      userId: userId,
      title: '',
      slug: '',
      img: null,
      descr: '',
    });

    const handleInputChange = (e) => {
      const {name,value} = e.target;
      setFormData({...formData, [name]: value});
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
          setFormData({ ...formData, img: reader.result });
      };
      reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formAction(formData);
    };
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
        <h1>Pievienot jaunu ierakstu</h1>
        <input type="hidden" name="userId" value={userId}/>
        <input type="text" name="title" placeholder="Virsraksts" onChange={handleInputChange}/>
        <input type="text" name="slug" placeholder="Raksta tags" onChange={handleInputChange}/>
        <input type="file" name="img" accept="image/*" onChange={handleFileChange}/>
        <textarea type="text" name="descr" placeholder="Apraksts" rows={10} onChange={handleInputChange}/>
        <button>Ievietot</button>
        {state && state.error}
    </form>
  )
}

export default AdminPostForm