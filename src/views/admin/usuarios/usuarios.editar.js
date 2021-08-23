import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin'; 
import Footer from '../../../components/footer-admin'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import Swal from 'sweetalert2'

import api from '../../../services/api'
import {useParams} from 'react-router-dom'

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
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 50,
    paddingLeft: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    minWidth: 250,
  },
}));

export default function UsuariosCadastrar() {
  const classes = useStyles();
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipo, setTipo] = useState('')
  const [senha, setSenha] = useState('')
  const [redirect, setRedirect] = useState('')

  const {idUsuario} = useParams()

  useEffect(() => {
    async function getUsuario() {
      var response = await api.get('/api/usuarios.details/' + idUsuario)
      // console.log(response)
      //retorna status 200 e todos os dados encontrados no banco

      setNome(response.data.nome_usuario)
      setEmail(response.data.email_usuario)
      setTipo(response.data.tipo_usuario)
      setSenha(response.data.senha_usuario)
    }

    getUsuario()
  }, [idUsuario])

  async function handleSubmit() {
    const data = {
      nome_usuario: nome,
      email_usuario: email,
      tipo_usuario: tipo,
      senha_usuario: senha,
      _id: idUsuario
    }
    //console.log(data)
    const response = await api.put('/api/usuarios', data)

    if (response.status === 200) {
      Swal.fire(
      'Good job!',
      'Cadastro atualizado com sucesso!!!',
      'success'
    )
      setRedirect('/admin/usuarios');
    } else {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo deu errado!',
      footer: '<a href="">Por que tenho esse problema?</a>'
    })
    }

  }

  // const {form, setForm} = useState({
  // nome: '',
  // email: '',
  // tipo: '',
  // senha: ''
  // })

  return (
    !redirect ?
    <div className={classes.root}>
      <CssBaseline />
      <MenuAdmin title={'USUÁRIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo:"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email:"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                        labelId="labelTipo"
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Gerente</MenuItem>
                        <MenuItem value={3}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="senha"
                      type="password"
                      name="senha"
                      label="Senha:"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Salvar
                    </Button>
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
    :
      <Redirect to={redirect} />
  );
}