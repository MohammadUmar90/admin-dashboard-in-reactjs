
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import Header from "../../components/Header";


import RelevanceChart from "../../components/RelevanceChart";
const Relevance = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data').then(
        res => res.json()
        ).then(
        data => {
            setData(data);
            console.log(data);
        }
        )
    },[])

    
    return (
        <Box m="20px">
        <Header title="Relevance Chart" subtitle="Line Chart" />
        <Box height="75vh">
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <RelevanceChart data={data} />
                </div>
               
            )}
        </Box>
        </Box>
    );
};

export default Relevance;