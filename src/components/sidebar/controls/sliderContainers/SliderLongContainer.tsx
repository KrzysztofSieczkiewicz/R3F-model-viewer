import React, { ReactNode } from "react";
import styles from "./SliderContainers.module.css";

type Props = {
    children?: ReactNode
}

export const SliderLongContainer = ({children}: Props) => {
    return (
        <div className={styles.longContainer}>
            {children}
        </div>
    );
}