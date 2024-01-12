import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
export const useLogin = ()=>{


  const schema = yup.object().shape({
    email: yup
      .string()
      .email("invalid email")
      .required("Please Enter Your Email "),
    password: yup
      .string("enter password")
      .min(4)
      .max(10)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .required("Please Enter You Password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  }); 
  
  return [handleSubmit,control,errors]
}