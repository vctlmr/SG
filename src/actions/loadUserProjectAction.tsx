import axios from "axios";
import { ActionFunction } from "react-router-dom";

export const loadUserProjectAction: ActionFunction = async () => {
    const cancelToken = axios.CancelToken.source();

    try {
        const response = await axios.get('http://localhost:3001/projects', { cancelToken: cancelToken.token });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }

    return () => {
        cancelToken.cancel();
    }
}