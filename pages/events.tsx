import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styles from '../styles/pages/Events.module.css'
import Footer from "../components/Footer";
import Table from "../components/Table";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
import { Switch } from "../components/Switch";
import Swal from 'sweetalert2'

const Events: NextPage = () => {
    
    const [selectedEvents, setSelectedEvents] = useState<Array<number>>([]);
    const [showSubscriptions, setShowSubscriptions] = useState<Boolean>(false);
    const [authName, setAuthName] = useState<string | null>("");
    const [amountStudents, setAmountStudents] = useState<string | null>("0");

    async function handleConfirmation(){
        if (selectedEvents.length<=0) {
            Swal.fire('Pera lá','Escolha eventos para se inscrever!','warning')
            return
        }

        let events:Array<string>=[]
        await Promise.all(selectedEvents.map(async(e)=>{
            await api.get(`events/${e}`).then((response)=>{
              if (response) events = [...events, response.data.title]
            }).catch((e)=>{
                Swal.fire('Houve um problema', e.response.data.message, 'error')
                Router.push('/')
            })
        }))

        const result = await Swal.fire({
            text:`Confirmar inscrição nos eventos: ${events.map((e)=>e)}`,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
        })
        
        if (result.isConfirmed) handleInscription()
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
        let idx=0
        for (idx=0;idx<selectedEvents.length;idx++) {
            const e = selectedEvents[idx]
            try {

                const response = await api.patch(`${authType}/add-event/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
                    "event": { "id": e } 
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
                })
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
                    })
                } catch(error:any) {
                    Swal.fire('Houve um erro na inscrição', error.response.data.message, 'error')
                    return
                }
            }
        }

        Router.reload()
    }

    useEffect(()=>{
        if (typeof window !== 'undefined'){
            if (localStorage.getItem('CTPORTASABERTASAUTHNAME')=='') {
                Swal.fire('Erro de login','Nenhum login encontrado!','error')
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
    