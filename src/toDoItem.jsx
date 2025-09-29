import { useState } from 'react';
import { TrashIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/solid';

export default function ToDoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoTexto, setNuevoTexto] = useState(tarea.text);

 const guardarCambios = () => {
    if (nuevoTexto.trim()) {
      editarTarea(tarea.id, nuevoTexto.trim());
      setModoEdicion(false);
    }
  };

  return (
    <div className="flex items-center gap-3 justify-between border-b border-gray-300 p-3 shadow-sm rounded">
      <div className="flex items-center gap-2 flex-1">
        <input
          className="w-4 h-4"
          type="checkbox"
          checked={tarea.completed}
          onChange={() => toggleCompleted(tarea.id)}
        />

        {modoEdicion ? (
          <input
            className="flex-1 border p-1 rounded"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
        ) : (
          <span className={tarea.completed ? 'line-through text-gray-400' : ''}>
            {tarea.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {modoEdicion ? (
          <button onClick={guardarCambios} title="Guardar">
            <CheckIcon className="w-6 h-6 text-green-600 hover:text-green-800" />
          </button>
        ) : (
          <button onClick={() => setModoEdicion(true)} title="Editar">
            <PencilIcon className="w-6 h-6 text-blue-600 hover:text-blue-800" />
          </button>
        )}

        <button onClick={() => eliminarTarea(tarea.id)} title="Eliminar">
          <TrashIcon className="w-6 h-6 text-red-600 hover:text-red-800" />
        </button>
      </div>
    </div>
  );
}