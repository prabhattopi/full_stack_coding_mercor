import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text, Input, Button } from '@chakra-ui/react'
import { useParams } from "react-router-dom"
import useForm from "../hooks/useForm"
import useAuth from "../hooks/useAuth"
import { toast } from 'react-toastify';
import api from "../api"
import { RESET_SINGLE_FORM } from "../context/formActionType"
const AnswerForm = () => {

    const { uniqueLink } = useParams()
    const { handleSingleForm, dispatch, state } = useForm()
    const { user } = useAuth()

    useEffect(() => {
        let isCurrent = true
        if (isCurrent) {
            handleSingleForm(uniqueLink)
            
        }

        return () => {
            isCurrent = false
            dispatch({ type: RESET_SINGLE_FORM })
        }
    }, [uniqueLink])


    const [answers, setAnswers] = useState(Array(state.singleForm?.questions?.length).fill(''));
    const [submitted,setSubmitted]=useState(false)

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const unansweredIndexes = answers.reduce((acc, answer, index) => {
            if (!answer.trim()) {
                acc.push(index);
            }
            return acc;
        }, []);

        if (unansweredIndexes.length > 0) {
            alert(`Please answer all questions. Unanswered questions: ${unansweredIndexes.join(', ')}`);
            return;
        }

        try {
            const response = await api.post(`/form/${uniqueLink}`, {
                userId: user._id,
                answers: answers.map((answer, index) => ({
                    questionIndex: index, // This is the key change
                    answer,
                }
                

                )),
                useremail:user.email
            },
                {

                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('form_walle')}`,
                    },

                }
            );
            setSubmitted(true)
            toast.success(response.data.message || "Post successfull", {
                position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                hideProgressBar: false, // Hide the progress bar
            });

        } catch (error) {
            toast.error("unexpected error", {
                position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                hideProgressBar: false, // Hide the progress bar
            });
        }
    };
    if(state.singleForm.ownerId?.toString()==user._id.toString()){
        return (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="90vh" fontSize="30px">
                <Text>You are the owner</Text>
            </Box>
        )
    }
    if (state.singleForm.responses?.find(e => e.userId.toString() == user._id.toString())||submitted) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="90vh" fontSize="30px">
                <Text>You have already respond the form</Text>
            </Box>
        )
    }
    return (
        <Card mx="30px" my="40px" px="20px">
            <CardHeader>
                <Heading size='md'>{state.singleForm.title}</Heading>
            </CardHeader>

            <CardBody>
                <form onSubmit={handleSubmit}>
                    <Stack spacing='8'>
                        {
                            state.singleForm.questions?.map((item, index) => (
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        {item}
                                    </Heading>
                                    <Input
                                        value={answers[index]}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        placeholder='Here is a sample placeholder'
                                        size='sm'
                                        border="none"
                                        borderBottom="1px"
                                        outline="none"

                                    />
                                </Box>
                            ))
                        }


                    </Stack>
                    <Button type="submit" sizes="sm" mt="20px" backgroundColor="blue.600" color="white">Submit</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default AnswerForm
