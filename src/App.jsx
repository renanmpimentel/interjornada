import { useMemo, useState } from "react";
import FormCard from "./components/FormCard";
import ResultsCard from "./components/ResultsCard";
import AdBanner from "./components/AdBanner";
import {
  MIN_INTERJORNADA_HORAS,
  MAX_HORA_EXTRA_HORAS,
  parseTimeToMinutes,
  minutesToDuration,
  minutesToHHMM
} from "./utils/time";

function invalidResult(error) {
  return {
    isValid: false,
    ok: false,
    error,
    overall: "Preencha os horarios para calcular.",
    inicioMinimo: "--:--",
    podePadrao: "-",
    inicioNormalResumo: "--:--",
    duracaoExtra: "-",
    ajuste: "-",
    sinal: "-"
  };
}

function evaluate(form) {
  const inicioNormal = parseTimeToMinutes(form.inicioNormal);
  const fimNormal = parseTimeToMinutes(form.fimNormal);
  const inicioExtra = parseTimeToMinutes(form.inicioExtra);
  let fimExtra = parseTimeToMinutes(form.fimExtra);

  if (inicioNormal === null || fimNormal === null || inicioExtra === null || fimExtra === null) {
    return invalidResult("Use horarios validos no formato HH:MM.");
  }

  if (fimNormal <= inicioNormal) {
    return invalidResult("Na jornada normal, o fim precisa ser depois do inicio.");
  }

  if (fimExtra === inicioExtra) {
    return invalidResult("Hora extra invalida: inicio e fim iguais.");
  }

  if (form.virouDia && fimExtra < inicioExtra) {
    fimExtra += 1440;
  }

  const duracaoExtraMin = fimExtra - inicioExtra;
  if (duracaoExtraMin <= 0) {
    return invalidResult("Hora extra invalida: revise inicio e fim.");
  }

  if (duracaoExtraMin > MAX_HORA_EXTRA_HORAS * 60) {
    return invalidResult("Hora extra acima de 12h. Revise os horarios informados.");
  }

  const inicioMinimoPelaCltAbs = fimExtra + MIN_INTERJORNADA_HORAS * 60;
  const inicioPadraoProximoDiaAbs = 1440 + inicioNormal;
  const inicioMinimoFinalAbs = Math.max(inicioMinimoPelaCltAbs, inicioPadraoProximoDiaAbs);
  const atrasoMin = inicioMinimoFinalAbs - inicioPadraoProximoDiaAbs;
  const inicioMinimoCalculado = minutesToHHMM(inicioMinimoFinalAbs);

  if (atrasoMin > 0) {
    return {
      isValid: true,
      ok: false,
      error: "",
      overall: `Amanha, inicie a jornada a partir de ${inicioMinimoCalculado}.`,
      inicioMinimo: inicioMinimoCalculado,
      podePadrao: "Nao",
      inicioNormalResumo: minutesToHHMM(inicioNormal),
      duracaoExtra: minutesToDuration(duracaoExtraMin),
      ajuste: `Atrasar ${minutesToDuration(atrasoMin)}`,
      sinal: "Inicio diferente"
    };
  }

  return {
    isValid: true,
    ok: true,
    error: "",
    overall: `Pode manter o inicio normal: ${minutesToHHMM(inicioNormal)}.`,
    inicioMinimo: inicioMinimoCalculado,
    podePadrao: "Sim",
    inicioNormalResumo: minutesToHHMM(inicioNormal),
    duracaoExtra: minutesToDuration(duracaoExtraMin),
    ajuste: "Nenhum ajuste",
    sinal: "Sem diferenca"
  };
}

function getStyles(result) {
  return {
    overall: result.isValid
      ? result.ok
        ? "overall-ok"
        : "overall-warn"
      : "overall-error",
    inicioCard: result.isValid
      ? result.ok
        ? "inicio-card-ok"
        : "inicio-card-warn"
      : "inicio-card-neutral",
    inicioLabel: result.isValid
      ? result.ok
        ? "inicio-label-ok"
        : "inicio-label-warn"
      : "inicio-label-neutral",
    inicioValue: result.isValid
      ? result.ok
        ? "inicio-value-ok"
        : "inicio-value-warn"
      : "inicio-value-neutral",
    podePadrao: result.isValid
      ? result.ok
        ? "pill-ok"
        : "pill-no"
      : "pill-neutral",
    sinal: result.isValid
      ? result.ok
        ? "pill-ok"
        : "pill-warn"
      : "pill-neutral"
  };
}

export default function App() {
  const [form, setForm] = useState({
    inicioNormal: "09:00",
    fimNormal: "18:00",
    inicioExtra: "20:00",
    fimExtra: "22:00",
    virouDia: false,
    helper: "Se o fim for menor que o inicio, marcamos automaticamente."
  });

  function adjustCrossDay(next) {
    const inicioExtra = parseTimeToMinutes(next.inicioExtra);
    const fimExtra = parseTimeToMinutes(next.fimExtra);

    if (inicioExtra === null || fimExtra === null) {
      return next;
    }

    if (fimExtra < inicioExtra) {
      return {
        ...next,
        virouDia: true,
        helper: "Fim da extra detectado no dia seguinte automaticamente."
      };
    }

    if (fimExtra > inicioExtra) {
      return {
        ...next,
        virouDia: false,
        helper: "Se o fim for menor que o inicio, marcamos automaticamente o dia seguinte."
      };
    }

    return next;
  }

  function setTime(field, value) {
    setForm((current) => adjustCrossDay({ ...current, [field]: value }));
  }

  function setVirouDia(checked) {
    setForm((current) => ({
      ...current,
      virouDia: checked,
      helper: checked
        ? "Fim da extra marcado manualmente para o dia seguinte."
        : "Se o fim for menor que o inicio, marcamos automaticamente o dia seguinte."
    }));
  }

  function applyChip(type, value) {
    if (type === "start") {
      setTime("inicioExtra", value);
      return;
    }

    setForm((current) => {
      const start = parseTimeToMinutes(current.inicioExtra);
      if (start === null) {
        return current;
      }
      const end = start + value;
      return {
        ...current,
        fimExtra: minutesToHHMM(end),
        virouDia: end >= 1440,
        helper: end >= 1440
          ? "Fim da extra detectado no dia seguinte automaticamente."
          : "Se o fim for menor que o inicio, marcamos automaticamente o dia seguinte."
      };
    });
  }

  const result = useMemo(() => evaluate(form), [form]);
  const styles = useMemo(() => getStyles(result), [result]);

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-orb hero-orb-amber"></div>
        <div className="hero-orb hero-orb-cyan"></div>
        <p className="hero-tag">CLT art. 66 - descanso minimo de 11h</p>
        <h1 className="hero-title">Interjornada sem dor de cabeca</h1>
        <p className="hero-description">
          Preencha os horarios e veja na hora quando pode comecar no dia seguinte.
        </p>
      </header>

      <section className="grid-layout">
        <FormCard
          form={form}
          setTime={setTime}
          setVirouDia={setVirouDia}
          applyChip={applyChip}
          error={result.error}
        />
        <ResultsCard result={result} styles={styles} />
      </section>

      <AdBanner />

      <footer className="footer-note">
        Resultado baseado na interjornada minima de 11h da CLT.
        {" "}
        <a
          href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm#art66"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Ver art. 66 da CLT
        </a>
        {" "}
        |{" "}
        <a href={`${import.meta.env.BASE_URL}politica-de-privacidade.html`} className="footer-link">
          Politica de privacidade
        </a>
      </footer>
    </main>
  );
}
