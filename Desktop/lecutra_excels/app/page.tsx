import Image from "next/image";
import {ListarDnis} from "./components/ListarDnis"
import ListadoDeDnis from "./components/ListadoDeDnis";

export default function Home() {
  return (
    <div>
      <ListarDnis/>
      {/* <ListadoDeDnis/> */}
    </div>
  );
}
