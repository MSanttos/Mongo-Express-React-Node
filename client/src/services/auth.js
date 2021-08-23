export const TOKEN_KEY = 'token'
export const NOME_USUARIO = 'nomeUsuario'
export const USER_TYPES = 'userType'

export const login = token => { localStorage.setItem(TOKEN_KEY, token) }
export const token = () => { localStorage.getitem(TOKEN_KEY) }
export const logout = () => { localStorage.clear() }

export const setNomeUsuario = nome => localStorage.setItem(NOME_USUARIO, nome)
export const getNomeUsuario = () => localStorage.getItem(NOME_USUARIO)

export const setTipoUsuario = tipo => localStorage.setItem(USER_TYPES, tipo)
export const getTipoUsuario = () => localStorage.getItem(USER_TYPES)

export const getToken = () => localStorage.getItem(TOKEN_KEY)