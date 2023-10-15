import { GET_Data } from "./actionTypes";
import axios from "axios";

const API = "http://localhost:5000";

const getData = (data) => ({
    type: types.GET_Data,
    payload: {
        data,
    },
});

export const loadData = () => {
    return async(dispatch) => {
        try {
            const res = await axios
                .get(`${API}/data`);
            dispatch(getData(res.data));
        } catch (err) {
            return console.log(err);
        }
    };
}