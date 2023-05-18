import HomePageMart from "../pages/mart/HomePageMart";
import NotFoundPage from "../pages/NotFoundPage";
import NotHeaderLayout from "../components/layout/NotHeaderLayout";
import ProductDetail from "../pages/ProductDetail";
import AdminHomePage from "src/pages/admin/AdminHomePage";
import AdminLayout from "src/components/layout/AdminLayout";
import React from "react";
import AddProduct from "src/pages/provider/AddProduct";
import OrderPage from "src/pages/mart/OrderPage";
import ContractPage from "src/pages/mart/ContractPage";
import AdminStatisticalPage from "src/pages/admin/AdminStatisticalPage";
import ProviderLayout from "src/components/layout/ProviderLayout";
import ManageVegetable from "src/pages/provider/ManageVegetable";
import HeroSlide from "src/components/common/HeroSlide";

interface IRouteType {
    auth?: boolean;
    path: string;
    element?: JSX.Element;
    state?: string;
    layout?: React.ReactNode;
}

const routes: IRouteType[] = [
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
        element: <OrderPage />
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
        path: "/admin/providers",
        element: <AdminHomePage />,
        layout: <AdminLayout />
    },
    {
        path: "/admin/statistical",
        element: <AdminStatisticalPage />,
        layout: <AdminLayout />
    },
    {
        path: "/provider/product/add-product",
        element: <AddProduct  />,
        layout: <ProviderLayout />
    },
    {
        path: "/provider/product/list/:pathVariable",
        element: <ManageVegetable />,
        layout: <ProviderLayout />
    },
    {
        path: '*',
        element: <NotFoundPage />,
        layout: <NotHeaderLayout />
    },
]

export default routes;