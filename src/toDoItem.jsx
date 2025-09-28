
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import  'react-toastify/dist/ReactToastify.css'

import { TrashIcon } from '@heroicons/react/24/solid';


export default function TodoItem({ tarea, toggleCompleted, eliminarTarea }) {
  
  

  return (
    <div className=" flex  items-center gap-3 justify-between border-b border-gray-300 p-3 shadow-sm rounded">
        <span className={tarea.completed ? 'line-through' : 'text-gray-400'}>{tarea.text}</span>
        <input className="w-4 h-4" type="checkbox" checked={tarea.completed} onChange={() => toggleCompleted(tarea.id)} />
        <button>
            <TrashIcon className="w-5 h-5 text-red-500" onClick={() => eliminarTarea(tarea.id)} />
        </button>
    </div>
  );
}