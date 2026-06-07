const supportedLanguages = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ca', label: 'CA', name: 'Català' },
];

const commercialContent = {
  es: {
    languageName: 'Español',
    aria: {
      main: 'Contenido comercial de La Pluma',
      brand: 'La Pluma, ir al inicio',
      nav: 'Navegación principal',
      language: 'Seleccionar idioma',
      visual: 'Ilustración de una figura personalizada artesanal',
      trust: 'Bloque de confianza',
    },
    meta: {
      description: 'Creamos Funkos personalizados y manualidades hechas a mano para convertir tus ideas en regalos únicos.',
      title: 'La Pluma | Funkos personalizados y manualidades',
    },
    navigation: [
      { label: 'Inicio', href: '#hero' },
      { label: 'Servicios', href: '#services' },
      { label: 'Proceso', href: '#process' },
      { label: 'Galería', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
    ],
    buttons: {
      budget: 'Pedir presupuesto',
      works: 'Ver trabajos',
    },
    hero: {
      eyebrow: 'Regalos personalizados hechos a mano',
      title: 'Funkos personalizados y manualidades únicas para regalar emociones.',
      cta: 'Cuéntanos tu idea y la convertimos en una pieza artesanal con detalles, colores y accesorios pensados para sorprender.',
      highlights: ['100% personalizados', 'Hechos a mano', 'Presupuesto sin compromiso'],
      caption: 'Tu idea, hecha a mano',
    },
    about: {
      eyebrow: 'Sobre el taller',
      title: 'La Pluma transforma recuerdos en pequeñas obras de arte',
      description:
        'Creamos Funkos personalizados y manualidades hechas a mano para convertir tus ideas en regalos únicos. Cada figura se realiza de forma artesanal, cuidando los detalles que hacen especial a cada persona, personaje o recuerdo.',
      trust:
        'Diseños personalizados, piezas únicas, trato cercano y acabados hechos con mimo.',
    },
    servicesIntro: {
      eyebrow: 'Qué hacemos',
      title: 'Piezas artesanales para cada ocasión',
    },
    services: [
      {
        title: 'Funkos personalizados',
        description:
          'Figuras inspiradas en personas reales, personajes favoritos o momentos especiales, con ropa, peinado, accesorios y base decorativa a medida.',
        icon: '🎨',
      },
      {
        title: 'Regalos para eventos',
        description:
          'Detalles para cumpleaños, bodas, comuniones, aniversarios, graduaciones o despedidas, preparados para entregar y emocionar.',
        icon: '🎁',
      },
      {
        title: 'Manualidades decorativas',
        description:
          'Piezas artesanales, toppers, cajas, nombres, recuerdos y composiciones creativas para decorar espacios o acompañar un regalo.',
        icon: '✂️',
      },
    ],
    processIntro: {
      eyebrow: 'Cómo trabajamos',
      title: 'Un encargo sencillo, cercano y cuidado',
    },
    process: [
      {
        title: '1. Nos cuentas la idea',
        description: 'Envías fotos, colores, temática, fecha de entrega y cualquier detalle importante.',
      },
      {
        title: '2. Diseñamos la propuesta',
        description: 'Te orientamos con opciones, materiales, tiempos y presupuesto antes de comenzar.',
      },
      {
        title: '3. Creamos tu pieza',
        description: 'Modelamos, pintamos y montamos el encargo con cuidado artesanal y revisiones clave.',
      },
      {
        title: '4. Entrega protegida',
        description: 'Preparamos la pieza para recogida o envío según ubicación, tamaño y fragilidad.',
      },
    ],
    galleryIntro: {
      eyebrow: 'Ideas de encargos',
      title: 'Inspiración para tu próximo regalo',
    },
    gallery: [
      'Figura de pareja con mascotas',
      'Funko profesional con uniforme',
      'Caja regalo temática',
      'Nombre decorativo infantil',
      'Mini escena de aniversario',
      'Detalle para comunión',
    ],
    faqIntro: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Antes de encargar tu pieza',
    },
    faq: [
      {
        question: '¿Cuál es el tiempo de elaboración?',
        answer:
          'El plazo depende del nivel de detalle y de la carga de trabajo, pero siempre te indicamos una fecha estimada antes de empezar.',
      },
      {
        question: '¿Se puede personalizar con fotos?',
        answer:
          'Sí. Puedes enviarnos fotos de referencia para adaptar rasgos, ropa, accesorios, colores y detalles importantes.',
      },
      {
        question: '¿Qué formas de pago aceptáis?',
        answer:
          'Te confirmamos las formas de pago disponibles al preparar el presupuesto y antes de iniciar el encargo.',
      },
      {
        question: '¿Hacéis envíos o recogida?',
        answer:
          'Podemos valorar envío o recogida según tu ubicación, el tipo de pieza y la protección necesaria para transportarla.',
      },
      {
        question: '¿Qué cuidados necesitan las piezas?',
        answer:
          'Recomendamos manipularlas con cuidado, evitar humedad, golpes y exposición directa prolongada al sol para conservar los acabados.',
      },
    ],
    contact: {
      eyebrow: 'Contacto',
      title: 'Empezamos por tu idea',
      text: 'Comparte qué quieres regalar, para quién es y cualquier detalle especial. Cuéntanos tu idea y te preparamos un presupuesto sin compromiso.',
      cta: 'Solicitar presupuesto',
      email: 'hola@lapluma.example',
      subject: 'Presupuesto personalizado La Pluma',
      note: 'Escríbenos a {email} con fotos de referencia, fecha deseada y detalles importantes.',
    },
  },
  en: {
    languageName: 'English',
    aria: {
      main: 'La Pluma commercial content',
      brand: 'La Pluma, go to home',
      nav: 'Primary navigation',
      language: 'Select language',
      visual: 'Illustration of a handcrafted custom figure',
      trust: 'Trust block',
    },
    meta: {
      description: 'We create custom Funkos and handmade crafts to turn your ideas into unique gifts.',
      title: 'La Pluma | Custom Funkos and handmade crafts',
    },
    navigation: [
      { label: 'Home', href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
    ],
    buttons: {
      budget: 'Request a quote',
      works: 'View work',
    },
    hero: {
      eyebrow: 'Handmade personalised gifts',
      title: 'Custom Funkos and unique crafts made to gift emotions.',
      cta: 'Tell us your idea and we will turn it into a handmade piece with details, colours and accessories designed to surprise.',
      highlights: ['100% personalised', 'Handmade', 'No-obligation quote'],
      caption: 'Your idea, handmade',
    },
    about: {
      eyebrow: 'About the workshop',
      title: 'La Pluma transforms memories into tiny works of art',
      description:
        'We create custom Funkos and handmade crafts to turn your ideas into unique gifts. Every figure is made by hand, taking care of the details that make each person, character or memory special.',
      trust: 'Personalised designs, one-of-a-kind pieces, friendly service and lovingly made finishes.',
    },
    servicesIntro: {
      eyebrow: 'What we do',
      title: 'Handmade pieces for every occasion',
    },
    services: [
      {
        title: 'Custom Funkos',
        description:
          'Figures inspired by real people, favourite characters or special moments, with custom clothing, hairstyle, accessories and decorative base.',
        icon: '🎨',
      },
      {
        title: 'Event gifts',
        description:
          'Details for birthdays, weddings, first communions, anniversaries, graduations or farewells, ready to give and move people.',
        icon: '🎁',
      },
      {
        title: 'Decorative crafts',
        description:
          'Handmade pieces, toppers, boxes, names, keepsakes and creative compositions to decorate spaces or complete a gift.',
        icon: '✂️',
      },
    ],
    processIntro: {
      eyebrow: 'How we work',
      title: 'A simple, friendly and careful order process',
    },
    process: [
      {
        title: '1. You tell us the idea',
        description: 'Send photos, colours, theme, delivery date and any important detail.',
      },
      {
        title: '2. We design the proposal',
        description: 'We guide you through options, materials, timings and budget before starting.',
      },
      {
        title: '3. We create your piece',
        description: 'We model, paint and assemble the order with handcrafted care and key reviews.',
      },
      {
        title: '4. Protected delivery',
        description: 'We prepare the piece for collection or shipping depending on location, size and fragility.',
      },
    ],
    galleryIntro: {
      eyebrow: 'Order ideas',
      title: 'Inspiration for your next gift',
    },
    gallery: [
      'Couple figure with pets',
      'Professional Funko with uniform',
      'Themed gift box',
      'Decorative child name',
      'Mini anniversary scene',
      'First communion detail',
    ],
    faqIntro: {
      eyebrow: 'Frequently asked questions',
      title: 'Before ordering your piece',
    },
    faq: [
      {
        question: 'How long does it take to make?',
        answer:
          'The timeframe depends on the level of detail and our workload, but we always give you an estimated date before starting.',
      },
      {
        question: 'Can it be personalised with photos?',
        answer:
          'Yes. You can send reference photos so we can adapt features, clothing, accessories, colours and important details.',
      },
      {
        question: 'Which payment methods do you accept?',
        answer:
          'We confirm the available payment methods when preparing the quote and before starting the order.',
      },
      {
        question: 'Do you ship or offer collection?',
        answer:
          'We can assess shipping or collection depending on your location, the type of piece and the protection needed for transport.',
      },
      {
        question: 'What care do the pieces need?',
        answer:
          'We recommend handling them carefully and avoiding humidity, impacts and prolonged direct sunlight to preserve the finishes.',
      },
    ],
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s start with your idea',
      text: 'Share what you want to give, who it is for and any special detail. Tell us your idea and we will prepare a no-obligation quote.',
      cta: 'Request a quote',
      email: 'hola@lapluma.example',
      subject: 'Custom quote La Pluma',
      note: 'Write to us at {email} with reference photos, desired date and important details.',
    },
  },
  ca: {
    languageName: 'Català',
    aria: {
      main: 'Contingut comercial de La Pluma',
      brand: 'La Pluma, ves a l’inici',
      nav: 'Navegació principal',
      language: 'Selecciona idioma',
      visual: 'Il·lustració d’una figura personalitzada artesanal',
      trust: 'Bloc de confiança',
    },
    meta: {
      description: 'Creem Funkos personalitzats i manualitats fetes a mà per convertir les teves idees en regals únics.',
      title: 'La Pluma | Funkos personalitzats i manualitats',
    },
    navigation: [
      { label: 'Inici', href: '#hero' },
      { label: 'Serveis', href: '#services' },
      { label: 'Procés', href: '#process' },
      { label: 'Galeria', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
    ],
    buttons: {
      budget: 'Demanar pressupost',
      works: 'Veure treballs',
    },
    hero: {
      eyebrow: 'Regals personalitzats fets a mà',
      title: 'Funkos personalitzats i manualitats úniques per regalar emocions.',
      cta: 'Explica’ns la teva idea i la convertirem en una peça artesanal amb detalls, colors i accessoris pensats per sorprendre.',
      highlights: ['100% personalitzats', 'Fets a mà', 'Pressupost sense compromís'],
      caption: 'La teva idea, feta a mà',
    },
    about: {
      eyebrow: 'Sobre el taller',
      title: 'La Pluma transforma records en petites obres d’art',
      description:
        'Creem Funkos personalitzats i manualitats fetes a mà per convertir les teves idees en regals únics. Cada figura es fa de manera artesanal, cuidant els detalls que fan especial cada persona, personatge o record.',
      trust: 'Dissenys personalitzats, peces úniques, tracte proper i acabats fets amb cura.',
    },
    servicesIntro: {
      eyebrow: 'Què fem',
      title: 'Peces artesanals per a cada ocasió',
    },
    services: [
      {
        title: 'Funkos personalitzats',
        description:
          'Figures inspirades en persones reals, personatges preferits o moments especials, amb roba, pentinat, accessoris i base decorativa a mida.',
        icon: '🎨',
      },
      {
        title: 'Regals per a esdeveniments',
        description:
          'Detalls per a aniversaris, casaments, comunions, graduacions o comiats, preparats per entregar i emocionar.',
        icon: '🎁',
      },
      {
        title: 'Manualitats decoratives',
        description:
          'Peces artesanals, toppers, caixes, noms, records i composicions creatives per decorar espais o acompanyar un regal.',
        icon: '✂️',
      },
    ],
    processIntro: {
      eyebrow: 'Com treballem',
      title: 'Un encàrrec senzill, proper i cuidat',
    },
    process: [
      {
        title: '1. Ens expliques la idea',
        description: 'Envies fotos, colors, temàtica, data d’entrega i qualsevol detall important.',
      },
      {
        title: '2. Dissenyem la proposta',
        description: 'T’orientem amb opcions, materials, terminis i pressupost abans de començar.',
      },
      {
        title: '3. Creem la teva peça',
        description: 'Modelem, pintem i muntem l’encàrrec amb cura artesanal i revisions clau.',
      },
      {
        title: '4. Entrega protegida',
        description: 'Preparem la peça per recollida o enviament segons ubicació, mida i fragilitat.',
      },
    ],
    galleryIntro: {
      eyebrow: 'Idees d’encàrrecs',
      title: 'Inspiració per al teu pròxim regal',
    },
    gallery: [
      'Figura de parella amb mascotes',
      'Funko professional amb uniforme',
      'Caixa regal temàtica',
      'Nom decoratiu infantil',
      'Mini escena d’aniversari',
      'Detall per a comunió',
    ],
    faqIntro: {
      eyebrow: 'Preguntes freqüents',
      title: 'Abans d’encarregar la teva peça',
    },
    faq: [
      {
        question: 'Quin és el temps d’elaboració?',
        answer:
          'El termini depèn del nivell de detall i de la càrrega de feina, però sempre t’indiquem una data estimada abans de començar.',
      },
      {
        question: 'Es pot personalitzar amb fotos?',
        answer:
          'Sí. Ens pots enviar fotos de referència per adaptar trets, roba, accessoris, colors i detalls importants.',
      },
      {
        question: 'Quines formes de pagament accepteu?',
        answer:
          'Et confirmem les formes de pagament disponibles en preparar el pressupost i abans d’iniciar l’encàrrec.',
      },
      {
        question: 'Feu enviaments o recollida?',
        answer:
          'Podem valorar enviament o recollida segons la teva ubicació, el tipus de peça i la protecció necessària per transportar-la.',
      },
      {
        question: 'Quines cures necessiten les peces?',
        answer:
          'Recomanem manipular-les amb cura, evitar humitat, cops i exposició directa prolongada al sol per conservar els acabats.',
      },
    ],
    contact: {
      eyebrow: 'Contacte',
      title: 'Comencem per la teva idea',
      text: 'Comparteix què vols regalar, per a qui és i qualsevol detall especial. Explica’ns la teva idea i et prepararem un pressupost sense compromís.',
      cta: 'Sol·licitar pressupost',
      email: 'hola@lapluma.example',
      subject: 'Pressupost personalitzat La Pluma',
      note: 'Escriu-nos a {email} amb fotos de referència, data desitjada i detalls importants.',
    },
  },
};

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

function getContent(language = 'es') {
  return commercialContent[language] ?? commercialContent.es;
}

function updateDocumentLanguage(language, content) {
  document.documentElement.lang = language;
  document.title = content.meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', content.meta.description);
  }
}

