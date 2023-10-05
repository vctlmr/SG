import { useRouteError } from "react-router-dom"
import { Typography } from "antd"

const { Title } = Typography;

export const UsersProjectsError = () => {
    const error = useRouteError()

    return (
        <div className="error-container">
            <Title>Something Went Wrong Loading your projects</Title>
        </div>
    )
}