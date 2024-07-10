import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";
import { SliderMediumContainer } from "../../controls/sliderContainers/SliderMediumContainer";
import { MultilineSlidersNumeric } from "../../controls/MultilineSlidersNumeric";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshSphereControls = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (
        <ExpandableTraits name={"Mesh controls"}>
            <SingleLineTrait name="Radius">
                <SliderMediumContainer>
                    <SliderNumeric
                        value={meshProperties.radius}
                        step={0.01}
                        min={0.01}
                        rounding={2}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
                </SliderMediumContainer>
            </SingleLineTrait>

            <MultilineSlidersNumeric<SphereProperties>
                displayName="Segments:" 
                values={[ 
                    {property: 'heightSegments', value: meshProperties.heightSegments},
                    {property: 'widthSegments', value: meshProperties.widthSegments} ]}
                handleChange={(change) => updatePrimitiveProperties(assetId, change)} />
        </ExpandableTraits>
    );

}