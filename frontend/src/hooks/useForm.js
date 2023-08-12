import { useContext } from 'react'
import {FormContext} from '../context/FormContext'

const useForm = () => {
   return useContext(FormContext)
}

export default useForm