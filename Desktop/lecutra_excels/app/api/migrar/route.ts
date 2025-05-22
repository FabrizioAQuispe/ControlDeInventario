import { NextResponse } from "next/server";
import {INSERT, LISTAR} from "../InsertarMigracion";

export async function POST(req:Request){
    try{
        const body = await req.json();

        const { numero, nombre_completo, nombres, apellido_materno, apellido_paterno ,tipo} = body;
    
        console.log({numero, nombre_completo, nombres, apellido_materno, apellido_paterno,tipo})
        const result = await INSERT(numero, nombre_completo, nombres, apellido_materno, apellido_paterno,tipo);
        

        console.log("================INSERTANDO LOS RESULTADOS DEL TIPO POST =================")
        return result;
    }catch(error){
        console.error("Error en la API:", error);
        return NextResponse.json({ error: "Ocurrió un error al migrar datos" }, { status: 500 });    
    }
}


export async function GET(){
    try{
        const result = await LISTAR();
        if(!result){
            console.error("ERROR NOT DATA FOUND");
        }

        console.log(result);
        return result;
    }catch(error){
        console.error("Error en la API:", error);
        return NextResponse.json({ error: "Ocurrió un error al migrar datos" }, { status: 500 });    
    }
}
