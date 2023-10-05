import axios from "axios";
import { ActionFunction, redirect } from "react-router-dom";

export const createProjectAction: ActionFunction = async ({ request }) => {
    console.log("CREATE");
    const formData = await request.formData();
    const project = Object.fromEntries(formData);

    try {
        let response = await axios.post('http://localhost:3001/projects', project)
        return redirect(`/project/${response.data.id}`)
    } catch(error) {
        console.error('Error:', error);
    }

    return redirect('/projects');
}