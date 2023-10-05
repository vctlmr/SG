import { UsersProjects } from './pages/UsersProjects';
import { NotFound } from './pages/NotFound';
import { Project } from './component/Project';
import RootLayout from './layout/RootLayout';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useSubmit } from 'react-router-dom';
import { deleteProjectAction } from './actions/deleteProjectAction';
import { loadUserProjectAction } from './actions/loadUserProjectAction';
import { createProjectAction } from './actions/createProjectAction';
import { loadProjectAction } from './actions/loadProjectAction';

export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route 
      path="/" 
      element={<RootLayout/>}
      action={deleteProjectAction}
    >
      <Route 
        index
        element={<UsersProjects/>}
        loader={loadUserProjectAction}
      />
      <Route path="/create/project" action={createProjectAction} element={<Navigate replace to="/" />}/>
      <Route 
        path="project/:id"
        element={<Project/>}
        loader={loadProjectAction}
        errorElement={<NotFound/>}
      />
      <Route 
        path="delete/project/:id"
        element={<UsersProjects/>} 
      />
      <Route path="*" element={<NotFound/>}/>
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
