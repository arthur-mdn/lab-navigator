import React, { useState } from 'react';
import TestPanel from './components/TestPanel';
import Checklist from './components/Checklist';
import LiveConsole from './components/LiveConsole';
import useLiveConsole from './hooks/useLiveConsole';
import useAutoDetection from './hooks/useAutoDetection';
import testDefinitions from './testDefinitions';
import './index.css';

function App() {
    const { logs, log } = useLiveConsole();
    const [checkedTests, setCheckedTests] = useState({});

    const markTest = (id, success) => {
        setCheckedTests((prev) => ({ ...prev, [id]: success }));
    };

    useAutoDetection(log, markTest);

    return (
        <div>
            <div>
                <h1>🌐 Laboratoire des fonctionnalités navigateur</h1>
                <TestPanel log={log} markTest={markTest} tests={testDefinitions} />
                <LiveConsole logs={logs} />
            </div>
            <div>
                <Checklist tests={testDefinitions} checkedTests={checkedTests} setCheckedTests={setCheckedTests} />
            </div>
        </div>
    );
}

export default App;