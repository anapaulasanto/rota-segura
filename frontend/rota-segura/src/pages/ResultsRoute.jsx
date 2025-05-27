import React from "react";
import { useLocation } from "react-router-dom";

const ResultsRoute = () => {
    const location = useLocation();
    const result = location.state

    return (
        <section>
            <p>{result.distance.text}</p>
            <p>{result.duration.text}</p>
            <p>{result.start_address}</p>
            <p>{result.end_address}</p>
        </section>
    )
};

export default ResultsRoute;
