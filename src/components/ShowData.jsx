import { useContext } from 'react'
import { URLContext } from '../contexts/apt-url.context'
import '../styles/ShowData.css'

function ShowData() {
  const { gettedData, methodRequest } = useContext(URLContext)
  
  if (gettedData.length === 0) return <p>No hay datos</p>
  switch (methodRequest) {
    case "GET":
      if (gettedData.length > 1) {
        const userData = gettedData.map((user) => {
          return (
            <li className="user-card" key={user.id}>
              <p>Identificador: <span className='data'>{user.id}</span></p>
              <p>Nombre: <span className='data'>{user.name}</span></p>
              <p>Correo: <span className='data'>{user.email}</span></p>
              <p>Telefono: <span className='data'>{user.phone}</span></p>
            </li>
          )
        })
        return (
          <ul className="users">
            {userData}
          </ul>
        )
      } else {
        return (
          <ul className="users">
            <li className="user-card" key={gettedData.id}>
              <p>Identificador: <span className='data'>{gettedData.id}</span></p>
              <p>Nombre: <span className='data'>{gettedData.name}</span></p>
              <p>Correo: <span className='data'>{gettedData.email}</span></p>
              <p>Telefono: <span className='data'>{gettedData.phone}</span></p>
              <p>Nombre de usuario: <span className='data'>{gettedData.username}</span></p>
              <p>Ubicación: <span className='data'>{gettedData.address.city}</span> calle: <span className='data'>{gettedData.address.street}</span></p>
              <p>Sitio Web: <span className='data'>{gettedData.website}</span></p>
              <p>Compañía: <span className='data'>{gettedData.company.name}</span></p>
            </li>
          </ul>
        )
      }
    case "POST":
      return (
        <span className="post-response">Usuario registrado con el ID: {gettedData.id}</span>
      )
    case "PUT":
      return (
        <span className="post-response">El usuario con el ID: {gettedData.id}, se ha actualizado</span>
      )
    case "DELETE":
      return (
        <span className="post-response">El usuario se ha eliminado</span>
      )
    default:
      break;
  }

}

export default ShowData