import { getUser } from "@/lib/data";
import styles from "./vault.module.css"
import { auth } from "@/lib/auth";
import { VaultForm } from "@/components/vaultForm/vaultForm";
import VaultModal from "@/components/vaultModal/vaultModal";
import { Suspense } from "react";
import PassCheckForm from "@/components/passCheckForm/passCheckForm";
import PassGenerator from "@/components/passGenerator/passGenerator";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/vault/${slug}`);

  if(!res.ok) {
    throw new Error("Something wrong")
  }
  return res.json();
}

async function PassVault() {
  var vault = ""
  const session = await auth();
  const userId = session.user.id;
  const user = await getUser(userId);
  const master = user?.master;

  //if user does not have the master password it does not have the vault as well
  // thus data fetch is unnecessary.
  if (master) {
    vault = await getData(userId)
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <PassCheckForm/>
          <PassGenerator/>
        </div>
        <div className={styles.col}>
          {master ? (
            <Suspense fallback={<div>Loading.....</div>}>
              <VaultForm props={{userId: userId,vault : vault}}/>
            </Suspense>
          ) : (
            <VaultModal userId={userId}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default PassVault;

