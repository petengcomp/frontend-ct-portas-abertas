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
    Swal.fire('Atenção','Sinta-se livre para visualizar as trilhas e oficinas abaixo, porém saiba que para fazer a inscrição em alguma das atividades, é necessário o cadastro/login na página inicial.', 'warning')
    // Router.push('/')
    return
  } else {
    return {authType, authId, token, authName, amountStudents:amountStudents?amountStudents:"0"}
  }
}