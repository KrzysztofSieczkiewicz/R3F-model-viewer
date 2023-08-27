import { useEffect, useState } from "react";

// TODO: ADD OPTION OF PROVIDING MIN/MAX VALUES -> RENAME -> USE FOR ROTATION AND SCALE AS WELL
export function PositionSliders(props) {
    const { step, value, handleChange} = props;

    const [ handledPosition, setHandledPosition ] = useState(value);
    // RED GREEN BLUE
    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"];

    const [ currentSlider, setCurrentSlider ] = useState();
    const [ startingPosX, setStartingPosX ] = useState();
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    function handlePosition(newArray) {
        if (newArray.some((element) => isNaN(element))) {
            setHandledPosition(0);
        } else {
            setHandledPosition(newArray);
        }
    }

    const handleMouseDown = (e) => {
        setStartingPosX(e.clientX);
        setCurrentSlider(e.currentTarget);
        setIsMouseDown(true);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const calculatedX = event.clientX - startingPosX;
            const currentIndex = currentSlider.getAttribute('index');

            const newHandledPosition = [...handledPosition];
            newHandledPosition[currentIndex] = Math.round((handledPosition[currentIndex] + calculatedX * step) * 100) / 100;

            handlePosition(newHandledPosition);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
        };

        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    useEffect(() => {
        if (handledPosition !== 0) {
            handleChange(handledPosition);
        }
    }, [handledPosition])

    function handleCoordinateSlider() {
        return (
            <>
            {handledPosition.map((position, index) => {
                console.log(handledPosition);
                return (
                    <div className="input-slider slider-array-three" 
                        key={index}
                        index={index}
                        onMouseDown={(e) => {
                            handleMouseDown(e)
                        }}
                    >
                        <div className="position-color-indicator" style={{ backgroundColor: indicatorColors[index] }}/>
                        <icon className="slider-arrow left">&#60;</icon>
                        <span className="slider-value">{position}</span>
                        <icon className="slider-arrow right">&#62;</icon>
                    </div>
                )
            })}
            </>
        );
    }

    return (
        <div className="trait">
            <label className="trait-name">{props.name}</label>
            {handleCoordinateSlider()}
        </div>
    );
}