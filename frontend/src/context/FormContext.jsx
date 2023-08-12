import React, { createContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api'
import useAuth from "../hooks/useAuth"
import { toast } from 'react-toastify';
import { Center, Spinner } from "@chakra-ui/react"; // Import Chakra UI components
import { ADD_QUESTION, CREATE_TITLE,CREATE_QUESTION,REMOVE_QUESTION,LOADING } from './formActionType';
export const FormContext = createContext()
const initialState={
    loading:false,
    questionArray:[],
    question:"",
    title:"",
    answer:"",
    answerArray:[],
    link:""

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
            console.log(response.data)
            if(response.status=="201"){
                toast.success("post successfull", {
                    position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                    autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                    hideProgressBar:false, // Hide the progress bar
                  });
                  dispatch({type:"SET_LINK",payload:response.data.link})
                  dispatch({type:"RESET_FIELDS"})
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


      const value={
       state,
       dispatch,
       createForm
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