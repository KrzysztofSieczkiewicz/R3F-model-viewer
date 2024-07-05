import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from './MultilineTraits.module.css';

type Props = {
    children: ReactNode
}

// TODO: if name is provided display it in the first column (centered)
// Then display all provided children in the second column
// Then, if provided -> display helper lines and "lock" button in the third column
export const MultilineTraits = ({children}: Props) => {

    const [rowHeight, setRowHeight] = useState(0);
    const [startingPointYOffset, setStartingPointOffset] = useState(0);

    const gridContainerRef = useRef<HTMLDivElement>(null);

    const ROWS_NUMBER = React.Children.count(children);

    useEffect(() => {
        if(!gridContainerRef.current) return;

        const calcContainerHeight = gridContainerRef.current.offsetHeight;
        const calcRowHeight = calcContainerHeight / ROWS_NUMBER;
        const calcStartingPointOffset = calcRowHeight / 2;

        setRowHeight(calcRowHeight);
        setStartingPointOffset(calcStartingPointOffset);
    }, [])

    const generateLinePath = (index: number) => {
        // Determine index distance from the middle
        const avgIndex= Math.round(ROWS_NUMBER / 2) /2;
        const dist = avgIndex - index;
        console.log(index + ": " + dist)

        // Declare line lengths
        const horizontalLineLength = 15 + Math.abs(2 * dist);
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

    //TODO: MAKE THE MAIN CONTAINER TO BE A GRID, COLUMN WITH LINE PATHS SHOULD BE FILLING THE WHOLE GRID CELL
    // THEN YOU CAN DIVIDE SVG HEIGHT BY THE NUMBER OF CHILDREN TO GET APPROX ROW HEIGHT (AND BY THIS CALCULATE EACH LINE
    // STARTING AND ENDING HEIGHT)
    return (
        <div ref={gridContainerRef} className={styles.gridContainer}>

            <div className={styles.column1}>
                {React.Children.map(children, (child, index) => {
                    return (
                        <div>{child}</div>
                    );
                })}
            </div>

            <div className={styles.column2}>
                {React.Children.map(children, (child, index) => {
                    return (
                            <> {generateLinePath(index)} </>
                    ); 
                })}
            </div>

        </div>
    );
}