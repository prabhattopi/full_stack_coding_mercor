import React, { createContext, useEffect, useReducer,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api'
import useAuth from "../hooks/useAuth"
import { toast } from 'react-toastify';
import { Center, Spinner } from "@chakra-ui/react"; // Import Chakra UI components
import { ADD_QUESTION, CREATE_TITLE,CREATE_QUESTION,REMOVE_QUESTION,LOADING,ADD_ANSWER,ADD_FORMS,SINGLE_FORM,RESET_SINGLE_FORM } from './formActionType';
export const FormContext = createContext()
const initialState={
    forms:[],
    loading:false,
    questionArray:[],
    question:"",
    title:"",
    answer:"",
    answerArray:[],
    link:"",
    singleForm:{}

}
const reducer=(state,action)=>{
    switch(action.type){
        case CREATE_TITLE:
            return {...state,title:action.payload}
        case CREATE_QUESTION:
            return {...state,question:action.payload}
        case ADD_QUESTION:
             return {...state,questionArray:[...state.questionArray,action.payload]}    
        case REMOVE_QUESTION:
             return {...state,questionArray:state.questionArray.filter(e=>e!=action.payload)}      
               
        case CREATE_TITLE:
            return {...state,title:action.payload}      
        case LOADING:
             return {...state,loading:action.payload}  
        case ADD_FORMS:
            return {...state,forms:action.payload}   
        case SINGLE_FORM:
            return {...state,singleForm:action.payload}     
        case RESET_SINGLE_FORM:
            return {...state,singleForm:{}}     
        case "SET_LINK":
             return {...state,link:action.payload}   
        case 'RESET_FIELDS':
                return { ...state, ...initialState };
        default:
                return state;          
               
        
    }
}
const FormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user}=useAuth()
    const [showData,setShowData]=useState(true)
    // const [user,setUser]=useState(null);
    // const [isLoading,setIsLoading]=useState(true);
    // const [token,setToken]=useState(localStorage.getItem('form_walle'))
    const navigate=useNavigate()



    const createForm=async()=>{
        dispatch({type:LOADING,payload:true})
        try{
            let response=await api.post("/form",{
                title:state.title,
                questions:state.questionArray,
                ownerId:user._id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('form_walle')}`,
                  },
            },
            
            )
            
            if(response.status=="201"){
                toast.success("post successfull", {
                    position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                    autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                    hideProgressBar:false, // Hide the progress bar
                  });
                 
                  dispatch({type:"RESET_FIELDS"})
                  dispatch({type:"SET_LINK",payload:response.data.link})
                  navigate("/dashboard")
                
             
            }
            else{
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                    autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                    hideProgressBar:false, // Hide the progress bar
                  });
            }

            dispatch({type:LOADING,payload:false})


        }
        catch(error){
            dispatch({type:LOADING,payload:false})
            toast.error(error.response.data.message||'Worng credential', {
                position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                hideProgressBar:false, // Hide the progress bar
              });
        }
       

    }
    const handleSingleForm=async(uniquelink)=>{
      
        try{
          let response=await api.get(`/form/${uniquelink}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('form_walle')}`,
              },
          })
          dispatch({type:SINGLE_FORM,payload:response.data.form})
        }
        catch(err){
           console.log("error")
        }

    }

    useEffect(()=>{
        let isCurrent=true

        const getData=async()=>{
            try{
                let response=await api.get("/form",{
                
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('form_walle')}`,
                      },
                
            })
            if(isCurrent){
                dispatch({type:ADD_FORMS,payload:response.data.form})
            }

            }
            catch(err){
             console.log("there is no data")
            }
           
        }

        getData()


        return ()=>{
            isCurrent=false
        }

    },[state.link,localStorage.getItem('form_walle')])
  

      const value={
       state,
       dispatch,
       createForm,
       handleSingleForm
    }
    return (
        <FormContext.Provider value={value}>
            {/* {isLoading ? (  <Center h="100vh">
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.900"
          size="xl"
        />
      </Center>
        ) : ( */}
          {children}
        {/* )} */}
        </FormContext.Provider>
    )
}

export default FormProvider