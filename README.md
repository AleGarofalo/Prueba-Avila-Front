# ✈️ Flight Reservation Form

Formulario multistep para simular la reserva de un vuelo, desarrollado como prueba técnica. Permite ingresar información de viaje, datos de los viajeros, servicios adicionales y confirmar la reserva.

## 🛠️ Tecnologías utilizadas

- [Next.js 14 App Router](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) para validaciones de formularios
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/) para alertas visuales
- TypeScript

## 📁 Estructura del proyecto

/src
/components → Componentes reutilizables (inputs, switches, select, etc)
/modules
/step1 → Formulario de información del viaje
/step2 → Formulario de datos de los viajeros
/step3 → Selección de servicios adicionales
/step4 → Resumen y confirmación
/schemas → Validaciones con Zod para cada paso
/types → Tipado global

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio eejcutando en la terminal:

git clone https://github.com/tuusuario/nombre-proyecto.git
cd nombre-proyecto

Instala las dependencias con:
npm install

Inicia el servidor de desarrollo ejecutando en la terminal:
npm run dev

La app estará disponible en http://localhost:3000

```

```
