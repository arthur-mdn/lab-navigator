import React, { useState } from 'react';
import MicVisualizer from './MicVisualizer';
import CameraPreview from './CameraPreview';

function TestPanel({ log, markTest, tests }) {
    const [micStream, setMicStream] = useState(null);
    const [camStream, setCamStream] = useState(null);

    const toggleStream = async (id, testFn, streamState, setStream) => {
        if (streamState) {
            streamState.getTracks().forEach(track => track.stop());
            setStream(null);
            log(`${id === 'mic' ? 'Micro' : 'Caméra'} arrêté`, 'info');
            return;
        }
        runTest(id, testFn, setStream);
    };

    const runTest = (id, testFn, setStream) => {
        testFn(
            (message = `${id} réussi`) => {
                log(message, 'success');
                markTest(id, true);
            },
            (msg) => {
                log(`${id} échoué : ${msg}`, 'error');
                markTest(id, false);
            },
            setStream
        );
    };
    return (
        <div>
            {tests.filter(t => !t.autoDetect).map((test) => {
                const Icon = test.icon;
                const isMic = test.id === 'mic';
                const isCam = test.id === 'camera';
                return (
                    <div key={test.id}>
                        <button
                            onClick={() =>
                                isMic ? toggleStream('mic', test.run, micStream, setMicStream)
                                    : isCam ? toggleStream('camera', test.run, camStream, setCamStream)
                                        : runTest(test.id, test.run)
                            }
                        >
                            {Icon && <Icon />}<span>Test {test.label}</span>
                            {isMic && micStream && (
                                <MicVisualizer stream={micStream} onStop={() => setMicStream(null)} />
                            )}
                            {isCam && camStream && <CameraPreview stream={camStream} />}
                        </button>

                    </div>
                );
            })}
        </div>
    );
}

export default TestPanel;