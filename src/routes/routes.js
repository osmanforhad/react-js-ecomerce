import Category from "../components/admin/Category";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";

const routes = [
    {path: "/admin", exact:true, name:"Admin"},
    {path: "/admin/dashboard", exact:true, name:"Dashboard", component:Dashboard},
    {path: "/admin/add_category", exact:true, name:"Category", component:Category},
    {path: "/admin/profile", exact:true, name:"Profile", component:Profile},
];

export default routes;