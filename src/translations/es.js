export default {
  lang: "es",
  menu: {
    home: "Inicio",
    about: "Sobre nosotros",
    menu: "Carta",
    testimonials: "Testimonios",
    appointments: "Reservas",
    orderLink: "Pedir",
  },
  hero: {
    title1: `Bacon Love`,
    title2: `Cocina artesanal`,
    text1:
      "En bacon love hacemos alta cocina, platillos de alta calidad, artesanales y con un sabor exquisito bajo la supervision del chef",
    text2:
      "y sus habilidades culinaria adquiridas a lo largo del mundo. Hecha un vistazo a nuestra carta de platos precionando el boton.",
    name: "Raul doñe",
    subtitle: `Lo artesanal es nuestro secreto`,
    button: `Ver carta`,
  },
  about: {
    subtitle: "Sobre nosotros",
    title: "La vision detras de Bacon Love",
    text1:
      "En Bacon Love somos un restaurante emergente con una idea muy clara: llevar la experiencia gastronómica a otro nivel. Apostamos por fusionar la alta cocina con platos más cotidianos, creando combinaciones que sorprenden y conquistan desde el primer bocado.",
    text2:
      "Aquí podrás disfrutar de una mezcla de sabores inspirados en México, Estados Unidos, República Dominicana y España, siempre manteniendo un estándar de calidad que se nota en cada plato.",
    text3: "En Bacon Love no vienes solo a comer: vienes a pasarlo bien.",
    text4:
      "Te ofrecemos buena comida, un ambiente cercano y muy social, y una experiencia gastronómica pensada para que repitas.",
  },
  platillos: {
    title: "Carta",
  },
  testimonials: [
    {
      name: "Ramses Gonzalez",
      starts: 5,
      avatar: "/avatares/ramses.jpg",
      comment: "Hamburguesas riquisimas con mucha carne, sabor exquisito 10/10",
    },
    {
      name: "Dilcia Doñe",
      starts: 5,
      avatar: "/avatares/dilcia.jpg",
      comment:
        "Pedirles comida es siempre un placer. La comida esta rapidísima y siempre llega calientita, ¡un servicio de 5 estrellas!",
    },
    {
      name: "Julian Pimentel",
      starts: 5,
      avatar: "/avatares/julian.jpg",
      comment:
        "Comida super buena y un local agradable, muy buen trato al cliente. Un lugar perfecto para ir en cualquier ocación",
    },
  ],
  appointments: {
    title: "Reserva tu mesa",
    subtitle: "Haz tu reserva facilmente",
    description: "Completa el formulario para reservar tu mesa en Bacon Love",
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Número de teléfono (WhatsApp)",
      phonePlaceholder: "+34 600 000 000",
      date: "Fecha",
      time: "Horario",
      guests: "Número de personas",
      notes: "Notas adicionales (opcional)",
      notesPlaceholder: "Alergias, preferencias, ocasión especial...",
      submit: "Reservar",
      submitting: "Reservando...",
    },
    success: "¡Reserva confirmada! Te contactaremos pronto por WhatsApp",
    errors: {
      requiredFields: "Por favor completa todos los campos requeridos",
      invalidEmail: "Correo electrónico inválido",
      invalidPhone: "Número de teléfono inválido",
      selectTime: "Por favor selecciona un horario",
      serverError: "Error al procesar la reserva. Intenta nuevamente",
    },
  },
  orders: {
    label: 'Pedidos Online',
    title: 'Pide donde quieras',
    subtitle: 'Tu comida favorita, en tu mesa o en tu puerta',
    description: 'Haz tu pedido usando nuestra app de delivery. Rapido, sencillo y siempre con la misma calidad artesanal que nos distingue.',
    button: 'Hacer pedido',
    menuLabel: 'Pedir',
  },
  footer: {
    brand: {
      title: "Bacon Love",
      description: "Bacon Love - Tu Bar & Grill y referente en cocina artesanal en San Blas-Canillejas, Madrid."
    },
    contact: {
      title: "Contacto",
      address: "C. de Sofía, 177i, San Blas-Canillejas, 28022 Madrid",
      phone: "677 06 30 60",
      phoneLink: "tel:+34677063060"
    },
    hours: {
      title: "Horarios",
      schedule: [
        "Lunes - Viernes: 07:30 - 23:30",
        "Sábados: 11:30 - 23:30",
        "Domingos: 11:30 - 20:30"
      ]
    },
    quickLinks: {
      title: "Enlaces",
      items: [
        { label: "Inicio", url: "/es" },
        { label: "Carta", url: "/es/carta" },
        { label: "Nosotros", url: "/es/nosotros" },
        { label: "Contacto", url: "/es/contacto" }
      ]
    },
    rights: "Bacon Love © 2025 | Todos los derechos reservados"
  },
};
