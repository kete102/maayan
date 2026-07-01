export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  collection: string;
  translation: string;
  format: string;
  coverType: string;
  language: string;
  edition: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  rating: number;
  reviewCount: number;
};

export const collections = [
  {
    slug: "study-bibles",
    name: "Biblias de Estudio",
    description:
      "Notas profundas, mapas y comentarios para iluminar cada pasaje.",
  },
  {
    slug: "journaling-bibles",
    name: "Biblias de Diario",
    description:
      "Amplios márgenes para reflexionar, ilustrar y responder a la Palabra.",
  },
  {
    slug: "large-print-bibles",
    name: "Biblias de Letra Grande",
    description:
      "Tipografía generosa y legible para una lectura cómoda y pausada.",
  },
  {
    slug: "gift-editions",
    name: "Ediciones de Regalo",
    description:
      "Ediciones acabadas con cuidado, hechas para atesorar y regalar.",
  },
  {
    slug: "premium-leather",
    name: "Biblias de Cuero Premium",
    description:
      "Cuero de calidad de herencia, encuadernado para durar toda una vida de devoción.",
  },
];

export const translations = ["ESV", "NIV", "KJV", "NKJV", "NLT", "CSB"];
export const formats = ["Tapa Dura", "Cuero", "Tela", "Compacto"];
export const coverTypes = [
  "Cuero Genuino",
  "Cuero Aglutinado",
  "Tela",
  "Tapa Dura",
];
export const languages = ["Inglés", "Español", "Hebreo", "Bilingüe"];

