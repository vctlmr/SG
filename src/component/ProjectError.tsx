import { useRouteError } from "react-router-dom"
import { Typography } from "antd"

const { Title } = Typography;

export const ProjectError = () => {
    const error = useRouteError()

    return (
        <div className="error-container">
            <Title>Something Went Wrong Loading your project</Title>
        </div>
    )
}