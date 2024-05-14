import React from 'react';
import styles from './Lights.module.css';

import { Slider } from '../common/Slider';
import { PositionSliders } from '../common/PositionSliders';
import { ColorPicker } from '../common/ColorPicker';
import { LightTypeDropdown } from './LightTypeDropdown';
import { VisibilityButton } from '../common/VisibilityButton';
import { LIGHT_TYPES, LightWrapper } from '../../../models/Light';
import { LightTypeIcon } from './LightTypeIcon';

type Props = |{
    active: boolean,
    onClick: () => void,
    light: LightWrapper,
    updateLight: (light: LightWrapper) => void,
}

export const LightItem = ({ active, onClick, light, updateLight }: Props) => {

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={active ? `${styles.lightContainer} ${styles.active}` : styles.lightContainer}>
            <div className={styles.lightHeader}
                onClick={onClick}
            >
                <LightTypeIcon light = {light} />
                <LightTypeDropdown 
                    selected={light.type} 
                    selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                    handleChange={(val) => updateLight( {...structuredClone(light), type: val} )} 
                />
                <div className={styles.colorPreview} style={{backgroundColor: light.color}}/>
                <VisibilityButton 
                    isVisible={light.visible}
                    updateObject={ (val) => updateLight( {...structuredClone(light), visible: val} )} 
                />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {active && <div className={styles.lightBody}>
                <PositionSliders name="Position"
                    value={light.position} step={0.01}
                    handleChange={(val) => updateLight( {...structuredClone(light), position: val} )} 
                />
                <ColorPicker name="Color" 
                    currentColor={light.color}
                    handleChange={(val) => updateLight( {...structuredClone(light), color: val} )}  />
                <Slider name="Intensity"
                    value={light.intensity}
                    handleChange={(val) => updateLight( {...structuredClone(light), intensity: val} )} 
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                <Slider name="Distance"
                    value={light.distance}
                    handleChange={(val) => updateLight( {...structuredClone(light), distance: val} )} 
                    min={0} max={100} step={0.1} defaultValue={10}
                />
                {light.type === LIGHT_TYPES.spotLight && <>
                    <Slider name="Angle"
                        value={light.angle}
                        handleChange={(val) => updateLight( {...structuredClone(light), angle: val} )} 
                        min={0} max={1} step={0.002} defaultValue={0.3}
                    />
                    <Slider name="Penumbra"
                        value={light.penumbra}
                        handleChange={(val) => updateLight( {...structuredClone(light), penumbra: val} )} 
                        min={0} max={1} step={0.002} defaultValue={0.6}
                    />
                </>}
            </div>}
        </div>
    );
}