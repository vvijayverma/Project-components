import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import MainLayout from "./components/Layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

const Home = lazy(() => import("./Pages/Home"));
const FetchOld = lazy(() => import("./Pages/FetchOld"));
const FetchRq = lazy(() => import("./Pages/FetchRq"));
const PostDetails = lazy(() => import("./Pages/PostDetails"));
const FileExplorer = lazy(() => import("./Pages/FileExplorer"));
const Pagination = lazy(() => import("./Pages/Pagination"));
const GridSelect = lazy(() => import("./Pages/GridSelect"));
const ProgressBar = lazy(() => import("./Pages/ProgressBar"));
const EmiCalculator = lazy(() => import("./Pages/Emi-Calculator"));
const Stepper = lazy(() => import("./Pages/Stepper"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/file-explorer",
        element: (
          <Suspense>
            <FileExplorer />
          </Suspense>
        ),
      },
      {
        path: "/pagination",
        element: (
          <Suspense>
            <Pagination />
          </Suspense>
        ),
      },
      {
        path: "/gridLight",
        element: (
          <Suspense>
            <GridSelect />
          </Suspense>
        ),
      },
      {
        path: "/progress",
        element: (
          <Suspense>
            <ProgressBar />
          </Suspense>
        ),
      },
      {
        path: "/emi-calculator",
        element: (
          <Suspense>
            <EmiCalculator />
          </Suspense>
        ),
      },
      {
        path: "/stepper",
        element: (
          <Suspense>
            <Stepper />
          </Suspense>
        ),
      },
      {
        path: "/trad",
        element: (
          <Suspense>
            <ProtectedRoute>
              <FetchOld />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/rq",
        element: (
          <Suspense>
            <ProtectedRoute>
              <FetchRq />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/trad/:id",
        element: (
          <Suspense>
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
export default App;
