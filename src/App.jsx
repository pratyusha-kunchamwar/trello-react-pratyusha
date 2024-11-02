import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./Layout/MainLayout";
import EachBoardPage from "./pages/EachBoardPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/*" element={<ErrorPage/>} />
        <Route path="/boards" element={<HomePage />} />
        <Route path="/boards/:id" element={<EachBoardPage />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

