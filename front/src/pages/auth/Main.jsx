// import "./App.css";

import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="bg-[#f16726] min-h-screen pt-5">
      <header className="w-[70%] flex justify-between items-center p-4 mb-20 mx-auto border-b-1 border-black">
        <img
          className="h-[60px] w-[60px] rounded-full"
          src="/logo.png"
          alt=""
        />
        <Link to="/login">
          <button className="py-2 px-4 bg-white border rounded-full hover:bg-orange-500 text-orange-500 font-semibold text-xl hover:text-white">
            Iniciar Sesión
          </button>
        </Link>
      </header>

      <section className=" mt-10 px-6  w-[71%] m-auto">
        <h1 className=" text-4xl font-bold text-black">Quienes Somos</h1>
        <p className="text-black mt-8 mb-4 text-xl">
          ¿Estás cansado de hacer largas filas en el economato solo para
          conseguir un ficho? ¡Nosotros tenemos la solución que estabas
          esperando! Con SAS, todo lo que necesitas hacer es registrarte y
          podrás apartar tu almuerzo de manera rápida y sencilla, desde donde
          estés.
          <br />
          <br />
          Olvídate del estrés de quedarte sin ficho o de perder tiempo en
          trámites innecesarios. Queremos que disfrutes de un servicio eficiente
          y personalizado, pensado especialmente para ti. ¡Regístrate hoy mismo
          y comienza a disfrutar de los beneficios que te ofrecemos! Porque tu
          comodidad es nuestra prioridad.
        </p>
        <Link to="/register">
          <button className="mt-6 bg-white text-orange-500 font-bold py-2 px-4 rounded-full hover:bg-orange-500 border hover:text-white">
            REGISTRARSE
          </button>
        </Link>
      </section>

      <section className="bg-white mt-10">
        <div className="flex justify-center space-x-16 py-6">
          <a href="#edu" className="text-xl font-bold hover:text-orange-500">
            Educacion
          </a>
          <a href="#ali" className="text-xl font-bold  hover:text-orange-500">
            Alimentacion
          </a>
          <a href="#hora" className="text-xl font-bold  hover:text-orange-500">
            Horarios
          </a>
        </div>
      </section>

      <section className=" text-black flex mx-auto w-[71%] items-center h-[500px]">
        <div className=" text-left max-w-[550px] h-[350px] flex ">
          <img
            className="h-[350px] w-[550px] my-auto mr-[65px]"
            src="/comedor_estudiantil.jpg"
            alt=""
          />
          <div className="mt-[-22px]">
            <h2 className="text-[70px] font-bold mt-0 pt-0 ">INFORMACION</h2>
            <p className="text-[18px]">
              Las Escuelas Profesionales Salesianas es una comunidad educativo
              pastoral, dirigida por la Congregación Salesiana, que ofrece un
              servicio educativo integral a la juventud de Cartagena,
              especialmente a jóvenes en situación de alto riesgo, a través de
              la educación básica secundaria, media técnica; y educación para el
              trabajo y desarrollo humano, formando buenos cristianos y honrados
              ciudadanos. En el cual los estudiantes adquieren un almuerzo para
              la jornada educativa por la tarde y otro tipo de actividades
              pastorales de la comunidad educativa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-6  w-[100%] ">
        <div className="w-[70%] mx-auto">
          <h1 className=" text-5xl font-bold text-black" id="ali">
            Alimientos
          </h1>
          <img
            className="mr-3 h-[330px] w-[550px] my-auto  mt-10 float-right shadow-md shadow-orange-400 "
            src="/comedor_estudiantil.jpg"
            alt="Comedor estudiantil"
          />

          <p className="text-black mt-8 mb-4 text-xl">
            La alimentación juega un rol clave en la vida de cualquier
            estudiante. Estudios han demostrado que una dieta balanceada no solo
            influye en la salud física, sino también en la capacidad de
            concentración, la memoria y el rendimiento académico. A través de
            nuestro programa de tickets de almuerzo, buscamos que todos los
            estudiantes puedan acceder a comidas nutritivas sin preocuparse por
            el costo o el tiempo que conlleva buscar alternativas. Esto te
            permitirá centrarte en lo que realmente importa: tu desarrollo
            personal y académico.
            <br />
            <br />
            Con nuestros tickets, tendrás acceso a una variedad de alimentos que
            han sido seleccionados por su valor nutricional, asegurando que
            obtengas la energía y los nutrientes necesarios para afrontar tus
            días de estudio. Ya no tendrás que preocuparte por ir al economato o
            gastar tiempo y dinero en alternativas rápidas que muchas veces no
            son saludables. Nuestro objetivo es garantizar que la alimentación
            no sea una barrera para tu éxito académico. Regístrate, reserva tu
            almuerzo con antelación y disfruta de la tranquilidad de saber que
            tendrás una comida lista para ti.
            <br />
            <br />
            En resumen, este sistema de tickets no solo es una forma de asegurar
            que recibas un almuerzo de calidad, sino también un paso hacia una
            vida estudiantil más organizada, saludable y libre de preocupaciones
            logísticas. Con tu mente y cuerpo bien alimentados, estarás mejor
            preparado para enfrentar los desafíos de tu día a día.
          </p>
        </div>
      </section>
      <section className=" mt-10 px-6  w-[71%] m-auto py-10 ">
        <h1 className=" text-5xl font-bold text-black items-end " id="edu">
          Educacion
        </h1>
        <img
          className="h-[330px] w-[550px] my-auto  mt-10 float-left shadow-md shadow-slate-700 mr-5"
          src="/comedor_estudiantil.jpg"
          alt="Comedor estudiantil"
        />
        <p className="text-black mt-8 mb-4 text-xl ">
          La educación es un pilar fundamental en el desarrollo de cualquier
          sociedad y, para los estudiantes, el acceso a recursos básicos como la
          alimentación tiene un impacto directo en su rendimiento académico.
          Numerosas investigaciones han demostrado que una buena nutrición es
          esencial para el funcionamiento óptimo del cerebro, contribuyendo a
          una mayor capacidad de atención, mejor memoria y un aprendizaje más
          eficiente.
          <br />
          <br />
          En este contexto, los tickets de almuerzo no son simplemente una
          herramienta para obtener una comida, sino un recurso que promueve la
          equidad entre los estudiantes. No importa cuál sea tu situación
          económica o tus compromisos diarios, estos tickets te aseguran que
          tendrás acceso a una alimentación saludable y balanceada. Esto se
          traduce en un impacto positivo en tu rendimiento académico, ya que una
          alimentación adecuada garantiza que tu cuerpo y mente estén en su
          mejor estado para enfrentar los desafíos educativos.
          <br />
          <br />
          Más allá de lo académico, este programa de tickets fomenta hábitos
          saludables que te acompañarán a lo largo de tu vida. Te enseñará la
          importancia de priorizar una alimentación equilibrada, lo que a largo
          plazo influirá en tu bienestar general. Al no tener que preocuparte
          por buscar opciones rápidas o poco saludables, podrás concentrarte en
          tus estudios con la tranquilidad de que tus necesidades alimenticias
          están cubiertas.
          <br />
          <br />
          En última instancia, los tickets de almuerzo representan una
          oportunidad para que cada estudiante se enfoque plenamente en su
          educación sin que la falta de tiempo o recursos económicos afecte su
          rendimiento. Un estudiante bien alimentado es un estudiante mejor
          preparado para aprovechar las oportunidades académicas y para
          desarrollarse como un profesional exitoso en el futuro.
        </p>
      </section>

      <section className="bg-gray-100 text-black text-center p-10" id="hora">
        <h2 className="text-3xl font-bold">HORARIO</h2>
        <div className="flex justify-around mt-8 items-center">
          <div>
            <h3 className="text-lg font-bold">Dirección</h3>
            <p>ASPERNATUR CUPIDITATE NOBIS CUMQUE</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Horario</h3>
            <p>LUNES A VIERNES: 1 PM - 2 PM</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Teléfono</h3>
            <p>3242312323</p>
            <p>3106466459</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Redes sociales</h3>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-pink-500 text-2xl">
                <i className="fab fa-instagram">
                  <img
                    className=" w-8 h-8"
                    src="/public/instagram.png"
                    alt="facebook"
                  ></img>
                </i>
              </a>
              <a href="#" className="text-blue-500 text-2xl">
                <i className="fab fa-facebook">
                  {" "}
                  <img
                    className=" w-8 h-8"
                    src="/public/facebook.png"
                    alt="facebook"
                  ></img>
                </i>
              </a>
              <a href="#" className="text-black text-2xl">
                <i className="fab fa-tiktok">
                  <img
                    className=" w-8 h-8"
                    src="/public/tik-tok.png"
                    alt="facebook"
                  ></img>
                </i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
