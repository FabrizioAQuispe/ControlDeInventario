'use client';
import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
import {getCookie} from 'cookies-next'

type Perfil = any;

//Creamos el contexto global
const GlobalContext = createContext<Perfil|null>(null)

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [perfil,setPerfil] = useState();
    //Cargando al provider
    useEffect(() => {
        const cookieData  = getCookie("data");
        if(cookieData){
            try{
                setPerfil(JSON.parse(cookieData as string));
            }catch(error){
                console.error("ERROR SERVER RESPONSE: " + error);
            }
        }
    },[])
};

