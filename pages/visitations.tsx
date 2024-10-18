import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styles from '../styles/pages/Events.module.css'
import Footer from "../components/Footer";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import Router from "next/router";
import { Switch } from "../components/Switch";
import { FiEdit3, FiSettings } from "react-icons/fi";
import { OpenDate } from ".";
import { CheckUser, User } from "../services/checkuser";
import { api } from "../services/api";
import Swal from "sweetalert2";

export async function handleUpdateStudentAmount(){

    let user:User|undefined = CheckUser()
    if (!user) return 

    let amount;

    await Swal.fire({
        title: 'Insira o número de alunos',
        input: 'number',
        text:'Tenha em mente que essa alteração irá modificar suas vagas ocupadas em todas as atividades inscritas',
        showCancelButton: true,
        confirmButtonText: 'Alterar',
        preConfirm: (a) => {
            amount = a
        },
    })

    if (!amount) return

    try {
        await api.patch(`${user.authType}/update-students-amount/${user.authId}`, {
            "studentsAmount": amount
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    } catch {
        //if token is invalid, it to refreshes it

        let response:any = await api.put('token/refresh', {
            "oldToken":localStorage.getItem('CTPORTASABERTASTOKEN')
        })

        localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);
        user.token = response.data.access_token

        //with new token we try the request again
        try{
            response = await api.patch(`${user.authType}/update-students-amount/${user.authId}`, {
                "studentsAmount": amount
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
        } catch(error:any) {
            Swal.fire('Ops', error.response.data.message, 'warning')
            return
        }
    }

    localStorage.setItem('CTPORTASABERTASAMOUNTSTUDENTS', String(amount))

    await Swal.fire(
        'Atualizado',
        'Nova quantidade de alunos: ' + amount,
        'success'
    )

    Router.reload()

}


const Visitations: NextPage = () => {
    
    // const [showSubscriptions, setShowSubscriptions] = useState<Boolean>(false);
    // const [authName, setAuthName] = useState<string | null>("");
    // const [amountStudents, setAmountStudents] = useState<string | null>("0");
    // const [day, setDay] = useState<number>(22);
    // const [userInfoCollapsed, setUserInfoCollapsed] = useState<boolean>(true);
    
    // function logout(){
    //     localStorage.setItem('CTPORTASABERTASTOKEN', '')
    //     localStorage.setItem('CTPORTASABERTASAUTHID', '')
    //     localStorage.setItem('CTPORTASABERTASAUTHNAME', '')
    //     localStorage.setItem('CTPORTASABERTASAUTHTYPE', '')
    //     localStorage.setItem('CTPORTASABERTASAMOUNTSTUDENTS', '')
    //     Router.push('/')
    // }

    // useEffect(()=>{
    //     if (typeof window !== 'undefined'){
    //         let user:User|undefined = CheckUser()
    //         if (user){
    //             setAuthName(user.authName)    
    //             setAmountStudents(user.amountStudents)
    //         }
    //     }
        
    // }, [])

    return (
        <main className={styles.container}>
            <NavBar localPage={"visitations"} />

            {/* <div className={styles.user_info} style={authName?{}:{display:"none"}}>
                <div 
                    className={styles.gearIcon}
                    onClick={()=>setUserInfoCollapsed(!userInfoCollapsed)}><FiSettings /></div>
                <ul style={userInfoCollapsed?{marginLeft:'-90vw'}:{}}>
                    <li><Switch option={showSubscriptions} setOption={setShowSubscriptions}/></li>
                    <li>Logado como <span>{authName}</span></li>
                    {amountStudents!='0'?(<li><p>Número de alunos: {amountStudents}</p><div onClick={handleUpdateStudentAmount}><FiEdit3 /></div></li>):""}
                    <li><div onClick={logout} className={styles.logoutContainer}>DESLOGAR</div></li>
                </ul>
            </div> */}

            <h1>VISITAS GUIADAS</h1>

            <div className={styles.info_container}>
                <p>
                    As visitas guiadas serão realizadas de forma dinâmica. A formação dos grupos que sairão para as trilhas será feita na hora e por demanda.
                    Cada trilha terá uma duração de 20 minutos.
                </p>                    

                <h4>As visitas guiadas serão divididas em Trilhas Temáticas, da seguinte forma:</h4>
                <ul>
                <li><span>Trilha 1:</span> Engenharia Ambiental {/*- NQUALIAR, LAGESA, LABSAN, LABHIDRO*/}</li>
                    <li><span>Trilha 2:</span> Engenharia Elétrica 01 {/*- LABTEL, NERDS, NTA e Laboratório de Intrumentação Dinâmica*/}</li>
                    <li><span>Trilha 3:</span> Engenharia Elétrica 02 {/*- LABVISIO, PET ELÉTRICA, LAI, LCI, LEPAC/LACI*/}</li>
                    <li><span>Trilha 4:</span> Engenharia Civil {/*- GEOTECNIA, LABDEST, LEMAC, L@BCIV, LABESBIM*/}</li>
                    <li><span>Trilha 5:</span> Computação {/*- PET ENGCOMP, ERUS, LCAD, LPRM, NINFA, LAR*/}</li>
                    <li><span>Trilha 6:</span> Engenharia Mecânica {/*- NEMOG, PET MECÂNICA, LaMEFT/DEM, Laboratório de automação e controle*/}</li>
                </ul>
                            
                    
            </div>
            

            {/* <div className={styles.day_selector}>
                <h5>PROGRAMAÇÃO DO DIA </h5>
                <select onChange={(e)=>setDay(parseInt(e.target.value))}>
                    <option value={22}>22</option>
                    <option value={23}>23</option>
                </select>
                <h5>DE NOVEMBRO</h5>        
            </div>
            
            <Table showSubscriptions={showSubscriptions} day={day} type="visit"/>            */}

            <Footer />
        </main>
    )
}

export default Visitations;
    