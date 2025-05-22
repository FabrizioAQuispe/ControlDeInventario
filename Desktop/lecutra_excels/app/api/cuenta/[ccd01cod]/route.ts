import { LISTAR_CUENTA_CORRIENTE } from "@/app/api/InsertarMigracion";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    console.log("================INSERTANDO LOS TIPO DE ANALICIS===================")
    const body = await req.json();
    const {dni } = body;

    const result = await LISTAR_CUENTA_CORRIENTE(dni);

    if (!result) {
      console.error("ERROR SERVER RESPONSE");
      return NextResponse.json({ error: "No se encontró información" }, { status: 404 });
    }


    return NextResponse.json({
      message: "ENVIANDO REGISTROS",
      data: result
    });
  } catch (error) {
    console.error("ERROR SERVER:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

