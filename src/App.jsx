import './styles/App.css'
import { useContext, useEffect, useState } from 'react'
import { URLContext } from './contexts/apt-url.context'
import APIConnection from './components/APIConnection'
console.time('Tiempo de renderizado')

function App() {
  const URL_FIJA = "https://jsonplaceholder.typicode.com/users"
  const { url, setUrl, methodRequest, setMethodRequest } = useContext(URLContext)
  const [methods, setMethods] = useState({
    GET: false,
    GETONE: false,
    POST: false,
    PUT: false,
    DELETE: false
  })
  const [dataToPost, setDataToPost] = useState("")
  const [makeRequest, setMakeRequest] = useState(false)

  const handleMethods = (method) => {
    setMethods({
      GET: false,
      GETONE: false,
      POST: false,
      PUT: false,
      DELETE: false
    })
    setMethods({
      [method]: true
    })
    setMakeRequest(false)
    setDataToPost("")
    if (method === "GETONE") {
      setMethodRequest("GET")
    } else {
      setMethodRequest(method)
    }
  }

  const handleSubmitIDForm = (e) => {
    e.preventDefault()
    setUrl(URL_FIJA + "/" + e.target.id.value)
    setMakeRequest(true)
  }

  const handleSubmitPostForm = (e) => {
    e.preventDefault()
    setUrl(URL_FIJA)
    const data = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value
    }
    setDataToPost(JSON.stringify(data));
    setMakeRequest(true);
  }

  const handleSubmitPutForm = (e) => {
    e.preventDefault()
    setUrl(URL_FIJA + "/" + e.target.id.value)
    const data = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value
    }
    setDataToPost(JSON.stringify(data));
    setMakeRequest(true)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const btn = e.target.id
    switch (btn) {
      case "get-btn":
        handleMethods("GET")
        setUrl(URL_FIJA)
        console.log(methodRequest);
        setMakeRequest(true)
        break;
      case "get-one-btn":
        handleMethods("GETONE")
        console.log(methodRequest);
        break;
      case "post-btn":
        handleMethods("POST")
        console.log(methodRequest);
        break;
      case "put-btn":
        handleMethods("PUT")
        console.log(methodRequest);
        break;
      case "delete-btn":
        handleMethods("DELETE")
        console.log(methodRequest);
        break;
      default:
        break;
    }

  }

  const showInputs = () => {
    const commonInputs = () => (<>
        <input type="text" className="inputs" id="name" placeholder="Nombre" autoComplete="off" />
        <input type="text" className="inputs" id="lastname" placeholder="Apellido" autoComplete="off" />
        <input type="text" className="inputs" id="email" placeholder="Correo" autoComplete="off" />
    </>)
    
    switch (methodRequest) {
      case "POST":
        return commonInputs()
      case "PUT":
        return commonInputs()
      default:
        return null
    }
  }

  const IDInput = ()=>{
    return  <input type="text" className="inputs" id="id" placeholder='ID' autoComplete="off" />
  }

  return (
    <>
      <h1 id="title-page">Admin Usuarios</h1>
      <section className="action-buttons">
        <button className='request-btn' id="get-btn" onClick={handleClick}>Ver usuarios guardados</button>
        <button className='request-btn' id="get-one-btn" onClick={handleClick}>Buscar un usuario</button>
        <button className='request-btn' id="post-btn" onClick={handleClick}>Registrar usuario</button>
        <button className='request-btn' id="put-btn" onClick={handleClick}>Actualizar usuario</button>
        <button className='request-btn' id="delete-btn" onClick={handleClick}>Eliminar usuario</button>
      </section>
      {methods.GETONE && <>
        <form onSubmit={handleSubmitIDForm}>
          {IDInput()}
          <button className="submit-btn" id="get-submit-btn" type='submit'>Buscar</button>
        </form>
      </>}
      {methods.POST && <>
        <form onSubmit={handleSubmitPostForm}>
          {showInputs()}
          <button className="submit-btn" id="post-submit-btn" type="submit">Registrarse</button>
        </form>
      </>}
      {methods.PUT && <>
        <form onSubmit={handleSubmitPutForm}>
          {IDInput()}
          {showInputs()}
          <button className="submit-btn" id="put-submit-btn" type="submit">Actualizar</button>
        </form>
      </>}
      {methods.DELETE && <>
        <form onSubmit={handleSubmitIDForm}>
          {IDInput()}
          <button className="submit-btn" id="delete-submit-btn" type='submit'>Eliminar</button>
        </form>
      </>}
      {makeRequest && <APIConnection post_data={dataToPost} />}

    </>
  )
}
console.timeEnd('Tiempo de renderizado')

export default App;