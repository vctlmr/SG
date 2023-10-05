import { Typography } from 'antd';
import { useLoaderData, useParams } from 'react-router-dom';
import { Card } from 'antd';
import { ProjectData } from '../types/ProjectData';


const { Title } = Typography;

export const Project = () => {
    const { id } = useParams();
    const project = useLoaderData() as ProjectData;

    return (
        <div>
            {project && Object.keys(project).length > 0 ?
                <>
                <Title>Description de votre projet</Title>
                <Card title={project.nom} bordered={true} style={{
                    width: 300
                }}>{project.description}</Card>
                </>
                : <Title>Ce Projet n'existe pas</Title>
            }
        </div>
    )
}