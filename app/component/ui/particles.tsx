import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#ffffff",
                    },
                },
                fpsLimit: 30,  // Lowered FPS for better performance
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        onClick: {
                            enable: true, // Enable click interactions
                            mode: "push", // Push particles outward on click
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse", // Repulse particles on hover
                        },
                        resize: true,
                    },
                    modes: {
                        bubble: {
                            distance: 300,
                            duration: 2,
                            opacity: 0.8,
                            size: 30,
                        },
                        repulse: {
                            distance: 400, 
                            duration: 0.4,
                        },
                        push: {
                            particles: {
                                number: {
                                    value: 10, // Number of particles to generate on click
                                },
                                size: {
                                    value: 5, // Size of the new particles
                                },
                                move: {
                                    speed: 3, // Speed of particles when pushed
                                },
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#000", // Particle color
                    },
                    links: {
                        color: "#000", // Link color
                        distance: 300, // Reduced link distance for less complexity
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: true,
                        speed: 1.5, // Reduced speed for smoother mobile performance
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800, // Larger area to space out particles more
                        },
                        value: 40, // Reduced the number of particles
                    },
                    opacity: {
                        value: 0.7, // Lowered opacity for better rendering
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        random: true,
                        value: 4, // Smaller particles for less rendering load
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;
