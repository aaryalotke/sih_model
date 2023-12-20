import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import Model from '../assets/3d/freshfood.glb';

const islandScene = Model;

export default function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  // currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials, animations } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

 

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };


  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  const {actions} = useAnimations(animations, islandRef);



  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    // if (!isRotating) {
      // Apply damping factor
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    // } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      // this part is causing some problem
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      // }
    }
  });

 
  

  return (
    <group ref={islandRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[-0.004, 0, 0.001]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group
            name="e4767a3a428442afa3e639953b6a3d99fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="g_Diorama" rotation={[-Math.PI, 0, -Math.PI]}>
                  <group name="g_Burger" position={[-0.281, 0.126, 0]}>
                    <group
                      name="pBurger_Bun_Top"
                      position={[-0.428, 3.19, -0.227]}
                      rotation={[0.23, -0.021, -0.237]}
                    >
                      <mesh
                        name="pBurger_Bun_Top_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pBurger_Bun_Top_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Pickle2"
                      position={[-1.805, 2.811, -1.389]}
                      rotation={[-0.655, -0.136, 0.045]}
                      scale={[0.609, 0.823, 0.609]}
                    >
                      <mesh
                        name="pBurger_Pickle2_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pBurger_Pickle2_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Pickle1"
                      position={[-0.261, 2.51, -0.273]}
                      rotation={[-2.287, -1.357, -2.673]}
                      scale={[0.627, 0.848, 0.627]}
                    >
                      <mesh
                        name="pBurger_Pickle1_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pBurger_Pickle1_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Onion"
                      position={[-1.175, 2.915, -0.439]}
                      rotation={[-0.502, 0.143, -0.548]}
                    >
                      <mesh
                        name="pBurger_Onion_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.pBurger_Onion_surface_opaque_0.geometry}
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Tomato"
                      position={[-0.455, 2.723, -1.219]}
                      rotation={[-0.684, 0.267, 0.109]}
                    >
                      <mesh
                        name="pBurger_Tomato_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pBurger_Tomato_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Salad"
                      position={[-0.649, 2.324, -0.272]}
                      rotation={[0.149, -0.014, -0.016]}
                    >
                      <mesh
                        name="pBurger_Salad_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.pBurger_Salad_surface_opaque_0.geometry}
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Cheese"
                      position={[-0.604, 1.936, -0.395]}
                      rotation={[-0.093, 0.3, 0.073]}
                    >
                      <mesh
                        name="pBurger_Cheese_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pBurger_Cheese_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Patty"
                      position={[-0.207, 1.772, 0.065]}
                      rotation={[-0.672, 0.884, 0.391]}
                    >
                      <mesh
                        name="pBurger_Patty_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.pBurger_Patty_surface_opaque_0.geometry}
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pBurger_Bun_Base"
                      position={[-0.199, 0.975, 0.021]}
                      rotation={[-0.536, -0.161, 0.4]}
                    >
                      <mesh
                        name="pBurger_Bun_Base_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pBurger_Bun_Base_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                  </group>
                  <group name="g_Cup" position={[0, 7.818, 0]} scale={0.816}>
                    <group
                      name="g_Cup_Top"
                      position={[-0.459, 0.28, 1.244]}
                      rotation={[0.46, 0.554, -0.282]}
                    >
                      <group
                        name="pCup_Straw"
                        position={[0.001, 0.062, -0.022]}
                        rotation={[0.109, 0.112, 0.061]}
                      >
                        <mesh
                          name="pCup_Straw_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.pCup_Straw_surface_opaque_0.geometry}
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group
                        name="pCup_Top"
                        position={[0, -0.152, 0]}
                        scale={0.92}
                      >
                        <mesh
                          name="pCup_Top_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.pCup_Top_surface_opaque_0.geometry}
                          material={materials.surface_opaque}
                        />
                      </group>
                    </group>
                    <group
                      name="g_Cup_Main"
                      position={[-1.79, -1.891, 0.952]}
                      rotation={[-0.47, -0.054, 0.33]}
                    >
                      <group
                        name="pCup_Soda_Swirl"
                        position={[0.301, 0.011, -0.223]}
                        rotation={[0.291, 0.574, 0.193]}
                        scale={0.332}
                      >
                        <mesh
                          name="pCup_Soda_Swirl_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.pCup_Soda_Swirl_surface_opaque_0.geometry
                          }
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group name="pCup_Main" position={[0, -0.852, -0.003]}>
                        <mesh
                          name="pCup_Main_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.pCup_Main_surface_opaque_0.geometry}
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group
                        name="pCup_Soda_Base"
                        position={[0, 0.056, -0.003]}
                        rotation={[0.043, 0.756, -0.063]}
                        scale={0.722}
                      >
                        <mesh
                          name="pCup_Soda_Base_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.pCup_Soda_Base_surface_opaque_0.geometry
                          }
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group
                        name="pCup_Soda_Drop"
                        position={[0.476, 1.297, 0.764]}
                        rotation={[-0.032, 0.022, -1.884]}
                        scale={0.194}
                      >
                        <mesh
                          name="pCup_Soda_Drop_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.pCup_Soda_Drop_surface_opaque_0.geometry
                          }
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group
                        name="pCup_Soda_Drop1"
                        position={[1.238, 0.649, 0.4]}
                        rotation={[-1.202, 0.351, -1.583]}
                        scale={[0.117, 0.096, 0.117]}
                      >
                        <mesh
                          name="pCup_Soda_Drop1_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.pCup_Soda_Drop1_surface_opaque_0.geometry
                          }
                          material={materials.surface_opaque}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="g_Fries"
                    position={[2.573, 4.376, -0.488]}
                    rotation={[0.339, 0.305, -0.376]}
                    scale={1.199}
                  >
                    <group
                      name="g_Fries_Main"
                      position={[-0.695, -1.252, 0.096]}
                      rotation={[0, 0.017, 0.001]}
                    >
                      <group name="pFries_Main" position={[0, 0.981, 0.029]}>
                        <mesh
                          name="pFries_Main_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.pFries_Main_surface_opaque_0.geometry}
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group name="pFries_Box" position={[0, 0.4, 0]}>
                        <mesh
                          name="pFries_Box_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.pFries_Box_surface_opaque_0.geometry}
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group
                        name="pFries_Single1"
                        position={[0.076, 0.879, -0.256]}
                        rotation={[-0.105, -0.02, 0.015]}
                      >
                        <mesh
                          name="pFries_Single1_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.pFries_Single1_surface_opaque_0.geometry
                          }
                          material={materials.surface_opaque}
                        />
                      </group>
                      <group
                        name="pFries_Single2"
                        position={[-0.292, 0.83, -0.261]}
                        rotation={[-0.086, 0, 0.074]}
                      >
                        <mesh
                          name="pFries_Single2_surface_opaque_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.pFries_Single2_surface_opaque_0.geometry
                          }
                          material={materials.surface_opaque}
                        />
                      </group>
                    </group>
                    <group
                      name="pFries_Single3"
                      position={[0.88, -0.244, -0.157]}
                      rotation={[0.755, 0.078, -0.629]}
                    >
                      <mesh
                        name="pFries_Single3_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pFries_Single3_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                    <group
                      name="pFries_Single4"
                      position={[0.075, 0.891, 0.027]}
                      rotation={[-1.006, 0.566, 0.072]}
                    >
                      <mesh
                        name="pFries_Single4_surface_opaque_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.pFries_Single4_surface_opaque_0.geometry
                        }
                        material={materials.surface_opaque}
                      />
                    </group>
                  </group>
                  <group
                    name="p_Plate"
                    position={[-0.025, 0.232, 0.061]}
                    rotation={[2.76, -0.308, 3.131]}
                  >
                    <mesh
                      name="p_Plate_surface_opaque_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Plate_surface_opaque_0.geometry}
                      material={materials.surface_opaque}
                    />
                  </group>
                  <group
                    name="p_Spot"
                    position={[-0.062, 11.783, 1.127]}
                    scale={[1, 0.978, 1]}
                  >
                    <mesh
                      name="p_Spot_surface_alpha_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Spot_surface_alpha_0.geometry}
                      material={materials.surface_alpha}
                    />
                  </group>
                  <group
                    name="p_Swirl"
                    position={[-0.203, 3.953, -0.287]}
                    rotation={[0, -0.004, 0]}
                  >
                    <mesh
                      name="p_Swirl_surface_alpha_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Swirl_surface_alpha_0.geometry}
                      material={materials.surface_alpha}
                    />
                  </group>
                  <group
                    name="p_Sparkle"
                    position={[1.241, 6.244, -0.331]}
                    rotation={[0.026, -0.2, 0.005]}
                    scale={1.782}
                  >
                    <mesh
                      name="p_Sparkle_surface_alpha_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Sparkle_surface_alpha_0.geometry}
                      material={materials.surface_alpha}
                    />
                  </group>
                  <group
                    name="p_Sparkle1"
                    position={[0.403, 5.429, -0.285]}
                    rotation={[-0.054, 0.368, 0.019]}
                    scale={1.046}
                  >
                    <mesh
                      name="p_Sparkle1_surface_alpha_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Sparkle1_surface_alpha_0.geometry}
                      material={materials.surface_alpha}
                    />
                  </group>
                  <group
                    name="p_Sparkle2"
                    position={[1.817, 1.776, -0.687]}
                    rotation={[-0.04, -0.131, -0.017]}
                    scale={1.1}
                  >
                    <mesh
                      name="p_Sparkle2_surface_alpha_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Sparkle2_surface_alpha_0.geometry}
                      material={materials.surface_alpha}
                    />
                  </group>
                  <group
                    name="p_Sparkle3"
                    position={[-3.144, 3.756, -1.571]}
                    rotation={[-0.015, 0.381, 0.005]}
                    scale={1.351}
                  >
                    <mesh
                      name="p_Sparkle3_surface_alpha_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.p_Sparkle3_surface_alpha_0.geometry}
                      material={materials.surface_alpha}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}