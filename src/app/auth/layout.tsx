import React from 'react';
import {auth} from "@/auth.config";
import {redirect} from "next/navigation";
import styles from './layout.module.scss'

const ShopLayout = async ({children}:{children: React.ReactNode}) => {
    const session = await auth()
    if(session?.user){
        redirect('/')
    }
    return (
      <main className={styles.container}>
          <div className={styles.div}>
              {children}
          </div>
      </main>
    );
};

export default ShopLayout;