# Anime App

Una aplicación web de anime construida con Next.js y TypeScript que permite a los usuarios explorar y descubrir animes. La aplicación incluye funcionalidades para listar animes, ver detalles, agregar a favoritos y mostra modales informativos. Además, se han implementado pruebas unitarias para asegurar la calidad del código.

## Descripción del Proyecto

**Anime App** es una aplicación moderna diseñada para ofrecer una experiencia interactiva y fluida a los aficionados del anime. La aplicación está estructurada en componentes reutilizables que facilitan la escalabilidad y el mantenimiento. Entre sus principales características se destacan:

- **Listado de Animes:** Visualiza una colección de animes con información básica.
- **Detalle de Animes:** Permite acceder a información detallada de cada anime, incluyendo sinopsis y datos relevantes.
- **Favoritos:** Opción para marcar animes como favoritos y acceder rápidamente a ellos.
- **Componentes UI:** Implementación de componentes como Alert, Card, Modal, Nav y Spinner que mejoran la experiencia de usuario.
- **Pruebas Automatizadas:** Integración de Jest para asegurar la estabilidad y calidad del código.

## Instrucciones de Ejecución

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nombre-del-proyecto

2. **Instalar dependencias:**

    npm install

3. **Ejecutar el servidor de desarrollo:**
    Inicia la aplicación en modo desarrollo:

    npm run dev

    Abre http://localhost:3000 en tu navegador para ver la aplicación en funcionamiento.

3. **Ejecutar pruebas:**

    npm test -- --watchAll

## Tecnologías Utilizadas

El proyecto está construido utilizando las siguientes tecnologías:

**Next.js:**
Framework basado en React que facilita la creación de aplicaciones web con renderizado del lado del servidor y generación de páginas de forma dinámica.
**React:** 

Biblioteca para construir interfaces de usuario interactivas y modulares.
TypeScript: Superset de JavaScript que añade tipado estático, ayudando a mejorar la calidad y mantenimiento del código.
**CSS Modules:**

 Sistema de módulos CSS que permite el uso de estilos encapsulados para evitar conflictos.
Jest: Framework de pruebas utilizado para realizar tests unitarios y de integración, garantizando la robustez de la aplicación.

## Estructura del Proyecto
El proyecto se organiza de la siguiente manera:

**src/app:** Contiene la estructura principal de la aplicación, incluyendo componentes, páginas, contextos, hooks y modelos.

**src/app/components:** Componentes reutilizables (Alert, Card, Modal, Nav, Spinner) que componen la interfaz de usuario.

**src/app/favorites y src/app/homePage:** Páginas principales de la aplicación, que gestionan las vistas de favoritos y la página de inicio respectivamente.

**src/app/context:** Implementación del contexto global (por ejemplo, ModalContext) para manejar estados compartidos.

**src/app/models:** Definición de tipos y estructuras de datos relacionadas con animes, que facilitan la integración con APIs o la gestión de datos internos.

**Tests:** Pruebas unitarias organizadas en subdirectorios dentro de cada componente o página para asegurar el correcto funcionamiento de la aplicación.



