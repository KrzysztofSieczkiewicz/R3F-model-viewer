import React from "react";
import styles from './VisibilityButton.module.css';
import { EditableWrapper } from "../SceneObjectsContext";

type Props = {
    object: EditableWrapper,
    updateObject: (isVisible: boolean) => void
}

// TODO: change updateObject to callback function to avoid passing whole object reference.
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