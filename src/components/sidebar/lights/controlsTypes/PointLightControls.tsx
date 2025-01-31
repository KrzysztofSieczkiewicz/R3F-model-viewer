import React from "react";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

import { SliderLimited } from "../../controls/SliderLimited";
import { ColorPicker } from "../../controls/ColorPicker";
import { PointLightProperties } from "../../../../models/Light";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { SlidersArray } from "../../controls/SlidersArray";

type Props = {
    id: string,
    properties: PointLightProperties,
}

export const PointLightControls = ( {id, properties}: Props ) => {
    const { updateLightProperties, deleteLight } = useSceneObjectsContext();

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteLight(id)} />

            <SingleLineTrait name="Position">
                <SlidersArray
                    value={properties.position}
                    step={0.01}
                    handleChange={(val) => updateLightProperties(id, {position: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={properties.color}
                    handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            </SingleLineTrait>

            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderLimited 
                        value={properties.intensity}
                        handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                        min={0} max={3} step={0.005} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {intensity: 1} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Distance">
                <SliderLongContainer>
                    <SliderLimited 
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {distance: 10} )} />
            </SingleLineTrait>
        </ListItemBody>
    );
}