# AIMap Journey - Referencia del Prototipo UX

## 🔗 URLs
- **Prototipo Live:** https://aimap-journey.vercel.app/
- **Código fuente:** Pendiente (desarrollado por agencia externa)

## 📱 Pantallas del Prototipo

### Pantalla 1: Home / Landing
- **URL:** https://aimap-journey.vercel.app/
- **Descripción:** Primera pantalla que ve el usuario al entrar. Presenta el producto y tiene CTAs para comenzar un viaje personalizado ("Creá tu viaje") o ir a una sección de viajes pre-armados ("Explorar").

- **Elementos clave:**

  **Header/Navegación:**
  - Logo "AIMAP" (lado izquierdo)
  - Estado NO logueado: "Somos AIMAP" | "Inicia Sesión" | "Registrate"
  - Estado logueado: "Somos AIMAP" | "Dashboard" | "Admin User" | "Salir"

  **Hero Section (above the fold):**
  - Video de fondo: paisajes relajantes con transiciones suaves (bosque, mar, ciudad). Contrasta con el estrés de organizar un viaje manualmente.
  - Título principal: "Comenzá a planificar tu nuevo viaje"
  - Subtítulo/Propuesta de valor: "Creá itinerarios personalizados con IA. Optimizá tu presupuesto y descubrí experiencias únicas."
  - Botón primario (naranja): "Creá tu viaje →"
  - Botón secundario (azul): "Explorar"
  - Métricas de social proof: "10K+ Viajes creados" | "150+ Destinos" | "4.9 Rating promedio"
  - Flecha de scroll (↓) indicando más contenido abajo

  **Sección "¿Cómo funciona AIMAP?":**
  - Título: "¿Cómo funciona AIMAP?"
  - Subtítulo: "Planificá tu viaje perfecto en simples pasos"
  - Timeline visual con 4 pasos (diseño zigzag con íconos y conectores):
    - Paso 1: 📍 "Elegí tu destino" - "Seleccioná el lugar que querés visitar y contanos tus preferencias de viaje."
    - Paso 2: ✨ "IA personaliza tu viaje" - "Nuestra inteligencia artificial crea un itinerario único adaptado a tus intereses y presupuesto."
    - Paso 3: 📅 "Revisá y ajustá" - "Explorá tu itinerario detallado día por día y hacé los cambios que necesites."
    - Paso 4: ✈️ "¡Empezá tu aventura!" - "Descargá tu itinerario y disfrutá de un viaje perfectamente planificado."

- **Funcionalidad esperada:**
  - Click en "Creá tu viaje" → Lleva al formulario de preferencias (sin requerir login)
  - Click en "Explorar" → Lleva a /explore (página de destinos pre-armados)
  - Click en "Somos AIMAP" → Página institucional (bajo prioridad para MVP)
  - Click en "Inicia Sesión" / "Registrate" → Modal o página de auth
  - Click en "Dashboard" (si está logueado) → Lleva al dashboard del usuario
  - Video de fondo: autoplay, loop, sin sonido

- **Notas para desarrollo:**
  - El video debe ser optimizado para web (comprimido, lazy loading)
  - Las métricas de social proof pueden ser estáticas en MVP, dinámicas a futuro
  - El timeline de "¿Cómo funciona?" usa diseño zigzag con línea conectora y puntos naranjas
  - Mobile: el video podría reemplazarse por imagen estática para performance

### Pantalla 2: Formulario de Viaje
- **URL:** https://aimap-journey.vercel.app/trip-form
- **Descripción:** Formulario completo donde el usuario ingresa toda la información para generar su itinerario personalizado con IA. Diseño en cards verticales con indicadores de progreso.

