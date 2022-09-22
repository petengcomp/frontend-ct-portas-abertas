import { NextPage } from "next";
import NavBar from "../components/NavBar";
import Image from 'next/image';
import styles from '../styles/pages/Events.module.css'
import HeaderBanner from '../assets/HEADER.png'
import Footer from "../components/Footer";
import Title from "../components/Title";
import Table from "../components/Table";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
import { Switch } from "../components/Switch";

const Events: NextPage = () => {
    
    const [selectedEvents, setSelectedEvents] = useState<Array<number>>([]);
    const [showSubscriptions, setShowSubscriptions] = useState<Boolean>(false);
    const [authName, setAuthName] = useState<string | null>("");
    const [amountStudents, setAmountStudents] = useState<string | null>("0");

    function handleConfirmation(){
        if (selectedEvents.length<=0) {
            alert('Escolha eventos para se inscrever!')
            return
        }
        if (confirm(`Confirmar inscrição nos eventos: ${selectedEvents.map((e)=>e)}`)) handleInscription()
    }

    function logout(){
        localStorage.setItem('CTPORTASABERTASTOKEN', '')
        localStorage.setItem('CTPORTASABERTASAUTHID', '')
        localStorage.setItem('CTPORTASABERTASAUTHNAME', '')
        localStorage.setItem('CTPORTASABERTASAUTHTYPE', '')
        localStorage.setItem('CTPORTASABERTASAMOUNTSTUDENTS', '')
        Router.push('/')
    }

    async function handleInscription(){
        const authType = localStorage.getItem('CTPORTASABERTASAUTHTYPE')
        selectedEvents?.map(async(e)=>{
            try {
                const response = await api.patch(`${authType}/add-event/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
                    "event": { "id": e } 
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
                })

                alert('Inscrição(ões) realizada(s)!')
                Router.reload()
            } catch {
                let response:any = await api.put('token/refresh', {
                    "oldToken":localStorage.getItem('CTPORTASABERTASTOKEN')
                })

                localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);

                try{
                    response = await api.patch(`${authType}/add-event/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
                        "event": { "id": e } 
                    }, {
                        headers: { Authorization: `Bearer ${response.data.access_token}` }
                    }).then(()=>{
                        alert('Inscrição(ões) realizada(s)!')
                        Router.reload()
                    }).catch(function (error) {
                        alert(error.response.data.message)
                    })
                } catch {
                    alert('Erro ao salvar inscrições')
                }
            }
        })    
    }

    useEffect(()=>{
        if (typeof window !== 'undefined'){
            if (localStorage.getItem('CTPORTASABERTASAUTHNAME')=='') {
                alert('Nenhum login encontrado!')
                Router.push('/')
            }
            setAuthName(localStorage.getItem('CTPORTASABERTASAUTHNAME')?localStorage.getItem('CTPORTASABERTASAUTHNAME'):null)
            setAmountStudents(localStorage.getItem('CTPORTASABERTASAMOUNTSTUDENTS')?localStorage.getItem('CTPORTASABERTASAMOUNTSTUDENTS'):null)
        }
        localStorage.setItem('CTPORTASABERTASPAGE', 'events')
    }, [])


    return (
        <main className={styles.container}>
            <NavBar />

            <Image src={HeaderBanner} alt="Banner CT Portas Abertas" />

            <Title />

            <h1>INSCRIÇÃO NOS EVENTOS</h1>

            <Switch option={showSubscriptions} setOption={setShowSubscriptions}/>

            <div className={styles.user_info}>
                <h2>Logado como <span>{authName}</span></h2>
                {amountStudents!='0'
                ?
                (<p>Número de alunos: {amountStudents}</p>)
                :
                ""}
                <h4 onClick={logout}>DESLOGAR</h4>
            </div>

            <Table 
                selectedEvents={selectedEvents}
                setSelectedEvents={setSelectedEvents}
                showSubscriptions={showSubscriptions}/>

            <div onClick={handleConfirmation} style={showSubscriptions?{display:'none'}:{}}><Button text="Salvar Inscrições"/></div>

            <Footer />
        </main>
    )
}

export default Events;
    