"use client"
import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas } from "react-three-fiber";
import Burger from "./Hamburger";

function HomeBurger() {
  return (
    <Canvas style={{ width: "850px", height: "600px" }}>
      <ambientLight />
      <OrbitControls minDistance={4.5} maxDistance={4.5} />
      <Burger />
    </Canvas>
  );
}

export default HomeBurger;
