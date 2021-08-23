import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
// import Badge from '@material-ui/core/Badge';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin'; 
// import ImgAdmin from '../../../assets/img/admin2.png';
// import UsuariosCadastrar from '../usuarios/usuarios.cadastrar'
import Footer from '../../../components/footer-admin'

// import ImgAdmin from '../../../assets/img/user.png';

import { getTipoUsuario } from '../../../services/auth'
import DashFuncionario from './funcionario'
import DashGerente from './gerente'
import DashAdmin from './admin'


// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const mystyle = {
  paddingLeft:'280px',
  maxWidth: '10px',
  // position: 'relative',

};

function getDashboard() {
  if (getTipoUsuario() === '1') {
    return <DashAdmin/>
  } else if (getTipoUsuario() === '2') {
    return <DashGerente/>
  } else {
    return <DashFuncionario/>
  }
}

export default function Dashboard() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuAdmin title={'DASHBOARD'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container xl={12} md={12} sm={12} style={mystyle}>
            {getDashboard()}
            {/* <img alt='profile' src={ImgAdmin}/> */}
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}