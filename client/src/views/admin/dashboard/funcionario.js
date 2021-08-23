import React from 'react';
import ImgAdmin from '../../../assets/img/funcionarios.png'

export default function Dashboard() {
  
  return (
    <>
      <h3 style={{textAlign: 'center', paddingLeft: '195px'}}> Olá, Usuário</h3>
      <img alt='profile' style={{ width: '450px' }} src={ImgAdmin} />
    </>  
  );
}