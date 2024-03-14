import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { Slider } from '../controls/Slider';
import { SlidersArray } from '../controls/SlidersArray';
import { ColorPicker } from '../controls/ColorPicker';
import { Dropdown } from '../controls/Dropdown';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import React from 'react';
import { LightWrapper } from '../../../models/Light';

type Props = |{
    active: boolean,
    onClick: () => void,
    light: LightWrapper
}

export const LightItem = (props: Props) => {
    const { active, light, onClick } = props;

    const { lightsList, updateLight, updateObject } = useSidebarControlsContext();

    const handleLightType = () => {
        return(<>
            {light.type === 'pointLight' && <PointLightIcon className='type-icon header-icon' />}
            {light.type === 'spotLight' && <SpotlightIcon className='type-icon header-icon'  />}
            <Dropdown value={light.type} list={[{type: "pointLight", display: "Point light"}, {type: "spotLight", display: "Spot light"}]} 
                    handleChange={(val) => updateLight(light.id, 'type', val)}
            />
        </>)
    }

    const handleLightActive = () => {
        if(active) {
            return <span className='show-hide header-icon'>&#8657;</span>
        } else {
            return <span className='show-hide header-icon'>&#8659;</span>
        }
    }

    const handleLightVisible = () => {
        return (<span className={`visibility-icon header-icon ${!light.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                updateLight(light.id, 'visible', !light.visible)
            }}
            >&#128065;</span>
        );
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header light-item-header"
                onClick={onClick}
            >
                {handleLightType()}
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                {handleLightVisible()}
                {handleLightActive()}
            </div>

            {active && <div className="dropdown-item-body">
                <SlidersArray name="Position"
                    value={light.position} step={0.01}
                    handleChange={(val: [number,number,number]) => updateLight(light.id, 'position', val)}
                />
                <ColorPicker name="Color" 
                    value={light.color}
                    handleChange={(val: string) => updateObject(lightsList, light.id, 'color', val)}/>
                <Slider name="Intensity"
                    value={light.intensity}
                    handleChange={(val: number) => updateLight(light.id, 'intensity', val)}
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                {light.type === "spotLight" && <>
                    <Slider name="Angle"
                        value={light.angle}
                        handleChange={(val) => updateLight(light.id, 'angle', val)}
                        min={0} max={1} step={0.002} defaultValue={0.1}
                    />
                    <Slider name="Penumbra"
                        value={light.penumbra}
                        handleChange={(val) => updateLight(light.id, 'penumbra', val)}
                        min={0} max={1} step={0.002} defaultValue={0.6}
                    />
                </>}
            </div>}
        </div>
    );
}