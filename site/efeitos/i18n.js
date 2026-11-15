/**
 * Nexvia Tech — Internacionalização (pt-BR, es, en-US)
 * Alterna todo o conteúdo da página entre Português (Brasil), Espanhol e Inglês (EUA)
 * preservando o DOM original em pt-BR como fonte de restauração sem duplicação.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'nexvia-lang';
  const SUPPORTED = ['pt-BR', 'es', 'en-US'];

  const TRANSLATIONS = {
    es: {
      title: 'Nexvia Tech · Ingeniería de Software B2B y B2C',
      nav: ['Soluciones B2B & B2C', 'Portafolio (9)', 'Experiencia Touch/Scroll', 'Empresa y Contacto'],
      headerCta: 'Iniciar Proyecto',
      themeDark: 'Tema Oscuro',
      themeLight: 'Tema Claro',
      stageBands: [
        {
          kicker: 'NEXVIA TECH · INGENIERÍA DE SOFTWARE',
          h1: 'Construimos plataformas que transforman operaciones.',
          p: 'Desarrollo a medida, plataformas licenciables y aplicaciones digitales para empresas B2B y consumidores B2C.',
          ctas: ['Ver Sistemas Construidos', 'Hablar con Ingeniería']
        },
        {
          kicker: 'ARQUITECTURA MULTIPLATAFORMA',
          h2: 'Web, Mobile y Desktop con rendimiento nativo.',
          p: 'Sistemas distribuidos de alta disponibilidad, interfaces fluidas a 60fps e integración continua con seguridad empresarial.'
        },
        {
          kicker: 'INTELIGENCIA APLICADA Y PRODUCCIÓN',
          h2: 'De la idea al software en producción.',
          p: '9 plataformas reales en operación en salud, entretenimiento, industria, educación, deportes y ciudadanía.'
        }
      ],
      scrollCue: 'Desliza o haz scroll',
      arch: {
        eyebrow: 'ARQUITECTURA DE ENTREGA',
        title: 'Herramientas inteligentes para <span>progreso real</span> en cualquier plataforma.',
        lead1: 'Actuamos en dos frentes complementarios: construimos <strong>infraestructura y sistemas a medida para organizaciones (B2B)</strong> y lanzamos <strong>aplicaciones directas al consumidor (B2C)</strong> con retención, velocidad y acabado visual impecable.',
        lead2: 'Pasa el cursor o toca las láminas translúcidas al lado para inspeccionar nuestras capas de entrega, o alterna entre el <strong>Tema Claro</strong> y el <strong>Tema Oscuro</strong> en la parte superior.',
        cta1: 'Iniciar Proyecto →',
        cta2: 'Inspeccionar los 9 Softwares',
        slabs: [
          { tag: '01 · MOBILE & PWA', title: 'Apps B2C & B2B', desc: 'Experiencias táctiles para iOS, Android y Web con sincronización offline-first y alta retención.' },
          { tag: '02 · WEB CLOUD', title: 'Plataformas SaaS', desc: 'Sistemas web y portales en la nube con alta capacidad operativa, seguridad robusta y disponibilidad continua.' },
          { tag: '03 · DESKTOP PC', title: 'Software Nativo', desc: 'Aplicaciones desktop para Windows con procesamiento gráfico acelerado, motores de audio y respuesta inmediata.' },
          { tag: '04 · IA & DATOS', title: 'Inteligencia Aplicada', desc: 'Inteligencia artificial aplicada a audio, automatizaciones complejas y análisis predictivo sin alucinaciones.' }
        ]
      },
      cnae: {
        eyebrow: 'ALCANCE CORPORATIVO · CNAES OFICIALES',
        title: 'Sistemas exclusivos o plataformas listas para escalar.',
        lead: 'Pasa el cursor para inclinación 3D o <strong>haz clic en cualquier tarjeta para girarla</strong> e inspeccionar entregables, garantías y modelos de contratación.',
        cards: [
          {
            front: { code: 'CNAE 62.01-5-01 · A MEDIDA', title: 'Sistemas Exclusivos B2B', desc: 'Desarrollo de programas informáticos a medida para reglas de negocio críticas, integraciones y flujos propietarios.' },
            back: { tag: 'GARANTÍAS Y ENTREGABLES', title: 'Ingeniería Dedicada A Medida', items: ['Propiedad intelectual 100% transferida al cliente contratante.', 'Código fuente auditado, documentación ejecutiva y cumplimiento LGPD.', 'Emisión de Factura de Servicios con CNAE oficial de desarrollo.', 'SLA de soporte continuo y atención directa con los ingenieros.'], cta: 'Solicitar Propuesta B2B →' }
          },
          {
            front: { code: 'CNAE 62.02-3-00 & 62.03-1-00', title: 'Productos y Licenciamiento SaaS', desc: 'Creación y licenciamiento de plataformas personalizables y productos listos para escala comercial B2C y B2B.' },
            back: { tag: 'LICENCIAMIENTO ÁGIL', title: 'Plataformas Listas para Operar', items: ['Plataformas pre-validadas listas para personalización White-label.', 'Reducción drástica del time-to-market de nuevos productos digitales.', 'Infraestructura escalable en la nube con aislamiento riguroso de cuentas.', 'Modelos flexibles de licenciamiento por usuario, volumen o perpetuo.'], cta: 'Hablar sobre Licenciamiento →' }
          },
          {
            front: { code: 'CNAE 62.04-0-00 · CONSULTORÍA TI', title: 'Arquitectura e IA Aplicada', desc: 'Consultoría estratégica en tecnología de la información, modernización de sistemas, pipelines de datos y modelos de IA sin alucinaciones.' },
            back: { tag: 'CONFIANZA Y RENDIMIENTO', title: 'Ingeniería de Alto Desempeño', items: ['Auditoría de código, arquitectura distribuida y cumplimiento LGPD.', 'Soluciones de Inteligencia Artificial con citación de fuentes auditadas.', 'Modernización de sistemas heredados para máxima velocidad de respuesta.', 'Planificación de capacidad con reducción de costos en la nube.'], cta: 'Agendar Consultoría TI →' }
          },
          {
            front: { code: 'CNAE 62.09-1-00 · SOPORTE & OPS', title: 'Sustentación y Evolución', desc: 'Soporte técnico especializado, mantenimiento evolutivo, cumplimiento LGPD y observabilidad continua en producción.' },
            back: { tag: 'DISPONIBILIDAD 24/7', title: 'Continuidad de Operaciones', items: ['Monitoreo continuo de integridad con respuesta inmediata.', 'Actualizaciones preventivas de seguridad, parches y cumplimiento.', 'SLAs transparentes de resolución formalizados en contrato.', 'Evolución continua de nuevas funcionalidades alineadas al mercado.'], cta: 'Contratar Sustentación →' }
          }
        ]
      },
      metrics: [
        { val: '9+', label: 'Softwares Propietarios y Clientes en Producción' },
        { val: '6', label: 'Sectores: Salud, Deportes, Industria, Audio, Ciencia y Educación' },
        { val: 'B2B & B2C', label: 'Web, iOS/Android Mobile y Desktop Windows' },
        { val: '100%', label: 'Ingeniería Propia desde el Diseño hasta la Nube' }
      ],
      portfolio: {
        eyebrow: 'PORTAFOLIO EN PRODUCCIÓN',
        title: '9 Plataformas <span>Reales en Operación</span>',
        lead: 'Explora los ecosistemas desarrollados por Nexvia Tech. Arrastra la órbita 3D, filtra por segmento o haz clic en cualquier proyecto para inspeccionarlo en detalle.',
        filters: ['Todos (9)', 'Deporte y Medios', 'Industria B2B', 'Ciudadanía y Medio Ambiente', 'Salud y Biotecnología', 'Entretenimiento y Audio IA', 'Ciencia y Simulación PC', 'Educación', 'Tecnología y Web'],
        orbitHint: '✦ 9 Lunas en Órbita Tridimensional · Arrastra para girar con inercia · Haz clic en cualquier satélite para inspeccionar',
        inspectorEmpty: 'Selecciona un proyecto arriba o en la órbita 3D para inspeccionar sus detalles.',
        openOnline: 'Abrir Plataforma en Vivo ↗',
        requestDemo: 'Solicitar Demostración'
      },
      lab: {
        eyebrow: 'EXPERIENCIA TOUCH & SCROLL',
        title: 'Controla el flujo de <span>ingeniería</span> en tiempo real.',
        lead: 'Arrastra la línea de tiempo o usa las escenas rápidas para navegar por los motores visuales que impulsan nuestras aplicaciones.',
        scenes: ['01 · Núcleo & Datos', '02 · Interfaz & Fluidez', '03 · Escala & Nube']
      },
      company: {
        eyebrow: 'EMPRESA & CONTACTO DIRECTO',
        title: 'Hablemos sobre tu <span>próximo software</span>.',
        lead: 'Atendemos proyectos corporativos a medida, licenciamiento de plataformas y alianzas estratégicas en todo Brasil y el exterior.',
        cards: [
          { label: 'RAZÓN SOCIAL', value: 'Nexvia Tech Tecnologia Ltda.' },
          { label: 'CORREO OFICIAL', value: 'admin@nexviatec.com' },
          { label: 'MODELO DE ATENCIÓN', value: 'B2B A Medida · Licenciamiento SaaS · Productos B2C' }
        ],
        cta: 'Enviar Mensaje al Equipo →'
      },
      footer: '© 2026 Nexvia Tech · Ingeniería de Software B2B & B2C · Todos los derechos reservados.',
      footerFull: {
        desc: 'Desarrollo y licenciamiento de programas informáticos, aplicaciones móviles, sistemas web y consultoría en Tecnologías de la Información para mercados B2B y B2C.',
        regTitle: 'Registro Oficial (CNPJ)',
        locTitle: 'Ubicación y Contacto',
        addrLabel: 'DIRECCIÓN:',
        cityLabel: 'CIUDAD / ESTADO:',
        contactLabel: 'CONTACTO:',
        govTitle: 'Privacidad, LGPD y Cookies',
        lgpdNote: 'Tratamiento de datos conforme a la <strong>LGPD (Ley nº 13.709/2018)</strong>. Delegado (DPO): admin@nexviatec.com',
        privacyBtn: 'Política de Privacidad',
        cookieBtn: 'Control de Cookies'
      },
      legal: {
        privacyKicker: 'CUMPLIMIENTO LGPD · LEY Nº 13.709/2018',
        privacyTitle: 'Política de Privacidad y LGPD',
        privacyBody: '<p><strong>NEXVIA TECNOLOGIA LTDA</strong> (Nexvia Tech) trata los datos personales en estricto cumplimiento de la <strong>Ley General de Protección de Datos (LGPD — Ley nº 13.709/2018)</strong>.</p><p><strong>Finalidad:</strong> Los datos enviados en formularios de contacto o demostración se utilizan exclusivamente para atención técnica, propuestas comerciales B2B/B2C y soporte.</p><p><strong>Derechos del Titular:</strong> Puedes solicitar acceso, corrección, portabilidad o eliminación de tus datos en cualquier momento escribiendo a <strong>admin@nexviatec.com</strong>.</p><p><strong>Seguridad:</strong> No comercializamos datos personales y aplicamos cifrado y control de acceso estricto en todos los entornos.</p>',
        cookieKicker: 'PREFERENCIAS DE PRIVACIDAD',
        cookieTitle: 'Control de Cookies',
        cookieEssTitle: 'Cookies Esenciales',
        cookieEssDesc: 'Necesarias para el tema (claro/oscuro), idioma y funcionamiento básico.',
        cookiePerfTitle: 'Rendimiento y Telemetría',
        cookiePerfDesc: 'Ayuda a medir la fluidez de carga y compatibilidad gráfica.',
        cookieFuncTitle: 'Preferencias Funcionales',
        cookieFuncDesc: 'Memoriza filtros del portafolio y estado de la órbita 3D.',
        cookieReject: 'Solo Esenciales',
        cookieSave: 'Guardar Preferencias'
      },
      modal: {
        title: 'Iniciar Proyecto con Nexvia Tech',
        sub: 'Cuéntanos brevemente lo que necesitas construir. Nuestro equipo de ingeniería responderá por correo.',
        nameLabel: 'Tu Nombre o Empresa',
        namePh: 'Ej.: María Silva · Empresa X',
        emailLabel: 'Correo Corporativo o Personal',
        emailPh: 'nombre@empresa.com',
        typeLabel: 'Tipo de Solución',
        types: ['Sistema Exclusivo B2B (A Medida)', 'Plataforma SaaS / Licenciamiento', 'App Mobile (iOS / Android)', 'Software Desktop / IA Aplicada'],
        msgLabel: 'Resumen del Proyecto',
        msgPh: 'Describe el objetivo principal, plazo deseado o dudas...',
        submit: 'Enviar Solicitud →',
        sent: '¡Solicitud preparada! Se abrirá tu cliente de correo para enviar a admin@nexviatec.com.'
      }
    },
    'en-US': {
      title: 'Nexvia Tech · B2B & B2C Software Engineering',
      nav: ['B2B & B2C Solutions', 'Portfolio (9)', 'Touch/Scroll Experience', 'Company & Contact'],
      headerCta: 'Start Project',
      themeDark: 'Dark Theme',
      themeLight: 'Light Theme',
      stageBands: [
        {
          kicker: 'NEXVIA TECH · SOFTWARE ENGINEERING',
          h1: 'We build platforms that transform operations.',
          p: 'Custom software development, licensable platforms, and digital applications for B2B enterprises and B2C consumers.',
          ctas: ['View Built Systems', 'Talk to Engineering']
        },
        {
          kicker: 'CROSS-PLATFORM ARCHITECTURE',
          h2: 'Web, Mobile, and Desktop with native performance.',
          p: 'High-availability distributed systems, fluid 60fps interfaces, and continuous integration with enterprise security.'
        },
        {
          kicker: 'APPLIED INTELLIGENCE & PRODUCTION',
          h2: 'From idea to production software.',
          p: '9 real platforms operating across healthcare, entertainment, industry, education, sports, and civic tech.'
        }
      ],
      scrollCue: 'Scroll or swipe',
      arch: {
        eyebrow: 'DELIVERY ARCHITECTURE',
        title: 'Intelligent tools for <span>real progress</span> on every platform.',
        lead1: 'We operate on two complementary fronts: we build <strong>custom infrastructure and systems for organizations (B2B)</strong> and launch <strong>direct-to-consumer applications (B2C)</strong> with retention, speed, and impeccable visual craft.',
        lead2: 'Hover or tap the translucent blades beside to inspect our delivery layers, or switch between <strong>Light Theme</strong> and <strong>Dark Theme</strong> at the top.',
        cta1: 'Start Project →',
        cta2: 'Inspect the 9 Softwares',
        slabs: [
          { tag: '01 · MOBILE & PWA', title: 'B2C & B2B Apps', desc: 'Tactile experiences for iOS, Android, and Web with offline-first sync and high retention.' },
          { tag: '02 · WEB CLOUD', title: 'SaaS Platforms', desc: 'Cloud web systems and portals with high operational capacity, robust security, and continuous uptime.' },
          { tag: '03 · DESKTOP PC', title: 'Native Software', desc: 'Windows desktop applications with accelerated graphics processing, audio engines, and instant response.' },
          { tag: '04 · AI & DATA', title: 'Applied Intelligence', desc: 'Artificial intelligence applied to audio, complex automations, and predictive analytics without hallucinations.' }
        ]
      },
      cnae: {
        eyebrow: 'CORPORATE SCOPE · OFFICIAL CNAES',
        title: 'Exclusive systems or platforms ready to scale.',
        lead: 'Hover for 3D tilt or <strong>click any card to flip it</strong> and inspect deliverables, guarantees, and engagement models.',
        cards: [
          {
            front: { code: 'CNAE 62.01-5-01 · CUSTOM', title: 'Exclusive B2B Systems', desc: 'Custom software development for mission-critical business rules, integrations, and proprietary workflows.' },
            back: { tag: 'GUARANTEES & DELIVERABLES', title: 'Dedicated Custom Engineering', items: ['100% intellectual property transferred to the contracting client.', 'Audited source code, executive documentation, and LGPD compliance.', 'Official software development service invoicing.', 'Continuous support SLA and direct access to engineers.'], cta: 'Request B2B Proposal →' }
          },
          {
            front: { code: 'CNAE 62.02-3-00 & 62.03-1-00', title: 'SaaS Products & Licensing', desc: 'Creation and licensing of customizable platforms and turnkey products for B2C and B2B commercial scale.' },
            back: { tag: 'AGILE LICENSING', title: 'Ready-to-Operate Platforms', items: ['Pre-validated platforms ready for White-label customization.', 'Drastic reduction in time-to-market for new digital products.', 'Scalable cloud infrastructure with strict account isolation.', 'Flexible licensing models per user, volume, or perpetual.'], cta: 'Discuss Licensing →' }
          },
          {
            front: { code: 'CNAE 62.04-0-00 · IT CONSULTING', title: 'Architecture & Applied AI', desc: 'Strategic IT consulting, system modernization, data pipelines, and hallucination-free AI models.' },
            back: { tag: 'TRUST & PERFORMANCE', title: 'High-Performance Engineering', items: ['Code auditing, distributed architecture, and LGPD compliance.', 'Artificial Intelligence solutions with audited source citations.', 'Legacy system modernization for maximum response speed.', 'Capacity planning with cloud cost reduction.'], cta: 'Schedule IT Consulting →' }
          },
          {
            front: { code: 'CNAE 62.09-1-00 · SUPPORT & OPS', title: 'Sustainment & Evolution', desc: 'Specialized technical support, evolutionary maintenance, LGPD compliance, and continuous production observability.' },
            back: { tag: '24/7 AVAILABILITY', title: 'Operations Continuity', items: ['Continuous integrity monitoring with immediate response.', 'Preventive security updates, patches, and compliance.', 'Transparent resolution SLAs formalized in contract.', 'Continuous evolution of new features aligned with the market.'], cta: 'Hire Sustainment →' }
          }
        ]
      },
      metrics: [
        { val: '9+', label: 'Proprietary & Client Softwares in Production' },
        { val: '6', label: 'Sectors: Health, Sports, Industry, Audio, Science & Education' },
        { val: 'B2B & B2C', label: 'Web, iOS/Android Mobile, and Windows Desktop' },
        { val: '100%', label: 'In-House Engineering from Design to Cloud' }
      ],
      portfolio: {
        eyebrow: 'PORTFOLIO IN PRODUCTION',
        title: '9 Real Platforms <span>in Operation</span>',
        lead: 'Explore the ecosystems engineered by Nexvia Tech. Drag the 3D orbit, filter by sector, or click any project to inspect it in detail.',
        filters: ['All (9)', 'Sports & Media', 'B2B Industry', 'Civic & Environment', 'Health & Biotech', 'Entertainment & AI Audio', 'Science & PC Simulation', 'Education', 'Tech & Web'],
        orbitHint: '✦ 9 Moons in 3D Orbit · Drag to spin with inertia · Click any satellite to inspect',
        inspectorEmpty: 'Select a project above or in the 3D orbit to inspect its details.',
        openOnline: 'Open Live Platform ↗',
        requestDemo: 'Request Demo'
      },
      lab: {
        eyebrow: 'TOUCH & SCROLL EXPERIENCE',
        title: 'Control the <span>engineering</span> flow in real time.',
        lead: 'Drag the timeline or use the quick scenes to navigate through the visual engines that power our applications.',
        scenes: ['01 · Core & Data', '02 · Interface & Fluidity', '03 · Scale & Cloud']
      },
      company: {
        eyebrow: 'COMPANY & DIRECT CONTACT',
        title: 'Let’s talk about your <span>next software</span>.',
        lead: 'We serve custom corporate projects, platform licensing, and strategic partnerships across Brazil and worldwide.',
        cards: [
          { label: 'LEGAL ENTITY', value: 'Nexvia Tech Tecnologia Ltda.' },
          { label: 'OFFICIAL EMAIL', value: 'admin@nexviatec.com' },
          { label: 'ENGAGEMENT MODEL', value: 'Custom B2B · SaaS Licensing · B2C Products' }
        ],
        cta: 'Send Message to Team →'
      },
      footer: '© 2026 Nexvia Tech · B2B & B2C Software Engineering · All rights reserved.',
      footerFull: {
        desc: 'Development and licensing of computer software, mobile applications, web systems, and Information Technology consulting for B2B and B2C markets.',
        regTitle: 'Official Registration (CNPJ)',
        locTitle: 'Location & Contact',
        addrLabel: 'ADDRESS:',
        cityLabel: 'CITY / STATE:',
        contactLabel: 'CONTACT:',
        govTitle: 'Privacy, LGPD & Cookies',
        lgpdNote: 'Data processing in compliance with <strong>LGPD (Law No. 13.709/2018)</strong>. Data Protection Officer (DPO): admin@nexviatec.com',
        privacyBtn: 'Privacy Policy',
        cookieBtn: 'Cookie Controls'
      },
      legal: {
        privacyKicker: 'LGPD COMPLIANCE · LAW NO. 13.709/2018',
        privacyTitle: 'Privacy Policy & LGPD',
        privacyBody: '<p><strong>NEXVIA TECNOLOGIA LTDA</strong> (Nexvia Tech) processes personal data in strict compliance with Brazil’s <strong>General Data Protection Law (LGPD — Law No. 13.709/2018)</strong>.</p><p><strong>Purpose:</strong> Data submitted through contact or demo forms is used exclusively for technical assistance, B2B/B2C commercial proposals, and support.</p><p><strong>Data Subject Rights:</strong> You may request access, correction, portability, or deletion of your data at any time via <strong>admin@nexviatec.com</strong>.</p><p><strong>Security:</strong> We never sell personal data and enforce encryption and strict access control across all environments.</p>',
        cookieKicker: 'PRIVACY PREFERENCES',
        cookieTitle: 'Cookie Controls',
        cookieEssTitle: 'Essential Cookies',
        cookieEssDesc: 'Required for theme (light/dark), language, and core functionality.',
        cookiePerfTitle: 'Performance & Telemetry',
        cookiePerfDesc: 'Helps measure loading fluidity and graphics compatibility.',
        cookieFuncTitle: 'Functional Preferences',
        cookieFuncDesc: 'Remembers portfolio filters and 3D orbit state.',
        cookieReject: 'Essential Only',
        cookieSave: 'Save Preferences'
      },
      modal: {
        title: 'Start a Project with Nexvia Tech',
        sub: 'Tell us briefly what you need to build. Our engineering team will reply by email.',
        nameLabel: 'Your Name or Company',
        namePh: 'e.g., Alex Morgan · Acme Corp',
        emailLabel: 'Work or Personal Email',
        emailPh: 'name@company.com',
        typeLabel: 'Solution Type',
        types: ['Exclusive B2B System (Custom)', 'SaaS Platform / Licensing', 'Mobile App (iOS / Android)', 'Desktop Software / Applied AI'],
        msgLabel: 'Project Summary',
        msgPh: 'Describe your main goal, target timeline, or questions...',
        submit: 'Send Request →',
        sent: 'Request prepared! Your email client will open to send to admin@nexviatec.com.'
      }
    }
  };

  let originalPt = null;
  let currentLang = 'pt-BR';

  function captureOriginal() {
    if (originalPt) return;
    const q = (s) => document.querySelector(s);
    const qa = (s) => Array.from(document.querySelectorAll(s));

    originalPt = {
      title: document.title,
      nav: qa('.nav-links a').map((el) => el.textContent),
      headerCta: q('.header-actions .btn-primary')?.textContent || '',
      stageBands: qa('.stage-band').map((band) => ({
        kicker: band.querySelector('.band-kicker')?.textContent || '',
        h1: band.querySelector('h1')?.textContent || '',
        h2: band.querySelector('h2')?.textContent || '',
        p: band.querySelector('p')?.textContent || '',
        ctas: Array.from(band.querySelectorAll('.band-ctas a, .band-ctas button')).map((c) => c.textContent)
      })),
      scrollCue: q('.scroll-cue span')?.textContent || '',
      arch: {
        eyebrow: q('#solucoes .eyebrow')?.textContent || '',
        title: q('#solucoes h2')?.innerHTML || '',
        leads: qa('#solucoes .section-lead').map((el) => el.innerHTML),
        ctas: qa('#solucoes .arch-ctas a, #solucoes .arch-ctas button').map((el) => el.textContent),
        slabs: qa('.prism-slab').map((slab) => ({
          tag: slab.querySelector('.slab-tag')?.textContent || '',
          title: slab.querySelector('h3')?.textContent || '',
          desc: slab.querySelector('p')?.textContent || ''
        }))
      },
      cnae: {
        eyebrow: q('.cnae-section .eyebrow')?.textContent || '',
        title: q('.cnae-section h2')?.textContent || '',
        lead: q('.cnae-section .section-lead')?.innerHTML || '',
        cards: qa('.cap-card').map((card) => ({
          front: {
            code: card.querySelector('.cap-front .cap-code')?.textContent || '',
            title: card.querySelector('.cap-front h3')?.textContent || '',
            desc: card.querySelector('.cap-front p')?.textContent || ''
          },
          back: {
            tag: card.querySelector('.cap-back .cap-back-tag')?.textContent || '',
            title: card.querySelector('.cap-back h3')?.textContent || '',
            items: Array.from(card.querySelectorAll('.cap-back li')).map((li) => li.textContent),
            cta: card.querySelector('.cap-back .btn')?.textContent || ''
          }
        }))
      },
      metrics: qa('.metric-cell').map((cell) => ({
        val: cell.querySelector('.metric-val')?.textContent || '',
        label: cell.querySelector('.metric-label')?.textContent || ''
      })),
      portfolio: {
        eyebrow: q('#portfolio .eyebrow')?.textContent || '',
        title: q('#portfolio h2')?.innerHTML || '',
        lead: q('#portfolio .section-lead')?.textContent || '',
        filters: qa('.filter-btn').map((b) => b.textContent),
        orbitHint: q('.orbit-hint')?.textContent || ''
      },
      lab: {
        eyebrow: q('#laboratorio .eyebrow')?.textContent || '',
        title: q('#laboratorio h2')?.innerHTML || '',
        lead: q('#laboratorio .section-lead')?.textContent || '',
        scenes: qa('.lab-scene-btn').map((b) => b.textContent)
      },
      company: {
        eyebrow: q('#contato .eyebrow')?.textContent || '',
        title: q('#contato h2')?.innerHTML || '',
        lead: q('#contato .section-lead')?.textContent || '',
        cards: qa('.company-card').map((c) => ({
          label: c.querySelector('.company-label')?.textContent || '',
          value: c.querySelector('.company-value')?.textContent || ''
        })),
        cta: q('#contato .btn-primary')?.textContent || ''
      },
      footer: q('.site-footer p')?.textContent || '',
      footerFull: {
        desc: q('.site-footer .footer-inner > div:first-child p')?.textContent || '',
        regTitle: q('.site-footer .footer-inner > div:nth-child(2) h3')?.textContent || '',
        ...Object.fromEntries(qa('[data-i18n-footer]').map((el) => [el.dataset.i18nFooter, el.innerHTML]))
      },
      legal: Object.fromEntries(qa('[data-i18n-legal]').map((el) => [el.dataset.i18nLegal, el.innerHTML])),
      modal: {
        title: q('#demoModal h3')?.textContent || '',
        sub: q('#demoModal .modal-sub')?.textContent || '',
        labels: qa('#demoModal label').map((l) => l.textContent),
        namePh: q('#demoName')?.getAttribute('placeholder') || '',
        emailPh: q('#demoEmail')?.getAttribute('placeholder') || '',
        msgPh: q('#demoMsg')?.getAttribute('placeholder') || '',
        types: qa('#demoType option').map((o) => o.textContent),
        submit: q('#demoModal button[type="submit"]')?.textContent || ''
      }
    };
  }

  function syncThemeLabel() {
    const labelEl = document.getElementById('themeLabel');
    if (!labelEl) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (currentLang === 'pt-BR') {
      labelEl.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
    } else {
      const t = TRANSLATIONS[currentLang];
      labelEl.textContent = isDark ? t.themeLight : t.themeDark;
    }
  }

  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'pt-BR';
    captureOriginal();
    currentLang = lang;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const q = (s) => document.querySelector(s);
    const qa = (s) => Array.from(document.querySelectorAll(s));
    const data = lang === 'pt-BR' ? originalPt : TRANSLATIONS[lang];

    document.title = data.title;

    qa('.nav-links a').forEach((el, i) => {
      if (data.nav[i]) el.textContent = data.nav[i];
    });
    const headerCta = q('.header-actions .btn-primary');
    if (headerCta && data.headerCta) headerCta.textContent = data.headerCta;

    qa('.stage-band').forEach((band, i) => {
      const b = data.stageBands[i];
      if (!b) return;
      const kicker = band.querySelector('.band-kicker');
      const h1 = band.querySelector('h1');
      const h2 = band.querySelector('h2');
      const p = band.querySelector('p');
      if (kicker && b.kicker) kicker.textContent = b.kicker;
      if (h1 && b.h1) h1.textContent = b.h1;
      if (h2 && b.h2) h2.textContent = b.h2;
      if (p && b.p) p.textContent = b.p;
      if (b.ctas) {
        band.querySelectorAll('.band-ctas a, .band-ctas button').forEach((c, idx) => {
          if (b.ctas[idx]) c.textContent = b.ctas[idx];
        });
      }
    });

    const scrollCue = q('.scroll-cue span');
    if (scrollCue && data.scrollCue) scrollCue.textContent = data.scrollCue;

    // Architecture section
    const archEyebrow = q('#solucoes .eyebrow');
    const archTitle = q('#solucoes h2');
    const archLeads = qa('#solucoes .section-lead');
    if (archEyebrow) archEyebrow.textContent = data.arch.eyebrow;
    if (archTitle) archTitle.innerHTML = data.arch.title;
    if (lang === 'pt-BR') {
      archLeads.forEach((el, i) => { if (data.arch.leads[i]) el.innerHTML = data.arch.leads[i]; });
      qa('#solucoes .arch-ctas a, #solucoes .arch-ctas button').forEach((el, i) => {
        if (data.arch.ctas[i]) el.textContent = data.arch.ctas[i];
      });
    } else {
      if (archLeads[0]) archLeads[0].innerHTML = data.arch.lead1;
      if (archLeads[1]) archLeads[1].innerHTML = data.arch.lead2;
      const ctas = qa('#solucoes .arch-ctas a, #solucoes .arch-ctas button');
      if (ctas[0]) ctas[0].textContent = data.arch.cta1;
      if (ctas[1]) ctas[1].textContent = data.arch.cta2;
    }

    qa('.prism-slab').forEach((slab, i) => {
      const s = data.arch.slabs[i];
      if (!s) return;
      const tag = slab.querySelector('.slab-tag');
      const h3 = slab.querySelector('h3');
      const p = slab.querySelector('p');
      if (tag) tag.textContent = s.tag;
      if (h3) h3.textContent = s.title;
      if (p) p.textContent = s.desc;
    });

    // CNAE section
    const cnaeEyebrow = q('.cnae-section .eyebrow');
    const cnaeTitle = q('.cnae-section h2');
    const cnaeLead = q('.cnae-section .section-lead');
    if (cnaeEyebrow) cnaeEyebrow.textContent = data.cnae.eyebrow;
    if (cnaeTitle) cnaeTitle.textContent = data.cnae.title;
    if (cnaeLead) cnaeLead.innerHTML = data.cnae.lead;

    qa('.cap-card').forEach((card, i) => {
      const c = data.cnae.cards[i];
      if (!c) return;
      const fCode = card.querySelector('.cap-front .cap-code');
      const fTitle = card.querySelector('.cap-front h3');
      const fDesc = card.querySelector('.cap-front p');
      if (fCode) fCode.textContent = c.front.code;
      if (fTitle) fTitle.textContent = c.front.title;
      if (fDesc) fDesc.textContent = c.front.desc;

      const bTag = card.querySelector('.cap-back .cap-back-tag');
      const bTitle = card.querySelector('.cap-back h3');
      const bItems = card.querySelectorAll('.cap-back li');
      const bCta = card.querySelector('.cap-back .btn');
      if (bTag) bTag.textContent = c.back.tag;
      if (bTitle) bTitle.textContent = c.back.title;
      bItems.forEach((li, idx) => { if (c.back.items[idx]) li.textContent = c.back.items[idx]; });
      if (bCta) bCta.textContent = c.back.cta;
    });

    // Metrics
    qa('.metric-cell').forEach((cell, i) => {
      const m = data.metrics[i];
      if (!m) return;
      const v = cell.querySelector('.metric-val');
      const l = cell.querySelector('.metric-label');
      if (v) v.textContent = m.val;
      if (l) l.textContent = m.label;
    });

    // Portfolio header & filters
    const portEyebrow = q('#portfolio .eyebrow');
    const portTitle = q('#portfolio h2');
    const portLead = q('#portfolio .section-lead');
    const orbitHint = q('.orbit-hint');
    if (portEyebrow) portEyebrow.textContent = data.portfolio.eyebrow;
    if (portTitle) portTitle.innerHTML = data.portfolio.title;
    if (portLead) portLead.textContent = data.portfolio.lead;
    if (orbitHint) orbitHint.textContent = data.portfolio.orbitHint;
    qa('.filter-btn').forEach((btn, i) => {
      if (data.portfolio.filters[i]) btn.textContent = data.portfolio.filters[i];
    });

    // Lab section
    const labEyebrow = q('#laboratorio .eyebrow');
    const labTitle = q('#laboratorio h2');
    const labLead = q('#laboratorio .section-lead');
    if (labEyebrow) labEyebrow.textContent = data.lab.eyebrow;
    if (labTitle) labTitle.innerHTML = data.lab.title;
    if (labLead) labLead.textContent = data.lab.lead;
    qa('.lab-scene-btn').forEach((btn, i) => {
      if (data.lab.scenes[i]) btn.textContent = data.lab.scenes[i];
    });

    // Company & Contact
    const compEyebrow = q('#contato .eyebrow');
    const compTitle = q('#contato h2');
    const compLead = q('#contato .section-lead');
    const compCta = q('#contato .btn-primary');
    if (compEyebrow) compEyebrow.textContent = data.company.eyebrow;
    if (compTitle) compTitle.innerHTML = data.company.title;
    if (compLead) compLead.textContent = data.company.lead;
    if (compCta) compCta.textContent = data.company.cta;
    qa('.company-card').forEach((card, i) => {
      const c = data.company.cards[i];
      if (!c) return;
      const lbl = card.querySelector('.company-label');
      const val = card.querySelector('.company-value');
      if (lbl) lbl.textContent = c.label;
      if (val) val.textContent = c.value;
    });

    // Footer
    const footerP = q('.site-footer .footer-inner > div:first-child p');
    if (footerP && data.footerFull?.desc) footerP.textContent = data.footerFull.desc;
    const footerRegTitle = q('.site-footer .footer-inner > div:nth-child(2) h3');
    if (footerRegTitle && data.footerFull?.regTitle) footerRegTitle.textContent = data.footerFull.regTitle;
    qa('[data-i18n-footer]').forEach((el) => {
      const key = el.dataset.i18nFooter;
      if (data.footerFull && data.footerFull[key] !== undefined) {
        el.innerHTML = data.footerFull[key];
      }
    });
    qa('[data-i18n-legal]').forEach((el) => {
      const key = el.dataset.i18nLegal;
      if (data.legal && data.legal[key] !== undefined) {
        el.innerHTML = data.legal[key];
      }
    });

    // Modal
    const mTitle = q('#demoModal h3');
    const mSub = q('#demoModal .modal-sub');
    const mSubmit = q('#demoModal button[type="submit"]');
    if (mTitle) mTitle.textContent = data.modal.title;
    if (mSub) mSub.textContent = data.modal.sub;
    if (mSubmit) mSubmit.textContent = data.modal.submit;
    if (lang === 'pt-BR') {
      qa('#demoModal label').forEach((l, i) => { if (data.modal.labels[i]) l.textContent = data.modal.labels[i]; });
      if (q('#demoName')) q('#demoName').setAttribute('placeholder', data.modal.namePh);
      if (q('#demoEmail')) q('#demoEmail').setAttribute('placeholder', data.modal.emailPh);
      if (q('#demoMsg')) q('#demoMsg').setAttribute('placeholder', data.modal.msgPh);
    } else {
      const labels = qa('#demoModal label');
      if (labels[0]) labels[0].textContent = data.modal.nameLabel;
      if (labels[1]) labels[1].textContent = data.modal.emailLabel;
      if (labels[2]) labels[2].textContent = data.modal.typeLabel;
      if (labels[3]) labels[3].textContent = data.modal.msgLabel;
      if (q('#demoName')) q('#demoName').setAttribute('placeholder', data.modal.namePh);
      if (q('#demoEmail')) q('#demoEmail').setAttribute('placeholder', data.modal.emailPh);
      if (q('#demoMsg')) q('#demoMsg').setAttribute('placeholder', data.modal.msgPh);
    }
    qa('#demoType option').forEach((opt, i) => {
      if (data.modal.types[i]) opt.textContent = data.modal.types[i];
    });

    syncThemeLabel();
  }

  function init() {
    captureOriginal();

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.dataset.lang);
      });
    });

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        requestAnimationFrame(syncThemeLabel);
      });
    }

    let saved = 'pt-BR';
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s && SUPPORTED.includes(s)) saved = s;
    } catch (_) {}

    if (saved !== 'pt-BR') {
      applyLanguage(saved);
    } else {
      syncThemeLabel();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

