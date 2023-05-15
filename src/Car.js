import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        "models/car/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object) => {
            if(object.instanceofMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, ([gltf.scene]));

    return <primitive object={gltf.scene} />
}