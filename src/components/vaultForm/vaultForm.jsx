"use client"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./vaultForm.module.css"
import { useState } from "react";
import { checkMaster } from "@/lib/actions";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const postData = async(data) => {
  try {
    const res = await fetch(`http://localhost:3000/api/vault/${data.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data),
    });
    var status = await res.json();
    if (!res.ok) {
      throw new Error("Something wrong")
    }
    Swal.fire(status.message)
  } catch (error) {
    console.log(error)
  }
};

export const VaultForm = ({props}) => {
  const {userId,vault} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [master, setMaster] = useState('');
  const [passwordVisible, setPasswordVisible] = useState([]);
  const [vaultDecrypted, setVaultDecrypted] = useState(false);

  const handleChange = (e) => {
    setMaster(e.target.value);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const showPassword = (index) => {
    setPasswordVisible((prev) => {
      const updateVisibility = [...prev];
      updateVisibility[index] = !updateVisibility[index]
      return updateVisibility;
    });
  };

  const triggerDecryption = async () => {
    Swal.fire({
      title: 'Apstipriniet identitāti!',
      input: 'password',
      inputPlaceholder: 'Master parole',
      showCancelButton: true,
      confirmButtonText: 'Apstiprināt',
      cancelButtonText: 'Atcelt',
      preConfirm: async (value) => {
        var status = await checkMaster(userId, value);
        if (!status) {
          setVaultDecrypted(false);
          return false;
        }
        setVaultDecrypted(true);
      }
    });
  }

  const validate = async (master,vault) => {
    try {
      var status = await checkMaster(userId,master);
      if (status) {
        postData({userId : userId, master : master, vault : vault});
        closeModal();
      } else {
        Swal.fire("Nepareiza master parole!")
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

  return (
    <>
      {vaultDecrypted ? (

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
                      type="text"
                      id={"website"+index}
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
                      id={"username"+index}
                      placeholder="Lietotājvārds"
                      {...register(`vault.${index}.username`, {
                        required: "Username is required",
                      })}
                      />
                  </div>
                  <div>
                    <label htmlFor="password">Parole</label>
                    <input 
                      type={passwordVisible[index] ? 'text' : 'password'}
                      id={"password"+index}
                      placeholder="Parole"
                      {...register(`vault.${index}.password`, {
                        required: "Password is required",
                      })}
                      />
                  </div> 
                  <button className={styles.remBtn} onClick={() => remove(index)}>-</button>
                  <button className={styles.showBtn} onClick={(e) => {
                    e.preventDefault();
                    showPassword(index);
                  }}>{passwordVisible[index] ? <FaEyeSlash/> : <FaEye/>}</button>
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
          </div>
          )}
        </form>
        ) : ( <button className={styles.addBtn} onClick={(e) => {
          e.preventDefault();
          triggerDecryption();
        }}>Atvērt glabātuvi</button>)
      }
    </>
  )
}
