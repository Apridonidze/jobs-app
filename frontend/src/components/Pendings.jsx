import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

const Pendings = () => {

    const PENDINGS_URL = ''
    const [cookies] = useCookies(['token'])

    useEffect(() => {

        const fetchPendings = async() =>{
            try{
                await Promise.all([
                axios.get(PENDINGS_URL, {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])
            }catch(err){
                console.log(err)
            }
        }

        fetchPendings()

    },[])

    return(
        <div className="pendings-container">
            <h1>Pendings For Your Jobs</h1>

        </div>
    )
}

export default Pendings