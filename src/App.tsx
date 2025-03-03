import { RouterProvider } from "@tanstack/react-router";
import { AuthContext } from "./context/AuthContext";

import { router } from "./router";
import { use } from "react";

function App() {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error(`AuthContext cannot be used outside of an AuthProvider`);
  }

  console.log(auth);

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
