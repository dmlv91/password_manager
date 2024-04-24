"use client"
import { useState } from "react";
import styles from "./vaultModal.module.css"
import { addVault } from "@/lib/actions";

const VaultModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [masterPassword, setMasterPassword] = useState('');

    const handleAddVaultClick = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await addVault(masterPassword);
        } catch (error) {
            console.log(error)
        }
        // Close the modal after submitting
        setIsModalOpen(false);
        // Reset master password field
        setMasterPassword('');
    };
  return (
    <div className={styles.container}>
        <button className={styles.ddBtn} onClick={handleAddVaultClick}>ADD VAULT</button>
        {isModalOpen && (
            <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span onClick={() => setIsModalOpen(false)} className={styles.close}>&times;</span>
                <h2>Add Vault</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="masterPassword">Master Password:</label>
                <input
                    type="password"
                    id="masterPassword"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
                </form>
            </div>
            </div>
        )}
    </div>
  )
}

export default VaultModal