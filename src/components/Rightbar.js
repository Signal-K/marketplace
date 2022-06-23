import "./Rightbar.css";

const Rightbar = () => {
    const trends = [
        {
            text: "Demo demo demo",
        },
        {
            text: "Demo demo demo",
        },
        {
            text: "Demo demo demo",
        },
    ];

    return (
        <>
            <div className="rightbarContent">
                <Input label="Search" name="Search" prefixIcon="search"></Input>

                <div className="trends">
                    What's popular today?
                    {trends.map((e, i) => {
                        return (
                            <div key={i} className="trend">
                                <div className="trendText">{e.text}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}