import { useEffect, useRef } from "react";

function LiveConsole({ logs, clearLogs }) {
    const consoleRef = useRef(null);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col gap-2">

            <div className={"console"}>
                <div className={"console_header"}>
                    <h2>Console</h2>
                    <button onClick={clearLogs}>
                        🗑️ Vider la console
                    </button>
                </div>
                <div ref={consoleRef} className={"console_content"}>
                    {logs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default LiveConsole;