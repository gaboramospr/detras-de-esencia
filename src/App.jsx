import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// DATOS — verificados, con fuente
// ═══════════════════════════════════════════════════════════════════════════

const INVESTORS = [
  { id: "inv-001", name: "Roberto Ruiz Vargas", type: "Individuo / Co-fundador", tag: "PROYECTISTA",
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
  { id: "inv-002", name: "William (Will) Bennett", type: "Individuo / CEO", tag: "PROYECTISTA",
    role: "CEO y co-fundador de Three Rules Capital. Reside en Puerto Rico desde 2022. Anterior director general de Irongate (Costa Palmas, Los Cabos, México). También trabajó en Related (70 Vestry, Nueva York).",
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
  { id: "inv-003", name: "Harish Venkatesh", type: "Individuo / Socio", tag: "PROYECTISTA",
    role: "Tercer socio de Three Rules Capital. Se unió en 2023. Presente en las vistas públicas de la OGPe en Cabo Rojo (marzo 2025).",
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"], executives: [], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "CPI 'Las miradas silenciosas del proyecto Esencia' mar 2025; The Real Deal abr 2025", declaraciones: [],
  },
  { id: "inv-004", name: "Three Rules Capital", type: "Empresa desarrolladora", tag: "PROYECTISTA",
    role: "Firma detrás de la ciudad privada Esencia. Fundada por Will Bennett y Roberto Ruiz Vargas. Inversión proyectada de ~$2,684 millones para construir dentro de Cabo Rojo, según el expediente de OGPe.",
    executives: ["Will Bennett (CEO)", "Roberto Ruiz Vargas (COO)", "Harish Venkatesh (socio)"],
    relatedEntities: ["Cabo Rojo Land Acquisition LLC", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "NotiCel may 2024; The Real Deal abr 2025; OGPe – Trámite 2026-693109-CUB-013470 (vía Marea Ecologista)", declaraciones: [],
  },
  { id: "inv-005", name: "Reuben Brothers", type: "Empresa inversionista", tag: "PROYECTISTA",
    role: "Firma de inversión familiar británica. Co-financiadora de la ciudad privada Esencia. Fundada por David y Simon Reuben. JPMorgan Chase provee financiamiento adicional.",
    executives: ["David Reuben", "Simon Reuben", "Jamie Reuben"], relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"],
    donations: [], totalDonated: 0, certeza: "confirmado", fuente: "CPI jun 2025; The Real Deal abr 2025; Bloomberg may 2024", declaraciones: [],
  },
  { id: "inv-006", name: "Cabo Rojo Land Acquisition LLC", type: "Entidad legal del proyecto", tag: "PROYECTISTA",
    role: "Entidad registrada en PR el 25 de marzo de 2019. Vehículo legal de Reuben Brothers y Three Rules Capital. Titular del decreto de exención contributiva (~$498M) y de la Consulta de Ubicación aprobada por la OGPe.",
    executives: [], relatedEntities: ["Three Rules Capital", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "Registro Corporativo PR; OGPe – Expediente DIA Esencia; CPI oct 2025", declaraciones: [],
  },
];

const POLITICIANS = [
  { id: "pol-001", name: "Thomas Rivera Schatz", party: "PNP", position: "Presidente del Senado de Puerto Rico", tag: "DONANTE RECIBIÓ", totalReceived: 6200,
    donations: [
      { date: "2024-10-03", amount: 3100, donor: "inv-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: ["leg-006"], statements: [] },
  { id: "pol-002", name: "Ángel Matos García", party: "PPD", position: "Exrepresentante · Presidió Comisión de Desarrollo de Industria Turística (cuatrienio anterior)", tag: "DONANTE RECIBIÓ", totalReceived: 6200,
    donations: [
      { date: "2024-10-01", amount: 3100, donor: "inv-001", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-003", name: "Jesús Manuel Ortiz González", party: "PPD", position: "Excandidato a la gobernación (PPD)", tag: "DONANTE RECIBIÓ", totalReceived: 3100,
    donations: [{ date: "2024-09-26", amount: 3100, donor: "inv-001", comite: "Comité Jesús Manuel Ortiz González, Inc.", source: "CEE sep 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-004", name: "Partido Nuevo Progresista (PNP)", party: "PNP", position: "Comité central del partido / Comité Municipal PNP San Juan", tag: "DONANTE RECIBIÓ", totalReceived: 6200,
    donations: [
      { date: "2025-06-29", amount: 3100, donor: "inv-001", comite: "Partido Nuevo Progresista", source: "CEE jun 2025 – transferencia electrónica", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: ["leg-001", "leg-002"], statements: [] },
  { id: "pol-005", name: "Jenniffer González Colón", party: "PNP", position: "Gobernadora de Puerto Rico", tag: "GOBIERNO", totalReceived: 1000,
    donations: [{ date: "2025-04-10", amount: 1000, donor: "inv-001", comite: "Comité Jenniffer González Colón Inc.", source: "CEE abr 2025", certainty: "confirmado" }], legislation: ["leg-002", "leg-005"], statements: [] },
  { id: "pol-006", name: "Carlos \"Johnny\" Méndez", party: "PNP", position: "Presidente de la Cámara de Representantes de Puerto Rico", tag: "DONANTE RECIBIÓ", totalReceived: 3100,
    donations: [{ date: "2025-06-26", amount: 3100, donor: "inv-001", comite: "Comité Amigos Johnny Méndez", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-007", name: "Virgilio Olivera Olivera", party: "PNP", position: "Alcalde de San Germán", tag: "DONANTE RECIBIÓ", totalReceived: 3000,
    donations: [{ date: "2025-06-24", amount: 3000, donor: "inv-001", comite: "Virgilio Olivera Olivera", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [],
    statements: [{ date: "2025-03", texto: "Participó en la vista pública de la OGPe y resaltó el impacto económico favorable del proyecto para la región suroeste.", fuente: "CPI jun 2025" }] },
  { id: "pol-008", name: "José Luis Dalmau Santiago", party: "PPD", position: "Senador / Exlíder del PPD", tag: "DONANTE RECIBIÓ", totalReceived: 3100,
    donations: [{ date: "2024-10-22", amount: 3100, donor: "inv-001", comite: "Comité Amigos José Luis Dalmau Santiago", source: "CEE oct 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-009", name: "Miguel Romero Lugo", party: "PNP", position: "Alcalde de San Juan", tag: "DONANTE RECIBIÓ", totalReceived: 3100,
    donations: [{ date: "2024-09-30", amount: 3100, donor: "inv-001", comite: "Comité Miguel Romero Lugo", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-010", name: "Roberto 'Bobby' Ramírez Kurtz", party: "PPD", position: "Exalcalde de Cabo Rojo", tag: "DONANTE RECIBIÓ", totalReceived: 6200,
    donations: [
      { date: "2024-10-04", amount: 3100, donor: "inv-001", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-11-06", amount: 3100, donor: "inv-002", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California nov 2024", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-011", name: "Tatiana Pérez Ramírez", party: "PNP", position: "Representante PNP (al largo)", tag: "DONANTE RECIBIÓ", totalReceived: 3100,
    donations: [{ date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-012", name: "Jorge Morales Wiscovitch", party: "PNP", position: "Alcalde de Cabo Rojo", tag: "GOBIERNO", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2025-03", texto: "Esencia generará empleos para los caborrojeños, especialmente durante la construcción.", fuente: "CPI ago 2025" },
      { date: "2025-03", texto: "No queremos una buena economía a expensas del daño ambiental.", fuente: "CPI ago 2025" },
    ] },
  { id: "pol-013", name: "Wanda Vázquez Garced", party: "PNP", position: "Exgobernadora de Puerto Rico", tag: "GOBIERNO", totalReceived: 0, donations: [], legislation: ["leg-001"],
    statements: [{ date: "2020-12", texto: "Bajo su administración se otorgó el decreto de exención contributiva original a Cabo Rojo Land Acquisition LLC (Compañía de Turismo).", fuente: "CPI oct 2025" }] },
  { id: "pol-014", name: "Pedro Pierluisi", party: "PNP", position: "Exgobernador de Puerto Rico", tag: "GOBIERNO", totalReceived: null,
    donations: [{ date: "No especificada", amount: null, donor: null, donorName: "Vinculado(s) a Esencia (fuente no especifica monto ni donante exacto)", comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }],
    legislation: ["leg-001", "leg-002"],
    statements: [{ date: "2024", texto: "Bajo su administración se enmendó el decreto contributivo original y se emitió la exención del 90% en aranceles para parcelas del proyecto.", fuente: "CPI oct 2025" }] },
  { id: "pol-015", name: "María de Lourdes Santiago", party: "PIP", position: "Senadora · Vicepresidenta del PIP · EN CONTRA DEL PROYECTO ESENCIA", tag: "OPOSICIÓN", totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006", "leg-007"],
    statements: [
      { date: "2025-01", texto: "Coautora de la RS9 exigiendo investigar el proceso de permisos de Esencia. 'La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12-26", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido. Las varias enmiendas al sistema de otorgar permisos forman parte de un patrón junto a la protección de casonas ilegales en La Parguera y las nuevas dificultades al acceso a la información pública.", fuente: "Prensa Latina, 26/dic/2025" },
    ] },
  { id: "pol-016", name: "Adrián González Costa", party: "PIP", position: "Senador por Acumulación · PIP · EN CONTRA DEL PROYECTO ESENCIA", tag: "OPOSICIÓN", totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006"],
    statements: [
      { date: "2025-01", texto: "Coautor de la RS9. 'Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia. La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12", texto: "Junto a la delegación del PIP denunció que la determinación de la OGPe para Esencia fue emitida deliberadamente durante las fiestas de Navidad para acortar el período práctico de respuesta de grupos científicos y comunitarios.", fuente: "San Juan Daily Star, dic 2025" },
    ] },
  { id: "pol-017", name: "Partido Popular Democrático (PPD)", party: "PPD", position: "Presidente del PPD: Pablo José Hernández Rivera · Comisionado Residente", tag: "GOBIERNO", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-03-23", texto: "Ese proyecto tiene que cumplir con todas las reglamentaciones ambientales y si cuenta con el cumplimiento de todas las leyes y reglamentaciones y con el respaldo local que, a mi juicio, quien mejor lo representa es el alcalde… entonces no veo correcto que desde San Juan o Washington se interfiera.", fuente: "Pablo José Hernández Rivera, Presidente del PPD – NotiCel, 23/mar/2026" },
    ] },
  { id: "pol-018", name: "Pablo José Hernández Rivera", party: "PPD", position: "Comisionado Residente de Puerto Rico · Presidente del PPD", tag: "GOBIERNO", totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-03-23", texto: "Ese proyecto tiene que cumplir con todas las reglamentaciones ambientales y si cuenta con el cumplimiento de todas las leyes y reglamentaciones y con el respaldo local que, a mi juicio, quien mejor lo representa es el alcalde… entonces no veo correcto que desde San Juan o Washington se interfiera.", fuente: "NotiCel, 23/mar/2026" },
      { date: "2025-12-26", texto: "El secretario general del PIP, Juan Dalmau, lo emplazó públicamente por su silencio tras la aprobación de la DIA de Esencia. A la fecha, no consta una respuesta pública documentada de Hernández Rivera sobre este señalamiento.", fuente: "Telemundo PR, 26/dic/2025" },
    ] },
  { id: "pol-019", name: "Gabriel \"Gaby\" Hernández Rodríguez", party: "PNP", position: "Alcalde de Camuy · Presidente de la Federación de Alcaldes de PR", tag: "DONANTE RECIBIÓ", totalReceived: 3000,
    donations: [{ date: "No especificada", amount: 3000, donor: null, donorName: "Vinculado(s) a Esencia (fuente no especifica cuál proyectista)", comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }], legislation: [], statements: [] },
  { id: "pol-020", name: "Gregorio Matías Rosario", party: "PNP", position: "Senador", tag: "DONANTE RECIBIÓ", totalReceived: 2500,
    donations: [{ date: "No especificada", amount: 2500, donor: null, donorName: "Vinculado(s) a Esencia (fuente no especifica cuál proyectista)", comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }], legislation: [], statements: [] },
  { id: "pol-021", name: "Axel \"Chino\" Roque", party: "PNP", position: "Presidente de la Comisión de Turismo · Legislador PNP", tag: "DONANTE RECIBIÓ", totalReceived: 3300,
    donations: [{ date: "2026-02-24", amount: 3300, donor: "inv-001", comite: "", source: "Oficina del Contralor Electoral", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-022", name: "Emilio Carlo", party: "PNP", position: "Representante del Distrito 20 (Cabo Rojo, Hormigueros, San Germán) · Exdirector de la AAA Región Oeste", tag: "OPOSICIÓN", totalReceived: 0, donations: [], legislation: ["leg-008"],
    statements: [
      { date: "2026-08-05", texto: "Tras doce meses y dos semanas de investigación con biólogos, químicos, planificadores, ambientalistas y economistas, presentó sus hallazgos en la Plaza Ramón Emeterio Betances y se declaró en contra de Esencia.", fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: "Meses antes había enviado 25 preguntas formales a Cabo Rojo Land Acquisition con 30 días para responder; el 23 de julio los desarrolladores contestaron que no atenderían los señalamientos ni compartirían documentos — días antes de que la OGPe aprobara la Consulta de Ubicación sin celebrar vistas públicas.", fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: "Según su investigación, la AAA denegó capacidad de agua potable y la AEE denegó acceso a los sistemas de riego de Valle de Lajas por el riesgo a los agricultores de Yauco a Cabo Rojo; calculó un consumo de 1.25 millones de galones diarios para lo que él mismo categorizó como \"una ciudad privada\".", fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: "Encontró que el vertedero de Cabo Rojo no tiene celdas suficientes para la basura que generaría el proyecto, y que Hormigueros, Lajas y Mayagüez ya rechazaron recibir esos desechos.", fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: "Señaló que el proyecto ya recibió $498 millones en exención contributiva, y que Cabo Rojo perdería aproximadamente $30 millones anuales en CRIM, patentes y otros ingresos municipales por esas exenciones.", fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: "Aclaró que su oposición no es partidista: pidió a los compañeros de su propio partido que investiguen antes de respaldar el proyecto, en vez de asumir que el desarrollo es necesario sin toda la documentación.", fuente: "NotiCel, 6/ago/2026" },
    ] },
];

const LEGISLATION = [
  { id: "leg-001", title: "Decreto de Exención Contributiva – Cabo Rojo Land Acquisition LLC", subtitle: "Ley de Desarrollo Turístico de PR (incorporada a Ley 60-2019) / Ley 74 de 2010", type: "Decreto contributivo", category: "gobierno", date: "Dic 2020", dateAmended: "2024", status: "Vigente (enmendado 2024)",
    administraciones: ["Wanda Vázquez Garced (decreto original, dic 2020)", "Pedro Pierluisi (enmienda 2024)"],
    description: "La Compañía de Turismo de Puerto Rico le regaló a Cabo Rojo Land Acquisition LLC casi $498 millones en créditos contributivos, más una exención de 10 años en impuestos estatales y municipales, para levantar Esencia dentro de Cabo Rojo. El decreto se otorgó a pesar de que la propia Compañía de Turismo luego reconoció que el proyecto es 'predominantemente residencial'.",
    monto: "~$498 millones en créditos contributivos + exención 10 años", source: "OGPe – Expediente DIA Esencia; CPI oct 2025; Decreto oficial Compañía de Turismo PR", certainty: "confirmado", impact: "directo" },
  { id: "leg-002", title: "Exención 90% en Aranceles y Sellos Notariales (parcelas Esencia)", subtitle: "Certificación de exención", type: "Certificación de exención", category: "gobierno", date: "2022", dateAmended: null, status: "Vigente",
    administraciones: ["Pedro Pierluisi"],
    description: "El proponente recibió una exención del 90% para el pago de aranceles y sellos notariales relacionados a las parcelas donde se pretende levantar Esencia, mediante certificación firmada bajo la administración de Pedro Pierluisi.",
    monto: "No especificado públicamente", source: "CPI 'Esencia: un proyecto principalmente residencial con millones en privilegios contributivos turísticos' oct 2025", certainty: "confirmado", impact: "directo" },
  { id: "leg-003", title: "Solicitud de rediseño del proyecto – DRNA", subtitle: "Determinación regulatoria ambiental", type: "Determinación regulatoria", category: "ambiente", date: "2025", dateAmended: null, status: "En proceso",
    administraciones: ["Dept. de Recursos Naturales y Ambientales (DRNA)"],
    description: "El DRNA determinó que el proyecto debe presentar un rediseño que evidencie una redefinición sustancial de su huella ecológica, después de reconocer el daño que causaría a los ecosistemas de Cabo Rojo.",
    monto: "N/A", source: "Bonita Radio; CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-004", title: "Anuncio de acuerdo con Universidad Ana G. Méndez", subtitle: "Currículo de hospitalidad en Cabo Rojo", type: "Acuerdo institucional", category: "empresa", date: "Ene 2025", dateAmended: null, status: "Anunciado", administraciones: [],
    description: "Roberto Ruiz Vargas anunció un acuerdo con la Universidad Ana G. Méndez para expandir el currículo de hospitalidad, turismo y artes culinarias en el centro universitario de Cabo Rojo, como parte de la estrategia de relaciones públicas de Esencia.",
    monto: "N/A", source: "CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-005", title: "P.A. 114 – Código de Planificación y Permisos de Puerto Rico", subtitle: "Proyecto de Administración radicado por la Gobernadora Jenniffer González Colón", type: "Proyecto de ley (819 páginas)", category: "permisos", date: "8 abr 2026", dateAmended: null, status: "En evaluación legislativa – Vistas públicas 13 abr 2026",
    administraciones: ["Jenniffer González Colón (autora)"],
    description: "Proyecto de 819 páginas que crea un Código unificado de Planificación y Permisos. Deroga más de 40 estatutos, crea la Oficina Central de Permisos (OCP), y reduce la jurisdicción del DRNA. Establece plazos máximos de 180 días para Declaraciones de Impacto Ambiental. ⚠ CONEXIÓN CON ESENCIA: un límite de 180 días habría acelerado el proceso que le abrió paso a Esencia — cuya DIA demoró años y fue objeto de señalamientos de deficiencias técnicas.",
    monto: "N/A", source: "Metro PR 8/abr/2026; NotiCel 8/abr/2026 y 10/abr/2026; DDEC (ddec.pr.gov)", certainty: "confirmado", impact: "directo",
    criticas: [{ quien: "Sen. María de Lourdes Santiago (PIP)", texto: "Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido.", fuente: "Prensa Latina, 26/dic/2025" }] },
  { id: "leg-006", title: "P. del S. 1173 – Ley para Simplificar el Sistema de Permisos de Puerto Rico", subtitle: "Proyecto radicado por el Presidente del Senado Thomas Rivera Schatz (PNP)", type: "Proyecto de ley del Senado", category: "permisos", date: "7 abr 2026", dateAmended: null, status: "En evaluación – Vista pública conjunta 13 abr 2026 (con P.A. 114)",
    administraciones: ["Thomas Rivera Schatz (autor)"],
    description: "Medida radicada días antes del proyecto de la gobernadora. Rivera Schatz recibió $3,100 en donaciones de Roberto Ruiz Vargas y $3,100 de Will Bennett. ⚠ CONEXIÓN CON ESENCIA: junto al P.A. 114, crearía un sistema de permisos con jurisdicción reducida del DRNA — el mismo ente que ordenó el rediseño de Esencia.",
    monto: "N/A", source: "Primera Hora 9/abr/2026; NotiCel 9/abr/2026; Metro PR 10/abr/2026", certainty: "confirmado", impact: "directo",
    criticas: [{ quien: "Sen. Adrián González Costa (PIP)", texto: "Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia.", fuente: "El Vocero – RS9, ene 2025" }] },
  { id: "leg-007", title: "Aprobación de la Determinación de Cumplimiento Ambiental (DIA) de Esencia", subtitle: "Declaración de Impacto Ambiental notificada por la OGPe", type: "Determinación ambiental", category: "ambiente", date: "24 dic 2025", dateAmended: null, status: "Aprobada",
    administraciones: ["OGPe, bajo el gobierno de Jenniffer González Colón"],
    description: "La OGPe notificó, mediante aviso público, la Determinación de Cumplimiento Ambiental de la DIA para Esencia el 24 de diciembre de 2025 — Nochebuena. El megaproyecto turístico-residencial contempla, según esta notificación, 530 unidades de hotel, 1,132 residencias turísticas, áreas comerciales, campos de golf, una escuela, servicios médicos y otras infraestructuras. El secretario general del PIP, Juan Dalmau, repudió públicamente la aprobación y señaló que se hizo en silencio, durante los días festivos, para favorecer intereses privados a costa de recursos naturales y comunidades. Dalmau advirtió que el proyecto amenaza la permanencia de comunidades enteras, encarece vivienda y servicios básicos, y puede empujar a familias caborrojeñas a una migración forzada fuera de su propio pueblo. También emplazó al comisionado residente Pablo José Hernández Rivera por su silencio ante el asunto.",
    monto: "N/A", source: "Telemundo PR, 26/dic/2025", certainty: "confirmado", impact: "directo",
    criticas: [{ quien: "Juan Dalmau (Secretario General, PIP)", texto: "Esta aprobación constituye una afrenta ambiental, antidemocrática y profundamente antiética.", fuente: "Telemundo PR, 26/dic/2025" }] },
  { id: "leg-008", title: "Aprobación de la Consulta de Ubicación de Esencia", subtitle: "OGPe — Trámite 2026-693109-CUB-013470", type: "Consulta de ubicación", category: "permisos", date: "31 jul – 1 ago 2026", dateAmended: null, status: "Aprobada (construcción aún no autorizada)",
    administraciones: ["OGPe, bajo el gobierno de Jenniffer González Colón"],
    description: "La OGPe aprobó la Consulta de Ubicación del megaproyecto propuesto en el barrio Boquerón de Cabo Rojo, catalogándolo como 'Estratégico' bajo la ley federal PROMESA. El expediente proyecta una inversión de $2,684,000,000.10 y contempla, según el expediente de OGPe citado por Marea Ecologista, 828 unidades residenciales unifamiliares, 36 edificios comerciales, un hotel de 307 habitaciones y un condo-hotel de 98 habitaciones. Los propios desarrolladores, citados por NotiCel, han descrito el proyecto como 500 habitaciones de hotel, 1,200 residencias privadas de lujo, dos campos de golf, un centro ecuestre, una escuela K-12 y un centro médico 24 horas — cifras que no necesariamente coinciden con el expediente oficial. La aprobación se dio sin celebrar vistas públicas, pese a solicitudes formales de organizaciones comunitarias y ambientales. El secretario de Asuntos Públicos de La Fortaleza, Jean Peña Payano, aclaró que solo se aprobó la ubicación, no la construcción entera: aún faltan endosos del DRNA, y los desarrolladores deben demostrar que no afectarán el servicio de agua del municipio. El presidente de la AAA, Luis González Delgado, confirmó públicamente que la agencia no recomendó el proyecto por falta de capacidad de infraestructura para suplirle agua potable.",
    monto: "~$2,684,000,000.10 en inversión proyectada", source: "Marea Ecologista, 31/jul/2026; NotiCel, 6/ago/2026; El Vocero, 3/ago/2026", certainty: "confirmado", impact: "directo",
    criticas: [
      { quien: "Luis González Delgado (Presidente, AAA)", texto: "No tenemos la capacidad de poder suplirle agua.", fuente: "El Vocero, 3/ago/2026" },
      { quien: "Jean Peña Payano (Secretario de Asuntos Públicos)", texto: "Solo se aprobó la consulta de ubicación, no la construcción entera.", fuente: "NotiCel, 6/ago/2026" },
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
    descripcion: "Artículo publicado bajo la sección 'Brand Studio', producido directamente por Three Rules Capital. La URL contiene '/brandstudio/three-rules-capital/', confirmando que es contenido pagado por los propios proyectistas.",
    url: "https://www.elnuevodia.com/brandstudio/three-rules-capital/notas/esencia-ajusta-sus-planes-de-desarrollo-para-minimizar-su-huella-ambiental/",
    evidencia: "URL del artículo contiene '/brandstudio/three-rules-capital/'", certainty: "confirmado",
    contrasten: "El CPI documentó que el proyecto es 'predominantemente residencial' y que la DIA carece de estudio hidrológico." },
  { id: "m-002", medio: "Metro Puerto Rico", tipo: "Uso de artista opositora para generar cobertura favorable", nivel: "alto",
    titulo: "\"Recurso agua: ¿Cómo se plantea su manejo en Esencia?\"", fecha: "09 abril 2026",
    descripcion: "Producido bajo la 'editora invitada' Kany García — opositora pública a Esencia. El contenido le da plataforma principal a Roberto Ruiz Vargas para su narrativa sobre el agua.",
    url: "https://www.metro.pr/noticias/2026/04/09/recurso-agua-como-se-plantea-su-manejo-en-esencia/",
    evidencia: "Metro PR, 9/abr/2026", certainty: "confirmado",
    contrasten: "La AAA confirmó (3/ago/2026) que no tiene capacidad de agua. El Senado aprobó dos resoluciones para investigar la viabilidad hídrica." },
  { id: "m-003", medio: "Metro Puerto Rico", tipo: "Censura de columna de opinión", nivel: "crítico",
    titulo: "Columna de la Lcda. Rosa Seguí — publicada y luego retirada", fecha: "Previo a marcha del 28 de marzo 2026",
    descripcion: "Metro PR publicó y retiró una columna de Rosa Seguí (Movimiento Victoria Ciudadana) que denunciaba los efectos de Esencia. Seguí declaró: 'Es muy peligroso que nos hayan censurado.'",
    url: "https://www.facebook.com/share/1Cy91dEHSG/", evidencia: "Declaración directa de la Lcda. Rosa Seguí", certainty: "confirmado",
    contrasten: "Metro PR publicó el mismo día un artículo que amplifica la narrativa del desarrollador." },
  { id: "m-004", medio: "InDiario", tipo: "Ataque contra opositor usando fuentes anónimas", nivel: "medio",
    titulo: "\"Acusan a Gabo Ramos de payoleo\"", fecha: "26 marzo 2026",
    descripcion: "InDiario acusó al creador de contenido Gabo Ramos de recibir pagos no divulgados. Las alegaciones provienen exclusivamente de fuentes anónimas, sin evidencia documental.",
    url: "https://indiario.com/noticias/acusan-a-gabo-ramos-de-payoleo", evidencia: "InDiario, 26/mar/2026", certainty: "reportado",
    contrasten: "El CPI documentó que los propios desarrolladores pagaron anuncios y crearon cuentas anónimas antes de las vistas públicas." },
  { id: "m-005", medio: "La Diestra", tipo: "Contenido editorial sin fuentes verificables", nivel: "medio",
    titulo: "\"Derrumbamos Mitos En Contra de Esencia... Otra Vez\"", fecha: "2 abril 2026",
    descripcion: "Enmarca la oposición a Esencia como 'influencers y activistas' vs. 'realidad técnica y legal', sin citar estudios independientes ni la determinación del DRNA.",
    url: "https://www.ladiestra.com/noticias/derrumbamos-mitos-en-contra-de-esencia-otra-vez", evidencia: "La Diestra, 2/abr/2026", certainty: "confirmado",
    contrasten: "El DRNA ordenó un rediseño. Más de 70 organizaciones marcharon el 28/mar/2026." },
  { id: "m-007", medio: "Mets de Guaynabo – BSN", tipo: "Estrategia de imagen vía auspicio deportivo", nivel: "alto",
    titulo: "Esencia entra al BSN como auspiciador de los Mets", fecha: "Temporada 2026",
    descripcion: "El logo de Esencia aparece en las sillas del banquillo. Los dueños del equipo son beneficiarios de la Ley 22/60 desde 2015; la COO confirmó que los auspicios provienen de inversionistas bajo ese mismo marco legal.",
    url: "https://www.facebook.com/share/p/18VRJ3maE8/", evidencia: "Wikipedia; CPI jun 2021; declaración directa de COO Lcda. Gabiangie Berríos", certainty: "confirmado",
    contrasten: "El CPI (mar 2025) documentó anuncios pagados como parte de la misma estrategia de imagen." },
  { id: "m-006", medio: "Medios pagados / Cuentas anónimas", tipo: "Campaña de comunicación pagada previo a vistas públicas", nivel: "alto",
    titulo: "Anuncios en La Voz Digital + cuenta 'Conoce la verdad'", fecha: "Previo a marzo 2025",
    descripcion: "El CPI documentó anuncios pagados en La Voz Digital y cuentas anónimas como 'Conoce la verdad' para mejorar la percepción del proyecto antes de las vistas públicas.",
    url: "https://periodismoinvestigativo.com/2025/03/vistas-publicas-esencia-cabo-rojo/", evidencia: "CPI, mar 2025", certainty: "confirmado", contrasten: null },
  { id: "m-008", medio: "NEWS PR", tipo: "Posible conflicto de interés editorial — operador político no divulgado", nivel: "alto",
    titulo: "Félix Pérez Toro, creador de \"La Vieja Changa\", señalado como figura vinculada a NEWS PR", fecha: "Vigente",
    descripcion: "Pérez Toro es consultor político conocido por manejar 'La Vieja Changa'. Se describió en 2016 como militante del PNP. Su empresa Fénix One Group LLC ha tenido contratos gubernamentales; en 2024, mientras tenía contrato con La Fortaleza, financió una campaña de vallas contra Manuel Natal. Ha sido señalado públicamente como vinculado a NEWS PR, sin confirmación de su cargo exacto.",
    url: "", evidencia: "NotiCel (2016 y 2024); Oficina del Contralor Electoral", certainty: "reportado",
    contrasten: "Cualquier señalamiento de que una cobertura específica de NEWS PR sea falsa requiere documentarse caso por caso." },
];

const TIMELINE = [
  { label: "2019", e: "Se registra Cabo Rojo Land Acquisition LLC", detail: "Vehículo legal para levantar Esencia dentro de Cabo Rojo.", t: "legal", source: "Registro Corporativo PR" },
  { label: "DIC 2020", e: "El gobierno de Wanda Vázquez le regala el decreto de exención contributiva", detail: "Casi $498 millones en créditos, para una ciudad privada que ni siquiera existía todavía.", t: "gobierno", source: "Compañía de Turismo PR / CPI" },
  { label: "2022", e: "El gobierno de Pierluisi emite la exención del 90% en aranceles", detail: "Para las parcelas del proyecto.", t: "gobierno", source: "CPI oct 2025" },
  { label: "2022", e: "Bennett y Ruiz Vargas se establecen en Puerto Rico", detail: "Fundan Three Rules Capital.", t: "empresa", source: "The Real Deal" },
  { label: "2023", e: "Harish Venkatesh se une como tercer socio", detail: "De Three Rules Capital.", t: "empresa", source: "CPI mar 2025" },
  { label: "MAY 2024", e: "Anuncio público de Esencia (~$2,000M)", detail: "En Boquerón, Cabo Rojo.", t: "empresa", source: "NotiCel" },
  { label: "2024–25", e: "Roberto Ruiz Vargas dona $34,000 a comités de ambos partidos", detail: "Incluyendo al Presidente de la Comisión de Turismo.", t: "donacion", source: "CEE / Contralor Electoral" },
  { label: "MAR 2025", e: "Vistas públicas del EIS ante la OGPe en Cabo Rojo", detail: "Con fuerte oposición ciudadana.", t: "legal", source: "CPI mar 2025" },
  { label: "2025", e: "El DRNA ordena rediseñar la ciudad privada", detail: "Por el impacto ecológico que provocaría.", t: "ambiente", source: "Bonita Radio / CPI" },
  { label: "24 DIC 2025", e: "OGPe notifica la aprobación de la DIA — en Nochebuena", detail: "Juan Dalmau (PIP) la repudia como \"una afrenta ambiental, antidemocrática y profundamente antiética\".", t: "ambiente", source: "Telemundo PR" },
  { label: "31 JUL–1 AGO 2026", e: "OGPe aprueba la Consulta de Ubicación", detail: "Trámite 2026-693109-CUB-013470, sin vistas públicas. La AAA confirma que no tiene capacidad de agua.", t: "permisos", source: "Marea Ecologista / NotiCel / El Vocero" },
  { label: "3 AGO 2026", e: "Presidente de la AAA confirma en Radio Isla que no recomendó el proyecto", detail: "\"No tenemos la capacidad de poder suplirle agua.\"", t: "ambiente", source: "El Vocero" },
  { label: "5 AGO 2026", e: "El representante Emilio Carlo presenta hallazgos de un año de investigación", detail: "Sin agua, sin capacidad eléctrica confirmada, y sin vertedero disponible para la basura que generaría Esencia.", t: "gobierno", source: "NotiCel" },
  { label: "23 AGO 2026", e: "Marcha \"Cabo Rojo Es Nuestro\"", detail: "Convocada por Defiende a Cabo Rojo — 2:00 PM, Carr. 100 y 308, bajo el lema \"Esencia No Va\".", t: "comunidad", source: "Defiende a Cabo Rojo" },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS / DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════
const CERT = { confirmado: { color: "#4ade80", label: "CONFIRMADO" }, reportado: { color: "#fbbf24", label: "REPORTADO" }, "en investigación": { color: "#f87171", label: "EN INVESTIGACIÓN" } };
const TCOL = { legal: "#a78bfa", gobierno: "#60a5fa", empresa: "#38bdf8", donacion: "#dc2626", comunidad: "#2dd4bf", ambiente: "#4ade80", permisos: "#fbbf24" };
const fmt = n => n == null ? "no especificado" : "$" + Number(n).toLocaleString("es-PR");
const getInv = id => INVESTORS.find(i => i.id === id);
const getPol = id => POLITICIANS.find(p => p.id === id);
const getLeg = id => LEGISLATION.find(l => l.id === id);
const totalDonated = INVESTORS.reduce((s, i) => s + i.totalDonated, 0);
const politiciansWithDonations = POLITICIANS.filter(p => p.totalReceived > 0).length;

function Crystal({ children, style = {}, onClick, hover = true }) {
  const [h, setH] = useState(false);
  return <div onClick={onClick} onMouseEnter={() => hover && setH(true)} onMouseLeave={() => setH(false)}
    style={{
      background: h ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.035)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      border: `1px solid rgba(255,255,255,${h ? 0.14 : 0.08})`,
      borderRadius: 18, boxShadow: h ? "0 8px 32px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.2)",
      transition: "all 0.2s ease", cursor: onClick ? "pointer" : "default", ...style,
    }}>{children}</div>;
}
function EvidenceBadge({ c }) {
  const cfg = CERT[c] || CERT["en investigación"];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.2, color: cfg.color, background: `${cfg.color}14`, border: `1px solid ${cfg.color}33`, padding: "3px 8px", borderRadius: 20 }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color }} />{cfg.label}
  </span>;
}
function SourceChip({ children }) {
  return <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5, color: "#a1a1aa", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "3px 9px", display: "inline-block" }}>→ {children}</span>;
}
function Tag({ children, color = "#a1a1aa" }) {
  return <span style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, color, border: `1px solid ${color}44`, background: `${color}12`, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", display: "inline-block" }}>{children}</span>;
}
function EsenciaMark({ children = "ESENCIA" }) {
  return <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", backgroundImage: "linear-gradient(135deg, #f87171, #dc2626)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>;
}
function SectionHead({ eyebrow, title, sub, id }) {
  return <div id={id} style={{ marginBottom: 44, scrollMarginTop: 90 }}>
    <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, color: "#f87171", marginBottom: 14, fontWeight: 700 }}>{eyebrow}</div>
    <h2 style={{ margin: 0, fontSize: "clamp(24px, 6vw, 42px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, lineHeight: 1.12, color: "#fafafa", maxWidth: 760, letterSpacing: "-0.01em" }}>{title}</h2>
    {sub && <p style={{ marginTop: 14, fontSize: 15.5, color: "#a1a1aa", lineHeight: 1.7, maxWidth: 620 }}>{sub}</p>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════════════════
// NETWORK — desktop graph + mobile relationship list fallback
// ═══════════════════════════════════════════════════════════════════════════
function Network({ onSelectEdge, onSelectNode, mobile }) {
  const nodes = {
    "inv-001": { x: 90, y: 55, label: "Ruiz Vargas", t: "investor" }, "inv-002": { x: 90, y: 140, label: "Will Bennett", t: "investor" },
    "inv-003": { x: 90, y: 225, label: "Venkatesh", t: "investor" }, "inv-004": { x: 90, y: 300, label: "Three Rules", t: "company" },
    "inv-005": { x: 90, y: 365, label: "Reuben Bros.", t: "company" }, "inv-006": { x: 250, y: 210, label: "CRLA LLC", t: "entity" },
    "pol-001": { x: 420, y: 25, label: "Rivera Schatz", t: "pol" }, "pol-002": { x: 420, y: 95, label: "Matos García", t: "pol" },
    "pol-004": { x: 420, y: 165, label: "PNP", t: "pol" }, "pol-005": { x: 420, y: 235, label: "JGC Gov.", t: "pol" },
    "pol-009": { x: 420, y: 305, label: "Romero Lugo", t: "pol" }, "pol-010": { x: 420, y: 375, label: "Ramírez Kurtz", t: "pol" },
    "leg-001": { x: 570, y: 120, label: "$498M Decreto", t: "leg" }, "leg-008": { x: 570, y: 260, label: "Consulta Ubic.", t: "leg" },
  };
  const ts = { investor: { fill: "#0c1220", stroke: "#60a5fa", r: 17 }, company: { fill: "#0c1220", stroke: "#38bdf8", r: 15 }, entity: { fill: "#160c22", stroke: "#a78bfa", r: 19 }, pol: { fill: "#1a0a0a", stroke: "#f87171", r: 17 }, leg: { fill: "#08150c", stroke: "#4ade80", r: 15 } };
  const links = [
    { s: "inv-001", t: "inv-006", c: "#60a5fa55", label: "vehículo legal común" }, { s: "inv-002", t: "inv-006", c: "#60a5fa55", label: "vehículo legal común" },
    { s: "inv-004", t: "inv-006", c: "#38bdf855", label: "co-desarrolladora" }, { s: "inv-005", t: "inv-006", c: "#38bdf855", label: "co-financiadora" },
    { s: "inv-001", t: "pol-001", c: "#dc262677", label: "$3,100 donado — CEE oct 2024" }, { s: "inv-001", t: "pol-002", c: "#dc262677", label: "$3,100 donado — CEE oct 2024" },
    { s: "inv-001", t: "pol-004", c: "#dc262677", label: "$3,100 donado — CEE jun 2025" }, { s: "inv-001", t: "pol-009", c: "#dc262677", label: "$3,100 donado — CEE sep 2024" },
    { s: "inv-001", t: "pol-010", c: "#dc262677", label: "$3,100 donado — CEE oct 2024" }, { s: "inv-002", t: "pol-001", c: "#b91c1c77", label: "$3,100 donado — CEE 2024" },
    { s: "inv-002", t: "pol-010", c: "#b91c1c77", label: "$3,100 donado — CEE nov 2024" }, { s: "inv-006", t: "leg-001", c: "#4ade8055", label: "titular del decreto — ~$498M" },
    { s: "inv-006", t: "leg-008", c: "#4ade8055", label: "titular de la consulta de ubicación" }, { s: "pol-005", t: "leg-008", c: "#a1a1aa55", label: "administración vigente" },
  ];
  if (mobile) {
    return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {links.map((l, i) => <div key={i} onClick={() => onSelectEdge({ from: nodes[l.s].label, to: nodes[l.t].label, label: l.label })}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, cursor: "pointer" }}>
        <span style={{ fontSize: 13, color: "#e4e4e7", flex: 1 }}>{nodes[l.s].label}</span>
        <span style={{ color: "#71717a", fontSize: 12 }}>→</span>
        <span style={{ fontSize: 13, color: "#e4e4e7", flex: 1, textAlign: "right" }}>{nodes[l.t].label}</span>
      </div>)}
    </div>;
  }
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <svg width={660} height={410} style={{ display: "block", minWidth: 660 }}>
        {links.map((l, i) => { const s = nodes[l.s], t = nodes[l.t]; return (
          <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={l.c} strokeWidth={1.4} style={{ cursor: "pointer" }}
            onClick={() => onSelectEdge({ from: s.label, to: t.label, label: l.label })} />
        ); })}
        {Object.entries(nodes).map(([id, pos]) => {
          const s = ts[pos.t]; const obj = INVESTORS.find(x => x.id === id) || POLITICIANS.find(x => x.id === id);
          return <g key={id} style={{ cursor: obj ? "pointer" : "default" }} onClick={() => obj && onSelectNode(obj, INVESTORS.includes(obj) ? "inv" : "pol")}>
            <circle cx={pos.x} cy={pos.y} r={s.r} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
            <text x={pos.x} y={pos.y + s.r + 13} textAnchor="middle" fill="#a1a1aa" fontSize={9} fontFamily="'JetBrains Mono', monospace">{pos.label}</text>
          </g>;
        })}
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PERSON CARD / PROFILE
// ═══════════════════════════════════════════════════════════════════════════
function PersonCard({ person, kind, onOpen }) {
  const isPol = kind === "pol";
  const photo = isPol ? POLITICIAN_PHOTOS[person.id] : INVESTOR_PHOTOS[person.id];
  const partyColor = person.party === "PNP" ? "#60a5fa" : person.party === "PPD" ? "#f87171" : person.party === "PIP" ? "#4ade80" : "#a1a1aa";
  const amount = isPol ? person.totalReceived : person.totalDonated;
  const [imgOk, setImgOk] = useState(true);
  const tagColor = person.tag === "OPOSICIÓN" ? "#4ade80" : person.tag === "DONANTE RECIBIÓ" ? "#f87171" : person.tag === "PROYECTISTA" ? "#38bdf8" : "#a1a1aa";
  return (
    <Crystal onClick={() => onOpen(person.id, kind)} style={{ padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
      {photo && imgOk ? (
        <img src={photo} alt={person.name} onError={() => setImgOk(false)} loading="lazy"
          style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", objectPosition: "top", filter: "grayscale(60%)", flexShrink: 0, border: `2px solid ${isPol ? partyColor : "#38bdf8"}` }} />
      ) : (
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `2px solid ${isPol ? partyColor : "#38bdf8"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 17, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: isPol ? partyColor : "#38bdf8" }}>{person.name.charAt(0)}</span>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fafafa" }}>{person.name}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap", alignItems: "center" }}>
          {person.tag && <Tag color={tagColor}>{person.tag}</Tag>}
          {isPol && <span style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", color: partyColor }}>{person.party}</span>}
          {amount > 0 && <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#f87171" }}>{fmt(amount)}</span>}
        </div>
      </div>
      <div style={{ color: "#52525b", fontSize: 18, flexShrink: 0 }}>›</div>
    </Crystal>
  );
}

function PersonModal({ person, kind, onClose }) {
  if (!person) return null;
  const isPol = kind === "pol";
  const photo = isPol ? POLITICIAN_PHOTOS[person.id] : INVESTOR_PHOTOS[person.id];
  const partyColor = person.party === "PNP" ? "#60a5fa" : person.party === "PPD" ? "#f87171" : person.party === "PIP" ? "#4ade80" : "#a1a1aa";
  const role = isPol ? person.position : person.role;
  const donations = person.donations;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "rgba(15,15,17,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 640,
        maxHeight: "88vh", overflowY: "auto", padding: "20px 22px 40px",
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#e4e4e7", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, marginBottom: 24 }}>
          {photo ? <img src={photo} alt={person.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", objectPosition: "top", filter: "grayscale(50%)", border: `2px solid ${isPol ? partyColor : "#38bdf8"}` }} onError={e => e.target.style.display = "none"} />
            : <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `2px solid ${isPol ? partyColor : "#38bdf8"}`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 24, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: isPol ? partyColor : "#38bdf8" }}>{person.name.charAt(0)}</span></div>}
          <div>
            <div style={{ fontSize: 21, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fafafa" }}>{person.name}</div>
            <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 4 }}>{role}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>{person.tag && <Tag color={isPol ? "#f87171" : "#38bdf8"}>{person.tag}</Tag>}{isPol && <Tag color={partyColor}>{person.party}</Tag>}</div>
          </div>
        </div>
        {donations?.length > 0 && <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>{isPol ? "DONACIONES RECIBIDAS" : "DONACIONES REALIZADAS"}</div>
          {donations.map((d, i) => {
            const otherName = isPol ? (getInv(d.donor)?.name || d.donorName || "Donante no especificado") : (getPol(d.recipient)?.name || d.recipient);
            return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 10, flexWrap: "wrap" }}>
              <div><span style={{ fontSize: 13, color: "#d4d4d8" }}>{otherName}</span><span style={{ fontSize: 10.5, color: "#71717a", marginLeft: 8, fontFamily: "'JetBrains Mono', monospace" }}>{d.date}</span></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#f87171", fontWeight: 700 }}>{fmt(d.amount)}</span><EvidenceBadge c={d.certainty} /></div>
            </div>;
          })}
        </div>}
        {isPol && person.legislation?.length > 0 && <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>ACCIONES GUBERNAMENTALES</div>
          {person.legislation.map(lid => { const leg = getLeg(lid); return leg && <div key={lid} style={{ marginBottom: 10 }}><div style={{ fontSize: 13, color: "#d4d4d8" }}>{leg.title}</div><div style={{ fontSize: 10.5, color: "#71717a" }}>{leg.date} · {leg.status}</div></div>; })}
        </div>}
        {((isPol && person.statements) || (!isPol && person.declaraciones))?.length > 0 && <div>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>DECLARACIONES</div>
          {(isPol ? person.statements : person.declaraciones).map((s, i) => <div key={i} style={{ marginBottom: 14, borderLeft: "2px solid #f87171", paddingLeft: 14 }}>
            <div style={{ fontStyle: "italic", color: "#e4e4e7", fontSize: 13.5, lineHeight: 1.7 }}>"{s.texto}"</div>
            <div style={{ marginTop: 6 }}><SourceChip>{s.fuente} · {s.date}</SourceChip></div>
          </div>)}
        </div>}
        {!isPol && person.relatedEntities?.length > 0 && <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>Entidades relacionadas: {person.relatedEntities.join(" · ")}</div>}
        <div style={{ marginTop: 14 }}><SourceChip>{isPol ? (person.donations[0]?.source || "Ver evidencia") : person.fuente}</SourceChip></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const [tlFilter, setTlFilter] = useState("todo");
  const [mediaFilter, setMediaFilter] = useState("todos");
  const [docFilter, setDocFilter] = useState("todo");
  const [showAllMoney, setShowAllMoney] = useState(false);
  const [edgeInfo, setEdgeInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openPerson = (id, kind) => setModal({ person: kind === "pol" ? getPol(id) : getInv(id), kind });
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setSearchOpen(false); setMenuOpen(false); };

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

  const filteredTl = TIMELINE.filter(ev => tlFilter === "todo" || ev.t === tlFilter);
  const filteredMedia = MEDIA_CASES.filter(m => mediaFilter === "todos" || m.nivel === mediaFilter);
  const filteredDocs = LEGISLATION.filter(l => docFilter === "todo" || l.category === docFilter);

  const NAV = [
    { id: "investigacion", label: "Investigación" }, { id: "personas", label: "Personas" }, { id: "dinero", label: "Dinero" },
    { id: "conexiones", label: "Conexiones" }, { id: "proyecto", label: "El Proyecto" }, { id: "cronologia", label: "Cronología" },
    { id: "medios", label: "Medios" }, { id: "documentos", label: "Documentos" }, { id: "metodologia", label: "Fuentes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#08080a", color: "#e4e4e7", fontFamily: "'Inter', -apple-system, sans-serif", opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html, body { overflow-x: hidden; }
        ::selection { background: #dc2626; color: white; }
        a { color: inherit; }
        button { font-family: inherit; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* ambient crystal glow — decorative only, doesn't compete with content */}
      <div aria-hidden style={{ position: "fixed", top: "-10%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", bottom: "10%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(8,8,10,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
            DETRÁS DE <EsenciaMark />
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setSearchOpen(v => !v)} aria-label="Buscar" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "#e4e4e7", width: 38, height: 38, cursor: "pointer", fontSize: 14 }}>🔍</button>
            <button onClick={() => setMenuOpen(v => !v)} aria-label="Menú" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "#e4e4e7", width: 38, height: 38, cursor: "pointer", fontSize: 15 }}>{menuOpen ? "×" : "☰"}</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px 24px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {NAV.map(n => <button key={n.id} onClick={() => scrollTo(n.id)} style={{ textAlign: "left", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, color: "#e4e4e7", padding: "12px 14px", cursor: "pointer", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{n.label}</button>)}
            </div>
          </div>
        )}
        {searchOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "14px 20px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar personas, empresas, permisos, donaciones o documentos…"
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 15px", color: "white", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: "none" }} />
              {searchResults.length > 0 && <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                {searchResults.map((r, i) => <div key={i} onClick={() => { if (r.type !== "leg") { openPerson(r.item.id, r.type); setSearchOpen(false); } else { scrollTo("documentos"); } }}
                  style={{ padding: "10px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
                  <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#f87171", marginRight: 8 }}>{r.type === "inv" ? "EMPRESA" : r.type === "pol" ? "PERSONA" : "DOCUMENTO"}</span>{r.item.name || r.item.title}
                </div>)}
              </div>}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ maxWidth: 900, margin: "0 auto", padding: "min(9vh, 80px) 20px 56px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, color: "#f87171", marginBottom: 22, fontWeight: 700 }}>
          INVESTIGACIÓN · TRANSPARENCIA CIUDADANA · PUERTO RICO
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(36px, 10vw, 76px)", lineHeight: 1.0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}>
          Detrás de <EsenciaMark />
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.6vw, 21px)", color: "#d4d4d8", lineHeight: 1.55, marginTop: 24, maxWidth: 680 }}>
          El dinero. Los permisos. Las conexiones. Las personas detrás de la ciudad privada que un grupo de inversionistas pretende levantar dentro de Cabo Rojo — y que amenaza con desplazar a sus comunidades.
        </p>
        <p style={{ fontSize: 13.5, color: "#71717a", lineHeight: 1.7, marginTop: 16, maxWidth: 600 }}>
          Una investigación basada en documentos públicos, registros gubernamentales, datos electorales y fuentes periodísticas.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 30 }}>
          <button onClick={() => scrollTo("investigacion")} style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "white", border: "none", padding: "14px 24px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>EXPLORAR LA INVESTIGACIÓN</button>
          <button onClick={() => scrollTo("conexiones")} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#e4e4e7", padding: "14px 24px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>VER LAS CONEXIONES</button>
          <button onClick={() => scrollTo("documentos")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", padding: "14px 24px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>VER DOCUMENTOS</button>
        </div>
        <div style={{ marginTop: 40, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#52525b", letterSpacing: 2 }}>ÚLTIMA ACTUALIZACIÓN · 09 AGO 2026</div>
      </section>

      {/* INTRO */}
      <section id="investigacion" style={{ maxWidth: 780, margin: "0 auto", padding: "20px 20px 70px", position: "relative", zIndex: 1 }}>
        <Crystal style={{ padding: "28px 26px" }} hover={false}>
          <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 10 }}>¿QUÉ ES ESENCIA Y POR QUÉ IMPORTA?</div>
          <p style={{ fontSize: 15.5, color: "#d4d4d8", lineHeight: 1.85, margin: 0 }}>
            Esencia no es "un desarrollo": es una ciudad privada de lujo —hoteles, campos de golf, cientos de residencias— que un grupo de inversionistas extranjeros pretende levantar dentro de terreno de Cabo Rojo. El gobierno le ha regalado casi $498 millones en créditos contributivos. La Autoridad de Acueductos confirmó que no tiene capacidad para suplirle agua. La OGPe aprobó su Declaración de Impacto Ambiental el 24 de diciembre de 2025 y su Consulta de Ubicación a finales de julio de 2026, ambas sin vistas públicas. Esta plataforma documenta, con evidencia pública, quién está detrás.
          </p>
        </Crystal>
      </section>

      {/* NÚMEROS */}
      <section id="numeros" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { n: fmt(totalDonated), l: "en donaciones políticas rastreadas", src: "CEE / Contralor Electoral", go: "dinero" },
            { n: politiciansWithDonations, l: "políticos identificados como receptores", src: "CEE / Contralor Electoral", go: "personas" },
            { n: "~$498M", l: "regalados en créditos contributivos", src: "Compañía de Turismo PR", go: "documentos" },
            { n: "~$2.68B", l: "en inversión proyectada según OGPe", src: "Marea Ecologista, 31/jul/2026", go: "documentos" },
          ].map((s, i) => (
            <Crystal key={i} onClick={() => scrollTo(s.go)} style={{ padding: "24px 22px" }}>
              <div style={{ fontSize: "clamp(28px, 5vw, 44px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, color: "#fafafa", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12.5, color: "#a1a1aa", marginTop: 10, lineHeight: 1.5 }}>{s.l}</div>
              <div style={{ marginTop: 10 }}><SourceChip>{s.src}</SourceChip></div>
            </Crystal>
          ))}
        </div>
      </section>

      {/* PERSONAS */}
      <section id="personas" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="LOS ACTORES" title="Las personas detrás de Esencia" sub="Inversionistas, desarrolladores y las figuras políticas que se han beneficiado de su dinero — o que se le han opuesto. Toca un nombre para ver el perfil completo." />
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>INVERSIONISTAS Y DESARROLLADORES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30 }}>{INVESTORS.map(inv => <PersonCard key={inv.id} person={inv} kind="inv" onOpen={openPerson} />)}</div>
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>FIGURAS POLÍTICAS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{POLITICIANS.map(pol => <PersonCard key={pol.id} person={pol} kind="pol" onOpen={openPerson} />)}</div>
      </section>

      {/* DINERO */}
      <section id="dinero" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="EL DINERO" title="Sigue el dinero" sub="Los mismos inversionistas que quieren levantar Esencia han comprado influencia en ambos partidos, mientras el gobierno les regala cientos de millones en créditos contributivos." />
        <Crystal style={{ padding: "8px 20px" }} hover={false}>
          {topDonations.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "16px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ flex: "1 1 150px", fontSize: 13.5, color: "#e4e4e7" }}>{d.donor}</div>
              <div style={{ color: "#52525b" }}>→</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "#f87171", fontWeight: 700, flex: "0 0 85px" }}>{fmt(d.amount)}</div>
              <div style={{ color: "#52525b" }}>→</div>
              <div style={{ flex: "1 1 150px", fontSize: 13.5, color: "#e4e4e7" }}>{d.pol}</div>
              <Tag color={d.party === "PNP" ? "#60a5fa" : "#f87171"}>{d.party}</Tag>
            </div>
          ))}
        </Crystal>
        <button onClick={() => setShowAllMoney(v => !v)} style={{ marginTop: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#d4d4d8", padding: "11px 20px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>
          {showAllMoney ? "OCULTAR TODOS LOS DATOS" : "VER TODOS LOS DATOS →"}
        </button>
        {showAllMoney && <div style={{ marginTop: 24 }}>
          {INVESTORS.filter(i => i.totalDonated > 0).map(inv => (
            <Crystal key={inv.id} hover={false} style={{ padding: "16px 20px", marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: "#fafafa", marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{inv.name} <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: "#f87171", fontWeight: 400 }}>· {fmt(inv.totalDonated)} total</span></div>
              {inv.donations.map((d, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, gap: 8, flexWrap: "wrap" }}>
                <span style={{ color: "#a1a1aa" }}>{getPol(d.recipient)?.name} <span style={{ color: "#52525b" }}>({d.date})</span></span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f87171" }}>{fmt(d.amount)}</span>
              </div>)}
            </Crystal>
          ))}
        </div>}
      </section>

      {/* CONEXIONES */}
      <section id="conexiones" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="EL MAPA" title="¿Quién está conectado con quién?" sub="Una red de relaciones entre inversionistas, entidades legales, políticos y decisiones gubernamentales. Toca un nombre o una línea." />
        <Crystal style={{ padding: 18 }} hover={false}>
          <Network mobile={isMobile} onSelectEdge={setEdgeInfo} onSelectNode={(obj, kind) => openPerson(obj.id, kind === "inv" ? "inv" : "pol")} />
        </Crystal>
        {edgeInfo && <Crystal hover={false} style={{ padding: "16px 20px", marginTop: 16 }}>
          <div style={{ fontSize: 14, color: "#fafafa" }}>{edgeInfo.from} <span style={{ color: "#52525b" }}>→</span> {edgeInfo.to}</div>
          <div style={{ fontSize: 12.5, color: "#a1a1aa", marginTop: 6 }}>{edgeInfo.label}</div>
        </Crystal>}
        <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Tag color="#60a5fa">inversionista/empresa</Tag><Tag color="#a78bfa">entidad legal</Tag><Tag color="#f87171">político</Tag><Tag color="#4ade80">acción gubernamental</Tag>
        </div>
      </section>

      {/* EL PROYECTO — territorio / agua / permisos / ambiente */}
      <section id="proyecto" style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="EL TERRITORIO" title="Lo que Esencia le costaría a Cabo Rojo" sub="Según la investigación de un año del representante Emilio Carlo, con biólogos, químicos, planificadores, ambientalistas y economistas." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {[
            { t: "AGUA", d: "La AAA confirmó que no tiene capacidad para suplirle agua potable. La AEE denegó acceso a los sistemas de riego de Valle de Lajas para no perjudicar a los agricultores de Yauco a Cabo Rojo. Consumo estimado: 1.25 millones de galones diarios.", src: "NotiCel / El Vocero" },
            { t: "ELECTRICIDAD", d: "La red eléctrica de Puerto Rico ya está frágil. Una ciudad privada de esta magnitud podría empeorar aún más la capacidad eléctrica de las comunidades cercanas y del pueblo de Cabo Rojo.", src: "NotiCel, 6/ago/2026" },
            { t: "DESPERDICIOS SÓLIDOS", d: "El vertedero de Cabo Rojo no tiene celdas suficientes. Hormigueros, Lajas y Mayagüez ya rechazaron recibir esos desechos. El huracán María acortó los años de vida de los vertederos del oeste.", src: "NotiCel, 6/ago/2026" },
            { t: "FINANZAS MUNICIPALES", d: "El proyecto ya recibió $498 millones en exención contributiva. Cabo Rojo perdería aproximadamente $30 millones anuales en CRIM, patentes y otros ingresos municipales.", src: "NotiCel, 6/ago/2026" },
            { t: "PERMISOS Y TRANSPARENCIA", d: "Los desarrolladores se negaron a contestar 25 preguntas formales del representante Carlo. La OGPe aprobó la Consulta de Ubicación sin celebrar vistas públicas pese a solicitudes formales de organizaciones comunitarias.", src: "NotiCel, 6/ago/2026" },
            { t: "ECOSISTEMAS", d: "El proyecto impactaría áreas adyacentes al Refugio Nacional de Vida Silvestre de Cabo Rojo y el Caño Boquerón — hábitat del guabairo puertorriqueño, la cóbana negra y el manatí antillano.", src: "Marea Ecologista, 31/jul/2026" },
          ].map((c, i) => <Crystal key={i} style={{ padding: "20px 20px" }} hover={false}>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 10 }}>{c.t}</div>
            <p style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.7, margin: 0 }}>{c.d}</p>
            <div style={{ marginTop: 10 }}><SourceChip>{c.src}</SourceChip></div>
          </Crystal>)}
        </div>
      </section>

      {/* CRONOLOGÍA */}
      <section id="cronologia" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="LA LÍNEA DE TIEMPO" title="Cómo llegamos aquí" sub="Las decisiones que le han abierto paso a Esencia dentro de Cabo Rojo, desde 2019 hasta el presente." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 30 }}>
          {["todo", "gobierno", "empresa", "donacion", "legal", "ambiente", "permisos", "comunidad"].map(f => (
            <button key={f} onClick={() => setTlFilter(f)} style={{ background: tlFilter === f ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "rgba(255,255,255,0.04)", color: tlFilter === f ? "white" : "#a1a1aa", border: `1px solid ${tlFilter === f ? "transparent" : "rgba(255,255,255,0.1)"}`, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>
          ))}
        </div>
        {filteredTl.map((ev, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 30 }}>
            <div style={{ flexShrink: 0, width: 74, textAlign: "right" }}><div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#71717a" }}>{ev.label}</div></div>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: TCOL[ev.t], marginTop: 4, boxShadow: `0 0 8px ${TCOL[ev.t]}` }} />
              {i < filteredTl.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.1)", marginTop: 6 }} />}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 15, color: "#fafafa", lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{ev.e}</div>
              <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 6, lineHeight: 1.6 }}>{ev.detail}</div>
              <div style={{ marginTop: 8 }}><SourceChip>{ev.source}</SourceChip></div>
            </div>
          </div>
        ))}
      </section>

      {/* MEDIOS */}
      <section id="medios" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="COBERTURA MEDIÁTICA" title="Cómo se cuenta esta historia" sub="Casos verificados o reportados de cobertura favorable a los desarrolladores, contenido patrocinado, censura y campañas de comunicación pagadas." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
          {["todos", "crítico", "alto", "medio"].map(f => (
            <button key={f} onClick={() => setMediaFilter(f)} style={{ background: mediaFilter === f ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "rgba(255,255,255,0.04)", color: mediaFilter === f ? "white" : "#a1a1aa", border: `1px solid ${mediaFilter === f ? "transparent" : "rgba(255,255,255,0.1)"}`, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filteredMedia.map(m => <Crystal key={m.id} hover={false} style={{ padding: "20px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#f87171", letterSpacing: 1 }}>{m.medio.toUpperCase()}</div>
              <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#52525b" }}>{m.fecha}</div>
            </div>
            <div style={{ fontSize: 15, color: "#fafafa", fontStyle: "italic", marginBottom: 10, lineHeight: 1.4 }}>{m.titulo}</div>
            <p style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.8, marginBottom: 10 }}>{m.descripcion}</p>
            <div style={{ marginBottom: 8 }}><EvidenceBadge c={m.certainty} /></div>
            {m.contrasten && <div style={{ fontSize: 12, color: "#4ade80", lineHeight: 1.7, borderLeft: "2px solid #4ade8044", paddingLeft: 12, marginTop: 8 }}>{m.contrasten}</div>}
            {m.url && <div style={{ marginTop: 10 }}><a href={m.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#60a5fa" }}>VER FUENTE ORIGINAL →</a></div>}
          </Crystal>)}
        </div>
      </section>

      {/* DOCUMENTOS (evidencia + documentales) */}
      <section id="documentos" style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="LA EVIDENCIA" title="No tienes que creernos" sub="Decretos, exenciones y determinaciones ambientales del proyecto Esencia, documentados uno por uno." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
          {["todo", "gobierno", "ambiente", "permisos", "empresa"].map(f => (
            <button key={f} onClick={() => setDocFilter(f)} style={{ background: docFilter === f ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "rgba(255,255,255,0.04)", color: docFilter === f ? "white" : "#a1a1aa", border: `1px solid ${docFilter === f ? "transparent" : "rgba(255,255,255,0.1)"}`, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filteredDocs.map(leg => <Crystal key={leg.id} hover={false} style={{ padding: "20px 20px" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <Tag>{leg.type}</Tag><Tag color="#4ade80">{leg.status}</Tag><Tag color={leg.impact === "directo" ? "#f87171" : "#fbbf24"}>{leg.impact === "directo" ? "IMPACTO DIRECTO" : "IMPACTO INDIRECTO"}</Tag><EvidenceBadge c={leg.certainty} />
            </div>
            <div style={{ fontSize: 17, color: "#fafafa", marginBottom: 6, lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{leg.title}</div>
            {leg.subtitle && <div style={{ fontSize: 12, color: "#71717a", marginBottom: 10 }}>{leg.subtitle}</div>}
            <div style={{ fontSize: 10.5, color: "#71717a", fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>{leg.date}</div>
            <p style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.8, marginBottom: 10 }}>{leg.description}</p>
            {leg.monto !== "N/A" && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, color: "#4ade80", marginBottom: 10 }}>{leg.monto}</div>}
            <SourceChip>{leg.source}</SourceChip>
            {leg.criticas?.length > 0 && <div style={{ marginTop: 14 }}>
              {leg.criticas.map((c, i) => <div key={i} style={{ marginTop: 8, borderLeft: "2px solid #f87171", paddingLeft: 12 }}>
                <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#fbbf24", marginBottom: 4 }}>{c.quien}</div>
                <div style={{ fontSize: 12.5, color: "#d4d4d8", fontStyle: "italic", lineHeight: 1.7 }}>"{c.texto}"</div>
              </div>)}
            </div>}
          </Crystal>)}
        </div>

        <div style={{ marginTop: 56 }}>
          <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 18 }}>SERIE DOCUMENTAL — LA ESENCIA DEL CONFLICTO</div>
          <p style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 20, lineHeight: 1.7 }}>Producida por La Contraparte (@gaboramospr).</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[{ t: "Parte 1", id: "ouKgJfcydos" }, { t: "Parte 2", id: "IS8PSCwl83w" }, { t: "Parte 3", id: "DvVkcCeBB5A" }].map((doc, i) => (
              <div key={i}>
                <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: "#71717a", marginBottom: 8 }}>{doc.t.toUpperCase()}</div>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <iframe src={`https://www.youtube.com/embed/${doc.id}`} title={doc.t} loading="lazy" frameBorder="0" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGÍA / TRUST LAYER */}
      <section id="metodologia" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="TRUST LAYER" title="Cómo verificamos la información" sub="Detrás de Esencia utiliza documentos públicos, registros gubernamentales, datos electorales y fuentes periodísticas identificadas. Cada afirmación relevante puede rastrearse hasta su fuente." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 34 }}>
          {["FUENTE PRIMARIA", "DOCUMENTO OFICIAL", "CEE", "OGPE", "DRNA", "LEGISLATURA", "REGISTRO CORPORATIVO", "FUENTE PERIODÍSTICA"].map(b => <Tag key={b} color="#a1a1aa">{b}</Tag>)}
        </div>
        {[
          { t: "FUENTES PRIMARIAS", items: ["Comisión Estatal de Elecciones (CEE)", "Oficina del Contralor Electoral", "Registro Corporativo del Dept. de Estado de PR", "OGPe — Expediente DIA y Consulta de Ubicación de Esencia", "Decretos de la Compañía de Turismo de Puerto Rico", "Conferencias de prensa públicas"] },
          { t: "FUENTES PERIODÍSTICAS", items: ["Centro de Periodismo Investigativo (CPI)", "NotiCel", "El Vocero", "Telemundo PR", "Marea Ecologista", "Bonita Radio", "The Real Deal", "Bloomberg", "Metro Puerto Rico"] },
          { t: "OTRAS FUENTES", items: ["Publicaciones públicas de la Coalición Defiende a Cabo Rojo", "Declaraciones públicas documentadas"] },
        ].map((cat, i) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 12 }}>{cat.t}</div>
            {cat.items.map((it, j) => <div key={j} style={{ fontSize: 13, color: "#d4d4d8", padding: "9px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>{it}</div>)}
          </div>
        ))}
        <Crystal hover={false} style={{ padding: "18px 20px", marginTop: 12 }}>
          <div style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.8 }}>Esta plataforma es de carácter informativo y no realiza alegaciones sin evidencia documental. No constituye asesoramiento legal. Última actualización: 09 de agosto de 2026.</div>
        </Crystal>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#3f3f46", letterSpacing: 1, lineHeight: 2.2 }}>
          DETRÁS DE ESENCIA · PLATAFORMA DE TRANSPARENCIA CIUDADANA · PUERTO RICO<br />
          Fuentes primarias: CEE · Contralor Electoral · Dept. de Estado PR · OGPe<br />
          Fuentes periodísticas: CPI · NotiCel · El Vocero · Telemundo PR · Marea Ecologista
        </div>
      </footer>

      <PersonModal person={modal?.person} kind={modal?.kind} onClose={() => setModal(null)} />
    </div>
  );
}
