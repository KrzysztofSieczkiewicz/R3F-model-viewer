import { useContext } from "react";
import { ColorPicker } from "../controls/ColorPicker";

import SidebarControlsContext from '../../sidebar/SidebarControlsContext'   
import { Slider } from "../controls/Slider";

export function SceneMenu() {
    const { scene, updateScene } = useContext(SidebarControlsContext);

    const handleItemClick = () => {

    };
    
    return (
        <div className="dropdown">
            <section>
                <p>Background</p>
                <ColorPicker name="Color" 
                    value={scene.backgroundColor}
                    handleChange={(val) => updateScene('backgroundColor', val)}
                />
            </section>
            <section>
                <p>Ambient light</p>
                <ColorPicker name="Color"
                    value={scene.ambientLight.color}
                    handleChange={(val) => updateScene('ambientLight.color', val)}
                />
                <Slider name="Intensity"
                    value={scene.ambientLight.intensity}
                    handleChange={(val) => updateScene('ambientLight.intensity', val)}
                    min={0} max={3} step={0.001} defaultValue={0.1}
                />
            </section>
        </div>
    );
}