import axios from 'axios';
import { useCookies } from 'react-cookie'; //importing react libraries

import { useEffect, useRef, useState } from "react"; //importing react hooks


import '../main.css'; //importing css file

const UploadDesc = ( { setToggleUploadDescMessage, setIsDescSuccessfull ,setUploadMessage } ) => {

    const [ cookies ] = useCookies(['token']); //cookies 

    const ADD_USER_DESC_URL = 'http://localhost:8080/desc/add-desc'; //api url to post new description
    const USER_DESC_URL = 'http://localhost:8080/desc/my-desc'; //api url to get current description

    const [desc,setDesc] = useState(''); //state for desc 
    const [descErr,setDescErr] = useState(''); //state for desc error

    const descRef = useRef(null); //ref for description input to style
    const btnRef = useRef(null); //ref for description button to style
    

    const SubmitDesc = async (e) => {

        e.preventDefault(); //prevents page reload whne function tirggers

        let isValid ;
        let data = {}; //variables for description data

        if(desc.trim().length < 20){isValid = false ; setDescErr('Description Length is Too Small'); descRef.current.classList.add('is-invalid'); btnRef.current.classList.add('btn-danger');descRef.current.classList.remove('is-valid'); btnRef.current.classList.remove('btn-success')}
        else if (desc.trim() == ''|| desc.trim() == ' ' || desc == null || desc == undefined){isValid = false; setDescErr('Description Form Cant Be Empty'); descRef.current.classList.add('is-invalid'); btnRef.current.classList.add('btn-danger');descRef.current.classList.remove('is-valid'); btnRef.current.classList.remove('btn-success')}
        else {isValid = true; setDescErr(''); descRef.current.classList.add('is-valid'); btnRef.current.classList.add('btn-success');descRef.current.classList.remove('is-invalid'); btnRef.current.classList.remove('btn-danger'); data = {...data,desc : desc}}
        //validates desc input 

        if(isValid){ //if input is valid then try/catch block executes

            try{

                await axios.post(ADD_USER_DESC_URL, {data} , {headers:{authorization: `Bearer ${cookies.token}`}})
                .then(resp => {setUploadMessage(resp.data.message) ; setToggleUploadDescMessage(true);setIsDescSuccessfull(true)}); //post new description to server
            
            }catch(err){

                console.log(err); //consoles error
                setUploadMessage(err.response.data.err) ; //displayes error message
                setToggleUploadDescMessage(true); //toggles upload message component
                setIsDescSuccessfull(false); //sets description successs message to false

            };
        };

    };


    useEffect(() => {
        

        const FetchDesc = async() => {

            try{
    
                await axios.get(USER_DESC_URL , {headers : {Authorization : `bearer ${cookies.token}`}})
                .then(resp => setDesc(resp.data))  ; //getting my user description from server
                
            }catch(err){

                console.log(err); //consoles error
                
            };
        };

        FetchDesc();//declearing function

    },[]); //function executyes once component is mounted

    return(
        <div className="upload-desc-container  container position-fixed bg-white p-3 rounded-2 gap-3 col-12 col-sm-6">

            

            <div className="desc-header">

                {descErr ? <span className='text-danger'>{descErr}</span> : <span>Add Infromation About You : Who Are You, What Are You Doing, etc</span>}

            </div>
            
            <div className="desc-body">

                <form onSubmit={SubmitDesc} className='d-flex flex-column gap-3'>
                
                    <div className="form-floating">
                    
                        <textarea className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} style={{resize : 'none' , height:  '300px'}} type="text" name="desc" placeholder="Add About Me..." ref={descRef}/>
                        <label htmlFor="desc">Add About Me...</label>
                    
                    </div>

                    <div className="form-button">
                        
                        <input type="submit" className="btn btn-success w-100" value="Upload" ref={btnRef}/>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UploadDesc; //exporting component