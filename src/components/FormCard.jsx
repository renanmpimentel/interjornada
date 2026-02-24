import { parseTimeToMinutes, minutesToHHMM } from "../utils/time";

function Chip({ label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="chip-btn">
      {label}
    </button>
  );
}

export default function FormCard({ form, setTime, setVirouDia, applyChip, error }) {
  const start = parseTimeToMinutes(form.inicioExtra);
  const end = parseTimeToMinutes(form.fimExtra);
  const overnightPreview = start !== null && end !== null && end < start;

  return (
    <form className="rise panel panel-form">
      <div className="grid-gap">
        <article className="block block-cyan">
          <p className="block-title title-cyan">1) Jornada normal</p>
          <div className="split-2">
            <label className="field-label">
              Inicio
              <input type="time" value={form.inicioNormal} onChange={(event) => setTime("inicioNormal", event.target.value)} className="input input-cyan" />
            </label>
            <label className="field-label">
              Fim
              <input type="time" value={form.fimNormal} onChange={(event) => setTime("fimNormal", event.target.value)} className="input input-cyan" />
            </label>
          </div>
        </article>

        <article className="block block-amber">
          <p className="block-title title-amber">2) Hora extra</p>
          <div className="split-2">
            <label className="field-label">
              Inicio da extra
              <input type="time" value={form.inicioExtra} onChange={(event) => setTime("inicioExtra", event.target.value)} className="input input-amber" />
            </label>
            <label className="field-label">
              Fim da extra
              <input type="time" value={form.fimExtra} onChange={(event) => setTime("fimExtra", event.target.value)} className="input input-amber" />
            </label>
          </div>

          <div className="chips-row">
            <span className="chips-label">Atalhos</span>
            <Chip label="Inicio 19:00" onClick={() => applyChip("start", "19:00")} />
            <Chip label="Inicio 20:00" onClick={() => applyChip("start", "20:00")} />
            <Chip label="+1h" onClick={() => applyChip("add", 60)} />
            <Chip label="+2h" onClick={() => applyChip("add", 120)} />
            <Chip label="+3h" onClick={() => applyChip("add", 180)} />
          </div>

          <label className="check-row">
            <input type="checkbox" checked={form.virouDia} onChange={(event) => setVirouDia(event.target.checked)} className="check-input" />
            Fim da extra no dia seguinte (apos meia-noite)
          </label>
          <p className="helper-text">
            {overnightPreview && !form.virouDia
              ? `Preview: com os horarios atuais, fim sera interpretado como ${minutesToHHMM(end + 1440)}.`
              : form.helper}
          </p>
        </article>
      </div>

      <p className="error-box" aria-live="polite">{error}</p>
    </form>
  );
}
