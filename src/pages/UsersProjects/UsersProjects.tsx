import { useEffect, useState } from 'react'
import { Button, Space, Typography, Table, Form as AntdForm, Input, Select, Modal } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { ProjectData } from '../../types/ProjectData';
import { Link, useLoaderData, Form as ReactRouterForm, useSubmit } from 'react-router-dom';
import { ProjectDataFormat } from '../../types/ProjectDataFormat';

const { Title } = Typography;
const { Option } = Select;

const ProjectColumns: ColumnsType<ProjectData> = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'nom',
        dataIndex: 'nom',
        render: (text, project) => (
            <Link
                to={`/project/${project.id}`}
                state={{ project: { ...project } }}
            >{text}</Link>
        ),
        key: 'nom',
    },
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'commentaire',
        dataIndex: 'commentaire',
        key: 'commentaire',
    },
    {
        title: 'etape',
        dataIndex: 'etape',
        key: 'etape',
        filters: [
            {
                text: 'En cours',
                value: 'En cours',
            },
            {
                text: 'En attente',
                value: 'En attente',
            },
            {
                text: 'Terminé',
                value: 'Terminé',
            },
        ],
        onFilter: (value: string, project: ProjectData) => project.etape.indexOf(value) === 0,
        sorter: (a, b) => a.etape.localeCompare(b.etape),
        sortDirections: ['ascend'],
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: (project: ProjectData) =>
        (
            <ReactRouterForm method="delete" action={`/project/delete/${project.id}`} replace>
                <Button type="primary" htmlType='submit'>Supprimer</Button>
                <input type="hidden" name="id" value={project.id} hidden readOnly />
            </ReactRouterForm>
        )
    },
]

const onChange: TableProps<ProjectData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export const UsersProjects = () => {
    const [projects, setProjects] = useState(([] as ProjectData[]));
    const [datasource, setDataSource] = useState(([] as ProjectDataFormat[]));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = useLoaderData() as ProjectData[];
    const [form] = AntdForm.useForm();
    let submit = useSubmit();

    const formatData = (data: ProjectData[]): ProjectDataFormat[] => {
        const formattedData: ProjectDataFormat[] = data.map((project) => {
            const formattedItem: ProjectDataFormat = {
                ...project,
                key: project.id
            }


            return formattedItem;
        })
        return formattedData;
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => submit(values, {
                method: "post",
                action: `/project/create`
            }))
            .then(() => {
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (data) {
            setProjects(data);
            let formattedData = formatData(data);
            setDataSource(formattedData);
        }
    }, [data])

    const onStatusChange = (value: string) => {
        switch (value) {
            case 'En attente':
                form.setFieldsValue({ note: 'En attente' });
                break;
            case 'En cours':
                form.setFieldsValue({ note: 'En cours' });
                break;
            case 'Terminé':
                form.setFieldsValue({ note: 'Terminé' });
                break;
            default:
        }
    };

    return (
        <div>
            <Title>Vos Projets</Title>
            <Space direction="horizontal" size="large" style={{ display: 'flex' }}>
                <Button type='primary' onClick={() => showModal()}>Ajouter un projet</Button>
            </Space>
            {projects && projects.length > 0 ?
                <Table dataSource={datasource} columns={ProjectColumns} Rowkey={(project: ProjectData) => `row-${project.id}`} onChange={onChange} />
                : <h1>Vous n'avez pas de projets</h1>
            }
            {
                <Modal
                    title="Ajouter un projet"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    onOk={handleSubmit}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    ]}
                >
                    <AntdForm
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        form={form}
                        autoComplete="off"
                    >
                        <AntdForm.Item name="nom" label="Nom" rules={[{ required: true, message: `Merci d'entrer un nom de projet` }]}>
                            <Input />
                        </AntdForm.Item>

                        <AntdForm.Item name="description" label="Description" rules={[{ required: true, message: `Merci d'entrer une description` }]}>
                            <Input />
                        </AntdForm.Item>

                        <AntdForm.Item name="commentaire" label="Commentaire" rules={[{ required: true, message: `Merci d'entrer un commentaire` }]}>
                            <Input />
                        </AntdForm.Item>

                        <AntdForm.Item name="etape" label="Etape" rules={[{ required: true, message: `Merci de choisir une étape` }]}>
                            <Select
                                placeholder="Choisir l'étape du projet"
                                onChange={onStatusChange}
                                allowClear
                            >
                                <Option value="En attente">En attente</Option>
                                <Option value="En cours">En cours</Option>
                                <Option value="Terminé">Terminé</Option>
                            </Select>
                        </AntdForm.Item>
                    </AntdForm>
                </Modal>
            }
        </div>
    )
}
