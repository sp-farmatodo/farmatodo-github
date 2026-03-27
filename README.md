# Farmatodo - Catálogo de Productos

Proyecto de práctica para el **Curso de GitHub Colaborativo** de Farmatodo.

Este proyecto es un catálogo de productos construido con **Next.js** y **shadcn/ui**, diseñado para aprender a trabajar en equipo usando GitHub.

---

## Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/) – Framework de React
- [shadcn/ui](https://ui.shadcn.com/) – Componentes de UI
- [Tailwind CSS](https://tailwindcss.com/) – Estilos
- [TypeScript](https://www.typescriptlang.org/) – Tipado estático

---

## Cómo correr el proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd farmatodo-github
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página de inicio
│   └── globals.css      # Estilos globales
├── components/
│   ├── ui/              # Componentes de shadcn/ui
│   ├── navbar.tsx       # Barra de navegación
│   ├── product-card.tsx # Tarjeta de producto
│   └── catalog.tsx      # Catálogo con filtros
└── lib/
    ├── data.ts          # Datos de productos
    ├── types.ts         # Tipos de TypeScript
    └── utils.ts         # Utilidades
```

---

## Ejercicios del curso

A continuación, algunas tareas que puedes practicar en equipo:

1. **Agregar un nuevo producto** – Edita `src/lib/data.ts` y agrega un producto nuevo al arreglo.
2. **Cambiar el estilo de un componente** – Modifica los colores o el diseño de `product-card.tsx`.
3. **Agregar una nueva categoría** – Añade una nueva categoría en `types.ts` y `data.ts`.
4. **Crear una nueva página** – Agrega una página `/about` con información del equipo.
5. **Corregir un bug** – Busca un error intencional y corrígelo en una rama separada.

---

## Flujo de trabajo con Git

```bash
# Crear una rama para tu tarea
git checkout -b feature/agregar-producto

# Hacer tus cambios y confirmarlos
git add .
git commit -m "feat: agregar producto vitamina E"

# Subir tu rama
git push origin feature/agregar-producto

# Crear un Pull Request en GitHub
```

---

## Convenciones de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo    | Uso                                   |
|------------|---------------------------------------|
| `feat:`    | Nueva funcionalidad                   |
| `fix:`     | Corrección de errores                 |
| `style:`   | Cambios de estilos (sin lógica)       |
| `docs:`    | Cambios en documentación              |
| `refactor:`| Refactorización de código             |

---

Hecho con para el equipo de Farmatodo.