- **Elementos clave:**

  **Header/Navegación (persistente):**
  - Logo "AIMAP" (lado izquierdo)
  - Menú: "Somos AIMAP" | "Dashboard" | "Admin User" | "Salir"

  *Título de página:*
  - Título: "Planificá tu viaje"
  - Subtítulo: "Respondé cada pregunta para generar tu itinerario personalizado"

  *Navegación lateral (íconos de progreso):*
  - Línea vertical con íconos que indican cada sección
  - Íconos: 📍 Lugares | 📅 Fechas | 💰 Presupuesto | ⭐ Prioridades | 👥 Acompañantes | ❤️ Intereses | 💬 Adicionales
  - Cada sección muestra "✓ Completado" al llenarse

  ---

  **Sección 1: Nombre del viaje**
  - Input de texto con placeholder "Ej: Aventura en Europa 2025"
  - Campo obligatorio (*)

  ---

  **Sección 2: ¿Qué lugares querés visitar?**
  - Subtítulo: "Contanos tus destinos soñados (podés elegir más de uno)"
  - **Ciudad de origen:** Input con autocomplete (muestra ciudad + país)
  - **Destinos:** Input con autocomplete que muestra imagen + nombre + país
    - Placeholder: "Buscar continente, país, provincia, ciudad o lugares"
    - Permite selección múltiple (tags removibles)

  ---

  **Sección 3: ¿Cuándo planeás viajar?**
  - Subtítulo: "Elegí las fechas de tu viaje"
  - **Toggle tabs:** "Fechas específicas" | "Fechas flexibles"
  - **Calendario doble:** muestra 2 meses lado a lado
  - **Resumen:** Badges con fecha inicio y fin + cantidad de días (ej: "24" - "25" → "1 Día")
  - Botón para limpiar fechas (ícono basura)

  ---

  **Sección 4: ¿Cuál es tu presupuesto?**
  - Subtítulo: "Definí tu rango de inversión"
  - **Input min:** valor mínimo
  - **Input max:** valor máximo
  - **Selector de moneda:** dropdown (USD, ARS, EUR, etc.)

  ---

  **Sección 5: Prioridades de gasto**
  - Subtítulo: "Contanos cómo valorás los siguientes aspectos"
  
  **5.1 Pasajes & Traslados:**
  - Botones de importancia: Muy importante | Importante | Normal | Poco importante | No importa
  - Checkboxes opcionales:
    - "No tengo preferencia"
    - "Deseo que sea vuelo directo"
    - "Viajo sólo con bolso/mochila personal"
    - "Prefiero trasladarme en transporte privado"
  - Desplegable "Priorizo viajar en esta franja horaria"
  - Desplegable "Evitar": escalas largas, vuelos nocturnos, etc.

  **5.2 Alojamiento:**
  - Botones de importancia: Muy importante | Importante | Normal | Poco importante | No importa
  - Desplegable "Priorizo este tipo de alojamiento": Hotel, Hostel, Departamento, Casa, Resort All Inclusive, Cabaña
  - Checkboxes opcionales:
    - "Deseo que tenga desayuno incluido"
    - "Cancelación gratuita"
    - "No quiero self-check in"
    - "Pet friendly"
  - Desplegable "Que cuente con amenities": Spa, Gimnasio, Piscina, Estacionamiento, Wifi, Cocina

  **5.3 Comidas:**
  - Botones de importancia: Muy importante | Importante | Normal | Poco importante | No importa
  - Checkboxes opcionales:
    - "Priorizo probar la comida local"
    - "Comer en restaurantes"
    - "Comida de paso (street food)"
    - "Comprar en supermercado"
    - "Comida rápida"
  - Desplegable "Restricciones alimentarias": Ninguna, Vegetariano, Vegano, Celíaco, Diabético, Kosher, Halal, Sin Lactosa
  - Input de texto "Otra restricción alimentaria": placeholder "Especificar..."

  **5.4 Actividades:**
  - Botones de importancia: Muy importante | Importante | Normal | Poco importante | No importa
  - Checkboxes opcionales:
    - "Me interesa realizar sólo actividades gratuitas"
    - "Actividades nocturnas"
    - "Excursiones culturales"
    - "Deportes al aire libre"
  - Desplegable "Evitar": Seleccionar actividades a evitar

  ---

  **Sección 6: Acompañantes**
  - **¿Cuántas personas son?** Contador con botones [-] número [+] (campo obligatorio *)
  - **Rango de Edades:** Inputs "18 a 65 años"
  - **¿Con quién viajás?** Botones con íconos: Familia | Amigos | Pareja | Solo (campo obligatorio *)
  - **Textarea opcional:** "¿Hay algo que debamos tener en cuenta sobre alguno de los viajeros?"
    - Placeholder: "Algún viajero con movilidad reducida, alergias o limitaciones, etc."

  ---

  **Sección 7: Intereses**
  - Título: "¿Cuáles son tus mayores intereses y preferencias?" (campo obligatorio *)
  - **8 sliders del 1 al 10:**
    - Historia (slider + valor numérico)
    - Arte & Cultura
    - Naturaleza
    - Entretenimiento
    - Deporte
    - Gastronomía
    - Shopping
    - Aventura
  - Cada slider tiene desplegable "Algo que deseo comentar"

  ---

  **Sección 8: Adicionales**
  - Título: "¿Hay algo más que quieras que sepamos?"
  - Subtítulo: "Menciona lo que quieras del itinerario personalizar aún más tu viaje"
  - *Textarea con ejemplos en placeholder:*
    - "Ej: Voy de luna de miel, es un viaje familiar por los 80 de una abuela, me gusta tener tiempo libre para no hacer nada, quiero tener un ritmo de viaje tranquilo o más bien rápido, lugares que quieras evitar, X día tenemos un cumpleaños y queremos festejarlo comiendo en un restaurante por la noche..."

  ---

  **Botón final:**
  - "✓ Generar Itinerario" (botón azul centrado)

