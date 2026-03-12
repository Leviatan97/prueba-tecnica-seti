# To-Do App (Ion-Seti)

Esta es una aplicación de gestión de tareas (To-Do List) desarrollada con **Ionic** y **Angular**, diseñada para demostrar el uso de tecnologías modernas como **Angular Signals**, **Control Flow** y **Arquitectura Molecular**.

## Tecnologías Principales

- **Framework**: Ionic 7+ & Angular 20 (Signals & standalone bits)
- **Persistencia**: `@ionic/storage-angular`
- **Diseño**: SCSS, Material Design global, Arquitectura Molecular (Atomic Design)
- **Híbrido**: Integración con **Cordova** para Android e iOS.

---

## Compilación y Ejecución (Híbrido)

La aplicación está preparada para ser compilada para plataformas móviles utilizando **Cordova**.

### Requisitos Previos

1. **Node.js** (v18+)
2. **Ionic CLI**: `npm install -g @ionic/cli`
3. **Android SDK** (para Android): Configura `ANDROID_HOME` y las `platform-tools`.
4. **Xcode** (para iOS): Solo disponible en macOS.

### Configuración Inicial

```bash
# Instalar dependencias
npm install

# Preparar el proyecto Cordova
ionic cordova prepare android
# o
ionic cordova prepare ios
```

### Ejecución en Android

Para ejecutar en un dispositivo conectado o emulador:

```bash
# Ejecutar en emulador/dispositivo
ionic cordova run android

# Generar el APK de depuración
ionic cordova build android
```

### Ejecución en iOS (Requiere macOS + Xcode)

```bash
# Abrir en Xcode para compilar firmar
ionic cordova build ios
# Luego usar el .xcworkspace en Xcode
```

---

## Arquitectura del Proyecto

El proyecto sigue una estructura basada en **Arquitectura Molecular**:

- `src/app/core/`: Servicios globales, modelos y constantes (Capa de datos).
- `src/app/shared/components/`:
    - `atoms/`: Componentes básicos.
    - `molecules/`: Combinación de átomos (ej. `EmptyStateComponent`).
    - `organisms/`: Componentes complejos que orquestan moléculas.
- `src/app/pages/`: Páginas que actúan como templates/vistas principales.

### Características implementadas:
- ✅ **Signals**: Gestión de estado reactiva moderna.
- ✅ **Control Flow**: Uso de `@if`, `@for` en lugar de directivas antiguas.
- ✅ **Clean UI**: Modo Material Design forzado globalmente para consistencia.
- ✅ **No Deletable UI**: Interfaz simplificada enfocada en la gestión de estados.

---

## Desarrollo Local

Para previsualizar en el navegador:

```bash
ionic serve
```

---

*Desarrollado para la Prueba Técnica SETI.*
