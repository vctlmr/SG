import { UsersProjects } from './pages/UsersProjects/UsersProjects';
import { NotFound } from './pages/NotFound';
import { Project } from './component/Project';
import RootLayout from './layout/RootLayout';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { deleteProjectAction } from './actions/deleteProjectAction';
import { loadUserProjectAction } from './actions/loadUserProjectAction';
import { createProjectAction } from './actions/createProjectAction';
import { loadProjectAction } from './actions/loadProjectAction';
import { UsersProjectsError } from './pages/UsersProjects/UserProjectsError';
import { ProjectError } from './component/ProjectError';

export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route
      path="/"
      element={<RootLayout />}
    >
      <Route index element={<Navigate to={"/projects"} />}/>
      <Route
        path='/projects'
        element={<UsersProjects />}
        loader={loadUserProjectAction}
        errorElement={<UsersProjectsError />}
      />
      <Route path="/project/create" action={createProjectAction} element={<Navigate replace to="/" />} />
      <Route
        path="project/:id"
        element={<Project />}
        loader={loadProjectAction}
        errorElement={<ProjectError />}
      />
      <Route
        path="project/delete/:id"
        element={<UsersProjects />}
        action={deleteProjectAction}

      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
