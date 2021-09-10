import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please input password')
})