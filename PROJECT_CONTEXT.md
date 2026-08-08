# DataPraxys Exchange --- Project Context

## 1. Propósito del documento

Este documento es la referencia funcional y arquitectónica del frontend
de **DataPraxys Exchange**.

El objetivo es que cualquier desarrollo futuro sobre este proyecto
respete:

- El propósito del producto.
- Los roles y módulos existentes.
- La arquitectura frontend.
- La separación entre UI, estado, autenticación, servicios y API.
- La estructura de routing utilizada por TanStack Start.
- La preparación necesaria para conectar posteriormente el backend
  mediante API REST.

**Importante:** actualmente la aplicación funciona con datos mock. No se
debe asumir que los mocks representan la implementación definitiva del
backend. La arquitectura debe permitir reemplazarlos progresivamente por
servicios reales sin rehacer las páginas ni los componentes.

Este documento **no define el sistema de diseño visual**. Los colores,
tipografías, spacing y estilos visuales deben mantenerse fuera de este
contexto arquitectónico.

---

# 2. Contexto del producto

**DataPraxys Exchange** es un portal B2B para el intercambio seguro de
archivos entre **DataPraxys** y sus empresas clientes.

El sistema permite centralizar el envío, recepción, consulta y
seguimiento de archivos entre una empresa administradora y diferentes
empresas cliente.

El portal no es un sistema de chat.

Su propósito principal es:

- Gestionar empresas cliente.
- Intercambiar archivos.
- Registrar las operaciones realizadas.
- Notificar eventos relevantes.
- Permitir a cada empresa administrar sus propios archivos.
- Mantener trazabilidad mediante auditoría.

La aplicación frontend consume o consumirá una **API REST externa**
encargada de la lógica de negocio y persistencia.

---

# 3. Estado actual del proyecto

Actualmente:

- El frontend ya fue creado inicialmente con Lovable.
- El proyecto fue subido a GitHub y posteriormente clonado/localizado
  en una máquina de desarrollo.
- La aplicación actualmente funciona correctamente.
- Las pantallas existentes utilizan mocks.
- Todavía no se han integrado los endpoints reales del backend.
- La autenticación real todavía no está implementada.
- El objetivo inmediato es mantener la interfaz funcional mientras se
  prepara correctamente la arquitectura para conectar la API.

No se debe realizar una migración innecesaria de framework.

El proyecto utiliza **TanStack Start** y debe respetarse su sistema de
routing.

---

# 4. Stack tecnológico

## Framework

- TanStack Start
- React
- TypeScript
- Vite

## Routing

- TanStack Router
- File-based routing

## UI

- Componentes React existentes.
- shadcn/ui cuando corresponda.
- Lucide React para iconografía.

## Estado

Utilizar React state/context cuando sea suficiente.

Para datos provenientes del backend, preferir una estrategia de server
state/cache adecuada para TanStack, evitando almacenar innecesariamente
respuestas de API en contextos globales.

---

# 5. TanStack Start --- Routing

Este proyecto utiliza **file-based routing de TanStack Start**.

La carpeta:

```text
src/routes/
```

es la fuente de verdad para las rutas.

Cada archivo `.tsx` dentro de `src/routes` puede representar una ruta.

### Convenciones importantes

```text
index.tsx
→ /

about.tsx
→ /about

users/index.tsx
→ /users

users/$id.tsx
→ /users/:id

posts/{-$category}.tsx
→ /posts/:category?

files/$.tsx
→ /files/*
```

### Layouts

```text
_layout.tsx
```

representa un layout de ruta y utiliza:

```tsx
<Outlet />
```

para renderizar las rutas hijas.

```text
__root.tsx
```

es el root layout de toda la aplicación y envuelve las rutas.

### Regla crítica

`src/routes/routeTree.gen.ts` es generado automáticamente.

**Nunca modificarlo manualmente.**

Tampoco crear convenciones de Next.js o Remix como:

```text
src/pages/
src/routes/_app/index.tsx
app/layout.tsx
```

La arquitectura debe respetar TanStack Start.

---

# 6. Arquitectura funcional

El sistema tiene dos roles principales:

```text
ADMIN
CLIENT
```

