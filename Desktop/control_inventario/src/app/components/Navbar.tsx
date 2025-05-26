"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Inicio from '../admin/routers/Inicio/page'; // Asegúrate de que la ruta sea correcta
import Usuarios from '../admin/routers/Configuraciones/page'; // Asegúrate de que la ruta sea correcta
import Productos from '../admin/routers/Mantenimiento/page'; // Asegúrate de que la ruta sea correcta
import Materiales from '../admin/routers/Materiales/page'; // Asegúrate de que la ruta sea correcta

export const Navbar = () => {
    const router = usePathname();

    const handleMostarContenido = () => {
        switch (router) {
            case "../admin/routers/Inicio":
                return <Inicio />;
            case "../admin/routers/Usuarios":
                return <Usuarios />;
            case "../admin/routers/Productos":
                return <Productos />;
            case "../admin/routers/Materiales":
                return <Materiales />;
            default:
                return <Inicio/>
        }
    }

    return (
        <div className="flex  bg-gray-100">
            <div className="flex">
                {handleMostarContenido()}
            </div>
        </div>
    );
};
