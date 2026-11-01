insert into public.products (
  slug, name, short_description, description,
  price_cents, stock, image_paths,
  features, contents, specs
) values (
  'origen',
  'Origen',
  'Inspirada en la Creación, el mar y las aguas',
  'Una biblia cuidadosamente forrada a mano con una tela elegida por su belleza y textura. Una pieza pensada para regalar, conservar y, sobre todo, abrir',
  2800,
  30,
  array['/images/bible-navy-leather.png'],
  array['Forrada a mano', 'Tela con textura coral'],
  array[
    'Índice',
    'Glosario',
    'Plan de lectura de un año',
    'Promesas de Dios',
    'Notas a pie de página'
  ],
  '[
    {"label": "Traducción", "value": "NVI Peninsular. Edición Castellana"},
    {"label": "Cubierta", "value": "Tela con textura coral"},
    {"label": "Dimensiones", "value": "13,5 cm × 21,5 cm"},
    {"label": "Páginas", "value": "992"},
    {"label": "Canto", "value": "Blanco"}
  ]'::jsonb
);
