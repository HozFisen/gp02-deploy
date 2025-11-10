import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./views/BaseLayout";
import Login from "./views/Login";
import Home from "./views/Home";
import AddProduct from "./views/AddProduct";
import Detail from "./views/Detail";
import EditProduct from "./views/EditProduct";
import AddUser from "./views/AddUser";
import CategoryList from "./views/Categories";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryList/>}/>
            <Route path="/add-user" element={<AddUser/>}/>
            <Route path="/add" element={<AddProduct />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    </>
  )
}

export default App