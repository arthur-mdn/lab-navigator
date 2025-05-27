function Checklist({ tests, checkedTests, setCheckedTests }) {
    const toggleCheck = (id) => {
        setCheckedTests((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={"checklist"}>
            <h2>Checklist</h2>
            <div>
                {tests.map((test) => (
                    <div key={test.id}>
                        <input
                            type="checkbox"
                            checked={!!checkedTests[test.id]}
                            onChange={() => toggleCheck(test.id)}
                        />
                        <label>{test.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Checklist;