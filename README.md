# Sistema Integral de Gestión de Biblioteca

Plataforma digital para administrar libros, usuarios y préstamos eficientemente.

## Introducción / Contexto

- Descripción del problema que se busca resolver:  
Las bibliotecas tradicionales enfrentan dificultades en la gestión manual de libros, control de inventario y seguimiento de préstamos, lo que puede generar errores, duplicidad de información y desorganización.

- Justificación: ¿por qué es relevante? (impacto social, académico, empresarial, etc.)  
El sistema optimiza los procesos bibliotecarios mediante la digitalización, mejora la experiencia del usuario y garantiza mayor control e integridad en la información almacenada, aportando valor académico y organizacional.

- Breve descripción del dominio / temática del proyecto integrador:  
El proyecto se enfoca en la gestión digital de bibliotecas, permitiendo administrar libros, usuarios, reservas y renovaciones dentro de una estructura relacional que conecta géneros, editoriales y stock disponible.

## Objetivos

**Objetivo General**  
Desarrollar un sistema digital que permita gestionar de forma eficiente libros, usuarios, reservas y renovaciones en una biblioteca.

**Objetivos Específicos**  
- Diseñar una base de datos relacional que garantice integridad y coherencia de la información.  
- Implementar un módulo de gestión de libros con clasificación por género y editorial.  
- Desarrollar un sistema de autenticación de usuarios con control de acceso y seguridad básica.  
- Permitir la creación, seguimiento y renovación de reservas registrando fechas de préstamo y devolución.  
- Automatizar el cálculo de la fecha estimada de devolución para optimizar el control de préstamos.  

**Qué se va a desarrollar:**  
- Módulo de gestión de libros (registro, edición, consulta y control de stock).  
- Módulo de gestión de usuarios (registro, inicio de sesión y recuperación de acceso).  
- Control básico de seguridad (intentos fallidos de inicio de sesión).  
- Módulo de reservas (creación, consulta y modalidad de entrega: retiro o envío a domicilio).  
- Registro automático de fechas de préstamo y devolución.  
- Funcionalidad de renovación de reservas asociadas a préstamos existentes.  
- Base de datos relacional conectando usuarios, libros, reservas, géneros y editoriales.  

**Qué NO se va a desarrollar en esta versión (fuera de alcance):**  
- Pasarela de pagos en línea.  
- Integración con sistemas externos de bibliotecas.  
- Aplicación móvil nativa.  
- Sistema avanzado de notificaciones por correo o SMS.  
- Reportes analíticos avanzados con herramientas de inteligencia de negocios.  

## Tecnologías y Herramientas 

- **Herramientas**:  React, vite


## Integrantes del Equipo

| Nombre                  | Rol principal              | Usuario GitHub     |
|-------------------------|----------------------------|--------------------|
| Mayra Alejandra Alzate Sánchez                | Líder / Backend            | @Malzate1        |
| Santiago Bohorquez Saldaña                    | Frontend Lead              | @Elgrinch01        |
| Samuel Díaz Vanegas                           | Backend / Base de datos    | @zamu5555        |
| Jhonatan Tabares                           | Backend / Base de datos    | @JhonTabar        |
