import axios from "axios";
import { ActionFunction } from "react-router-dom";

export const loadProjectAction: ActionFunction = async ({ params }) => {
    const { id } = params;

    // error handling à ajouter pour les differents codes
    try {
        const response = await axios.get(`http://localhost:3001/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error('error', error);
    }
}