import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styles from '../styles/pages/Events.module.css'
import Footer from "../components/Footer";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import Router from "next/router";
import { Switch } from "../components/Switch";
import { FiEdit3 } from "react-icons/fi";
import { OpenDate } from ".";
import { CheckUser, User } from "../services/checkuser";

const Visitations: NextPage = () => {
    
    const [showSubscriptions, setShowSubscriptions] = useState<Boolean>(false);
    const [authName, setAuthName] = useState<string | null>("");
    const [amountStudents, setAmountStudents] = useState<string | null>("0");
    const [day, setDay] = useState<number>(22);

    async function handleUpdateStudentAmount(){
        //TODO: API ROUTE TO CHANGE STUDENT AMOUNT
    }

    function logout(){
        localStorage.setItem('CTPORTASABERTASTOKEN', '')
        localStorage.setItem('CTPORTASABERTASAUTHID', '')
        localStorage.setItem('CTPORTASABERTASAUTHNAME', '')
        localStorage.setItem('CTPORTASABERTASAUTHTYPE', '')
        localStorage.setItem('CTPORTASABERTASAMOUNTSTUDENTS', '')
        Router.push('/')
    }

    useEffect(()=>{
        if (typeof window !== 'undefined'){
            let user:User|undefined = CheckUser()
            if (user){
                setAuthName(user.authName)    
                setAmountStudents(user.amountStudents)
            } 
        }
        
    }, [])

    return (
        <main className={styles.container}>
            <NavBar localPage={"visitations"} />

            <h1>INSCRIÇÃO NAS VISITAS</h1>

            <div className={styles.info_container}>
                <p>Olá, use esta página para realizar sua inscrição nas <span>visitas guiadas</span> (trilhas) ou nas <span>oficinas</span> disponíveis. 
                O sistema de inscrição nesses eventos é necessário pois as <span>vagas são limitadas</span>, então não perca tempo e garanta sua presença!</p>    

                <p>As saídas para as trilhas ocorrem nos dois dias, sendo 1h30min a duração de cada uma, nos seguintes horários: {' '}
                    <span>08:00</span>  |   <span>09:30</span>  |   <span>14:00</span>  |   <span>15:30</span></p>
                
                    

                <h4>As visitas guiadas serão divididas em Trilhas Temáticas, da seguinte forma:</h4>
                <ul>
                    <li><span>Trilha 1:</span> Engenharia Ambiental - NQUALIAR, LAGESA, LABSAN, LABHIDRO</li>
                    <li><span>Trilha 2:</span> Engenharia Elétrica 01 - LABTEL, NERDS, NTA e lab de intrumentação dinâmica</li>
                    <li><span>Trilha 3:</span> Engenharia Elétrica 02 - LABVISIO, PET ELÉTRICA, LAI, LCI, LEPAC/LACI</li>
                    <li><span>Trilha 4:</span> Engenharia Civil - GEOTECNIA, LABDEST, LEMAC, L@BCIV, LABESBIM, LABHIDRO</li>
                    <li><span>Trilha 5:</span> Computação - PET ENGCOMP, ERUS, LCAD, LPRM, NINFA, LAR</li>
                    <li><span>Trilha 6:</span> Engenharia Mecânica - NEMOG, PET MECÂNICA, LABGUARÁ, VITÓRIA BAJA, DEM, LFTC, LaMEFT/DEM, LABTECMEC, SOLARES, EÓLICA</li>
                </ul>
                            
                    
            </div>

            <Switch option={showSubscriptions} setOption={setShowSubscriptions}/>

            <div className={styles.user_info}>
                <h2>Logado como <span>{authName}</span></h2>
                {amountStudents!='0'
                ?
                (
                    <div>
                        <p>Número de alunos: {amountStudents}</p>
                        <div onClick={handleUpdateStudentAmount}><FiEdit3 /></div>
                    </div>
                )
                :
                ""}
                <h4 onClick={logout}>DESLOGAR</h4>
            </div>

            <div className={styles.day_selector}>
                <h5>PROGRAMAÇÃO DO DIA </h5>
                <select onChange={(e)=>setDay(parseInt(e.target.value))}>
                    <option value={22}>22</option>
                    <option value={23}>23</option>
                </select>
                <h5>DE NOVEMBRO</h5>        
            </div>
            
            <Table showSubscriptions={showSubscriptions} day={day} type="visit"/>           

            {
                new Date()>=OpenDate?(""):(<h1 style={{color:'var(--dark)'}}>INSCRIÇÕES ABREM NO DIA {OpenDate.toLocaleDateString()}</h1>)
            }

            <Footer />
        </main>
    )
}

export default Visitations;
    