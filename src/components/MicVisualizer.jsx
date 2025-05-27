import {useEffect, useRef, useState} from "react";

function MicVisualizer({ stream }) {
    const [volume, setVolume] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        // merci chatgpt pour cette partie x)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.fftSize);
        source.connect(analyser);

        const update = () => {
            analyser.getByteTimeDomainData(dataArray);
            const norm = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0) / dataArray.length;
            const volumeLevel = Math.min(norm / 50, 1);
            setVolume(volumeLevel);
            animationRef.current = requestAnimationFrame(update);
        };

        update();

        return () => {
            cancelAnimationFrame(animationRef.current);
            analyser.disconnect();
            source.disconnect();
            audioContext.close();
        };
    }, [stream]);

    return (
        <div style={{width:'100%', height:'20px', borderRadius:'5rem',overflow:'hidden',backgroundColor:"#4d4d4d"}}>
            <div style={{ height:'100%', width: `${volume * 100}%`, backgroundColor: `#${Math.floor(volume * 255).toString(16).padStart(2, '0')}ff00`}}></div>
        </div>
    );
}

export default MicVisualizer;
