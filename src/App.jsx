
import { useState, useEffect } from "react";

// ─── DATOS REALES VERIFICADOS ─────────────────────────────────────────────────
// Fuentes: Centro de Periodismo Investigativo (CPI), Comisión Estatal de Elecciones (CEE),
// Registro Corporativo PR, Bonita Radio, NotiCel, The Real Deal, Bloomberg

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
    fuente: "Comisión Estatal de Elecciones (CEE); CPI 'Empresas detrás de Esencia dejan rastro de daños' jun 2025; NotiCel may 2024",
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
  {
    id: "inv-003",
    name: "Harish Venkatesh",
    type: "Individuo / Socio",
    role: "Tercer socio de Three Rules Capital. Se unió en 2023. Presente en las vistas públicas de la OGPe en Cabo Rojo (marzo 2025).",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"],
    executives: [],
    donations: [],
    totalDonated: 0,
    certeza: "confirmado",
    fuente: "CPI 'Las miradas silenciosas del proyecto Esencia' mar 2025; The Real Deal abr 2025",
    declaraciones: [],
  },
  {
    id: "inv-004",
    name: "Three Rules Capital",
    type: "Empresa desarrolladora",
    role: "Compañía global de desarrollo inmobiliario co-desarrolladora del proyecto Esencia. Fundada por Will Bennett y Roberto Ruiz Vargas. Oficinas en Puerto Rico. Inversión total anunciada del proyecto: ~$2,000 millones.",
    executives: ["Will Bennett (CEO)", "Roberto Ruiz Vargas (COO)", "Harish Venkatesh (socio)"],
    relatedEntities: ["Cabo Rojo Land Acquisition LLC", "Reuben Brothers"],
    donations: [],
    totalDonated: 0,
    certeza: "confirmado",
    fuente: "NotiCel may 2024; The Real Deal abr 2025; CPI (múltiples reportajes 2025)",
    declaraciones: [],
  },
  {
    id: "inv-005",
    name: "Reuben Brothers",
    type: "Empresa inversionista",
    role: "Firma de inversión familiar británica. Co-financiadora del proyecto Esencia. Fundada por David y Simon Reuben (patrimonio estimado ~$9.4B c/u, Forbes). JPMorgan Chase provee financiamiento adicional al proyecto.",
    executives: ["David Reuben", "Simon Reuben", "Jamie Reuben"],
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"],
    donations: [],
    totalDonated: 0,
    certeza: "confirmado",
    fuente: "CPI jun 2025; The Real Deal abr 2025; Bloomberg may 2024",
    declaraciones: [],
  },
  {
    id: "inv-006",
    name: "Cabo Rojo Land Acquisition LLC",
    type: "Entidad legal del proyecto",
    role: "Entidad registrada en PR el 25 de marzo de 2019 como LLC doméstica para desarrollo inmobiliario. Vehículo legal formal de Reuben Brothers y Three Rules Capital para el proyecto Esencia. Titular del decreto de exención contributiva de la Compañía de Turismo (~$498M).",
    executives: [],
    relatedEntities: ["Three Rules Capital", "Reuben Brothers"],
    donations: [],
    totalDonated: 0,
    certeza: "confirmado",
    fuente: "Registro Corporativo PR (Dept. de Estado); OGPe – Expediente DIA Esencia; CPI oct 2025",
    declaraciones: [],
  },
];

