import { useState, useEffect } from "react";

const INVESTORS = [
  {
    id: "inv-001",
    name: "Roberto Ruiz Vargas",
    type: "Individuo / Co-fundador",
    role: "Co-fundador y COO de Three Rules Capital. Portavoz principal del proyecto Esencia en Puerto Rico. Descendiente de madre puertorriqueña y padre dominicano. Reside en Puerto Rico desde 2022.",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"],
    executives: [],
    donations: [
      { date: "2024-10-03", amount: 3100, recipient: "pol-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-10-01", amount: 3100, recipient: "pol-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-09-26", amount: 3100, recipient: "pol-003", comite: "Comité Jesús Manuel Ortiz González Inc.", source: "CEE sep 2024", certainty: "confirmado" },
      { date: "2025-06-29", amount: 3100, recipient: "pol-004", comite: "Partido Nuevo Progresista", source: "CEE jun 2025 – transferencia electrónica", certainty: "confirmado" },
      { date: "2025-04-10", amount: 1000, recipient: "pol-005", comite: "Comité Jenniffer González Colón Inc.", source: "CEE abr 2025", certainty: "confirmado" },
      { date: "2025-06-26", amount: 3100, recipient: "pol-006", comite: "Comité Amigos Johnny Méndez", source: "CEE jun 2025", certainty: "confirmado" },
      { date: "2025-06-24", amount: 3000, recipient: "pol-007", comite: "Virgilio Olivera Olivera", source: "CEE jun 2025", certainty: "confirmado" },
      { date: "2024-10-22", amount: 3100, recipient: "pol-008", comite: "Comité Amigos José Luis Dalmau Santiago", source: "CEE oct 2024", certainty: "confirmado" },
      { date: "2024-09-30", amount: 3100, recipient: "pol-009", comite: "Comité Miguel Romero Lugo", source: "CEE sep 2024 / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-10-04", amount: 3100, recipient: "pol-010", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ],
    totalDonated: 30700,
    certeza: "confirmado",
    fuente: "Comisión Estatal de Elecciones (CEE); CPI jun 2025; NotiCel may 2024",
    declaraciones: [
      { date: "2024", texto: "El turismo de lujo es una forma de desarrollar minimizando la huella ambiental.", fuente: "Puerto Rico Real Estate Summit – CPI oct 2025" },
      { date: "2025-03", texto: "Desde el principio hemos mantenido comunicación abierta y disponible con los grupos de interés.", fuente: "CPI jun 2025" },
    ],
  },
  {
    id: "inv-002",
    name: "William (Will) Bennett",
    type: "Individuo / CEO",
    role: "CEO y co-fundador de Three Rules Capital. Reside en Puerto Rico desde 2022. Anterior director general y jefe de Desarrollo de Irongate (Costa Palmas, Los Cabos, México). También trabajó en Related (70 Vestry, Nueva York).",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC", "Reuben Brothers (socio)"],
    executives: [],
    donations: [
      { date: "2024-11-06", amount: 3100, recipient: "pol-010", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-011", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-004", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ],
    totalDonated: 15500,
    certeza: "confirmado",
    fuente: "CPI oct 2025; The Real Deal abr 2025; Reuben Brothers (perfil oficial)",
    declaraciones: [
      { date: "2025", texto: "Somos como caballos con anteojeras, completamente enfocados en Esencia.", fuente: "The Real Deal, abr 2025" },
    ],
  },
  { id: "inv-003", name: "Harish Venkatesh", type: "Individuo / Socio", role: "Tercer socio de Three Rules Capital. Se unió en 2023. Presente en las vistas públicas de la OGPe en Cabo Rojo (marzo 2025).", relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"], executives: [], donations: [], totalDonated: 0, certeza: "confirmado", fuente: "CPI mar 2025; The Real Deal abr 2025", declaraciones: [] },
  { id: "inv-004", name: "Three Rules Capital", type: "Empresa desarrolladora", role: "Compañía global de desarrollo inmobiliario co-desarrolladora del proyecto Esencia. Fundada por Will Bennett y Roberto Ruiz Vargas. Inversión total anunciada: ~$2,000 millones.", executives: ["Will Bennett (CEO)", "Roberto Ruiz Vargas (COO)", "Harish Venkatesh (socio)"], relatedEntities: ["Cabo Rojo Land Acquisition LLC", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado", fuente: "NotiCel may 2024; The Real Deal abr 2025; CPI (múltiples reportajes 2025)", declaraciones: [] },
  { id: "inv-005", name: "Reuben Brothers", type: "Empresa inversionista", role: "Firma de inversión familiar británica. Co-financiadora del proyecto Esencia. David y Simon Reuben (~$9.4B c/u, Forbes). JPMorgan Chase provee financiamiento adicional.", executives: ["David Reuben", "Simon Reuben", "Jamie Reuben"], relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"], donations: [], totalDonated: 0, certeza: "confirmado", fuente: "CPI jun 2025; The Real Deal abr 2025; Bloomberg may 2024", declaraciones: [] },
  { id: "inv-006", name: "Cabo Rojo Land Acquisition LLC", type: "Entidad legal del proyecto", role: "Entidad registrada en PR el 25 de marzo de 2019. Vehículo legal de Reuben Brothers y Three Rules Capital. Titular del decreto de exención contributiva (~$498M).", executives: [], relatedEntities: ["Three Rules Capital", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado", fuente: "Registro Corporativo PR; OGPe – Expediente DIA Esencia; CPI oct 2025", declaraciones: [] },
];

const POLITICIANS = [
  { id: "pol-001", name: "Thomas Rivera Schatz", party: "PNP", position: "Presidente del Senado de Puerto Rico", totalReceived: 6200, donations: [{ date: "2024-10-03", amount: 3100, donor: "inv-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" }, { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: ["leg-006"], statements: [] },
  { id: "pol-002", name: "Ángel Matos García", party: "PPD", position: "Exrepresentante · Presidió Comisión de Industria Turística", totalReceived: 6200, donations: [{ date: "2024-10-01", amount: 3100, donor: "inv-001", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" }, { date: "2024", amount: 3100, donor: "inv-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-003", name: "Jesús Manuel Ortiz González", party: "PPD", position: "Excandidato a la gobernación (PPD)", totalReceived: 3100, donations: [{ date: "2024-09-26", amount: 3100, donor: "inv-001", comite: "Comité Jesús Manuel Ortiz González, Inc.", source: "CEE sep 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-004", name: "Partido Nuevo Progresista (PNP)", party: "PNP", position: "Comité central del partido / Comité Municipal PNP San Juan", totalReceived: 6200, donations: [{ date: "2025-06-29", amount: 3100, donor: "inv-001", comite: "Partido Nuevo Progresista", source: "CEE jun 2025", certainty: "confirmado" }, { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: ["leg-001", "leg-002"], statements: [] },
  { id: "pol-005", name: "Jenniffer González Colón", party: "PNP", position: "Gobernadora de Puerto Rico", totalReceived: 1000, donations: [{ date: "2025-04-10", amount: 1000, donor: "inv-001", comite: "Comité Jenniffer González Colón Inc.", source: "CEE abr 2025", certainty: "confirmado" }], legislation: ["leg-002", "leg-005"], statements: [] },
  { id: "pol-006", name: "Johnny Méndez", party: "PNP", position: "Presidente Cámara de Representantes", totalReceived: 3100, donations: [{ date: "2025-06-26", amount: 3100, donor: "inv-001", comite: "Comité Amigos Johnny Méndez", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-007", name: "Virgilio Olivera Olivera", party: "PNP", position: "Alcalde de San Germán", totalReceived: 3000, donations: [{ date: "2025-06-24", amount: 3000, donor: "inv-001", comite: "Virgilio Olivera Olivera", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [], statements: [{ date: "2025-03", texto: "Resaltó el impacto económico favorable del proyecto para la región suroeste en la vista pública de la OGPe.", fuente: "CPI jun 2025" }] },
  { id: "pol-008", name: "José Luis Dalmau Santiago", party: "PPD", position: "Senador / Exlíder del PPD", totalReceived: 3100, donations: [{ date: "2024-10-22", amount: 3100, donor: "inv-001", comite: "Comité Amigos José Luis Dalmau Santiago", source: "CEE oct 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-009", name: "Miguel Romero Lugo", party: "PNP", position: "Alcalde de San Juan", totalReceived: 3100, donations: [{ date: "2024-09-30", amount: 3100, donor: "inv-001", comite: "Comité Miguel Romero Lugo", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-010", name: "Roberto 'Bobby' Ramírez Kurtz", party: "PPD", position: "Exalcalde de Cabo Rojo", totalReceived: 6200, donations: [{ date: "2024-10-04", amount: 3100, donor: "inv-001", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE / CPI oct 2025", certainty: "confirmado" }, { date: "2024-11-06", amount: 3100, donor: "inv-002", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California nov 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-011", name: "Tatiana Pérez Ramírez", party: "PNP", position: "Representante PNP (al largo)", totalReceived: 3100, donations: [{ date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-012", name: "Jorge Morales Wiscovitch", party: "PNP", position: "Alcalde de Cabo Rojo", totalReceived: 0, donations: [], legislation: [], statements: [{ date: "2025-03", texto: "Esencia generará empleos para los caborrojeños. No queremos una buena economía a expensas del daño ambiental.", fuente: "CPI ago 2025" }] },
  { id: "pol-013", name: "Wanda Vázquez Garced", party: "PNP", position: "Exgobernadora de Puerto Rico", totalReceived: 0, donations: [], legislation: ["leg-001"], statements: [{ date: "2020-12", texto: "Bajo su administración se otorgó el decreto de exención contributiva original a Cabo Rojo Land Acquisition LLC.", fuente: "CPI oct 2025" }] },
  { id: "pol-014", name: "Pedro Pierluisi", party: "PNP", position: "Exgobernador de Puerto Rico", totalReceived: 0, donations: [], legislation: ["leg-001", "leg-002"], statements: [{ date: "2024", texto: "Bajo su administración se enmendó el decreto contributivo original y se emitió la exención del 90% en aranceles.", fuente: "CPI oct 2025" }] },
  { id: "pol-015", name: "María de Lourdes Santiago", party: "PIP", position: "Senadora · Vicepresidenta del PIP", totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006"], statements: [{ date: "2025-12-26", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido.", fuente: "Prensa Latina, 26/dic/2025" }] },
  { id: "pol-016", name: "Adrián González Costa", party: "PIP", position: "Senador por Acumulación · PIP", totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006"], statements: [{ date: "2025-12", texto: "La determinación de la OGPe para Esencia fue emitida deliberadamente durante las fiestas de Navidad para acortar el período práctico de respuesta de grupos científicos y comunitarios.", fuente: "San Juan Daily Star, dic 2025" }] },
];

const LEGISLATION = [
  { id: "leg-001", title: "Decreto de Exención Contributiva – Cabo Rojo Land Acquisition LLC", subtitle: "Ley de Desarrollo Turístico de PR / Ley 74 de 2010", type: "Decreto contributivo", date: "Dic 2020", dateAmended: "2024", status: "Vigente (enmendado 2024)", administraciones: ["Wanda Vázquez Garced (decreto original, dic 2020)", "Pedro Pierluisi (enmienda 2024)"], description: "La Compañía de Turismo otorgó casi $498 millones en créditos contributivos a Cabo Rojo Land Acquisition LLC, más exención de 10 años en impuestos. El decreto fue otorgado a pesar de que la propia Compañía de Turismo reconoció que el proyecto es predominantemente residencial.", monto: "~$498 millones en créditos contributivos + exención 10 años", source: "OGPe – Expediente DIA Esencia; CPI oct 2025", certainty: "confirmado", impact: "directo" },
  { id: "leg-002", title: "Exención 90% en Aranceles y Sellos Notariales (parcelas Esencia)", subtitle: "Certificación de exención – administración Pierluisi", type: "Certificación de exención", date: "2022", dateAmended: null, status: "Vigente", administraciones: ["Pedro Pierluisi"], description: "El proponente recibió una exención del 90% para el pago de aranceles y sellos notariales relacionados a ciertas parcelas del proyecto.", monto: "No especificado públicamente", source: "CPI oct 2025", certainty: "confirmado", impact: "directo" },
  { id: "leg-003", title: "Solicitud de rediseño del proyecto – DRNA", subtitle: "Determinación regulatoria ambiental", type: "Determinación regulatoria", date: "2025", dateAmended: null, status: "En proceso", administraciones: ["DRNA"], description: "El DRNA indicó que el proyecto debe presentar un rediseño que evidencie una redefinición sustancial de su huella ecológica e incluya un plan de conservación.", monto: "N/A", source: "Bonita Radio; CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-004", title: "Acuerdo con Universidad Ana G. Méndez", subtitle: "Currículo de hospitalidad en Cabo Rojo", type: "Acuerdo institucional", date: "Ene 2025", dateAmended: null, status: "Anunciado", administraciones: [], description: "Roberto Ruiz Vargas anunció un acuerdo para expandir el currículo de hospitalidad y turismo en el centro universitario de Cabo Rojo.", monto: "N/A", source: "CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-005", title: "P.A. 114 – Código de Planificación y Permisos de Puerto Rico", subtitle: "Proyecto de Administración – Gobernadora Jenniffer González Colón", type: "Proyecto de ley (819 páginas)", date: "8 abr 2026", dateAmended: null, status: "En evaluación legislativa", administraciones: ["Jenniffer González Colón (autora)"], description: "Proyecto de 819 páginas que unifica cerca de 100 leyes en un solo Código. Crea la OCP como única entidad emisora de permisos. Reduce jurisdicción del DRNA. Establece límite de 180 días para DIA y permisos discrecionales. Preparado con insumo del sector privado y la JSF. CONEXION CON ESENCIA: El límite de 180 días habría acelerado el proceso de Esencia. La reducción del DRNA debilitaría la agencia que ordenó el rediseño del proyecto.", monto: "N/A", source: "Metro PR 8/abr/2026; NotiCel 10/abr/2026; Primera Hora 8/abr/2026", certainty: "confirmado", impact: "directo", criticas: [{ quien: "Sen. María de Lourdes Santiago (PIP)", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido.", fuente: "Prensa Latina, 26/dic/2025" }, { quien: "Sen. Adrián González Costa (PIP)", texto: "Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia.", fuente: "El Vocero – RS9, ene 2025" }] },
  { id: "leg-006", title: "P. del S. 1173 – Ley para Simplificar el Sistema de Permisos de Puerto Rico", subtitle: "Proyecto del Presidente del Senado Thomas Rivera Schatz (PNP)", type: "Proyecto de ley del Senado", date: "7 abr 2026", dateAmended: null, status: "Vista pública conjunta 13 abr 2026 (con P.A. 114)", administraciones: ["Thomas Rivera Schatz (autor)"], description: "Medida de Rivera Schatz que comparte el diagnóstico del P.A. 114. Vista pública conjunta convocada para el 13 de abril. Rivera Schatz recibió $3,100 de Ruiz Vargas y $3,100 de Bennett (CEE, 2024). CONEXION CON ESENCIA: Junto al P.A. 114 crearía un sistema con jurisdicción reducida del DRNA — la misma agencia que ordenó el rediseño de Esencia.", monto: "N/A", source: "Primera Hora 9/abr/2026; NotiCel 9/abr/2026; Metro PR 10/abr/2026", certainty: "confirmado", impact: "directo", criticas: [{ quien: "Sen. María de Lourdes Santiago (PIP)", texto: "El gobierno actúa como lacayo a sueldo de los contribuyentes de su PNP.", fuente: "Prensa Latina, 26/dic/2025" }, { quien: "Sen. Adrián González Costa (PIP)", texto: "La PIP radicó la RS9 exigiendo investigar el proceso de permisos de Esencia.", fuente: "El Vocero, 30/mar/2026" }] },
];

const POLITICIAN_PHOTOS = {
  "pol-001": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/thomas.jpg",
  "pol-002": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/angel.jpg",
  "pol-003": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/jesus.jpg",
  "pol-005": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/jenniffer.jpg",
  "pol-006": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/johnny.jpg",
  "pol-007": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/virgilio.jpg",
  "pol-008": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/joseluis.png",
  "pol-009": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/miguel.jpg",
  "pol-010": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/bobby.jpg",
  "pol-011": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/tatiana.jpg",
  "pol-012": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/jorge.png",
  "pol-013": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/wanda.jpg",
  "pol-014": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/pedro.jpg",
};

const MEDIA_CASES = [
  { id: "m-001", medio: "El Nuevo Día / Brand Studio", tipo: "Contenido patrocinado", nivel: "alto", titulo: '"Esencia ajusta sus planes para minimizar su huella ambiental"', fecha: "2025", descripcion: "Artículo bajo '/brandstudio/three-rules-capital/' de El Nuevo Día — producido y pagado directamente por Three Rules Capital. Replica narrativas de los desarrolladores sin contraste periodístico.", url: "https://www.elnuevodia.com/brandstudio/three-rules-capital/notas/esencia-ajusta-sus-planes-de-desarrollo-para-minimizar-su-huella-ambiental/", evidencia: "URL contiene '/brandstudio/three-rules-capital/' — autoría de Three Rules Capital", certainty: "confirmado", contrasten: "El CPI documentó que el proyecto es predominantemente residencial, la DIA carece de estudio hidrológico y el DRNA ordenó un rediseño sustancial — contradictorio con la narrativa del artículo." },
  { id: "m-002", medio: "Metro Puerto Rico", tipo: "Uso de artista opositora para cobertura favorable", nivel: "alto", titulo: '"Recurso agua: ¿Cómo se plantea su manejo en Esencia?"', fecha: "09 abril 2026", descripcion: "Artículo atribuido a editora invitada Kany García — artista opositora al proyecto — pero cuyo contenido principal da plataforma al COO Roberto Ruiz Vargas para exponer la narrativa del proyecto. Activistas señalaron que el nombre de Kany García fue usado para dar credibilidad al greenwashing.", url: "https://www.metro.pr/noticias/2026/04/09/recurso-agua-como-se-plantea-su-manejo-en-esencia/", evidencia: "Metro PR, 9/abr/2026 — Atribuido a editora invitada Kany García; voz principal: COO Roberto Ruiz Vargas", certainty: "confirmado", contrasten: "La DIA reconoció que el predio no tiene infraestructura de agua. La AAA no tiene capacidad para abastecer el proyecto. El Senado aprobó dos resoluciones para investigar la viabilidad hídrica." },
  { id: "m-003", medio: "Metro Puerto Rico", tipo: "Censura de columna de opinión", nivel: "crítico", titulo: "Columna de la Lcda. Rosa Seguí — publicada y retirada", fecha: "Previo a marcha del 28 de marzo 2026", descripcion: "Metro PR publicó y retiró una columna de la Lcda. Rosa Seguí (Movimiento Victoria Ciudadana) basada en investigaciones del CPI. Seguí declaró: 'Es muy peligroso que nos hayan censurado. La única columna censurada pertenecía a una portavoz del Movimiento Victoria Ciudadana.'", url: "https://www.facebook.com/share/1Cy91dEHSG/", evidencia: "Declaración directa de la Lcda. Rosa Seguí; reportado por Resumen Latinoamericano (5/abr/2026)", certainty: "confirmado", contrasten: "El mismo día Metro PR publicó artículo que amplifica la narrativa del desarrollador. Contraste directo entre censura de voz crítica y publicación de contenido favorable." },
  { id: "m-004", medio: "InDiario", tipo: "Ataque a opositor con fuentes anónimas", nivel: "medio", titulo: '"Acusan a Gabo Ramos de payoleo"', fecha: "26 marzo 2026", descripcion: "InDiario acusó al creador de contenido Gabo Ramos de recibir pagos no divulgados, basándose exclusivamente en fuentes anónimas. Sin evidencia documental, contratos ni registros de pagos.", url: "https://indiario.com/noticias/acusan-a-gabo-ramos-de-payoleo", evidencia: "InDiario, 26/mar/2026 — Fuentes anónimas sin evidencia documental", certainty: "reportado", contrasten: "El CPI documentó que los propios desarrolladores pagaron anuncios en La Voz Digital y crearon cuentas anónimas (CPI, mar 2025)." },
  { id: "m-005", medio: "La Diestra", tipo: "Editorial pro-proyecto sin fuentes verificables", nivel: "medio", titulo: '"Derrumbamos Mitos En Contra de Esencia... Otra Vez"', fecha: "2 abril 2026", descripcion: "Editorial que enmarca la oposición como argumentos de influencers vs. realidad técnica sin citar la DIA, el DRNA, ni los hallazgos del CPI sobre deficiencias.", url: "https://www.ladiestra.com/noticias/derrumbamos-mitos-en-contra-de-esencia-otra-vez", evidencia: "La Diestra, 2/abr/2026 — Editorial sin fuentes primarias verificables", certainty: "confirmado", contrasten: "El DRNA ordenó rediseño. El Senado aprobó dos resoluciones de investigación. Más de 70 organizaciones marcharon el 28/mar/2026." },
  { id: "m-006", medio: "Medios pagados / Cuentas anónimas (CPI documentado)", tipo: "Campaña de comunicación pagada", nivel: "alto", titulo: "Anuncios en La Voz Digital + cuenta anónima 'Conoce la verdad'", fecha: "Previo a marzo 2025", descripcion: "El CPI documentó que días antes de las vistas públicas de la OGPe, los proponentes pagaron anuncios en La Voz Digital y crearon cuentas anónimas como 'Conoce la verdad'. El equipo de RRPP incluye a Danny Hernández (ex prensa Jaime Perelló) y Misael Vargas.", url: "https://periodismoinvestigativo.com/2025/03/vistas-publicas-esencia-cabo-rojo/", evidencia: "CPI 'Las miradas silenciosas del proyecto Esencia' (mar 2025)", certainty: "confirmado", contrasten: null },
  { id: "m-007", medio: "Mets de Guaynabo – BSN", tipo: "Estrategia de imagen pública vía auspicio deportivo", nivel: "alto", titulo: "Esencia entra al BSN como auspiciador de los Mets de Guaynabo", fecha: "Temporada BSN 2026", descripcion: "El logo de Esencia aparece en los respaldos de las sillas del banquillo en el Coliseo Fernando 'Rube' Hernández en Gurabo. Los dueños del equipo son Marc Grossman y Mark Linder, ambos residentes en PR. Marc Grossman es beneficiario de la Ley 22 (ahora Ley 60) desde 2015, según documentó el CPI. Los propietarios del equipo que acepta el auspicio de Esencia operan bajo el mismo marco legal (Ley 60) que otorga a Esencia ~$498M en créditos contributivos. La COO Lcda. Gabiangie Berríos confirmó que gran parte de los auspicios provienen de inversionistas bajo Ley 60.", url: "https://www.facebook.com/share/p/18VRJ3maE8/", evidencia: "Propietarios verificados: Marc Grossman y Mark Linder (Wikipedia; metsbasketball.com, dic 2019). Grossman como beneficiario Ley 22/60 desde 2015: CPI jun 2021. Imágenes de La Contraparte (@gaboramospr). Declaración directa de COO Lcda. Gabiangie Berríos.", certainty: "confirmado", contrasten: "Conexión Ley 60 triple: (1) Esencia opera bajo Ley 60 con ~$498M en créditos; (2) los dueños del equipo son beneficiarios de Ley 60; (3) la COO confirma que los auspicios provienen de inversionistas Ley 60." },
];

const CERT = { confirmado: { color: "#22c55e", bg: "rgba(34,197,94,0.08)", label: "✓ CONFIRMADO" }, reportado: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", label: "◈ REPORTADO" }, "en investigación": { color: "#ef4444", bg: "rgba(239,68,68,0.08)", label: "⚠ EN INVESTIGACIÓN" } };
const IMPACT = { directo: { color: "#ef4444", label: "IMPACTO DIRECTO" }, indirecto: { color: "#f59e0b", label: "IMPACTO INDIRECTO" } };
const NIVEL_CONFIG = { crítico: { color: "#dc2626", bg: "rgba(220,38,38,0.1)", label: "🚨 NIVEL CRÍTICO" }, alto: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "⚠ NIVEL ALTO" }, medio: { color: "#6b7280", bg: "rgba(107,114,128,0.1)", label: "◈ NIVEL MEDIO" } };
const fmt = n => "$" + Number(n).toLocaleString("es-PR");
const getInv = id => INVESTORS.find(i => i.id === id);
const getPol = id => POLITICIANS.find(p => p.id === id);
const getLeg = id => LEGISLATION.find(l => l.id === id);
const totalDonated = INVESTORS.reduce((s, i) => s + i.totalDonated, 0);

function Badge({ c }) { const cfg = CERT[c] || CERT["en investigación"]; return <span style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}33`, padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, fontWeight: 700 }}>{cfg.label}</span>; }
function Tag({ children, color = "#6b7280" }) { return <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color, border: `1px solid ${color}44`, padding: "2px 7px", borderRadius: 2, textTransform: "uppercase", display: "inline-block" }}>{children}</span>; }
function Sect({ title, children }) { return <div style={{ marginBottom: 28 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><div style={{ width: 3, height: 18, background: "#dc2626", flexShrink: 0 }} /><h3 style={{ margin: 0, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, color: "#6b7280", textTransform: "uppercase" }}>{title}</h3></div>{children}</div>; }
function Card({ children, onClick, style = {} }) { const [h, setH] = useState(false); return <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h && onClick ? "#111827" : "#0a0a0a", border: `1px solid ${h && onClick ? "#374151" : "#1f2937"}`, borderRadius: 4, padding: "16px 20px", cursor: onClick ? "pointer" : "default", transition: "all 0.15s", ...style }}>{children}</div>; }

function InvProfile({ inv, onBack }) {
  const donations = inv.donations.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
  const max = Math.max(...donations.map(d => d.amount), 1);
  return <div>
    <button onClick={onBack} style={{ background: "none", border: "1px solid #374151", color: "#9ca3af", padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, marginBottom: 24 }}>← VOLVER</button>
    <div style={{ borderLeft: "3px solid #3b82f6", paddingLeft: 16, marginBottom: 24 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontFamily: "Georgia, serif" }}>{inv.name}</h2>
      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}><Tag color="#3b82f6">{inv.type}</Tag><Badge c={inv.certeza} /></div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[["Total donado (CEE)", fmt(inv.totalDonated), "#dc2626"],["# Donaciones", inv.donations.length, "#f59e0b"],["Entidades vinculadas", inv.relatedEntities.length, "#3b82f6"]].map(([l,v,c]) => <Card key={l} style={{ textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div><div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 4, letterSpacing: 1 }}>{l.toUpperCase()}</div></Card>)}
    </div>
    <Sect title="Rol en el proyecto Esencia"><Card><p style={{ margin: 0, color: "#d1d5db", lineHeight: 1.8, fontSize: 14 }}>{inv.role}</p></Card></Sect>
    {inv.relatedEntities.length > 0 && <Sect title="Entidades relacionadas"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{inv.relatedEntities.map(e => <Tag key={e} color="#6b7280">{e}</Tag>)}</div>{inv.executives.length > 0 && <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>{inv.executives.map(e => <Tag key={e} color="#9ca3af">👤 {e}</Tag>)}</div>}</Sect>}
    {donations.length > 0 && <Sect title="Donaciones políticas registradas (CEE)">{donations.map((d,i) => { const pol = getPol(d.recipient); const pc = pol?.party === "PNP" ? "#3b82f6" : "#dc2626"; return <div key={i} style={{ marginBottom: 18, borderLeft: "2px solid #1f2937", paddingLeft: 14 }}><div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}><div><span style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{d.date}</span><span style={{ fontSize: 14, color: "white", marginLeft: 10, fontWeight: 600 }}>{pol?.name || d.recipient}</span>{pol && <span style={{ marginLeft: 6 }}><Tag color={pc}>{pol.party}</Tag></span>}</div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#dc2626", fontFamily: "monospace", fontWeight: 700, fontSize: 16 }}>{fmt(d.amount)}</span><Badge c={d.certainty} /></div></div>{d.comite && <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Comité: {d.comite}</div>}<div style={{ height: 3, background: "#1f2937", borderRadius: 2 }}><div style={{ height: 3, width: `${(d.amount/max)*100}%`, background: "#dc2626", borderRadius: 2 }} /></div><div style={{ marginTop: 4, fontSize: 10, fontFamily: "monospace", color: "#4b5563" }}>📄 {d.source}</div></div>; })}</Sect>}
    {inv.declaraciones?.length > 0 && <Sect title="Declaraciones públicas">{inv.declaraciones.map((d,i) => <Card key={i} style={{ borderLeft: "3px solid #f59e0b", marginBottom: 10 }}><div style={{ fontStyle: "italic", color: "#d1d5db", fontSize: 13, lineHeight: 1.7 }}>"{d.texto}"</div><div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", marginTop: 8 }}>{d.date} · {d.fuente}</div></Card>)}</Sect>}
    <Sect title="Fuentes"><Card><div style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280", lineHeight: 2 }}>📄 {inv.fuente}</div></Card></Sect>
  </div>;
}

function PolProfile({ pol, onBack }) {
  const pc = pol.party === "PNP" ? "#3b82f6" : pol.party === "PPD" ? "#dc2626" : "#6b7280";
  const photo = POLITICIAN_PHOTOS[pol.id];
  return <div>
    <button onClick={onBack} style={{ background: "none", border: "1px solid #374151", color: "#9ca3af", padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, marginBottom: 24 }}>← VOLVER</button>
    <div style={{ borderLeft: `4px solid ${pc}`, paddingLeft: 16, marginBottom: 24, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      {photo && <img src={photo} alt={pol.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: `3px solid ${pc}`, filter: "grayscale(100%)", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />}
      <div>
        <h2 style={{ margin: 0, fontSize: 22, fontFamily: "Georgia, serif" }}>{pol.name}</h2>
        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{pol.position}</div>
        <div style={{ marginTop: 8 }}><Tag color={pc}>{pol.party}</Tag></div>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[["Total recibido", fmt(pol.totalReceived), "#dc2626"],["# Donaciones", pol.donations.length, "#f59e0b"],["Acc. legislativas", pol.legislation.length, "#22c55e"]].map(([l,v,c]) => <Card key={l} style={{ textAlign: "center" }}><div style={{ fontSize: 22, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div><div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 4, letterSpacing: 1 }}>{l.toUpperCase()}</div></Card>)}
    </div>
    {pol.donations.length > 0 && <Sect title="Donaciones recibidas (CEE)">{pol.donations.map((d,i) => { const inv = getInv(d.donor); return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1f2937", flexWrap: "wrap", gap: 8 }}><div><div style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{d.date}</div><div style={{ color: "white", fontWeight: 600, marginTop: 2 }}>{inv?.name}</div>{d.comite && <div style={{ fontSize: 11, color: "#9ca3af" }}>{d.comite}</div>}<div style={{ fontSize: 10, fontFamily: "monospace", color: "#4b5563", marginTop: 4 }}>📄 {d.source}</div></div><div style={{ textAlign: "right" }}><div style={{ color: "#dc2626", fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>{fmt(d.amount)}</div><div style={{ marginTop: 4 }}><Badge c={d.certainty} /></div></div></div>; })}</Sect>}
    {pol.legislation.length > 0 && <Sect title="Acciones gubernamentales relacionadas">{pol.legislation.map(lid => { const leg = getLeg(lid); if(!leg) return null; const ic = IMPACT[leg.impact]; return <Card key={lid} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}><div style={{ flex: 1 }}><div style={{ fontSize: 13, color: "white", fontWeight: 600 }}>{leg.title}</div><div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{leg.date} · {leg.status}</div>{leg.monto && leg.monto !== "N/A" && <div style={{ marginTop: 6, fontSize: 12, color: "#22c55e", fontFamily: "monospace", fontWeight: 700 }}>{leg.monto}</div>}</div><Tag color={ic.color}>{ic.label}</Tag></div></Card>; })}</Sect>}
    {pol.statements.length > 0 && <Sect title="Declaraciones públicas">{pol.statements.map((s,i) => <Card key={i} style={{ borderLeft: "3px solid #f59e0b", marginBottom: 10 }}><div style={{ fontStyle: "italic", color: "#d1d5db", fontSize: 13, lineHeight: 1.7 }}>"{s.texto}"</div><div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", marginTop: 8 }}>{s.date} · {s.fuente}</div></Card>)}</Sect>}
  </div>;
}

function DashView({ onInv, onPol }) {
  const tl = [
    { date: "2019-03", e: "Se registra Cabo Rojo Land Acquisition LLC en el Dept. de Estado de PR", t: "legal" },
    { date: "2020-12", e: "Vázquez otorga decreto de exención contributiva (~$498M) a CRLA LLC", t: "gobierno" },
    { date: "2022", e: "Pierluisi emite exención del 90% en aranceles para parcelas del proyecto", t: "gobierno" },
    { date: "2022", e: "Bennett y Ruiz Vargas se establecen en PR; fundan Three Rules Capital", t: "empresa" },
    { date: "2024-05", e: "Anuncio público del proyecto Esencia (~$2,000M) en Boquerón, Cabo Rojo", t: "empresa" },
    { date: "2024-2025", e: "Roberto Ruiz Vargas dona $30,700 a comités de ambos partidos (CEE)", t: "donacion" },
    { date: "2025-03", e: "Vistas públicas ante la OGPe — fuerte oposición ciudadana", t: "legal" },
    { date: "2025", e: "DRNA requiere rediseño sustancial del proyecto (Bonita Radio / CPI)", t: "gobierno" },
    { date: "2026-03-28", e: "Miles marchan en el Viejo San Juan contra Esencia — más de 70 organizaciones", t: "legal" },
    { date: "2026-04", e: "P.A. 114 y P. del S. 1173 — reforma de permisos con conexión a Esencia", t: "gobierno" },
    { date: "2026-BSN", e: "Esencia entra como auspiciador de los Mets de Guaynabo (dueños: Grossman y Linder, Ley 60)", t: "donacion" },
  ];
  const tcol = { legal: "#a855f7", gobierno: "#22c55e", empresa: "#3b82f6", donacion: "#dc2626" };
  const topInv = INVESTORS.filter(i => i.totalDonated > 0).sort((a,b) => b.totalDonated - a.totalDonated);
  const topPol = POLITICIANS.filter(p => p.totalReceived > 0).sort((a,b) => b.totalReceived - a.totalReceived);
  const maxI = topInv[0]?.totalDonated || 1, maxP = topPol[0]?.totalReceived || 1;
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[["Donaciones rastreadas (CEE)", fmt(totalDonated), "#dc2626"],["Políticos con donaciones", POLITICIANS.filter(p=>p.totalReceived>0).length, "#f59e0b"],["Créditos contributivos", "~$498M", "#22c55e"],["Inversión total anunciada", "~$2,000M", "#3b82f6"]].map(([l,v,c]) => <Card key={l} style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div><div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 6, letterSpacing: 1 }}>{l.toUpperCase()}</div></Card>)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
      <Sect title="Top donantes (CEE)">{topInv.map(inv => <div key={inv.id} onClick={() => onInv(inv)} style={{ cursor: "pointer", padding: "9px 0", borderBottom: "1px solid #1f2937" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ fontSize: 12, color: "#d1d5db" }}>{inv.name}</span><span style={{ fontSize: 12, fontFamily: "monospace", color: "#dc2626", fontWeight: 700 }}>{fmt(inv.totalDonated)}</span></div><div style={{ height: 3, background: "#1f2937", borderRadius: 2 }}><div style={{ height: 3, width: `${(inv.totalDonated/maxI)*100}%`, background: "#dc2626", borderRadius: 2 }} /></div></div>)}</Sect>
      <Sect title="Políticos receptores">{topPol.slice(0,9).map(pol => { const pc = pol.party === "PNP" ? "#3b82f6" : "#dc2626"; return <div key={pol.id} onClick={() => onPol(pol)} style={{ cursor: "pointer", padding: "8px 0", borderBottom: "1px solid #1f2937" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, flexWrap: "wrap", gap: 2 }}><span style={{ fontSize: 11, color: "#d1d5db" }}>{pol.name} <span style={{ color: pc, fontSize: 9 }}>({pol.party})</span></span><span style={{ fontSize: 11, fontFamily: "monospace", color: "#f59e0b", fontWeight: 700 }}>{fmt(pol.totalReceived)}</span></div><div style={{ height: 3, background: "#1f2937", borderRadius: 2 }}><div style={{ height: 3, width: `${(pol.totalReceived/maxP)*100}%`, background: "#f59e0b", borderRadius: 2 }} /></div></div>; })}</Sect>
    </div>
    <Sect title="Línea de tiempo — eventos clave (verificados)">
      <div style={{ position: "relative", paddingLeft: 22 }}>
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "#1f2937" }} />
        {tl.map((ev,i) => <div key={i} style={{ position: "relative", marginBottom: 16 }}><div style={{ position: "absolute", left: -17, top: 4, width: 8, height: 8, borderRadius: "50%", background: tcol[ev.t], border: "2px solid #050505" }} /><div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280" }}>{ev.date}</div><div style={{ fontSize: 13, color: "#d1d5db", marginTop: 2, lineHeight: 1.5 }}>{ev.e}</div></div>)}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>{[["Legal/permiso","#a855f7"],["Gobierno","#22c55e"],["Empresa","#3b82f6"],["Donación","#dc2626"]].map(([l,c]) => <span key={l} style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280" }}><span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: c, marginRight: 4, verticalAlign: "middle" }} />{l}</span>)}</div>
      </div>
    </Sect>
  </div>;
}

function MediaView() {
  const [filter, setFilter] = useState("todos");
  const filtered = MEDIA_CASES.filter(m => filter === "todos" ? true : m.nivel === filter);
  return <div>
    <div style={{ background: "#0a0a0a", border: "1px solid #374151", borderLeft: "3px solid #dc2626", borderRadius: 4, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#d1d5db", lineHeight: 1.8 }}>
      Esta sección documenta casos verificados de <strong style={{ color: "white" }}>cobertura mediática favorable a los desarrolladores</strong>, incluyendo contenido patrocinado, censura de voces críticas y campañas pagadas.
    </div>
    <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>{["todos","crítico","alto","medio"].map(f => <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#dc2626" : "transparent", color: filter === f ? "white" : "#6b7280", border: `1px solid ${filter === f ? "#dc2626" : "#374151"}`, padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>)}</div>
    {filtered.map(m => { const nc = NIVEL_CONFIG[m.nivel]; return <Card key={m.id} style={{ marginBottom: 16, borderLeft: `3px solid ${nc.color}` }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}><span style={{ color: nc.color, background: nc.bg, border: `1px solid ${nc.color}33`, padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}>{nc.label}</span><Badge c={m.certainty} /></div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}><div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626", fontFamily: "monospace" }}>{m.medio}</div><div style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{m.fecha}</div></div>
      <div style={{ fontSize: 14, color: "white", fontStyle: "italic", marginBottom: 10, lineHeight: 1.5 }}>{m.titulo}</div>
      <p style={{ margin: "0 0 12px", fontSize: 13, color: "#9ca3af", lineHeight: 1.8 }}>{m.descripcion}</p>
      <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 3, padding: "10px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#f59e0b", letterSpacing: 1, marginBottom: 4 }}>📌 EVIDENCIA</div>
        <div style={{ fontSize: 12, color: "#d1d5db" }}>{m.evidencia}</div>
        {m.url && <div style={{ marginTop: 6, fontSize: 10, fontFamily: "monospace", color: "#4b5563", wordBreak: "break-all" }}>🔗 <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none" }}>{m.url}</a></div>}
      </div>
      {m.contrasten && <div style={{ background: "#0a1a0a", border: "1px solid #1f2937", borderLeft: "3px solid #22c55e", borderRadius: 3, padding: "10px 14px" }}><div style={{ fontSize: 10, fontFamily: "monospace", color: "#22c55e", letterSpacing: 1, marginBottom: 4 }}>🔎 CONTRASTE CON DATOS VERIFICADOS</div><div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.7 }}>{m.contrasten}</div></div>}
    </Card>; })}
  </div>;
}

function LegView() {
  const [filter, setFilter] = useState("todos");
  const filtered = LEGISLATION.filter(l => filter === "todos" ? true : l.impact === filter);
  return <div>
    <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>{["todos","directo","indirecto"].map(f => <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#dc2626" : "transparent", color: filter === f ? "white" : "#6b7280", border: `1px solid ${filter === f ? "#dc2626" : "#374151"}`, padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>)}</div>
    {filtered.map(leg => { const ic = IMPACT[leg.impact]; return <Card key={leg.id} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}><Tag color="#6b7280">{leg.type}</Tag><Tag color="#22c55e">{leg.status}</Tag><Tag color={ic.color}>{ic.label}</Tag><Badge c={leg.certainty} /></div>
      <div style={{ fontSize: 15, color: "white", fontWeight: 600 }}>{leg.title}</div>
      {leg.subtitle && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{leg.subtitle}</div>}
      <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>{leg.date}{leg.dateAmended ? ` · Enmendado: ${leg.dateAmended}` : ""}</div>
      {leg.administraciones?.length > 0 && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Adm.: {leg.administraciones.join("; ")}</div>}
      <p style={{ margin: "10px 0 6px", fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>{leg.description}</p>
      {leg.monto && leg.monto !== "N/A" && <div style={{ fontSize: 14, color: "#22c55e", fontFamily: "monospace", fontWeight: 700, marginTop: 6 }}>💰 {leg.monto}</div>}
      <div style={{ marginTop: 10, fontSize: 10, fontFamily: "monospace", color: "#4b5563" }}>📄 {leg.source}</div>
      {leg.criticas?.length > 0 && <div style={{ marginTop: 14, borderTop: "1px solid #1f2937", paddingTop: 14 }}>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#dc2626", letterSpacing: 1, marginBottom: 10 }}>💬 VOCES CRÍTICAS VERIFICADAS</div>
        {leg.criticas.map((c,ci) => <div key={ci} style={{ background: "#0a0a0a", border: "1px solid #1f2937", borderLeft: "3px solid #dc2626", borderRadius: 3, padding: "10px 14px", marginBottom: 8 }}><div style={{ fontSize: 11, color: "#f59e0b", fontFamily: "monospace", fontWeight: 700, marginBottom: 4 }}>🏛 {c.quien}</div><div style={{ fontSize: 12, color: "#d1d5db", fontStyle: "italic", lineHeight: 1.7 }}>"{c.texto}"</div><div style={{ fontSize: 10, fontFamily: "monospace", color: "#4b5563", marginTop: 6 }}>📄 {c.fuente}</div></div>)}
      </div>}
    </Card>; })}
  </div>;
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [selInv, setSelInv] = useState(null);
  const [selPol, setSelPol] = useState(null);
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  const goInv = inv => { setSelInv(inv); setSelPol(null); setTab("investors"); };
  const goPol = pol => { setSelPol(pol); setSelInv(null); setTab("politicians"); };

  const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "search", label: "Buscar" },
    { id: "investors", label: "Inversionistas" },
    { id: "politicians", label: "Políticos" },
    { id: "legislation", label: "Acciones Gov." },
    { id: "media", label: "⚠ Medios" },
  ];

  const searchResults = q.trim().length < 2 ? [] : [
    ...INVESTORS.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.relatedEntities.some(e => e.toLowerCase().includes(q.toLowerCase()))).map(i => ({ type: "investor", item: i })),
    ...POLITICIANS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.party.toLowerCase().includes(q.toLowerCase())).map(p => ({ type: "politician", item: p })),
    ...LEGISLATION.filter(l => l.title.toLowerCase().includes(q.toLowerCase())).map(l => ({ type: "legislation", item: l })),
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "white", fontFamily: "Georgia, serif", opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <div style={{ background: "#000", borderBottom: "1px solid #1f2937" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ padding: "20px 0 12px", borderBottom: "1px solid #111" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ width: 3, height: 36, background: "#dc2626", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 4, color: "#4b5563", marginBottom: 3 }}>PLATAFORMA DE TRANSPARENCIA CIUDADANA · PUERTO RICO</div>
                <h1 style={{ margin: 0, fontSize: 24, letterSpacing: -0.5, fontWeight: 700 }}>DETRÁS DE <span style={{ color: "#dc2626" }}>ESENCIA</span></h1>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "#4b5563", letterSpacing: 1 }}>CEE · CPI · Bonita Radio · Registro Corporativo PR</div>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "#22c55e", marginTop: 2 }}>● Última verificación: 18 de abril de 2026</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {TABS.map(t => <button key={t.id} onClick={() => { setTab(t.id); if(t.id !== "investors") setSelInv(null); if(t.id !== "politicians") setSelPol(null); }} style={{ background: "none", border: "none", borderBottom: tab === t.id ? "2px solid #dc2626" : "2px solid transparent", color: tab === t.id ? "white" : "#6b7280", padding: "13px 16px", cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", marginBottom: -1, transition: "color 0.15s" }}>{t.label}</button>)}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ background: "#0a0a0a", border: "1px solid #1f2937", borderLeft: "3px solid #f59e0b", borderRadius: 4, padding: "10px 16px", marginBottom: 24, fontSize: 11, fontFamily: "monospace", color: "#6b7280", lineHeight: 1.7 }}>
          ⚠️ <strong style={{ color: "#f59e0b" }}>AVISO LEGAL:</strong> Toda la información proviene de fuentes públicas verificables: CEE, Registro Corporativo PR, OGPe, CPI y Bonita Radio. Plataforma informativa. No realiza alegaciones sin evidencia. No constituye asesoramiento legal.
        </div>

        {tab === "dashboard" && <DashView onInv={goInv} onPol={goPol} />}

        {tab === "search" && <div>
          <div style={{ position: "relative", marginBottom: 20 }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre, empresa, partido, legislación…" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 4, padding: "14px 14px 14px 42px", color: "white", fontFamily: "monospace", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontSize: 16 }}>🔍</span>
          </div>
          {q.length >= 2 && searchResults.length === 0 && <div style={{ textAlign: "center", color: "#6b7280", fontFamily: "monospace", fontSize: 13, padding: 32 }}>Sin resultados para "{q}"</div>}
          {searchResults.map((r,i) => { const colors = { investor: "#3b82f6", politician: "#dc2626", legislation: "#22c55e" }; const labels = { investor: "INVERSIONISTA", politician: "POLÍTICO", legislation: "LEGISLACIÓN" }; return <Card key={i} onClick={() => { if(r.type === "investor") goInv(r.item); if(r.type === "politician") goPol(r.item); }} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}><div><Tag color={colors[r.type]}>{labels[r.type]}</Tag><div style={{ fontSize: 15, color: "white", fontWeight: 600, marginTop: 6 }}>{r.item.name || r.item.title}</div><div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{r.type === "investor" ? r.item.type : r.type === "politician" ? `${r.item.party} · ${r.item.position.substring(0,50)}` : r.item.date}</div></div>{r.type === "investor" && r.item.totalDonated > 0 && <div style={{ fontSize: 14, fontFamily: "monospace", color: "#dc2626", fontWeight: 700 }}>{fmt(r.item.totalDonated)}</div>}{r.type === "politician" && <div style={{ fontSize: 14, fontFamily: "monospace", color: "#f59e0b", fontWeight: 700 }}>{fmt(r.item.totalReceived)}</div>}</div></Card>; })}
          {q.length < 2 && <div style={{ color: "#374151", fontSize: 12, fontFamily: "monospace", textAlign: "center", padding: 32 }}>Escribe al menos 2 caracteres</div>}
        </div>}

        {tab === "investors" && !selInv && <div>
          <div style={{ marginBottom: 20, fontSize: 11, fontFamily: "monospace", color: "#6b7280", letterSpacing: 1 }}>{INVESTORS.length} ENTIDADES REGISTRADAS · Haz clic para ver el perfil completo</div>
          {INVESTORS.map(inv => <Card key={inv.id} onClick={() => setSelInv(inv)} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
              <div><div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}><Tag color="#3b82f6">{inv.type}</Tag><Badge c={inv.certeza} /></div><div style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{inv.name}</div><div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{inv.relatedEntities.join(" · ")}</div></div>
              {inv.totalDonated > 0 && <div style={{ textAlign: "right" }}><div style={{ fontSize: 20, fontFamily: "monospace", color: "#dc2626", fontWeight: 700 }}>{fmt(inv.totalDonated)}</div><div style={{ fontSize: 9, fontFamily: "monospace", color: "#6b7280", marginTop: 2 }}>TOTAL DONADO (CEE)</div></div>}
            </div>
          </Card>)}
        </div>}
        {tab === "investors" && selInv && <InvProfile inv={selInv} onBack={() => setSelInv(null)} />}

        {tab === "politicians" && !selPol && <div>
          <div style={{ marginBottom: 20, fontSize: 11, fontFamily: "monospace", color: "#6b7280", letterSpacing: 1 }}>{POLITICIANS.length} FIGURAS POLÍTICAS RASTREADAS · Haz clic para ver el perfil completo</div>
          {POLITICIANS.map(pol => {
            const pc = pol.party === "PNP" ? "#3b82f6" : pol.party === "PPD" ? "#dc2626" : "#6b7280";
            const photo = POLITICIAN_PHOTOS[pol.id];
            return <Card key={pol.id} onClick={() => setSelPol(pol)} style={{ marginBottom: 12, borderLeft: `3px solid ${pc}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  {photo ? (
                    <img src={photo} alt={pol.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", objectPosition: "top center", border: `2px solid ${pc}`, filter: "grayscale(100%)", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1f2937", border: `2px solid ${pc}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 18, color: pc }}>{pol.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{pol.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{pol.position.substring(0,55)}{pol.position.length > 55 ? "…" : ""}</div>
                    <div style={{ marginTop: 6 }}><Tag color={pc}>{pol.party}</Tag></div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 18, fontFamily: "monospace", color: "#f59e0b", fontWeight: 700 }}>{fmt(pol.totalReceived)}</div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "#6b7280", marginTop: 2 }}>RECIBIDO DE VINCULADOS A ESENCIA</div>
                  {pol.statements.length > 0 && <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>💬 {pol.statements.length} declaración(es)</div>}
                </div>
              </div>
            </Card>;
          })}
        </div>}
        {tab === "politicians" && selPol && <PolProfile pol={selPol} onBack={() => setSelPol(null)} />}

        {tab === "legislation" && <LegView />}
        {tab === "media" && <MediaView />}
      </div>

      <div style={{ background: "#0a0a0a", borderTop: "1px solid #1f2937", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e88" }} />
            <div>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", letterSpacing: 2 }}>ÚLTIMA VERIFICACIÓN</div>
              <div style={{ fontSize: 16, fontFamily: "monospace", color: "white", fontWeight: 700 }}>18 de abril de 2026</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, fontFamily: "monospace", color: "#6b7280" }}>CEE · CPI · Metro PR · El Nuevo Día · La Contraparte · Resumen Latinoamericano</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#000", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#374151", letterSpacing: 1, lineHeight: 2.4 }}>
          DETRÁS DE ESENCIA · PLATAFORMA DE TRANSPARENCIA CIUDADANA · PUERTO RICO<br />
          Fuentes: CEE · Dept. de Estado PR · OGPe · Centro de Periodismo Investigativo · Bonita Radio · NotiCel · The Real Deal · Bloomberg<br />
          <span style={{ color: "#1f2937" }}>Esta plataforma es informativa. No realiza alegaciones sin evidencia verificable. No constituye asesoramiento legal.</span>
        </div>
      </div>
    </div>
  );
}
