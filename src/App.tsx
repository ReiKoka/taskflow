import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
