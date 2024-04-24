import React from "react";
import { useSidebarControlsContext } from "../../components/sidebar/SidebarControlsContext";

export const AmbientLight = () => {
    const { scene } = useSidebarControlsContext();

    return (
        <ambientLight 
            color={scene.ambientLight.color} 
            intensity={scene.ambientLight.intensity} 
        />
    );
}