import HomePageMart from "../pages/mart/HomePageMart";
import NotFoundPage from "../pages/NotFoundPage";
import NotHeaderLayout from "../components/layout/NotHeaderLayout";
import ProductDetail from "../pages/ProductDetail";
import AdminHomePage from "src/pages/admin/AdminHomePage";
import AdminLayout from "src/components/layout/AdminLayout";
import React from "react";
import AddProduct from "src/pages/provider/AddProductPage";
import OrderPage from "src/pages/mart/OrderPage";
import ContractPage from "src/pages/mart/ContractPage";
import AdminStatisticalPage from "src/pages/admin/AdminStatisticalPage";
import ProviderLayout from "src/components/layout/ProviderLayout";
import ManageVegetablePage from "src/pages/provider/ManageVegetablePage";
import ProviderOrderPage from "src/pages/provider/ProviderOrderPage";
import DeliveryPage from "src/pages/provider/DeliveryPage";
import ProtectedRouteProvider from "./ProtectedRouteProvider";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizePage from "src/pages/UnauthorizePage";
import ProviderAccountPage from "src/pages/provider/ProviderAccountPage";
import OrderDetailPage from "src/pages/provider/OrderDetailPage";
import AdminOrderPage from "src/pages/admin/AdminOrderPage";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";

interface IRouteType {
    auth?: boolean;
    path: string;
    element?: JSX.Element;
    state?: string;
    layout?: React.ReactNode;
}

const ROLES = {
    'ADMIN': {
        id: 501,
        name: "ROLE_ADMIN"
    },
    'MART': {
        id: 502,
        name: "ROLE_MART"
    },
    'PROVIDER': {
        id: 503,
        name: "ROLE_PROVIDER"
    }
}

const routes: IRouteType[] = [
    {
        auth: true,
        path: "/admin/login",
        state: "login-admin"
    },
    {
        auth: true,
        path: "/login",
        state: "login"
    },
    {
        auth: true,
        path: "/register",
        state: "register"
    },
    {
        auth: true,
        path: "/provider/login",
        state: "login-provider"
    }, 
    {
        auth: true,
        path: "/provider/register",
        state: "register-provider"
    },
    {
        path: "/",
        element: <HomePageMart />,
    },
    {
        path: "/order",
        element: 
            <ProtectedRoute allowedRoles={[ROLES.MART, ROLES.ADMIN]}>
                <OrderPage />
            </ProtectedRoute>
    },
    {
        path: "/product/:productId",
        element: <ProductDetail />,
        state:"product.detail"
    },
    {
        path: "/contract",
        element: <ContractPage />
    },
    {
        path: "/admin/providers/:pathVariable",
        element: 
            <ProtectedRouteAdmin allowedRoles={[ ROLES.ADMIN ]}>
                <AdminHomePage />
            </ProtectedRouteAdmin>,
        layout: <AdminLayout />
    },
    {
        path: "/admin/statistical",
        element: <AdminStatisticalPage />,
        layout: <AdminLayout />
    },
    {
        path: "/admin/orders",
        element: 
            <ProtectedRouteAdmin allowedRoles={[ ROLES.ADMIN ]}>
                <AdminOrderPage />
            </ProtectedRouteAdmin>,
        layout: <AdminLayout />
    },
    {
        path: "/provider/product/add-product",
        element: 
            <ProtectedRouteProvider allowedRoles={[ROLES.PROVIDER, ROLES.ADMIN]}>
                <AddProduct />
            </ProtectedRouteProvider>,
        layout: <ProviderLayout />
    },
    {
        path: "/provider/product/list/:pathVariable",
        element: 
            <ProtectedRouteProvider allowedRoles={[ROLES.PROVIDER, ROLES.ADMIN]}>
                <ManageVegetablePage />
            </ProtectedRouteProvider>,
        layout: <ProviderLayout />
    },
    {
        path: "/provider/order",
        element: 
            <ProtectedRouteProvider allowedRoles={[ROLES.PROVIDER, ROLES.ADMIN]}>
                <ProviderOrderPage />
            </ProtectedRouteProvider>,
        layout: <ProviderLayout />
    },
    {
        path: "/provider/order/:orderId",
        element: 
            <ProtectedRouteProvider allowedRoles={[ROLES.PROVIDER, ROLES.ADMIN]}>
                <OrderDetailPage />
            </ProtectedRouteProvider>,
        layout: <ProviderLayout />
    },
    {
        path: "/provider/order-delivery/:pathVariable",
        element: 
            <ProtectedRouteProvider allowedRoles={[ROLES.PROVIDER, ROLES.ADMIN]}>
                <DeliveryPage />
            </ProtectedRouteProvider>,
        layout: <ProviderLayout />
    },
    {
        path: "/provider/account",
        element: 
            <ProtectedRouteProvider allowedRoles={[ROLES.PROVIDER]}>
                <ProviderAccountPage/>
            </ProtectedRouteProvider>,
        layout: <ProviderLayout />
    },
    {
        path: '*',
        element: <NotFoundPage />,
        layout: <NotHeaderLayout />
    },
    {
        path: "/unauthorize",
        element: <UnauthorizePage />,
        layout: <NotHeaderLayout />
    }
]

export default routes;