import React, { useRef, useEffect, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import { useAnimations, useGLTF } from '@react-three/drei';

import robotScene from "../objects/robot_playground.glb";

import { useSelector } from 'react-redux';

const Robot = (props) => {

    // Hooks and Three JS functions

    const robotRef = useRef();

    const { animations, scene } = useGLTF(robotScene);

    const { actions } = useAnimations(animations, scene);

    const actionRef = useRef(null);

    // Timing Settings
    const isReversingRef = useRef(false);

    const [startTime, setStartTime] = useState(1);

    const [endTime, setEndTime] = useState(4);

    const [timeScale, setTimeScale] = useState(0.8);

    const directionRef = useRef(1);

    // Redux State

    const robotState = useSelector((state) => state.counter.state);

    const RobotAnimations = {
        Greeting: () => setAnimationParams(1, 4, 0.8),

        Talking: () => setAnimationParams(2.9, 2.97, 0.26),
    };

    // ---------- Edit Animations Timing function ----------

    function setAnimationParams(start, end, scale) {

        setStartTime(start);

        setEndTime(end);

        setTimeScale(scale);

        directionRef.current = 1;

        isReversingRef.current = false;
    }

    // ---------- Reset Animation function ----------
    function resetAnimation() {

        const action = actionRef.current;

        if (action) {

            action.time = startTime;

            action.timeScale = timeScale * directionRef.current;

            action.play();
        }
    }

    // ---------- Toggle Between Different Animations ----------

    useEffect(() => {

        const action = Object.values(actions)[0];

        if (action) {

            action.timeScale = timeScale * directionRef.current;

            RobotAnimations[robotState]();

            resetAnimation();
        }

    }, [robotState]);

    // --------- Start The Animations Stored in Glb file -------

    useEffect(() => {

        const action = Object.values(actions)[0];

        if (action) {

            action.timeScale = timeScale;

            action.play();

            action.time = startTime;

            actionRef.current = action;
        }
    }, [actions, startTime, endTime, timeScale]);
    

    // --------- Reverse The Animation To create loop ---------

    useFrame(() => {

        const action = actionRef.current;

        if (action) {

            if (action.time >= endTime && !isReversingRef.current) {

                directionRef.current = -1;

                action.timeScale = timeScale * directionRef.current;

                isReversingRef.current = true;

                action.time = endTime;

            } else if (action.time <= startTime && isReversingRef.current) {

                directionRef.current = 1;

                action.timeScale = timeScale * directionRef.current;

                action.time = startTime;

                isReversingRef.current = false;
            }
        }
    });

    return (
        <group ref={robotRef} scale={[1.2, 1.2, 1.2]}>
            <primitive object={scene} />
        </group>
    );
};

export default Robot;
