import axios from "axios";
import { ActionFunction, redirect } from "react-router-dom";

export const deleteProjectAction: ActionFunction = async ({ request }) => {
    console.log("DELETE")
    const formData = await request.formData();
    const id = formData.get('id');
    // Error handling a faire
    await axios.delete(`http://localhost:3001/projects/${id}`);

    return redirect('/')
}