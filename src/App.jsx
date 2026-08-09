import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// DATOS — verificados, con fuente. No se editorializa dentro de estos datos.
// ═══════════════════════════════════════════════════════════════════════════

const INVESTORS = [
  {
    id: "inv-001", name: "Roberto Ruiz Vargas", type: "Individuo / Co-fundador",
    role: "Co-fundador y COO de Three Rules Capital. Portavoz principal de la ciudad privada Esencia. Descendiente de madre puertorriqueña y padre dominicano. Reside en Puerto Rico desde 2022.",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"], executives: [],
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
      { date: "2026-02-24", amount: 3300, recipient: "pol-021", comite: "", source: "Oficina del Contralor Electoral", certainty: "confirmado" },
    ],
    totalDonated: 34000, certeza: "confirmado",
    fuente: "Comisión Estatal de Elecciones (CEE); CPI 'Empresas detrás de Esencia dejan rastro de daños' jun 2025; NotiCel may 2024; Oficina del Contralor Electoral",
    declaraciones: [
      { date: "2024", texto: "El turismo de lujo es una forma de desarrollar minimizando la huella ambiental.", fuente: "Puerto Rico Real Estate Summit – CPI oct 2025" },
      { date: "2025-03", texto: "Desde el principio hemos mantenido comunicación abierta y disponible con los grupos de interés.", fuente: "CPI jun 2025" },
    ],
  },
  {
    id: "inv-002", name: "William (Will) Bennett", type: "Individuo / CEO",
    role: "CEO y co-fundador de Three Rules Capital. Reside en Puerto Rico desde 2022. Anterior director general y jefe de Desarrollo de Irongate (Costa Palmas, Los Cabos, México). También trabajó en Related (70 Vestry, Nueva York).",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC", "Reuben Brothers (socio)"], executives: [],
    donations: [
      { date: "2024-11-06", amount: 3100, recipient: "pol-010", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-011", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-004", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, recipient: "pol-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ],
    totalDonated: 15500, certeza: "confirmado",
    fuente: "CPI oct 2025; The Real Deal abr 2025; Reuben Brothers (perfil oficial)",
    declaraciones: [{ date: "2025", texto: "Somos como caballos con anteojeras, completamente enfocados en Esencia.", fuente: "The Real Deal, abr 2025" }],
  },
  {
    id: "inv-003", name: "Harish Venkatesh", type: "Individuo / Socio",
    role: "Tercer socio de Three Rules Capital. Se unió en 2023. Presente en las vistas públicas de la OGPe en Cabo Rojo (marzo 2025).",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"], executives: [], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "CPI 'Las miradas silenciosas del proyecto Esencia' mar 2025; The Real Deal abr 2025", declaraciones: [],
  },
  {
    id: "inv-004", name: "Three Rules Capital", type: "Empresa desarrolladora",
    role: "Firma detrás de la ciudad privada Esencia. Fundada por Will Bennett y Roberto Ruiz Vargas. Oficinas en Puerto Rico. Inversión total anunciada: ~$2,000 millones para construir dentro de Cabo Rojo.",
    executives: ["Will Bennett (CEO)", "Roberto Ruiz Vargas (COO)", "Harish Venkatesh (socio)"],
    relatedEntities: ["Cabo Rojo Land Acquisition LLC", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "NotiCel may 2024; The Real Deal abr 2025; CPI (múltiples reportajes 2025)", declaraciones: [],
  },
  {
    id: "inv-005", name: "Reuben Brothers", type: "Empresa inversionista",
    role: "Firma de inversión familiar británica. Co-financiadora de la ciudad privada Esencia. Fundada por David y Simon Reuben (patrimonio estimado ~$9.4B c/u, Forbes). JPMorgan Chase provee financiamiento adicional.",
    executives: ["David Reuben", "Simon Reuben", "Jamie Reuben"], relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"],
    donations: [], totalDonated: 0, certeza: "confirmado", fuente: "CPI jun 2025; The Real Deal abr 2025; Bloomberg may 2024", declaraciones: [],
  },
  {
    id: "inv-006", name: "Cabo Rojo Land Acquisition LLC", type: "Entidad legal del proyecto",
    role: "Entidad registrada en PR el 25 de marzo de 2019. Vehículo legal de Reuben Brothers y Three Rules Capital para levantar Esencia dentro de terreno de Cabo Rojo. Titular del decreto de exención contributiva de la Compañía de Turismo (~$498M).",
    executives: [], relatedEntities: ["Three Rules Capital", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "Registro Corporativo PR (Dept. de Estado); OGPe – Expediente DIA Esencia; CPI oct 2025", declaraciones: [],
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
    donations: [{ date: "2024-09-26", amount: 3100, donor: "inv-001", comite: "Comité Jesús Manuel Ortiz González, Inc.", source: "CEE sep 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-004", name: "Partido Nuevo Progresista (PNP)", party: "PNP", position: "Comité central del partido / Comité Municipal PNP San Juan", totalReceived: 6200,
    donations: [
      { date: "2025-06-29", amount: 3100, donor: "inv-001", comite: "Partido Nuevo Progresista", source: "CEE jun 2025 – transferencia electrónica", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: ["leg-001", "leg-002"], statements: [] },
  { id: "pol-005", name: "Jenniffer González Colón", party: "PNP", position: "Gobernadora de Puerto Rico", totalReceived: 1000,
    donations: [{ date: "2025-04-10", amount: 1000, donor: "inv-001", comite: "Comité Jenniffer González Colón Inc.", source: "CEE abr 2025", certainty: "confirmado" }], legislation: ["leg-002"], statements: [] },
  { id: "pol-006", name: "Carlos \"Johnny\" Méndez", party: "PNP", position: "Presidente de la Cámara de Representantes de Puerto Rico", totalReceived: 3100,
    donations: [{ date: "2025-06-26", amount: 3100, donor: "inv-001", comite: "Comité Amigos Johnny Méndez", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-007", name: "Virgilio Olivera Olivera", party: "PNP", position: "Alcalde de San Germán", totalReceived: 3000,
    donations: [{ date: "2025-06-24", amount: 3000, donor: "inv-001", comite: "Virgilio Olivera Olivera", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [],
    statements: [{ date: "2025-03", texto: "Participó en la vista pública de la OGPe y resaltó el impacto económico favorable del proyecto para la región suroeste.", fuente: "CPI jun 2025" }] },
  { id: "pol-008", name: "José Luis Dalmau Santiago", party: "PPD", position: "Senador / Exlíder del PPD", totalReceived: 3100,
    donations: [{ date: "2024-10-22", amount: 3100, donor: "inv-001", comite: "Comité Amigos José Luis Dalmau Santiago", source: "CEE oct 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-009", name: "Miguel Romero Lugo", party: "PNP", position: "Alcalde de San Juan", totalReceived: 3100,
    donations: [{ date: "2024-09-30", amount: 3100, donor: "inv-001", comite: "Comité Miguel Romero Lugo", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-010", name: "Roberto 'Bobby' Ramírez Kurtz", party: "PPD", position: "Exalcalde de Cabo Rojo", totalReceived: 6200,
    donations: [
      { date: "2024-10-04", amount: 3100, donor: "inv-001", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-11-06", amount: 3100, donor: "inv-002", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California nov 2024", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-011", name: "Tatiana Pérez Ramírez", party: "PNP", position: "Representante PNP (al largo)", totalReceived: 3100,
    donations: [{ date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-012", name: "Jorge Morales Wiscovitch", party: "PNP", position: "Alcalde de Cabo Rojo", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2025-03", texto: "Esencia generará empleos para los caborrojeños, especialmente durante la construcción.", fuente: "CPI ago 2025" },
      { date: "2025-03", texto: "No queremos una buena economía a expensas del daño ambiental.", fuente: "CPI ago 2025" },
    ] },
  { id: "pol-013", name: "Wanda Vázquez Garced", party: "PNP", position: "Exgobernadora de Puerto Rico", totalReceived: 0, donations: [], legislation: ["leg-001"],
    statements: [{ date: "2020-12", texto: "Bajo su administración se otorgó el decreto de exención contributiva original a Cabo Rojo Land Acquisition LLC (Compañía de Turismo).", fuente: "CPI oct 2025" }] },
  { id: "pol-014", name: "Pedro Pierluisi", party: "PNP", position: "Exgobernador de Puerto Rico", totalReceived: null,
    donations: [{ date: "No especificada", amount: null, donor: null, donorName: "Vinculado(s) a Esencia (fuente no especifica monto ni donante exacto)", comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }],
    legislation: ["leg-001", "leg-002"],
    statements: [{ date: "2024", texto: "Bajo su administración se enmendó el decreto contributivo original y se emitió la exención del 90% en aranceles para parcelas del proyecto.", fuente: "CPI oct 2025" }] },
  { id: "pol-015", name: "María de Lourdes Santiago", party: "PIP", position: "Senadora · Vicepresidenta del PIP · EN CONTRA DEL PROYECTO ESENCIA", totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006"],
    statements: [
      { date: "2025-01", texto: "Coautora de la RS9 exigiendo investigar el proceso de permisos de Esencia. 'La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12-26", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido. Las varias enmiendas al sistema de otorgar permisos forman parte de un patrón junto a la protección de casonas ilegales en La Parguera y las nuevas dificultades al acceso a la información pública.", fuente: "Prensa Latina, 26/dic/2025" },
    ] },
  { id: "pol-016", name: "Adrián González Costa", party: "PIP", position: "Senador por Acumulación · PIP · EN CONTRA DEL PROYECTO ESENCIA", totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006"],
    statements: [
      { date: "2025-01", texto: "Coautor de la RS9. 'Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia. La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12", texto: "Junto a la delegación del PIP denunció que la determinación de la OGPe para Esencia fue emitida deliberadamente durante las fiestas de Navidad para acortar el período práctico de respuesta de grupos científicos y comunitarios.", fuente: "San Juan Daily Star, dic 2025" },
    ] },
  { id: "pol-017", name: "Partido Popular Democrático (PPD)", party: "PPD", position: "Presidente del PPD: Pablo José Hernández Rivera · Comisionado Residente", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-03-23", texto: "Ese proyecto tiene que cumplir con todas las reglamentaciones ambientales y si cuenta con el cumplimiento de todas las leyes y reglamentaciones y con el respaldo local que, a mi juicio, quien mejor lo representa es el alcalde… entonces no veo correcto que desde San Juan o Washington se interfiera.", fuente: "Pablo José Hernández Rivera, Presidente del PPD – NotiCel, 23/mar/2026" },
      { date: "2026-03-23", texto: "A nivel institucional no se ha asumido una postura a favor o en contra del proyecto. Las opiniones en cuanto al futuro del proyecto, entiendo que hay diversas voces dentro del partido.", fuente: "Pablo José Hernández Rivera, Presidente del PPD – NotiCel, 23/mar/2026" },
    ] },
  { id: "pol-018", name: "Pablo José Hernández Rivera", party: "PPD", position: "Comisionado Residente de Puerto Rico · Presidente del PPD", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-03-23", texto: "Ese proyecto tiene que cumplir con todas las reglamentaciones ambientales y si cuenta con el cumplimiento de todas las leyes y reglamentaciones y con el respaldo local que, a mi juicio, quien mejor lo representa es el alcalde… entonces no veo correcto que desde San Juan o Washington se interfiera.", fuente: "NotiCel, 23/mar/2026" },
      { date: "2026-03-23", texto: "NOTA DE CONTEXTO: Es de conocimiento público que las leyes y regulaciones ambientales y de permisos están siendo modificadas por el gobierno de turno — incluyendo el P.A. 114 y el P. del S. 1173, que reducen la jurisdicción del DRNA y acortan los plazos de evaluación ambiental. En ese contexto, la declaración condicional de Hernández Rivera equivale a un apoyo efectivo al proyecto Esencia.", fuente: "Análisis basado en P.A. 114 (8/abr/2026), P. del S. 1173 (7/abr/2026) y declaraciones públicas documentadas" },
    ] },
  { id: "pol-019", name: "Gabriel \"Gaby\" Hernández Rodríguez", party: "PNP", position: "Alcalde de Camuy · Presidente de la Federación de Alcaldes de PR", totalReceived: 3000,
    donations: [{ date: "No especificada", amount: 3000, donor: null, donorName: "Vinculado(s) a Esencia (fuente no especifica cuál proyectista)", comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }], legislation: [], statements: [] },
  { id: "pol-020", name: "Gregorio Matías Rosario", party: "PNP", position: "Senador", totalReceived: 2500,
    donations: [{ date: "No especificada", amount: 2500, donor: null, donorName: "Vinculado(s) a Esencia (fuente no especifica cuál proyectista)", comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }], legislation: [], statements: [] },
  { id: "pol-021", name: "Axel \"Chino\" Roque", party: "PNP", position: "Presidente de la Comisión de Turismo · Legislador PNP", totalReceived: 3300,
    donations: [{ date: "2026-02-24", amount: 3300, donor: "inv-001", comite: "", source: "Oficina del Contralor Electoral", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-022", name: "Emilio Carlo", party: "PNP", position: "Representante del Distrito 20 (Cabo Rojo, Hormigueros, San Germán) · Cámara de Representantes", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-08-05", texto: "Tras más de un año de investigación y reuniones -incluyendo con la Coalición Defiende a Cabo Rojo, científicos, economistas y ambientalistas- concluyó que se opone al Proyecto Esencia.", fuente: "Conferencia de prensa, Plaza Ramón Emeterio Betances, Cabo Rojo, 5/ago/2026" },
      { date: "2026-08-05", texto: "Señaló que el alcalde de Cabo Rojo no se ha expresado en contra de Esencia, pese a haber emitido antes un endoso condicionado que exigía que la AAA garantizara el suministro de agua -algo que la propia AAA ha dicho no poder cumplir.", fuente: "Conferencia de prensa, Plaza Ramón Emeterio Betances, Cabo Rojo, 5/ago/2026" },
      { date: "2026-08-05", texto: "Al preguntársele qué acción legislativa concreta impulsaría desde la Cámara para detener el proyecto, respondió que permanecerá vigilante de cómo se mueve Esencia dentro de las agencias gubernamentales.", fuente: "Conferencia de prensa, Plaza Ramón Emeterio Betances, Cabo Rojo, 5/ago/2026" },
    ] },
];

const LEGISLATION = [
  { id: "leg-001", title: "Decreto de Exención Contributiva – Cabo Rojo Land Acquisition LLC", subtitle: "Ley de Desarrollo Turístico de PR (incorporada a Ley 60-2019) / Ley 74 de 2010", type: "Decreto contributivo", date: "Dic 2020", dateAmended: "2024", status: "Vigente (enmendado 2024)",
    administraciones: ["Wanda Vázquez Garced (decreto original, dic 2020)", "Pedro Pierluisi (enmienda 2024)"],
    description: "La Compañía de Turismo de Puerto Rico le regaló a Cabo Rojo Land Acquisition LLC casi $498 millones en créditos contributivos, más una exención de 10 años en impuestos estatales y municipales, para levantar Esencia dentro de Cabo Rojo. El decreto se otorgó a pesar de que la propia Compañía de Turismo luego reconoció que el proyecto es 'predominantemente residencial'.",
    monto: "~$498 millones en créditos contributivos + exención 10 años", source: "OGPe – Expediente DIA Esencia; CPI oct 2025; Decreto oficial Compañía de Turismo PR", certainty: "confirmado", impact: "directo" },
  { id: "leg-002", title: "Exención 90% en Aranceles y Sellos Notariales (parcelas Esencia)", subtitle: "Certificación de exención", type: "Certificación de exención", date: "2022", dateAmended: null, status: "Vigente",
    administraciones: ["Pedro Pierluisi"],
    description: "El proponente recibió una exención del 90% para el pago de aranceles y sellos notariales relacionados a las parcelas donde se pretende levantar Esencia, mediante certificación firmada bajo la administración de Pedro Pierluisi.",
    monto: "No especificado públicamente", source: "CPI 'Esencia: un proyecto principalmente residencial con millones en privilegios contributivos turísticos' oct 2025", certainty: "confirmado", impact: "directo" },
  { id: "leg-003", title: "Solicitud de rediseño del proyecto – DRNA", subtitle: "Determinación regulatoria ambiental", type: "Determinación regulatoria", date: "2025", dateAmended: null, status: "En proceso",
    administraciones: ["Dept. de Recursos Naturales y Ambientales (DRNA)"],
    description: "El DRNA determinó que el proyecto debe presentar un rediseño que evidencie una redefinición sustancial de su huella ecológica, después de reconocer el daño que causaría a los ecosistemas de Cabo Rojo.",
    monto: "N/A", source: "Bonita Radio; CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-004", title: "Anuncio de acuerdo con Universidad Ana G. Méndez", subtitle: "Currículo de hospitalidad en Cabo Rojo", type: "Acuerdo institucional", date: "Ene 2025", dateAmended: null, status: "Anunciado", administraciones: [],
    description: "Roberto Ruiz Vargas anunció un acuerdo con la Universidad Ana G. Méndez para expandir el currículo de hospitalidad, turismo y artes culinarias en el centro universitario de Cabo Rojo, como parte de la estrategia de relaciones públicas de Esencia.",
    monto: "N/A", source: "CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-005", title: "P.A. 114 – Código de Planificación y Permisos de Puerto Rico", subtitle: "Proyecto de Administración radicado por la Gobernadora Jenniffer González Colón", type: "Proyecto de ley (819 páginas)", date: "8 abr 2026", dateAmended: null, status: "En evaluación legislativa – Vistas públicas 13 abr 2026",
    administraciones: ["Jenniffer González Colón (autora)"],
    description: "Proyecto de 819 páginas que crea un Código unificado de Planificación y Permisos. Deroga más de 40 estatutos y consolida cerca de 100 leyes y reglamentos en un solo marco. Crea la Oficina Central de Permisos (OCP) como única entidad emisora de permisos. Elimina o reduce la jurisdicción del DRNA y el ICP sobre procesos de permisos — las responsabilidades del DRNA pasarían al DDEC bajo la OCP. Establece plazos máximos: permisos ministeriales en 24-48 horas; permisos discrecionales (incluyendo Declaración de Impacto Ambiental) en 180 días. Amplía la lista de proyectos 'exentos'. Fue preparado con insumo directo del sector privado (constructores, desarrolladores) y con respaldo de la Junta de Supervisión Fiscal. Rivera Schatz no acudió a la Conferencia Legislativa convocada por la gobernadora para discutirlo. ⚠ CONEXIÓN CON ESENCIA: Un límite de 180 días para DIA y permisos discrecionales habría acelerado el proceso que le abrió paso a Esencia — cuya DIA demoró años y fue objeto de señalamientos de deficiencias técnicas. La reducción de jurisdicción del DRNA debilitaría precisamente a la agencia que ordenó el rediseño del proyecto.",
    monto: "N/A – Costo de implementación no precisado", source: "Metro PR 8/abr/2026; NotiCel 8/abr/2026 y 10/abr/2026; Primera Hora 8/abr/2026; El Nuevo Día 9/abr/2026; DDEC (ddec.pr.gov)", certainty: "confirmado", impact: "directo",
    criticas: [
      { quien: "Sen. María de Lourdes Santiago (PIP)", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido. Las varias enmiendas al sistema de otorgar permisos forman parte de un patrón que incluye la protección a casonas ilegales en La Parguera y las nuevas dificultades al acceso a la información pública.", fuente: "Prensa Latina, 26/dic/2025" },
      { quien: "Sen. Adrián González Costa (PIP)", texto: "La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras. Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia.", fuente: "El Vocero – RS9, ene 2025; San Juan Daily Star, dic 2025" },
    ] },
  { id: "leg-006", title: "P. del S. 1173 – Ley para Simplificar el Sistema de Permisos de Puerto Rico", subtitle: "Proyecto radicado por el Presidente del Senado Thomas Rivera Schatz (PNP)", type: "Proyecto de ley del Senado", date: "7 abr 2026", dateAmended: null, status: "En evaluación – Vista pública conjunta 13 abr 2026 (con P.A. 114)",
    administraciones: ["Thomas Rivera Schatz (autor)"],
    description: "Medida radicada por el presidente del Senado Thomas Rivera Schatz días antes del proyecto de la gobernadora. Comparte el diagnóstico del P.A. 114: simplificar y agilizar el sistema de permisos. Rivera Schatz convocó para el 13 de abril de 2026 una vista pública conjunta de ambos proyectos (P. del S. 1173 y P.A. 114, radicado como P. del S. 1183 en el Senado). El proyecto descansa en las recomendaciones del Comité que recoge los problemas de trámites y permisos. Rivera Schatz recibió $3,100 en donaciones de Roberto Ruiz Vargas (desarrollador de Esencia) y $3,100 adicionales de Will Bennett (CEE, 2024). ⚠ CONEXIÓN CON ESENCIA: La aprobación de este proyecto, junto al P.A. 114, crearía un sistema de permisos con plazos fijos y jurisdicción reducida del DRNA — el mismo ente que ordenó el rediseño de Esencia. La simultaneidad de ambas medidas con el proceso activo de permisos del proyecto genera una preocupación de transparencia pública legítima.",
    monto: "N/A", source: "Primera Hora 9/abr/2026; NotiCel 9/abr/2026 (Rivera Schatz deja plantada a gobernadora); Metro PR 10/abr/2026", certainty: "confirmado", impact: "directo",
    criticas: [
      { quien: "Sen. María de Lourdes Santiago (PIP)", texto: "El gobierno actúa como lacayo a sueldo de los contribuyentes de su Partido Nuevo Progresista. La OGPe aprobó la DIA de Esencia en Nochebuena para acortar el período práctico de respuesta de grupos científicos y comunitarios.", fuente: "Prensa Latina, 26/dic/2025" },
      { quien: "Sen. Adrián González Costa (PIP)", texto: "Junto a Santiago y la delegación del PIP radicó la RS9 en enero 2025 exigiendo investigar el proceso de permisos de Esencia. La PIP también denunció que la determinación de la OGPe fue emitida deliberadamente durante las fiestas navideñas.", fuente: "El Vocero, 30/mar/2026; San Juan Daily Star, dic 2025" },
    ] },
];

const INVESTOR_PHOTOS = {
  "inv-001": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/robertoruiz.jpg",
  "inv-002": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/will.jpg",
  "inv-003": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/harish.jpg",
};

const POLITICIAN_PHOTOS = {
  "pol-001": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/thomas.jpg",
  "pol-002": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/angel.jpg",
  "pol-003": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/jesus.jpg",
  "pol-004": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/pnp.jpg",
  "pol-005": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/jenniffer.jpg",
  "pol-006": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/johnny.jpg",
  "pol-007": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/virgilio.jpg",
  "pol-008": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/joseluis.png?v=2",
  "pol-009": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/miguel.jpg",
  "pol-010": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/bobby.jpg?v=2",
  "pol-011": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/tatiana.jpg",
  "pol-012": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/jorge.png",
  "pol-013": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/wanda.jpg",
  "pol-014": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/pedro.jpg",
  "pol-015": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/maria.jpg",
  "pol-016": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/adrian.jpg",
  "pol-017": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/ppd.jpg",
  "pol-018": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/pablo.jpg",
  "pol-019": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/gaby.jpg",
  "pol-020": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/gregorio.jpg",
  "pol-021": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/axel.jpg",
  "pol-022": "https://raw.githubusercontent.com/gaboramospr/detras-de-esencia/main/fotos/emilio.jpg",
};

const MEDIA_CASES = [
  { id: "m-001", medio: "El Nuevo Día / Primera Hora", tipo: "Contenido patrocinado sin etiquetado claro", nivel: "alto",
    titulo: "\"Esencia ajusta sus planes de desarrollo para minimizar su huella ambiental\"", fecha: "2025",
    descripcion: "Artículo publicado bajo la sección 'Brand Studio' de El Nuevo Día, producido directamente por Three Rules Capital. El contenido replica las narrativas de los desarrolladores sobre impacto ambiental mínimo sin contraste periodístico independiente. La URL del artículo contiene el directorio '/brandstudio/three-rules-capital/', lo que confirma que es contenido pagado por los propios proyectistas.",
    url: "https://www.elnuevodia.com/brandstudio/three-rules-capital/notas/esencia-ajusta-sus-planes-de-desarrollo-para-minimizar-su-huella-ambiental/",
    evidencia: "URL del artículo contiene '/brandstudio/three-rules-capital/' — autoría de Three Rules Capital", certainty: "confirmado",
    contrasten: "El CPI documentó que el proyecto es 'predominantemente residencial', que la DIA carece de estudio hidrológico y que el DRNA ordenó un rediseño sustancial por impacto ecológico — directamente contradictorio con la narrativa del artículo." },
  { id: "m-002", medio: "Metro Puerto Rico", tipo: "Uso de artista opositora para generar cobertura favorable a desarrolladores", nivel: "alto",
    titulo: "\"Recurso agua: ¿Cómo se plantea su manejo en Esencia?\"", fecha: "09 abril 2026",
    descripcion: "El artículo fue producido bajo la 'editora invitada' Kany García — artista públicamente opositora a Esencia. Sin embargo, el contenido le da plataforma principal al desarrollador Roberto Ruiz Vargas para exponer su narrativa sobre el manejo del agua, con mínimo balance crítico.",
    url: "https://www.metro.pr/noticias/2026/04/09/recurso-agua-como-se-plantea-su-manejo-en-esencia/",
    evidencia: "Metro PR, 9/abr/2026 — Artículo atribuido a 'editora invitada Kany García'; contenido principal da voz al COO Roberto Ruiz Vargas", certainty: "confirmado",
    contrasten: "La propia DIA reconoció que el predio no cuenta con infraestructura de agua potable. La AAA dijo no tener capacidad para abastecer el proyecto. El Senado aprobó dos resoluciones para investigar la viabilidad hídrica (Metro PR, 30 mar 2026)." },
  { id: "m-003", medio: "Metro Puerto Rico", tipo: "Censura de columna de opinión", nivel: "crítico",
    titulo: "Columna de la Lcda. Rosa Seguí — publicada y luego retirada", fecha: "Previo a marcha del 28 de marzo 2026",
    descripcion: "Metro Puerto Rico publicó y posteriormente retiró una columna de la licenciada Rosa Seguí (portavoz del Movimiento Victoria Ciudadana) que denunciaba los efectos ecológicos, económicos y sociales de Esencia. Seguí declaró: 'Es muy peligroso que nos hayan censurado.'",
    url: "https://www.facebook.com/share/1Cy91dEHSG/",
    evidencia: "Declaración directa de la Lcda. Rosa Seguí; reportado por Resumen Latinoamericano (5/abr/2026)", certainty: "confirmado",
    contrasten: "Metro PR publicó el mismo día (9/abr/2026) un artículo que amplifica la narrativa del desarrollador sobre el agua." },
  { id: "m-004", medio: "InDiario", tipo: "Artículo de ataque contra opositor al proyecto usando fuentes anónimas", nivel: "medio",
    titulo: "\"Acusan a Gabo Ramos de payoleo\"", fecha: "26 marzo 2026",
    descripcion: "InDiario publicó un artículo acusando al creador de contenido Gabo Ramos de recibir pagos no divulgados para promover narrativas contra el proyecto. Las alegaciones provienen exclusivamente de 'fuentes anónimas del ecosistema digital', sin evidencia documental.",
    url: "https://indiario.com/noticias/acusan-a-gabo-ramos-de-payoleo",
    evidencia: "InDiario, 26/mar/2026 — Artículo basado en fuentes anónimas sin evidencia documental", certainty: "reportado",
    contrasten: "El CPI ya documentó que los propios desarrolladores pagaron anuncios en La Voz Digital y crearon cuentas anónimas para promover el proyecto antes de las vistas públicas (CPI, mar 2025)." },
  { id: "m-005", medio: "La Diestra", tipo: "Contenido editorial que defiende el proyecto sin fuentes verificables", nivel: "medio",
    titulo: "\"Derrumbamos Mitos En Contra de Esencia... Otra Vez\"", fecha: "2 abril 2026",
    descripcion: "La Diestra publicó contenido editorial bajo la firma 'Beto Arroyo / Beto Podcast' que enmarca la oposición a Esencia como 'influencers y activistas' versus 'realidad técnica y legal', sin citar estudios ambientales independientes ni la determinación del DRNA.",
    url: "https://www.ladiestra.com/noticias/derrumbamos-mitos-en-contra-de-esencia-otra-vez",
    evidencia: "La Diestra, 2/abr/2026 — Contenido editorial sin fuentes primarias verificables", certainty: "confirmado",
    contrasten: "El DRNA ordenó un rediseño. El Senado aprobó dos resoluciones de investigación. Más de 70 organizaciones participaron en la marcha del 28/mar/2026." },
  { id: "m-007", medio: "Mets de Guaynabo – BSN", tipo: "Estrategia de imagen pública vía auspicio deportivo", nivel: "alto",
    titulo: "Esencia entra al BSN como auspiciador de los Mets de Guaynabo", fecha: "Temporada BSN 2026",
    descripcion: "El logo de Esencia aparece en las sillas del banquillo de los Mets durante la temporada 2026. Los dueños del equipo, Marc Grossman y Mark Linder, son residentes de PR; Grossman es beneficiario de la Ley 22/60 desde 2015. La COO del equipo confirmó que gran parte de los auspicios provienen de inversionistas bajo Ley 60.",
    url: "https://www.facebook.com/share/p/18VRJ3maE8/",
    evidencia: "Propietarios verificados (Wikipedia; metsbasketball.com dic 2019). Grossman beneficiario Ley 22/60: CPI jun 2021. Declaración directa de COO Lcda. Gabiangie Berríos.", certainty: "confirmado",
    contrasten: "El CPI (mar 2025) documentó anuncios pagados y cuentas anónimas como parte de la misma estrategia de imagen." },
  { id: "m-006", medio: "Medios pagados / Cuentas anónimas", tipo: "Campaña de comunicación pagada previo a vistas públicas", nivel: "alto",
    titulo: "Anuncios en La Voz Digital + cuenta anónima 'Conoce la verdad'", fecha: "Previo a marzo 2025",
    descripcion: "El CPI documentó que días antes de las vistas públicas de la OGPe, los proponentes comenzaron a pagar anuncios en La Voz Digital. También surgieron cuentas anónimas como 'Conoce la verdad' (conocelaverdad.com).",
    url: "https://periodismoinvestigativo.com/2025/03/vistas-publicas-esencia-cabo-rojo/",
    evidencia: "CPI 'Las miradas silenciosas del proyecto Esencia' (mar 2025) — periodista Luis Joel Meléndez González", certainty: "confirmado", contrasten: null },
  { id: "m-008", medio: "NEWS PR", tipo: "Posible conflicto de interés editorial — operador político no divulgado", nivel: "alto",
    titulo: "Félix Pérez Toro, creador de \"La Vieja Changa\", señalado como figura vinculada a NEWS PR", fecha: "Vigente",
    descripcion: "Félix Pérez Toro es un consultor político y de comunicaciones puertorriqueño conocido por manejar el personaje digital 'La Vieja Changa', activo desde hace más de una década en la discusión política de PR. En una entrevista de 2016, se describió a sí mismo como consultor político, militante del PNP y colaborador voluntario de campañas del PNP; el personaje fue descrito entonces como un 'trol' político. Su compañía Fénix One Group LLC ha tenido contratos con la Autoridad de los Puertos, ACAA y el Distrito del Centro de Convenciones; también tuvo un contrato personal con la CEE. En 2024, mientras mantenía un contrato de $28,000 con La Fortaleza, financió personalmente una campaña de vallas (~$6,000 declarados a la Oficina del Contralor Electoral) contra Manuel Natal, entonces candidato a la alcaldía de San Juan. Documentos de la Oficina del Contralor Electoral de 2016 muestran que la Junta de Contralores Electorales solicitó una declaración jurada a Pérez Toro en una investigación sobre alegaciones de pagos por operaciones digitales; esa solicitud, por sí sola, no implica irregularidad alguna. Pérez Toro ha sido señalado públicamente como figura vinculada a NEWS PR; su posición específica dentro del medio no está confirmada.",
    url: "",
    evidencia: "Entrevista NotiCel (2016); reportajes de NotiCel sobre contratos de Fénix One Group LLC; cobertura de Primera Hora sobre 'trolls' políticos; declaraciones de gastos ante la Oficina del Contralor Electoral (2024); documentos de la Oficina del Contralor Electoral (2016). Su vínculo con NEWS PR es, a la fecha, un señalamiento público sin confirmación documental del cargo exacto.",
    certainty: "reportado",
    contrasten: "La relación entre el historial de Pérez Toro como consultor y militante partidista y su alegado rol editorial en NEWS PR plantea una pregunta legítima de interés público sobre la línea editorial del medio frente a Esencia. Cualquier señalamiento de que una cobertura específica de NEWS PR sea falsa o engañosa requiere documentarse caso por caso." },
];

const TIMELINE = [
  { label: "2019", e: "Se registra Cabo Rojo Land Acquisition LLC", detail: "Entidad domiciliada en el Dept. de Estado de PR el 25 de marzo, como vehículo legal para levantar Esencia dentro de Cabo Rojo.", t: "legal", source: "Registro Corporativo PR" },
  { label: "DIC 2020", e: "El gobierno de Wanda Vázquez le regala el decreto de exención contributiva", detail: "Casi $498 millones en créditos contributivos, más 10 años de exención estatal y municipal, para una ciudad privada que ni siquiera existía todavía.", t: "gobierno", source: "Compañía de Turismo PR / CPI" },
  { label: "2022", e: "El gobierno de Pierluisi emite la exención del 90% en aranceles", detail: "Para ciertas parcelas donde se pretende construir Esencia.", t: "gobierno", source: "CPI oct 2025" },
  { label: "2022", e: "Bennett y Ruiz Vargas se establecen en Puerto Rico", detail: "Fundan Three Rules Capital para desarrollar la ciudad privada.", t: "empresa", source: "The Real Deal" },
  { label: "2023", e: "Harish Venkatesh se une como tercer socio", detail: "De Three Rules Capital.", t: "empresa", source: "CPI mar 2025" },
  { label: "MAY 2024", e: "Anuncio público de Esencia (~$2,000M)", detail: "En Boquerón, Cabo Rojo — una ciudad privada de lujo dentro de terreno caborrojeño.", t: "empresa", source: "NotiCel" },
  { label: "2024", e: "El decreto contributivo original es enmendado", detail: "Bajo la administración de Pedro Pierluisi.", t: "gobierno", source: "CPI oct 2025" },
  { label: "2024–25", e: "Roberto Ruiz Vargas dona $34,000 a comités de ambos partidos", detail: "Donaciones verificadas en la CEE y la Oficina del Contralor Electoral, incluyendo al Presidente de la Comisión de Turismo.", t: "donacion", source: "CEE / Contralor Electoral" },
  { label: "NOV 2024", e: "William Bennett dona $3,100 desde California", detail: "Al comité de Bobby Ramírez Kurtz.", t: "donacion", source: "CEE" },
  { label: "MAR 2025", e: "Vistas públicas del EIS ante la OGPe en Cabo Rojo", detail: "Con fuerte oposición ciudadana ante lo que representaría Esencia para las comunidades del área.", t: "legal", source: "CPI mar 2025" },
  { label: "2025", e: "El DRNA ordena rediseñar la ciudad privada", detail: "Por el impacto ecológico que provocaría en Cabo Rojo.", t: "gobierno", source: "Bonita Radio / CPI" },
  { label: "30 JUL 2026", e: "OGPe aprueba la consulta de ubicación", detail: "Fecha aproximada, reportada por fuente directa como 'el jueves de la semana pasada'; pendiente confirmar fecha exacta en el expediente oficial.", t: "gobierno", source: "Fuente directa, ago 2026" },
  { label: "5 AGO 2026", e: "El representante Emilio Carlo rompe el silencio y se opone públicamente", detail: "En conferencia de prensa en la Plaza Ramón Emeterio Betances, Cabo Rojo.", t: "gobierno", source: "Conferencia de prensa" },
  { label: "23 AGO 2026", e: "Marcha \"Cabo Rojo Es Nuestro\"", detail: "Convocada por la Coalición Defiende a Cabo Rojo — 2:00 PM, desde el semáforo de la intersección Carr. 100 y Carr. 308, bajo el lema \"Esencia No Va\".", t: "comunidad", source: "Defiende a Cabo Rojo" },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════
const CERT = {
  confirmado: { color: "#4ade80", label: "CONFIRMADO" },
  reportado: { color: "#fbbf24", label: "REPORTADO" },
  "en investigación": { color: "#f87171", label: "EN INVESTIGACIÓN" },
};
const TCOL = { legal: "#a78bfa", gobierno: "#4ade80", empresa: "#60a5fa", donacion: "#dc2626", comunidad: "#2dd4bf" };
const fmt = n => n == null ? "no especificado" : "$" + Number(n).toLocaleString("es-PR");
const getInv = id => INVESTORS.find(i => i.id === id);
const getPol = id => POLITICIANS.find(p => p.id === id);
const getLeg = id => LEGISLATION.find(l => l.id === id);
const totalDonated = INVESTORS.reduce((s, i) => s + i.totalDonated, 0);
const politiciansWithDonations = POLITICIANS.filter(p => p.totalReceived > 0).length;

function EsenciaMark({ children = "ESENCIA" }) {
  return <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", color: "#dc2626" }}>{children}</span>;
}
function SourceTag({ children }) {
  return <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, color: "#78716c", textTransform: "uppercase" }}>FUENTE → {children}</span>;
}
function CertMark({ c }) {
  const cfg = CERT[c] || CERT["en investigación"];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, color: cfg.color }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />{cfg.label}
  </span>;
}
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #292524 15%, #292524 85%, transparent)" }} />;
}
function SectionHead({ eyebrow, title, sub }) {
  return <div style={{ marginBottom: 48 }}>
    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, color: "#dc2626", marginBottom: 14, fontWeight: 700 }}>{eyebrow}</div>
    <h2 style={{ margin: 0, fontSize: "clamp(26px, 6vw, 46px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, lineHeight: 1.1, color: "#fafaf9", maxWidth: 780, letterSpacing: "-0.01em" }}>{title}</h2>
    {sub && <p style={{ marginTop: 16, fontSize: 16, color: "#a8a29e", lineHeight: 1.7, maxWidth: 640 }}>{sub}</p>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════════════════
// NETWORK
// ═══════════════════════════════════════════════════════════════════════════
function Network({ onSelectEdge, onSelectNode }) {
  const [hover, setHover] = useState(null);
  const nodes = {
    "inv-001": { x: 90, y: 60,  label: "Ruiz Vargas", t: "investor" },
    "inv-002": { x: 90, y: 150, label: "Will Bennett", t: "investor" },
    "inv-003": { x: 90, y: 240, label: "Venkatesh", t: "investor" },
    "inv-004": { x: 90, y: 320, label: "Three Rules", t: "company" },
    "inv-005": { x: 90, y: 390, label: "Reuben Bros.", t: "company" },
    "inv-006": { x: 255, y: 225, label: "CRLA LLC", t: "entity" },
    "pol-001": { x: 440, y: 30,  label: "Rivera Schatz", t: "pol" },
    "pol-002": { x: 440, y: 100, label: "Matos García", t: "pol" },
    "pol-004": { x: 440, y: 170, label: "PNP", t: "pol" },
    "pol-005": { x: 440, y: 240, label: "JGC Gov.", t: "pol" },
    "pol-009": { x: 440, y: 310, label: "Romero Lugo", t: "pol" },
    "pol-010": { x: 440, y: 380, label: "Ramírez Kurtz", t: "pol" },
    "leg-001": { x: 600, y: 120, label: "$498M Decreto", t: "leg" },
    "leg-002": { x: 600, y: 280, label: "Exención 90%", t: "leg" },
  };
  const ts = {
    investor: { fill: "#0c1220", stroke: "#60a5fa", r: 18 }, company: { fill: "#0c1220", stroke: "#3b82f6", r: 16 },
    entity: { fill: "#160c22", stroke: "#a78bfa", r: 20 }, pol: { fill: "#1a0a0a", stroke: "#dc2626", r: 18 }, leg: { fill: "#08150c", stroke: "#4ade80", r: 16 },
  };
  const links = [
    { s: "inv-001", t: "inv-006", c: "#60a5fa55", label: "vehículo legal común" },
    { s: "inv-002", t: "inv-006", c: "#60a5fa55", label: "vehículo legal común" },
    { s: "inv-004", t: "inv-006", c: "#3b82f655", label: "co-desarrolladora" },
    { s: "inv-005", t: "inv-006", c: "#3b82f655", label: "co-financiadora" },
    { s: "inv-001", t: "pol-001", c: "#dc262677", label: "$3,100 donado — CEE oct 2024" },
    { s: "inv-001", t: "pol-002", c: "#dc262677", label: "$3,100 donado — CEE oct 2024" },
    { s: "inv-001", t: "pol-004", c: "#dc262677", label: "$3,100 donado — CEE jun 2025" },
    { s: "inv-001", t: "pol-009", c: "#dc262677", label: "$3,100 donado — CEE sep 2024" },
    { s: "inv-001", t: "pol-010", c: "#dc262677", label: "$3,100 donado — CEE oct 2024" },
    { s: "inv-002", t: "pol-001", c: "#b91c1c77", label: "$3,100 donado — CEE 2024" },
    { s: "inv-002", t: "pol-010", c: "#b91c1c77", label: "$3,100 donado — CEE nov 2024" },
    { s: "inv-006", t: "leg-001", c: "#4ade8055", label: "titular del decreto — ~$498M" },
    { s: "inv-006", t: "leg-002", c: "#4ade8055", label: "titular de la exención 90%" },
    { s: "pol-005", t: "leg-002", c: "#78716c55", label: "administración vigente" },
  ];
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <svg width={680} height={430} style={{ display: "block", minWidth: 680 }}>
        {links.map((l, i) => {
          const s = nodes[l.s], t = nodes[l.t];
          const active = hover === i;
          return <g key={i} style={{ cursor: "pointer" }}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            onClick={() => onSelectEdge && onSelectEdge({ from: nodes[l.s].label, to: nodes[l.t].label, label: l.label })}>
            <line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={active ? "#fafaf9" : l.c} strokeWidth={active ? 2.5 : 1.3} />
          </g>;
        })}
        {Object.entries(nodes).map(([id, pos]) => {
          const s = ts[pos.t];
          const obj = INVESTORS.find(x => x.id === id) || POLITICIANS.find(x => x.id === id);
          return <g key={id} style={{ cursor: obj ? "pointer" : "default" }}
            onClick={() => obj && onSelectNode && onSelectNode(obj, INVESTORS.includes(obj) ? "inv" : "pol")}>
            <circle cx={pos.x} cy={pos.y} r={s.r} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
            <text x={pos.x} y={pos.y + s.r + 14} textAnchor="middle" fill="#a8a29e" fontSize={9} fontFamily="'JetBrains Mono', monospace">{pos.label}</text>
          </g>;
        })}
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PERSONA
// ═══════════════════════════════════════════════════════════════════════════
function PersonCard({ person, kind, expanded, onToggle }) {
  const isPol = kind === "pol";
  const photo = isPol ? POLITICIAN_PHOTOS[person.id] : INVESTOR_PHOTOS[person.id];
  const partyColor = person.party === "PNP" ? "#60a5fa" : person.party === "PPD" ? "#dc2626" : person.party === "PIP" ? "#4ade80" : "#78716c";
  const role = isPol ? person.position : person.role;
  const donations = person.donations;
  const amount = isPol ? person.totalReceived : person.totalDonated;
  const [imgOk, setImgOk] = useState(true);

  return (
    <div style={{ borderTop: "1px solid #292524", padding: "28px 0" }}>
      <div onClick={onToggle} style={{ display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer" }}>
        {photo && imgOk ? (
          <img src={photo} alt={person.name} onError={() => setImgOk(false)}
            style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", objectPosition: "top", filter: "grayscale(100%)", flexShrink: 0, border: `2px solid ${isPol ? partyColor : "#60a5fa"}` }} />
        ) : (
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#1c1917", border: `2px solid ${isPol ? partyColor : "#60a5fa"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: isPol ? partyColor : "#60a5fa" }}>{person.name.charAt(0)}</span>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fafaf9" }}>{person.name}</div>
          <div style={{ fontSize: 12.5, color: "#a8a29e", marginTop: 4, lineHeight: 1.5 }}>{role}</div>
          <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {isPol && <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: partyColor, letterSpacing: 1 }}>{person.party}</span>}
            {amount > 0 && <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#dc2626" }}>{isPol ? "recibió " : "donó "}{fmt(amount)}</span>}
          </div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: "#57534e", flexShrink: 0 }}>{expanded ? "−" : "+"}</div>
      </div>

      {expanded && (
        <div style={{ marginTop: 22, paddingLeft: 0 }}>
          {donations && donations.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#78716c", marginBottom: 12 }}>
                {isPol ? "DONACIONES RECIBIDAS" : "DONACIONES REALIZADAS"}
              </div>
              {donations.map((d, i) => {
                const otherName = isPol ? (getInv(d.donor)?.name || d.donorName || "Donante no especificado") : (getPol(d.recipient)?.name || d.recipient);
                return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1c1917", gap: 10, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontSize: 13, color: "#d6d3d1" }}>{otherName}</span>
                    <span style={{ fontSize: 11, color: "#57534e", marginLeft: 10, fontFamily: "'JetBrains Mono', monospace" }}>{d.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#dc2626", fontWeight: 700 }}>{fmt(d.amount)}</span>
                    <CertMark c={d.certainty} />
                  </div>
                </div>;
              })}
            </div>
          )}
          {isPol && person.legislation && person.legislation.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#78716c", marginBottom: 12 }}>ACCIONES GUBERNAMENTALES RELACIONADAS</div>
              {person.legislation.map(lid => { const leg = getLeg(lid); if (!leg) return null; return (
                <div key={lid} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 14, color: "#d6d3d1" }}>{leg.title}</div>
                  <div style={{ fontSize: 11, color: "#78716c", marginTop: 3 }}>{leg.date} · {leg.status}</div>
                </div>
              ); })}
            </div>
          )}
          {((isPol && person.statements) || (!isPol && person.declaraciones))?.length > 0 && (
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#78716c", marginBottom: 12 }}>DECLARACIONES PÚBLICAS</div>
              {(isPol ? person.statements : person.declaraciones).map((s, i) => (
                <div key={i} style={{ marginBottom: 14, borderLeft: "2px solid #dc2626", paddingLeft: 14 }}>
                  <div style={{ fontStyle: "italic", color: "#e7e5e4", fontSize: 14, lineHeight: 1.7 }}>"{s.texto}"</div>
                  <div style={{ marginTop: 6 }}><SourceTag>{s.fuente} · {s.date}</SourceTag></div>
                </div>
              ))}
            </div>
          )}
          {!isPol && person.relatedEntities?.length > 0 && (
            <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 8 }}>Entidades relacionadas: {person.relatedEntities.join(" · ")}</div>
          )}
          <div style={{ marginTop: 12 }}><SourceTag>{isPol ? (person.donations[0]?.source || "Ver perfil") : person.fuente}</SourceTag></div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [expandedPerson, setExpandedPerson] = useState(null);
  const [tlFilter, setTlFilter] = useState("todo");
  const [mediaFilter, setMediaFilter] = useState("todos");
  const [showAllMoney, setShowAllMoney] = useState(false);
  const [edgeInfo, setEdgeInfo] = useState(null);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setSearchOpen(false); };

  const searchResults = q.trim().length < 2 ? [] : [
    ...INVESTORS.filter(i => i.name.toLowerCase().includes(q.toLowerCase())).map(i => ({ type: "inv", item: i })),
    ...POLITICIANS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.party.toLowerCase().includes(q.toLowerCase())).map(p => ({ type: "pol", item: p })),
    ...LEGISLATION.filter(l => l.title.toLowerCase().includes(q.toLowerCase())).map(l => ({ type: "leg", item: l })),
  ];

  const topDonations = [
    { donor: getInv("inv-001").name, amount: 3100, pol: getPol("pol-001").name, party: "PNP" },
    { donor: getInv("inv-001").name, amount: 3300, pol: getPol("pol-021").name, party: "PNP" },
    { donor: getInv("inv-001").name, amount: 3100, pol: getPol("pol-010").name, party: "PPD" },
    { donor: getInv("inv-002").name, amount: 3100, pol: getPol("pol-001").name, party: "PNP" },
    { donor: getInv("inv-001").name, amount: 3000, pol: getPol("pol-007").name, party: "PNP" },
  ];

  const filteredTl = TIMELINE.filter(ev => tlFilter === "todo" ? true : ev.t === tlFilter);
  const filteredMedia = MEDIA_CASES.filter(m => mediaFilter === "todos" ? true : m.nivel === mediaFilter);

  const NAV = [
    { id: "numeros", label: "Números" }, { id: "dinero", label: "Dinero" }, { id: "personas", label: "Personas" },
    { id: "conexiones", label: "Conexiones" }, { id: "cronologia", label: "Cronología" }, { id: "medios", label: "Medios" },
    { id: "documentales", label: "Documentales" }, { id: "evidencia", label: "Evidencia" }, { id: "fuentes", label: "Fuentes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0908", color: "#e7e5e4", fontFamily: "'Inter', -apple-system, sans-serif", opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html, body { overflow-x: hidden; }
        ::selection { background: #dc2626; color: white; }
        a { color: inherit; }
        .nav-links { display: flex; flex-wrap: wrap; gap: 6px 16px; }
        .nav-links button { background: none; border: none; color: #a8a29e; cursor: pointer; white-space: nowrap; padding: 5px 0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1px; }
        .nav-links button:hover { color: #fafaf9; }
        .numgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px 28px; }
        @media (max-width: 640px) {
          .nav-links { gap: 4px 12px; }
          .nav-links button { font-size: 10px; }
          .numgrid { grid-template-columns: 1fr 1fr; gap: 32px 20px; }
        }
        @media (max-width: 420px) {
          .numgrid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(10,9,8,0.95)" : "#0a0908", backdropFilter: "blur(10px)", borderBottom: "1px solid #1c1917" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: -0.5, flexShrink: 0 }}>
              DETRÁS DE <EsenciaMark />
            </div>
            <button onClick={() => setSearchOpen(v => !v)} style={{ background: "none", border: "1px solid #44403c", borderRadius: 3, color: "#a8a29e", width: 34, height: 34, cursor: "pointer", flexShrink: 0, fontSize: 14 }}>🔍</button>
          </div>
          <div className="nav-links" style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #1c1917" }}>
            {NAV.map(n => <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>)}
          </div>
        </div>
        {searchOpen && (
          <div style={{ borderTop: "1px solid #1c1917", background: "#0a0908", padding: "14px 20px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar persona, empresa, legislación…"
                style={{ width: "100%", background: "#161412", border: "1px solid #44403c", borderRadius: 4, padding: "12px 14px", color: "white", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: "none" }} />
              {searchResults.length > 0 && <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                {searchResults.map((r, i) => <div key={i} onClick={() => { if (r.type !== "leg") { setExpandedPerson(r.item.id); scrollTo("personas"); } else scrollTo("evidencia"); }}
                  style={{ padding: "10px 12px", background: "#161412", borderRadius: 3, cursor: "pointer", fontSize: 13 }}>
                  <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#dc2626", marginRight: 8 }}>{r.type === "inv" ? "INVERSIONISTA" : r.type === "pol" ? "POLÍTICO" : "DOCUMENTO"}</span>
                  {r.item.name || r.item.title}
                </div>)}
              </div>}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ maxWidth: 900, margin: "0 auto", padding: "min(10vh, 90px) 20px 70px" }}>
        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, color: "#dc2626", marginBottom: 24, fontWeight: 700 }}>
          INVESTIGACIÓN · TRANSPARENCIA CIUDADANA · PUERTO RICO
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(38px, 11vw, 84px)", lineHeight: 0.98, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}>
          Detrás de <EsenciaMark />
        </h1>
        <p style={{ fontSize: "clamp(17px, 3vw, 23px)", color: "#d6d3d1", lineHeight: 1.55, marginTop: 28, maxWidth: 720 }}>
          Esencia no es "un desarrollo": es una ciudad privada de lujo que un grupo de inversionistas pretende levantar dentro de Cabo Rojo, y que amenaza con desplazar a las comunidades del suroeste de Puerto Rico.
        </p>
        <p style={{ fontSize: 14.5, color: "#78716c", lineHeight: 1.7, marginTop: 18, maxWidth: 620 }}>
          Esta plataforma documenta, con evidencia pública, el dinero, las personas y las decisiones que le han abierto paso.
        </p>
        <button onClick={() => scrollTo("numeros")} style={{ marginTop: 36, background: "#dc2626", color: "white", border: "none", padding: "15px 30px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1.5, cursor: "pointer", borderRadius: 2 }}>
          EXPLORAR LA INVESTIGACIÓN →
        </button>
        <div style={{ marginTop: 48, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#57534e", letterSpacing: 2 }}>
          ÚLTIMA ACTUALIZACIÓN · 08 AGO 2026
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* NÚMEROS */}
      <section id="numeros" style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 20px" }}>
        <p style={{ fontSize: 18, color: "#d6d3d1", maxWidth: 560, marginBottom: 48, fontWeight: 500 }}>
          Para entender el alcance de la amenaza que representa Esencia hay que comenzar por los números.
        </p>
        <div className="numgrid">
          {[
            { n: fmt(totalDonated), l: "en donaciones políticas rastreadas (CEE)", src: "Comisión Estatal de Elecciones" },
            { n: politiciansWithDonations, l: "políticos identificados como receptores", src: "CEE / Contralor Electoral" },
            { n: "~$498M", l: "regalados en créditos contributivos", src: "Compañía de Turismo PR" },
            { n: "~$2,000M", l: "en inversión total anunciada", src: "The Real Deal, abr 2025" },
          ].map((s, i) => (
            <div key={i} style={{ borderTop: "3px solid #dc2626", paddingTop: 18 }}>
              <div style={{ fontSize: "clamp(30px, 6vw, 52px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, color: "#fafaf9", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "#a8a29e", marginTop: 10, lineHeight: 1.5 }}>{s.l}</div>
              <div style={{ marginTop: 8 }}><SourceTag>{s.src}</SourceTag></div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* DINERO */}
      <section id="dinero" style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="EL DINERO" title="Sigue el dinero" sub="Los mismos inversionistas que quieren levantar Esencia dentro de Cabo Rojo han comprado influencia en ambos partidos políticos, mientras el gobierno les regala cientos de millones en créditos contributivos." />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {topDonations.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "18px 0", borderTop: "1px solid #292524" }}>
              <div style={{ flex: "1 1 160px", fontSize: 14, color: "#e7e5e4" }}>{d.donor}</div>
              <div style={{ color: "#57534e", fontFamily: "'JetBrains Mono', monospace" }}>→</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, color: "#dc2626", fontWeight: 700, flex: "0 0 90px" }}>{fmt(d.amount)}</div>
              <div style={{ color: "#57534e", fontFamily: "'JetBrains Mono', monospace" }}>→</div>
              <div style={{ flex: "1 1 160px", fontSize: 14, color: "#e7e5e4" }}>{d.pol}</div>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: d.party === "PNP" ? "#60a5fa" : "#dc2626", letterSpacing: 1 }}>{d.party}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setShowAllMoney(v => !v)} style={{ marginTop: 24, background: "none", border: "1px solid #44403c", color: "#d6d3d1", padding: "11px 22px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, cursor: "pointer", borderRadius: 2 }}>
          {showAllMoney ? "OCULTAR TODOS LOS DATOS" : "VER TODOS LOS DATOS →"}
        </button>

        {showAllMoney && (
          <div style={{ marginTop: 28 }}>
            {INVESTORS.filter(i => i.totalDonated > 0).map(inv => (
              <div key={inv.id} style={{ marginBottom: 26 }}>
                <div style={{ fontSize: 15, color: "#fafaf9", marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{inv.name} <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#dc2626", fontWeight: 400 }}>· {fmt(inv.totalDonated)} total</span></div>
                {inv.donations.map((d, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1c1917", fontSize: 12.5, gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: "#a8a29e" }}>{getPol(d.recipient)?.name} <span style={{ color: "#57534e" }}>({d.date})</span></span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#dc2626" }}>{fmt(d.amount)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48, borderLeft: "3px solid #dc2626", paddingLeft: 20 }}>
          <div style={{ fontSize: 14, color: "#d6d3d1", lineHeight: 1.8, fontStyle: "italic" }}>
            "Cuando un proyecto multimillonario que requiere múltiples determinaciones gubernamentales mantiene una estrategia amplia de donativos a figuras de distintos partidos, no queda espacio a la especulación."
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* PERSONAS */}
      <section id="personas" style={{ maxWidth: 900, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="LOS ACTORES" title="Personas" sub="Los inversionistas detrás de Esencia y los políticos que se han beneficiado de su dinero. Toca un nombre para ver el perfil completo." />
        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#57534e", marginBottom: 4 }}>INVERSIONISTAS Y DESARROLLADORES</div>
        {INVESTORS.map(inv => <PersonCard key={inv.id} person={inv} kind="inv" expanded={expandedPerson === inv.id} onToggle={() => setExpandedPerson(expandedPerson === inv.id ? null : inv.id)} />)}
        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#57534e", margin: "36px 0 4px" }}>FIGURAS POLÍTICAS</div>
        {POLITICIANS.map(pol => <PersonCard key={pol.id} person={pol} kind="pol" expanded={expandedPerson === pol.id} onToggle={() => setExpandedPerson(expandedPerson === pol.id ? null : pol.id)} />)}
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* CONEXIONES */}
      <section id="conexiones" style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="EL MAPA" title="Las conexiones" sub="Una red de relaciones entre inversionistas, entidades legales, políticos y decisiones gubernamentales que le han allanado el camino a Esencia. Toca un nombre o una línea." />
        <div style={{ border: "1px solid #292524", borderRadius: 4, padding: 18 }}>
          <Network onSelectEdge={setEdgeInfo} onSelectNode={(obj) => { setExpandedPerson(obj.id); scrollTo("personas"); }} />
        </div>
        {edgeInfo && (
          <div style={{ marginTop: 18, borderLeft: "3px solid #dc2626", paddingLeft: 18 }}>
            <div style={{ fontSize: 14, color: "#fafaf9" }}>{edgeInfo.from} <span style={{ color: "#57534e" }}>→</span> {edgeInfo.to}</div>
            <div style={{ fontSize: 13, color: "#a8a29e", marginTop: 6 }}>{edgeInfo.label}</div>
          </div>
        )}
        <div style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#78716c" }}>
          <span>● azul — inversionista/empresa</span><span>● púrpura — entidad legal</span><span>● rojo — político</span><span>● verde — acción gubernamental</span>
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* CRONOLOGÍA */}
      <section id="cronologia" style={{ maxWidth: 780, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="LA LÍNEA DE TIEMPO" title="Cómo llegamos aquí" sub="Una cronología de las decisiones gubernamentales que le han abierto paso a Esencia dentro de Cabo Rojo, desde 2019 hasta el presente." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {["todo", "gobierno", "empresa", "donacion", "legal", "comunidad"].map(f => (
            <button key={f} onClick={() => setTlFilter(f)} style={{ background: tlFilter === f ? "#dc2626" : "transparent", color: tlFilter === f ? "white" : "#78716c", border: `1px solid ${tlFilter === f ? "#dc2626" : "#44403c"}`, padding: "6px 12px", borderRadius: 2, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>
          ))}
        </div>
        {filteredTl.map((ev, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 36 }}>
            <div style={{ flexShrink: 0, width: 72, textAlign: "right" }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#78716c" }}>{ev.label}</div>
            </div>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: TCOL[ev.t], marginTop: 4 }} />
              {i < filteredTl.length - 1 && <div style={{ width: 1, flex: 1, background: "#292524", marginTop: 6 }} />}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 16, color: "#fafaf9", lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{ev.e}</div>
              <div style={{ fontSize: 13.5, color: "#a8a29e", marginTop: 6, lineHeight: 1.6 }}>{ev.detail}</div>
              <div style={{ marginTop: 8 }}><SourceTag>{ev.source}</SourceTag></div>
            </div>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* MEDIOS */}
      <section id="medios" style={{ maxWidth: 900, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="COBERTURA MEDIÁTICA" title="Cómo se cuenta esta historia" sub="Casos verificados o reportados de cobertura mediática favorable a los desarrolladores, contenido patrocinado, censura y campañas de comunicación pagadas." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {["todos", "crítico", "alto", "medio"].map(f => (
            <button key={f} onClick={() => setMediaFilter(f)} style={{ background: mediaFilter === f ? "#dc2626" : "transparent", color: mediaFilter === f ? "white" : "#78716c", border: `1px solid ${mediaFilter === f ? "#dc2626" : "#44403c"}`, padding: "6px 12px", borderRadius: 2, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>
          ))}
        </div>
        {filteredMedia.map(m => (
          <div key={m.id} style={{ borderTop: "1px solid #292524", padding: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#dc2626", letterSpacing: 1 }}>{m.medio.toUpperCase()}</div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#57534e" }}>{m.fecha}</div>
            </div>
            <div style={{ fontSize: 16, color: "#fafaf9", fontStyle: "italic", marginBottom: 10, lineHeight: 1.4 }}>{m.titulo}</div>
            <p style={{ fontSize: 13.5, color: "#a8a29e", lineHeight: 1.8, marginBottom: 12 }}>{m.descripcion}</p>
            <div style={{ marginBottom: 8 }}><CertMark c={m.certainty} /></div>
            {m.contrasten && <div style={{ fontSize: 12.5, color: "#4ade80", lineHeight: 1.7, borderLeft: "2px solid #4ade8055", paddingLeft: 14, marginTop: 10 }}>{m.contrasten}</div>}
            {m.url && <div style={{ marginTop: 12 }}><a href={m.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#60a5fa" }}>VER FUENTE ORIGINAL →</a></div>}
          </div>
        ))}
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* DOCUMENTALES */}
      <section id="documentales" style={{ maxWidth: 900, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="SERIE DOCUMENTAL" title="La Esencia del Conflicto" sub="Producida por La Contraparte (@gaboramospr). Investigación audiovisual sobre los inversionistas, los permisos y el impacto que Esencia tendría en las comunidades de Cabo Rojo." />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {[{ t: "Parte 1", id: "ouKgJfcydos" }, { t: "Parte 2", id: "IS8PSCwl83w" }, { t: "Parte 3", id: "DvVkcCeBB5A" }].map((doc, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#78716c", marginBottom: 10, letterSpacing: 1 }}>{doc.t.toUpperCase()}</div>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, border: "1px solid #292524" }}>
                <iframe src={`https://www.youtube.com/embed/${doc.id}`} title={doc.t} frameBorder="0" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <a href="https://youtube.com/playlist?list=PLm6BQH24xmhrZVBSU_-EjffhOrxBuehui" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#60a5fa" }}>VER PLAYLIST COMPLETA EN YOUTUBE →</a>
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* EVIDENCIA */}
      <section id="evidencia" style={{ maxWidth: 900, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="LA EVIDENCIA" title="No tienes que creernos" sub="Los decretos y exenciones que el gobierno le ha regalado a Esencia, documentados uno por uno. Puedes revisar la evidencia tú mismo." />
        {LEGISLATION.map(leg => (
          <div key={leg.id} style={{ borderTop: "1px solid #292524", padding: "24px 0" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, color: "#78716c" }}>
              <span>{leg.type.toUpperCase()}</span><span>·</span><span>{leg.date}</span><span>·</span><span style={{ color: leg.impact === "directo" ? "#dc2626" : "#fbbf24" }}>{leg.impact === "directo" ? "IMPACTO DIRECTO" : "IMPACTO INDIRECTO"}</span>
            </div>
            <div style={{ fontSize: 18, color: "#fafaf9", marginBottom: 6, lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{leg.title}</div>
            {leg.subtitle && <div style={{ fontSize: 12.5, color: "#78716c", marginBottom: 10 }}>{leg.subtitle}</div>}
            <p style={{ fontSize: 13.5, color: "#a8a29e", lineHeight: 1.8, marginBottom: 10 }}>{leg.description}</p>
            {leg.monto !== "N/A" && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#4ade80", marginBottom: 10 }}>{leg.monto}</div>}
            <SourceTag>{leg.source}</SourceTag>
            {leg.criticas?.length > 0 && <div style={{ marginTop: 16 }}>
              {leg.criticas.map((c, i) => <div key={i} style={{ marginTop: 10, borderLeft: "2px solid #dc2626", paddingLeft: 14 }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#fbbf24", marginBottom: 4 }}>{c.quien}</div>
                <div style={{ fontSize: 13, color: "#d6d3d1", fontStyle: "italic", lineHeight: 1.7 }}>"{c.texto}"</div>
              </div>)}
            </div>}
          </div>
        ))}
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><Divider /></div>

      {/* FUENTES */}
      <section id="fuentes" style={{ maxWidth: 780, margin: "0 auto", padding: "70px 20px" }}>
        <SectionHead eyebrow="METODOLOGÍA" title="Cómo sabemos esto" sub="Esta investigación utiliza documentos gubernamentales, registros electorales, registros corporativos, expedientes de permisos, investigaciones periodísticas y documentos públicos." />
        {[
          { t: "FUENTES PRIMARIAS", items: ["Comisión Estatal de Elecciones (CEE)", "Oficina del Contralor Electoral", "Registro Corporativo del Dept. de Estado de PR", "Oficina de Gerencia de Permisos (OGPe) — Expediente DIA Esencia", "Decretos de la Compañía de Turismo de Puerto Rico", "Conferencias de prensa públicas"] },
          { t: "FUENTES PERIODÍSTICAS", items: ["Centro de Periodismo Investigativo (CPI)", "Bonita Radio", "NotiCel", "The Real Deal", "Bloomberg", "Metro Puerto Rico", "El Nuevo Día / Primera Hora", "Resumen Latinoamericano"] },
          { t: "OTRAS FUENTES", items: ["Publicaciones públicas de la Coalición Defiende a Cabo Rojo", "Redes sociales verificadas de fuentes directas", "Declaraciones públicas documentadas"] },
        ].map((cat, i) => (
          <div key={i} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#dc2626", marginBottom: 12 }}>{cat.t}</div>
            {cat.items.map((it, j) => <div key={j} style={{ fontSize: 13.5, color: "#d6d3d1", padding: "8px 0", borderTop: "1px solid #1c1917" }}>{it}</div>)}
          </div>
        ))}
        <div style={{ marginTop: 32, fontSize: 12.5, color: "#78716c", lineHeight: 1.8 }}>
          Esta plataforma es de carácter informativo y no realiza alegaciones sin evidencia documental. No constituye asesoramiento legal.
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #1c1917", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#44403c", letterSpacing: 1, lineHeight: 2.2 }}>
          DETRÁS DE ESENCIA · PLATAFORMA DE TRANSPARENCIA CIUDADANA · PUERTO RICO<br />
          Fuentes primarias: CEE · Contralor Electoral · Dept. de Estado PR · OGPe<br />
          Fuentes periodísticas: CPI · Bonita Radio · NotiCel · The Real Deal · Bloomberg
        </div>
      </footer>
    </div>
  );
}
