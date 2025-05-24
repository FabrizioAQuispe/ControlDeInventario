"use client"

import GraficoCircular from '@/app/components/GraficoCircular';
import GraficoLineal from '@/app/components/GraficoLineal';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

const Inicio = () => {
  const [profile,setProfile] = useState('');

  useEffect(() => {
      const tokenData = getCookie("data");
      if(!tokenData){
        console.log('NO SE ENCONTRO LA COOKIE')
        return;
      }

      const tokenProfile = JSON.parse(tokenData as string);
      if(!tokenProfile){
        console.log('USTED NO TIENE LA AUTHORIZATION');
        return;
      }

      setProfile(tokenProfile[0].nombre);
  },[]);

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='text-black text-2xl'>Bienvenido a su perfil: {profile}</h4>
      <div className='w-full grid grid-cols-4 gap-4'>
        <div className='bg-blue-400 w-[395px] h-[100px] rounded-lg p-2  '>
          <h2>Productos</h2>
        </div>
        <div className='bg-blue-400 w-[395px] h-[100px] rounded-lg p-2 ' >
          <h2>Materiales</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[100px] rounded-lg p-2 '>
          <h2>Productos Ingresados</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[100px] rounded-lg p-2 '>
          <h2>Materiales Ingresados</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[100px] rounded-lg p-2 '>
          <h2>Productos de Salida</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[100px] rounded-lg p-2 '>
          <h2>Materiales de Salida</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[100px] rounded-lg p-2 '>
          <h2>Total</h2>
        </div>
        <div className='bg-green-700 text-center w-[395px] h-[100px] rounded-lg p-2 '>
          <h2 className='text-white'>Soporte</h2>
        </div>
      </div>

      {/* GRAFICO DE PRODUCTOS INGRESOS Y SALIDOS */}
      <div className='grid grid-cols-2 gap-0'>
        <div className='bg-white rounded-lg w-[700px] h-[600px] p-4'>
          <GraficoCircular />
        </div>
        <div className='bg-white rounded-lg w-[1200px] ml-[-390px] h-[600p] p-4'>
          <GraficoLineal />
        </div>
      </div>
    </div>
  )
}


export default Inicio;