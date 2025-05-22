import Link from 'next/link'
import React from 'react'

const AdminPage = () => {
  return (
    <div className=''>
        <h2>Sistema Control de Inventario</h2>
        <div className=''>
            <input type="text" />
            <input type="text" />
            <Link href={'/admin/dashboard'}>
                Ingresar
            </Link>
        </div>
    </div>
  )
}

export default AdminPage