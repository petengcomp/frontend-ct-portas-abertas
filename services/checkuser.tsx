import Router from "next/router"
import Swal from "sweetalert2"

export interface User {
  authType: string
  authId: string
  authName: string
  amountStudents: string
  token: string
}

export function CheckUser() {
  let authType = localStorage.getItem('CTPORTASABERTASAUTHTYPE')
  let authId = localStorage.getItem('CTPORTASABERTASAUTHID')
  let authName = localStorage.getItem('CTPORTASABERTASAUTHNAME')
  let amountStudents = localStorage.getItem('CTPORTASABERTASAMOUNTSTUDENTS')
  let token = localStorage.getItem('CTPORTASABERTASTOKEN')
  
  if (!authType || !authId || !token  || !authName) {
    Swal.fire('Ops','Nenhuma conta logada, redirecionando para página principal.', 'warning')
    Router.push('/')
  } else {
    return {authType, authId, token, authName, amountStudents:amountStudents?amountStudents:"0"}
  }
}