import {useEffect, useRef} from "react";

function LiveConsole({ logs }) {
    const consoleRef = useRef(null);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div ref={consoleRef} className="console">
            {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
            ))}
        </div>
    );
}

export default LiveConsole;