---

- **Funcionalidad esperada:**
  - Validación de campos obligatorios (*) antes de enviar
  - Autocomplete con imágenes para destinos (API de lugares)
  - Calendario interactivo con selección de rango
  - Sliders arrastrables con valor numérico visible
  - Indicador de progreso "✓ Completado" por sección
  - Al hacer click en "Generar Itinerario" → Envía datos a la IA → Redirige a pantalla de resultados

- **Datos requeridos (Supabase):**
  - Tabla viajes: toda la info del formulario en formato JSON o columnas separadas
  - Tabla preferencias_usuario: para guardar preferencias recurrentes del usuario
  - Relación con tabla users para viajes guardados

- **Notas para desarrollo:**
  - El formulario es largo → considerar auto-guardado (draft)
  - Mobile: cada sección podría ser un step/wizard en vez de scroll
  - Los desplegables de "Evitar" en Actividades tienen subcategorías anidadas


### Pantalla de Transición: Loading
- **URL:** https://aimap-journey.vercel.app/itinerario/trip-[ID]
- **Descripción:** Pantalla de carga mientras la IA genera el itinerario.
- *Elementos:*
  - Logo AIMAP centrado (ícono avión/pin)
  - Texto: "Generando tu itinerario..."
  - Subtexto: "Optimizando rutas y experiencias"
- **Futuro:** Animación del avión girando alrededor del pin

---
### Pantalla 3: Resultados / Itinerario
- **URL:** https://aimap-journey.vercel.app/itinerario/trip-[ID]
- **Descripción:** Muestra el itinerario completo generado por IA basado en las preferencias del usuario. Incluye recomendaciones de afiliados para pasajes, alojamiento, restaurantes y actividades. Totalmente editable y personalizable.

