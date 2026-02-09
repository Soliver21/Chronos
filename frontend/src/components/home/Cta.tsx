import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <section className="cta">
    <h2>Készen áll a kereskedésre?</h2>
    <p>Csatlakozz felhasználók ezreihez, akik már most is cserélnek és építik a bizalmat a közösségben.</p>
     <Link to="/register">
      <button className="btn btn-primary btn-large">Hozd létre a profilod</button>
     </Link>
</section>

  )
}

export default Cta
