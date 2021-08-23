import React from "react"

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

//IMPORTS ADMIN
import Dashboard from "./views/admin/dashboard"

import Produtos from "./views/admin/produtos"
import ProdutosEditar from "./views/admin/produtos/produtos.editar"
import ProdutosCadastrar from './views/admin/produtos/produtos.cadastrar'
import Usuarios from "./views/admin/usuarios"
import UsuariosEditar from "./views/admin/usuarios/usuarios.editar"
import UsuariosCadastrar from './views/admin/usuarios/usuarios.cadastrar'

//IMPORTS CLIENT
import Home from './views/client/home/index'
import ProdutosDetails from './views/client/produto/produtos.details'
import Login from './views/admin/login'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/admin/login", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* ROUTES CLIENT */}
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/produtos/:idProduto" exact component={ProdutosDetails} />
        
        {/* ROUTES ADMIN */}
        <Route path="/admin/login" exact component={Login} />
        <PrivateRoute path="/admin" exact component={Dashboard} />

        
        <PrivateRoute path="/admin/produtos" exact component={Produtos} />
        <PrivateRoute path="/admin/produtos/cadastar" exact component={ProdutosCadastrar} />
        <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={ProdutosEditar} />
        
        <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
        <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuariosCadastrar} />
        <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuariosEditar} />
      
        <Route path='*' component={() => {return (<h1 style={{textAlign: 'center'}}>404</h1>)}}/>
      </Switch>
    </BrowserRouter>
  )
}