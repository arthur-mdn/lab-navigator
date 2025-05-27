import React, { useEffect, useState } from 'react';

function StatusPanel() {
    const [fps, setFps] = useState(null);
    const [client, setClient] = useState(null);

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

    useEffect(() => {
        const uaData = navigator.userAgentData;
        if (uaData) {
            const platform = uaData.platform;
            const brands = uaData.brands.map(b => b.brand).join(', ');
            setClient(`${platform} / ${brands}`);
        } else {
            setClient(navigator.userAgent);
        }
    }, []);


    return (
        <div className={'infos'}>
            <h3>Infos</h3>
            <div>FPS : {fps ?? '...'} fps</div>
            <div className="text-sm break-words">
                Client : {client ?? '...'}
            </div>
        </div>
    );
}

export default StatusPanel;