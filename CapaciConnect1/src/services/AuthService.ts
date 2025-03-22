import { genericRequest, genericRequestAuth } from '@/utils/genericRequest'

 const base_url = 'https://localhost:44368/api'

 const headers = {
   'Content-Type': 'application/json',
   Authorization: 'Bearer ' + localStorage.getItem('token'),
 }

 const handleError = async (error: any, context: string) => {
   const errorMessage = `Error during ${context}: ${error.message}`
   console.error(errorMessage)

   const errorDetails = {
     response: error.response
       ? {
           data: error.response.data,
           status: error.response.status,
           headers: error.response.headers,
         }
       : null,
     request: error.request || null,
     message: error.message,
   }

   await console.error('error', errorMessage, errorDetails)
   throw error
 }

 export const LoginService = async (email: string, password: string) => {
   try {
     var result = await genericRequest(`${base_url}/Auth/login`, 'POST', { email, password })
     return result
   } catch (error: any) {
     await handleError(error, 'LoginService')
   }
 }

 export const RegisterService = async (
   name: string,
   last_names: string,
   phone: string,
   email: string,
   password: string,
   confirmedPassword: string,
 ) => {
   try {
     var result = await genericRequest(`${base_url}/Auth/register`, 'POST', {
       name,
       last_names,
       phone,
       email,
       password,
       confirmedPassword,
     })
     return result
   } catch (error: any) {
     await handleError(error, 'RegisterService')
   }
 }

 export const LogoutService = async () => {
   try {
     const result = await genericRequestAuth(`${base_url}/Auth/logout`, 'POST')
     return result
   } catch (error: any) {
     await handleError(error, 'LogoutService')
   }
 }
