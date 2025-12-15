import { useContext, useEffect, useState } from "react"
import { URLContext } from "../contexts/api-url.context"
import "../styles/APIConnection.css"
import ShowData from "./ShowData"

function APIConnection({post_data}) {
  const {url, gettedData, setGettedData, methodRequest} = useContext(URLContext)
  const [err, setError] = useState(null)

  useEffect(()=>{
    if (!url) return
    const controller = new AbortController()
    const signal = controller.signal
    setGettedData([])
    const doRequest = async () => {
      try {
        const options = methodRequest === "GET" ?
        {method: "GET", signal}
        : {method: methodRequest, headers: {"Content-type":"application/json"}, body: post_data, signal};
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        setError(null)
        setGettedData(data)
      } catch (e) {
        if (e === "AbortError") return
        setError(e)
      }
    }

    doRequest()


    return () => {
      controller.abort()
      setGettedData([])
    }
  }, [url, methodRequest, post_data])

   return (
     <>
      {err ? (<><br/><strong id="error">Ocurrió un error: {err.message}</strong></>) : <>
          {gettedData.length !== 0 ? <ShowData /> : <p id="loading">Cargando...</p>}
        </>}
     </>
   )
}

export default APIConnection;