"use client";
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

const Configuraciones = () => {

  const handleGetProductos = async() => {
    try{

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


      const response = await fetch(`http://localhost:5038/listar_materiales?id_user=${tokenProfile[0].id_usuario}`,{
        headers:{
          "Content-Type":"application/json",
          "Authorization" : `Bearer ${tokenProfile[0].token}`
        }
      });

      if(!response.ok){
        console.error("USTED NO TIENE AUTHORIZATION");
      }

      const listaProductos = await response.json();
      console.log(listaProductos)
    }catch(error:any){
      console.log("ERROR SERVER RESPONSE: " + error)
    }
  }

  useEffect(() => {
    handleGetProductos()
  },[])


  return (
    <div className='flex flex-col gap-5'>
      <nav className='bg-slate-600 w-full h-[70px] rounded-lg flex justify-between p-2 items-center text-white'>
        <h2 className='text-2xl'>Mantenimiento</h2>
        <ul>
          <button
            className='w-[100px] cursor-pointer bg-sky-500 hover:bg-sky-600 text-white py-1 px-3 rounded'
          >
            AGREGAR
          </button>
        </ul>
      </nav>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Descripcion</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Fecha de Creación</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Fecha de Ingreso</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Fecha de Salida</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Creado Por</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Configuraciones;