function Header(content, activeLanguage = 'es', onLanguageChange = () => {}) {
  const header = createElement('header', 'site-header');
  const brand = createElement('a', 'site-header__brand', 'La Pluma');
  brand.href = '#hero';
  brand.setAttribute('aria-label', content.aria.brand);

  const nav = createElement('nav', 'site-header__nav');
  nav.setAttribute('aria-label', content.aria.nav);
  content.navigation.forEach((item) => {
    const link = createElement('a', null, item.label);
    link.href = item.href;
    nav.append(link);
  });

  const actions = createElement('div', 'site-header__actions');
  const languageSwitcher = createElement('div', 'language-switcher');
  languageSwitcher.setAttribute('aria-label', content.aria.language);
  languageSwitcher.setAttribute('role', 'group');

  supportedLanguages.forEach((language) => {
    const button = createElement('button', 'language-switcher__button', language.label);
    button.type = 'button';
    button.title = language.name;
    button.setAttribute('aria-label', language.name);
    button.setAttribute('aria-pressed', String(language.code === activeLanguage));
    button.dataset.language = language.code;
    button.addEventListener('click', () => onLanguageChange(language.code));
    languageSwitcher.append(button);
  });

  const contact = createElement('a', 'button button--primary button--compact', content.buttons.budget);
  contact.href = '#contact';
  actions.append(languageSwitcher, contact);
  header.append(brand, nav, actions);

  return header;
}

