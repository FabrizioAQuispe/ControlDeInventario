"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx'



export const ListarDnis = () => {
    const URL_API = "https://apiperu.dev/api/dni";
    const [dnis, setDnis] = useState<string[]>([]);
    const [persona, setPersona] = useState<any | null>(null);
    const [ccm02tipana, setCcm02tipana] = useState("");
    const [formData, setFormData] = useState({
        numero: '',
        nombre_completo: '',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        tipo: ccm02tipana
    });


    const [dnisValidados, setDnisValidados] = useState<{ dni: string, existe: boolean }[]>([]);


    const getTipAna = async (ccd01cod: string) => {
        try {
            const response = await fetch(`/api/cuenta/${ccd01cod}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ccd01cod })
            });

            const dataResponseAna = await response.json();
            console.log(dataResponseAna.data[0].ccm02tipana)

            setCcm02tipana(dataResponseAna.data[0].ccm02tipana)
        } catch (error) {
            console.log("ERROR SERVER RESPONSE: " + error);
        }
    }



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

    const buscarPersona = async (dni: string) => {
        try {
            const response = await fetch(URL_API, {
                method: "POST",
                body: JSON.stringify({ dni }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer cde37cb9a45b3654edab02a46c3a2036c96fe5d5dd16afa6f48a76d1c9ae1b26"
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


                const numeroDNI = json.data.numero;


                const resTipAnalicis = await fetch(`/api/dni/${numeroDNI}`,{
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    method: "GET"
                });
                
                if(!resTipAnalicis.ok){
                    console.error("ERROR NO SE ENCONTRO EL DATO");
                }

            }
        } catch (e) {
            console.error("Error en la petición", e);
        }
    };

    const handleInsertarMigracion = async () => {
        try {
            const response = await fetch('/api/migrar', {
                body: JSON.stringify(formData),
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                console.log('ERROR RESPONSE DATA')
            }

            const datas = await response.json();

            const existentes = datas.data.map((item: any) => item.ccm02cod?.toString().trim());

            const validados = dnis.map((dni) => ({
                dni,
                existe: existentes.includes(dni)
            }));

            setDnisValidados(validados);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='p-4 grid grid-cols-2  gap-4'>
            <div className='flex flex-col'>
                <div>
                    <h3 className='text-xl font-bold'>Sube tu Excel con DNIs</h3>
                    <input type="file" accept=".xlsx,.xls" onChange={handleUploadExcel} />

                </div>
                <div className='mt-4'>
                    <ul className='list-disc ml-6'>
                        {dnisValidados.length > 0 ? (
                            dnisValidados.map(({ dni, existe }, index) => (
                                <li
                                    key={index}
                                    onDoubleClick={() => buscarPersona(dni)}
                                    className={`cursor-pointer ${existe ? 'text-green-600' : 'text-red-500'} hover:underline`}
                                >
                                    {dni} - {existe ? 'Existe' : 'No existe'}
                                </li>
                            ))
                        ) : (
                            dnis.map((dni, index) => (
                                <li key={index} onDoubleClick={() => buscarPersona(dni)} className='cursor-pointer hover:text-blue-600'>
                                    {dni}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {persona && (
                <div className=' fixed ml-[250px] mt-6 border p-4 rounded w-[750px] h-[400px] flex flex-col gap-2'>
                    <h4 className='font-semibold mb-2'>Resultado:</h4>


                    <div className='flex gap-4'>
                        <label className='w-[150px]'>Tipo:</label>
                        <input
                            className='border p-1 flex-1'
                            value={formData.tipo}
                            onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <label className='w-[150px]'>DNI:</label>
                        <input
                            className='border p-1 flex-1'
                            value={formData.numero}
                            onChange={e => setFormData({ ...formData, numero: e.target.value })}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <label className='w-[150px]'>Nombre Completo:</label>
                        <input
                            className='border p-1 flex-1'
                            value={formData.nombre_completo}
                            onChange={e => setFormData({ ...formData, nombre_completo: e.target.value })}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <label className='w-[150px]'>Nombres:</label>
                        <input
                            className='border p-1 flex-1'
                            value={formData.nombres}
                            onChange={e => setFormData({ ...formData, nombres: e.target.value })}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <label className='w-[150px]'>Apellido Paterno:</label>
                        <input
                            className='border p-1 flex-1'
                            value={formData.apellido_paterno}
                            onChange={e => setFormData({ ...formData, apellido_paterno: e.target.value })}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <label className='w-[150px]'>Apellido Materno:</label>
                        <input
                            className='border p-1 flex-1'
                            value={formData.apellido_materno}
                            onChange={e => setFormData({ ...formData, apellido_materno: e.target.value })}
                        />
                    </div>

                    <div className='mt-3 flex gap-2'>
                        <button className='bg-green-600 text-white px-4 py-1 rounded cursor-pointer' onClick={handleInsertarMigracion}>Migrar Datos</button>
                        <button className='bg-slate-700 text-white px-4 py-1 rounded cursor-pointer' onClick={() => getTipAna(formData.tipo)}>Mostrar Tipo</button>
                    </div>
                </div>
            )}


        </div>
    )
}
