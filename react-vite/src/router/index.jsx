import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import QuestionList from '../components/Questions/QuestionList/QuestionList';
import QuestionDetail from '../components/Questions/QuestionDetail/QuestionDetail';
import UserQuestions from '../components/Questions/UserQuestions/UserQuestions';
import TopicAnswers from '../components/Answers/TopicAnswers/TopicAnswers';
import UserAnswers from '../components/Answers/UserAnswers/UserAnswers';
import HomePage from '../components/HomePage/HomePage';
import LandingPage from '../components/HomePage/LandingPage';

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
        element: <Outlet />,
        children: [
          {
            path: 'questions',
            element: <UserQuestions />
          },
          {
            path: 'answers',
            element: <UserAnswers />
          }
        ]
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
        element: <h1>Welcome!</h1>
      }

    ],
  },
]);