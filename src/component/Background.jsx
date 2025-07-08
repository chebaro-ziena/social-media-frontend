import React from "react";
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";


export default function Background() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);
  return (

    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
      fullScreen: { enable: true, zIndex: -1 },
      background: {
        color: "#1a002b", // Dark purple
      },
      particles: {
        number: {
        value: 120,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["#ffffff", "#cccccc", "#ff66cc"], // white, grey, pink
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.7,
        random: true,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.3,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }}
    />
    


  )
}