- **Elementos clave:**

  **Header/Navegación (persistente):**
  - Logo "AIMAP" (lado izquierdo)
  - Menú: "Somos AIMAP" | "Dashboard" | "Admin User" | "Salir"

  ---

  **Header del itinerario:**
  - Título: "[Destino], [País]" (ej: "Tokyo, Japón")
  - Subtítulo: "[X] días, desde el [fecha inicio] hasta el [fecha fin] • $[min] - $[max] USD"
  - Botón "⬇ Descargar PDF" (naranja, esquina superior derecha)

  **Sección "Inspiración del viaje":**
  - Galería horizontal de 6 imágenes del destino
  - Imágenes representativas de la ciudad/experiencias

  ---

  **Título de sección:** "Itinerario día por día"

  **Estructura por día:**
  
  Cada día tiene un badge circular con número + "Día [X]"

  **Tipos de eventos/cards:**

  **1. Pasaje de ida/regreso (✈️):**
  - Hora + "Pasaje de ida" / "Vuelo de regreso"
  - Ubicación: "📍 [Ciudad]" / "📍 Aeropuerto"
  - Card expandible con 3 opciones de aerolíneas:
    - Logo aerolínea (IBERIA, LATAM, etc.)
    - Hora de despegue y aterrizaje
    - Tipo: "Vuelo directo"
    - Equipaje: "Sólo equipaje de mano"
    - Precio: "$500 USD"
    - Botón "Seleccionar" (o check verde ✓ si ya seleccionado)
  - Input: "Introducir URL de opción propia" + botón [+]

  **2. Check-in/Check-out hotel (🏠):**
  - Hora + "Check-in hotel" / "Check-out"
  - Ubicación: "📍 Centro histórico" / "📍 Hotel"
  - Card expandible con 3 opciones de alojamiento:
    - Imagen del hotel
    - Categoría: "Hotel ★★★★★" / "Hotel ★★★★" / "Hotel ★★★"
    - Nombre: "Boutique Hotel Centro"
    - Tipo habitación: "Suite con vista" / "Habitación doble"
    - Precio: "$280 USD/noche" / "$150 USD/noche" / "$85 USD/noche"
    - Botón "Seleccionar ↗"
  - Input: "O agrega tu propia opción" + botón [+]

  **3. Comidas - Almuerzo/Cena (🍴):**
  - Hora + "Almuerzo local" / "Cena" / "Desayuno"
  - Ubicación: "📍 Restaurante típico" / "📍 Zona gastronómica" / "📍 Hotel"
  - Botón [X] para eliminar
  - Card expandible con texto: "Aquí tienes algunas recomendaciones. Puedes agregar tu propia opción sin descartar estas sugerencias."
  - 3 opciones de restaurantes:
    - Imagen del lugar
    - Nombre: "Restaurante Gourmet"
    - Tipo cocina: "Cocina de autor"
    - Rating: ★ 4.8 + Rango precio: $$$$
    - Precio: "$85 USD/persona"
    - Botón "Reservar ↗"
  - Input: "O agrega tu propia opción" + placeholder "Escribe aquí tu plan personalizado..." + botón [+]

  **4. Tour/Actividades (📍/🎒):**
  - Hora + "Tour ciudad" / "Actividad aventura" / "Museo y cultura"
  - Ubicación: "📍 Puntos turísticos" / "📍 Parque" / "📍 Centro cultural"
  - Botón [X] para eliminar
  - Card expandible con texto: "Selecciona una de nuestras recomendaciones o agrega tu propia opción"
  - 3 opciones de tours (afiliado Civitatis):
    - Imagen/placeholder
    - Nombre: "Tour Premium" / "Tour Grupal" / "Tour Libre"
    - Descripción: "Guía privado + transporte" / "Grupo pequeño" / "Auto-guiado"
    - Duración: "4 horas" / "3 horas" / "2 horas"
    - Precio: "$120 USD/persona" / "$65 USD/persona" / "$25 USD/persona"
    - Botón "Civitatis ↗"
  - Input: "O agrega tu propia opción" + botón [+]

  **5. Actividad personalizada (📍):**
  - Hora + "[Nombre personalizado]" (ej: "Tiempo Libre")
  - Subtítulo: "📍 Actividad personalizada"
  - Botón [X] para eliminar

  ---

  **Indicadores de tiempo entre actividades:**
  - Ícono de caminata/transporte (🚶/🚌)
  - Texto: "5 minutos" / "15 minutos" / "20 minutos" / "30 minutos"
  - Colapsable con flecha (˅)

  **Botón "+ Agregar actividad":**
  - Aparece entre eventos
  - Al hacer click: Input de texto + botones "Guardar" | "Cancelar"

  ---

  **Sección "Eventos especiales para este día" (al final de cada día):**
  - Card con fondo amarillo/dorado claro
  - Ícono 🎫 + Título: "Eventos especiales para este día"
  - Subtítulo: "Basado en tus intereses, encontramos estos eventos disponibles"
  - 2 cards de eventos lado a lado:
    - Ícono (🎵 música / 🎨 arte / 🎾 deporte)
    - Nombre: "Concierto de Jazz en vivo" / "Exposición de Arte Contemporáneo"
    - Fecha/hora: "📅 Hoy, 21:00 - 23:30"
    - Ubicación: "📍 Blue Note Club" / "📍 Museo de Arte Moderno"
    - Precio: "$45 USD" / "$25 USD"
    - Botón "Ver entradas ↗"
  - Ejemplos de eventos: Torneo de Tenis ($60 USD), Festival de Música Electrónica ($80 USD), Feria de Fotografía ($15 USD), Recital de Piano Clásico ($55 USD)

  ---

  *Botones de acción (footer sticky o al final):*
  - Botón izquierdo: Ícono (compartir/guardar)
  - Botón centro (outline): "✏️ Editar formulario" → vuelve al formulario para modificar respuestas
  - Botón principal (naranja): "⬇ Confirmar y descargar"
    - Si no está logueado → Pop up "Inicia sesión" o "Registrate"

  ---

  *Card de costo total (al final):*
  - Título: "Costo total estimado"
  - Monto destacado: "$1890 USD"
  - Disclaimer: "* Las comidas y actividades son costos aproximados variables"

  ---

  **Toast de confirmación:**
  - Aparece al agregar actividad: "● Actividad agregada" (verde, esquina inferior derecha)

---

