import { getUser } from "@/lib/data";
import styles from "./vault.module.css"
import { auth } from "@/lib/auth";
import { VaultForm } from "@/components/vaultForm/vaultForm";
import VaultModal from "@/components/vaultModal/vaultModal";
import { Suspense } from "react";
import PassCheckForm from "@/components/passCheckForm/passCheckForm";
import PassGenerator from "@/components/passGenerator/passGenerator";

async function PassVault() {
  
  const session = await auth();
  const userId = session.user.id;
  const user = await getUser(userId);
  const vault = user.vault;
  const master = user?.master
  const params = {
    userId : userId,
    vault : vault,
    master : master
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
              <VaultForm params={params}/>
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

