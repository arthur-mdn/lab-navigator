import React, { useState } from 'react';
import TestPanel from './components/TestPanel';
import Checklist from './components/Checklist';
import LiveConsole from './components/LiveConsole';
import useLiveConsole from './hooks/useLiveConsole';
import useAutoDetection from './hooks/useAutoDetection';
import testDefinitions from './testDefinitions';
import './index.css';
import StatusPanel from "./components/StatusPanel.jsx";

function App() {
    const { logs, log, setLogs } = useLiveConsole();
    const [checkedTests, setCheckedTests] = useState({});

    const markTest = (id, success) => {
        setCheckedTests((prev) => ({ ...prev, [id]: success }));
    };

    useAutoDetection(log, markTest);

    return (
        <div>
            <div style={{display:"flex",flexDirection:'column', gap:'1rem'}}>
                <h1>Laboratoire des fonctionnalités du navigateur</h1>
                <StatusPanel/>
                <TestPanel log={log} markTest={markTest} tests={testDefinitions} />
                <LiveConsole logs={logs} clearLogs={() => setLogs([])} />
            </div>
            <div>
                <Checklist tests={testDefinitions} checkedTests={checkedTests} setCheckedTests={setCheckedTests} />
            </div>
        </div>
    );
}

export default App;