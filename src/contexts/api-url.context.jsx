import { createContext, useState } from 'react'

const URLContext = createContext()

function URLProviderWrapper(props) {
	const [url, setUrl] = useState("")
	const [gettedData, setGettedData] = useState([])
	const [methodRequest, setMethodRequest] = useState("GET")

	return <URLContext.Provider value={{url, setUrl, gettedData, setGettedData, methodRequest, setMethodRequest}}>
		{props.children}
	</URLContext.Provider>

}

export { URLContext, URLProviderWrapper}
