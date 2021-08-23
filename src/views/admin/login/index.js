import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Swal from 'sweetalert2'
import api from '../../../services/api'
import { login, setNomeUsuario,setTipoUsuario } from '../../../services/auth'
// import auth from '../../../services/auth'
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        MSantos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    //alert para verificar se está chamando verificação
    // alert('Autenticar: '+email)
    await api.post('/api/usuarios/login', { email, senha })
      //então quando me retornar vou fazer a verificação
      .then(res => {
        if (res.status === 200) {
          //...localstorage
          // token: token,id_client:user.id,user_name:user.nome_usuario
          login(res.data.token)
          setNomeUsuario(res.data.user_name)
          setTipoUsuario(res.data.user_type)

          window.location.href = "/admin"
          setLoading (false)
        } else {
          alert(res.data.error)
          setLoading (false)
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Something went wrong!',
          //   footer: '<a href="">Why do I have this issue?</a>'
          // })
        }
      })
  }

  function loadSubmit() {
    setLoading(true)
    setTimeout(
      () => handleSubmit(),
      1000
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Digite seu email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Digite sua senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={senha}
            onChange={e =>setSenha(e.target.value)}
          /> */}
          <FormControl variant="outlined" style={{width: '100%',marginTop: '10px'}}>
          <InputLabel htmlFor="password">Digite sua senha*</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={senha}
            onChange={e =>setSenha(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => setShowPassword(!showPassword)}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={125}
          />
        </FormControl>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembre de mim"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loadSubmit}
            type='button'
            disabled={loading}
            >
            {loading ? <CircularProgress color="secondary" />:"ENTRAR"}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Não tem uma conta? Inscrever-se"}
              </Link>
            </Grid>
          </Grid> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}