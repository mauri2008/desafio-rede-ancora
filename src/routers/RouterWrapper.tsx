import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/Auth";
import { Home } from "../pages/home/Home";
import { DefaultLayout } from "../pages/_layout/DefaultLayout";
import { getSession } from "../helpers/session";
import { Released } from "../pages/released/Released";
import { Favorites } from "../pages/favorites/Favorites";



export function RouterWrapper() {


  function isAuthenticaded() {
    const token = getSession('token');
    return !! token; 
  }

  function PrivateRouter() {
    return  isAuthenticaded() ? <DefaultLayout/> : <Navigate to="/login"/>;
  }


  return (
    <Routes>
      <Route path="/" element={<PrivateRouter/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/lancamentos" element={<Released/>}/>
        <Route path="/preferidos" element={<Favorites/>}/>

      </Route>
      <Route path="/login" element={<Auth/>}/>
      <Route path="/callback" element={<Auth/>}/>

    </Routes>
  )
}