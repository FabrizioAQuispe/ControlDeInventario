// app/admin/layout.tsx
"use client"
import Link from "next/link";
import "../globals.css";
import { getCookie,deleteCookie } from "cookies-next";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    
    const handleCloseSession = () => {
        try{
            deleteCookie("data");
        }catch(error){
            console.error("ERROR SERVER RESPONSE: " + error);
        }
    }
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <nav className="w-64 bg-sky-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Control de Inventario</h2>
                <ul>
                    <li className="mb-2">
                        <Link href="/admin/routers/Inicio" className="block px-4 py-2 rounded hover:bg-sky-700">
                            Inicio
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/admin/routers/Configuraciones" className="block px-4 py-2 rounded hover:bg-sky-700">
                            Configuraciones
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/admin/routers/Productos" className="block px-4 py-2 rounded hover:bg-sky-700">
                            Productos
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/admin/routers/Materiales" className="block px-4 py-2 rounded hover:bg-sky-700">
                            Materiales
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link 
                        onClick={handleCloseSession}
                        href="/"
                         className="block px-4 py-2 rounded hover:bg-red-700 text-white">
                           Cerrar Sessión
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