function Hero({ eyebrow, title, cta, highlights, caption }, buttons, aria) {
  const section = createElement('section', 'hero section-card');
  section.id = 'hero';

  const copy = createElement('div', 'hero__copy');
  copy.append(createElement('p', 'eyebrow', eyebrow), createElement('h1', null, title), createElement('p', 'hero__lead', cta));

  const actions = createElement('div', 'hero__actions');
  const primaryLink = createElement('a', 'button button--primary', buttons.budget);
  primaryLink.href = '#contact';
  const secondaryLink = createElement('a', 'button button--secondary', buttons.works);
  secondaryLink.href = '#gallery';
  actions.append(primaryLink, secondaryLink);
  copy.append(actions);

  const highlightList = createElement('ul', 'hero__highlights');
  highlights.forEach((highlight) => {
    highlightList.append(createElement('li', null, highlight));
  });
  copy.append(highlightList);

  const visual = createElement('div', 'hero__visual');
  visual.setAttribute('aria-label', aria.visual);
  visual.append(
    createElement('span', 'hero__sparkle hero__sparkle--one', '✦'),
    createElement('span', 'hero__sparkle hero__sparkle--two', '✧'),
    createElement('div', 'funko-figure'),
    createElement('p', 'hero__caption', caption),
  );

  section.append(copy, visual);

  return section;
}

