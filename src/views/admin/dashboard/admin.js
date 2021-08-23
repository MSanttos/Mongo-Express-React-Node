import React from 'react';
import ImgAdmin from '../../../assets/img/admin.png'
// import { getNomeUsuario } from '../../../../src/services/auth'

export default function Dashboard() {
  
  return (
    <>
      <h3 style={{textAlign: 'center', paddingLeft: '160px'}}> Olá, Administrador</h3>
      <img alt='profile' style={{ width: '450px' }} src={ImgAdmin} />
    </>
  );
}