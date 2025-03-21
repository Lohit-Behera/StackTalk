import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Homepage from "./page/Homepage";
import AskQuestionPage from "./page/AskPage";
import OneQuestionPage from "./page/OneQuestionsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="/ask" element={<AskQuestionPage />} />
      <Route path="/question/:id" element={<OneQuestionPage />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
