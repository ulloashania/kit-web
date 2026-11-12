// Todo lo que se repite en la web, en un solo sitio.
export const site = {
  name: 'Nombre de la marca',
  tagline: 'Una frase corta sobre lo que hace',
  email: 'hola@example.com',
  phone: '+34 600 000 000',
};
export const phoneLink = `tel:${site.phone.replace(/[^+\d]/g, '')}`;

export const links = [
  ['/about/', 'About'],
  ['/services/', 'Services'],
  ['/contact/', 'Contact'],
];
