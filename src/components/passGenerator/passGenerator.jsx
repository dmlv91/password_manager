"use client"
import styles from "./passGenerator.module.css"
import { useState } from "react";

const PassGenerator = () => {

    const [password, setPassword] = useState("");
    const [passwordLength, setPasswordLength] = useState(12);
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
 
    const generatePassword = () => {
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!()@#\$%\^&\*])');
        const length = new RegExp('(?=.{10,})')
        let charset = "";
        let newPassword = "";
        let passwordCompatbile = false;
 
        if (useSymbols) charset += "!@#$%^&*()";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        while (!passwordCompatbile) {
            newPassword = ""
            for (let i = 0; i < passwordLength; i++) {
                newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            if (useSymbols) {
                if (special.test(newPassword)) {
                    passwordCompatbile = true
                } else {
                    passwordCompatbile = false
                    return
                }
            }
            if (useNumbers) {
                if (number.test(newPassword)) {
                    passwordCompatbile = true
                } else {
                    passwordCompatbile = false
                    return
                }
            }
            if (useLowerCase) {
                if (lower.test(newPassword)) {
                    passwordCompatbile = true
                } else {
                    passwordCompatbile = false
                    return
                }
            }
            if (useUpperCase) {
                if (upper.test(newPassword)) {
                    passwordCompatbile = true
                } else {
                    passwordCompatbile = false
                    return
                }
            }
          
            if (length.test(newPassword)) {
                passwordCompatbile = true
            } else {
                passwordCompatbile = false
                return
            }
        }
        
 
        setPassword(newPassword);
    };
 
    const copyToClipboard = () => {
        const el = document.createElement("textarea");
        el.value = password;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setSuccessMessage("Parole nokopēta!");
        setTimeout(() => setSuccessMessage(""), 2000);
        // Hide message after 2 seconds
    };
 
    return (
        <div className={styles.container}>
            <h2>Nejaušu paroļu ģenerators</h2>
            <div className={styles.box}>
                <label className={styles.label}>Paroles garums:</label>
                <input
                    type="number"
                    min="8"
                    max="50"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(e.target.value)}
                    className={styles.input}
                />
            </div>
            <div className={styles.chkBox}>
                <label>
                    <input
                        className={styles.chk}
                        type="checkbox"
                        checked={useSymbols}
                        onChange={() => setUseSymbols(!useSymbols)}
                    />
                    Simboli
                </label>
                <label>
                    <input
                        className={styles.chk}
                        type="checkbox"
                        checked={useNumbers}
                        onChange={() => setUseNumbers(!useNumbers)}
                    />
                    Skaitļi
                </label>
                <label>
                    <input
                        className={styles.chk}
                        type="checkbox"
                        checked={useLowerCase}
                        onChange={() => setUseLowerCase(!useLowerCase)}
                    />
                    Mazie burti
                </label>
                <label>
                    <input
                        className={styles.chk}
                        type="checkbox"
                        checked={useUpperCase}
                        onChange={() => setUseUpperCase(!useUpperCase)}
                    />
                    Lielie burti
                </label>
            </div>
            <button className={styles.btnGen} onClick={generatePassword}>
                Ģenerēt
            </button>
            <div className={styles.box}>
                <label className={styles.label}>Ģenerētā parole:</label>
                <input type="text" value={password} readOnly className={styles.input} />
                <button
                    className={styles.btn}
                    onClick={copyToClipboard}
                >
                    Kopēt
                </button>
            </div>
            {successMessage && (
                <p
                    style={{
                        color: "green",
                        textAlign: "center",
                    }}
                >
                    {successMessage}
                </p>
            )}
        </div>
    );
}

export default PassGenerator