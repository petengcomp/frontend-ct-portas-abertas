import { NextPage } from "next";
import Image from "next/image";

import ProGrad from "../components/ProGrad";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import styles from "../styles/pages/Home.module.css";
import HeaderBanner from "../assets/HEADER.png";

export const OpenDate = new Date("2022-11-01T00:00:00.000Z");

const Home: NextPage = () => {

  return (
    <main className={styles.container}>
      <NavBar localPage={"index"} />

      <div className={styles.banner_container}>
        <div className={styles.banner_inside_container}>
          <Image
            src={HeaderBanner}
            alt="Banner CT Portas Abertas"
            layout="responsive"
          />
        </div>
      </div>

      <div className={styles.textContainer}>
        <p>
        Em breve, a edição 2024 do CT de Portas Abertas! O evento faz parte da Mostra de Profissões da Prograd, que ocorrerá nos dias 12 e 13 de novembro de 2024. O CT de Portas Abertas tem como objetivo divulgar e promover os cursos de Engenharia e Tecnologia do Centro Tecnológico da UFES para alunos do ensino médio e técnico, sendo uma oportunidade única de obter informações valiosas sobre as diversas áreas de atuação dos cursos oferecidos pelo CT.
          <br />
          <br />
          Atividades previstas na programação do evento:
        </p>

        <ol>
          <li>
            Visitas guiadas aos laboratórios (pesquisa/extensão) dos
            cursos.
          </li>
          <li>Mostra de projetos.</li>
          <li>Palestra Pocket sobre Inteligência Artificial (13/11 às 10h).</li>
          <li>Apresentação da banda dos professores do CT.</li>
        </ol>

        <p>
          A banda EngRockers, composta por alguns professores do Centro Tecnológico, 
          vai levantar o astral com muito Rock in Roll no estacionamento do CT 4. 
        </p>
      </div>

      <ProGrad />

      <Footer />
    </main>
  );
};

export default Home;
