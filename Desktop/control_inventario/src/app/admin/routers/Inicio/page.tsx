import GraficoCircular from '@/app/components/GraficoCircular';
import GraficoLineal from '@/app/components/GraficoLineal';
import React from 'react'

const Inicio = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h4 className='text-black text-2xl'>Hola bienvenido a tu perfil: Señor Luis Ori Gomez</h4>
      <div className='w-full grid grid-cols-4 gap-4'>
        <div className='bg-blue-400 w-[395px] h-[200px] rounded-lg p-2  '>
          <h2>Contenido 1</h2>
        </div>
        <div className='bg-blue-400 w-[395px] h-[200px] rounded-lg p-2 ' >
          <h2>Contenido 2</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[200px] rounded-lg p-2 '>
          <h2>Contenido 3</h2>
        </div>
        <div className='bg-blue-400  w-[395px] h-[200px] rounded-lg p-2 '>
          <h2>Contenido 4</h2>
        </div>
      </div>

      {/* GRAFICO DE PRODUCTOS INGRESOS Y SALIDOS */}
      <div className='grid grid-cols-2 gap-0'>
        <div className='bg-white rounded-lg w-[700px] h-[600px] p-4'>
          <GraficoCircular/>
        </div>
        <div className='bg-white rounded-lg w-[1200px] ml-[-390px] h-[600p] p-4'>
          <GraficoLineal/>
        </div>
      </div>
    </div>
  )
}


export default Inicio;