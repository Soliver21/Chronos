const TrustLevelCards = () => {
  const trustLevels = [
    {
      emoji: '🌱',
      title: 'Kezdő',
      description:
        'Itt indul mindenki. Teljesíts sikeres tranzakciókat, ismerd meg a közösséget, és építsd fel az első értékeléseidet.',
      type: 'newcomer'
    },
    {
      emoji: '✨',
      title: 'Megbízható',
      description:
        'Bizonyítottan korrekt felhasználó. A közösség már számol veled, és szívesen üzletel veled.',
      type: 'trusted'
    },
    {
      emoji: '🏆',
      title: 'Veterán',
      description:
        'Kiemelt státusz a legaktívabb és legmegbízhatóbb tagok számára. Példát mutatsz a közösségnek.',
      type: 'veteran'
    }
  ];

  return (
    <div className="trust-grid">
      {trustLevels.map((level, index) => (
        <div className="trust-card" key={index}>
          <div className={`trust-badge trust-${level.type}`}>
            {level.emoji}
          </div>
          <h3>{level.title}</h3>
          <p>{level.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustLevelCards;
