import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

const Saved = () => {

    const [cookies] = useCookies(['token'])

    const SAVED_URL = 'http://localhost:8080/saved/my-saved-jobs'

    useEffect(() => {
        const fetchSaved = async() => {
            try{

                await Promise.all([
                    axios.get(SAVED_URL, {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => console.log(resp))
                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchSaved()
    },[])

    return (
        <div className="saved-container">
            <h1>Your Saved Jobs:</h1>
        </div>
    )
}


export default Saved