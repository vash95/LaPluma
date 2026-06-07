const commercialContent = {
  hero: {
    eyebrow: 'Regalos personalizados hechos a mano',
    title:
      'Creamos Funkos personalizados y manualidades hechas a mano para convertir tus ideas en regalos únicos.',
    cta: 'Cuéntanos tu idea y te preparamos un presupuesto sin compromiso.',
  },
  about: {
    title: 'Piezas artesanales con detalles únicos',
    description:
      'Cada figura se realiza de forma artesanal, cuidando los detalles que hacen especial a cada persona, personaje o recuerdo.',
    trust:
      'Diseños personalizados, piezas únicas, trato cercano y acabados hechos con mimo.',
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
    title: 'Empezamos por tu idea',
    text: 'Comparte qué quieres regalar, para quién es y cualquier detalle especial. Te orientamos con opciones, tiempos y presupuesto.',
    cta: 'Solicitar presupuesto',
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

function Hero({ eyebrow, title, cta }) {
  const section = createElement('section', 'hero section-card');
  section.id = 'hero';

  section.append(
    createElement('p', 'eyebrow', eyebrow),
    createElement('h1', null, title),
    createElement('p', 'hero__lead', cta),
  );

  const actions = createElement('div', 'hero__actions');
  const primaryLink = createElement('a', 'button button--primary', 'Pedir presupuesto');
  primaryLink.href = '#contact';
  const secondaryLink = createElement('a', 'button button--secondary', 'Ver preguntas frecuentes');
  secondaryLink.href = '#faq';
  actions.append(primaryLink, secondaryLink);
  section.append(actions);

  return section;
}

function About({ title, description, trust }) {
  const section = createElement('section', 'about section-card');
  section.id = 'about';
  section.append(createElement('h2', null, title), createElement('p', null, description));

  const trustBlock = createElement('aside', 'trust-block');
  trustBlock.setAttribute('aria-label', 'Bloque de confianza');
  trustBlock.append(createElement('strong', null, trust));
  section.append(trustBlock);

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

function Contact({ title, text, cta }) {
  const section = createElement('section', 'contact section-card');
  section.id = 'contact';
  section.append(createElement('h2', null, title), createElement('p', null, text));

  const contactLink = createElement('a', 'button button--primary', cta);
  contactLink.href = 'mailto:hola@lapluma.example?subject=Presupuesto%20personalizado';
  section.append(contactLink);

  return section;
}

function renderPage(content, mountNode = document.querySelector('#app')) {
  mountNode.append(
    Hero(content.hero),
    About(content.about),
    FAQ(content.faq),
    Contact(content.contact),
  );
}

renderPage(commercialContent);

export { commercialContent, Hero, About, FAQ, Contact, renderPage };
