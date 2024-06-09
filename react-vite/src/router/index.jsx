import { createBrowserRouter, Outlet } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import QuestionDetail from '../components/Questions/QuestionDetail/QuestionDetail';
import HomePage from '../components/HomePage/HomePage';
import LandingPage from '../components/HomePage/LandingPage';
import UserProfile from '../components/UserProfile/UserProfile';
import ExploreTopics from '../components/Spaces/ExploreTopics';
import Skeleton from '../components/Skeleton/Skeleton';

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
        path: "explore-topics",
        element: <ExploreTopics />,
      },
      {
        path: '/*',
        element: <Skeleton />
      },
      {
        path: '/*',
        element: <HomePage />
      }

    ],
  },
]);