const POLITICIANS = [
  { id: "pol-001", name: "Thomas Rivera Schatz", party: "PNP", position: "Presidente del Senado de Puerto Rico", totalReceived: 6200,
    donations: [
      { date: "2024-10-03", amount: 3100, donor: "inv-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-002", name: "Ángel Matos García", party: "PPD", position: "Exrepresentante · Presidió Comisión de Desarrollo de Industria Turística (cuatrienio anterior)", totalReceived: 6200,
    donations: [
      { date: "2024-10-01", amount: 3100, donor: "inv-001", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-003", name: "Jesús Manuel Ortiz González", party: "PPD", position: "Excandidato a la gobernación (PPD)", totalReceived: 3100,
    donations: [
      { date: "2024-09-26", amount: 3100, donor: "inv-001", comite: "Comité Jesús Manuel Ortiz González, Inc.", source: "CEE sep 2024", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-004", name: "Partido Nuevo Progresista (PNP)", party: "PNP", position: "Comité central del partido / Comité Municipal PNP San Juan", totalReceived: 6200,
    donations: [
      { date: "2025-06-29", amount: 3100, donor: "inv-001", comite: "Partido Nuevo Progresista", source: "CEE jun 2025 – transferencia electrónica", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: ["leg-001", "leg-002"], statements: [] },
  { id: "pol-005", name: "Jenniffer González Colón", party: "PNP", position: "Gobernadora de Puerto Rico", totalReceived: 1000,
    donations: [
      { date: "2025-04-10", amount: 1000, donor: "inv-001", comite: "Comité Jenniffer González Colón Inc.", source: "CEE abr 2025", certainty: "confirmado" },
    ], legislation: ["leg-002"], statements: [] },
  { id: "pol-006", name: "Johnny Méndez", party: "PNP", position: "Legislador PNP", totalReceived: 3100,
    donations: [
      { date: "2025-06-26", amount: 3100, donor: "inv-001", comite: "Comité Amigos Johnny Méndez", source: "CEE jun 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-007", name: "Virgilio Olivera Olivera", party: "PNP", position: "Alcalde de San Germán", totalReceived: 3000,
    donations: [
      { date: "2025-06-24", amount: 3000, donor: "inv-001", comite: "Virgilio Olivera Olivera", source: "CEE jun 2025", certainty: "confirmado" },
    ], legislation: [],
    statements: [{ date: "2025-03", texto: "Participó en la vista pública de la OGPe y resaltó el impacto económico favorable del proyecto para la región suroeste.", fuente: "CPI jun 2025" }] },
  { id: "pol-008", name: "José Luis Dalmau Santiago", party: "PPD", position: "Senador / Exlíder del PPD", totalReceived: 3100,
    donations: [
      { date: "2024-10-22", amount: 3100, donor: "inv-001", comite: "Comité Amigos José Luis Dalmau Santiago", source: "CEE oct 2024", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-009", name: "Miguel Romero Lugo", party: "PNP", position: "Alcalde de San Juan", totalReceived: 3100,
    donations: [
      { date: "2024-09-30", amount: 3100, donor: "inv-001", comite: "Comité Miguel Romero Lugo", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-010", name: "Roberto 'Bobby' Ramírez Kurtz", party: "PPD", position: "Exalcalde de Cabo Rojo", totalReceived: 6200,
    donations: [
      { date: "2024-10-04", amount: 3100, donor: "inv-001", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-11-06", amount: 3100, donor: "inv-002", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California nov 2024", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-011", name: "Tatiana Pérez Ramírez", party: "PNP", position: "Representante PNP (al largo)", totalReceived: 3100,
    donations: [
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-012", name: "Jorge Morales Wiscovitch", party: "PNP", position: "Alcalde de Cabo Rojo", totalReceived: 0,
    donations: [], legislation: [],
    statements: [
      { date: "2025-03", texto: "Esencia generará empleos para los caborrojeños, especialmente durante la construcción.", fuente: "CPI ago 2025" },
      { date: "2025-03", texto: "No queremos una buena economía a expensas del daño ambiental.", fuente: "CPI ago 2025" },
    ] },
  { id: "pol-013", name: "Wanda Vázquez Garced", party: "PNP", position: "Exgobernadora de Puerto Rico", totalReceived: 0,
    donations: [], legislation: ["leg-001"],
    statements: [{ date: "2020-12", texto: "Bajo su administración se otorgó el decreto de exención contributiva original a Cabo Rojo Land Acquisition LLC (Compañía de Turismo).", fuente: "CPI oct 2025" }] },
  { id: "pol-014", name: "Pedro Pierluisi", party: "PNP", position: "Exgobernador de Puerto Rico", totalReceived: 0,
    donations: [], legislation: ["leg-001", "leg-002"],
    statements: [{ date: "2024", texto: "Bajo su administración se enmendó el decreto contributivo original y se emitió la exención del 90% en aranceles para parcelas del proyecto.", fuente: "CPI oct 2025" }] },
  { id: "pol-015", name: "María de Lourdes Santiago", party: "PIP", position: "Senadora · Vicepresidenta del PIP", totalReceived: 0,
    donations: [], legislation: ["leg-005", "leg-006"],
    statements: [
      { date: "2025-01", texto: "Coautora de la RS9 exigiendo investigar el proceso de permisos de Esencia. 'La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12-26", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido. Las varias enmiendas al sistema de otorgar permisos forman parte de un patrón junto a la protección de casonas ilegales en La Parguera y las nuevas dificultades al acceso a la información pública.", fuente: "Prensa Latina, 26/dic/2025" },
    ] },
  { id: "pol-016", name: "Adrián González Costa", party: "PIP", position: "Senador por Acumulación · PIP", totalReceived: 0,
    donations: [], legislation: ["leg-005", "leg-006"],
    statements: [
      { date: "2025-01", texto: "Coautor de la RS9. 'Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia. La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12", texto: "Junto a la delegación del PIP denunció que la determinación de la OGPe para Esencia fue emitida deliberadamente durante las fiestas de Navidad para acortar el período práctico de respuesta de grupos científicos y comunitarios.", fuente: "San Juan Daily Star, dic 2025" },
    ] },
];

const LEGISLATION = [
  {
    id: "leg-001",
    title: "Decreto de Exención Contributiva – Cabo Rojo Land Acquisition LLC",
    subtitle: "Ley de Desarrollo Turístico de PR (incorporada a Ley 60-2019) / Ley 74 de 2010",
    type: "Decreto contributivo",
    date: "Dic 2020", dateAmended: "2024",
    status: "Vigente (enmendado 2024)",
    administraciones: ["Wanda Vázquez Garced (decreto original, dic 2020)", "Pedro Pierluisi (enmienda 2024)"],
    description: "La Compañía de Turismo de Puerto Rico otorgó a Cabo Rojo Land Acquisition LLC casi $498 millones en créditos contributivos para el componente hotelero del proyecto, más una exención de 10 años en impuestos estatales y municipales. El decreto fue otorgado a pesar de que la propia Compañía de Turismo luego reconoció que el proyecto es 'predominantemente residencial'.",
    monto: "~$498 millones en créditos contributivos + exención 10 años",
    source: "OGPe – Expediente DIA Esencia; CPI oct 2025; Decreto oficial Compañía de Turismo PR",
    certainty: "confirmado", impact: "directo",
  },
  {
    id: "leg-002",
    title: "Exención 90% en Aranceles y Sellos Notariales (parcelas Esencia)",
    subtitle: "Certificación de exención",
    type: "Certificación de exención",
    date: "2022", dateAmended: null,
    status: "Vigente",
    administraciones: ["Pedro Pierluisi"],
    description: "El proponente recibió una exención del 90% para el pago de aranceles y sellos notariales relacionados a ciertas parcelas del proyecto, mediante certificación firmada bajo la administración de Pedro Pierluisi.",
    monto: "No especificado públicamente",
    source: "CPI 'Esencia: un proyecto principalmente residencial con millones en privilegios contributivos turísticos' oct 2025",
    certainty: "confirmado", impact: "directo",
  },
  {
    id: "leg-003",
    title: "Solicitud de rediseño del proyecto – DRNA",
    subtitle: "Determinación regulatoria ambiental",
    type: "Determinación regulatoria",
    date: "2025", dateAmended: null,
    status: "En proceso",
    administraciones: ["Dept. de Recursos Naturales y Ambientales (DRNA)"],
    description: "El DRNA indicó que el proyecto debe presentar un rediseño que evidencie una redefinición sustancial de su huella ecológica e incluya un plan de conservación.",
    monto: "N/A",
    source: "Bonita Radio; CPI oct 2025",
    certainty: "confirmado", impact: "indirecto",
  },
  {
    id: "leg-004",
    title: "Anuncio de acuerdo con Universidad Ana G. Méndez",
    subtitle: "Currículo de hospitalidad en Cabo Rojo",
    type: "Acuerdo institucional",
    date: "Ene 2025", dateAmended: null,
    status: "Anunciado",
    administraciones: [],
    description: "Roberto Ruiz Vargas anunció un acuerdo con la Universidad Ana G. Méndez para expandir el currículo de hospitalidad, turismo y artes culinarias en el centro universitario de Cabo Rojo, vinculado al contexto del proyecto Esencia.",
    monto: "N/A",
    source: "CPI oct 2025",
    certainty: "confirmado", impact: "indirecto",
  },
  {
    id: "leg-005",
    title: "P.A. 114 – Código de Planificación y Permisos de Puerto Rico",
    subtitle: "Proyecto de Administración radicado por la Gobernadora Jenniffer González Colón",
    type: "Proyecto de ley (819 páginas)",
    date: "8 abr 2026", dateAmended: null,
    status: "En evaluación legislativa – Vistas públicas 13 abr 2026",
    administraciones: ["Jenniffer González Colón (autora)"],
    description: "Proyecto de 819 páginas que crea un Código unificado de Planificación y Permisos. Deroga más de 40 estatutos y consolida cerca de 100 leyes y reglamentos en un solo marco. Crea la Oficina Central de Permisos (OCP) como única entidad emisora de permisos. Elimina o reduce la jurisdicción del DRNA y el ICP sobre procesos de permisos — las responsabilidades del DRNA pasarían al DDEC bajo la OCP. Establece plazos máximos: permisos ministeriales en 24-48 horas; permisos discrecionales (incluyendo Declaración de Impacto Ambiental) en 180 días. Amplía la lista de proyectos 'exentos'. Fue preparado con insumo directo del sector privado (constructores, desarrolladores) y con respaldo de la Junta de Supervisión Fiscal. Rivera Schatz no acudió a la Conferencia Legislativa convocada por la gobernadora para discutirlo.\n\n⚠ CONEXIÓN CON ESENCIA: Un límite de 180 días para DIA y permisos discrecionales habría acelerado el proceso de Esencia — cuya DIA demoró años y fue objeto de señalamientos de deficiencias técnicas. La reducción de jurisdicción del DRNA debilitaría precisamente la agencia que ordenó el rediseño del proyecto.",
    monto: "N/A – Costo de implementación no precisado",
    source: "Metro PR 8/abr/2026; NotiCel 8/abr/2026 y 10/abr/2026; Primera Hora 8/abr/2026; El Nuevo Día 9/abr/2026; DDEC (ddec.pr.gov)",
    certainty: "confirmado", impact: "directo",
    criticas: [
      { quien: "Sen. María de Lourdes Santiago (PIP)", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido. Las varias enmiendas al sistema de otorgar permisos forman parte de un patrón que incluye la protección a casonas ilegales en La Parguera y las nuevas dificultades al acceso a la información pública.", fuente: "Prensa Latina, 26/dic/2025" },
      { quien: "Sen. Adrián González Costa (PIP)", texto: "La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras. Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia.", fuente: "El Vocero – RS9, ene 2025; San Juan Daily Star, dic 2025" },
    ],
  },
  {
    id: "leg-006",
    title: "P. del S. 1173 – Ley para Simplificar el Sistema de Permisos de Puerto Rico",
    subtitle: "Proyecto radicado por el Presidente del Senado Thomas Rivera Schatz (PNP)",
    type: "Proyecto de ley del Senado",
    date: "7 abr 2026", dateAmended: null,
    status: "En evaluación – Vista pública conjunta 13 abr 2026 (con P.A. 114)",
    administraciones: ["Thomas Rivera Schatz (autor)"],
    description: "Medida radicada por el presidente del Senado Thomas Rivera Schatz días antes del proyecto de la gobernadora. Comparte el diagnóstico del P.A. 114: simplificar y agilizar el sistema de permisos. Rivera Schatz convocó para el 13 de abril de 2026 una vista pública conjunta de ambos proyectos (P. del S. 1173 y P.A. 114, radicado como P. del S. 1183 en el Senado). El proyecto descansa en las recomendaciones del Comité que recoge los problemas de trámites y permisos. Rivera Schatz recibió $3,100 en donaciones de Roberto Ruiz Vargas (desarrollador de Esencia) y $3,100 adicionales de Will Bennett (CEE, 2024).\n\n⚠ CONEXIÓN CON ESENCIA: La aprobación de este proyecto, junto al P.A. 114, crearía un sistema de permisos con plazos fijos y jurisdicción reducida del DRNA — el mismo ente que ordenó el rediseño de Esencia. La simultaneidad de ambas medidas con el proceso activo de permisos del proyecto genera una preocupación de transparencia pública legítima.",
    monto: "N/A",
    source: "Primera Hora 9/abr/2026; NotiCel 9/abr/2026 (Rivera Schatz deja plantada a gobernadora); Metro PR 10/abr/2026",
    certainty: "confirmado", impact: "directo",
    criticas: [
      { quien: "Sen. María de Lourdes Santiago (PIP)", texto: "El gobierno actúa como lacayo a sueldo de los contribuyentes de su Partido Nuevo Progresista. La OGPe aprobó la DIA de Esencia en Nochebuena para acortar el período práctico de respuesta de grupos científicos y comunitarios.", fuente: "Prensa Latina, 26/dic/2025" },
      { quien: "Sen. Adrián González Costa (PIP)", texto: "Junto a Santiago y la delegación del PIP radicó la RS9 en enero 2025 exigiendo investigar el proceso de permisos de Esencia. La PIP también denunció que la determinación de la OGPe fue emitida deliberadamente durante las fiestas navideñas.", fuente: "El Vocero, 30/mar/2026; San Juan Daily Star, dic 2025" },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const CERT = {
  confirmado: { color: "#22c55e", bg: "rgba(34,197,94,0.08)", label: "✓ CONFIRMADO" },
  reportado: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", label: "◈ REPORTADO" },
  "en investigación": { color: "#ef4444", bg: "rgba(239,68,68,0.08)", label: "⚠ EN INVESTIGACIÓN" },
};
const IMPACT = { directo: { color: "#ef4444", label: "IMPACTO DIRECTO" }, indirecto: { color: "#f59e0b", label: "IMPACTO INDIRECTO" } };
const fmt = n => "$" + Number(n).toLocaleString("es-PR");
const getInv = id => INVESTORS.find(i => i.id === id);
const getPol = id => POLITICIANS.find(p => p.id === id);
const getLeg = id => LEGISLATION.find(l => l.id === id);
const totalDonated = INVESTORS.reduce((s, i) => s + i.totalDonated, 0);

function Badge({ c }) {
  const cfg = CERT[c] || CERT["en investigación"];
  return <span style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}33`, padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, fontWeight: 700 }}>{cfg.label}</span>;
}
function Tag({ children, color = "#6b7280" }) {
  return <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color, border: `1px solid ${color}44`, padding: "2px 7px", borderRadius: 2, textTransform: "uppercase", display: "inline-block" }}>{children}</span>;
}
function Sect({ title, children }) {
  return <div style={{ marginBottom: 28 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 3, height: 18, background: "#dc2626", flexShrink: 0 }} />
      <h3 style={{ margin: 0, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, color: "#6b7280", textTransform: "uppercase" }}>{title}</h3>
    </div>
    {children}
  </div>;
}
function Card({ children, onClick, style = {} }) {
  const [h, setH] = useState(false);
  return <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ background: h && onClick ? "#111827" : "#0a0a0a", border: `1px solid ${h && onClick ? "#374151" : "#1f2937"}`, borderRadius: 4, padding: "16px 20px", cursor: onClick ? "pointer" : "default", transition: "all 0.15s", ...style }}>
    {children}
  </div>;
}

// ─── NETWORK SVG ──────────────────────────────────────────────────────────────
function Network({ onInv, onPol }) {
  const [tip, setTip] = useState(null);
  const nodes = {
    "inv-001": { x: 100, y: 70,  label: "Ruiz Vargas", t: "investor" },
    "inv-002": { x: 100, y: 160, label: "Will Bennett", t: "investor" },
    "inv-003": { x: 100, y: 250, label: "Venkatesh", t: "investor" },
    "inv-004": { x: 100, y: 330, label: "Three Rules", t: "company" },
    "inv-005": { x: 100, y: 400, label: "Reuben Bros.", t: "company" },
    "inv-006": { x: 270, y: 230, label: "CRLA LLC", t: "entity" },
    "pol-001": { x: 460, y: 40,  label: "Rivera Schatz", t: "pol" },
    "pol-002": { x: 460, y: 110, label: "Matos García", t: "pol" },
    "pol-004": { x: 460, y: 180, label: "PNP", t: "pol" },
    "pol-005": { x: 460, y: 250, label: "JGC Gov.", t: "pol" },
    "pol-009": { x: 460, y: 320, label: "Romero Lugo", t: "pol" },
    "pol-010": { x: 460, y: 390, label: "Ramírez Kurtz", t: "pol" },
    "leg-001": { x: 620, y: 130, label: "$498M\nDecreto", t: "leg" },
    "leg-002": { x: 620, y: 290, label: "Exención\n90%", t: "leg" },
  };
  const ts = {
    investor: { fill: "#0f172a", stroke: "#3b82f6", r: 20 },
    company:  { fill: "#0f172a", stroke: "#1d4ed8", r: 18 },
    entity:   { fill: "#1a0a2e", stroke: "#a855f7", r: 22 },
    pol:      { fill: "#1a0000", stroke: "#dc2626", r: 20 },
    leg:      { fill: "#001500", stroke: "#22c55e", r: 18 },
  };
  const links = [
    { s: "inv-001", t: "inv-006", c: "#3b82f666", d: false },
    { s: "inv-002", t: "inv-006", c: "#3b82f666", d: false },
    { s: "inv-004", t: "inv-006", c: "#1d4ed866", d: false },
    { s: "inv-005", t: "inv-006", c: "#1d4ed866", d: false },
    { s: "inv-001", t: "pol-001", c: "#dc262666", d: false, lbl: "$3.1K" },
    { s: "inv-001", t: "pol-002", c: "#dc262666", d: false, lbl: "$3.1K" },
    { s: "inv-001", t: "pol-004", c: "#dc262666", d: false, lbl: "$3.1K" },
    { s: "inv-001", t: "pol-009", c: "#dc262666", d: false, lbl: "$3.1K" },
    { s: "inv-001", t: "pol-010", c: "#dc262666", d: false, lbl: "$3.1K" },
    { s: "inv-002", t: "pol-001", c: "#b91c1c66", d: true, lbl: "$3.1K" },
    { s: "inv-002", t: "pol-010", c: "#b91c1c66", d: true, lbl: "$3.1K" },
    { s: "inv-006", t: "leg-001", c: "#22c55e66", d: false },
    { s: "inv-006", t: "leg-002", c: "#22c55e66", d: false },
    { s: "pol-005", t: "leg-002", c: "#6b728066", d: true },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={700} height={450} style={{ display: "block" }}>
        <defs>
          {["red","blue","green","gray"].map(n => (
            <marker key={n} id={`a${n}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill={n === "red" ? "#dc262644" : n === "blue" ? "#3b82f644" : n === "green" ? "#22c55e44" : "#6b728044"} />
            </marker>
          ))}
        </defs>
        {links.map((l, i) => {
          const s = nodes[l.s], t = nodes[l.t];
          if (!s || !t) return null;
          const mn = l.c.includes("22c") ? "agreen" : l.c.includes("dc2") || l.c.includes("b91") ? "ared" : l.c.includes("6b7") ? "agray" : "ablue";
          return (
            <g key={i}>
              <line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={l.c} strokeWidth={1.5} strokeDasharray={l.d ? "5 4" : "none"} markerEnd={`url(#${mn})`} />
              {l.lbl && <text x={(s.x+t.x)/2} y={(s.y+t.y)/2-4} textAnchor="middle" fill="#4b5563" fontSize={8} fontFamily="monospace">{l.lbl}</text>}
            </g>
          );
        })}
        {Object.entries(nodes).map(([id, pos]) => {
          const s = ts[pos.t];
          const fullObj = INVESTORS.find(x => x.id === id) || POLITICIANS.find(x => x.id === id);
          const lines = pos.label.split("\n");
          return (
            <g key={id} style={{ cursor: fullObj ? "pointer" : "default" }}
              onClick={() => { if (INVESTORS.find(x => x.id === id)) onInv(INVESTORS.find(x => x.id === id)); if (POLITICIANS.find(x => x.id === id)) onPol(POLITICIANS.find(x => x.id === id)); }}
              onMouseEnter={() => setTip({ x: pos.x, y: pos.y, text: fullObj?.name || pos.label })}
              onMouseLeave={() => setTip(null)}
            >
              <circle cx={pos.x} cy={pos.y} r={s.r} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
              {lines.map((ln, li) => <text key={li} x={pos.x} y={pos.y + s.r + 11 + li * 10} textAnchor="middle" fill="#6b7280" fontSize={8} fontFamily="monospace">{ln}</text>)}
            </g>
          );
        })}
        {tip && <g>
          <rect x={Math.max(4, tip.x - 60)} y={tip.y - 34} width={130} height={22} rx={3} fill="#111827" stroke="#374151" />
          <text x={Math.max(4, tip.x - 60) + 8} y={tip.y - 18} fill="white" fontSize={9} fontFamily="monospace">{tip.text.substring(0, 20)}</text>
        </g>}
        {[["INV","#3b82f6","Inversionista"],["ENT","#a855f7","Entidad legal"],["POL","#dc2626","Político"],["LEY","#22c55e","Acción Gov."]].map(([s,c,l],i) => (
          <g key={s} transform={`translate(${8 + i * 170}, 435)`}>
            <circle r={7} fill="transparent" stroke={c} strokeWidth={1.5} /><text x={13} y={4} fill="#4b5563" fontSize={9} fontFamily="monospace">{l}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── INVESTOR PROFILE ─────────────────────────────────────────────────────────
function InvProfile({ inv, onBack }) {
  const donations = inv.donations.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
  const max = Math.max(...donations.map(d => d.amount), 1);
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "1px solid #374151", color: "#9ca3af", padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, marginBottom: 24 }}>← VOLVER</button>
      <div style={{ borderLeft: "3px solid #3b82f6", paddingLeft: 16, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontFamily: "'Georgia', serif" }}>{inv.name}</h2>
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}><Tag color="#3b82f6">{inv.type}</Tag><Badge c={inv.certeza} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[["Total donado (CEE)", fmt(inv.totalDonated), "#dc2626"],["# Donaciones", inv.donations.length, "#f59e0b"],["Entidades vinculadas", inv.relatedEntities.length, "#3b82f6"]].map(([l,v,c]) => (
          <Card key={l} style={{ textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div><div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 4, letterSpacing: 1 }}>{l.toUpperCase()}</div></Card>
        ))}
      </div>
      <Sect title="Rol en el proyecto Esencia"><Card><p style={{ margin: 0, color: "#d1d5db", lineHeight: 1.8, fontSize: 14 }}>{inv.role}</p></Card></Sect>
      {inv.relatedEntities.length > 0 && <Sect title="Entidades relacionadas"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{inv.relatedEntities.map(e => <Tag key={e} color="#6b7280">{e}</Tag>)}</div>{inv.executives.length > 0 && <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>{inv.executives.map(e => <Tag key={e} color="#9ca3af">👤 {e}</Tag>)}</div>}</Sect>}
      {donations.length > 0 && <Sect title="Donaciones políticas registradas (CEE)">
        {donations.map((d, i) => {
          const pol = getPol(d.recipient);
          const pc = pol?.party === "PNP" ? "#3b82f6" : "#dc2626";
          return (
            <div key={i} style={{ marginBottom: 18, borderLeft: "2px solid #1f2937", paddingLeft: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                <div>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{d.date}</span>
                  <span style={{ fontSize: 14, color: "white", marginLeft: 10, fontWeight: 600 }}>{pol?.name || d.recipient}</span>
                  {pol && <span style={{ marginLeft: 6 }}><Tag color={pc}>{pol.party}</Tag></span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#dc2626", fontFamily: "monospace", fontWeight: 700, fontSize: 16 }}>{fmt(d.amount)}</span>
                  <Badge c={d.certainty} />
                </div>
              </div>
              {d.comite && <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Comité: {d.comite}</div>}
              <div style={{ height: 3, background: "#1f2937", borderRadius: 2 }}><div style={{ height: 3, width: `${(d.amount/max)*100}%`, background: "#dc2626", borderRadius: 2 }} /></div>
              <div style={{ marginTop: 4, fontSize: 10, fontFamily: "monospace", color: "#4b5563" }}>📄 {d.source}</div>
            </div>
          );
        })}
      </Sect>}
      {inv.declaraciones?.length > 0 && <Sect title="Declaraciones públicas">
        {inv.declaraciones.map((d, i) => <Card key={i} style={{ borderLeft: "3px solid #f59e0b", marginBottom: 10 }}><div style={{ fontStyle: "italic", color: "#d1d5db", fontSize: 13, lineHeight: 1.7 }}>"{d.texto}"</div><div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", marginTop: 8 }}>{d.date} · {d.fuente}</div></Card>)}
      </Sect>}
      <Sect title="Fuentes de verificación"><Card><div style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280", lineHeight: 2 }}>📄 {inv.fuente}</div></Card></Sect>
    </div>
  );
}

// ─── POLITICIAN PROFILE ───────────────────────────────────────────────────────
function PolProfile({ pol, onBack }) {
  const pc = pol.party === "PNP" ? "#3b82f6" : pol.party === "PPD" ? "#dc2626" : "#6b7280";
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "1px solid #374151", color: "#9ca3af", padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, marginBottom: 24 }}>← VOLVER</button>
      <div style={{ borderLeft: `4px solid ${pc}`, paddingLeft: 16, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontFamily: "'Georgia', serif" }}>{pol.name}</h2>
        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{pol.position}</div>
        <div style={{ marginTop: 8 }}><Tag color={pc}>{pol.party}</Tag></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[["Total recibido (CEE)", fmt(pol.totalReceived), "#dc2626"],["# Donaciones", pol.donations.length, "#f59e0b"],["Acciones gubernamentales", pol.legislation.length, "#22c55e"]].map(([l,v,c]) => (
          <Card key={l} style={{ textAlign: "center" }}><div style={{ fontSize: 22, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div><div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 4, letterSpacing: 1 }}>{l.toUpperCase()}</div></Card>
        ))}
      </div>
      {pol.donations.length > 0 && <Sect title="Donaciones recibidas de vinculados a Esencia (CEE)">
        {pol.donations.map((d, i) => {
          const inv = getInv(d.donor);
          return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1f2937", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{d.date}</div>
              <div style={{ color: "white", fontWeight: 600, marginTop: 2 }}>{inv?.name}</div>
              {d.comite && <div style={{ fontSize: 11, color: "#9ca3af" }}>{d.comite}</div>}
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#4b5563", marginTop: 4 }}>📄 {d.source}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#dc2626", fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>{fmt(d.amount)}</div>
              <div style={{ marginTop: 4 }}><Badge c={d.certainty} /></div>
            </div>
          </div>;
        })}
      </Sect>}
      {pol.legislation.length > 0 && <Sect title="Acciones gubernamentales relacionadas al proyecto">
        {pol.legislation.map(lid => {
          const leg = getLeg(lid);
          if (!leg) return null;
          const ic = IMPACT[leg.impact];
          return <Card key={lid} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "white", fontWeight: 600 }}>{leg.title}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{leg.date} · {leg.status}</div>
                <p style={{ margin: "8px 0 0", fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>{leg.description.substring(0,200)}…</p>
                {leg.monto && leg.monto !== "N/A" && <div style={{ marginTop: 6, fontSize: 12, color: "#22c55e", fontFamily: "monospace", fontWeight: 700 }}>{leg.monto}</div>}
              </div>
              <Tag color={ic.color}>{ic.label}</Tag>
            </div>
          </Card>;
        })}
      </Sect>}
      {pol.statements.length > 0 && <Sect title="Declaraciones públicas">
        {pol.statements.map((s, i) => <Card key={i} style={{ borderLeft: "3px solid #f59e0b", marginBottom: 10 }}><div style={{ fontStyle: "italic", color: "#d1d5db", fontSize: 13, lineHeight: 1.7 }}>"{s.texto}"</div><div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", marginTop: 8 }}>{s.date} · {s.fuente}</div></Card>)}
      </Sect>}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashView({ onInv, onPol }) {
  const tl = [
    { date: "2019-03-25", e: "Se registra Cabo Rojo Land Acquisition LLC en el Dept. de Estado de PR", t: "legal" },
    { date: "2020-12", e: "Gobierno de Wanda Vázquez otorga decreto de exención contributiva a CRLA LLC (~$498M en créditos)", t: "gobierno" },
    { date: "2022", e: "Gobierno de Pierluisi emite exención del 90% en aranceles para parcelas del proyecto", t: "gobierno" },
    { date: "2022", e: "Will Bennett y Roberto Ruiz Vargas se establecen en Puerto Rico; fundan Three Rules Capital", t: "empresa" },
    { date: "2023", e: "Harish Venkatesh se une como tercer socio de Three Rules Capital", t: "empresa" },
    { date: "2024-05", e: "Anuncio público del proyecto Esencia (~$2,000M) en Boquerón, Cabo Rojo", t: "empresa" },
    { date: "2024", e: "Decreto contributivo original enmendado bajo administración de Pedro Pierluisi", t: "gobierno" },
    { date: "2024 – 2025", e: "Roberto Ruiz Vargas dona $30,700 a comités de ambos partidos (CEE verificado)", t: "donacion" },
    { date: "2024-11", e: "William Bennett dona $3,100 desde California al comité de Bobby Ramírez Kurtz (CEE)", t: "donacion" },
    { date: "2025-03", e: "Vistas públicas del EIS ante la OGPe en Cabo Rojo – fuerte oposición ciudadana", t: "legal" },
    { date: "2025", e: "DRNA requiere rediseño sustancial del proyecto por impacto ecológico (Bonita Radio / CPI)", t: "gobierno" },
  ];
  const tcol = { legal: "#a855f7", gobierno: "#22c55e", empresa: "#3b82f6", donacion: "#dc2626" };
  const topInv = INVESTORS.filter(i => i.totalDonated > 0).sort((a,b) => b.totalDonated - a.totalDonated);
  const topPol = POLITICIANS.filter(p => p.totalReceived > 0).sort((a,b) => b.totalReceived - a.totalReceived);
  const maxI = topInv[0]?.totalDonated || 1, maxP = topPol[0]?.totalReceived || 1;

  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[["Donaciones\nrastreadas (CEE)", fmt(totalDonated), "#dc2626"],["Políticos que\nrecibieron donaciones", POLITICIANS.filter(p=>p.totalReceived>0).length, "#f59e0b"],["Créditos contributivos\n(Cía. de Turismo)", "~$498M", "#22c55e"],["Inversión total\nanunciada", "~$2,000M", "#3b82f6"]].map(([l,v,c]) => (
        <Card key={l} style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div><div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 6, letterSpacing: 1, whiteSpace: "pre-line" }}>{l.toUpperCase()}</div></Card>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
      <Sect title="Top donantes vinculados a Esencia (CEE)">
        {topInv.map(inv => <div key={inv.id} onClick={() => onInv(inv)} style={{ cursor: "pointer", padding: "9px 0", borderBottom: "1px solid #1f2937" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, flexWrap: "wrap", gap: 4 }}>
            <span style={{ fontSize: 12, color: "#d1d5db" }}>{inv.name}</span>
            <span style={{ fontSize: 12, fontFamily: "monospace", color: "#dc2626", fontWeight: 700 }}>{fmt(inv.totalDonated)}</span>
          </div>
          <div style={{ height: 3, background: "#1f2937", borderRadius: 2 }}><div style={{ height: 3, width: `${(inv.totalDonated/maxI)*100}%`, background: "#dc2626", borderRadius: 2 }} /></div>
        </div>)}
      </Sect>
      <Sect title="Políticos – total recibido de vinculados a Esencia">
        {topPol.slice(0,9).map(pol => {
          const pc = pol.party === "PNP" ? "#3b82f6" : "#dc2626";
          return <div key={pol.id} onClick={() => onPol(pol)} style={{ cursor: "pointer", padding: "8px 0", borderBottom: "1px solid #1f2937" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, flexWrap: "wrap", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#d1d5db" }}>{pol.name} <span style={{ color: pc, fontSize: 10 }}>({pol.party})</span></span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#f59e0b", fontWeight: 700 }}>{fmt(pol.totalReceived)}</span>
            </div>
            <div style={{ height: 3, background: "#1f2937", borderRadius: 2 }}><div style={{ height: 3, width: `${(pol.totalReceived/maxP)*100}%`, background: "#f59e0b", borderRadius: 2 }} /></div>
          </div>;
        })}
      </Sect>
    </div>
    <Sect title="Línea de tiempo – eventos clave (datos verificados)">
      <div style={{ position: "relative", paddingLeft: 22 }}>
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "#1f2937" }} />
        {tl.map((ev, i) => <div key={i} style={{ position: "relative", marginBottom: 18 }}>
          <div style={{ position: "absolute", left: -17, top: 5, width: 10, height: 10, borderRadius: "50%", background: tcol[ev.t], border: "2px solid #050505" }} />
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280" }}>{ev.date}</div>
          <div style={{ fontSize: 13, color: "#d1d5db", marginTop: 2, lineHeight: 1.5 }}>{ev.e}</div>
        </div>)}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
          {[["Acción legal/permiso","#a855f7"],["Acción gubernamental","#22c55e"],["Empresa","#3b82f6"],["Donación política","#dc2626"]].map(([l,c]) => (
            <span key={l} style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280" }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c, marginRight: 4, verticalAlign: "middle" }} />{l}
            </span>
          ))}
        </div>
      </div>
    </Sect>
  </div>;
}

// ─── MEDIA VIEW ───────────────────────────────────────────────────────────────
const MEDIA_CASES = [
  {
    id: "m-001",
    medio: "El Nuevo Día / Primera Hora",
    tipo: "Contenido patrocinado sin etiquetado claro",
    nivel: "alto",
    titulo: "\"Esencia ajusta sus planes de desarrollo para minimizar su huella ambiental\"",
    fecha: "2025",
    descripcion: "Artículo publicado bajo la sección 'Brand Studio' de El Nuevo Día, producido directamente por Three Rules Capital. El contenido replica las narrativas de los desarrolladores sobre impacto ambiental mínimo sin contraste periodístico independiente. La URL del artículo contiene el directorio '/brandstudio/three-rules-capital/', lo que confirma que es contenido pagado por los propios proyectistas.",
    url: "https://www.elnuevodia.com/brandstudio/three-rules-capital/notas/esencia-ajusta-sus-planes-de-desarrollo-para-minimizar-su-huella-ambiental/",
    evidencia: "URL del artículo contiene '/brandstudio/three-rules-capital/' — autoría de Three Rules Capital",
    certainty: "confirmado",
    contrasten: "El CPI documentó que el proyecto es 'predominantemente residencial', que la DIA carece de estudio hidrológico y que el DRNA ordenó un rediseño sustancial por impacto ecológico — directamente contradictorio con la narrativa del artículo.",
  },
  {
    id: "m-002",
    medio: "Metro Puerto Rico",
    tipo: "Uso de artista opositora para generar cobertura favorable a desarrolladores",
    nivel: "alto",
    titulo: "\"Recurso agua: ¿Cómo se plantea su manejo en Esencia?\"",
    fecha: "09 abril 2026",
    descripcion: "El artículo fue producido bajo la 'editora invitada' Kany García — artista públicamente opositora al proyecto Esencia. Sin embargo, el contenido le da plataforma principal al desarrollador Roberto Ruiz Vargas para exponer su narrativa sobre el manejo del agua, con mínimo balance crítico. La organización Para la Naturaleza y comunidades afectadas sí son citadas al final, pero el eje central es la voz del proyectista. Activistas señalaron en redes que el nombre de Kany García fue usado para dar credibilidad a un artículo que en esencia amplifica el greenwashing de los desarrolladores.",
    url: "https://www.metro.pr/noticias/2026/04/09/recurso-agua-como-se-plantea-su-manejo-en-esencia/",
    evidencia: "Metro PR, 9/abr/2026 — Artículo atribuido a 'editora invitada Kany García'; contenido principal da voz al COO Roberto Ruiz Vargas",
    certainty: "confirmado",
    contrasten: "La propia DIA reconoció que el predio no cuenta con infraestructura de agua potable. La AAA dijo no tener capacidad para abastecer el proyecto. El Senado aprobó dos resoluciones para investigar la viabilidad hídrica (Metro PR, 30 mar 2026). Activistas señalan que solo identificaron 'un solo pozo' como fuente.",
  },
  {
    id: "m-003",
    medio: "Metro Puerto Rico",
    tipo: "Censura de columna de opinión",
    nivel: "crítico",
    titulo: "Columna de la Lcda. Rosa Seguí — publicada y luego retirada",
    fecha: "Previo a marcha del 28 de marzo 2026",
    descripcion: "Metro Puerto Rico publicó y posteriormente retiró una columna de la licenciada Rosa Seguí (portavoz del Movimiento Victoria Ciudadana) que denunciaba los efectos ecológicos, económicos y sociales del proyecto Esencia, basada en investigaciones del CPI y estudios científicos. Seguí declaró públicamente: 'Es muy peligroso que nos hayan censurado. La columna era una forma de libertad de expresión y estaba basada en investigaciones del Centro de Periodismo Investigativo... Además de que representa una censura para el partido. La única columna censurada pertenecía a una portavoz del Movimiento Victoria Ciudadana.'",
    url: "https://www.facebook.com/share/1Cy91dEHSG/",
    evidencia: "Declaración directa de la Lcda. Rosa Seguí; reportado por Resumen Latinoamericano (5/abr/2026) en cobertura posterior a la marcha del 28/mar/2026",
    certainty: "confirmado",
    contrasten: "Metro PR publicó el mismo día (9/abr/2026) un artículo que amplifica la narrativa del desarrollador sobre el agua. El contraste entre la censura de una voz crítica y la publicación de contenido favorable a los proyectistas es documentado y verificable.",
  },
  {
    id: "m-004",
    medio: "InDiario",
    tipo: "Artículo de ataque contra opositor al proyecto usando fuentes anónimas",
    nivel: "medio",
    titulo: "\"Acusan a Gabo Ramos de payoleo\"",
    fecha: "26 marzo 2026",
    descripcion: "InDiario publicó un artículo acusando al creador de contenido Gabo Ramos — quien produce contenido crítico sobre el proyecto Esencia — de recibir pagos no divulgados ('payola') para promover narrativas contra el proyecto. Las alegaciones provienen exclusivamente de 'fuentes anónimas del ecosistema digital'. El artículo no presenta evidencia documental, contratos ni registros de pagos. El propio InDiario reconoce que la respuesta pública de Ramos 'no desmintió las alegaciones' pero tampoco las confirma. El patrón de publicar ataques contra críticos del proyecto sin evidencia documental es consistente con estrategias de desacreditación.",
    url: "https://indiario.com/noticias/acusan-a-gabo-ramos-de-payoleo",
    evidencia: "InDiario, 26/mar/2026 — Artículo basado en fuentes anónimas sin evidencia documental",
    certainty: "reportado",
    contrasten: "El CPI ya documentó que los propios desarrolladores pagaron anuncios en La Voz Digital y crearon cuentas anónimas como 'Conoce la verdad' para promover el proyecto antes de las vistas públicas (CPI, mar 2025). La estrategia de atacar críticos contrasta con el uso documentado de publicidad pagada por los proyectistas.",
  },
  {
    id: "m-005",
    medio: "La Diestra",
    tipo: "Contenido editorial que defiende el proyecto sin fuentes verificables",
    nivel: "medio",
    titulo: "\"Derrumbamos Mitos En Contra de Esencia... Otra Vez\"",
    fecha: "2 abril 2026",
    descripcion: "La Diestra, medio digital de orientación política conservadora, publicó contenido editorial bajo la firma 'Beto Arroyo / Beto Podcast' que enmarca la oposición a Esencia como argumentos de 'influencers y activistas' versus 'realidad técnica y legal'. El artículo no cita estudios ambientales independientes ni documentos del expediente OGPe. Tampoco menciona la determinación del DRNA de requerir un rediseño, ni los hallazgos del CPI sobre las deficiencias de la DIA.",
    url: "https://www.ladiestra.com/noticias/derrumbamos-mitos-en-contra-de-esencia-otra-vez",
    evidencia: "La Diestra, 2/abr/2026 — Contenido editorial sin fuentes primarias verificables",
    certainty: "confirmado",
    contrasten: "Exintegrantes de la Junta de Planificación documentaron ante la OGPe que la DIA carece de estudio hidrológico. El DRNA ordenó un rediseño. El Senado aprobó dos resoluciones de investigación. Más de 70 organizaciones participaron en la marcha del 28/mar/2026 en el Viejo San Juan.",
  },
  {
    id: "m-006",
    medio: "Medios pagados / Cuentas anónimas (CPI documentado)",
    tipo: "Campaña de comunicación pagada previo a vistas públicas",
    nivel: "alto",
    titulo: "Anuncios en La Voz Digital + cuenta anónima 'Conoce la verdad'",
    fecha: "Previo a marzo 2025",
    descripcion: "El CPI documentó que unos días antes de las vistas públicas de la OGPe, los proponentes del proyecto comenzaron a pagar anuncios en medios de comunicación locales como La Voz Digital para mejorar la percepción del proyecto. También surgieron cuentas en redes sociales y páginas web anónimas como 'Conoce la verdad' (conocelaverdad.com) para promover Esencia. El equipo de relaciones públicas del proyecto incluye a Daniel 'Danny' Hernández (exoficial de prensa del expresidente de la Cámara, Jaime Perelló) y Misael Vargas (oficial de prensa del Municipio de Hormigueros y varios legisladores).",
    url: "https://periodismoinvestigativo.com/2025/03/vistas-publicas-esencia-cabo-rojo/",
    evidencia: "CPI 'Las miradas silenciosas del proyecto Esencia' (mar 2025) — reportado por periodista Luis Joel Meléndez González",
    certainty: "confirmado",
    contrasten: "N/A — este es el caso documentado de campaña de comunicación pagada por los propios desarrolladores.",
  },
];

const NIVEL_CONFIG = {
  crítico: { color: "#dc2626", bg: "rgba(220,38,38,0.1)", label: "🚨 NIVEL CRÍTICO" },
  alto:    { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "⚠ NIVEL ALTO" },
  medio:   { color: "#6b7280", bg: "rgba(107,114,128,0.1)", label: "◈ NIVEL MEDIO" },
};

function MediaView() {
  const [filter, setFilter] = useState("todos");
  const filtered = MEDIA_CASES.filter(m => filter === "todos" ? true : m.nivel === filter);

  return (
    <div>
      <div style={{ background: "#0a0a0a", border: "1px solid #374151", borderLeft: "3px solid #dc2626", borderRadius: 4, padding: "14px 18px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.8 }}>
          Esta sección documenta casos verificados o reportados de <strong style={{ color: "white" }}>cobertura mediática favorable a los desarrolladores</strong>, incluyendo contenido patrocinado, censura de voces críticas y campañas de comunicación pagadas. Toda información incluye fuente y nivel de certeza.
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          ["Casos documentados", MEDIA_CASES.length, "#dc2626"],
          ["Medios implicados", "5", "#f59e0b"],
          ["Censura confirmada", "1", "#dc2626"],
          ["Contenido patrocinado", "1", "#f59e0b"],
        ].map(([l, v, c]) => (
          <Card key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: c, fontFamily: "monospace" }}>{v}</div>
            <div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginTop: 4, letterSpacing: 1, whiteSpace: "pre-line" }}>{l.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["todos", "crítico", "alto", "medio"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#dc2626" : "transparent", color: filter === f ? "white" : "#6b7280", border: `1px solid ${filter === f ? "#dc2626" : "#374151"}`, padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>
            {f}
          </button>
        ))}
      </div>

      {filtered.map(m => {
        const nc = NIVEL_CONFIG[m.nivel];
        return (
          <Card key={m.id} style={{ marginBottom: 16, borderLeft: `3px solid ${nc.color}` }}>
            {/* Header */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: nc.color, background: nc.bg, border: `1px solid ${nc.color}33`, padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, fontWeight: 700 }}>{nc.label}</span>
              <Tag color="#6b7280">{m.tipo}</Tag>
              <Badge c={m.certainty} />
            </div>

            {/* Medio + fecha */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626", fontFamily: "monospace" }}>{m.medio}</div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{m.fecha}</div>
            </div>

            {/* Título del artículo */}
            <div style={{ fontSize: 14, color: "white", fontStyle: "italic", marginBottom: 10, lineHeight: 1.5 }}>{m.titulo}</div>

            {/* Descripción */}
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#9ca3af", lineHeight: 1.8 }}>{m.descripcion}</p>

            {/* Evidencia */}
            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 3, padding: "10px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#f59e0b", letterSpacing: 1, marginBottom: 4 }}>📌 EVIDENCIA</div>
              <div style={{ fontSize: 12, color: "#d1d5db" }}>{m.evidencia}</div>
              {m.url && (
                <div style={{ marginTop: 6, fontSize: 10, fontFamily: "monospace", color: "#4b5563", wordBreak: "break-all" }}>
                  🔗 <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none" }}>{m.url}</a>
                </div>
              )}
            </div>

            {/* Contraste */}
            {m.contrasten && m.contrasten !== "N/A — este es el caso documentado de campaña de comunicación pagada por los propios desarrolladores." && (
              <div style={{ background: "#0a1a0a", border: "1px solid #1f2937", borderLeft: "3px solid #22c55e", borderRadius: 3, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: "#22c55e", letterSpacing: 1, marginBottom: 4 }}>🔎 CONTRASTE CON DATOS VERIFICADOS</div>
                <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.7 }}>{m.contrasten}</div>
              </div>
            )}
          </Card>
        );
      })}

      {/* Nota metodológica */}
      <div style={{ marginTop: 24, background: "#0a0a0a", border: "1px solid #1f2937", borderRadius: 4, padding: "14px 18px" }}>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", letterSpacing: 1, marginBottom: 8 }}>NOTA METODOLÓGICA</div>
        <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8 }}>
          Esta sección documenta hechos verificables sobre cobertura mediática: contenido patrocinado identificado por URL, censura de columnas de opinión declarada públicamente por la autora, y campañas de comunicación pagadas documentadas por el CPI. No se realizan alegaciones sobre intención editorial sin evidencia. Los casos marcados como "reportado" están basados en fuentes periodísticas verificadas pero sin confirmación documental directa adicional.
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [selInv, setSelInv] = useState(null);
  const [selPol, setSelPol] = useState(null);
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);
  const [legFilter, setLegFilter] = useState("todos");

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const goInv = inv => { setSelInv(inv); setSelPol(null); setTab("investors"); };
  const goPol = pol => { setSelPol(pol); setSelInv(null); setTab("politicians"); };

  const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "search", label: "Buscar" },
    { id: "investors", label: "Inversionistas" },
    { id: "politicians", label: "Políticos" },
    { id: "legislation", label: "Acciones Gov." },
    { id: "network", label: "Red" },
    { id: "media", label: "⚠ Medios" },
  ];

  const searchResults = q.trim().length < 2 ? [] : [
    ...INVESTORS.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.relatedEntities.some(e => e.toLowerCase().includes(q.toLowerCase()))).map(i => ({ type: "investor", item: i })),
    ...POLITICIANS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.party.toLowerCase().includes(q.toLowerCase()) || p.position.toLowerCase().includes(q.toLowerCase())).map(p => ({ type: "politician", item: p })),
    ...LEGISLATION.filter(l => l.title.toLowerCase().includes(q.toLowerCase())).map(l => ({ type: "legislation", item: l })),
  ];

  const filteredLeg = LEGISLATION.filter(l => legFilter === "todos" ? true : l.impact === legFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "white", fontFamily: "'Georgia', serif", opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}>
      {/* HEADER */}
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
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "#4b5563", letterSpacing: 1, lineHeight: 1.8 }}>Datos: CEE · CPI · Bonita Radio · Registro Corporativo PR<br /><span style={{ color: "#374151" }}>Toda la información proviene de fuentes públicas verificables</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); if (t.id !== "investors") setSelInv(null); if (t.id !== "politicians") setSelPol(null); }}
                style={{ background: "none", border: "none", borderBottom: tab === t.id ? "2px solid #dc2626" : "2px solid transparent", color: tab === t.id ? "white" : "#6b7280", padding: "13px 16px", cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", marginBottom: -1, transition: "color 0.15s" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ background: "#0a0a0a", border: "1px solid #1f2937", borderLeft: "3px solid #f59e0b", borderRadius: 4, padding: "10px 16px", marginBottom: 24, fontSize: 11, fontFamily: "monospace", color: "#6b7280", lineHeight: 1.7 }}>
          ⚠️ <strong style={{ color: "#f59e0b" }}>AVISO LEGAL:</strong> Toda la información proviene de fuentes públicas verificables: Comisión Estatal de Elecciones (CEE), Registro Corporativo del Dept. de Estado de PR, expediente OGPe, y reportajes del Centro de Periodismo Investigativo (CPI) y Bonita Radio. Esta plataforma es de carácter informativo y no realiza alegaciones sin evidencia documental. No constituye asesoramiento legal.
        </div>

        {tab === "dashboard" && <DashView onInv={goInv} onPol={goPol} />}

        {tab === "search" && <div>
          <div style={{ position: "relative", marginBottom: 20 }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre, empresa, partido, legislación…"
              style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 4, padding: "14px 14px 14px 42px", color: "white", fontFamily: "monospace", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontSize: 16 }}>🔍</span>
          </div>
          {q.length >= 2 && searchResults.length === 0 && <div style={{ textAlign: "center", color: "#6b7280", fontFamily: "monospace", fontSize: 13, padding: 32 }}>Sin resultados para "{q}"</div>}
          {searchResults.map((r, i) => {
            const colors = { investor: "#3b82f6", politician: "#dc2626", legislation: "#22c55e" };
            const labels = { investor: "INVERSIONISTA / EMPRESA", politician: "POLÍTICO / ENTIDAD", legislation: "ACCIÓN GUBERNAMENTAL" };
            return <Card key={i} onClick={() => { if (r.type === "investor") goInv(r.item); if (r.type === "politician") goPol(r.item); }} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <Tag color={colors[r.type]}>{labels[r.type]}</Tag>
                  <div style={{ fontSize: 15, color: "white", fontWeight: 600, marginTop: 6 }}>{r.item.name || r.item.title}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{r.type === "investor" ? r.item.type : r.type === "politician" ? `${r.item.party} · ${r.item.position}` : r.item.date}</div>
                </div>
                {r.type === "investor" && r.item.totalDonated > 0 && <div style={{ fontSize: 14, fontFamily: "monospace", color: "#dc2626", fontWeight: 700 }}>{fmt(r.item.totalDonated)}</div>}
                {r.type === "politician" && <div style={{ fontSize: 14, fontFamily: "monospace", color: "#f59e0b", fontWeight: 700 }}>{fmt(r.item.totalReceived)}</div>}
              </div>
            </Card>;
          })}
          {q.length < 2 && <div style={{ color: "#374151", fontSize: 12, fontFamily: "monospace", textAlign: "center", padding: 32 }}>Escribe al menos 2 caracteres</div>}
        </div>}

        {tab === "investors" && !selInv && <div>
          <div style={{ marginBottom: 20, fontSize: 11, fontFamily: "monospace", color: "#6b7280", letterSpacing: 1 }}>{INVESTORS.length} ENTIDADES REGISTRADAS · Haz clic para ver el perfil completo</div>
          {INVESTORS.map(inv => <Card key={inv.id} onClick={() => setSelInv(inv)} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}><Tag color="#3b82f6">{inv.type}</Tag><Badge c={inv.certeza} /></div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{inv.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{inv.relatedEntities.join(" · ")}</div>
              </div>
              {inv.totalDonated > 0 && <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontFamily: "monospace", color: "#dc2626", fontWeight: 700 }}>{fmt(inv.totalDonated)}</div>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "#6b7280", marginTop: 2 }}>TOTAL DONADO (CEE)</div>
              </div>}
            </div>
          </Card>)}
        </div>}
        {tab === "investors" && selInv && <InvProfile inv={selInv} onBack={() => setSelInv(null)} />}

        {tab === "politicians" && !selPol && <div>
          <div style={{ marginBottom: 20, fontSize: 11, fontFamily: "monospace", color: "#6b7280", letterSpacing: 1 }}>{POLITICIANS.length} FIGURAS POLÍTICAS RASTREADAS · Haz clic para ver el perfil completo</div>
          {POLITICIANS.map(pol => {
            const pc = pol.party === "PNP" ? "#3b82f6" : pol.party === "PPD" ? "#dc2626" : "#6b7280";
            return <Card key={pol.id} onClick={() => setSelPol(pol)} style={{ marginBottom: 12, borderLeft: `3px solid ${pc}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{pol.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{pol.position}</div>
                  <div style={{ marginTop: 6 }}><Tag color={pc}>{pol.party}</Tag></div>
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

        {tab === "legislation" && <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {["todos", "directo", "indirecto"].map(f => <button key={f} onClick={() => setLegFilter(f)} style={{ background: legFilter === f ? "#dc2626" : "transparent", color: legFilter === f ? "white" : "#6b7280", border: `1px solid ${legFilter === f ? "#dc2626" : "#374151"}`, padding: "6px 14px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>)}
          </div>
          {filteredLeg.map(leg => {
            const ic = IMPACT[leg.impact];
            return <Card key={leg.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <Tag color="#6b7280">{leg.type}</Tag>
                <Tag color="#22c55e">{leg.status}</Tag>
                <Tag color={ic.color}>{ic.label}</Tag>
                <Badge c={leg.certainty} />
              </div>
              <div style={{ fontSize: 15, color: "white", fontWeight: 600 }}>{leg.title}</div>
              {leg.subtitle && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{leg.subtitle}</div>}
              <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>{leg.date}{leg.dateAmended ? ` · Enmendado: ${leg.dateAmended}` : ""}</div>
              {leg.administraciones?.length > 0 && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Administración(es): {leg.administraciones.join("; ")}</div>}
              <p style={{ margin: "10px 0 6px", fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>{leg.description}</p>
              {leg.monto && leg.monto !== "N/A" && <div style={{ fontSize: 14, color: "#22c55e", fontFamily: "monospace", fontWeight: 700, marginTop: 6 }}>💰 {leg.monto}</div>}
              <div style={{ marginTop: 10, fontSize: 10, fontFamily: "monospace", color: "#4b5563" }}>📄 {leg.source}</div>
              {leg.criticas && leg.criticas.length > 0 && (
                <div style={{ marginTop: 14, borderTop: "1px solid #1f2937", paddingTop: 14 }}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", color: "#dc2626", letterSpacing: 1, marginBottom: 10 }}>💬 VOCES CRÍTICAS VERIFICADAS</div>
                  {leg.criticas.map((c, ci) => (
                    <div key={ci} style={{ background: "#0a0a0a", border: "1px solid #1f2937", borderLeft: "3px solid #dc2626", borderRadius: 3, padding: "10px 14px", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#f59e0b", fontFamily: "monospace", fontWeight: 700, marginBottom: 4 }}>🏛 {c.quien}</div>
                      <div style={{ fontSize: 12, color: "#d1d5db", fontStyle: "italic", lineHeight: 1.7 }}>"{c.texto}"</div>
                      <div style={{ fontSize: 10, fontFamily: "monospace", color: "#4b5563", marginTop: 6 }}>📄 {c.fuente}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>;
          })}
        </div>}

        {tab === "media" && <MediaView />}

        {tab === "network" && <div>
          <div style={{ marginBottom: 14, fontSize: 12, color: "#6b7280", fontFamily: "monospace", lineHeight: 1.8 }}>
            Grafo de conexiones basado en datos verificados. Azul = inversionista/empresa. Púrpura = entidad legal. Rojo = político. Verde = acción gubernamental. Líneas sólidas = donaciones confirmadas CEE. Haz clic en nodos para ver perfiles.
          </div>
          <Card><Network onInv={goInv} onPol={goPol} /></Card>
          <div style={{ marginTop: 14, fontSize: 10, fontFamily: "monospace", color: "#374151", lineHeight: 1.8 }}>
            Fuentes: CEE · CPI 'Las miradas silenciosas del proyecto Esencia' (mar 2025) · CPI 'Empresas detrás de Esencia dejan rastro de daños' (jun 2025) · CPI 'Esencia: un proyecto principalmente residencial con millones en privilegios contributivos turísticos' (oct 2025)
          </div>
        </div>}
      </div>

      {/* VERIFICACIÓN BANNER */}
      <div style={{ background: "#0a0a0a", borderTop: "1px solid #1f2937", borderBottom: "1px solid #1f2937", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e88", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", letterSpacing: 2, textTransform: "uppercase" }}>Última verificación de datos</div>
              <div style={{ fontSize: 16, fontFamily: "monospace", color: "white", fontWeight: 700, marginTop: 2 }}>
                10 de abril de 2026
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", letterSpacing: 1 }}>FUENTES VERIFICADAS EN ESTA ACTUALIZACIÓN</div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#9ca3af", marginTop: 3 }}>
              CEE · CPI · Metro PR · InDiario · La Diestra · El Nuevo Día · Resumen Latinoamericano
            </div>
          </div>
        </div>

        {/* Historial de actualizaciones */}
        <div style={{ maxWidth: 1100, margin: "14px auto 0", borderTop: "1px solid #1f2937", paddingTop: 14 }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#4b5563", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Historial de actualizaciones</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { fecha: "10 abr 2026 · 8:00 PM", descripcion: "Se agregan P.A. 114 (Código de Planificación y Permisos, gobernadora JGC) y P. del S. 1173 (Rivera Schatz) con conexión directa a Esencia. Se incorporan perfiles de Sen. María de Lourdes Santiago y Sen. Adrián González Costa (PIP) con declaraciones verificadas.", tipo: "nuevo" },
              { fecha: "09 abr 2026 · 8:00 PM", descripcion: "Se agrega tab de Medios: artículo Brand Studio de El Nuevo Día, artículo Metro PR con Kany García, censura columna Rosa Seguí, InDiario vs. Gabo Ramos, La Diestra, campaña pagada CPI.", tipo: "nuevo" },
              { fecha: "09 abr 2026 · 12:00 PM", descripcion: "Datos reales integrados desde CEE y CPI: Roberto Ruiz Vargas ($30,700 donados), Will Bennett ($15,500), 11 políticos rastreados, decreto contributivo ~$498M, exención 90%.", tipo: "nuevo" },
              { fecha: "09 abr 2026 · 10:00 AM", descripcion: "Estructura inicial del dashboard. Datos mock sustituidos por información verificada de fuentes públicas.", tipo: "inicial" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.tipo === "nuevo" ? "#22c55e" : "#374151", marginTop: 5, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "#4b5563" }}>{item.fecha} — </span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280" }}>{item.descripcion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#000", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#374151", letterSpacing: 1, lineHeight: 2.4 }}>
          DETRÁS DE ESENCIA · PLATAFORMA DE TRANSPARENCIA CIUDADANA · PUERTO RICO<br />
          Fuentes primarias: Comisión Estatal de Elecciones (CEE) · Dept. de Estado PR · OGPe – Expediente DIA Esencia<br />
          Fuentes periodísticas: Centro de Periodismo Investigativo · Bonita Radio · NotiCel · The Real Deal · Bloomberg · Resumen Latinoamericano<br />
          <span style={{ color: "#1f2937" }}>Esta plataforma es informativa. No realiza alegaciones sin evidencia verificable. No constituye asesoramiento legal.</span>
        </div>
      </div>
    </div>
  );
}
