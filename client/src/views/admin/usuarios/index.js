import React, { useState, useEffect } from 'react';
//roda assim que uma variavel ou useState é alterado 
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin'; 
import Footer from '../../../components/footer-admin'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
// import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import Swal from 'sweetalert2'
import { getNomeTipo, getNomeTipoLabel } from '../../../functions/static_data';

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


export default function UsuariosListagem() {
  const classes = useStyles();
  
  const [usuarios, setUsuarios] = useState([])
  //retorna uma lista

  async function loadUsuarios() {
    const response = await api.get('/api/usuarios.index')
    // console.log(response.data)
    setUsuarios(response.data)
  }

  useEffect(() => {
  //roda assim que o js criar este componente 
  loadUsuarios()
  }, [])

  async function handleDelete(id) {
    Swal.fire({
      title: 'Tem certeza que deletar?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delete('/api/usuarios/' + id);
        loadUsuarios()

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuAdmin title={'Usuários'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Lista de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Data</TableCell>
                            <TableCell align="center">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usuarios.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.nome_usuario}
                              </TableCell>
                              <TableCell align="center">{row.email_usuario}</TableCell>
                              <TableCell align="center"><Chip icon={<FaceIcon />}label={getNomeTipo(row.tipo_usuario)}color={getNomeTipoLabel(row.tipo_usuario) }/>
                              </TableCell>
                              <TableCell align="center">{new Date(row.createdAt).toLocaleDateString('pt-br')}</TableCell>
                              <TableCell align="center">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button color="primary" href={'/admin/usuarios/editar/'+row._id}>Atualizar</Button>
                                  <Button color="secondary" onClick={() => handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}