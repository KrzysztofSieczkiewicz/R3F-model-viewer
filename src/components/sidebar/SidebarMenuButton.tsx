import React, { ReactNode } from "react";
import styles from './SidebarMenuButton.module.css';

type Props = {
    icon: ReactNode;
    children: ReactNode;
    active: boolean,
    onClick: () => void
}

export const SidebarMenuButton = (props: Props) => {
    const { icon, children, active, onClick } = props;

    return (
        <li className={styles.sidebarItem} >
            <a
                href="#" 
                className={active ? `${styles.iconButton} ${styles.active}` : styles.iconButton}
                onClick={onClick}
            >
                {icon}
            </a>

            {active && children}
        </li>
    );
}