function About({ eyebrow, title, description, trust }, aria) {
  const section = createElement('section', 'about section-card');
  section.id = 'about';
  section.append(createElement('p', 'eyebrow', eyebrow), createElement('h2', null, title), createElement('p', null, description));

  const trustBlock = createElement('aside', 'trust-block');
  trustBlock.setAttribute('aria-label', aria.trust);
  trustBlock.append(createElement('strong', null, trust));
  section.append(trustBlock);

  return section;
}

function Services(items, intro) {
  const section = createElement('section', 'services section-card');
  section.id = 'services';
  section.append(createElement('p', 'eyebrow', intro.eyebrow), createElement('h2', null, intro.title));

  const grid = createElement('div', 'card-grid');
  items.forEach((item) => {
    const article = createElement('article', 'feature-card');
    article.append(createElement('span', 'feature-card__icon', item.icon), createElement('h3', null, item.title), createElement('p', null, item.description));
    grid.append(article);
  });
  section.append(grid);

  return section;
}

function Process(items, intro) {
  const section = createElement('section', 'process section-card');
  section.id = 'process';
  section.append(createElement('p', 'eyebrow', intro.eyebrow), createElement('h2', null, intro.title));

  const steps = createElement('div', 'process__steps');
  items.forEach((item) => {
    const article = createElement('article', 'process__step');
    article.append(createElement('h3', null, item.title), createElement('p', null, item.description));
    steps.append(article);
  });
  section.append(steps);

  return section;
}

