# CLAUDE.md - Instrucciones para Claude Code

## 🎯 Sobre este proyecto

**Nombre:** AIMAP
**Tipo:** Travel planner con IA - Generador de itinerarios personalizados
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase, OpenAI/Anthropic API

## 📖 Documentación clave

- PROTOTYPE_REFERENCE.md - Documentación completa del prototipo UX con todas las pantallas, flujos, estilos y lógica de negocio. **LEER ANTES DE DESARROLLAR.**

## 🏗️ Estructura del proyecto
```
/app                    → Páginas (App Router)
/components             → Componentes React
/lib                    → Utilidades y clientes (Supabase, AI, etc.)
/types                  → TypeScript types
```

## 🎨 Guía de estilos

- **Colores:** Azul oscuro (#1E3A5F), Naranja CTA (#F97316), Celeste (#0EA5E9)
- **Tipografía:** Sans-serif (Inter o Poppins)
- **Componentes:** Bordes redondeados (8-12px), sombras sutiles
- **Mobile-first:** Siempre diseñar primero para móvil

## 💼 Reglas de negocio importantes

1. **Usuario puede crear itinerario SIN registrarse** - El registro se pide al querer guardar/descargar
2. **Afiliados:** Siempre mostrar 3 opciones en diferentes rangos de precio
3. **Flexibilidad:** Usuario puede agregar sus propias opciones (no forzar afiliados)
4. **Filosofía:** Priorizar match con preferencias del usuario, NO maximizar comisión

## 🔌 Integraciones previstas

- **Auth:** Supabase Auth (Google, Email)
- **Database:** Supabase PostgreSQL
- **IA:** OpenAI/Anthropic para generación de itinerarios
- **APIs externas:** Google Places, Skyscanner/Kiwi, Civitatis

## ✅ Comandos útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run lint         # Linter
```

## 📝 Convenciones de código
Componentes en PascalCase: TripCard.tsx
Hooks personalizados: useTrips.ts
Utilities: formatDate.ts
Types en /types/index.ts
## 🚫 NO hacer
No usar any en TypeScript
No hardcodear textos (preparar para i18n)
No commitear API keys (usar .env.local)
No ignorar errores de ESLint

