import React, { useEffect, useState } from 'react';
import {FiBattery, FiBatteryCharging, FiMonitor, FiUser} from "react-icons/fi";

function StatusPanel() {
    const [fps, setFps] = useState(null);
    const [client, setClient] = useState(null);
    const [battery, setBattery] = useState(null);

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
        const updateBattery = async () => {
            try {
                const b = await navigator.getBattery();
                const refresh = () => {
                    setBattery({
                        level: Math.round(b.level * 100),
                        charging: b.charging
                    });
                };
                b.addEventListener('levelchange', refresh);
                b.addEventListener('chargingchange', refresh);
                refresh();
            } catch {
                setBattery(null);
            }
        };
        updateBattery();
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
            <h2>Infos</h2>
            <div>
                <div><FiMonitor/> {fps ?? '...'} FPS</div>
                <div>
                    {battery ? (
                        <>
                            {battery.charging ? <FiBatteryCharging/> : <FiBattery/>} {battery.level}%
                        </>
                    ) : 'Batterie indisponible '}
                </div>
                <div>
                    <FiUser/> {client ?? '...'}
                </div>
            </div>
        </div>
    );
}

export default StatusPanel;