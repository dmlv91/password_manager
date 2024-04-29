"use client"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./vaultForm.module.css"
import { useMutation } from "react-query"
import { saveVault } from "@/lib/actions"

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/vault/${slug}`);

  if(!res.ok) {
    throw new Error("Something wrong")
  }

  return res.json();
}

const postData = async(data) => {
  console.log(data)
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

    return res.json();
  } catch (error) {
    console.log(error)
  }
};

export const VaultForm = (id) => {
  const {userId} = id;
 
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
      handleSubmit(({vault}) => {
        console.log({vault});
      })
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
      {vault ? (<button className={styles.saveBtn} onClick={handleSubmit(({vault}) => {
        postData({userId: userId, vault : vault})
      })}>
        Saglabāt
      </button>) : (<div></div>)}
      
    </form>
  )
}
