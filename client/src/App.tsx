
import {
  createBrowserRouter,
  RouterProvider,
  //Route,
  //Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Marketing from "./pages/Marketing";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/marketing",
    element: (<Marketing />),
  },
]);

function App() {

  return (<RouterProvider router={router} />)
}

export default App
