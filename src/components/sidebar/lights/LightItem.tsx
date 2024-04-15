import { Slider } from '../common/Slider';
import { SlidersArray } from '../common/SlidersArray';
import { ColorPicker } from '../common/ColorPicker';
import { Dropdown } from '../common/Dropdown';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import React from 'react';
import { LIGHT_TYPES, LightWrapper } from '../../../models/Light';
import { VisibilityEyeButton } from '../common/VisibilityEyeButton';
import { LightTypeIcon } from '../common/LightTypeIcon';

type Props = |{
    active: boolean,
    onClick: () => void,
    light: LightWrapper
}

export const LightItem = ({ active, light, onClick }: Props) => {

    const { updateLightProperty } = useSidebarControlsContext();

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header light-item-header"
                onClick={onClick}
            >
                <LightTypeIcon light = {light} />
                <Dropdown 
                    selected={light.type} 
                    selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                    handleChange={(val) => updateLightProperty(light.id, 'type', val)}
                />
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                <VisibilityEyeButton object={light} updateProperty={updateLightProperty} />
                <span className='show-hide header-icon'>{ handleIsActive() }</span>
            </div>

            {active && <div className="dropdown-item-body">
                <SlidersArray name="Position"
                    value={light.position} step={0.01}
                    handleChange={(val: [number,number,number]) => updateLightProperty(light.id, 'position', val)}
                />
                <ColorPicker name="Color" 
                    currentColor={light.color}
                    handleChange={(val: string) => updateLightProperty(light.id, 'color', val)}/>
                <Slider name="Intensity"
                    value={light.intensity}
                    handleChange={(val: number) => updateLightProperty(light.id, 'intensity', val)}
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                <Slider name="Distance"
                    value={light.distance}
                    handleChange={(val) => updateLightProperty(light.id, 'distance', val)}
                    min={0} max={100} step={0.1} defaultValue={10}
                />
                {light.type === LIGHT_TYPES.spotLight && <>
                    <Slider name="Angle"
                        value={light.angle}
                        handleChange={(val) => updateLightProperty(light.id, 'angle', val)}
                        min={0} max={1} step={0.002} defaultValue={0.3}
                    />
                    <Slider name="Penumbra"
                        value={light.penumbra}
                        handleChange={(val) => updateLightProperty(light.id, 'penumbra', val)}
                        min={0} max={1} step={0.002} defaultValue={0.6}
                    />
                </>}
            </div>}
        </div>
    );
}