- **Funcionalidad esperada:**
  - Itinerario completamente editable (agregar, eliminar, reordenar)
  - Cards expandibles para ver opciones de afiliados
  - Selección de opción preferida con check visual ✓
  - Input para agregar URL propia (pasajes, hoteles) o texto libre (actividades)
  - Eventos especiales basados en intereses del usuario + fechas del viaje
  - Cálculo automático del costo total estimado
  - Descarga PDF del itinerario completo
  - Requiere login para guardar/descargar

- **Monetización (Programa de afiliados):**
  - Pasajes: links a aerolíneas/Skyscanner/Kiwi
  - Alojamiento: links a Booking/Expedia/Airbnb
  - Restaurantes: links a reservas (TheFork, Google Maps)
  - Tours/Actividades: links a Civitatis/GetYourGuide/Viator
  - Eventos: links a ticketeras locales

- **Filosofía de negocio (importante para IA):**
  - La prioridad NO es maximizar comisión, sino dar el mejor match con preferencias del usuario
  - Siempre mostrar opciones en diferentes rangos de precio
  - Permitir que el usuario use sus propias opciones sin fricción
  - Si el usuario no encuentra valor en las recomendaciones, abandonará el itinerario

- **Datos requeridos (Supabase + APIs):**
  - Tabla itinerarios: almacena el itinerario completo en JSON
  - APIs de vuelos: Skyscanner, Kiwi, Amadeus
  - APIs de hoteles: Booking, Expedia
  - APIs de restaurantes: Google Places, Yelp, TheFork
  - APIs de actividades: Civitatis, GetYourGuide, Viator
  - APIs de eventos: Ticketmaster, Eventbrite, APIs locales

- **Mejoras detectadas vs prototipo:**
  - Las imágenes de tours muestran "[Opción 1]" placeholder → necesitan imágenes reales
  - Falta indicador de "cargando" al expandir cards de afiliados
  - Considerar mapa interactivo con los puntos del día
  - Agregar opción de compartir itinerario (WhatsApp, email)

### Pantalla 4: Dashboard / Perfil del User
- **URL:** https://aimap-journey.vercel.app/dashboard
- **Descripción:** Panel principal del usuario autenticado. Muestra un resumen de su actividad, estadísticas de viajes y acceso rápido a sus itinerarios guardados.

- **Elementos clave:**
  
  **Header/Navegación:**
  - Logo "AIMAP" (lado izquierdo)
  - Menú: "Somos AIMAP" | "Dashboard" | "Admin User" (usuario logueado)
  - Botón "Salir" (logout)
  
  **Sección de bienvenida:**
  - Saludo personalizado: "Hola, [Nombre Usuario] 👋"
  - Subtítulo motivacional: "Comenzá a planificar tu próxima aventura"
  
  **Tarjetas de estadísticas (3 cards en fila):**
  - Card 1: "Viajes realizados" → Número (ej: 1) + ícono ubicación amarillo
  - Card 2: "Destinos únicos" → Número (ej: 1) + ícono globo verde
  - Card 3: "Próximo viaje" → Estado (ej: "En planeación") + ícono avión amarillo
  
  **Botones de acción principales:**
  - Botón primario (azul, sólido): "+ Crear nuevo viaje"
  - Botón secundario (outline): "Explorá nuevos destinos"
  
  **Sección "Mis Itinerarios":**
  - Título de sección: "Mis Itinerarios"
  - Cards de itinerarios guardados con:
    - Imagen del destino
    - Botón "X" para eliminar (esquina superior derecha)
    - Nombre del viaje (ej: "Ikk")
    - Badge de estado: "Completado" (pill celeste)
    - Duración: ícono calendario + "1 días"
    - Presupuesto: ícono dólar + rango (ej: "$NaN - $1111 USD")
    - Fecha de creación: "Creado el 1/2/2026"

- **Funcionalidad esperada:**
  - Mostrar estadísticas dinámicas del usuario (viajes, destinos, próximo viaje)
  - Click en "+ Crear nuevo viaje" → Redirige al formulario de preferencias
  - Click en "Explorá nuevos destinos" → Redirige a sección de exploración/inspiración
  - Click en card de itinerario → Abre detalle del itinerario
  - Click en "X" de card → Elimina el itinerario (con confirmación)
  - Botón "Salir" → Cierra sesión y redirige a Home

