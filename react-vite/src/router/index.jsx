import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import QuestionList from '../components/Questions/QuestionList/QuestionList';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "questions",
        element: <h1>Welcome</h1>,
      },
      {
        path: "topics",
        element: <Outlet />,
        children: [
          {
            path: ':topicId',
            element: <QuestionList />
          }
        ]
      },

    ],
  },
]);