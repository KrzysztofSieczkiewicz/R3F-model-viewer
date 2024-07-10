import React, { useEffect, useRef, useState } from "react";
import styles from './MultilineSlidersNumeric.module.css';
import { AxesLockButton } from "./buttons/AxesLockButton";
import { normalizeArrayByIndex } from "../../../utils/mathUtil";
import { SliderNumeric } from "./SliderNumeric";
import { SliderMediumContainer } from "./sliderContainers/SliderMediumContainer";
import { SingleLineTrait } from "../commons/traitContainers/SingleLineTrait";

type SliderProps<T> = {
    property: (keyof T),
    value: number, 
    name: string,

    min?: number, 
    max?: number, 
    step?: number,
    rounding?: number
}

type Props<T> = {
    values: SliderProps<T>[];
    handleChange: (change: Partial<T>) => void;
    displayName: string
}

export const MultilineSlidersNumeric = <T,>({displayName, values, handleChange}: Props<T>) => {

    const [startingPointYOffset, setStartingPointOffset] = useState(0);
    const [rowHeight, setRowHeight] = useState(0);
    const [isLocked, setIsLocked] = useState(true);

    const gridContainerRef = useRef<HTMLDivElement>(null);

    const ROWS_NUMBER = values.length;

    // Handles component size and children number
    useEffect(() => {
        if(!gridContainerRef.current) return;

        const calcContainerHeight = gridContainerRef.current.offsetHeight;
        const calcRowHeight = calcContainerHeight / ROWS_NUMBER;
        const calcStartingPointOffset = calcRowHeight / 2;

        setRowHeight(calcRowHeight);
        setStartingPointOffset(calcStartingPointOffset);
    }, [])

    const generateGuideLinePath = (index: number) => {
        // Determine index distance from the middle
        const avgIndex= Math.round(ROWS_NUMBER) / 2;
        const dist = avgIndex - index - 0.5;
        // Declare line lengths
        const horizontalLineLength = 18 + Math.abs(2 * dist);
        const verticalLineHeight = dist * rowHeight;
        // Determine starting points
        const startPointX = 0;
        const startPointY = index * rowHeight + startingPointYOffset;

        return (
            <svg className={styles.svg}>
                <g>
                    <line stroke="black" strokeWidth="1" 
                        x1={startPointX} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY} />
                    <line stroke="black" strokeWidth="1"
                        x1={startPointX + horizontalLineLength} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY+verticalLineHeight} />
                </g>
            </svg>
        );
    }

    const handleSliderChange= (index: number, newValue: number) => {
        const rawValues = values.map(entry => entry.value);
        let change: Partial<T>;

        if(isLocked) {
            const scales = normalizeArrayByIndex(rawValues, rawValues[index]);
            const normalizedValues = rawValues.map( (value, i) => {
                return value+(newValue-rawValues[index]) * scales[i] 
            });

            change = normalizedValues.reduce((acc, value, i) => {
                const entry = values[i];
                acc[entry.property] = value as any;
                return acc;
            }, {} as Partial<T>);
        } else {
            change = { [values[index].property]: newValue } as Partial<T>;
        }
        handleChange(change);
    }

    // TODO: PRESENT <SliderNumeric> IN A MORE READABLE WAY
    return (
        <>
            <label className={styles.containerName}>{displayName}</label>
            <div ref={gridContainerRef} className={styles.gridContainer}>
                <div className={styles.column1}>
                    {values.map((entry, index) => {
                        return (
                            <SingleLineTrait name={entry.name}>
                                <SliderMediumContainer>
                                    <SliderNumeric 
                                        key={index}
                                        min={entry.min? entry.min : 0}
                                        max={entry.max? entry.max : 100}
                                        step={entry.step? entry.step : 0.01} 
                                        rounding={entry.rounding? entry.rounding : 0} 
                                        value={entry.value} 
                                        handleChange={(val) => handleSliderChange(index, val)} />
                                </SliderMediumContainer>
                            </SingleLineTrait>
                        )
                    })}
                </div>

                <div className={styles.column2}>
                    {values.map((entry, index) => {
                        return (
                                <> {generateGuideLinePath(index)} </>
                        ); 
                    })}
                    <div className={styles.buttonContainer}>
                        <AxesLockButton locked={isLocked} setLocked={() => setIsLocked(!isLocked)} />
                    </div>
                </div>
            </div>
        </>
    );
}