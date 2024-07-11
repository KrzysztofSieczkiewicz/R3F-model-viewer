import React, { useState } from "react";

import { PositionSliders } from "../controls/PositionSliders";
import { ScaleSliders } from "../controls/ScaleSliders";
import { AssetProperties, AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { SingleLineTrait } from "../commons/traitContainers/SingleLineTrait";
import { RotationSliders } from "../controls/RotationSliders";
import { AxesLockButton } from "../controls/buttons/AxesLockButton";
import { ListItemBody } from "../commons/ListItemBody";
import { MeshSphereControls } from "./meshControls/MeshSphereControls";
import { ConeProperties, Primitives, SphereProperties } from "../../../models/Primitive";
import { MeshConeControls } from "./meshControls/MeshConeControls";
import { MeshControls } from "./meshControls/MeshControls";


type Props = {
    assetId: string,
    asset: AssetWrapper,
}

export const AssetControls = ({assetId, asset}: Props) => {
    const {updateAssetProperties, deleteAsset} = useSceneObjectsContext();
    const [ axesLocked, setAxesLocked] = useState(false);

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(assetId)} />

            <MeshControls
                assetId={assetId}
                type={asset.type}
                mesh={asset.mesh} />

            <SingleLineTrait name="Position">
                <PositionSliders
                    value={asset.properties.position}
                    step={0.005}
                    handleChange={(val) => updateAssetProperties(assetId, {position: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Rotation">
                <RotationSliders
                    value={asset.properties.rotation}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {rotation: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Scale">
                <ScaleSliders
                    value={asset.properties.scale}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {scale: val} )}
                    axesLock={axesLocked} />
                <AxesLockButton locked={axesLocked} setLocked={(val) => setAxesLocked(val)} />
            </SingleLineTrait>
        </ListItemBody>
    );

}