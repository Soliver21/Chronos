const FunctionCards = () => {
  const cards = [
  {
    icon: '📦',
    title: 'Intelligens hirdetések',
    description:
      'Hozz létre kínálatokat vagy kereséseket részletes leírással és kategóriákkal. Az automatikus párosítás segít gyorsan egymásra találni.'
  },
  {
    icon: '⚡',
    title: 'Azonnali tranzakciók',
    description:
      'Bonyolítsd le a cseréket gyorsan és egyszerűen. Kövesd nyomon az állapotot a kezdeményezéstől a lezárásig, valós időben.'
  },
  {
    icon: '🔒',
    title: 'Biztonságos hitelesítés',
    description:
      'Modern, tokenalapú hitelesítés gondoskodik róla, hogy a fiókod és a tranzakcióid mindig védettek legyenek.'
  },
  {
    icon: '⭐',
    title: 'Értékelési rendszer',
    description:
      'Építsd a megbízhatóságodat valós visszajelzések alapján. Minden sikeres csere után értékelhetitek egymást.'
  },
  {
    icon: '📊',
    title: 'Megbízhatósági elemzés',
    description:
      'A rendszer automatikusan számolja a megbízhatósági szintedet az aktivitásod, értékeléseid és korábbi tranzakcióid alapján.'
  },
  {
    icon: '🎯',
    title: 'Okos szűrés',
    description:
      'Találd meg gyorsan, amit keresel fejlett szűrők segítségével – kategória, hirdetéstípus vagy felhasználói szint szerint.'
  }
];


  return (
    <div className="features-grid">
      {cards.map((card, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FunctionCards;