function Gallery(items, intro) {
  const section = createElement('section', 'gallery section-card');
  section.id = 'gallery';
  section.append(createElement('p', 'eyebrow', intro.eyebrow), createElement('h2', null, intro.title));

  const grid = createElement('div', 'gallery__grid');
  items.forEach((item, index) => {
    const card = createElement('article', `gallery__item gallery__item--${index + 1}`);
    card.append(createElement('span', null, item));
    grid.append(card);
  });
  section.append(grid);

  return section;
}

function FAQ(items, intro) {
  const section = createElement('section', 'faq section-card');
  section.id = 'faq';
  section.append(createElement('p', 'eyebrow', intro.eyebrow), createElement('h2', null, intro.title));

  const list = createElement('div', 'faq__list');
  items.forEach((item) => {
    const detail = createElement('details', 'faq__item');
    detail.append(createElement('summary', null, item.question), createElement('p', null, item.answer));
    list.append(detail);
  });
  section.append(list);

  return section;
}

function Contact({ eyebrow, title, text, cta, email, subject, note }) {
  const section = createElement('section', 'contact section-card');
  section.id = 'contact';
  section.append(createElement('p', 'eyebrow', eyebrow), createElement('h2', null, title), createElement('p', null, text));

  const contactLink = createElement('a', 'button button--primary', cta);
  contactLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  const contactNote = createElement('p', 'contact__note', note.replace('{email}', email));
  section.append(contactLink, contactNote);

  return section;
}

function renderPage(language = 'es', mountNode = document.querySelector('#app')) {
  const content = typeof language === 'string' ? getContent(language) : language;
  const activeLanguage = typeof language === 'string' && commercialContent[language] ? language : 'es';

  updateDocumentLanguage(activeLanguage, content);
  mountNode.setAttribute('aria-label', content.aria.main);
  mountNode.replaceChildren(
    Header(content, activeLanguage, (nextLanguage) => renderPage(nextLanguage, mountNode)),
    Hero(content.hero, content.buttons, content.aria),
    About(content.about, content.aria),
    Services(content.services, content.servicesIntro),
    Process(content.process, content.processIntro),
    Gallery(content.gallery, content.galleryIntro),
    FAQ(content.faq, content.faqIntro),
    Contact(content.contact),
  );
}

if (typeof document !== 'undefined') {
  renderPage('es');
}

export { supportedLanguages, commercialContent, getContent, Header, Hero, About, Services, Process, Gallery, FAQ, Contact, renderPage };
