import { configure } from 'vee-validate'
import * as yup from 'yup'

export const validationWorkshop = yup.object({
  title: yup.string().required('El título es requerido'),
  description: yup.string().required('La descripción es requerida'),
  content: yup.string().required('El contenido es requerido'),
  id_type_id: yup
    .number()
    .required('Seleccionar una opción es requerido')
    .min(1, 'Seleccionar una opción es requerido'),
  img: yup.string().required('La imagen es requerida'),
})

export const validationUser = yup.object({
  name: yup.string().required('El nombre es requerido'),
  last_names: yup.string().required('Los apellidos son requeridos'),
  email: yup
    .string()
    .required('El correo es requerido')
    .email('El correo debe de tener el carácter "@"'),
  // phone: yup.string().required('El teléfono es requerido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),

  confirmpassword: yup
    .string()
    .required('La contraseña debe de ser confirmada')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})

export const validationUserLogin = yup.object({
  email: yup
    .string()
    .required('El correo es requerido')
    .email('El correo debe de tener el carácter "@"'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

configure({
  validateOnInput: true,
})
