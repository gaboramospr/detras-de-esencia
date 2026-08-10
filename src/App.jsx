import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// i18n helper — L(es, en) wraps bilingual text. pick(field, lang) resolves it.
// ═══════════════════════════════════════════════════════════════════════════
const L = (es, en) => ({ es, en });
const pick = (field, lang) => (field && typeof field === "object" && "es" in field) ? field[lang] : field;

const UI = {
  es: {
    tagline: "INVESTIGACIÓN · TRANSPARENCIA CIUDADANA · PUERTO RICO", lastUpdate: "ÚLTIMA ACTUALIZACIÓN · 09 AGO 2026",
    nav: { investigacion: "Investigación", personas: "Personas", dinero: "Dinero", conexiones: "Conexiones", proyecto: "El Proyecto", cronologia: "Cronología", medios: "Medios", documentos: "Documentos", metodologia: "Fuentes", apoya: "Apoya" },
    heroTitlePrefix: "Detrás de", heroSub: "El dinero. Los permisos. Las conexiones. Las personas detrás de la ciudad privada que un grupo de inversionistas pretende levantar dentro de Cabo Rojo — y que amenaza con desplazar a sus comunidades.",
    heroFoot: "Una investigación basada en documentos públicos, registros gubernamentales, datos electorales y fuentes periodísticas.",
    btnExplore: "EXPLORAR LA INVESTIGACIÓN", btnConnections: "VER LAS CONEXIONES", btnDocs: "VER DOCUMENTOS",
    introEyebrow: "¿QUÉ ES ESENCIA Y POR QUÉ IMPORTA?",
    introBody: "Esencia no es \"un desarrollo\": es una ciudad privada de lujo —hoteles, campos de golf, cientos de residencias— que un grupo de inversionistas extranjeros pretende levantar dentro de terreno de Cabo Rojo. El gobierno le ha regalado casi $498 millones en créditos contributivos. La Autoridad de Acueductos confirmó que no tiene capacidad para suplirle agua. La OGPe aprobó su Declaración de Impacto Ambiental el 24 de diciembre de 2025 y su Consulta de Ubicación a finales de julio de 2026, ambas sin vistas públicas. Esta plataforma documenta, con evidencia pública, quién está detrás.",
    numbers: [
      { l: "en donaciones políticas rastreadas", src: "CEE / Contralor Electoral" }, { l: "políticos identificados como receptores", src: "CEE / Contralor Electoral" },
      { l: "regalados en créditos contributivos", src: "Compañía de Turismo PR" }, { l: "en inversión proyectada según OGPe", src: "Marea Ecologista, 31/jul/2026" },
    ],
    personasEyebrow: "LOS ACTORES", personasTitle: "Las personas detrás de Esencia",
    personasSub: "Inversionistas, desarrolladores y las figuras políticas que se han beneficiado de su dinero — o que se le han opuesto. Toca un nombre para ver el perfil completo.",
    investorsLabel: "INVERSIONISTAS Y DESARROLLADORES", politiciansLabel: "FIGURAS POLÍTICAS",
    dineroEyebrow: "EL DINERO", dineroTitle: "Sigue el dinero",
    dineroSub: "Los mismos inversionistas que quieren levantar Esencia han comprado influencia en ambos partidos, mientras el gobierno les regala cientos de millones en créditos contributivos.",
    showAll: "VER TODOS LOS DATOS →", hideAll: "OCULTAR TODOS LOS DATOS", total: "total",
    conexionesEyebrow: "EL MAPA", conexionesTitle: "¿Quién está conectado con quién?",
    conexionesSub: "Una red de relaciones entre inversionistas, entidades legales, políticos y decisiones gubernamentales. Toca un nombre o una línea.",
    legendInv: "inversionista/empresa", legendEnt: "entidad legal", legendPol: "político", legendGov: "acción gubernamental",
    proyectoEyebrow: "EL TERRITORIO", proyectoTitle: "Lo que Esencia le costaría a Cabo Rojo",
    proyectoSub: "Según la investigación de un año del representante Emilio Carlo, con biólogos, químicos, planificadores, ambientalistas y economistas.",
    cronologiaEyebrow: "LA LÍNEA DE TIEMPO", cronologiaTitle: "Cómo llegamos aquí",
    cronologiaSub: "Las decisiones que le han abierto paso a Esencia dentro de Cabo Rojo, desde 2019 hasta el presente.",
    mediosEyebrow: "COBERTURA MEDIÁTICA", mediosTitle: "Cómo se cuenta esta historia",
    mediosSub: "Casos verificados o reportados de cobertura favorable a los desarrolladores, contenido patrocinado, censura y campañas de comunicación pagadas.",
    viewSource: "VER FUENTE ORIGINAL →",
    docsEyebrow: "LA EVIDENCIA", docsTitle: "No tienes que creernos",
    docsSub: "Decretos, exenciones y determinaciones ambientales del proyecto Esencia, documentados uno por uno.",
    docSeriesEyebrow: "SERIE DOCUMENTAL — LA ESENCIA DEL CONFLICTO", docSeriesBody: "Producida por La Contraparte (@gaboramospr).",
    metEyebrow: "TRUST LAYER", metTitle: "Cómo verificamos la información",
    metSub: "Detrás de Esencia utiliza documentos públicos, registros gubernamentales, datos electorales y fuentes periodísticas identificadas. Cada afirmación relevante puede rastrearse hasta su fuente.",
    primarySources: "FUENTES PRIMARIAS", pressSources: "FUENTES PERIODÍSTICAS", otherSources: "OTRAS FUENTES",
    disclaimer: "Esta plataforma es de carácter informativo y no realiza alegaciones sin evidencia documental. No constituye asesoramiento legal. Última actualización: 09 de agosto de 2026.",
    apoyaNav: "Apoya", apoyaEyebrow: "APOYA ESTA INVESTIGACIÓN", apoyaHeroTitle: "Ayúdanos a seguir investigando",
    apoyaHeroSub: "Detrás de Esencia es una investigación independiente. Tu aportación nos ayuda a continuar documentando, investigando y haciendo pública la información detrás del proyecto Esencia.",
    apoyaMessageTitle: "ESTA INVESTIGACIÓN NECESITA TIEMPO, RECURSOS Y PERSONAS DISPUESTAS A SOSTENERLA",
    apoyaMessageBody: "Investigar significa buscar documentos, analizar información, viajar, entrevistar expertos y comunidades, producir contenido audiovisual y mantener accesible toda la evidencia recopilada. Si este trabajo te parece importante, puedes ayudarnos a continuar. Cada aportación cuenta.",
    apoyaCardTitle: "Apoya esta investigación", apoyaAmountLabel: "Elige una cantidad", apoyaOtherAmount: "Otra cantidad",
    apoyaOnceLabel: "Aportación única", apoyaMonthlyLabel: "Aportación mensual", apoyaMonthlySoon: "Próximamente",
    apoyaButtonPay: "APOYAR CON PAYPAL", apoyaOpensNewTab: "Se abrirá PayPal en una pestaña nueva.",
    apoyaNotConfigured: "Configuración de PayPal pendiente — el enlace se activará en cuanto se conecte una cuenta de PayPal.",
    apoyaTransparencyTitle: "¿Para qué se utiliza tu aportación?",
    apoyaTransparencyNote: "Estos son ejemplos de los costos que las aportaciones ayudan a sostener — no una asignación contable exacta por dólar.",
    apoyaCat1t: "INVESTIGACIÓN", apoyaCat1d: "Documentos, datos y búsqueda de información.",
    apoyaCat2t: "PRODUCCIÓN", apoyaCat2d: "Grabaciones, entrevistas y contenido audiovisual.",
    apoyaCat3t: "TRABAJO DE CAMPO", apoyaCat3d: "Viajes y documentación en las comunidades.",
    apoyaCat4t: "PLATAFORMA", apoyaCat4d: "Hosting, herramientas y mantenimiento de DetrasDeEsencia.com.",
    apoyaPrivacy: "Los pagos son procesados de forma segura por PayPal. Detrás de Esencia no almacena los datos de tu tarjeta ni tus credenciales de PayPal.",
    apoyaShare: "COMPARTIR DETRÁS DE ESENCIA", apoyaBackTop: "VOLVER A LA INVESTIGACIÓN",
    footerLine1: "DETRÁS DE ESENCIA · PLATAFORMA DE TRANSPARENCIA CIUDADANA · PUERTO RICO",
    footerLine2: "Fuentes primarias: CEE · Contralor Electoral · Dept. de Estado PR · OGPe",
    footerLine3: "Fuentes periodísticas: CPI · NotiCel · El Vocero · Telemundo PR · Marea Ecologista",
    searchPlaceholder: "Buscar personas, empresas, permisos, donaciones o documentos…",
    noResults: "Sin resultados", donationsReceived: "DONACIONES RECIBIDAS", donationsMade: "DONACIONES REALIZADAS",
    govActions: "ACCIONES GUBERNAMENTALES", statementsLabel: "DECLARACIONES", relatedEntities: "Entidades relacionadas",
    seeEvidence: "Ver evidencia", donorUnspecified: "Donante no especificado", investorType: "EMPRESA", personType: "PERSONA", docType: "DOCUMENTO",
    filters: { todo: "todo", gobierno: "gobierno", empresa: "empresa", donacion: "donación", legal: "legal", ambiente: "ambiente", permisos: "permisos", comunidad: "comunidad", todos: "todos", critico: "crítico", alto: "alto", medio: "medio" },
    directImpact: "IMPACTO DIRECTO", indirectImpact: "IMPACTO INDIRECTO",
  },
  en: {
    tagline: "INVESTIGATION · CITIZEN TRANSPARENCY · PUERTO RICO", lastUpdate: "LAST UPDATED · AUG 09, 2026",
    nav: { investigacion: "Investigation", personas: "People", dinero: "Money", conexiones: "Connections", proyecto: "The Project", cronologia: "Timeline", medios: "Media", documentos: "Documents", metodologia: "Sources", apoya: "Support" },
    heroTitlePrefix: "Behind", heroSub: "The money. The permits. The connections. The people behind the private city a group of investors wants to build inside Cabo Rojo — and that threatens to displace its communities.",
    heroFoot: "An investigation based on public documents, government records, electoral data, and journalistic sources.",
    btnExplore: "EXPLORE THE INVESTIGATION", btnConnections: "SEE THE CONNECTIONS", btnDocs: "SEE DOCUMENTS",
    introEyebrow: "WHAT IS ESENCIA AND WHY DOES IT MATTER?",
    introBody: "Esencia isn't \"a development\": it's a luxury private city — hotels, golf courses, hundreds of residences — that a group of foreign investors wants to build inside Cabo Rojo land. The government has handed it nearly $498 million in tax credits. The Aqueduct and Sewer Authority confirmed it has no capacity to supply it with water. The Puerto Rico Permit Management Office (OGPe) approved its Environmental Impact Statement on December 24, 2025 and its Location Consultation in late July 2026 — both without public hearings. This platform documents, with public evidence, who's behind it.",
    numbers: [
      { l: "in tracked political donations", src: "CEE / State Electoral Comptroller" }, { l: "politicians identified as recipients", src: "CEE / State Electoral Comptroller" },
      { l: "handed out in tax credits", src: "Puerto Rico Tourism Company" }, { l: "in projected investment per OGPe filing", src: "Marea Ecologista, Jul 31, 2026" },
    ],
    personasEyebrow: "THE PLAYERS", personasTitle: "The people behind Esencia",
    personasSub: "Investors, developers, and the political figures who have benefited from their money — or who have opposed it. Tap a name to see the full profile.",
    investorsLabel: "INVESTORS AND DEVELOPERS", politiciansLabel: "POLITICAL FIGURES",
    dineroEyebrow: "THE MONEY", dineroTitle: "Follow the money",
    dineroSub: "The same investors who want to build Esencia have bought influence in both political parties, while the government hands them hundreds of millions in tax credits.",
    showAll: "SEE ALL THE DATA →", hideAll: "HIDE ALL THE DATA", total: "total",
    conexionesEyebrow: "THE MAP", conexionesTitle: "Who's connected to whom?",
    conexionesSub: "A network of relationships between investors, legal entities, politicians, and government decisions. Tap a name or a line.",
    legendInv: "investor/company", legendEnt: "legal entity", legendPol: "politician", legendGov: "government action",
    proyectoEyebrow: "THE LAND", proyectoTitle: "What Esencia would cost Cabo Rojo",
    proyectoSub: "Based on a year-long investigation by Rep. Emilio Carlo, with biologists, chemists, planners, environmentalists, and economists.",
    cronologiaEyebrow: "THE TIMELINE", cronologiaTitle: "How we got here",
    cronologiaSub: "The decisions that have cleared the way for Esencia inside Cabo Rojo, from 2019 to the present.",
    mediosEyebrow: "MEDIA COVERAGE", mediosTitle: "How this story gets told",
    mediosSub: "Verified or reported cases of coverage favorable to the developers, sponsored content, censorship, and paid communications campaigns.",
    viewSource: "SEE ORIGINAL SOURCE →",
    docsEyebrow: "THE EVIDENCE", docsTitle: "You don't have to take our word for it",
    docsSub: "Decrees, exemptions, and environmental determinations for the Esencia project, documented one by one.",
    docSeriesEyebrow: "DOCUMENTARY SERIES — THE ESENCIA CONFLICT", docSeriesBody: "Produced by La Contraparte (@gaboramospr).",
    metEyebrow: "TRUST LAYER", metTitle: "How we verify this information",
    metSub: "Detrás de Esencia uses public documents, government records, electoral data, and identified journalistic sources. Every significant claim can be traced back to its source.",
    primarySources: "PRIMARY SOURCES", pressSources: "JOURNALISTIC SOURCES", otherSources: "OTHER SOURCES",
    disclaimer: "This platform is informational and does not make claims without documentary evidence. It does not constitute legal advice. Last updated: August 9, 2026.",
    apoyaNav: "Support", apoyaEyebrow: "SUPPORT THIS INVESTIGATION", apoyaHeroTitle: "Help us keep investigating",
    apoyaHeroSub: "Detrás de Esencia is an independent investigation. Your contribution helps us keep documenting, investigating, and publishing the information behind the Esencia project.",
    apoyaMessageTitle: "THIS INVESTIGATION NEEDS TIME, RESOURCES, AND PEOPLE WILLING TO SUSTAIN IT",
    apoyaMessageBody: "Investigating means finding documents, analyzing information, traveling, interviewing experts and communities, producing audiovisual content, and keeping all the evidence gathered accessible. If this work matters to you, you can help us continue. Every contribution counts.",
    apoyaCardTitle: "Support this investigation", apoyaAmountLabel: "Choose an amount", apoyaOtherAmount: "Other amount",
    apoyaOnceLabel: "One-time contribution", apoyaMonthlyLabel: "Monthly contribution", apoyaMonthlySoon: "Coming soon",
    apoyaButtonPay: "SUPPORT VIA PAYPAL", apoyaOpensNewTab: "PayPal will open in a new tab.",
    apoyaNotConfigured: "PayPal setup pending — this link will activate once a PayPal account is connected.",
    apoyaTransparencyTitle: "What does your contribution go toward?",
    apoyaTransparencyNote: "These are examples of the costs contributions help cover — not an exact dollar-by-dollar accounting.",
    apoyaCat1t: "RESEARCH", apoyaCat1d: "Documents, data, and information gathering.",
    apoyaCat2t: "PRODUCTION", apoyaCat2d: "Recordings, interviews, and video content.",
    apoyaCat3t: "FIELD WORK", apoyaCat3d: "Travel and on-the-ground documentation in communities.",
    apoyaCat4t: "PLATFORM", apoyaCat4d: "Hosting, tools, and maintenance for DetrasDeEsencia.com.",
    apoyaPrivacy: "Payments are processed securely by PayPal. Detrás de Esencia does not store your card details or PayPal credentials.",
    apoyaShare: "SHARE DETRÁS DE ESENCIA", apoyaBackTop: "BACK TO THE INVESTIGATION",
    footerLine1: "DETRÁS DE ESENCIA · CITIZEN TRANSPARENCY PLATFORM · PUERTO RICO",
    footerLine2: "Primary sources: CEE · State Electoral Comptroller · PR Dept. of State · OGPe",
    footerLine3: "Journalistic sources: CPI · NotiCel · El Vocero · Telemundo PR · Marea Ecologista",
    searchPlaceholder: "Search people, companies, permits, donations, or documents…",
    noResults: "No results", donationsReceived: "DONATIONS RECEIVED", donationsMade: "DONATIONS MADE",
    govActions: "RELATED GOVERNMENT ACTIONS", statementsLabel: "STATEMENTS", relatedEntities: "Related entities",
    seeEvidence: "See profile", donorUnspecified: "Donor not specified", investorType: "COMPANY", personType: "PERSON", docType: "DOCUMENT",
    filters: { todo: "all", gobierno: "government", empresa: "company", donacion: "donation", legal: "legal", ambiente: "environment", permisos: "permits", comunidad: "community", todos: "all", critico: "critical", alto: "high", medio: "medium" },
    directImpact: "DIRECT IMPACT", indirectImpact: "INDIRECT IMPACT",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// DATOS — bilingual fields via L(es, en). Names, numbers, URLs stay as-is.
// ═══════════════════════════════════════════════════════════════════════════

const INVESTORS = [
  { id: "inv-001", name: "Roberto Ruiz Vargas", type: L("Individuo / Co-fundador", "Individual / Co-founder"), tag: L("PROYECTISTA", "DEVELOPER"),
    role: L("Co-fundador y COO de Three Rules Capital. Portavoz principal de la ciudad privada Esencia. Descendiente de madre puertorriqueña y padre dominicano. Reside en Puerto Rico desde 2022.",
      "Co-founder and COO of Three Rules Capital. Lead spokesperson for the private city Esencia. Son of a Puerto Rican mother and Dominican father. Has lived in Puerto Rico since 2022."),
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
      { date: "2024", texto: L("El turismo de lujo es una forma de desarrollar minimizando la huella ambiental.", "Luxury tourism is a way of developing while minimizing the environmental footprint."), fuente: "Puerto Rico Real Estate Summit – CPI oct 2025" },
      { date: "2025-03", texto: L("Desde el principio hemos mantenido comunicación abierta y disponible con los grupos de interés.", "From the start we've kept open, available communication with stakeholder groups."), fuente: "CPI jun 2025" },
    ],
  },
  { id: "inv-002", name: "William (Will) Bennett", type: L("Individuo / CEO", "Individual / CEO"), tag: L("PROYECTISTA", "DEVELOPER"),
    role: L("CEO y co-fundador de Three Rules Capital. Reside en Puerto Rico desde 2022. Anterior director general de Irongate (Costa Palmas, Los Cabos, México). También trabajó en Related (70 Vestry, Nueva York).",
      "CEO and co-founder of Three Rules Capital. Has lived in Puerto Rico since 2022. Former managing director at Irongate (Costa Palmas, Los Cabos, Mexico). Also worked at Related (70 Vestry, New York)."),
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
    declaraciones: [{ date: "2025", texto: L("Somos como caballos con anteojeras, completamente enfocados en Esencia.", "We're like horses with blinders on, completely focused on Esencia."), fuente: "The Real Deal, abr 2025" }],
  },
  { id: "inv-003", name: "Harish Venkatesh", type: L("Individuo / Socio", "Individual / Partner"), tag: L("PROYECTISTA", "DEVELOPER"),
    role: L("Tercer socio de Three Rules Capital. Se unió en 2023. Presente en las vistas públicas de la OGPe en Cabo Rojo (marzo 2025).", "Third partner at Three Rules Capital. Joined in 2023. Present at OGPe public hearings in Cabo Rojo (March 2025)."),
    relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"], executives: [], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "CPI 'Las miradas silenciosas del proyecto Esencia' mar 2025; The Real Deal abr 2025", declaraciones: [],
  },
  { id: "inv-004", name: "Three Rules Capital", type: L("Empresa desarrolladora", "Development company"), tag: L("PROYECTISTA", "DEVELOPER"),
    role: L("Firma detrás de la ciudad privada Esencia. Fundada por Will Bennett y Roberto Ruiz Vargas. Inversión proyectada de ~$2,684 millones para construir dentro de Cabo Rojo, según el expediente de OGPe.",
      "The firm behind the private city Esencia. Founded by Will Bennett and Roberto Ruiz Vargas. Projected investment of ~$2.684 billion to build inside Cabo Rojo, per the OGPe filing."),
    executives: ["Will Bennett (CEO)", "Roberto Ruiz Vargas (COO)", "Harish Venkatesh (socio)"],
    relatedEntities: ["Cabo Rojo Land Acquisition LLC", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "NotiCel may 2024; The Real Deal abr 2025; OGPe – Trámite 2026-693109-CUB-013470 (vía Marea Ecologista)", declaraciones: [],
  },
  { id: "inv-005", name: "Reuben Brothers", type: L("Empresa inversionista", "Investment firm"), tag: L("PROYECTISTA", "DEVELOPER"),
    role: L("Firma de inversión familiar británica. Co-financiadora de la ciudad privada Esencia. Fundada por David y Simon Reuben. JPMorgan Chase provee financiamiento adicional.",
      "British family investment firm. Co-financier of the private city Esencia. Founded by David and Simon Reuben. JPMorgan Chase provides additional financing."),
    executives: ["David Reuben", "Simon Reuben", "Jamie Reuben"], relatedEntities: ["Three Rules Capital", "Cabo Rojo Land Acquisition LLC"],
    donations: [], totalDonated: 0, certeza: "confirmado", fuente: "CPI jun 2025; The Real Deal abr 2025; Bloomberg may 2024", declaraciones: [],
  },
  { id: "inv-006", name: "Cabo Rojo Land Acquisition LLC", type: L("Entidad legal del proyecto", "Legal entity for the project"), tag: L("PROYECTISTA", "DEVELOPER"),
    role: L("Entidad registrada en PR el 25 de marzo de 2019. Vehículo legal de Reuben Brothers y Three Rules Capital. Titular del decreto de exención contributiva (~$498M) y de la Consulta de Ubicación aprobada por la OGPe.",
      "Entity registered in PR on March 25, 2019. Legal vehicle for Reuben Brothers and Three Rules Capital. Holder of the tax exemption decree (~$498M) and the Location Consultation approved by OGPe."),
    executives: [], relatedEntities: ["Three Rules Capital", "Reuben Brothers"], donations: [], totalDonated: 0, certeza: "confirmado",
    fuente: "Registro Corporativo PR; OGPe – Expediente DIA Esencia; CPI oct 2025", declaraciones: [],
  },
];

const POLITICIANS = [
  { id: "pol-001", name: "Thomas Rivera Schatz", party: "PNP", position: L("Presidente del Senado de Puerto Rico", "President of the Puerto Rico Senate"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 6200,
    donations: [
      { date: "2024-10-03", amount: 3100, donor: "inv-001", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Thomas Rivera Schatz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: ["leg-006"], statements: [] },
  { id: "pol-002", name: "Ángel Matos García", party: "PPD", position: L("Exrepresentante · Presidió Comisión de Desarrollo de Industria Turística (cuatrienio anterior)", "Former Representative · Chaired the Tourism Industry Development Commission (previous term)"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 6200,
    donations: [
      { date: "2024-10-01", amount: 3100, donor: "inv-001", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Amigos de Ángel Matos García", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-003", name: "Jesús Manuel Ortiz González", party: "PPD", position: L("Excandidato a la gobernación (PPD)", "Former gubernatorial candidate (PPD)"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3100,
    donations: [{ date: "2024-09-26", amount: 3100, donor: "inv-001", comite: "Comité Jesús Manuel Ortiz González, Inc.", source: "CEE sep 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-004", name: "Partido Nuevo Progresista (PNP)", party: "PNP", position: L("Comité central del partido / Comité Municipal PNP San Juan", "Party central committee / PNP San Juan Municipal Committee"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 6200,
    donations: [
      { date: "2025-06-29", amount: 3100, donor: "inv-001", comite: "Partido Nuevo Progresista", source: "CEE jun 2025 – transferencia electrónica", certainty: "confirmado" },
      { date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Municipal PNP San Juan", source: "CEE / CPI oct 2025", certainty: "confirmado" },
    ], legislation: ["leg-001", "leg-002"], statements: [] },
  { id: "pol-005", name: "Jenniffer González Colón", party: "PNP", position: L("Gobernadora de Puerto Rico", "Governor of Puerto Rico"), tag: L("GOBIERNO", "GOVERNMENT"), totalReceived: 1000,
    donations: [{ date: "2025-04-10", amount: 1000, donor: "inv-001", comite: "Comité Jenniffer González Colón Inc.", source: "CEE abr 2025", certainty: "confirmado" }], legislation: ["leg-002", "leg-005"], statements: [] },
  { id: "pol-006", name: "Carlos \"Johnny\" Méndez", party: "PNP", position: L("Presidente de la Cámara de Representantes de Puerto Rico", "Speaker of the Puerto Rico House of Representatives"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3100,
    donations: [{ date: "2025-06-26", amount: 3100, donor: "inv-001", comite: "Comité Amigos Johnny Méndez", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-007", name: "Virgilio Olivera Olivera", party: "PNP", position: L("Alcalde de San Germán", "Mayor of San Germán"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3000,
    donations: [{ date: "2025-06-24", amount: 3000, donor: "inv-001", comite: "Virgilio Olivera Olivera", source: "CEE jun 2025", certainty: "confirmado" }], legislation: [],
    statements: [{ date: "2025-03", texto: L("Participó en la vista pública de la OGPe y resaltó el impacto económico favorable del proyecto para la región suroeste.", "Took part in the OGPe public hearing and highlighted the project's favorable economic impact for the southwest region."), fuente: "CPI jun 2025" }] },
  { id: "pol-008", name: "José Luis Dalmau Santiago", party: "PPD", position: L("Senador / Exlíder del PPD", "Senator / Former PPD leader"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3100,
    donations: [{ date: "2024-10-22", amount: 3100, donor: "inv-001", comite: "Comité Amigos José Luis Dalmau Santiago", source: "CEE oct 2024", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-009", name: "Miguel Romero Lugo", party: "PNP", position: L("Alcalde de San Juan", "Mayor of San Juan"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3100,
    donations: [{ date: "2024-09-30", amount: 3100, donor: "inv-001", comite: "Comité Miguel Romero Lugo", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-010", name: "Roberto 'Bobby' Ramírez Kurtz", party: "PPD", position: L("Exalcalde de Cabo Rojo", "Former Mayor of Cabo Rojo"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 6200,
    donations: [
      { date: "2024-10-04", amount: 3100, donor: "inv-001", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE / CPI oct 2025", certainty: "confirmado" },
      { date: "2024-11-06", amount: 3100, donor: "inv-002", comite: "Comité Amigos Roberto 'Bobby' Ramírez Kurtz", source: "CEE – California nov 2024", certainty: "confirmado" },
    ], legislation: [], statements: [] },
  { id: "pol-011", name: "Tatiana Pérez Ramírez", party: "PNP", position: L("Representante PNP (al largo)", "PNP At-Large Representative"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3100,
    donations: [{ date: "2024", amount: 3100, donor: "inv-002", comite: "Comité Tatiana Pérez Ramírez", source: "CEE / CPI oct 2025", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-012", name: "Jorge Morales Wiscovitch", party: "PNP", position: L("Alcalde de Cabo Rojo", "Mayor of Cabo Rojo"), tag: L("GOBIERNO", "GOVERNMENT"), totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2025-03", texto: L("Esencia generará empleos para los caborrojeños, especialmente durante la construcción.", "Esencia will generate jobs for Cabo Rojo residents, especially during construction."), fuente: "CPI ago 2025" },
      { date: "2025-03", texto: L("No queremos una buena economía a expensas del daño ambiental.", "We don't want a good economy at the expense of environmental damage."), fuente: "CPI ago 2025" },
    ] },
  { id: "pol-013", name: "Wanda Vázquez Garced", party: "PNP", position: L("Exgobernadora de Puerto Rico", "Former Governor of Puerto Rico"), tag: L("GOBIERNO", "GOVERNMENT"), totalReceived: 0, donations: [], legislation: ["leg-001"],
    statements: [{ date: "2020-12", texto: L("Bajo su administración se otorgó el decreto de exención contributiva original a Cabo Rojo Land Acquisition LLC (Compañía de Turismo).", "Under her administration, the original tax exemption decree was granted to Cabo Rojo Land Acquisition LLC (Tourism Company)."), fuente: "CPI oct 2025" }] },
  { id: "pol-014", name: "Pedro Pierluisi", party: "PNP", position: L("Exgobernador de Puerto Rico", "Former Governor of Puerto Rico"), tag: L("GOBIERNO", "GOVERNMENT"), totalReceived: null,
    donations: [{ date: "No especificada", amount: null, donor: null, donorName: L("Vinculado(s) a Esencia (fuente no especifica monto ni donante exacto)", "Linked to Esencia (source doesn't specify amount or exact donor)"), comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }],
    legislation: ["leg-001", "leg-002"],
    statements: [{ date: "2024", texto: L("Bajo su administración se enmendó el decreto contributivo original y se emitió la exención del 90% en aranceles para parcelas del proyecto.", "Under his administration, the original tax decree was amended and the 90% exemption on fees was issued for the project's parcels."), fuente: "CPI oct 2025" }] },
  { id: "pol-015", name: "María de Lourdes Santiago", party: "PIP", position: L("Senadora · Vicepresidenta del PIP · EN CONTRA DEL PROYECTO ESENCIA", "Senator · PIP Vice President · OPPOSES THE ESENCIA PROJECT"), tag: L("OPOSICIÓN", "OPPOSITION"), totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006", "leg-007"],
    statements: [
      { date: "2025-01", texto: L("Coautora de la RS9 exigiendo investigar el proceso de permisos de Esencia. 'La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", "Co-authored RS9 demanding an investigation into Esencia's permitting process. 'The State's inability to answer simple, obvious questions about Esencia's viability should move the Senate to use its oversight powers.'"), fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12-26", texto: L("Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido. Las varias enmiendas al sistema de otorgar permisos forman parte de un patrón junto a la protección de casonas ilegales en La Parguera y las nuevas dificultades al acceso a la información pública.", "Esencia is a reminder of what those who think government is the paid lackey of their party's political donors are capable of. The various amendments to the permitting system are part of a pattern that includes protecting illegal beach houses in La Parguera and new obstacles to public information access."), fuente: "Prensa Latina, 26/dic/2025" },
    ] },
  { id: "pol-016", name: "Adrián González Costa", party: "PIP", position: L("Senador por Acumulación · PIP · EN CONTRA DEL PROYECTO ESENCIA", "At-Large Senator · PIP · OPPOSES THE ESENCIA PROJECT"), tag: L("OPOSICIÓN", "OPPOSITION"), totalReceived: 0, donations: [], legislation: ["leg-005", "leg-006"],
    statements: [
      { date: "2025-01", texto: L("Coautor de la RS9. 'Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia. La incapacidad del Estado para responder las preguntas sencillas y evidentes sobre la viabilidad de Esencia debe mover al Senado a utilizar sus facultades fiscalizadoras.'", "Co-authored RS9. 'Permitting processes are reduced to sham exercises without rigor or transparency. The State's inability to answer simple, obvious questions about Esencia's viability should move the Senate to use its oversight powers.'"), fuente: "El Vocero, 30/mar/2026 – RS9" },
      { date: "2025-12", texto: L("Junto a la delegación del PIP denunció que la determinación de la OGPe para Esencia fue emitida deliberadamente durante las fiestas de Navidad para acortar el período práctico de respuesta de grupos científicos y comunitarios.", "Alongside the PIP delegation, denounced that OGPe's determination for Esencia was deliberately issued during the Christmas holidays to shorten the practical response window for scientific and community groups."), fuente: "San Juan Daily Star, dic 2025" },
    ] },
  { id: "pol-017", name: "Partido Popular Democrático (PPD)", party: "PPD", position: L("Presidente del PPD: Pablo José Hernández Rivera · Comisionado Residente", "PPD President: Pablo José Hernández Rivera · Resident Commissioner"), tag: L("GOBIERNO", "GOVERNMENT"), totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-03-23", texto: L("Ese proyecto tiene que cumplir con todas las reglamentaciones ambientales y si cuenta con el cumplimiento de todas las leyes y reglamentaciones y con el respaldo local que, a mi juicio, quien mejor lo representa es el alcalde… entonces no veo correcto que desde San Juan o Washington se interfiera.", "That project has to comply with all environmental regulations, and if it complies with all laws and regulations and has local backing — which, in my view, the mayor best represents — then I don't think it's right for San Juan or Washington to interfere."), fuente: "Pablo José Hernández Rivera, Presidente del PPD – NotiCel, 23/mar/2026" },
    ] },
  { id: "pol-018", name: "Pablo José Hernández Rivera", party: "PPD", position: L("Comisionado Residente de Puerto Rico · Presidente del PPD", "Resident Commissioner of Puerto Rico · PPD President"), tag: L("GOBIERNO", "GOVERNMENT"), totalReceived: 0, donations: [], legislation: [],
    statements: [
      { date: "2026-03-23", texto: L("Ese proyecto tiene que cumplir con todas las reglamentaciones ambientales y si cuenta con el cumplimiento de todas las leyes y reglamentaciones y con el respaldo local que, a mi juicio, quien mejor lo representa es el alcalde… entonces no veo correcto que desde San Juan o Washington se interfiera.", "That project has to comply with all environmental regulations, and if it complies with all laws and regulations and has local backing — which, in my view, the mayor best represents — then I don't think it's right for San Juan or Washington to interfere."), fuente: "NotiCel, 23/mar/2026" },
      { date: "2025-12-26", texto: L("El secretario general del PIP, Juan Dalmau, lo emplazó públicamente por su silencio tras la aprobación de la DIA de Esencia. A la fecha, no consta una respuesta pública documentada de Hernández Rivera sobre este señalamiento.", "PIP Secretary General Juan Dalmau publicly called him out for his silence after Esencia's environmental determination was approved. To date, there is no documented public response from Hernández Rivera on this."), fuente: "Telemundo PR, 26/dic/2025" },
    ] },
  { id: "pol-019", name: "Gabriel \"Gaby\" Hernández Rodríguez", party: "PNP", position: L("Alcalde de Camuy · Presidente de la Federación de Alcaldes de PR", "Mayor of Camuy · President of the PR Mayors' Federation"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3000,
    donations: [{ date: "No especificada", amount: 3000, donor: null, donorName: L("Vinculado(s) a Esencia (fuente no especifica cuál proyectista)", "Linked to Esencia (source doesn't specify which developer)"), comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }], legislation: [], statements: [] },
  { id: "pol-020", name: "Gregorio Matías Rosario", party: "PNP", position: L("Senador", "Senator"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 2500,
    donations: [{ date: "No especificada", amount: 2500, donor: null, donorName: L("Vinculado(s) a Esencia (fuente no especifica cuál proyectista)", "Linked to Esencia (source doesn't specify which developer)"), comite: "", source: "Publicación pública citando registros de la Oficina del Contralor Electoral, ago 2026", certainty: "reportado" }], legislation: [], statements: [] },
  { id: "pol-021", name: "Axel \"Chino\" Roque", party: "PNP", position: L("Presidente de la Comisión de Turismo · Legislador PNP", "Chair, Tourism Commission · PNP Legislator"), tag: L("RECIBIÓ DONACIÓN", "RECEIVED DONATION"), totalReceived: 3300,
    donations: [{ date: "2026-02-24", amount: 3300, donor: "inv-001", comite: "", source: "Oficina del Contralor Electoral", certainty: "confirmado" }], legislation: [], statements: [] },
  { id: "pol-022", name: "Emilio Carlo", party: "PNP", position: L("Representante del Distrito 20 (Cabo Rojo, Hormigueros, San Germán) · Exdirector de la AAA Región Oeste", "Representative for District 20 (Cabo Rojo, Hormigueros, San Germán) · Former AAA West Region Director"), tag: L("OPOSICIÓN", "OPPOSITION"), totalReceived: 0, donations: [], legislation: ["leg-008"],
    statements: [
      { date: "2026-08-05", texto: L("Tras doce meses y dos semanas de investigación con biólogos, químicos, planificadores, ambientalistas y economistas, presentó sus hallazgos en la Plaza Ramón Emeterio Betances y se declaró en contra de Esencia.", "After twelve months and two weeks of investigation with biologists, chemists, planners, environmentalists, and economists, he presented his findings at Plaza Ramón Emeterio Betances and declared himself against Esencia."), fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: L("Meses antes había enviado 25 preguntas formales a Cabo Rojo Land Acquisition con 30 días para responder; el 23 de julio los desarrolladores contestaron que no atenderían los señalamientos ni compartirían documentos — días antes de que la OGPe aprobara la Consulta de Ubicación sin celebrar vistas públicas.", "Months earlier he had sent 25 formal questions to Cabo Rojo Land Acquisition with 30 days to respond; on July 23 the developers replied that they would not address the concerns or share documents — days before OGPe approved the Location Consultation without holding public hearings."), fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: L("Según su investigación, la AAA denegó capacidad de agua potable y la AEE denegó acceso a los sistemas de riego de Valle de Lajas por el riesgo a los agricultores de Yauco a Cabo Rojo; calculó un consumo de 1.25 millones de galones diarios para lo que él mismo categorizó como \"una ciudad privada\".", "Per his investigation, the AAA denied drinking-water capacity and the AEE denied access to Valle de Lajas irrigation systems due to the risk to farmers from Yauco to Cabo Rojo; he calculated consumption of 1.25 million gallons daily for what he himself categorized as \"a private city\"."), fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: L("Encontró que el vertedero de Cabo Rojo no tiene celdas suficientes para la basura que generaría el proyecto, y que Hormigueros, Lajas y Mayagüez ya rechazaron recibir esos desechos.", "He found that the Cabo Rojo landfill doesn't have enough cells for the waste the project would generate, and that Hormigueros, Lajas, and Mayagüez already refused to take that waste."), fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: L("Señaló que el proyecto ya recibió $498 millones en exención contributiva, y que Cabo Rojo perdería aproximadamente $30 millones anuales en CRIM, patentes y otros ingresos municipales por esas exenciones.", "He noted the project already received $498 million in tax exemptions, and that Cabo Rojo would lose roughly $30 million a year in property tax, municipal license fees, and other revenue because of those exemptions."), fuente: "NotiCel, 6/ago/2026" },
      { date: "2026-08-05", texto: L("Aclaró que su oposición no es partidista: pidió a los compañeros de su propio partido que investiguen antes de respaldar el proyecto, en vez de asumir que el desarrollo es necesario sin toda la documentación.", "He clarified his opposition isn't partisan: he asked colleagues in his own party to investigate before backing the project, instead of assuming the development is needed without full documentation."), fuente: "NotiCel, 6/ago/2026" },
    ] },
];

const LEGISLATION = [
  { id: "leg-001", title: L("Decreto de Exención Contributiva – Cabo Rojo Land Acquisition LLC", "Tax Exemption Decree – Cabo Rojo Land Acquisition LLC"),
    subtitle: L("Ley de Desarrollo Turístico de PR (incorporada a Ley 60-2019) / Ley 74 de 2010", "PR Tourism Development Act (incorporated into Act 60-2019) / Act 74 of 2010"),
    type: L("Decreto contributivo", "Tax decree"), category: "gobierno", date: "Dic 2020", dateAmended: "2024", status: L("Vigente (enmendado 2024)", "In effect (amended 2024)"),
    administraciones: ["Wanda Vázquez Garced (decreto original, dic 2020)", "Pedro Pierluisi (enmienda 2024)"],
    description: L("La Compañía de Turismo de Puerto Rico le regaló a Cabo Rojo Land Acquisition LLC casi $498 millones en créditos contributivos, más una exención de 10 años en impuestos estatales y municipales, para levantar Esencia dentro de Cabo Rojo. El decreto se otorgó a pesar de que la propia Compañía de Turismo luego reconoció que el proyecto es 'predominantemente residencial'.",
      "The Puerto Rico Tourism Company handed Cabo Rojo Land Acquisition LLC nearly $498 million in tax credits, plus a 10-year exemption on state and municipal taxes, to build Esencia inside Cabo Rojo. The decree was granted even though the Tourism Company itself later acknowledged the project is 'predominantly residential'."),
    monto: L("~$498 millones en créditos contributivos + exención 10 años", "~$498M in tax credits + 10-year exemption"), source: "OGPe – Expediente DIA Esencia; CPI oct 2025; Decreto oficial Compañía de Turismo PR", certainty: "confirmado", impact: "directo" },
  { id: "leg-002", title: L("Exención 90% en Aranceles y Sellos Notariales (parcelas Esencia)", "90% Exemption on Fees and Notarial Stamps (Esencia parcels)"),
    subtitle: L("Certificación de exención", "Exemption certificate"), type: L("Certificación de exención", "Exemption certificate"), category: "gobierno", date: "2022", dateAmended: null, status: L("Vigente", "In effect"),
    administraciones: ["Pedro Pierluisi"],
    description: L("El proponente recibió una exención del 90% para el pago de aranceles y sellos notariales relacionados a las parcelas donde se pretende levantar Esencia, mediante certificación firmada bajo la administración de Pedro Pierluisi.",
      "The developer received a 90% exemption on fees and notarial stamps tied to the parcels where Esencia would be built, via a certification signed under the Pierluisi administration."),
    monto: L("No especificado públicamente", "Not publicly specified"), source: "CPI 'Esencia: un proyecto principalmente residencial con millones en privilegios contributivos turísticos' oct 2025", certainty: "confirmado", impact: "directo" },
  { id: "leg-003", title: L("Solicitud de rediseño del proyecto – DRNA", "Redesign request – DRNA"),
    subtitle: L("Determinación regulatoria ambiental", "Environmental regulatory determination"), type: L("Determinación regulatoria", "Regulatory determination"), category: "ambiente", date: "2025", dateAmended: null, status: L("En proceso", "In process"),
    administraciones: ["Dept. de Recursos Naturales y Ambientales (DRNA)"],
    description: L("El DRNA determinó que el proyecto debe presentar un rediseño que evidencie una redefinición sustancial de su huella ecológica, después de reconocer el daño que causaría a los ecosistemas de Cabo Rojo.",
      "Puerto Rico's Dept. of Natural and Environmental Resources determined the project must submit a redesign showing a substantial reduction of its ecological footprint, after acknowledging the damage it would cause to Cabo Rojo's ecosystems."),
    monto: "N/A", source: "Bonita Radio; CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-004", title: L("Anuncio de acuerdo con Universidad Ana G. Méndez", "Announcement of agreement with Ana G. Méndez University"),
    subtitle: L("Currículo de hospitalidad en Cabo Rojo", "Hospitality curriculum in Cabo Rojo"), type: L("Acuerdo institucional", "Institutional agreement"), category: "empresa", date: "Ene 2025", dateAmended: null, status: L("Anunciado", "Announced"), administraciones: [],
    description: L("Roberto Ruiz Vargas anunció un acuerdo con la Universidad Ana G. Méndez para expandir el currículo de hospitalidad, turismo y artes culinarias en el centro universitario de Cabo Rojo, como parte de la estrategia de relaciones públicas de Esencia.",
      "Roberto Ruiz Vargas announced an agreement with Ana G. Méndez University to expand hospitality, tourism, and culinary arts curricula at the Cabo Rojo campus, as part of Esencia's public relations strategy."),
    monto: "N/A", source: "CPI oct 2025", certainty: "confirmado", impact: "indirecto" },
  { id: "leg-005", title: L("P.A. 114 – Código de Planificación y Permisos de Puerto Rico", "P.A. 114 – Puerto Rico Planning and Permitting Code"),
    subtitle: L("Proyecto de Administración radicado por la Gobernadora Jenniffer González Colón", "Administration bill filed by Governor Jenniffer González Colón"),
    type: L("Proyecto de ley (819 páginas)", "Bill (819 pages)"), category: "permisos", date: "8 abr 2026", dateAmended: null, status: L("En evaluación legislativa – Vistas públicas 13 abr 2026", "Under legislative review – Public hearings Apr 13, 2026"),
    administraciones: ["Jenniffer González Colón (autora)"],
    description: L("Proyecto de 819 páginas que crea un Código unificado de Planificación y Permisos. Deroga más de 40 estatutos, crea la Oficina Central de Permisos (OCP), y reduce la jurisdicción del DRNA. Establece plazos máximos de 180 días para Declaraciones de Impacto Ambiental. ⚠ CONEXIÓN CON ESENCIA: un límite de 180 días habría acelerado el proceso que le abrió paso a Esencia — cuya DIA demoró años y fue objeto de señalamientos de deficiencias técnicas.",
      "An 819-page bill creating a unified Planning and Permitting Code. Repeals over 40 statutes, creates a Central Permits Office (OCP), and reduces DRNA's jurisdiction. Sets a maximum 180-day deadline for Environmental Impact Statements. ⚠ CONNECTION TO ESENCIA: a 180-day limit would have sped up the process that cleared the way for Esencia — whose environmental review took years and drew criticism for technical deficiencies."),
    monto: "N/A", source: "Metro PR 8/abr/2026; NotiCel 8/abr/2026 y 10/abr/2026; DDEC (ddec.pr.gov)", certainty: "confirmado", impact: "directo",
    criticas: [{ quien: "Sen. María de Lourdes Santiago (PIP)", texto: L("Esencia es el recordatorio de lo que son capaces quienes piensan que el gobierno es el lacayo a sueldo de los contribuyentes políticos de su partido.", "Esencia is a reminder of what those who think government is the paid lackey of their party's political donors are capable of."), fuente: "Prensa Latina, 26/dic/2025" }] },
  { id: "leg-006", title: L("P. del S. 1173 – Ley para Simplificar el Sistema de Permisos de Puerto Rico", "S.B. 1173 – Act to Simplify Puerto Rico's Permitting System"),
    subtitle: L("Proyecto radicado por el Presidente del Senado Thomas Rivera Schatz (PNP)", "Bill filed by Senate President Thomas Rivera Schatz (PNP)"),
    type: L("Proyecto de ley del Senado", "Senate bill"), category: "permisos", date: "7 abr 2026", dateAmended: null, status: L("En evaluación – Vista pública conjunta 13 abr 2026 (con P.A. 114)", "Under review – Joint public hearing Apr 13, 2026 (with P.A. 114)"),
    administraciones: ["Thomas Rivera Schatz (autor)"],
    description: L("Medida radicada días antes del proyecto de la gobernadora. Rivera Schatz recibió $3,100 en donaciones de Roberto Ruiz Vargas y $3,100 de Will Bennett. ⚠ CONEXIÓN CON ESENCIA: junto al P.A. 114, crearía un sistema de permisos con jurisdicción reducida del DRNA — el mismo ente que ordenó el rediseño de Esencia.",
      "Filed days before the governor's bill. Rivera Schatz received $3,100 in donations from Roberto Ruiz Vargas and $3,100 from Will Bennett. ⚠ CONNECTION TO ESENCIA: together with P.A. 114, it would create a permitting system with reduced DRNA jurisdiction — the same agency that ordered Esencia's redesign."),
    monto: "N/A", source: "Primera Hora 9/abr/2026; NotiCel 9/abr/2026; Metro PR 10/abr/2026", certainty: "confirmado", impact: "directo",
    criticas: [{ quien: "Sen. Adrián González Costa (PIP)", texto: L("Los procesos de concesión de permisos se reducen a ejercicios simulados sin rigurosidad y transparencia.", "Permitting processes are reduced to sham exercises without rigor or transparency."), fuente: "El Vocero – RS9, ene 2025" }] },
  { id: "leg-007", title: L("Aprobación de la Determinación de Cumplimiento Ambiental (DIA) de Esencia", "Approval of Esencia's Environmental Compliance Determination"),
    subtitle: L("Declaración de Impacto Ambiental notificada por la OGPe", "Environmental Impact Statement notified by OGPe"), type: L("Determinación ambiental", "Environmental determination"), category: "ambiente", date: "24 dic 2025", dateAmended: null, status: L("Aprobada", "Approved"),
    administraciones: ["OGPe, bajo el gobierno de Jenniffer González Colón"],
    description: L("La OGPe notificó, mediante aviso público, la Determinación de Cumplimiento Ambiental de la DIA para Esencia el 24 de diciembre de 2025 — Nochebuena. El megaproyecto turístico-residencial contempla, según esta notificación, 530 unidades de hotel, 1,132 residencias turísticas, áreas comerciales, campos de golf, una escuela, servicios médicos y otras infraestructuras. El secretario general del PIP, Juan Dalmau, repudió públicamente la aprobación y señaló que se hizo en silencio, durante los días festivos, para favorecer intereses privados a costa de recursos naturales y comunidades. Dalmau advirtió que el proyecto amenaza la permanencia de comunidades enteras, encarece vivienda y servicios básicos, y puede empujar a familias caborrojeñas a una migración forzada fuera de su propio pueblo. También emplazó al comisionado residente Pablo José Hernández Rivera por su silencio ante el asunto.",
      "OGPe issued a public notice approving the Environmental Compliance Determination for Esencia's Environmental Impact Statement on December 24, 2025 — Christmas Eve. Per that notice, the tourism-residential megaproject contemplates 530 hotel units, 1,132 tourism residences, commercial areas, golf courses, a school, medical services, and other infrastructure. PIP Secretary General Juan Dalmau publicly condemned the approval, saying it was done quietly, during the holidays, to favor private interests at the expense of natural resources and communities. Dalmau warned the project threatens whole communities' ability to stay, drives up housing and basic service costs, and could force Cabo Rojo families into displacement from their own town. He also called out Resident Commissioner Pablo José Hernández Rivera for his silence on the matter."),
    monto: "N/A", source: "Telemundo PR, 26/dic/2025", certainty: "confirmado", impact: "directo",
    criticas: [{ quien: "Juan Dalmau (Secretario General, PIP)", texto: L("Esta aprobación constituye una afrenta ambiental, antidemocrática y profundamente antiética.", "This approval is an environmental, undemocratic, and deeply unethical affront."), fuente: "Telemundo PR, 26/dic/2025" }] },
  { id: "leg-008", title: L("Aprobación de la Consulta de Ubicación de Esencia", "Approval of Esencia's Location Consultation"),
    subtitle: "OGPe — Trámite 2026-693109-CUB-013470", type: L("Consulta de ubicación", "Location consultation"), category: "permisos", date: "31 jul – 1 ago 2026", dateAmended: null, status: L("Aprobada (construcción aún no autorizada)", "Approved (construction not yet authorized)"),
    administraciones: ["OGPe, bajo el gobierno de Jenniffer González Colón"],
    description: L("La OGPe aprobó la Consulta de Ubicación del megaproyecto propuesto en el barrio Boquerón de Cabo Rojo, catalogándolo como 'Estratégico' bajo la ley federal PROMESA. El expediente proyecta una inversión de $2,684,000,000.10 y contempla, según el expediente de OGPe citado por Marea Ecologista, 828 unidades residenciales unifamiliares, 36 edificios comerciales, un hotel de 307 habitaciones y un condo-hotel de 98 habitaciones. Los propios desarrolladores, citados por NotiCel, han descrito el proyecto como 500 habitaciones de hotel, 1,200 residencias privadas de lujo, dos campos de golf, un centro ecuestre, una escuela K-12 y un centro médico 24 horas — cifras que no necesariamente coinciden con el expediente oficial. La aprobación se dio sin celebrar vistas públicas, pese a solicitudes formales de organizaciones comunitarias y ambientales. El secretario de Asuntos Públicos de La Fortaleza, Jean Peña Payano, aclaró que solo se aprobó la ubicación, no la construcción entera: aún faltan endosos del DRNA, y los desarrolladores deben demostrar que no afectarán el servicio de agua del municipio. El presidente de la AAA, Luis González Delgado, confirmó públicamente que la agencia no recomendó el proyecto por falta de capacidad de infraestructura para suplirle agua potable.",
      "OGPe approved the Location Consultation for the megaproject proposed in the Boquerón sector of Cabo Rojo, categorizing it as 'Strategic' under the federal PROMESA law. The filing projects an investment of $2,684,000,000.10 and, per the OGPe filing cited by Marea Ecologista, contemplates 828 single-family residential units, 36 commercial buildings, a 307-room hotel, and a 98-room condo-hotel. The developers themselves, quoted by NotiCel, have described the project as 500 hotel rooms, 1,200 luxury private residences, two golf courses, an equestrian center, a K-12 school, and a 24-hour medical center — figures that don't necessarily match the official filing. The approval came without public hearings, despite formal requests from community and environmental organizations. La Fortaleza's Secretary of Public Affairs, Jean Peña Payano, clarified that only the site was approved, not construction as a whole: DRNA endorsements are still pending, and developers must show they won't affect the municipality's water service. AAA President Luis González Delgado publicly confirmed the agency did not recommend the project due to a lack of infrastructure capacity to supply it with drinking water."),
    monto: L("~$2,684,000,000.10 en inversión proyectada", "~$2.684 billion in projected investment"), source: "Marea Ecologista, 31/jul/2026; NotiCel, 6/ago/2026; El Vocero, 3/ago/2026", certainty: "confirmado", impact: "directo",
    criticas: [
      { quien: "Luis González Delgado (Presidente, AAA)", texto: L("No tenemos la capacidad de poder suplirle agua.", "We don't have the capacity to supply it with water."), fuente: "El Vocero, 3/ago/2026" },
      { quien: "Jean Peña Payano (Secretario de Asuntos Públicos)", texto: L("Solo se aprobó la consulta de ubicación, no la construcción entera.", "Only the location consultation was approved, not construction as a whole."), fuente: "NotiCel, 6/ago/2026" },
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
  { id: "m-001", medio: "El Nuevo Día / Primera Hora", tipo: L("Contenido patrocinado sin etiquetado claro", "Sponsored content without clear labeling"), nivel: "alto",
    titulo: L("\"Esencia ajusta sus planes de desarrollo para minimizar su huella ambiental\"", "\"Esencia adjusts its development plans to minimize its environmental footprint\""), fecha: "2025",
    descripcion: L("Artículo publicado bajo la sección 'Brand Studio', producido directamente por Three Rules Capital. La URL contiene '/brandstudio/three-rules-capital/', confirmando que es contenido pagado por los propios proyectistas.",
      "Article published under the 'Brand Studio' section, produced directly by Three Rules Capital. The URL contains '/brandstudio/three-rules-capital/', confirming it's paid content from the developers themselves."),
    url: "https://www.elnuevodia.com/brandstudio/three-rules-capital/notas/esencia-ajusta-sus-planes-de-desarrollo-para-minimizar-su-huella-ambiental/",
    evidencia: L("URL del artículo contiene '/brandstudio/three-rules-capital/'", "Article URL contains '/brandstudio/three-rules-capital/'"), certainty: "confirmado",
    contrasten: L("El CPI documentó que el proyecto es 'predominantemente residencial' y que la DIA carece de estudio hidrológico.", "CPI documented that the project is 'predominantly residential' and that the environmental review lacks a hydrological study.") },
  { id: "m-002", medio: "Metro Puerto Rico", tipo: L("Uso de artista opositora para generar cobertura favorable", "Use of an opposing artist to generate favorable coverage"), nivel: "alto",
    titulo: L("\"Recurso agua: ¿Cómo se plantea su manejo en Esencia?\"", "\"Water resources: How is their management planned at Esencia?\""), fecha: "09 abril 2026",
    descripcion: L("Producido bajo la 'editora invitada' Kany García — opositora pública a Esencia. El contenido le da plataforma principal a Roberto Ruiz Vargas para su narrativa sobre el agua.",
      "Produced under 'guest editor' Kany García — a public opponent of Esencia. The content gives Roberto Ruiz Vargas the main platform for his narrative on water."),
    url: "https://www.metro.pr/noticias/2026/04/09/recurso-agua-como-se-plantea-su-manejo-en-esencia/",
    evidencia: "Metro PR, 9/abr/2026", certainty: "confirmado",
    contrasten: L("La AAA confirmó (3/ago/2026) que no tiene capacidad de agua. El Senado aprobó dos resoluciones para investigar la viabilidad hídrica.", "The AAA confirmed (Aug 3, 2026) it has no water capacity. The Senate approved two resolutions to investigate water feasibility.") },
  { id: "m-003", medio: "Metro Puerto Rico", tipo: L("Censura de columna de opinión", "Censorship of an opinion column"), nivel: "crítico",
    titulo: L("Columna de la Lcda. Rosa Seguí — publicada y luego retirada", "Column by attorney Rosa Seguí — published and then removed"), fecha: L("Previo a marcha del 28 de marzo 2026", "Before the March 28, 2026 march"),
    descripcion: L("Metro PR publicó y retiró una columna de Rosa Seguí (Movimiento Victoria Ciudadana) que denunciaba los efectos de Esencia. Seguí declaró: 'Es muy peligroso que nos hayan censurado.'",
      "Metro PR published and then removed a column by Rosa Seguí (Movimiento Victoria Ciudadana) that denounced Esencia's effects. Seguí stated: 'It's very dangerous that we were censored.'"),
    url: "https://www.facebook.com/share/1Cy91dEHSG/", evidencia: L("Declaración directa de la Lcda. Rosa Seguí", "Direct statement from attorney Rosa Seguí"), certainty: "confirmado",
    contrasten: L("Metro PR publicó el mismo día un artículo que amplifica la narrativa del desarrollador.", "Metro PR published, the same day, an article amplifying the developer's narrative.") },
  { id: "m-004", medio: "InDiario", tipo: L("Ataque contra opositor usando fuentes anónimas", "Attack on an opponent using anonymous sources"), nivel: "medio",
    titulo: L("\"Acusan a Gabo Ramos de payoleo\"", "\"Gabo Ramos accused of accepting payola\""), fecha: "26 marzo 2026",
    descripcion: L("InDiario acusó al creador de contenido Gabo Ramos de recibir pagos no divulgados. Las alegaciones provienen exclusivamente de fuentes anónimas, sin evidencia documental.",
      "InDiario accused content creator Gabo Ramos of receiving undisclosed payments. The allegations come exclusively from anonymous sources, with no documentary evidence."),
    url: "https://indiario.com/noticias/acusan-a-gabo-ramos-de-payoleo", evidencia: "InDiario, 26/mar/2026", certainty: "reportado",
    contrasten: L("El CPI documentó que los propios desarrolladores pagaron anuncios y crearon cuentas anónimas antes de las vistas públicas.", "CPI documented that the developers themselves paid for ads and created anonymous accounts before the public hearings.") },
  { id: "m-005", medio: "La Diestra", tipo: L("Contenido editorial sin fuentes verificables", "Editorial content without verifiable sources"), nivel: "medio",
    titulo: L("\"Derrumbamos Mitos En Contra de Esencia... Otra Vez\"", "\"We Debunk Myths Against Esencia... Again\""), fecha: "2 abril 2026",
    descripcion: L("Enmarca la oposición a Esencia como 'influencers y activistas' vs. 'realidad técnica y legal', sin citar estudios independientes ni la determinación del DRNA.",
      "Frames opposition to Esencia as 'influencers and activists' vs. 'technical and legal reality', without citing independent studies or DRNA's determination."),
    url: "https://www.ladiestra.com/noticias/derrumbamos-mitos-en-contra-de-esencia-otra-vez", evidencia: "La Diestra, 2/abr/2026", certainty: "confirmado",
    contrasten: L("El DRNA ordenó un rediseño. Más de 70 organizaciones marcharon el 28/mar/2026.", "DRNA ordered a redesign. Over 70 organizations marched on March 28, 2026.") },
  { id: "m-007", medio: "Mets de Guaynabo – BSN", tipo: L("Estrategia de imagen vía auspicio deportivo", "Image strategy via sports sponsorship"), nivel: "alto",
    titulo: L("Esencia entra al BSN como auspiciador de los Mets", "Esencia enters the BSN as a sponsor of the Mets"), fecha: L("Temporada 2026", "2026 season"),
    descripcion: L("El logo de Esencia aparece en las sillas del banquillo. Los dueños del equipo son beneficiarios de la Ley 22/60 desde 2015; la COO confirmó que los auspicios provienen de inversionistas bajo ese mismo marco legal.",
      "Esencia's logo appears on the team's bench chairs. The team's owners have been Act 22/60 beneficiaries since 2015; the COO confirmed sponsorships come from investors under that same legal framework."),
    url: "https://www.facebook.com/share/p/18VRJ3maE8/", evidencia: L("Wikipedia; CPI jun 2021; declaración directa de COO Lcda. Gabiangie Berríos", "Wikipedia; CPI Jun 2021; direct statement from COO Gabiangie Berríos"), certainty: "confirmado",
    contrasten: L("El CPI (mar 2025) documentó anuncios pagados como parte de la misma estrategia de imagen.", "CPI (Mar 2025) documented paid ads as part of the same image strategy.") },
  { id: "m-006", medio: L("Medios pagados / Cuentas anónimas", "Paid media / Anonymous accounts"), tipo: L("Campaña de comunicación pagada previo a vistas públicas", "Paid communications campaign ahead of public hearings"), nivel: "alto",
    titulo: L("Anuncios en La Voz Digital + cuenta 'Conoce la verdad'", "Ads on La Voz Digital + 'Conoce la verdad' account"), fecha: L("Previo a marzo 2025", "Before March 2025"),
    descripcion: L("El CPI documentó anuncios pagados en La Voz Digital y cuentas anónimas como 'Conoce la verdad' para mejorar la percepción del proyecto antes de las vistas públicas.",
      "CPI documented paid ads on La Voz Digital and anonymous accounts like 'Conoce la verdad' to improve the project's perception ahead of public hearings."),
    url: "https://periodismoinvestigativo.com/2025/03/vistas-publicas-esencia-cabo-rojo/", evidencia: "CPI, mar 2025", certainty: "confirmado", contrasten: null },
  { id: "m-008", medio: "NEWS PR", tipo: L("Posible conflicto de interés editorial — operador político no divulgado", "Possible undisclosed editorial conflict of interest — political operative"), nivel: "alto",
    titulo: L("Félix Pérez Toro, creador de \"La Vieja Changa\", señalado como figura vinculada a NEWS PR", "Félix Pérez Toro, creator of \"La Vieja Changa,\" identified as a figure linked to NEWS PR"), fecha: L("Vigente", "Ongoing"),
    descripcion: L("Pérez Toro es consultor político conocido por manejar 'La Vieja Changa'. Se describió en 2016 como militante del PNP. Su empresa Fénix One Group LLC ha tenido contratos gubernamentales; en 2024, mientras tenía contrato con La Fortaleza, financió una campaña de vallas contra Manuel Natal. Ha sido señalado públicamente como vinculado a NEWS PR, sin confirmación de su cargo exacto.",
      "Pérez Toro is a political consultant known for running 'La Vieja Changa'. He described himself in 2016 as a PNP militant. His company Fénix One Group LLC has held government contracts; in 2024, while under contract with La Fortaleza, he personally financed a billboard campaign against Manuel Natal. He has been publicly identified as linked to NEWS PR, without confirmation of his exact role."),
    url: "", evidencia: L("NotiCel (2016 y 2024); Oficina del Contralor Electoral", "NotiCel (2016 and 2024); State Electoral Comptroller"), certainty: "reportado",
    contrasten: L("Cualquier señalamiento de que una cobertura específica de NEWS PR sea falsa requiere documentarse caso por caso.", "Any claim that specific NEWS PR coverage is false needs to be documented case by case.") },
];

const TIMELINE = [
  { label: "2019", e: L("Se registra Cabo Rojo Land Acquisition LLC", "Cabo Rojo Land Acquisition LLC is registered"), detail: L("Vehículo legal para levantar Esencia dentro de Cabo Rojo.", "Legal vehicle to build Esencia inside Cabo Rojo."), t: "legal", source: "Registro Corporativo PR" },
  { label: "DIC 2020", e: L("El gobierno de Wanda Vázquez le regala el decreto de exención contributiva", "Wanda Vázquez's government hands it the tax exemption decree"), detail: L("Casi $498 millones en créditos, para una ciudad privada que ni siquiera existía todavía.", "Nearly $498 million in credits, for a private city that didn't even exist yet."), t: "gobierno", source: "Compañía de Turismo PR / CPI" },
  { label: "2022", e: L("El gobierno de Pierluisi emite la exención del 90% en aranceles", "Pierluisi's government issues the 90% fee exemption"), detail: L("Para las parcelas del proyecto.", "For the project's parcels."), t: "gobierno", source: "CPI oct 2025" },
  { label: "2022", e: L("Bennett y Ruiz Vargas se establecen en Puerto Rico", "Bennett and Ruiz Vargas settle in Puerto Rico"), detail: L("Fundan Three Rules Capital.", "They found Three Rules Capital."), t: "empresa", source: "The Real Deal" },
  { label: "2023", e: L("Harish Venkatesh se une como tercer socio", "Harish Venkatesh joins as a third partner"), detail: L("De Three Rules Capital.", "At Three Rules Capital."), t: "empresa", source: "CPI mar 2025" },
  { label: "MAY 2024", e: L("Anuncio público de Esencia (~$2,000M)", "Public announcement of Esencia (~$2 billion)"), detail: L("En Boquerón, Cabo Rojo.", "In Boquerón, Cabo Rojo."), t: "empresa", source: "NotiCel" },
  { label: "2024–25", e: L("Roberto Ruiz Vargas dona $34,000 a comités de ambos partidos", "Roberto Ruiz Vargas donates $34,000 to committees of both parties"), detail: L("Incluyendo al Presidente de la Comisión de Turismo.", "Including the Chair of the Tourism Commission."), t: "donacion", source: "CEE / Contralor Electoral" },
  { label: "MAR 2025", e: L("Vistas públicas del EIS ante la OGPe en Cabo Rojo", "Public EIS hearings before OGPe in Cabo Rojo"), detail: L("Con fuerte oposición ciudadana.", "With strong citizen opposition."), t: "legal", source: "CPI mar 2025" },
  { label: "2025", e: L("El DRNA ordena rediseñar la ciudad privada", "DRNA orders the private city to be redesigned"), detail: L("Por el impacto ecológico que provocaría.", "Due to the ecological impact it would cause."), t: "ambiente", source: "Bonita Radio / CPI" },
  { label: "24 DIC 2025", e: L("OGPe notifica la aprobación de la DIA — en Nochebuena", "OGPe notifies approval of the environmental review — on Christmas Eve"), detail: L("Juan Dalmau (PIP) la repudia como \"una afrenta ambiental, antidemocrática y profundamente antiética\".", "Juan Dalmau (PIP) condemns it as \"an environmental, undemocratic, and deeply unethical affront.\""), t: "ambiente", source: "Telemundo PR" },
  { label: "31 JUL–1 AGO 2026", e: L("OGPe aprueba la Consulta de Ubicación", "OGPe approves the Location Consultation"), detail: L("Trámite 2026-693109-CUB-013470, sin vistas públicas. La AAA confirma que no tiene capacidad de agua.", "Filing 2026-693109-CUB-013470, without public hearings. AAA confirms it has no water capacity."), t: "permisos", source: "Marea Ecologista / NotiCel / El Vocero" },
  { label: "3 AGO 2026", e: L("Presidente de la AAA confirma en Radio Isla que no recomendó el proyecto", "AAA President confirms on Radio Isla that the agency did not recommend the project"), detail: L("\"No tenemos la capacidad de poder suplirle agua.\"", "\"We don't have the capacity to supply it with water.\""), t: "ambiente", source: "El Vocero" },
  { label: "5 AGO 2026", e: L("El representante Emilio Carlo presenta hallazgos de un año de investigación", "Rep. Emilio Carlo presents findings from a year-long investigation"), detail: L("Sin agua, sin capacidad eléctrica confirmada, y sin vertedero disponible para la basura que generaría Esencia.", "No water, no confirmed electrical capacity, and no available landfill for the waste Esencia would generate."), t: "gobierno", source: "NotiCel" },
  { label: "23 AGO 2026", e: L("Marcha \"Cabo Rojo Es Nuestro\"", "\"Cabo Rojo Es Nuestro\" march"), detail: L("Convocada por Defiende a Cabo Rojo — 2:00 PM, Carr. 100 y 308, bajo el lema \"Esencia No Va\".", "Called by Defiende a Cabo Rojo — 2:00 PM, Rte. 100 & 308, under the slogan \"Esencia No Va\" (\"Esencia isn't happening\")."), t: "comunidad", source: "Defiende a Cabo Rojo" },
];

const PROYECTO_CARDS = [
  { t: L("AGUA", "WATER"), d: L("La AAA confirmó que no tiene capacidad para suplirle agua potable. La AEE denegó acceso a los sistemas de riego de Valle de Lajas para no perjudicar a los agricultores de Yauco a Cabo Rojo. Consumo estimado: 1.25 millones de galones diarios.",
      "The AAA confirmed it has no capacity to supply drinking water. The AEE denied access to Valle de Lajas irrigation systems so as not to harm farmers from Yauco to Cabo Rojo. Estimated consumption: 1.25 million gallons a day."), src: "NotiCel / El Vocero" },
  { t: L("ELECTRICIDAD", "ELECTRICITY"), d: L("La red eléctrica de Puerto Rico ya está frágil. Una ciudad privada de esta magnitud podría empeorar aún más la capacidad eléctrica de las comunidades cercanas y del pueblo de Cabo Rojo.",
      "Puerto Rico's power grid is already fragile. A private city of this size could further strain electrical capacity for nearby communities and the town of Cabo Rojo."), src: "NotiCel, 6/ago/2026" },
  { t: L("DESPERDICIOS SÓLIDOS", "SOLID WASTE"), d: L("El vertedero de Cabo Rojo no tiene celdas suficientes. Hormigueros, Lajas y Mayagüez ya rechazaron recibir esos desechos. El huracán María acortó los años de vida de los vertederos del oeste.",
      "The Cabo Rojo landfill doesn't have enough cells. Hormigueros, Lajas, and Mayagüez already refused to take that waste. Hurricane María shortened the remaining lifespan of western Puerto Rico's landfills."), src: "NotiCel, 6/ago/2026" },
  { t: L("FINANZAS MUNICIPALES", "MUNICIPAL FINANCES"), d: L("El proyecto ya recibió $498 millones en exención contributiva. Cabo Rojo perdería aproximadamente $30 millones anuales en CRIM, patentes y otros ingresos municipales.",
      "The project already received $498 million in tax exemptions. Cabo Rojo would lose roughly $30 million a year in property tax, municipal license fees, and other revenue."), src: "NotiCel, 6/ago/2026" },
  { t: L("PERMISOS Y TRANSPARENCIA", "PERMITS AND TRANSPARENCY"), d: L("Los desarrolladores se negaron a contestar 25 preguntas formales del representante Carlo. La OGPe aprobó la Consulta de Ubicación sin celebrar vistas públicas pese a solicitudes formales de organizaciones comunitarias.",
      "The developers refused to answer 25 formal questions from Rep. Carlo. OGPe approved the Location Consultation without holding public hearings, despite formal requests from community organizations."), src: "NotiCel, 6/ago/2026" },
  { t: L("ECOSISTEMAS", "ECOSYSTEMS"), d: L("El proyecto impactaría áreas adyacentes al Refugio Nacional de Vida Silvestre de Cabo Rojo y el Caño Boquerón — hábitat del guabairo puertorriqueño, la cóbana negra y el manatí antillano.",
      "The project would impact areas adjacent to the Cabo Rojo National Wildlife Refuge and Caño Boquerón — habitat for the Puerto Rican nightjar, black-necked stilt, and West Indian manatee."), src: "Marea Ecologista, 31/jul/2026" },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS / DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════
// PayPal — reemplaza este placeholder con tu usuario real de PayPal.me (ej. "TuNombre")
// o cambia buildPaypalUrl() para usar un Hosted Button ID si prefieres un botón de donación.
const PAYPAL_ME_USERNAME = "OriginalPuertorro";
const PAYPAL_CONFIGURED = PAYPAL_ME_USERNAME !== "TU_USUARIO_PAYPAL";
const buildPaypalUrl = amount => `https://www.paypal.com/paypalme/${PAYPAL_ME_USERNAME}${amount ? "/" + amount : ""}`;
function track(event, params) { if (typeof window !== "undefined" && window.gtag) window.gtag("event", event, params || {}); }

const CERT = { confirmado: { color: "#4ade80", es: "CONFIRMADO", en: "CONFIRMED" }, reportado: { color: "#fbbf24", es: "REPORTADO", en: "REPORTED" }, "en investigación": { color: "#f87171", es: "EN INVESTIGACIÓN", en: "UNDER INVESTIGATION" } };
const TCOL = { legal: "#a78bfa", gobierno: "#60a5fa", empresa: "#38bdf8", donacion: "#dc2626", comunidad: "#2dd4bf", ambiente: "#4ade80", permisos: "#fbbf24" };
const fmtNum = (n, lang) => n == null ? (lang === "en" ? "not specified" : "no especificado") : "$" + Number(n).toLocaleString(lang === "en" ? "en-US" : "es-PR");
const getInv = id => INVESTORS.find(i => i.id === id);
const getPol = id => POLITICIANS.find(p => p.id === id);
const getLeg = id => LEGISLATION.find(l => l.id === id);
const totalDonated = INVESTORS.reduce((s, i) => s + i.totalDonated, 0);
const politiciansWithDonations = POLITICIANS.filter(p => p.totalReceived > 0).length;

function Crystal({ children, style = {}, onClick, hover = true }) {
  const [h, setH] = useState(false);
  return <div onClick={onClick} onMouseEnter={() => hover && setH(true)} onMouseLeave={() => setH(false)}
    style={{ background: h ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.035)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      border: `1px solid rgba(255,255,255,${h ? 0.14 : 0.08})`, borderRadius: 18, boxShadow: h ? "0 8px 32px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.2)",
      transition: "all 0.2s ease", cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>;
}
function EvidenceBadge({ c, lang }) {
  const cfg = CERT[c] || CERT["en investigación"];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.2, color: cfg.color, background: `${cfg.color}14`, border: `1px solid ${cfg.color}33`, padding: "3px 8px", borderRadius: 20 }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color }} />{cfg[lang]}
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
// NETWORK
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
        <span style={{ fontSize: 13, color: "#e4e4e7", flex: 1 }}>{nodes[l.s].label}</span><span style={{ color: "#71717a", fontSize: 12 }}>→</span>
        <span style={{ fontSize: 13, color: "#e4e4e7", flex: 1, textAlign: "right" }}>{nodes[l.t].label}</span>
      </div>)}
    </div>;
  }
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <svg width={660} height={410} style={{ display: "block", minWidth: 660 }}>
        {links.map((l, i) => { const s = nodes[l.s], t = nodes[l.t]; return (
          <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={l.c} strokeWidth={1.4} style={{ cursor: "pointer" }} onClick={() => onSelectEdge({ from: s.label, to: t.label, label: l.label })} />
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
function PersonCard({ person, kind, onOpen, lang, ui }) {
  const isPol = kind === "pol";
  const photo = isPol ? POLITICIAN_PHOTOS[person.id] : INVESTOR_PHOTOS[person.id];
  const partyColor = person.party === "PNP" ? "#60a5fa" : person.party === "PPD" ? "#f87171" : person.party === "PIP" ? "#4ade80" : "#a1a1aa";
  const amount = isPol ? person.totalReceived : person.totalDonated;
  const [imgOk, setImgOk] = useState(true);
  const tagText = pick(person.tag, lang);
  const tagColor = tagText === ui.filters ? "#a1a1aa" : (person.tag?.es === "OPOSICIÓN") ? "#4ade80" : (person.tag?.es === "RECIBIÓ DONACIÓN") ? "#f87171" : (person.tag?.es === "PROYECTISTA") ? "#38bdf8" : "#a1a1aa";
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
          {person.tag && <Tag color={tagColor}>{tagText}</Tag>}
          {isPol && <span style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", color: partyColor }}>{person.party}</span>}
          {amount > 0 && <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#f87171" }}>{fmtNum(amount, lang)}</span>}
        </div>
      </div>
      <div style={{ color: "#52525b", fontSize: 18, flexShrink: 0 }}>›</div>
    </Crystal>
  );
}

function PersonModal({ person, kind, onClose, lang, ui }) {
  if (!person) return null;
  const isPol = kind === "pol";
  const photo = isPol ? POLITICIAN_PHOTOS[person.id] : INVESTOR_PHOTOS[person.id];
  const partyColor = person.party === "PNP" ? "#60a5fa" : person.party === "PPD" ? "#f87171" : person.party === "PIP" ? "#4ade80" : "#a1a1aa";
  const role = pick(isPol ? person.position : person.role, lang);
  const donations = person.donations;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "rgba(15,15,17,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 640, maxHeight: "88vh", overflowY: "auto", padding: "20px 22px 40px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#e4e4e7", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, marginBottom: 24 }}>
          {photo ? <img src={photo} alt={person.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", objectPosition: "top", filter: "grayscale(50%)", border: `2px solid ${isPol ? partyColor : "#38bdf8"}` }} onError={e => e.target.style.display = "none"} />
            : <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `2px solid ${isPol ? partyColor : "#38bdf8"}`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 24, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: isPol ? partyColor : "#38bdf8" }}>{person.name.charAt(0)}</span></div>}
          <div>
            <div style={{ fontSize: 21, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fafafa" }}>{person.name}</div>
            <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 4 }}>{role}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>{person.tag && <Tag color={isPol ? "#f87171" : "#38bdf8"}>{pick(person.tag, lang)}</Tag>}{isPol && <Tag color={partyColor}>{person.party}</Tag>}</div>
          </div>
        </div>
        {donations?.length > 0 && <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>{isPol ? ui.donationsReceived : ui.donationsMade}</div>
          {donations.map((d, i) => {
            const otherName = isPol ? (getInv(d.donor)?.name || pick(d.donorName, lang) || ui.donorUnspecified) : (getPol(d.recipient)?.name || d.recipient);
            return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 10, flexWrap: "wrap" }}>
              <div><span style={{ fontSize: 13, color: "#d4d4d8" }}>{otherName}</span><span style={{ fontSize: 10.5, color: "#71717a", marginLeft: 8, fontFamily: "'JetBrains Mono', monospace" }}>{d.date}</span></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#f87171", fontWeight: 700 }}>{fmtNum(d.amount, lang)}</span><EvidenceBadge c={d.certainty} lang={lang} /></div>
            </div>;
          })}
        </div>}
        {isPol && person.legislation?.length > 0 && <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>{ui.govActions}</div>
          {person.legislation.map(lid => { const leg = getLeg(lid); return leg && <div key={lid} style={{ marginBottom: 10 }}><div style={{ fontSize: 13, color: "#d4d4d8" }}>{pick(leg.title, lang)}</div><div style={{ fontSize: 10.5, color: "#71717a" }}>{leg.date} · {pick(leg.status, lang)}</div></div>; })}
        </div>}
        {((isPol && person.statements) || (!isPol && person.declaraciones))?.length > 0 && <div>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>{ui.statementsLabel}</div>
          {(isPol ? person.statements : person.declaraciones).map((s, i) => <div key={i} style={{ marginBottom: 14, borderLeft: "2px solid #f87171", paddingLeft: 14 }}>
            <div style={{ fontStyle: "italic", color: "#e4e4e7", fontSize: 13.5, lineHeight: 1.7 }}>"{pick(s.texto, lang)}"</div>
            <div style={{ marginTop: 6 }}><SourceChip>{s.fuente} · {s.date}</SourceChip></div>
          </div>)}
        </div>}
        {!isPol && person.relatedEntities?.length > 0 && <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>{ui.relatedEntities}: {person.relatedEntities.join(" · ")}</div>}
        <div style={{ marginTop: 14 }}><SourceChip>{isPol ? (person.donations[0]?.source || ui.seeEvidence) : person.fuente}</SourceChip></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const [tlFilter, setTlFilter] = useState("todo");
  const [mediaFilter, setMediaFilter] = useState("todos");
  const [docFilter, setDocFilter] = useState("todo");
  const [showAllMoney, setShowAllMoney] = useState(false);
  const [edgeInfo, setEdgeInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const ui = UI[lang];

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openPerson = (id, kind) => setModal({ person: kind === "pol" ? getPol(id) : getInv(id), kind });
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setSearchOpen(false); setMenuOpen(false); setLangOpen(false); };

  const searchResults = q.trim().length < 2 ? [] : [
    ...INVESTORS.filter(i => i.name.toLowerCase().includes(q.toLowerCase())).map(i => ({ type: "inv", item: i })),
    ...POLITICIANS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.party.toLowerCase().includes(q.toLowerCase())).map(p => ({ type: "pol", item: p })),
    ...LEGISLATION.filter(l => pick(l.title, lang).toLowerCase().includes(q.toLowerCase())).map(l => ({ type: "leg", item: l })),
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

  const NAV_IDS = ["investigacion", "personas", "dinero", "conexiones", "proyecto", "cronologia", "medios", "documentos", "metodologia", "apoya"];
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  useEffect(() => { track("support_page_view"); }, []);
  const selectedAmount = customAmount ? Number(customAmount) : amount;
  const handlePaypalClick = () => { track("paypal_checkout_started", { amount: selectedAmount }); if (PAYPAL_CONFIGURED) window.open(buildPaypalUrl(selectedAmount), "_blank", "noopener,noreferrer"); };
  const handleAmountSelect = a => { setAmount(a); setCustomAmount(""); track("support_amount_selected", { amount: a }); };

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

      <div aria-hidden style={{ position: "fixed", top: "-10%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", bottom: "10%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(8,8,10,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
            {lang === "es" ? "DETRÁS DE" : "BEHIND"} <EsenciaMark />
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, position: "relative" }}>
            <button onClick={() => setSearchOpen(v => !v)} aria-label="Search" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "#e4e4e7", width: 38, height: 38, cursor: "pointer", fontSize: 14 }}>🔍</button>
            <button onClick={() => setLangOpen(v => !v)} aria-label="Language" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "#e4e4e7", padding: "0 12px", height: 38, cursor: "pointer", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, display: "flex", alignItems: "center", gap: 5 }}>
              🌐 {lang.toUpperCase()}
            </button>
            {langOpen && <div style={{ position: "absolute", top: 44, right: 0, background: "rgba(15,15,17,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, overflow: "hidden", zIndex: 70, minWidth: 130 }}>
              {[{ code: "es", label: "Español" }, { code: "en", label: "English" }].map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: lang === l.code ? "rgba(220,38,38,0.15)" : "none", border: "none", color: lang === l.code ? "#f87171" : "#e4e4e7", padding: "11px 16px", cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{l.label}</button>
              ))}
            </div>}
            <button onClick={() => setMenuOpen(v => !v)} aria-label="Menu" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "#e4e4e7", width: 38, height: 38, cursor: "pointer", fontSize: 15 }}>{menuOpen ? "×" : "☰"}</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px 24px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {NAV_IDS.map(id => <button key={id} onClick={() => scrollTo(id)} style={{ textAlign: "left", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, color: "#e4e4e7", padding: "12px 14px", cursor: "pointer", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{ui.nav[id]}</button>)}
            </div>
          </div>
        )}
        {searchOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "14px 20px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={ui.searchPlaceholder}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 15px", color: "white", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: "none" }} />
              {searchResults.length > 0 && <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                {searchResults.map((r, i) => <div key={i} onClick={() => { if (r.type !== "leg") { openPerson(r.item.id, r.type); setSearchOpen(false); } else scrollTo("documentos"); }}
                  style={{ padding: "10px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
                  <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#f87171", marginRight: 8 }}>{r.type === "inv" ? ui.investorType : r.type === "pol" ? ui.personType : ui.docType}</span>{r.item.name || pick(r.item.title, lang)}
                </div>)}
              </div>}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ maxWidth: 900, margin: "0 auto", padding: "min(9vh, 80px) 20px 56px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, color: "#f87171", marginBottom: 22, fontWeight: 700 }}>{ui.tagline}</div>
        <h1 style={{ margin: 0, fontSize: "clamp(36px, 10vw, 76px)", lineHeight: 1.0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}>
          {ui.heroTitlePrefix} <EsenciaMark />
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.6vw, 21px)", color: "#d4d4d8", lineHeight: 1.55, marginTop: 24, maxWidth: 680 }}>{ui.heroSub}</p>
        <p style={{ fontSize: 13.5, color: "#71717a", lineHeight: 1.7, marginTop: 16, maxWidth: 600 }}>{ui.heroFoot}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 30 }}>
          <button onClick={() => scrollTo("investigacion")} style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "white", border: "none", padding: "14px 24px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>{ui.btnExplore}</button>
          <button onClick={() => scrollTo("conexiones")} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#e4e4e7", padding: "14px 24px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>{ui.btnConnections}</button>
          <button onClick={() => scrollTo("documentos")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", padding: "14px 24px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>{ui.btnDocs}</button>
        </div>
        <div style={{ marginTop: 40, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#52525b", letterSpacing: 2 }}>{ui.lastUpdate}</div>
      </section>

      {/* INTRO */}
      <section id="investigacion" style={{ maxWidth: 780, margin: "0 auto", padding: "20px 20px 70px", position: "relative", zIndex: 1 }}>
        <Crystal style={{ padding: "28px 26px" }} hover={false}>
          <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 10 }}>{ui.introEyebrow}</div>
          <p style={{ fontSize: 15.5, color: "#d4d4d8", lineHeight: 1.85, margin: 0 }}>{ui.introBody}</p>
        </Crystal>
      </section>

      {/* NÚMEROS */}
      <section id="numeros" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { n: fmtNum(totalDonated, lang), i: 0, go: "dinero" }, { n: politiciansWithDonations, i: 1, go: "personas" },
            { n: "~$498M", i: 2, go: "documentos" }, { n: lang === "en" ? "~$2.68B" : "~$2.68B", i: 3, go: "documentos" },
          ].map((s, idx) => (
            <Crystal key={idx} onClick={() => scrollTo(s.go)} style={{ padding: "24px 22px" }}>
              <div style={{ fontSize: "clamp(28px, 5vw, 44px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, color: "#fafafa", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12.5, color: "#a1a1aa", marginTop: 10, lineHeight: 1.5 }}>{ui.numbers[s.i].l}</div>
              <div style={{ marginTop: 10 }}><SourceChip>{ui.numbers[s.i].src}</SourceChip></div>
            </Crystal>
          ))}
        </div>
      </section>

      {/* PERSONAS */}
      <section id="personas" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.personasEyebrow} title={ui.personasTitle} sub={ui.personasSub} />
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>{ui.investorsLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30 }}>{INVESTORS.map(inv => <PersonCard key={inv.id} person={inv} kind="inv" onOpen={openPerson} lang={lang} ui={ui} />)}</div>
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#71717a", marginBottom: 10 }}>{ui.politiciansLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{POLITICIANS.map(pol => <PersonCard key={pol.id} person={pol} kind="pol" onOpen={openPerson} lang={lang} ui={ui} />)}</div>
      </section>

      {/* DINERO */}
      <section id="dinero" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.dineroEyebrow} title={ui.dineroTitle} sub={ui.dineroSub} />
        <Crystal style={{ padding: "8px 20px" }} hover={false}>
          {topDonations.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "16px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ flex: "1 1 150px", fontSize: 13.5, color: "#e4e4e7" }}>{d.donor}</div>
              <div style={{ color: "#52525b" }}>→</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "#f87171", fontWeight: 700, flex: "0 0 85px" }}>{fmtNum(d.amount, lang)}</div>
              <div style={{ color: "#52525b" }}>→</div>
              <div style={{ flex: "1 1 150px", fontSize: 13.5, color: "#e4e4e7" }}>{d.pol}</div>
              <Tag color={d.party === "PNP" ? "#60a5fa" : "#f87171"}>{d.party}</Tag>
            </div>
          ))}
        </Crystal>
        <button onClick={() => setShowAllMoney(v => !v)} style={{ marginTop: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#d4d4d8", padding: "11px 20px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>
          {showAllMoney ? ui.hideAll : ui.showAll}
        </button>
        {showAllMoney && <div style={{ marginTop: 24 }}>
          {INVESTORS.filter(i => i.totalDonated > 0).map(inv => (
            <Crystal key={inv.id} hover={false} style={{ padding: "16px 20px", marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: "#fafafa", marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{inv.name} <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: "#f87171", fontWeight: 400 }}>· {fmtNum(inv.totalDonated, lang)} {ui.total}</span></div>
              {inv.donations.map((d, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, gap: 8, flexWrap: "wrap" }}>
                <span style={{ color: "#a1a1aa" }}>{getPol(d.recipient)?.name} <span style={{ color: "#52525b" }}>({d.date})</span></span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f87171" }}>{fmtNum(d.amount, lang)}</span>
              </div>)}
            </Crystal>
          ))}
        </div>}
      </section>

      {/* CONEXIONES */}
      <section id="conexiones" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.conexionesEyebrow} title={ui.conexionesTitle} sub={ui.conexionesSub} />
        <Crystal style={{ padding: 18 }} hover={false}>
          <Network mobile={isMobile} onSelectEdge={setEdgeInfo} onSelectNode={(obj, kind) => openPerson(obj.id, kind === "inv" ? "inv" : "pol")} />
        </Crystal>
        {edgeInfo && <Crystal hover={false} style={{ padding: "16px 20px", marginTop: 16 }}>
          <div style={{ fontSize: 14, color: "#fafafa" }}>{edgeInfo.from} <span style={{ color: "#52525b" }}>→</span> {edgeInfo.to}</div>
          <div style={{ fontSize: 12.5, color: "#a1a1aa", marginTop: 6 }}>{edgeInfo.label}</div>
        </Crystal>}
        <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Tag color="#60a5fa">{ui.legendInv}</Tag><Tag color="#a78bfa">{ui.legendEnt}</Tag><Tag color="#f87171">{ui.legendPol}</Tag><Tag color="#4ade80">{ui.legendGov}</Tag>
        </div>
      </section>

      {/* EL PROYECTO */}
      <section id="proyecto" style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.proyectoEyebrow} title={ui.proyectoTitle} sub={ui.proyectoSub} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {PROYECTO_CARDS.map((c, i) => <Crystal key={i} style={{ padding: "20px 20px" }} hover={false}>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 10 }}>{pick(c.t, lang)}</div>
            <p style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.7, margin: 0 }}>{pick(c.d, lang)}</p>
            <div style={{ marginTop: 10 }}><SourceChip>{c.src}</SourceChip></div>
          </Crystal>)}
        </div>
      </section>

      {/* CRONOLOGÍA */}
      <section id="cronologia" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.cronologiaEyebrow} title={ui.cronologiaTitle} sub={ui.cronologiaSub} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 30 }}>
          {["todo", "gobierno", "empresa", "donacion", "legal", "ambiente", "permisos", "comunidad"].map(f => (
            <button key={f} onClick={() => setTlFilter(f)} style={{ background: tlFilter === f ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "rgba(255,255,255,0.04)", color: tlFilter === f ? "white" : "#a1a1aa", border: `1px solid ${tlFilter === f ? "transparent" : "rgba(255,255,255,0.1)"}`, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{ui.filters[f]}</button>
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
              <div style={{ fontSize: 15, color: "#fafafa", lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{pick(ev.e, lang)}</div>
              <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 6, lineHeight: 1.6 }}>{pick(ev.detail, lang)}</div>
              <div style={{ marginTop: 8 }}><SourceChip>{ev.source}</SourceChip></div>
            </div>
          </div>
        ))}
      </section>

      {/* MEDIOS */}
      <section id="medios" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.mediosEyebrow} title={ui.mediosTitle} sub={ui.mediosSub} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
          {["todos", "crítico", "alto", "medio"].map(f => (
            <button key={f} onClick={() => setMediaFilter(f)} style={{ background: mediaFilter === f ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "rgba(255,255,255,0.04)", color: mediaFilter === f ? "white" : "#a1a1aa", border: `1px solid ${mediaFilter === f ? "transparent" : "rgba(255,255,255,0.1)"}`, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{ui.filters[f === "crítico" ? "critico" : f]}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filteredMedia.map(m => <Crystal key={m.id} hover={false} style={{ padding: "20px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#f87171", letterSpacing: 1 }}>{pick(m.medio, lang).toUpperCase()}</div>
              <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#52525b" }}>{pick(m.fecha, lang)}</div>
            </div>
            <div style={{ fontSize: 15, color: "#fafafa", fontStyle: "italic", marginBottom: 10, lineHeight: 1.4 }}>{pick(m.titulo, lang)}</div>
            <p style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.8, marginBottom: 10 }}>{pick(m.descripcion, lang)}</p>
            <div style={{ marginBottom: 8 }}><EvidenceBadge c={m.certainty} lang={lang} /></div>
            {m.contrasten && <div style={{ fontSize: 12, color: "#4ade80", lineHeight: 1.7, borderLeft: "2px solid #4ade8044", paddingLeft: 12, marginTop: 8 }}>{pick(m.contrasten, lang)}</div>}
            {m.url && <div style={{ marginTop: 10 }}><a href={m.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#60a5fa" }}>{ui.viewSource}</a></div>}
          </Crystal>)}
        </div>
      </section>

      {/* DOCUMENTOS */}
      <section id="documentos" style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.docsEyebrow} title={ui.docsTitle} sub={ui.docsSub} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
          {["todo", "gobierno", "ambiente", "permisos", "empresa"].map(f => (
            <button key={f} onClick={() => setDocFilter(f)} style={{ background: docFilter === f ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "rgba(255,255,255,0.04)", color: docFilter === f ? "white" : "#a1a1aa", border: `1px solid ${docFilter === f ? "transparent" : "rgba(255,255,255,0.1)"}`, padding: "7px 13px", borderRadius: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{ui.filters[f]}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filteredDocs.map(leg => <Crystal key={leg.id} hover={false} style={{ padding: "20px 20px" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <Tag>{pick(leg.type, lang)}</Tag><Tag color="#4ade80">{pick(leg.status, lang)}</Tag><Tag color={leg.impact === "directo" ? "#f87171" : "#fbbf24"}>{leg.impact === "directo" ? ui.directImpact : ui.indirectImpact}</Tag><EvidenceBadge c={leg.certainty} lang={lang} />
            </div>
            <div style={{ fontSize: 17, color: "#fafafa", marginBottom: 6, lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{pick(leg.title, lang)}</div>
            {leg.subtitle && <div style={{ fontSize: 12, color: "#71717a", marginBottom: 10 }}>{pick(leg.subtitle, lang)}</div>}
            <div style={{ fontSize: 10.5, color: "#71717a", fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>{leg.date}</div>
            <p style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.8, marginBottom: 10 }}>{pick(leg.description, lang)}</p>
            {leg.monto !== "N/A" && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, color: "#4ade80", marginBottom: 10 }}>{pick(leg.monto, lang)}</div>}
            <SourceChip>{leg.source}</SourceChip>
            {leg.criticas?.length > 0 && <div style={{ marginTop: 14 }}>
              {leg.criticas.map((c, i) => <div key={i} style={{ marginTop: 8, borderLeft: "2px solid #f87171", paddingLeft: 12 }}>
                <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: "#fbbf24", marginBottom: 4 }}>{c.quien}</div>
                <div style={{ fontSize: 12.5, color: "#d4d4d8", fontStyle: "italic", lineHeight: 1.7 }}>"{pick(c.texto, lang)}"</div>
              </div>)}
            </div>}
          </Crystal>)}
        </div>

        <div style={{ marginTop: 56 }}>
          <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 18 }}>{ui.docSeriesEyebrow}</div>
          <p style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 20, lineHeight: 1.7 }}>{ui.docSeriesBody}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[{ t: "1", id: "ouKgJfcydos" }, { t: "2", id: "IS8PSCwl83w" }, { t: "3", id: "DvVkcCeBB5A" }].map((doc, i) => (
              <div key={i}>
                <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: "#71717a", marginBottom: 8 }}>{lang === "en" ? "PART" : "PARTE"} {doc.t}</div>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <iframe src={`https://www.youtube.com/embed/${doc.id}`} title={`Parte ${doc.t}`} loading="lazy" frameBorder="0" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section id="metodologia" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 70px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.metEyebrow} title={ui.metTitle} sub={ui.metSub} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 34 }}>
          {["FUENTE PRIMARIA", "DOCUMENTO OFICIAL", "CEE", "OGPE", "DRNA", "LEGISLATURA", "REGISTRO CORPORATIVO", "FUENTE PERIODÍSTICA"].map((b, i) => {
            const enLabels = ["PRIMARY SOURCE", "OFFICIAL DOCUMENT", "CEE", "OGPE", "DRNA", "LEGISLATURE", "CORPORATE REGISTRY", "JOURNALISTIC SOURCE"];
            return <Tag key={b} color="#a1a1aa">{lang === "en" ? enLabels[i] : b}</Tag>;
          })}
        </div>
        {[
          { t: ui.primarySources, items: lang === "es"
            ? ["Comisión Estatal de Elecciones (CEE)", "Oficina del Contralor Electoral", "Registro Corporativo del Dept. de Estado de PR", "OGPe — Expediente DIA y Consulta de Ubicación de Esencia", "Decretos de la Compañía de Turismo de Puerto Rico", "Conferencias de prensa públicas"]
            : ["State Elections Commission (CEE)", "State Electoral Comptroller's Office", "PR Dept. of State Corporate Registry", "OGPe — Esencia Environmental Review and Location Consultation filing", "Puerto Rico Tourism Company decrees", "Public press conferences"] },
          { t: ui.pressSources, items: lang === "es"
            ? ["Centro de Periodismo Investigativo (CPI)", "NotiCel", "El Vocero", "Telemundo PR", "Marea Ecologista", "Bonita Radio", "The Real Deal", "Bloomberg", "Metro Puerto Rico"]
            : ["Centro de Periodismo Investigativo (CPI)", "NotiCel", "El Vocero", "Telemundo PR", "Marea Ecologista", "Bonita Radio", "The Real Deal", "Bloomberg", "Metro Puerto Rico"] },
          { t: ui.otherSources, items: lang === "es" ? ["Publicaciones públicas de la Coalición Defiende a Cabo Rojo", "Declaraciones públicas documentadas"] : ["Public posts from the Defiende a Cabo Rojo coalition", "Documented public statements"] },
        ].map((cat, i) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 12 }}>{cat.t}</div>
            {cat.items.map((it, j) => <div key={j} style={{ fontSize: 13, color: "#d4d4d8", padding: "9px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>{it}</div>)}
          </div>
        ))}
        <Crystal hover={false} style={{ padding: "18px 20px", marginTop: 12 }}>
          <div style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.8 }}>{ui.disclaimer}</div>
        </Crystal>
      </section>

      {/* APOYA */}
      <section id="apoya" style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 80px", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={ui.apoyaEyebrow} title={ui.apoyaHeroTitle} sub={ui.apoyaHeroSub} />

        <Crystal hover={false} style={{ padding: "22px 24px", marginBottom: 20 }}>
          <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, color: "#f87171", marginBottom: 10 }}>{ui.apoyaMessageTitle}</div>
          <p style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.8, margin: 0 }}>{ui.apoyaMessageBody}</p>
        </Crystal>

        <Crystal hover={false} style={{ padding: "26px 24px" }}>
          <div style={{ fontSize: 16, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fafafa", marginBottom: 20 }}>{ui.apoyaCardTitle}</div>

          <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, color: "#71717a", marginBottom: 12 }}>{ui.apoyaAmountLabel}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
            {[5, 10, 25, 50, 100].map(a => (
              <button key={a} onClick={() => handleAmountSelect(a)} style={{
                background: !customAmount && amount === a ? "linear-gradient(135deg, #dc2626, #b91c1c)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${!customAmount && amount === a ? "transparent" : "rgba(255,255,255,0.12)"}`,
                color: !customAmount && amount === a ? "white" : "#e4e4e7", borderRadius: 12, padding: "14px 0", fontSize: 15,
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}>${a}</button>
            ))}
            <input value={customAmount} onChange={e => setCustomAmount(e.target.value.replace(/[^0-9]/g, ""))} placeholder={ui.apoyaOtherAmount}
              style={{ background: customAmount ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${customAmount ? "#dc2626" : "rgba(255,255,255,0.12)"}`, borderRadius: 12, padding: "14px 8px", color: "#fafafa", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", textAlign: "center", outline: "none", width: "100%" }} />
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            <div style={{ flex: 1, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textAlign: "center" }}>{ui.apoyaOnceLabel}</div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#52525b", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>{ui.apoyaMonthlyLabel} · {ui.apoyaMonthlySoon}</div>
          </div>

          <button onClick={handlePaypalClick} disabled={!PAYPAL_CONFIGURED} style={{
            width: "100%", background: PAYPAL_CONFIGURED ? "linear-gradient(135deg, #0070ba, #003087)" : "rgba(255,255,255,0.06)",
            color: PAYPAL_CONFIGURED ? "white" : "#52525b", border: "none", padding: "17px 0", fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700, letterSpacing: 1, borderRadius: 12, cursor: PAYPAL_CONFIGURED ? "pointer" : "not-allowed",
          }}>{ui.apoyaButtonPay}{selectedAmount ? ` · ${selectedAmount}` : ""}</button>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "#71717a" }}>{PAYPAL_CONFIGURED ? ui.apoyaOpensNewTab : ui.apoyaNotConfigured}</div>
        </Crystal>

        <div style={{ marginTop: 44 }}>
          <div style={{ fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fafafa", marginBottom: 6 }}>{ui.apoyaTransparencyTitle}</div>
          <p style={{ fontSize: 12, color: "#71717a", marginBottom: 18, lineHeight: 1.7 }}>{ui.apoyaTransparencyNote}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {[[ui.apoyaCat1t, ui.apoyaCat1d], [ui.apoyaCat2t, ui.apoyaCat2d], [ui.apoyaCat3t, ui.apoyaCat3d], [ui.apoyaCat4t, ui.apoyaCat4d]].map(([t, d], i) => (
              <Crystal key={i} hover={false} style={{ padding: "16px 16px" }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, color: "#f87171", marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.6 }}>{d}</div>
              </Crystal>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, fontSize: 11.5, color: "#71717a", lineHeight: 1.8, textAlign: "center" }}>{ui.apoyaPrivacy}</div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
          <button onClick={() => scrollTo("hero")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#d4d4d8", padding: "11px 20px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>{ui.apoyaBackTop}</button>
          <button onClick={() => { if (navigator.share) navigator.share({ title: "Detrás de Esencia", url: window.location.href }); }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#d4d4d8", padding: "11px 20px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, cursor: "pointer", borderRadius: 10 }}>{ui.apoyaShare}</button>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#3f3f46", letterSpacing: 1, lineHeight: 2.2 }}>
          {ui.footerLine1}<br />{ui.footerLine2}<br />{ui.footerLine3}
        </div>
      </footer>

      <PersonModal person={modal?.person} kind={modal?.kind} onClose={() => setModal(null)} lang={lang} ui={ui} />
    </div>
  );
}
