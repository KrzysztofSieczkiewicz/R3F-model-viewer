import React from "react";
import { ReactNode, useEffect, useState } from "react";
import styles from './SilderNumeric.module.css';

import { roundNumber } from "../../../utils/mathUtil";

type Props = {
    step: number,
    rounding: number,
    value: number,
    handleChange: (newValue: number) => void,
    
    children?: ReactNode,
}

// TODO: MOVE CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE
export const SliderNumeric = ({step, rounding, value, handleChange, children}: Props) => {
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"];

    const handleInput = (newValue: number) => {
        handleChange(newValue);
    }

    const handleMouseUp = () =>  setIsMouseDown(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (event: MouseEvent) => {
        const calculatedX = event.clientX - startingPosX;
        handleInput(value + calculatedX * step);
    };

    useEffect(() => {
        if(!isMouseDown) return;
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    // TODO: REINTRODUCE AXIS COLOR INDICATOR
    return (
        <div className={styles.slider}
            onMouseDown={(e) => { handleMouseDown(e) }} >
            <div className={styles.axisColorIndicator} style={{ backgroundColor: indicatorColors[0] }}/>
            <div className={styles.track} 
                onMouseDown={(e) => handleMouseDown(e)} >
                <span className={styles.arrow}>&#60;</span>
                <span className={styles.value}>{roundNumber(value, rounding)}</span>
                <span className={`${styles.arrow} ${styles.right}`}>&#62;</span>
            </div>
            {children}
        </div>
    );
}