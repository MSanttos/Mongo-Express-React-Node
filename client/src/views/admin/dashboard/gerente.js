import React from 'react';
import ImgAdmin from '../../../assets/img/gerente.png'

export default function Dashboard() {
  
  return (
    <>
      <h3 style={{textAlign: 'center', paddingLeft: '160px'}}> Olá, Gerente</h3>
      <img alt="profile" style={{ width: '450px' }} src={ImgAdmin} />
    </>
  );
}