export const products: Product[] = [
  {
    id: "1",
    slug: "living-water-premium-leather",
    name: "Biblia de Cuero Premium Agua Viva",
    price: 189,
    currency: "USD",
    image: "/images/bible-navy-leather.png",
    collection: "premium-leather",
    translation: "ESV",
    format: "Cuero",
    coverType: "Cuero Genuino",
    language: "Inglés",
    edition: "Primera Edición",
    shortDescription: "Cuero genuino azul marino profundo con bordes dorados.",
    description:
      "Nuestra edición insignia, encuadernada en suave cuero genuino azul marino profundo con bordes de páginas dorados aplicados a mano. Una Biblia de herencia diseñada para ser llevada, marcada y transmitida — las Escrituras presentadas como la fuente de agua viva que son.",
    features: [
      "Cubierta de cuero genuino de grano completo",
      "Bordes de páginas dorados con oro de 24k",
      "Dos marcadores de cinta satinada",
      "Encuadernación cosida Smyth que abre plana",
      "Papel de 38 gsm con líneas alineadas",
    ],
    specs: [
      { label: "Traducción", value: "ESV" },
      { label: "Cubierta", value: "Cuero Genuino" },
      { label: "Dimensiones", value: "6.3 x 9.1 in" },
      { label: "Páginas", value: "1,232" },
      { label: "Tamaño de Fuente", value: "10 pt" },
    ],
    rating: 5,
    reviewCount: 214,
  },
  {
    id: "2",
    slug: "reflections-journaling-bible",
    name: "Biblia de Diario Reflexiones",
    price: 96,
    currency: "USD",
    image: "/images/bible-tan-journaling.png",
    collection: "journaling-bibles",
    translation: "NIV",
    format: "Cuero",
    coverType: "Cuero Aglutinado",
    language: "Inglés",
    edition: "Margen Ancho",
    shortDescription:
      "Cuero tono arena con amplios márgenes rayados para reflexión.",
    description:
      "Márgenes rayados de cinco centímetros te invitan a responder a cada pasaje con notas, oraciones e ilustraciones. Encuadernada en cálido cuero tono arena, la edición Reflexiones convierte la lectura diaria en un registro duradero de tu camino.",
    features: [
      "Márgenes rayados anchos de 5 cm",
      "Papel de diario crema libre de ácidos",
      "Encuadernación cosida Smyth que abre plana",
      "Marcador de cinta único",
      "Cierre con banda elástica",
    ],
    specs: [
      { label: "Traducción", value: "NIV" },
      { label: "Cubierta", value: "Cuero Aglutinado" },
      { label: "Dimensiones", value: "6.0 x 8.5 in" },
      { label: "Páginas", value: "1,408" },
      { label: "Tamaño de Fuente", value: "9 pt" },
    ],
    rating: 5,
    reviewCount: 167,
  },
  {
    id: "3",
    slug: "wellspring-study-bible",
    name: "Biblia de Estudio Manantial",
    price: 124,
    currency: "USD",
    image: "/images/bible-ivory-study.png",
    collection: "study-bibles",
    translation: "CSB",
    format: "Tela",
    coverType: "Tela",
    language: "Inglés",
    edition: "Edición de Estudio",
    shortDescription:
      "Tapa dura de tela marfil con extensas notas de estudio y mapas.",
    description:
      "Más de 20,000 notas de estudio, mapas en color completo, introducciones a los libros y artículos teológicos acompañan al texto. La edición Manantial está envuelta en una discreta tela marfil con papel de oro, construida para años de estudio cuidadoso.",
    features: [
      "Más de 20,000 notas de estudio",
      "Mapas y gráficos en color completo",
      "Introducciones y esquemas de libros",
      "Concordancia y referencias cruzadas",
      "Cubierta de tela sobre cartón durable",
    ],
    specs: [
      { label: "Traducción", value: "CSB" },
      { label: "Cubierta", value: "Tela Tapa Dura" },
      { label: "Dimensiones", value: "6.5 x 9.5 in" },
      { label: "Páginas", value: "2,016" },
      { label: "Tamaño de Fuente", value: "9 pt" },
    ],
    rating: 4,
    reviewCount: 98,
  },
  {
    id: "4",
    slug: "clear-font-large-print",
    name: "Biblia de Letra Grande Fuente Clara",
    price: 142,
    currency: "USD",
    image: "/images/bible-black-largeprint.png",
    collection: "large-print-bibles",
    translation: "KJV",
    format: "Cuero",
    coverType: "Cuero Genuino",
    language: "Inglés",
    edition: "Letra Grande",
    shortDescription:
      "Cuero carbón con generosa tipografía de 14pt y bordes dorados.",
    description:
      "Una fuente cómoda de 14 puntos hace que cada palabra sea fácil de leer, en párrafos limpios de una sola columna. Encuadernada en cuero genuino carbón con bordes dorados y un marcador de cinta, diseñada para una lectura tranquila y sin prisa.",
    features: [
      "Tipografía grande de 14 pt",
      "Diseño de párrafo de una sola columna",
      "Bordes de páginas dorados",
      "Cubierta de cuero genuino",
      "Marcador de cinta",
    ],
    specs: [
      { label: "Traducción", value: "KJV" },
      { label: "Cubierta", value: "Cuero Genuino" },
      { label: "Dimensiones", value: "7.0 x 10.0 in" },
      { label: "Páginas", value: "1,664" },
      { label: "Tamaño de Fuente", value: "14 pt" },
    ],
    rating: 5,
    reviewCount: 132,
  },
  {
    id: "5",
    slug: "gift-of-grace-edition",
    name: "Edición Regalo de Gracia",
    price: 78,
    currency: "USD",
    image: "/images/bible-gift-edition.png",
    collection: "gift-editions",
    translation: "NLT",
    format: "Tapa Dura",
    coverType: "Tapa Dura",
    language: "Inglés",
    edition: "Edición de Regalo",
    shortDescription:
      "Edición de regalo azul océano con detalles dorados y cinta.",
    description:
      "Acabada en suave azul océano con discretos detalles dorados y una página de presentación, la Edición Regalo de Gracia está hecha para ser regalada. Llega envuelta con una cinta marfil — una manera tranquila y hermosa de compartir la Palabra viva.",
    features: [
      "Página de presentación y dedicatoria",
      "Detalles de papel de oro discretos",
      "Envoltura de regalo con cinta marfil",
      "Marcador de cinta",
      "Caja de regalo incluida",
    ],
    specs: [
      { label: "Traducción", value: "NLT" },
      { label: "Cubierta", value: "Tapa Dura" },
      { label: "Dimensiones", value: "5.5 x 8.0 in" },
      { label: "Páginas", value: "1,280" },
      { label: "Tamaño de Fuente", value: "9 pt" },
    ],
    rating: 5,
    reviewCount: 76,
  },
  {
    id: "6",
    slug: "pilgrim-compact-bible",
    name: "Biblia Compacta del Peregrino",
    price: 64,
    currency: "USD",
    image: "/images/bible-compact-brown.png",
    collection: "premium-leather",
    translation: "NKJV",
    format: "Compacto",
    coverType: "Cuero Genuino",
    language: "Inglés",
    edition: "Compacto",
    shortDescription: "Edición compacta de cuero marrón para viajar y llevar.",
    description:
      "Suficientemente delgada para llevar a cualquier parte, la Compacta del Peregrino está encuadernada en cálido cuero genuino marrón con bordes dorados. Una fiel compañera para viajes, traslados y momentos tranquilos dondequiera que el día te lleve.",
    features: [
      "Perfil delgado y ligero",
      "Cubierta de cuero genuino",
      "Bordes de páginas dorados",
      "Marcador de cinta",
      "Cierre con broche",
    ],
    specs: [
      { label: "Traducción", value: "NKJV" },
      { label: "Cubierta", value: "Cuero Genuino" },
      { label: "Dimensiones", value: "4.5 x 6.5 in" },
      { label: "Páginas", value: "1,120" },
      { label: "Tamaño de Fuente", value: "7 pt" },
    ],
    rating: 4,
    reviewCount: 54,
  },
  {
    id: "7",
    slug: "still-waters-study-bible",
    name: "Biblia de Estudio Aguas Tranquilas",
    price: 138,
    currency: "USD",
    image: "/images/bible-navy-leather.png",
    collection: "study-bibles",
    translation: "ESV",
    format: "Cuero",
    coverType: "Cuero Aglutinado",
    language: "Inglés",
    edition: "Edición de Estudio",
    shortDescription:
      "Cuero aglutinado azul marino con ayudas devocionales de estudio.",
    description:
      "Combinando ricas notas de estudio con reflexiones devocionales diarias, la edición Aguas Tranquilas está encuadernada en cuero aglutinado azul marino. Te guía junto a aguas tranquilas con orientación reflexiva para cada capítulo.",
    features: [
      "Reflexiones devocionales a lo largo del texto",
      "Más de 15,000 notas de estudio",
      "Planes de lectura incluidos",
      "Cubierta de cuero aglutinado",
      "Dos marcadores de cinta",
    ],
    specs: [
      { label: "Traducción", value: "ESV" },
      { label: "Cubierta", value: "Cuero Aglutinado" },
      { label: "Dimensiones", value: "6.3 x 9.0 in" },
      { label: "Páginas", value: "1,920" },
      { label: "Tamaño de Fuente", value: "9 pt" },
    ],
    rating: 5,
    reviewCount: 89,
  },
  {
    id: "8",
    slug: "fountain-journaling-bible",
    name: "Biblia de Diario Fuente",
    price: 88,
    currency: "USD",
    image: "/images/bible-tan-journaling.png",
    collection: "journaling-bibles",
    translation: "NLT",
    format: "Tela",
    coverType: "Tela",
    language: "Bilingüe",
    edition: "Diario",
    shortDescription:
      "Edición de diario en tela con indicaciones de ilustración.",
    description:
      "La edición Fuente incluye delicadas indicaciones de arte lineal y amplios márgenes para respuesta creativa, encuadernada en suave tela sobre cartón. Un hermoso espacio para dejar que tus reflexiones fluyan como una fuente.",
    features: [
      "Indicaciones de ilustración a lo largo del texto",
      "Amplios márgenes rayados",
      "Cubierta de tela sobre cartón",
      "Papel de diario crema",
      "Marcador de cinta",
    ],
    specs: [
      { label: "Traducción", value: "NLT" },
      { label: "Cubierta", value: "Tela" },
      { label: "Dimensiones", value: "6.0 x 8.5 in" },
      { label: "Páginas", value: "1,360" },
      { label: "Tamaño de Fuente", value: "9 pt" },
    ],
    rating: 4,
    reviewCount: 41,
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollectionName(slug: string) {
  return collections.find((c) => c.slug === slug)?.name ?? slug;
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .concat(
      products.filter(
        (p) => p.id !== product.id && p.collection !== product.collection,
      ),
    )
    .slice(0, limit);
}
