import { getUser } from "@/lib/data";
import styles from "./vault.module.css"
import { auth } from "@/lib/auth";
import { VaultForm } from "@/components/vaultForm/vaultForm";
import VaultModal from "@/components/vaultModal/vaultModal";
import { Suspense } from "react";

async function PassVault() {
  
  const session = await auth();
  const userId = session.user.id;
  const user = await getUser(userId);
  var hasVault = false

  if (user.vault) {
    hasVault = true
  }

  return (
    <div className={styles.container}>
      {hasVault ? (
        <Suspense fallback={<div>Loading...</div>}>
          <VaultForm />
        </Suspense>
      ) : (
        <VaultModal />
      )}
    </div>
  );
}

export default PassVault;

