import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import QuestionList from '../components/Questions/QuestionList/QuestionList';
import QuestionDetail from '../components/Questions/QuestionDetail/QuestionDetail';
import UserQuestions from '../components/Questions/UserQuestions/UserQuestions';

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
        element: <Outlet />,
        children: [
          {
            path: ':questionId',
            element: <QuestionDetail />
          }
        ]
      },
      {
        path: "user-profile/:userId",
        element: <Outlet />,
        children: [
          {
            path: 'questions',
            element: <UserQuestions />
          }
        ]
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
      {
        path: '/*',
        element: <h1>Welcome!</h1>
      }

    ],
  },
]);