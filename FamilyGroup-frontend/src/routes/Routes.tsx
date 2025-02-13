import { RouterProvider, createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import Group from "../components/Group";
import NewGroup from "../components/NewGroup";
import Login from "../components/Login";
import NewUser from "../components/NewUser";
import HeaderComponent from "../components/HeadersComponent";
import Footer from "../components/Footer";

const Routes = () => {

    const MainLayout = ({ children }: { children: React.ReactNode}) => {
        return (
        <>
            <HeaderComponent />
            { children }
            <Footer />
        </>
        )
    }

    const routes = createBrowserRouter([
        //public routes
        {
            path: "/",
            element: <MainLayout> <Login /> </MainLayout>
        },
        {
            path: "/new-user",
            element: <MainLayout> <NewUser /> </MainLayout>
        },

        //protected routes, only for authenticated users

        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                { path: "/group", element: <MainLayout> <Group /> </MainLayout> },
                { path: "/new-group", element: <MainLayout> <NewGroup /> </MainLayout> } 
            ],
        },
    ]);

return <RouterProvider router={routes} />

};

export default Routes;
