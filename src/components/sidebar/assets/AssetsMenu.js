import { useContext, useState } from "react";
import SidebarControlsContext from '../../SidebarControlsContext'
import { AssetItem } from "./AssetItem";

export function AssetsMenu() {
    const { assetsList, updateAsset } = useContext(SidebarControlsContext);
   
    const [activeItem, setActiveItem] = useState();

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item)
        }
    };
    
    return (
        <div className="dropdown">
            {assetsList.map((asset) => {
                return (
                    <AssetItem
                        asset={asset} 
                        updateAsset={updateAsset} 
                        key={asset.id}
                        active={activeItem === asset.id}
                        onClick={() => handleItemClick(asset.id)}
                    />
                );
            })}
        </div>
    );
}