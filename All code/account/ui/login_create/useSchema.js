import * as yup from 'yup'

export const schema = yup.object().shape({
  userName: yup.string().required("Please Enter Your User Name"),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must matched")
    .required("re-enter password"),
});