import { RouterProvider, createBrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import NewUserForm from "../components/NewUser";
import Group from "../components/Group";
import NewGroup from "../components/NewGroup";

const Routes = () => {
    const {token} = useAuth();


const routesForPublic = [
    {
        path: "/",
        element: <NewUserForm />,
    },
];

const routesForAuthenticatedOnly = [
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/group",
                element: <Group />,
            },
            {
                path: "/new-group",
                element: <NewGroup />
            },
        ],
    },
];

const routesForNonAuthenticated = [
    {
        path: "/new-user",
        element: <div>Create User Page</div>
    },
];

const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNonAuthenticated : []),
    ...routesForAuthenticatedOnly,
]);

return <RouterProvider router={router} />

};

export default Routes;
