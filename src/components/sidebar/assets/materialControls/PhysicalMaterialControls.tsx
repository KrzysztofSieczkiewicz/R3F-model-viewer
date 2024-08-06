import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { PhysicalMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { ColorPicker } from "../../controls/ColorPicker";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";

type Props = {
    properties: PhysicalMaterialProperties
}

export const PhysicalMaterialControls = ( {properties}: Props) => {

    const {transparent, opacity, flatShading, displayWireframe,
        color, emissive, roughness, metalness, ior, reflectivity,
        iridescence, iridescenceIor, sheen, sheenRoughness, sheenColor,
        clearcoat, clearcoatRoughness, specularIntensity, specularColor
    } = properties;


    return (
        <>
            <SingleLineTrait name="Transparent">
                <Checkbox
                    value={transparent}
                    handleChange={(value) => console.log("Tried updating material")} />
            </SingleLineTrait>

            <SingleLineTrait name="Opacity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005}
                        value={opacity}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Flat shading">
                <Checkbox
                    value={flatShading}
                    handleChange={(value) => console.log("Tried updating material")} />
            </SingleLineTrait>

            <SingleLineTrait name="Display wireframe">
                <Checkbox
                    value={displayWireframe}
                    handleChange={(value) => console.log("Tried updating material")} />
            </SingleLineTrait>

            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={color}
                    handleChange={(value) =>  console.log("Tried updating material") } />
            </SingleLineTrait>

            <SingleLineTrait name="Emissive">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  console.log("Tried updating material") } />
            </SingleLineTrait>

            <SingleLineTrait name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={roughness}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Metalness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={metalness}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="IOR">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={ior}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Reflectivity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={reflectivity}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Iridescence">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={iridescence}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Iridescence IOR">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={iridescenceIor}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Sheen">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheen}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Sheen roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheenRoughness}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Sheen Color">
                <ColorPicker
                    currentColor={sheenColor}
                    handleChange={(value) =>  console.log("Tried updating material") } />
            </SingleLineTrait>

            <SingleLineTrait name="Clearcoat">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoat}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Clearcoat roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoatRoughness}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Specular intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={specularIntensity}
                        handleChange={(value) => console.log("Tried updating material")} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Specular color">
                <ColorPicker
                    currentColor={specularColor}
                    handleChange={(value) =>  console.log("Tried updating material") } />
            </SingleLineTrait>
        </>
    );
}