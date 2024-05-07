"use client"
import { useState } from "react";
import styles from "./vaultModal.module.css"
import { createVault } from "@/lib/actions";
import { FaRegWindowClose } from "react-icons/fa";

const VaultModal = (userId) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [masterPassword, setMasterPassword] = useState('');

    const handleAddVaultClick = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await createVault(userId,masterPassword);
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false);
        setMasterPassword('');
    };
  return (
    <div className={styles.container}>
        <button className={styles.btn} onClick={handleAddVaultClick}>Jauna glabātuve</button>
        {isModalOpen && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <span onClick={() => setIsModalOpen(false)} className={styles.close}>
                        <FaRegWindowClose/>
                    </span>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="masterPassword">Izveidot Master Paroli:</label>
                    <input
                        type="text"
                        id="masterPassword"
                        value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                    />
                    <button className={styles.btn} type="submit">Saglabāt</button>
                    </form>
                </div>
                <h3>Padoms: Izmantojiet drošu paroli, taču atšķirīgu no jūsu konta paroles!</h3>
            </div>

        )}
    </div>
  )
}

export default VaultModal