## ADMIN

El administrador pertenece a DataPraxys y tiene acceso global al
sistema.

Puede:

- Consultar métricas generales.
- Gestionar empresas.
- Consultar el intercambio de archivos.
- Revisar actividad.
- Consultar auditoría.
- Gestionar configuraciones.
- Revisar archivos o entregas pendientes.
- Consultar notificaciones.

## CLIENT

El cliente representa una empresa que utiliza DataPraxys Exchange.

Puede:

- Consultar información de su empresa.
- Ver archivos recibidos.
- Subir archivos.
- Administrar sus archivos permitidos.
- Consultar su perfil.
- Recibir notificaciones relacionadas con sus operaciones.

El cliente no debe tener acceso a información de otras empresas.

---

# 7. Módulos principales

## 7.1 Administración

Ruta base:

```text
/admin
```

Módulos:

```text
/admin
/admin/empresas
/admin/intercambio
/admin/auditoria
/admin/configuracion
```

### Dashboard

Debe mostrar información agregada como:

- Total de empresas.
- Archivos recibidos.
- Archivos enviados.
- Entregas pendientes.
- Actividad reciente.
- Elementos que requieren revisión.

Los datos actuales pueden provenir de mocks.

Posteriormente deben provenir de endpoints del backend.

---

## 7.2 Empresas

Ruta:

```text
/admin/empresas
```

Permite gestionar empresas cliente.

Información esperada:

- ID.
- Nombre.
- RUC.
- Usuario principal.
- Email.
- Cargo.
- Estado.
- Fechas relevantes.

Operaciones futuras:

- Listar empresas.
- Consultar empresa.
- Crear empresa.
- Actualizar empresa.
- Activar/desactivar empresa.
- Consultar información relacionada.

La UI no debe implementar directamente lógica de persistencia.

---

## 7.3 Intercambio de archivos

Ruta:

```text
/admin/intercambio
```

Permite consultar y auditar los movimientos de archivos del sistema.

Información esperada:

- Archivo.
- Empresa.
- Tipo de operación.
- Estado.
- Usuario.
- Fecha.
- Tamaño.
- Identificador.
- Información de procesamiento.

Operaciones futuras:

- Listar movimientos.
- Filtrar.
- Buscar.
- Consultar detalle.
- Descargar cuando el backend lo permita.

---

## 7.4 Auditoría

Ruta:

```text
/admin/auditoria
```

Registra eventos importantes del sistema.

Información esperada:

- Fecha.
- Usuario.
- Acción.
- Entidad.
- Identificador de entidad.
- Descripción.
- Resultado.
- Información adicional.

La auditoría debe considerarse información proveniente del backend.

---

## 7.5 Configuración

Ruta:

```text
/admin/configuracion
```

Contiene configuraciones relacionadas con el espacio de trabajo y
notificaciones.

No asumir configuraciones específicas que todavía no hayan sido
definidas por backend.

---

# 8. Portal de empresa

Ruta base:

```text
/portal
```

Módulos:

```text
/portal
/portal/mis-archivos
/portal/perfil
```

## Inicio

Debe mostrar información resumida de la empresa y actividad reciente.

Ejemplos:

- Datos de empresa.
- RUC.
- Email.
- Estado.
- Último archivo recibido.
- Último archivo subido.

---

## Mis archivos

Ruta:

```text
/portal/mis-archivos
```

Permite al cliente gestionar archivos relacionados con su empresa.

Debe contemplar:

- Lista de archivos.
- Subida de archivos.
- Estado del archivo.
- Información del archivo actual.
- Reemplazo cuando corresponda.
- Eliminación cuando corresponda.
- Descarga cuando corresponda.

La subida real de archivos dependerá del contrato de la API.

El frontend no debe asumir que el archivo se envía directamente al mismo
endpoint que las demás operaciones. Si el backend utiliza upload
directo, presigned URLs, multipart/form-data u otro mecanismo, deberá
encapsularse dentro del servicio correspondiente.

---

## Perfil

Ruta:

```text
/portal/perfil
```

Permite consultar y eventualmente actualizar información de la cuenta
del usuario/empresa.

---

