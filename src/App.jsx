import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NavbarMain from './components/Navbar/NavbarMain';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import SignUp from './components/Signup/Signup';
import Login from './components/login/Login';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Disclaimer from './components/Footer/Disclaimer/Disclaimer';
import PrivacyPolicy from './components/Footer/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './components/Footer/TermsConditions/TermsConditions';
import TypingScreen from './components/TypingScreen/TypingScreen';
import CoursesOptoin from './components/Footer/CourseOption/CoursesOptoin';
import CoursesExam from './components/MainPage/Courses/CoursesExam/CoursesExam';
import AllTests from './components/MainPage/Courses/CoursesExam/AllTests';
import UserDashboard from './components/UserDashboard/UserDashboard';
// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavbarMain />
        <MainPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/Disclaimer",
    element: <Disclaimer />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/TermsAndConditions",
    element: <TermsAndConditions />,
  },
  {
    path: '/test',
    element: (
      <ProtectedRoute>
        <TypingScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: '/coursesOption',
    element: (
      <ProtectedRoute>
        <CoursesOptoin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/coursesExam',
    element: (
      <ProtectedRoute>
        <CoursesExam />
      </ProtectedRoute>
    ),
  },
  {
    path: '/all-tests',
    element: (
      <ProtectedRoute>
        <AllTests />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

// Main App component
function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;




////////////////Testing/////////////////////
// import React from 'react'
// import TermsConditions from './components/Footer/TermsConditions/TermsConditions'


// function App() {
//   return (
//     <div>
//      <TermsConditions/>
//     </div>
//   )
// }

// export default App
