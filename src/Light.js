import { useRef, useState } from "react";

export function Light() {
    const lightRef = useRef();

    const types = {
        pointLight: "pointLight",
        spotLight: "spotLight",
        ambientLight: "ambientLight"
    }

    const [castShadow, setCastShadow] = useState(true);
    const [position, setPosition] = useState([5,5,0]);
    const [color, setColor] = useState([1,1,1]);
    const [intensity, setIntensity] = useState(1);
    const [type, setType] = useState("ambientLight");

    const [angle, setAngle] = useState(0.5);
    const [penumbra, setPenumbra] = useState(0.5);

    switch(type) {
        case "pointLight":
            return <pointLight
                ref={lightRef}
                position={position}
                color={color}
                intensity={intensity}
                castShadow={castShadow}
                shadow-bias={-0.0008}
            />;
        case "spotLight":
            return <spotLight
                ref={lightRef}
                position={position}
                color={color}
                intensity={intensity}
                angle={angle}
                penumbra={penumbra}
                castShadow={castShadow}
                shadow-bias={-0.0008}
            />;
            case "ambientLight":
        return <ambientLight
            ref={lightRef}
            color={color}
            intensity={intensity}
        />;
        default:
            return null;
    }
}