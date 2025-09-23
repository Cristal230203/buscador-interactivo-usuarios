import { motion } from "framer-motion"

export default function UserCard({ usuario, onClick}) {
    return (
        <motion.div onClick={onClick} className="p-4 bg-white shadow-md rounded hover:scale105 transition-transform duration-300 cursor-pointer text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
           <img className="w-24 h-24 object-cover rounded-full mx-auto mb-2" src={usuario.foto} alt={usuario.nombre} />
            <h3 className="font-bold mt-2">{usuario.nombre} {usuario.apellidos}</h3>
            <p className="text-gray-600">{usuario.ocupacion}</p>
            <p className="text-gray-600">{usuario.perfil}</p>
            <p className="text-xs text-blue-500 mt-1">{usuario.correo}</p>
        </motion.div>
      
    );
}