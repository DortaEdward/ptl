
import {
  createBrowserRouter,
  RouterProvider,
  //Route,
  //Link,
} from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "signin",
    element: <SignIn />,
  },
]);

function App() {

  return (<RouterProvider router={router} />)
}

export default App
