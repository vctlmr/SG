import { render, screen } from '@testing-library/react';
import { Project } from "./Project"
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ProjectData } from '../types/ProjectData';

test('render project infos', async () => {
    const params = { id: "1" }
    const data: ProjectData = {
        id: 1,
        nom: "Nom du projet",
        description: "Description du projet",
        commentaire: "Commentaire du projet",
        etape: "En cours"
    }

    const routes = [
        {
          path: "/project/:id",
          element: <Project />,
          loader: () => data,
        },
      ];

      const router = createMemoryRouter(routes,{
        initialEntries: [`/project/${params.id}`],
        initialIndex: 1,
      });

      render(
        <RouterProvider router={router}/>
      )

    await screen.findByRole('heading')

    expect(screen.getByText("Description de votre projet")).toBeInTheDocument();
    expect(screen.getByText(data.nom)).toBeInTheDocument();
    expect(screen.getByText(data.description)).toBeInTheDocument();
})

test('render no project when data are not retrieved', async () => { 
  const params = { id: "1" }
  const data = {}

  const routes = [
      {
        path: "/project/:id",
        element: <Project />,
        loader: () => data,
      },
    ];

    const router = createMemoryRouter(routes,{
      initialEntries: [`/project/${params.id}`],
      initialIndex: 1,
    });

    render(
      <RouterProvider router={router}/>
    )

  await screen.findByRole('heading')

  expect(screen.getByText(`Ce Projet n'existe pas`)).toBeInTheDocument();
 })