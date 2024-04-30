"use client"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./vaultForm.module.css"
import { useState } from "react";
import { checkMaster } from "@/lib/actions";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/vault/${slug}`);

  if(!res.ok) {
    throw new Error("Something wrong")
  }
  return res.json();
}

const postData = async(data) => {
  try {
    const res = await fetch(`http://localhost:3000/api/vault/${data.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Something wrong")
    }

    console.log(res.json())
  } catch (error) {
    console.log(error)
  }
};

export const VaultForm = (id) => {
  var errorMessage = ""
  const {userId} = id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [master, setMaster] = useState('');

  const handleChange = (e) => {
    setMaster(e.target.value);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const validate = async (master,vault) => {
    try {
      var status = await checkMaster(userId,master);
      if (status) {
        postData({userId : userId, master : master, vault : vault});
        closeModal();
      } else {
        errorMessage = "Nepareiza master parole!"
      }
    } catch (error) {
      console.log(error)
    }
  }

  const {control, register, handleSubmit} = useForm({
    defaultValues: {
      vault,
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "vault"
  });

  var vault = getData(userId)
  return (
    <form className={styles.container} onSubmit={(e) => {
      e.preventDefault();
    }}>
      {fields.map((field,index) => {
        return (
          <div className={styles.vaultEntry} key={field.id}>
            <div className={styles.inputWrapper}>
              <div>
                <label htmlFor="website">Vietne</label>
                <input 
                  type="url"
                  id="website"
                  placeholder="Vietne"
                  {...register(`vault.${index}.website`, {
                    required: "Website is required",
                  })}
                  />
              </div>
              <div>
                <label htmlFor="username">Lietotājvārds</label>
                <input 
                  type="text"
                  id="username"
                  placeholder="Lietotājvārds"
                  {...register(`vault.${index}.username`, {
                    required: "Username is required",
                  })}
                  />
              </div>
              <div>
                <label htmlFor="password">Parole</label>
                <input 
                  type="text"
                  id="password"
                  placeholder="Parole"
                  {...register(`vault.${index}.password`, {
                    required: "Password is required",
                  })}
                  />
              </div> 
              <button className={styles.remBtn} onClick={() => remove(index)}>-</button>
            </div>
              </div>
        );
      })}
      <button className={styles.addBtn} onClick={() => append({website : "", username : "", password : ""})}>
        Pievienot
      </button>
      <button className={styles.saveBtn} onClick={openModal}>
        Saglabāt
      </button>
      {isModalOpen && (
        <div className={styles.modal}>
            <input 
              type="password" 
              id="master" 
              placeholder="Master Parole"
              value={master}
              onChange={handleChange}
              />
            <button className={styles.modalSubmit} onClick={handleSubmit(({vault}) => {
              validate(master,vault);
            })} >Apstiprināt</button>
          <button className={styles.modalCancel} onClick={closeModal}>Atcelt</button>
          <span>{errorMessage}</span>
      </div>
      )}
    </form>
  )
}