- **Datos requeridos (Backend/Supabase):**
  - Tabla users: nombre, email, fecha_registro
  - Tabla itinerarios: id, user_id, nombre, destino, duración_días, presupuesto_min, presupuesto_max, estado (completado/en_planeación/borrador), fecha_creación, imagen_destino
  - Queries: COUNT viajes por usuario, COUNT destinos únicos, próximo viaje pendiente

- **Bugs/Mejoras detectadas en prototipo:**
  - El presupuesto muestra "$NaN" → Validar que siempre haya valor numérico
  - Considerar agregar filtros (por estado, fecha, destino)
  - Agregar paginación si hay muchos itinerarios

### Pantalla 5: Explorar Destinos
- **URL:** https://aimap-journey.vercel.app/explore
- **Descripción:** Página de descubrimiento e inspiración donde el usuario puede buscar destinos, explorar regiones del mundo y ver ofertas de vuelos. Funciona como el motor de crecimiento del negocio: muestra itinerarios pre-armados basados en data histórica de usuarios, permitiendo escalar contenido con costo $0 y monetizar vía afiliados.

- **Elementos clave:**

  **Header/Navegación (persistente):**
  - Logo "AIMAP" (lado izquierdo)
  - Menú: "Somos AIMAP" | "Dashboard" | "Admin User"
  - Botón "Salir" (logout)

  **Barra de búsqueda principal:**
  - Contenedor con fondo degradado azul/celeste
  - 4 campos: Input "Busca destinos" | Selector "Cualquier lugar" | Selector fecha (mes) | Selector "1 Adulto"

  **Sección "Buscá en todo el mundo":**
  - Carrusel de 4 cards de continentes: América del Sur, Europa, América del Norte, Asia
  - Cards con imagen de fondo y texto blanco superpuesto
  - Flechas de navegación (< >)

  **Sección "Los vuelos más baratos":**
  - Subtítulo: "Encontramos las tarifas más bajas para tus fechas."
  - Botón "Mostrar todo"
  - 4 cards de vuelos nacionales: Buenos Aires ($172.676), Neuquén ($235.660), Córdoba ($272.552), Tucumán ($345.928)
  - Info por card: destino, tipo (ida y vuelta), escalas, duración, precio

  **Sección "Buscá cualquier lugar en [mes]":**
  - Tabs de filtro: "Un mundo más barato" (activo) | "Vuelos directos" | "Sugerencias para vos" | "Destinos interesantes" | "Playa" | "Arte y cultura"
  - Grid 3x2 de destinos internacionales: España ($156.789), Francia ($189.345), Emiratos Árabes ($234.567), Estados Unidos ($198.234), Italia ($145.678), Japón ($267.890)
  - Botón "Ver más destinos" al final

- **Funcionalidad esperada:**
  - Búsqueda con autocomplete de destinos
  - Filtros por fecha, viajeros y ubicación
  - Click en región → Filtra destinos por continente
  - Click en card de vuelo → Redirige a afiliado con búsqueda pre-cargada
  - Tabs actualizan el grid de destinos dinámicamente
  - "Sugerencias para vos" usa ML para matchear perfil del usuario con itinerarios exitosos previos

- **Lógica de negocio (importante para desarrollo):**
  - Los itinerarios pre-armados se generan con data de usuarios anteriores (costo $0)
  - Priorizamos destinos donde ya tenemos itinerarios listos
  - Cada click en vuelo/destino genera comisión de afiliado
  - Trackeamos: vistas, clicks, conversiones por destino/template

- **Datos requeridos (Supabase):**
  - Tabla itinerarios_template: itinerarios pre-armados con métricas de conversión
  - Tabla tendencias_destinos: tracking de popularidad por destino/mes
  - Tabla usuario_destino_match: scores de match usuario-destino para recomendaciones
  - APIs externas: Skyscanner/Kiwi para precios en tiempo real

- **Monetización:**
  - Links de afiliados en cada card de vuelo y destino
  - Prioridad de display basada en comisión del afiliado

- **Mejoras vs prototipo actual:**
  - Agregar sección "Itinerarios recomendados para vos"
  - Mostrar social proof ("X personas viajaron aquí")
  - Indicador visual de "Itinerario listo" vs "Personalizable"

---

## 🎨 Estilo Visual

