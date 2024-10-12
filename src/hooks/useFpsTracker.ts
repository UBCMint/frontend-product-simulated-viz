import { useEffect, useRef, useState } from 'react';

export default function useFpsTracker() {
    const [fps, setFps] = useState<number>(0);
    const lastRenderTime = useRef<number>(performance.now());
    const frameCount = useRef<number>(0);

    useEffect(() => {
        const updateFps = () => {
            const now = performance.now();
            const delta = now - lastRenderTime.current;
            frameCount.current++;

            if (delta >= 1000) {
                // Update FPS every second
                const currentFps = (frameCount.current / delta) * 1000;
                setFps(Math.round(currentFps));
                frameCount.current = 0;
                lastRenderTime.current = now;
            }

            requestAnimationFrame(updateFps);
        };

        const requestId = requestAnimationFrame(updateFps);

        return () => cancelAnimationFrame(requestId); // Cleanup when the component unmounts
    }, []);

    return fps; // Return the current FPS value
}
