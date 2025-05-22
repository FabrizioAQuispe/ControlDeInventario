"use client";
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ListadoDeDnis = () => {
  const URL_API = "https://apiperu.dev/api/dni";
  const [dnis, setDnis] = useState<string[]>();
  const [persona, setPersona] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    numero: '',
    nombre_completo: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    tipo: ''
  });

  // Subir el excel
  const handleUploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt: ProgressEvent<FileReader>) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];

      const dnisExtraidos = data.map(row => row[0]).filter(Boolean).slice(1);
      const dnisUnicos = Array.from(new Set(dnisExtraidos));

      const hayDuplicados = dnisExtraidos.length !== dnisUnicos.length;
      if (hayDuplicados) {
        console.warn("Se encontraron y eliminaron DNIs duplicados del Excel.");
      }

      setDnis(dnisUnicos);
    };
    reader.readAsBinaryString(file);
  };

  // Buscar persona
  const buscarPersonaPorDNI = async (dni: string) => {
    try {
      const response = await fetch(URL_API, {
        method: "POST",
        body: JSON.stringify({ dni }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 0d48cd5fe40540708ae6c58d14dd22c54ced2aa803c6b27866b7fce53855c459"
        }
      });

      if (response.ok) {
        const json = await response.json();
        setPersona(json.data);
        setFormData({
          numero: json.data.numero || '',
          nombre_completo: json.data.nombre_completo || '',
          nombres: json.data.nombres || '',
          apellido_paterno: json.data.apellido_paterno || '',
          apellido_materno: json.data.apellido_materno || '',
          tipo: ''
        });
      }
    } catch (e) {
      console.error("ERROR SERVER RESPONSE: " + e);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sube tu Excel con DNIs</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleUploadExcel} className="mb-6" />

      {/* Listado de DNIs */}
      <div className="mt-4">
        <ul className="list-disc ml-6 space-y-1">
          {dnis?.map((dni, index) => (
            <li
              key={index}
              onClick={() => buscarPersonaPorDNI(dni)}
              className="cursor-pointer hover:text-blue-600"
            >
              {dni}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario de Persona */}
      {persona && (
        <div className="mt-8 border p-6 rounded shadow-md w-full max-w-2xl">
          <h4 className="text-lg font-semibold mb-4">Resultado:</h4>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <label className="w-[150px]">Tipo:</label>
              <input
                className="border p-1 flex-1"
                value={formData.tipo}
                onChange={e => setFormData({ ...formData, tipo: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <label className="w-[150px]">DNI:</label>
              <input
                className="border p-1 flex-1"
                value={formData.numero}
                onChange={e => setFormData({ ...formData, numero: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <label className="w-[150px]">Nombre Completo:</label>
              <input
                className="border p-1 flex-1"
                value={formData.nombre_completo}
                onChange={e => setFormData({ ...formData, nombre_completo: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <label className="w-[150px]">Nombres:</label>
              <input
                className="border p-1 flex-1"
                value={formData.nombres}
                onChange={e => setFormData({ ...formData, nombres: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <label className="w-[150px]">Apellido Paterno:</label>
              <input
                className="border p-1 flex-1"
                value={formData.apellido_paterno}
                onChange={e => setFormData({ ...formData, apellido_paterno: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <label className="w-[150px]">Apellido Materno:</label>
              <input
                className="border p-1 flex-1"
                value={formData.apellido_materno}
                onChange={e => setFormData({ ...formData, apellido_materno: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Migrar Datos</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded">Validar DNIs</button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded">Mostrar Tipo</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoDeDnis;
