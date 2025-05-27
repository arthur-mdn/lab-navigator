import React, { useEffect, useRef } from 'react';

function CameraPreview({ stream }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [stream]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline/>
        </div>
    );
}

export default CameraPreview;