import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { MyProvider } from "./pages/services/Context";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LayoutEstudiante from "./layouts/LayoutEstudiante";

import Home from "./pages/admin/Home/Home";
import Error404 from "./pages/Error404";
import Inventario from "./pages/admin/Inventario/Inventario";
import Categorias from "./pages/admin/Inventario/Categorias";
import Compras from "./pages/admin/Compras/Compras";
import Add from "./pages/admin/Inventario/Add";
import AddCategories from "./pages/admin/Inventario/AddCategories";
import EditProduct from "./pages/admin/Inventario/EditProduct";
import EditCategories from "./pages/admin/Inventario/EditCategories";
import Proveedores from "./pages/admin/Proveedores/Proveedores";
import AddProveedor from "./pages/admin/Proveedores/AddProveedor";
import EditProveedor from "./pages/admin/Proveedores/EditProveedor";
import AddProduct from "./pages/admin/Inventario/AddProduct";
import ShowFactura from "./pages/admin/Compras/ShowFactura";
import AddBill from "./pages/admin/Compras/AddBill";
import View from "./pages/admin/Proveedores/EditProveedo";
import EditProveedo from "./pages/admin/Proveedores/EditProveedo";
import Perfil from "./pages/auth/Perfil";
import Main from "./pages/auth/Main";
import Estudiantes from "./pages/Estudiante/Estudiantes";
import PerfilEstudiante from "./pages/auth/PerfilEstudiante";

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="main" element={<Main />} />

          <Route path="student-dashboard" element={<Estudiantes />} />
          <Route path="perfilestudiante" element={<PerfilEstudiante />} />
          <Route path="/user" element={<LayoutEstudiante />}></Route>

          <Route path="/" element={<LayoutAdmin />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="usuarios" element={<Inventario />} /> /*en uso */
            <Route path="usuarios/add" element={<Add />} /> /*en uso */
            <Route path="usuarios/edit/:id" element={<EditProduct />} /> /*en
            uso */
            <Route path="compras" element={<Compras />} /> /*en uso */
            <Route path="compras/add" element={<AddBill />} /> /*en uso */
            {/* <Route path="perfil" element={<Perfil />} /> */}
            <Route path="paginas" element={<Categorias />} />
            <Route path="paginas/add" element={<AddCategories />} />
            {/* <Route path="categorias/edit/:id" element={<EditCategories />} /> */}
            <Route path="roles" element={<Proveedores />} />
            <Route path="roles/add" element={<AddProveedor />} />
            <Route path="roles/edit/:id" element={<EditProveedo />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
