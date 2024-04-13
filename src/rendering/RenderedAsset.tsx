import * as THREE from "three";
import { Outlines, useGLTF } from "@react-three/drei";
import { PivotControls } from "@react-three/drei/web/pivotControls";
import { useEffect, useRef, useState } from "react";
import { AssetWrapper } from "../models/Asset";
import React from "react";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, Mesh, Object3DEventMap } from "three";

type Props = {
    asset: AssetWrapper,
    isSelected: boolean,
}

type GLTFResult = GLTF & {
    nodes: {
      [key: string]: THREE.Mesh;
    };
  };

export const RenderedAsset = ( {asset, isSelected}: Props) => {
    const { updateAssetProperty, updateSelected } = useSidebarControlsContext();

    const [ position, setPosition ] = useState(asset.position);

    const [ isHovered, setIsHovered ] = useState(false);

    const [ isOutline, setIsOutline ] = useState(false);
    const [ outlineColor, setOutlineColor ] = useState("white")

    const meshRef = useRef<Mesh>(null);	
    const controlsRef = useRef<Group<Object3DEventMap>>(null)
    
    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;

    // ON COMPONEN LOAD => SET POSITION CONTROLS TO MATCH ASSET POSITION
    useEffect(() => {
        const initialMatrix = new THREE.Matrix4();

        const initialControlsPosition = new THREE.Vector3(...asset.position);
        //initialMatrix.setPosition(initialControlsPosition);
        //controlsRef.current?.applyMatrix4(initialMatrix);

        const initialRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(...asset.rotation));
        //initialMatrix.makeRotationFromEuler(initialRotation);
        //controlsRef.current?.applyMatrix4(initialMatrix);

        initialMatrix.compose(initialControlsPosition, initialRotation, new THREE.Vector3(1,1,1))
        controlsRef.current?.applyMatrix4(initialMatrix);

    }, []);

    const handleControlsDrag = (local: THREE.Matrix4) => {
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();

        // HANDLE POSITION BY SETTING MATRIX4
        //local.copyPosition(new THREE.Matrix4().setPosition(new THREE.Vector3(...asset.position)));

        local.decompose(position, quaternion, scale);
        const rotation = new THREE.Euler().setFromQuaternion(quaternion);

        updateAssetProperty(asset.id, 'position', [position.x, position.y, position.z])
        //updateAssetProperty(asset.id, 'rotation', [rotation.x, rotation.y, rotation.z])
    };
    
    useEffect( () => {// TODO: MOVE COLORS TO SOME COMMON FILE TO BE SHARED ACROSS ALL COMPONENTS
        if (!isSelected && !isHovered) {
            setIsOutline(false);
        } else if (isSelected && !isHovered) {
            setIsOutline(true);
            setOutlineColor("#00BFFF");
        } else if (!isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#E0FFFF");
        } else if (isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#00FFFF");
        }
     }, [isHovered, isSelected])

    
    
    if(!asset.visible) return;

    // TODO: UNIFY ROTATION UNITS, EVERYTHING IS USING DIFFERENT SYSTEM

    // TODO [TUTORING]: SENSIBLE WAY TO HAVE PIVOTCONTROLS SEPARATE FROM MESH? MORE ABOUT PROPER STATE MANAGEMENT THAT TECHNICAL PROPS
    // remember to use fixed={} flag to allow detachment. You can also use useFrame() to move PivotControls to the mesh at all times,
    // not sure about rotation tho
    // WOULD THIS ALLOW TO MOVE PIVOTCONTROLS TO SEPARATE COMPONENT WITH LESS ISSUES?
    return (
        <group>
            <PivotControls
            // REPLACE THIS WITH SEPARATE CONTROLS FOR DIFFERENT ACTIONS, EACH HAS JUST TO MANAGE SINGLE STATE/UPDATE
                //anchor={[0,0,0]}
                ref={controlsRef}
                fixed={false}
                //rotation={asset.rotation}
                scale={1}
                onDrag={ (local) => { handleControlsDrag(local) }}
                disableAxes={false}
                disableRotations={false}
                disableSliders={false}
                depthTest={false} />

                <mesh
                    matrixWorldAutoUpdate={true}
                    onPointerOver={() => setIsHovered(true) }
                    onPointerOut={() => setIsHovered(false) }
                    onClick={() => updateSelected(asset.id) } 
                    castShadow = {asset.castShadow}
                    receiveShadow = {asset.receiveShadow}
                    geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry} // TODO: Still to be parametrized
                    material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material} // TODO: As above
                    position={asset.position}
                    rotation={asset.rotation}
                    scale={asset.scale}
                >

                    {isOutline && 
                    <Outlines 
                        thickness={0.0025} 
                        color={outlineColor} 
                        screenspace={false} 
                        opacity={1} 
                        transparent={false} 
                        angle={0} 
                    />}

                </mesh>
        </group>
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");
