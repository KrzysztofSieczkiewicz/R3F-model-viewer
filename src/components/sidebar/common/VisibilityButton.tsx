import React from "react";
import styles from './VisibilityButton.module.css';

type Props = {
    isVisible: boolean
    updateObject: (isVisible: boolean) => void
}

export const VisibilityButton = ({isVisible, updateObject} :Props): JSX.Element => {
    return (
        <button
            className={isVisible ? styles.button : `${styles.button} ${styles.suppressed}`}
            onClick={(e) => {
                e.stopPropagation();
                updateObject(!isVisible)
            }}
        >&#128065;</button>
    );
}