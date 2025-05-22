import { NextResponse } from "next/server";
import { LISTAR_DNIS } from "../../InsertarMigracion";

export async function GET(
  request: Request,
  { params }: { params: { dni: string } }
) {
  try {
    const dni = params.dni;
    const result = await LISTAR_DNIS(dni);

    console.log("=======TRAYENDO LOS RESULTADOS========")
    return NextResponse.json({result});
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al migrar datos" },
      { status: 500 }
    );
  }
}
