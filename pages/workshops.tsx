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

const Workshops: NextPage = () => {
    
    const [selectedEvents, setSelectedEvents] = useState<Array<number>>([]);
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
            <NavBar localPage={"workshops"} />

            <h1>INSCRIÇÃO NAS OFICINAS</h1>

            <div className={styles.info_container}>
                <p>Olá, use esta página para realizar sua inscrição nas <span>visitas guiadas</span> (trilhas) ou nas <span>oficinas</span> disponíveis. 
                O sistema de inscrição nesses eventos é necessário pois as <span>vagas são limitadas</span>, então não perca tempo e garanta sua presença!</p>
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
            

            <Table showSubscriptions={showSubscriptions} day={day} type="workshop"/>           

            {
                new Date()>=OpenDate?(""):(<h1 style={{color:'var(--dark)'}}>INSCRIÇÕES ABREM NO DIA {OpenDate.toLocaleDateString()}</h1>)
            }

            <Footer />
        </main>
    )
}

export default Workshops;
    