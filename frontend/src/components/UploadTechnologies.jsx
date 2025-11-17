import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

const UploadTechnologies = ( { technologies ,setTechnologies } ) => {

    const [cookies] = useCookies(['token'])

    const UPLOAD_TECH_URL = 'http://localhost:8080/technologies/new-technologies'

    const handleUploadTech = async(e) => {

        e.preventDefault()

        if(technologies.length < 1)return

        try{

            await Promise.all([
                axios
                .post(UPLOAD_TECH_URL , {technologies : technologies} , {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])

            ///add success message toggle 

        }catch(err){
            console.log(err)
            //addd error message toggle herer
        }

    }


    return(
        <div className="upload-technologies-container bg-white position-fixed">

            <form onSubmit={handleUploadTech}>

                <select className="form-control" onChange={(e) => {setTechnologies(technologies => [...technologies, e.target.value]) ;if(e.target.value === 'blank') setTechnologies(technologies) ; if(technologies.includes(e.target.value)) setTechnologies(technologies) ; return}}>
                    <option value="blank">What Technologies Are You Searching In Employee</option>
                    <option value="GO">GO</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="C">C</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Cobol">Cobol</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Swift">Swift</option>
                    <option value="Perl">Perl</option>
                    <option value="Rust">Rust</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Javacript">Javacript</option>
                    <option value="PHP">PHP</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="React">React</option>
                    <option value="Vue.js">Vue.js</option>
                    <option value="Laravel">Laravel</option>
                    <option value="AWS">AWS</option>
                    <option value="Azure">Azure</option>
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="MySQL">MySQL</option>
                    <option value="MongoDb">MongoDb</option>
                    <option value="Postgres">Postgres</option>
                </select>

                <div className="technologies-list">
                    {technologies && technologies.map((tech, techId) => (
                        <span key={techId} onClick={() => setTechnologies(technologies.filter(t => t !== tech))}>{tech}</span>
                    ))}
                </div>

                <input type="submit" value="Upload Your Technologies List" />
        
        </form>

        </div>
    )
}


export default UploadTechnologies