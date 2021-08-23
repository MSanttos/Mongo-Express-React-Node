import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { logout } from '../services/auth'
import { getToken, logout } from '../services/auth'
import api from '../services/api'

export const mainListItems = (
  <div>
    <Link to="/admin" style={{color: 'black', textDecoration: 'none'}}>
      <ListItem>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/admin/usuarios" style={{color: 'black', textDecoration: 'none'}}>
    <ListItem>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
      </ListItem>
    </Link>
    <Link to="/admin/usuarios/cadastrar" style={{color: 'black', textDecoration: 'none'}}>
    <ListItem>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Cadastrar usuários" />
      </ListItem>
    </Link>
    <Link to="/admin/produtos" style={{color: 'black', textDecoration: 'none'}}>
      <ListItem>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
      </ListItem>
    </Link>
    <Link to="/admin/produtos" style={{color: 'black', textDecoration: 'none'}}>
      <ListItem>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Cadastrar produtos" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader  inset>Opções</ListSubheader>
    <ListItem  button onClick={confirmSair}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText onClick={() => {logout()}} primary="Sair" />
    </ListItem>
  </div>
);

async function confirmSair() {
  if (window.confirm("Deseja realmente sair do sistemas?")) {
    const response = await api.get('/api/usuarios/destroytoken', {headers: {token: getToken() }})
    if (response.status === 200) {
      logout()
      window.location.href='/admin/login'
    } else {
      alert("não foi possível fazer o logout!")
    }
  }
}