# 9. Estructura frontend objetivo

La estructura debe evolucionar de forma organizada sin romper la
estructura de TanStack Start.

Una estructura recomendada:

```text
src/
├── components/
│   ├── ui/
│   └── shared/
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── mocks/
│   │
│   ├── admin/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── mocks/
│   │
│   ├── companies/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── mocks/
│   │
│   ├── exchange/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── mocks/
│   │
│   ├── audit/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── mocks/
│   │
│   ├── notifications/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── mocks/
│   │
│   └── client/
│       ├── components/
│       ├── services/
│       ├── types/
│       └── mocks/
│
├── hooks/
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── config.ts
│   │   └── errors.ts
│   └── utils/
│
├── context/
│   └── AuthContext.tsx
│
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── admin/
│   └── portal/
│
├── types/
│
├── constants/
│
└── styles.css
```

La estructura exacta puede adaptarse al proyecto actual, pero debe
mantenerse la separación de responsabilidades.

No mover archivos únicamente por moverlos.

---

# 10. Responsabilidad de cada capa

## Routes

Las rutas deben encargarse principalmente de:

- Resolver la URL.
- Aplicar protección de acceso cuando corresponda.
- Obtener parámetros.
- Componer la página/feature.

No deben contener lógica extensa de negocio ni llamadas HTTP dispersas.

---

## Features

Cada feature representa un dominio funcional.

Ejemplo:

```text
features/companies/
```

contiene todo lo relacionado con empresas.

Esto permite que el código relacionado con una funcionalidad permanezca
agrupado.

---

## Components

### `components/ui`

Componentes reutilizables de bajo nivel.

Ejemplos:

- Button.
- Dialog.
- Input.
- Table.
- Select.
- Badge.

### `components/shared`

Componentes reutilizables entre diferentes features.

Ejemplos:

- PageHeader.
- EmptyState.
- LoadingState.
- ErrorState.
- DataTable genérica.
- ConfirmDialog.

Los componentes específicos de una funcionalidad deben permanecer dentro
de su feature.

---

# 11. Arquitectura de API

El frontend debe estar preparado para consumir una API REST externa.

No realizar llamadas `fetch` directamente desde cada página.

Evitar:

```tsx
useEffect(() => {
  fetch("https://api...");
});
```

dentro de componentes de UI.

En su lugar:

```text
Page
  ↓
Feature Hook / Query
  ↓
Feature Service
  ↓
API Client
  ↓
Backend API
```

Ejemplo:

```text
CompaniesPage
    ↓
useCompanies()
    ↓
companiesService.getCompanies()
    ↓
apiClient.get()
    ↓
GET /companies
```

---

# 12. API Client centralizado

Debe existir un cliente HTTP centralizado.

Responsabilidades:

- Base URL.
- Headers.
- Authorization.
- Serialización.
- Manejo de respuestas.
- Manejo de errores.
- Timeout si corresponde.
- Interceptores si son necesarios.

Conceptualmente:

```ts
apiClient.get<T>();
apiClient.post<T>();
apiClient.put<T>();
apiClient.patch<T>();
apiClient.delete<T>();
```

La implementación concreta puede utilizar `fetch` o una librería HTTP si
el proyecto lo requiere.

No duplicar lógica HTTP en cada service.

---

# 13. Configuración de API

La URL del backend debe venir de variables de entorno.

Ejemplo:

```env
VITE_API_URL=https://api.example.com
```

Nunca hardcodear URLs del backend dentro de componentes.

Ejemplo incorrecto:

```ts
fetch("https://api.datapraxys.com/companies");
```

Ejemplo correcto:

```ts
apiClient.get("/companies");
```

con:

```env
VITE_API_URL=https://api.datapraxys.com
```

---

# 14. Services

Cada dominio debe tener servicios propios.

Ejemplo:

```text
features/companies/services/companies.service.ts
features/exchange/services/exchange.service.ts
features/audit/services/audit.service.ts
features/notifications/services/notifications.service.ts
features/auth/services/auth.service.ts
```

Ejemplo conceptual:

