import React, { useState } from 'react';
import MicVisualizer from './MicVisualizer';

function TestPanel({ log, markTest, tests }) {
    const [micStream, setMicStream] = useState(null);

    const toggleMic = async (id, testFn) => {
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            setMicStream(null);
            log('Micro arrêté', 'info');
            return;
        }
        runTest(id, testFn);
    };

    const runTest = (id, testFn) => {
        testFn(
            (message = `${id} réussi`) => {
                log(message, 'success');
                markTest(id, true);
            },
            (msg) => {
                log(`${id} échoué : ${msg}`, 'error');
                markTest(id, false);
            },
            id === 'mic' ? setMicStream : undefined
        );
    };

    return (
        <div>
            {tests.filter(t => !t.autoDetect).map((test) => {
                const Icon = test.icon;
                const isMic = test.id === 'mic';
                return (
                    <div key={test.id}>
                        <button
                            onClick={() => isMic ? toggleMic(test.id, test.run) : runTest(test.id, test.run)}
                        >
                            {Icon && <Icon />}<span>Test {test.label}</span>
                            {isMic && micStream && (
                                <MicVisualizer stream={micStream} onStop={() => setMicStream(null)} />
                            )}
                        </button>

                    </div>
                );
            })}
        </div>
    );
}

export default TestPanel;