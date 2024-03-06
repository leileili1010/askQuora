import { createBrowserRouter, Outlet } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import QuestionList from '../components/Questions/QuestionList/QuestionList';
import QuestionDetail from '../components/Questions/QuestionDetail/QuestionDetail';
import TopicAnswers from '../components/Answers/TopicAnswers/TopicAnswers';
import HomePage from '../components/HomePage/HomePage';
import LandingPage from '../components/HomePage/LandingPage';
import UserProfile from '../components/UserProfile/UserProfile';

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
        // children: [
        //   {
        //     path: 'questions',
        //     element: <UserQuestions />
        //   },
        //   {
        //     path: 'answers',
        //     element: <UserAnswers />
        //   }
        // ]
      },
      {
        path: "topics",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HomePage />
          }, 
          {
            path: ':topicId/questions',
            element: <QuestionList />
          },
          {
            path: ':topicId/answers',
            element: <TopicAnswers />
          }
        ]
      },
      {
        path: '/*',
        element: <HomePage />
      }

    ],
  },
]);