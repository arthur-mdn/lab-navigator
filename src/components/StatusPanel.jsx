import React, { useEffect, useState } from 'react';

function StatusPanel() {
    const [fps, setFps] = useState(null);

    useEffect(() => {
        let raf;
        let last = performance.now();
        const loop = () => {
            const now = performance.now();
            const fpsNow = Math.round(1000 / (now - last));
            last = now;
            setFps(fpsNow);
            raf = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className={'infos'}>
            <h3>Infos</h3>
            <div>FPS : {fps ?? '...'} fps</div>
        </div>
    );
}

export default StatusPanel;