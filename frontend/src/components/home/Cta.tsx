import { Link } from "react-router-dom";

const Cta = () => (
  <section id="about" className="px-4 sm:px-8 py-16 my-16 max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">Készen áll a kereskedésre?</h2>
    <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto">
      Csatlakozz felhasználók ezreihez, akik már most is cserélnek és építik a bizalmat a közösségben.
    </p>
    <Link
      to="/register"
      className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:-translate-y-1 transition-all"
    >
      Hozd létre a profilod
    </Link>
  </section>
);

export default Cta;