import React, { useState } from "react";

import { PositionSliders } from "../controls/PositionSliders";
import { ScaleSliders } from "../controls/ScaleSliders";
import { AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { ItemTrait } from "../commons/ItemTrait";
import { RotationSliders } from "../controls/RotationSliders";
import { AxesLockButton } from "../controls/buttons/AxesLockButton";
import { ListItemBody } from "../commons/ListItemBody";


type Props = {
    asset: AssetWrapper,
}

export const AssetControls = ({asset}: Props) => {
    const {updateAsset, deleteAsset} = useSceneObjectsContext();
    const [ axesLocked, setAxesLocked] = useState(false);

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(asset.id)} />

            <ItemTrait name="Position">
                <PositionSliders
                    value={asset.position}
                    step={0.005}
                    handleChange={(val) => updateAsset(asset.id, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <RotationSliders
                    value={asset.rotation}
                    step={0.01}
                    handleChange={(val) => updateAsset(asset.id, {rotation: val} )} />
            </ItemTrait>

            <ItemTrait name="Scale">
                <ScaleSliders
                    value={asset.scale}
                    step={0.01}
                    handleChange={(val) => updateAsset(asset.id, {scale: val} )}
                    axesLock={axesLocked} />
                <AxesLockButton locked={axesLocked} setLocked={(val) => setAxesLocked(val)} />
            </ItemTrait>
        </ListItemBody>
    );

}