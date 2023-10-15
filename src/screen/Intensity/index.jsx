import ChartCom from "../../components/Intensity";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import RegionFilter from "../../components/RegionFilter";
const Intensity = () => {
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

    const [selectedRegion, setSelectedRegion] = useState('');

    
    
    return (
        <Box m="20px">
        <Header title="Intensity Chart" subtitle="Bar Chart" />
        <Box height="75vh">
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <RegionFilter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
                    <ChartCom data={data} selectedRegion={selectedRegion} />
                </div>
               
            )}
        </Box>
        </Box>
    );
};

export default Intensity;