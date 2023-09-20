import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import QuestionBrowserPage from "./pages/QuestionBrowserPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./pages/LoginPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import ProtectedPage from "./pages/ProtectedPage";
import ProfilePage from "./pages/ProfilePage";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <QuestionBrowserPage />,
      },
      {
        path: "questions",
        children: [
          {
            index: true,
            element: <QuestionBrowserPage />,
          },
          {
            path: "details/:id",
            element: <QuestionDetailsPage />,
          },
          {
            path: "new",
            element: <ProtectedPage />,
            children: [
              {
                index: true,
                element: <div>Create Question Page</div>,
              },
            ],
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProtectedPage />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
