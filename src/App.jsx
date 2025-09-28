import { useEffect, useState, useCallback } from 'react'
import SearchInput from './components/SearchInput'
import TodoItem from './toDoItem'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import { CircularProgress } from '@mui/material'
import { useAuth } from './context/AuthContext'
 
export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const { logout } = useAuth()
  const [buscando, setBuscando] = useState(false)
  const [filtrados, setFiltrados] = useState([])

  const API_URL = 'http://localhost:3001'

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`)
      setUsuarios(response.data)
      setFiltrados(response.data)
    } catch (error) {
      console.error('Error al obtener usuarios:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const filtrarUsuarios = useCallback(
    (query) => {
      setBuscando(true)
      setTimeout(() => {
        const q = query.trim().toLowerCase()
        const resultados = usuarios.filter((usuario) =>
          [
            usuario.nombre,
            usuario.apellidos,
            usuario.intereses,
            usuario.perfil,
            usuario.correo,
          ].some((campo) => String(campo).toLowerCase().includes(q))
        )

        setFiltrados(resultados)
        setBuscando(false)
        if (resultados.length === 0) {
          toast.info(
            'No se encontraron usuarios que coincidan con la búsqueda.',
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }
          )
        }
      }, 2000)
    },
    [usuarios]
  )




  const [tareas, setTareas] = useState([]);

  const [input, setInput] = useState("");


  const agregarTarea = () => {

    if (input.trim()) {
      setTareas([...tareas, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput("");
    };

  }


  const toggleCompleted = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
      )
    );
  };


  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));

  }



  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={logout}>logout</button>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Buscador interactivo
      </h1>
      <div className="max-w-md mx-auto mb-6">
        <SearchInput onSearch={filtrarUsuarios} />
      </div>

      {loading && (
        <div className="flex justify-center items-center my-10">
          <CircularProgress />
        </div>
      )}

      {buscando && (
        <div className="flex justify-center items-center my-10">
          <CircularProgress color="primary" />
        </div>
      )}
      {!buscando && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(filtrados) &&
            filtrados.map((usuario) => (
              tareas.map((tarea) => (
  <TodoItem
    key={tarea.id}
    tarea={tarea}
    toggleCompleted={toggleCompleted}
    eliminarTarea={eliminarTarea}
  />
))
            ))}
        </div>
      )}


        
          
          <div className="max-w-md mx-auto mt-10 p-2  rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">LISTA DE TAREAS</h1>
      <div className="flex gap-3 mb-5">
        <input className="flex-1 p-2 border rounded" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Añadir Tarea" />
        <button className="bg-blue-500 text-white px-4 p-y-2 rounded" onClick={agregarTarea} >Añadir Tareas</button>
      </div>

      <div className="space-y-2">
        {tareas.map((tarea) => (<TodoItem key={tarea.id} tarea={tarea} toggleCompleted={toggleCompleted} eliminarTarea={eliminarTarea} />))}
      </div>

    </div>
        

    </div>
  )
}
