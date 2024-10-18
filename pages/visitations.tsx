import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styles from '../styles/pages/Events.module.css'
import Footer from "../components/Footer";

const Visitations: NextPage = () => {
    
    
    return (
        <main className={styles.container}>
            <NavBar localPage={"visitations"} />

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

            <Footer />
        </main>
    )
}

export default Visitations;
    