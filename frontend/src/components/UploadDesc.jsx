import axios from 'axios'
import { useRef, useState } from "react"
import { useCookies } from 'react-cookie'

const UploadDesc = ( { setToggleUploadDescMessage,setIsDescSuccessfull, setUploadMessage } ) => {

    const [desc,setDesc] = useState('');
    const [descErr,setDescErr] = useState('')

    const descRef = useRef(null)
    const btnRef = useRef(null)

    const POST_USER_DESC_URL = 'http://localhost:8080/upload-desc' //add server url here

    const [cookies,setCookies,removeCookies] = useCookies(['token'])

    const SubmitDesc = (e) => {

        e.preventDefault()

        let isValid 
        let data = {}

        if(desc.trim().length < 20){isValid = false ; setDescErr('Description Length is Too Small'); descRef.current.classList.add('is-invalid'); btnRef.current.classList.add('btn-danger');descRef.current.classList.remove('is-valid'); btnRef.current.classList.remove('btn-success')}
        else if (desc.trim() == ''|| desc.trim() == ' ' || desc == null || desc == undefined){isValid = false; setDescErr('Description Form Cant Be Empty'); descRef.current.classList.add('is-invalid'); btnRef.current.classList.add('btn-danger');descRef.current.classList.remove('is-valid'); btnRef.current.classList.remove('btn-success')}
        else {isValid = true; setDescErr(''); descRef.current.classList.add('is-valid'); btnRef.current.classList.add('btn-success');descRef.current.classList.remove('is-invalid'); btnRef.current.classList.remove('btn-danger'); data = {...data,desc : desc}}


        if(isValid){
            axios.post(POST_USER_DESC_URL, data , {headers:{authorization: `bearer ${cookies.token}`}})
            .then(resp => {setUploadMessage(resp.data.message) ; setToggleUploadDescMessage(true);setIsDescSuccessfull(true)})
            .catch(err => {setUploadMessage(err.response.data.err) ; setToggleUploadDescMessage(true);setIsDescSuccessfull(false)})
        }



    }

    return(
        <div className="upload-desc-container  container position-fixed bg-white">

            {descErr ? <span className='text-danger'>{descErr}</span> : <span>Add Infromation About You : Who Are You, What Are You Doing, etc</span>}

            <form onSubmit={SubmitDesc}>
                
                <div className="form-floating">
                
                    <textarea className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} style={{resize : 'none' , height:  '300px'}} type="text" name="desc" placeholder="Add About Me..." ref={descRef}/>
                    <label htmlFor="desc">Add About Me...</label>
                
                </div>

                <input type="submit" className="btn btn-success" value="Upload" ref={btnRef}/>
            
            </form>
        </div>
    )
}

export default UploadDesc