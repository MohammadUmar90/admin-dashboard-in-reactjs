
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import Header from "../../components/Header";

import DonutChart from "../../components/Likelihood";
const Likelihood = () => {
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
        <Header title="Likelihood Chart" subtitle="Donut Chart" />
        <Box height="75vh">
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <DonutChart data={data} />
                </div>
               
            )}
        </Box>
        </Box>
    );
};

export default Likelihood;