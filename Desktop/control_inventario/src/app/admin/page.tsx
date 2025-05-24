"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next';

const AdminPage = () => {

  const API_KEY = process.env.NEXT_PUBLIC_API_URL;
  const [userData, setUserData] = useState<string[]>([]);
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_KEY}/auth`, {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo,
          password
        }),
        method: "POST"
      })
      if (!response.ok) {
        setError('ERROR DE CRENDECIALES')
        return;
      }

      alert('INICIO EXITOSAMENTE')

      const dataUser = await response.json();
      setCookie("data",dataUser);
      window.location.href = '/admin/dashboard'

    } catch (error: any) {
      console.error("ERROR SERVER API LOGIN: " + error);
    }
  }

  return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-700 px-4">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-sky-800">
        Sistema Control de Inventario
      </h2>

      <div className="space-y-4">
        <input
          onChange={(e) => setCorreo(e.target.value)}
          type="text"
          placeholder="Usuario"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        {
          error && (
            <p className='text-center text-red-900'>{error}</p>
          )
        }
        <Link href={'/'} className='inline-block w-full bg-red-900 text-white text-center py-2 rounded-md hover:bg-sky-700 transition'>
          ¿Ólvidaste tu contraseña?
        </Link>
        <Link
          href="/"
          className="inline-block w-full bg-sky-600 text-white text-center py-2 rounded-md hover:bg-sky-700 transition"
          onClick={() => handleLogin()}
        >
          Ingresar
        </Link>
      </div>
    </div>
  </div>

  )
}

export default AdminPage