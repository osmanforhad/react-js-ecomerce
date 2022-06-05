import Category from "../components/admin/category/Category";
import EditCategory from "../components/admin/category/EditCategory";
import ViewCategory from "../components/admin/category/ViewCategory";
import Dashboard from "../components/admin/Dashboard";
import AddProduct from "../components/admin/product/AddProduct";
import EditProduct from "../components/admin/product/EditProduct";
import ViewProduct from "../components/admin/product/ViewProduct";
import Profile from "../components/admin/Profile";

const routes = [
    {path: "/admin", exact:true, name:"Admin"},
    {path: "/admin/dashboard", exact:true, name:"Dashboard", component:Dashboard},
    {path: "/admin/add_category", exact:true, name:"Category", component:Category},
    {path: "/admin/view_category", exact:true, name:"ViewCategory", component:ViewCategory},
    {path: "/admin/edit_category/:id", exact:true, name:"EditCategory", component:EditCategory},
    {path: "/admin/add_product", exact:true, name:"AddProduct", component:AddProduct},
    {path: "/admin/view_product", exact:true, name:"ViewProduct", component:ViewProduct},
    {path: "/admin/edit_product/:id", exact:true, name:"EditProduct", component:EditProduct},
    {path: "/admin/profile", exact:true, name:"Profile", component:Profile},
];

export default routes;