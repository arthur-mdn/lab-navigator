function TestPanel({ log, markTest, tests }) {
    const runTest = (id, testFn) => {
        testFn(
            (message = `${id} réussi`) => {
                log(message, 'success');
                markTest(id, true);
            },
            (msg) => {
                log(`${id} échoué : ${msg}`, 'error');
                markTest(id, false);
            }
        );
    };

    return (
        <div>
            {tests.filter(t => !t.autoDetect).map((test) => {
                const Icon = test.icon;
                return (
                    <button
                        key={test.id}
                        onClick={() => runTest(test.id, test.run)}
                    >
                        {Icon && <Icon />}
                        <span>Test {test.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default TestPanel;