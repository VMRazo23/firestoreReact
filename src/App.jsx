import React,{useState,useEffect} from 'react';
import {store} from './firebaseconf';
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {

    const [nombre,setNombre] = useState('');
    const [phone,setPhone] = useState('')
    const [ciudad,setCiudad] = useState('')
    const [error,setError] = useState('');
    const [usuarios, setUsuarios] = useState([])

    const setUsuario = async (e)=>{
        e.preventDefault();
        if (!nombre.trim()){
            setError("El campo nombre está vacío");
        }
       else if (!phone.trim()){
            setError("El campo teléfono está vacío");
        }else if(!ciudad.trim()){
            setError("El campo ciudad está vacío");
        }
       else{
           try {
               const data = await addDoc(collection(store,"agenda"),{
                   nombre: nombre,
                   telefono: phone,
                   ciudad: ciudad
               });
               console.log("Datos"+data.id);
               const {docs} = await getDocs(collection(store,"agenda"));
               const nuevoArray = docs.map(item=>({id:item.id, ...item.data()}))
               setUsuarios(nuevoArray);
               alert("Usuario añadido");
           }catch (e) {
               console.log(e)
           }
           setNombre('');
           setPhone('');
           setCiudad('');
        }
    }

    useEffect(()=>{
        const getUsuarios = async ()=>{
            const {docs} = await getDocs(collection(store,"agenda"));
            const nuevoArray = docs.map(item=>({id:item.id, ...item.data()}))
            setUsuarios(nuevoArray);
        }
        getUsuarios();
    },[]);

  return (
    <div className="container">
      <div className={"row vh-100 d-flex justify-content-center align-content-center"}>
        <div className={"col-6"}>
            <h2>Formulario de Usuarios</h2>
            <form className={"form-group"} onSubmit={setUsuario}>
              <input
                  value={nombre}
                  onChange={(e)=>(setNombre(e.target.value))}
                  className={"form-control"}
                  type="text"
                  placeholder="Introduce tu nombre"
              />
              <input
                  value={phone}
                  onChange={(e)=>(setPhone(e.target.value))}
                  className={"form-control mt-3"}
                  type="text"
                  placeholder="Introduce tu teléfono"
              />
            <input
                value={ciudad}
                onChange={(e)=>(setCiudad(e.target.value))}
                className={"form-control mt-3"}
                type="text"
                placeholder="Introduce tu ciudad"
            />
              <input
                  className={"btn btn-dark w-100 mt-3"}
                  type={"submit"}
                  value={"Registrar"}
              />
            </form>
            {
                error ?
                    (<div>
                        <p>{error}</p>
                    </div>)
                    :
                    (<span></span>)
            }
        </div>
      <div className={"col"}>
          <h2>Lista de tu agenda</h2>
          {
              usuarios.length !== 0 ?
                  (
                      usuarios.map(item=>(
                          <li key={item.id}>{item.nombre} -- {item.telefono} -- {item.ciudad}</li>
                      ))
                  )
                  :
                  (<span className={"text-danger"}>No hay usuarios</span>)
          }
      </div>
      </div>
    </div>
  );
}
export default App;
