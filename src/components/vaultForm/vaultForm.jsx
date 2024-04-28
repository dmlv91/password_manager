"use client"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./vaultForm.module.css"
import { useMutation } from "react-query"
import { saveVault } from "@/lib/actions"

export const VaultForm = async (params) => {
  console.log(params)
  const vault = params.params.vault;
  const master = params.params.master;
  const userId = params.params.userId;

  const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/vault/${slug}`);
  
    if(!res.ok) {
      throw new Error("Something wrong")
    }
  
    return res.json();
  }

  const postData = async(data) => {
    try {
      const res = await fetch('http://localhost:3000/api/vault', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something wrong")
      }

      const resData = await res.json();
      console.log(resData)
    } catch (error) {
      console.log(error)
    }
  };


  const {control, register, handleSubmit} = useForm({
    defaultValues: {
      vault,
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "vault"
  });

  // const mutation  = useMutation(saveVault(userId, vault));
  var test = getData(userId)
  console.log("Test", test)

  postData(params);
  return (
    <div className={styles.container} onSubmit={handleSubmit(({vault}) => {
      console.log({vault});
      
    })}>
      {fields.map((field,index) => {
        return (
          <div className={styles.vaultEntry} key={field.id}>
            <form>
            <label htmlFor="website">Website</label>
              <input 
                type="url"
                id="website"
                placeholder="Vietne"
                {...register(`vault.${index}.website`, {
                  required: "Website is required",
                })}
                />
            </form>
            <form>
            <label htmlFor="username">Username</label>
              <input 
                type="text"
                id="username"
                placeholder="Lietotājvārds"
                {...register(`vault.${index}.username`, {
                  required: "Username is required",
                })}
                />
            </form>
            <form>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Parole"
                {...register(`vault.${index}.password`, {
                  required: "Password is required",
                })}
                />
            </form>
            <button className={styles.remBtn} onClick={() => remove(index)}>-</button>
          </div>
        );
      })}
      <button className={styles.addBtn} onClick={() => append({website : "", username : "", password : ""})}>
        Pievienot
      </button>

      <button className={styles.saveBtn} type="submit">
        Saglabāt
      </button>
    </div>
  )
}
