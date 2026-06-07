import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

const requiredSnippets = [
  'Creamos Funkos personalizados y manualidades hechas a mano para convertir tus ideas en regalos únicos.',
  'Cada figura se realiza de forma artesanal, cuidando los detalles que hacen especial a cada persona, personaje o recuerdo.',
  'Cuéntanos tu idea y te preparamos un presupuesto sin compromiso.',
  'Diseños personalizados, piezas únicas, trato cercano y acabados hechos con mimo.',
  '¿Cuál es el tiempo de elaboración?',
  '¿Se puede personalizar con fotos?',
  '¿Qué formas de pago aceptáis?',
  '¿Hacéis envíos o recogida?',
  '¿Qué cuidados necesitan las piezas?',
  'function Hero',
  'function About',
  'function FAQ',
  'function Contact',
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));

if (missing.length > 0) {
  console.error('Missing commercial content snippets:');
  missing.forEach((snippet) => console.error(`- ${snippet}`));
  process.exit(1);
}

console.log('Commercial content blocks and reusable sections are present.');
