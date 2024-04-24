import React from "react";
import styles from './VisibilityButton.module.css';
import { EditableWrapper } from "../SidebarControlsContext";

type Props = {
    object: EditableWrapper,
    updateObject: (isVisible: boolean) => void
}

export const VisibilityButton = ({object, updateObject} :Props): JSX.Element => {
    return (
        <button
            className={object.visible ? styles.button : `${styles.button} ${styles.suppressed}`}
            onClick={(e) => {
                e.stopPropagation();
                updateObject(!object.visible)
            }}
        >&#128065;</button>
    );
}