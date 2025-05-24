"use client";
import Modal from '@/app/components/Modal';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { showToast } from 'nextjs-toast-notify';
import * as XLSX from 'xlsx';

const Productos = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_URL;


  const tokenData = getCookie("data");
  if (!tokenData) {
    console.log('NO SE ENCONTRO LA COOKIE')
    return;
  }

  const tokenProfile = JSON.parse(tokenData as string);
  if (!tokenProfile) {
    console.log('USTED NO TIENE LA AUTHORIZATION');
    return;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_prod: "",
    id_user: 1,
    nombre: "",
    descrip: "",
    fecha_created: "",
    fecha_ingreso: "",
    fecha_salida: "",
    usuario_master: "",
    stock_ingreso: 0,
    stock_salida: 0,
    numeroDePatrinomio: "",
    categoria: ""
  });

  const [listData, setListData] = useState<any[]>([]);

  const handleCreateProductos = async () => {
    try {
      const response = await fetch(`${API_KEY}/crear_materiales`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        method: "POST"
      });

      if (!response.ok) {
        showToast.error("ERROR AL RESPONDER EL SERVIDOR METODO CREAR PRODUCTOS");
      }

      const listaProductos = await response.json();

      if (listaProductos.lenght > 0) {
        showToast.warning("NO SE ENCONTRARON DATOS");
      }
      showToast.success("SE CREO CORRECTAMENTE EL PRODUCTO");
    } catch (error: any) {
      console.error("ERROR SERVER RESPONSE: " + error.message);
    }
  };

  const handleGetProductos = async () => {
    try {
      const response = await fetch(`http://localhost:5038/listar_materiales?id_user=${tokenProfile[0].id_usuario}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenProfile[0].token}`
        },
        method: "GET",
      })

      if (!response.ok) {
        showToast.error("ERROR SERVER RESPONSE GET PRODUCTOS");
      }

      showToast.success("SE CARGO CORRECTAMENTE LOS PRODUCTOS");

      const listaProductos = await response.json();
      setListData(listaProductos)
    } catch (error: any) {
      console.error("ERROR SERVER RESPONSE: " + error)
    }
  }

const handleGetReportesProductos = () => {
  try {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(listData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "REPORTE_PRODUCTOS");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reporte_productos.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast.success("REPORTE DESCARGADO CORRECTAMENTE");
  } catch (error: any) {
    showToast.error("Error al descargar el Excel: " + error.message);
  }
};


  //Cargamos la lista de productos
  useEffect(() => {
    handleGetProductos();
  }, [])

  return (
    <div className='flex flex-col gap-5'>
      <nav className='bg-slate-600 w-full h-[70px] rounded-lg flex justify-between p-2 items-center text-white'>
        <h2 className='text-2xl'>Productos</h2>
        <ul className='flex gap-4 p-4'>
          <button
            className='block w-[100px] cursor-pointer bg-sky-500 hover:bg-sky-600 text-white py-1 px-3 rounded'
            onClick={() => setIsOpen(true)}
          >
            AGREGAR
          </button>

          <button
          className='block w-[200px] cursor-pointer bg-blue-800 hover:bg-sky-300 text-white py-1 px-3 rounded'
          onClick={() => handleGetReportesProductos()}
          >
            DESCARGAR REPORTE
          </button>
        </ul>
      </nav>

      <div className="overflow-x-auto">
<table className="min-w-full border border-gray-300 shadow-lg rounded-xl overflow-hidden">
  <thead className="bg-sky-700 text-white">
    <tr>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">#</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Nombre</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Descripción</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">F. Creación</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">F. Ingreso</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">F. Salida</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock Ingreso</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock Salida</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock Total</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Creado Por</th>
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Categoría</th>
      <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">Acciones</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-800">
    {listData.map((item) => (
      <tr key={item.id_prod} className="even:bg-gray-50 hover:bg-gray-100 transition">
        <td className="px-4 py-3 align-middle">{item.id_prod}</td>
        <td className="px-4 py-3">{item.nombre}</td>
        <td className="px-4 py-3">{item.descrip}</td>
        <td className="px-4 py-3">{item.fechaCreated}</td>
        <td className="px-4 py-3">{item.fechaIngreso}</td>
        <td className="px-4 py-3">{item.fechaSalida}</td>
        <td className="px-4 py-3">{item.stock_ingreso}</td>
        <td className="px-4 py-3">{item.stock_salida}</td>
        <td className='px-4 py-3'> {item.stock_total}</td>
        <td className="px-4 py-3">{tokenProfile[0].nombre}</td>
        <td className="px-4 py-3">{item.categoria}</td>
        <td className="px-4 py-3 text-center space-x-2">
          <Link
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg transition text-xs"
          >
            ✏️ Editar
          </Link>
          <Link
            href="/"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-lg transition text-xs"
          >
            🗑️ Eliminar
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-center text-2xl font-semibold text-sky-800 mb-6">Agregar Productos</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateProductos();
            setIsOpen(false);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Fecha de Creación</label>
            <input
              type="date"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, fecha_created: e.target.value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Fecha de Ingreso</label>
            <input
              type="date"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, fecha_ingreso: e.target.value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Fecha de Salida</label>
            <input
              type="date"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, fecha_salida: e.target.value }))}
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="mb-1 text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              className="input h-24 resize-none"
              onChange={(e) => setFormData(prev => ({ ...prev, descrip: e.target.value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Creado Por</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, usuario_master: e.target.value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Stock de Ingreso</label>
            <input
              type="number"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, stock_ingreso: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Stock de Salida</label>
            <input
              type="number"
              className="input"
              onChange={(e) => setFormData(prev => ({ ...prev, stock_salida: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="sm:col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Productos;
