const commercialContent = {
  navigation: [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#services' },
    { label: 'Proceso', href: '#process' },
    { label: 'Galería', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
  ],
  hero: {
    eyebrow: 'Regalos personalizados hechos a mano',
    title: 'Funkos personalizados y manualidades únicas para regalar emociones.',
    cta: 'Cuéntanos tu idea y la convertimos en una pieza artesanal con detalles, colores y accesorios pensados para sorprender.',
    highlights: ['100% personalizados', 'Hechos a mano', 'Presupuesto sin compromiso'],
  },
  about: {
    title: 'La Pluma transforma recuerdos en pequeñas obras de arte',
    description:
      'Creamos Funkos personalizados y manualidades hechas a mano para convertir tus ideas en regalos únicos. Cada figura se realiza de forma artesanal, cuidando los detalles que hacen especial a cada persona, personaje o recuerdo.',
    trust:
      'Diseños personalizados, piezas únicas, trato cercano y acabados hechos con mimo.',
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
  gallery: [
    'Figura de pareja con mascotas',
    'Funko profesional con uniforme',
    'Caja regalo temática',
    'Nombre decorativo infantil',
    'Mini escena de aniversario',
    'Detalle para comunión',
  ],
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
    title: 'Empezamos por tu idea',
    text: 'Comparte qué quieres regalar, para quién es y cualquier detalle especial. Cuéntanos tu idea y te preparamos un presupuesto sin compromiso.',
    cta: 'Solicitar presupuesto',
    email: 'hola@lapluma.example',
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

function Header(items) {
  const header = createElement('header', 'site-header');
  const brand = createElement('a', 'site-header__brand', 'La Pluma');
  brand.href = '#hero';
  brand.setAttribute('aria-label', 'La Pluma, ir al inicio');

  const nav = createElement('nav', 'site-header__nav');
  nav.setAttribute('aria-label', 'Navegación principal');
  items.forEach((item) => {
    const link = createElement('a', null, item.label);
    link.href = item.href;
    nav.append(link);
  });

  const contact = createElement('a', 'button button--primary button--compact', 'Pedir presupuesto');
  contact.href = '#contact';
  header.append(brand, nav, contact);

  return header;
}

function Hero({ eyebrow, title, cta, highlights }) {
  const section = createElement('section', 'hero section-card');
  section.id = 'hero';

  const copy = createElement('div', 'hero__copy');
  copy.append(createElement('p', 'eyebrow', eyebrow), createElement('h1', null, title), createElement('p', 'hero__lead', cta));

  const actions = createElement('div', 'hero__actions');
  const primaryLink = createElement('a', 'button button--primary', 'Pedir presupuesto');
  primaryLink.href = '#contact';
  const secondaryLink = createElement('a', 'button button--secondary', 'Ver trabajos');
  secondaryLink.href = '#gallery';
  actions.append(primaryLink, secondaryLink);
  copy.append(actions);

  const highlightList = createElement('ul', 'hero__highlights');
  highlights.forEach((highlight) => {
    highlightList.append(createElement('li', null, highlight));
  });
  copy.append(highlightList);

  const visual = createElement('div', 'hero__visual');
  visual.setAttribute('aria-label', 'Ilustración de una figura personalizada artesanal');
  visual.append(
    createElement('span', 'hero__sparkle hero__sparkle--one', '✦'),
    createElement('span', 'hero__sparkle hero__sparkle--two', '✧'),
    createElement('div', 'funko-figure'),
    createElement('p', 'hero__caption', 'Tu idea, hecha a mano'),
  );

  section.append(copy, visual);

  return section;
}

function About({ title, description, trust }) {
  const section = createElement('section', 'about section-card');
  section.id = 'about';
  section.append(createElement('p', 'eyebrow', 'Sobre el taller'), createElement('h2', null, title), createElement('p', null, description));

  const trustBlock = createElement('aside', 'trust-block');
  trustBlock.setAttribute('aria-label', 'Bloque de confianza');
  trustBlock.append(createElement('strong', null, trust));
  section.append(trustBlock);

  return section;
}

function Services(items) {
  const section = createElement('section', 'services section-card');
  section.id = 'services';
  section.append(createElement('p', 'eyebrow', 'Qué hacemos'), createElement('h2', null, 'Piezas artesanales para cada ocasión'));

  const grid = createElement('div', 'card-grid');
  items.forEach((item) => {
    const article = createElement('article', 'feature-card');
    article.append(createElement('span', 'feature-card__icon', item.icon), createElement('h3', null, item.title), createElement('p', null, item.description));
    grid.append(article);
  });
  section.append(grid);

  return section;
}

function Process(items) {
  const section = createElement('section', 'process section-card');
  section.id = 'process';
  section.append(createElement('p', 'eyebrow', 'Cómo trabajamos'), createElement('h2', null, 'Un encargo sencillo, cercano y cuidado'));

  const steps = createElement('div', 'process__steps');
  items.forEach((item) => {
    const article = createElement('article', 'process__step');
    article.append(createElement('h3', null, item.title), createElement('p', null, item.description));
    steps.append(article);
  });
  section.append(steps);

  return section;
}

function Gallery(items) {
  const section = createElement('section', 'gallery section-card');
  section.id = 'gallery';
  section.append(createElement('p', 'eyebrow', 'Ideas de encargos'), createElement('h2', null, 'Inspiración para tu próximo regalo'));

  const grid = createElement('div', 'gallery__grid');
  items.forEach((item, index) => {
    const card = createElement('article', `gallery__item gallery__item--${index + 1}`);
    card.append(createElement('span', null, item));
    grid.append(card);
  });
  section.append(grid);

  return section;
}

function FAQ(items) {
  const section = createElement('section', 'faq section-card');
  section.id = 'faq';
  section.append(
    createElement('p', 'eyebrow', 'Preguntas frecuentes'),
    createElement('h2', null, 'Antes de encargar tu pieza'),
  );

  const list = createElement('div', 'faq__list');
  items.forEach((item) => {
    const detail = createElement('details', 'faq__item');
    detail.append(createElement('summary', null, item.question), createElement('p', null, item.answer));
    list.append(detail);
  });
  section.append(list);

  return section;
}

function Contact({ title, text, cta, email }) {
  const section = createElement('section', 'contact section-card');
  section.id = 'contact';
  section.append(createElement('p', 'eyebrow', 'Contacto'), createElement('h2', null, title), createElement('p', null, text));

  const contactLink = createElement('a', 'button button--primary', cta);
  contactLink.href = `mailto:${email}?subject=Presupuesto%20personalizado%20La%20Pluma`;

  const note = createElement('p', 'contact__note', `Escríbenos a ${email} con fotos de referencia, fecha deseada y detalles importantes.`);
  section.append(contactLink, note);

  return section;
}

function renderPage(content, mountNode = document.querySelector('#app')) {
  mountNode.append(
    Header(content.navigation),
    Hero(content.hero),
    About(content.about),
    Services(content.services),
    Process(content.process),
    Gallery(content.gallery),
    FAQ(content.faq),
    Contact(content.contact),
  );
}

renderPage(commercialContent);

export { commercialContent, Header, Hero, About, Services, Process, Gallery, FAQ, Contact, renderPage };
