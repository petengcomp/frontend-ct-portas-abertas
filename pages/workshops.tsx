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
import { handleUpdateStudentAmount } from "./visitations";

const Workshops: NextPage = () => {
    
    const [selectedEvents, setSelectedEvents] = useState<Array<number>>([]);
    const [showSubscriptions, setShowSubscriptions] = useState<Boolean>(false);
    const [authName, setAuthName] = useState<string | null>("");
    const [amountStudents, setAmountStudents] = useState<string | null>("0");
    const [day, setDay] = useState<number>(22);
    const [userInfoCollapsed, setUserInfoCollapsed] = useState<boolean>(true); 

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

            <div className={styles.user_info} style={authName?{}:{display:"none"}}>
                <div 
                    className={styles.gearIcon}
                    onClick={()=>setUserInfoCollapsed(!userInfoCollapsed)}><FiSettings /></div>
                <ul style={userInfoCollapsed?{marginLeft:'-90vw'}:{}}>
                    <li><Switch option={showSubscriptions} setOption={setShowSubscriptions}/></li>
                    <li>Logado como <span>{authName}</span></li>
                    {amountStudents!='0'?(<li><p>N??mero de alunos: {amountStudents}</p><div onClick={handleUpdateStudentAmount}><FiEdit3 /></div></li>):""}
                    <li><div onClick={logout} className={styles.logoutContainer}>DESLOGAR</div></li>
                </ul>
            </div>

            <h1>INSCRI????O NAS OFICINAS</h1>

            <div className={styles.info_container}>
                <p>Ol??, use esta p??gina para realizar sua inscri????o nas <span>visitas guiadas</span> (trilhas) ou nas <span>oficinas</span> dispon??veis. 
                O sistema de inscri????o nesses eventos ?? necess??rio pois as <span>vagas s??o limitadas</span>, ent??o n??o perca tempo e garanta sua presen??a!</p>
            </div>

            <div className={styles.day_selector}>
                <h5>PROGRAMA????O DO DIA </h5>
                <select onChange={(e)=>setDay(parseInt(e.target.value))}>
                    <option value={22}>22</option>
                    <option value={23}>23</option>
                </select>
                <h5>DE NOVEMBRO</h5>        
            </div>
            
            <Table showSubscriptions={showSubscriptions} day={day} type="workshop"/>           

            <Footer />
        </main>
    )
}

export default Workshops;
    