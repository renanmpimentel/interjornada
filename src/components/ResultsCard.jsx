function Row({ label, value, valueClass = "metric-value" }) {
  return (
    <li className="metric-row">
      <span className="metric-label">{label}</span>
      <strong className={valueClass}>{value}</strong>
    </li>
  );
}

export default function ResultsCard({ result, styles }) {
  return (
    <section className="floaty rise panel panel-results">
      <p className={styles.overall}>{result.overall}</p>

      <div className={styles.inicioCard}>
        <p className={styles.inicioLabel}>Inicio minimo da proxima jornada</p>
        <p className={styles.inicioValue}>{result.inicioMinimo}</p>
      </div>

      <ul className="metrics-list">
        <Row label="Posso iniciar no horario normal?" value={result.podePadrao} valueClass={styles.podePadrao} />
        <Row label="Inicio da jornada normal" value={result.inicioNormalResumo} />
        <Row label="Duracao da hora extra" value={result.duracaoExtra} />
        <Row label="Ajuste necessario" value={result.ajuste} />
        <Row label="Sinalizacao" value={result.sinal} valueClass={styles.sinal} />
      </ul>
    </section>
  );
}