### Colores principales:
- **Primario:** Azul oscuro (#1E3A5F aprox) - Header, títulos, textos principales
- **Secundario:** Celeste/Turquesa (#0EA5E9 aprox) - Acentos, links, bordes activos
- **CTA Principal:** Naranja (#F97316 aprox) - Botones de acción principal ("Creá tu viaje", "Generar itinerario", "Descargar PDF")
- **CTA Secundario:** Azul sólido (#3B82F6 aprox) - Botones secundarios ("Explorar", "Seleccionar")
- **Fondo:** Blanco (#FFFFFF) y Gris muy claro (#F8FAFC) para cards
- **Éxito/Confirmación:** Verde (#22C55E) - Checks, badges "Completado"
- **Alerta/Destacado:** Amarillo/Dorado (#FEF3C7 fondo, #F59E0B texto) - Sección eventos especiales
- **Texto principal:** Gris oscuro (#1F2937)
- **Texto secundario:** Gris medio (#6B7280)

### Tipografía:
- **Familia:** Sans-serif moderna (probablemente Inter, Poppins o similar)
- **Títulos grandes:** Bold, 32-48px (ej: "Comenzá a planificar tu nuevo viaje")
- **Títulos de sección:** Semibold, 20-24px (ej: "Itinerario día por día")
- **Subtítulos:** Regular, 14-16px, color gris
- **Cuerpo:** Regular, 14-16px
- **Labels/pequeño:** Medium, 12-14px

### Estilo de componentes:

**Cards:**
- Fondo blanco
- Bordes redondeados (8-12px radius)
- Sombra sutil (shadow-sm)
- Padding interno generoso (16-24px)

**Botones:**
- Primarios: Fondo naranja, texto blanco, bordes redondeados (full radius en algunos)
- Secundarios: Fondo azul o outline azul, texto blanco/azul
- Hover: Ligero oscurecimiento

**Inputs:**
- Borde gris claro
- Border radius 8px
- Focus: borde celeste/azul
- Placeholder en gris claro

**Pills/Badges:**
- Bordes redondeados completos (full radius)
- Estados: activo (fondo azul, texto blanco) / inactivo (fondo transparente, texto gris)

**Íconos:**
- Estilo línea (outline) mayormente
- Algunos sólidos para estados activos
- Colores consistentes con la paleta

---

## ✅ Lo que nos gusta del prototipo

- **Flujo intuitivo:** Home → Formulario → Itinerario es claro y sin fricciones
- **Video de fondo en Home:** Transmite calma vs el estrés de planificar viajes
- **Formulario completo pero no abrumador:** Las secciones colapsables ayudan
- **Indicadores de progreso:** El "✓ Completado" por sección da feedback al usuario
- **Timeline del itinerario:** Muy visual con íconos, horarios y tiempos de traslado
- **Flexibilidad:** Usuario puede agregar sus propias opciones (no forzamos afiliados)
- **Eventos especiales:** Diferenciador clave que agrega valor real
- **Múltiples rangos de precio:** Siempre 3 opciones para cada recomendación
- **Galería de inspiración:** Las fotos del destino generan emoción
- **Costo total estimado:** Transparencia con el usuario

---

## ❌ Lo que queremos cambiar/mejorar

- **Imágenes placeholder:** Los tours muestran "[Opción 1]" - necesitan imágenes reales
- **Mapa interactivo:** Falta visualización geográfica de los puntos del día
- **Loading states:** Agregar skeletons mientras cargan las opciones de afiliados
- **Compartir itinerario:** No hay botón claro de compartir (WhatsApp, email, link)
- **Modo offline:** Considerar PWA para acceso sin conexión durante el viaje
- **Notificaciones:** Alertas de cambios de precio en vuelos/hoteles guardados
- **Comparador:** Permitir comparar 2 hoteles o 2 vuelos lado a lado
- **Reviews integrados:** Mostrar reviews de TripAdvisor/Google dentro de la card
- **Filtros en Explorar:** Los tabs son buenos pero faltan filtros avanzados (precio, fechas)
- **Onboarding:** Para nuevos usuarios, un mini-tutorial de cómo funciona
- **Multi-idioma:** Preparar estructura para inglés/portugués

---

## 🎯 Flujo de usuario principal (Happy Path)

### Usuario nuevo (sin cuenta):
1. Llega a **Home** (desde Google, redes sociales, referido)
2. Ve el video de fondo y lee la propuesta de valor
3. Click en **"Creá tu viaje"** (sin necesidad de registro)
4. Completa el **formulario de preferencias** (5-10 min)
5. Ve pantalla de **carga** ("Generando tu itinerario...")
6. Recibe **itinerario personalizado** con recomendaciones
7. Explora opciones, selecciona preferidas, agrega las propias
8. Click en **"Confirmar y descargar"**
9. **Pop-up de registro** → Se registra con Google/Email
10. **Descarga PDF** y guarda itinerario en su dashboard
11. Durante los días previos al viaje, **recibe emails** con tips y recordatorios
12. **Reserva** vuelos/hoteles/actividades via links de afiliados

### Usuario existente (con cuenta):
1. Llega a **Home** → Click en **"Dashboard"**
2. Ve sus **viajes guardados** y estadísticas
3. Click en **"+ Crear nuevo viaje"** o edita uno existente
4. Completa formulario → Genera itinerario → Guarda/Descarga
5. También puede ir a **"Explorar"** para ver destinos trending e itinerarios pre-armados

---

## 💰 Modelo de monetización

### Fuentes de ingreso principales:

| Canal | Afiliado potencial | Comisión estimada |
|-------|-------------------|-------------------|
| **Vuelos** | Skyscanner, Kiwi, Despegar | 0.5-2% del booking |
| **Hoteles** | Booking, Expedia, Hotels.com | 4-6% del booking |
| **Actividades/Tours** | Civitatis, GetYourGuide, Viator | 8-12% del booking |
| **Seguros de viaje** | Assist Card, SafetyWing | 15-25% de la póliza |
| **Alquiler de autos** | RentalCars, Kayak | 4-8% del booking |
| **Restaurantes** | TheFork, OpenTable | $1-2 por reserva |
| **Eventos** | Ticketmaster, Eventbrite | 5-10% del ticket |

### Fuentes secundarias (futuro):
- **Suscripción Premium:** Itinerarios ilimitados, sin ads, features exclusivos
- **B2B para agencias:** Acceso a templates de itinerarios
- **Contenido patrocinado:** Destinos destacados por oficinas de turismo
- **Data insights:** Tendencias de viaje anonimizadas para empresas del sector

---

## 📝 Notas adicionales

### Target principal:
- **Demografía:** Millennials y Gen Z argentinos/latinoamericanos, 25-45 años
- **Perfil:** Viajeros que planifican solos, quieren optimizar tiempo y presupuesto
- **Pain point:** El estrés y tiempo que consume armar un viaje desde cero
- **Motivación:** Descubrir experiencias únicas que no encontrarían solos

### Idioma inicial:
- Español (Argentina) como base
- Preparar para inglés y portugués en siguientes fases

### Dispositivo prioritario:
- **Mobile-first:** La mayoría planificará desde el celular
- Desktop optimizado para formularios largos y visualización del itinerario

### Integraciones técnicas clave:
- **Auth:** Supabase Auth (Google, Email)
- **IA:** OpenAI / Anthropic API para generación de itinerarios
- **Lugares:** Google Places API para autocomplete y datos de lugares
- **Vuelos:** Skyscanner/Kiwi API para precios en tiempo real
- **Mapas:** Google Maps / Mapbox para visualización
- **Pagos:** No procesamos pagos (solo redirigimos a afiliados)
- **Analytics:** Mixpanel/Amplitude para tracking de conversiones

### Métricas clave a trackear:
- **Conversión funnel:** Home → Formulario → Itinerario → Descarga → Booking
- **Engagement:** Tiempo en itinerario, cantidad de ediciones
- **Revenue:** Clicks en afiliados, bookings atribuidos, comisiones generadas
- **Retención:** Usuarios que vuelven a crear segundo viaje
- **NPS:** Satisfacción post-viaje

---

## 📐 Estructura de archivos sugerida (Next.js)

```
/app
  /page.tsx                    # Home
  /explore/page.tsx            # Explorar destinos
  /trip-form/page.tsx          # Formulario
  /itinerario/[id]/page.tsx    # Itinerario generado
  /dashboard/page.tsx          # Dashboard usuario
  /auth/page.tsx               # Login/Registro

/components
  /ui                          # Componentes base (Button, Card, Input, etc.)
  /home                        # Hero, HowItWorks, Stats
  /form                        # FormSteps, DatePicker, Sliders, etc.
  /itinerary                   # DayCard, EventCard, AffiliateCard, etc.
  /explore                     # SearchBar, DestinationCard, Filters
  /dashboard                   # TripCard, Stats, etc.

/lib
  /supabase.ts                 # Cliente Supabase
  /ai.ts                       # Llamadas a OpenAI/Anthropic
  /affiliates.ts               # APIs de afiliados
  /utils.ts                    # Helpers

/types
  /index.ts                    # TypeScript types
  ```