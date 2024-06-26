import React, { useState } from "react";

import { PositionSliders } from "../controls/PositionSliders";
import { ScaleSliders } from "../controls/ScaleSliders";
import { AssetProperties, AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { ItemTrait } from "../commons/ItemTrait";
import { RotationSliders } from "../controls/RotationSliders";
import { AxesLockButton } from "../controls/buttons/AxesLockButton";
import { ListItemBody } from "../commons/ListItemBody";


type Props = {
    assetId: string,
    assetProperties: AssetProperties,
}

export const AssetControls = ({assetId, assetProperties}: Props) => {
    const {updateAssetProperties, deleteAsset} = useSceneObjectsContext();
    const [ axesLocked, setAxesLocked] = useState(false);

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(assetId)} />

            <ItemTrait name="Position">
                <PositionSliders
                    value={assetProperties.position}
                    step={0.005}
                    handleChange={(val) => updateAssetProperties(assetId, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <RotationSliders
                    value={assetProperties.rotation}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {rotation: val} )} />
            </ItemTrait>

            <ItemTrait name="Scale">
                <ScaleSliders
                    value={assetProperties.scale}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {scale: val} )}
                    axesLock={axesLocked} />
                <AxesLockButton locked={axesLocked} setLocked={(val) => setAxesLocked(val)} />
            </ItemTrait>
        </ListItemBody>
    );

}