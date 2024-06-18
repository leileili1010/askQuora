import { createBrowserRouter, Outlet } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import QuestionDetail from '../components/Questions/QuestionDetail/QuestionDetail';
import HomePage from '../components/HomePage/HomePage';
import LandingPage from '../components/HomePage/LandingPage';
import UserProfile from '../components/UserProfile/UserProfile';
import CommentList from '../components/Comments/CommentsList';
import Chatbot from '../components/Chatbot/Chatbot';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
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
        element: <UserProfile />,
      },
      {
        path: "topics",
        element: <HomePage />,
      },
      {
        path: "topics/:topicName",
        element: <HomePage />,
      },
      {
        path: "chatbot",
        element: <Chatbot />,
      },
      {
        path: "comments/:answerId",
        element: <CommentList />,
      },
      {
        path: '/*',
        element: <HomePage />
      }

    ],
  },
]);