```ts
export const companiesService = {
  getAll: () => apiClient.get<Company[]>("/companies"),

  getById: (id: string) => apiClient.get<Company>(`/companies/${id}`),

  create: (data: CreateCompanyRequest) => apiClient.post<Company>("/companies", data),

  update: (id: string, data: UpdateCompanyRequest) =>
    apiClient.put<Company>(`/companies/${id}`, data),
};
```

Los endpoints mostrados son ejemplos arquitectónicos.

**No asumir que estos endpoints existen en el backend.**

Cuando se conozca el contrato real de la API, actualizar únicamente la
capa correspondiente.

---

# 15. Types, DTOs y modelos

No mezclar automáticamente:

- Modelo de UI.
- DTO de API.
- Request de API.
- Response de API.

Cuando sea necesario, separar:

```text
Company
CompanyResponse
CreateCompanyRequest
UpdateCompanyRequest
```

Si la respuesta del backend tiene una estructura diferente a la que
necesita la UI, utilizar un mapper.

Ejemplo:

```text
API Response
    ↓
Mapper
    ↓
Domain Model
    ↓
UI
```

Esto evita acoplar todas las pantallas al contrato exacto del backend.

---

# 16. Mocks

Los mocks deben permanecer separados de los servicios reales.

Ejemplo:

```text
features/companies/mocks/companies.mock.ts
```

No colocar mocks dentro de componentes.

La UI debe consumir una abstracción que permita cambiar:

```text
Mock Service
```

por:

```text
API Service
```

sin reescribir la pantalla.

Los mocks son exclusivamente para desarrollo mientras el backend no esté
disponible.

---

# 17. Autenticación

La aplicación tendrá autenticación real posteriormente.

Debe existir una abstracción para:

```text
AuthContext
AuthService
Protected routes
Current user
Role
Session/token
```

Roles actuales:

```text
ADMIN
CLIENT
```

En modo desarrollo puede utilizarse autenticación mock.

La arquitectura debe permitir posteriormente:

```text
Mock Auth
     ↓
AuthContext
     ↓
Protected Route
```

y cambiar a:

```text
API Auth
     ↓
AuthContext
     ↓
Protected Route
```

sin modificar todas las páginas.

---

# 18. Autorización

La autorización debe depender del rol y, posteriormente, de las reglas
provenientes del backend.

Ejemplo conceptual:

```text
ADMIN
 ├── /admin/*
 └── acceso global

CLIENT
 ├── /portal/*
 └── acceso limitado a su empresa
```

No confiar únicamente en ocultar botones en frontend.

El backend debe ser la autoridad final para autorización.

El frontend solamente controla navegación y experiencia de usuario.

---

# 19. Estado de datos

Separar:

### UI state

Ejemplos:

- Modal abierto/cerrado.
- Filtro seleccionado.
- Tab activa.
- Sidebar abierto.
- Estado de formulario.

Puede manejarse con React.

### Server state

Ejemplos:

- Empresas.
- Archivos.
- Auditoría.
- Notificaciones.
- Perfil.
- Dashboard.

Debe manejarse con una estrategia de fetching/cache apropiada para
TanStack.

Evitar duplicar innecesariamente datos del backend en múltiples
contextos globales.

---

# 20. Estados de las operaciones

Toda funcionalidad conectada a API debe contemplar:

```text
loading
success
empty
error
```

Para operaciones de escritura:

```text
idle
loading
success
error
```

Ejemplo:

```text
GET /companies

loading
    ↓
success → lista
    ↓
empty → estado vacío

error → estado de error
```

No asumir que siempre habrá datos.

---

# 21. Manejo de errores de API

Centralizar el tratamiento de errores.

El frontend debe poder distinguir conceptualmente:

```text
400 → solicitud inválida
401 → no autenticado
403 → sin permisos
404 → recurso no encontrado
409 → conflicto
422 → validación
500 → error del servidor
```

No mostrar directamente mensajes técnicos del backend al usuario sin
procesarlos.

Mantener una estructura de error común cuando sea posible.

---

# 22. Archivos

Los archivos son una parte central del producto.

El frontend debe abstraer las operaciones relacionadas con archivos.

Ejemplos conceptuales:

