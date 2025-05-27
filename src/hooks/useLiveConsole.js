import { useState } from 'react';

const logPrefix = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    event: '📢',
};

function useLiveConsole() {
    const [logs, setLogs] = useState([]);

    const log = (message, type = 'info') => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, `[${time}] ${logPrefix[type]} ${message}`]);
    };

    return { logs, log, setLogs};
}

export default useLiveConsole;
