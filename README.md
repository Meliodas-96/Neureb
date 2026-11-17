# NEUREB — Atlas neuroanatómico 3D

**Español (idioma predeterminado) | [English](#english)**

NEUREB es un visor web interactivo de un modelo 3D del cerebro, diseñado como recurso visual de aprendizaje de neuroanatomía. Permite explorar estructuras, alternar capas anatómicas, ajustar la transparencia de la corteza y enfocar puntos de interés con información descriptiva y clínica. Se ejecuta en el navegador y renderiza el modelo con WebGL.

> **Aviso:** este proyecto es únicamente educativo e informativo. No es un dispositivo médico, no sustituye la formación profesional ni debe usarse para diagnóstico, tratamiento o planificación quirúrgica. La exactitud y el alcance de las estructuras dependen del modelo 3D incluido.

## Contenido

- [Galería](#galería)
- [Funciones](#funciones)
- [Requisitos e instalación](#requisitos-e-instalación)
- [Comandos disponibles](#comandos-disponibles)
- [Controles del visor](#controles-del-visor)
- [Anatomía representada](#anatomía-representada)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Contribuir](#contribuir)
- [Licencia y atribuciones](#licencia-y-atribuciones)
- [English](#english)

## Galería

### Imágenes

![Vista del modelo cerebral 3D — imagen 1](./Fotos%20Cerebro%203D/media_0.png)

![Vista del modelo cerebral 3D — imagen 2](./Fotos%20Cerebro%203D/media_1.png)

### Video

[Ver o descargar el recorrido 360° del cerebro (MKV)](./Fotos%20Cerebro%203D/Cerebro_Turntable_360.mp40001-0240.mkv)

El video está en formato MKV; según el navegador o la plataforma donde se consulte este README, puede ser necesario descargarlo y abrirlo con un reproductor compatible, por ejemplo VLC.

## Funciones

- Visualización interactiva del modelo 3D incluido en el proyecto.
- Capas para corteza cerebral, cerebelo, tronco encefálico, arterias, venas superficiales y pares craneales/quiasma.
- Control de transparencia de la corteza y modo Rayos X para facilitar la inspección de estructuras internas.
- Ocho puntos de interés seleccionables. Al elegir uno, el visor enfoca la región y muestra información anatómica, funcional, clínica y quirúrgica.
- Vistas predefinidas anterior, posterior, lateral izquierda y derecha, superior, basal e isométrica.
- Rotación automática, modo de visualización de malla (wireframe) y restablecimiento de la vista.
- Captura PNG del lienzo 3D actual. La captura incluye el render del modelo, no los paneles HTML de la interfaz.
- Interacción con cámara para rotar, acercar/alejar y desplazar el modelo.

La interfaz de la aplicación está actualmente en español. Este README está disponible en español e inglés; no hay un selector de idioma en la aplicación.

## Requisitos e instalación

- Node.js y npm compatibles con la versión de Next.js definida en `package.json`.
- Un navegador moderno con WebGL habilitado.
- Espacio disponible para las dependencias de npm y los recursos 3D.

Desde la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Abre la dirección local que indique Next.js en la terminal (normalmente `http://localhost:3000`).

Para una instalación sin `package-lock.json`, utiliza `npm install` en lugar de `npm ci`.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Next.js. |
| `npm run build` | Genera la compilación de producción. |
| `npm run start` | Sirve la compilación de producción; ejecútalo después de `npm run build`. |
| `npm run lint` | Ejecuta el comando de lint configurado en el proyecto. |

El `package.json` no define actualmente un comando de pruebas automatizadas.

## Controles del visor

- **Rotar:** arrastra sobre el modelo.
- **Acercar o alejar:** usa la rueda del ratón o el gesto equivalente del dispositivo.
- **Seleccionar una estructura:** haz clic en un marcador; vuelve a hacer clic o cierra la ficha para quitar la selección.
- **Cambiar capas:** usa el panel **Capas** para mostrar u ocultar estructuras y grupos disponibles.
- **Inspeccionar el interior:** activa **Rayos X** o ajusta el control de opacidad de la corteza.
- **Cambiar orientación:** selecciona uno de los botones de vista en la barra inferior.
- **Cambiar el modo de visualización:** usa los botones de rotación automática y wireframe en la barra superior.
- **Guardar una imagen:** usa el botón de cámara para descargar el lienzo 3D como PNG.
- **Volver al inicio:** usa el botón para restablecer la vista, que también restaura las capas visibles y desactiva los modos visuales.

Los nombres y controles visibles en pantalla se muestran en español.

## Anatomía representada

### Capas

| Grupo | Estructuras incluidas |
| --- | --- |
| Parénquima | Corteza cerebral (telencéfalo), cerebelo y tronco encefálico. |
| Arterias | Arteria cerebral media, arteria cerebral anterior y sistema vertebrobasilar. |
| Venas | Venas corticales superficiales, incluidas las venas de Trolard y Labbé, según la descripción del proyecto. |
| Nervios | Pares craneales y quiasma óptico. |

### Puntos de interés

1. Arteria cerebral media (ACM, segmentos M1/M2).
2. Complejo de la arteria cerebral anterior y comunicante anterior (ACA/ACom).
3. Tronco basilar y confluencia vertebral.
4. Quiasma óptico y estructuras craneales anteriores.
5. Protuberancia (pons).
6. Hemisferio cerebeloso y vermis.
7. Lóbulo temporal y giro parahipocampal.
8. Venas corticales superficiales y drenaje anastomótico.

La información de los marcadores se encuentra en `src/data/hotspots.ts`; las capas y sus categorías también se definen en ese archivo.

## Estructura del proyecto

```text
Neureb/
├── public/
│   └── models/
│       └── cerebro.glb          # Modelo 3D cargado por la aplicación
├── src/
│   ├── app/                      # Página, estilos globales y metadatos
│   ├── components/
│   │   ├── canvas/               # Escena 3D, cámara, modelo y marcadores
│   │   └── ui/                   # Paneles y controles de interfaz
│   ├── data/
│   │   └── hotspots.ts           # Capas, puntos de interés y vistas
│   ├── store/
│   │   └── useBrainStore.ts      # Estado de capas, cámara y modos visuales
│   └── types/
│       └── brain.ts              # Tipos de datos anatómicos
├── Blender/                      # Archivos de trabajo y respaldos de Blender
├── export_3d/                    # Modelos 3D exportados
├── Fotos Cerebro 3D/             # Imágenes y video para esta galería
├── package.json
└── README.md
```

La aplicación carga `public/models/cerebro.glb`. Para sustituirlo por otro modelo, conserva esa ruta o actualiza la ruta de carga en `src/components/canvas/BrainModel.tsx`. Los nombres de los objetos del modelo deben coincidir con los identificadores de capa que espera la aplicación para que los controles de visibilidad y materiales se apliquen correctamente.

## Tecnologías

- [Next.js](https://nextjs.org/) 15 y [React](https://react.dev/) 19.
- [TypeScript](https://www.typescriptlang.org/).
- [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/) y [Drei](https://drei.docs.pmnd.rs/) para la escena 3D.
- [Zustand](https://zustand.docs.pmnd.rs/) para el estado del visor.
- [Tailwind CSS](https://tailwindcss.com/) para estilos y [Lucide](https://lucide.dev/) para iconos.
- Modelo anatómico en formato glTF binario (`.glb`).

## Contribuir

1. Crea una rama para tu cambio.
2. Instala las dependencias con `npm ci`.
3. Ejecuta `npm run dev` para comprobar los cambios en el navegador.
4. Antes de enviar una contribución, ejecuta `npm run lint` y `npm run build`.
5. Para cambios en el modelo, verifica que `public/models/cerebro.glb` se carga y que las capas y los marcadores siguen funcionando.

Incluye en la descripción cualquier cambio anatómico o de comportamiento y evita presentar el visor como herramienta de diagnóstico clínico.

## Licencia y atribuciones

No se ha identificado un archivo de licencia en la información disponible del proyecto. Antes de redistribuir o reutilizar el código, el modelo 3D, las imágenes o el video, confirma que tienes los permisos y las atribuciones correspondientes. Añade aquí la licencia y los créditos cuando estén definidos.

---

<a id="english"></a>

# NEUREB — 3D Neuroanatomy Atlas (English)

[Español](#neureb--atlas-neuroanatómico-3d) | **English**

NEUREB is an interactive web viewer for a 3D brain model, intended as a visual neuroanatomy learning resource. It lets users explore structures, toggle anatomical layers, adjust cortical transparency, and focus on points of interest with descriptive and clinical information. It runs in a browser and renders the model with WebGL.

> **Disclaimer:** this project is for educational and informational use only. It is not a medical device, does not replace professional training, and must not be used for diagnosis, treatment, or surgical planning. The accuracy and scope of the structures depend on the included 3D model.

## Contents

- [Gallery](#gallery)
- [Features](#features)
- [Requirements and installation](#requirements-and-installation)
- [Available commands](#available-commands)
- [Viewer controls](#viewer-controls)
- [Anatomy represented](#anatomy-represented)
- [Project structure](#project-structure)
- [Technology stack](#technology-stack)
- [Contributing](#contributing)
- [License and attribution](#license-and-attribution)

## Gallery

### Images

![3D brain model view — image 1](./Fotos%20Cerebro%203D/media_0.png)

![3D brain model view — image 2](./Fotos%20Cerebro%203D/media_1.png)

### Video

[Watch or download the 360° brain turntable video (MKV)](./Fotos%20Cerebro%203D/Cerebro_Turntable_360.mp40001-0240.mkv)

The video is in MKV format. Depending on the browser or platform displaying this README, you may need to download it and open it in a compatible player such as VLC.

## Features

- Interactive visualization of the 3D model included with the project.
- Layers for the cerebrum, cerebellum, brainstem, arteries, superficial veins, and cranial nerves/optic chiasm.
- Cortical transparency control and an X-ray mode to help inspect internal structures.
- Eight selectable hotspots. Selecting one focuses the viewer on that region and displays anatomical, functional, clinical, and surgical information.
- Preset anterior, posterior, left and right lateral, superior, basal, and isometric views.
- Automatic rotation, wireframe display mode, and view reset.
- PNG capture of the current 3D canvas. The capture includes the model render, not the HTML interface panels.
- Camera interaction to rotate, zoom, and pan around the model.

The application interface is currently in Spanish. This README is available in Spanish and English; the application does not currently have a language selector.

## Requirements and installation

- Node.js and npm compatible with the Next.js version specified in `package.json`.
- A modern browser with WebGL enabled.
- Enough disk space for npm dependencies and 3D assets.

From the project directory:

```bash
npm ci
npm run dev
```

Open the local address printed by Next.js in the terminal (usually `http://localhost:3000`).

If `package-lock.json` is not available, use `npm install` instead of `npm ci`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates the production build. |
| `npm run start` | Serves the production build; run it after `npm run build`. |
| `npm run lint` | Runs the lint command configured by the project. |

There is currently no automated test command defined in `package.json`.

## Viewer controls

- **Rotate:** drag on the model.
- **Zoom:** use the mouse wheel or the equivalent gesture on your device.
- **Select a structure:** click a marker; click it again or close its detail card to clear the selection.
- **Change layers:** use the **Capas** panel to show or hide available structures and groups.
- **Inspect internal structures:** enable **Rayos X** or adjust the cortical opacity slider.
- **Change orientation:** choose a view preset from the bottom bar.
- **Change display mode:** use the automatic rotation and wireframe buttons in the top bar.
- **Save an image:** use the camera button to download the 3D canvas as a PNG.
- **Reset:** use the reset button to restore visible layers and turn off visual modes.

Labels and controls in the application are displayed in Spanish.

## Anatomy represented

### Layers

| Group | Included structures |
| --- | --- |
| Parenchyma | Cerebral cortex (cerebrum), cerebellum, and brainstem. |
| Arteries | Middle cerebral artery, anterior cerebral artery, and vertebrobasilar system. |
| Veins | Superficial cortical veins, including the veins of Trolard and Labbé, as described by the project. |
| Nerves | Cranial nerves and optic chiasm. |

### Points of interest

1. Middle cerebral artery (MCA, M1/M2 segments).
2. Anterior cerebral artery and anterior communicating artery complex (ACA/ACom).
3. Basilar artery and vertebral confluence.
4. Optic chiasm and anterior cranial structures.
5. Pons.
6. Cerebellar hemisphere and vermis.
7. Temporal lobe and parahippocampal gyrus.
8. Superficial cortical veins and anastomotic drainage.

Hotspot information is defined in `src/data/hotspots.ts`; anatomical layers and their categories are also defined there.

## Project structure

```text
Neureb/
├── public/
│   └── models/
│       └── cerebro.glb          # 3D model loaded by the application
├── src/
│   ├── app/                      # Page, global styles, and metadata
│   ├── components/
│   │   ├── canvas/               # 3D scene, camera, model, and markers
│   │   └── ui/                   # Interface panels and controls
│   ├── data/
│   │   └── hotspots.ts           # Layers, hotspots, and camera presets
│   ├── store/
│   │   └── useBrainStore.ts      # Viewer layer, camera, and display state
│   └── types/
│       └── brain.ts              # Anatomy-related data types
├── Blender/                      # Blender work files and backups
├── export_3d/                    # Exported 3D models
├── Fotos Cerebro 3D/             # Gallery images and video
├── package.json
└── README.md
```

The application loads `public/models/cerebro.glb`. To replace it with another model, keep that path or update the loading path in `src/components/canvas/BrainModel.tsx`. Model object names must match the layer identifiers expected by the application for visibility and materials to work correctly.

## Technology stack

- [Next.js](https://nextjs.org/) 15 and [React](https://react.dev/) 19.
- [TypeScript](https://www.typescriptlang.org/).
- [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/), and [Drei](https://drei.docs.pmnd.rs/) for the 3D scene.
- [Zustand](https://zustand.docs.pmnd.rs/) for viewer state.
- [Tailwind CSS](https://tailwindcss.com/) for styling and [Lucide](https://lucide.dev/) for icons.
- Binary glTF (`.glb`) anatomical model.

## Contributing

1. Create a branch for your change.
2. Install dependencies with `npm ci`.
3. Run `npm run dev` and check your changes in a browser.
4. Before submitting a contribution, run `npm run lint` and `npm run build`.
5. For model changes, verify that `public/models/cerebro.glb` loads and that the layers and hotspots still work.

Describe any anatomical or behavioral changes in your contribution, and do not present the viewer as a clinical diagnostic tool.

## License and attribution

No license file was identified in the project information available. Before redistributing or reusing the code, 3D model, images, or video, confirm that you have the required permissions and attribution. Add the license and credits here once they are established.