```text
listFiles()
getFile()
uploadFile()
replaceFile()
deleteFile()
downloadFile()
```

No asumir todavía cómo funcionará el upload real.

El backend podría utilizar:

- multipart/form-data
- presigned URL
- almacenamiento intermedio
- endpoint específico
- Azure Blob Storage
- otro mecanismo

Cuando se defina el contrato real, esa complejidad debe quedar
encapsulada dentro de `file/exchange services` y no contaminar los
componentes visuales.

---

# 23. Notificaciones

Las notificaciones deben tratarse como un dominio propio.

Modelo conceptual:

```ts
Notification {
  id
  title
  description
  type
  read
  createdAt
}
```

Operaciones futuras:

```text
getNotifications()
markAsRead()
markAllAsRead()
```

La implementación puede cambiar dependiendo de si el backend utiliza
polling, WebSockets, SignalR u otro mecanismo.

No acoplar actualmente la UI a una tecnología específica.

---

# 24. Auditoría

La auditoría debe considerarse información de servidor.

El frontend no debe intentar generar manualmente los registros de
auditoría como fuente oficial.

Por ejemplo:

```text
Usuario sube archivo
        ↓
Backend procesa operación
        ↓
Backend genera audit log
        ↓
Frontend consulta auditoría
```

---

# 25. Reglas de arquitectura

Al modificar el proyecto:

### Sí

- Reutilizar componentes existentes.
- Crear services por dominio.
- Crear tipos específicos.
- Separar mocks.
- Centralizar API.
- Mantener rutas de TanStack Start.
- Mantener TypeScript estricto.
- Mantener componentes pequeños.
- Preparar las interfaces para datos reales.

### No

- No realizar `fetch` directamente desde cualquier componente.
- No hardcodear URLs.
- No modificar `routeTree.gen.ts`.
- No crear `src/pages`.
- No introducir convenciones de Next.js/Remix.
- No mezclar mocks con API real.
- No duplicar modelos innecesariamente.
- No colocar lógica de negocio compleja en componentes visuales.
- No inventar endpoints.
- No asumir contratos del backend que todavía no han sido definidos.

---

# 26. Flujo esperado de integración con backend

Cuando el backend esté listo, el flujo esperado será:

```text
TanStack Route
      ↓
Page / Feature
      ↓
Query / Hook
      ↓
Feature Service
      ↓
API Client
      ↓
REST API
      ↓
Backend
```

Para una operación de escritura:

```text
User action
    ↓
Form / Component
    ↓
Mutation / Hook
    ↓
Feature Service
    ↓
API Client
    ↓
REST API
    ↓
Backend
    ↓
Response
    ↓
Cache invalidation / state update
    ↓
UI
```

La conexión del backend debe poder implementarse principalmente
modificando:

- `API client`
- `services`
- `types/DTOs`
- `mappers`
- `auth service`

y no reescribiendo las páginas completas.

---

# 27. Objetivo arquitectónico

El frontend debe evolucionar desde:

```text
Lovable UI
   ↓
Mocks
```

hacia:

```text
TanStack Start
      ↓
Feature-based frontend
      ↓
Services
      ↓
Central API Client
      ↓
REST Backend
```

Los mocks actuales son temporales.

La arquitectura definitiva debe permitir reemplazar progresivamente cada
mock por su servicio real.

---

# 28. Regla para futuros agentes de IA

Antes de modificar el proyecto:

1.  Leer este `PROJECT_CONTEXT.md`.
2.  Revisar la estructura actual.
3.  No asumir que la estructura propuesta está implementada exactamente
    igual.
4.  Reutilizar lo existente cuando sea correcto.
5.  No migrar de TanStack Start.
6.  No modificar `routeTree.gen.ts`.
7.  Identificar primero qué capa debe modificarse.
8.  Mantener separación entre:
    - Routes
    - Features
    - Components
    - Services
    - API Client
    - Types
    - Mocks
    - Auth
9.  No inventar endpoints.
10. Si falta información del backend, dejar una abstracción preparada y
    continuar con mocks.

El objetivo es que el proyecto pueda conectarse al backend real
posteriormente con cambios controlados y sin rehacer la arquitectura
frontend.
