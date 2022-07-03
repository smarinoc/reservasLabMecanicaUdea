# ReservasLabMecanicaUdea

# Bitácora de progreso del proyecto:
Inicialmente hemos escogido el laboratorio de ingeniería mecánica de la Universidad de Antioquia como el proyecto que integrará los conocimientos que tenemos en ingeniería de sistemas para el proyecto que propone el laboratorio. 

 Elicitación de requisitos
- [1]  Nos reunimos con el director de laboratorio, algunos monitores y el laboratorista, ellos nos han presentado sus necesidades. Así identificamos que la necesidad más urgente recae en la reserva y asignación de máquinas grandes del laboratorio.
- [2] En una segunda reunión hemos presentado algunos mockups o esquemas de lo que creemos se puede ajustar a las necesidades del laboratorio. Nuestro cliente principal es aquel que se encuentra en el laboratorio permanentemente y tiene la experiencia del manejo de los recursos, en su forma de trabajo, nos ajustamos a sus solicitudes y recomendaciones.

### A continución presentamos la versión 1.0.0

Hemos definido las siguientes tecnologías:
1.  Prisma orm
2.  Javascript
2.  React (frontend)
2.  Tailwindcss (Frontend)
2.  Nextjs (Backend-Frontend)
3.  graphql (Integración)
4.  MongoDB (Base de datos no relacional - opcional que sea no relacional)

  En nuestro primer acercamiento proponemos los siguientes paquetes:
1. Paquete de integración
2. Paquete de acceso/ingreso
    2.1. Información de habeas data
2. Paquete de interfaz gráfica
3. Paquete de base de datos
4. Paquete de reglas
    4.1 Paquete de reglas de horario
    4.2 Paquete de reglas de laboratorio
    4.3 Paquete de sanciones
5. Paquete web
6. Paquete de timestamps de acciones realizadas por los usuarios codificado en hash
7. Paquete de seguridad (opcional) 
8. Paquete de busquedas
9. Paquete de escalabilidad 

| ROL # | Roles |
| ------ | ------ |
| Rol-000 | Superusuario |
| Rol-001 | Administrador |
| Rol-002 | Uusuario |

Definición de requisitos funcionales:
| RF # | Requisitos funcionales del sitema|
| ------ | ------ |
| RF-001 | Cada acción de los roles serán registradas y almacenadas con timestamps.|
| RF-002 | Los administradores y superusuarios pueden definir qué datos requieren para sus informes. //Un habeas data requiere informarle al dueño de los datos, qué datos requiere y para qué van a ser utilizados. Ley 1266 de 2008 de Colombia. Las versiones de habeas data cada que sean modificadas serán marcadas en tiempo y hora y versión del habeas data. |
| RF-004 | Basado en cada nuevo cambio de las políticas de habeas data el sistema informará a los usuarios ya registrados de un cambio en las políticas y se solicitará aceptación de las mismas.|
| RF-005 | Debe ser sencillo integrar a la interfaz gráfica futuras implementaciones. (pensar el sistema como un lego que puede adherirse siempre nuevas piezas)|
| RF-006 | Se pueda acceder a las reservas por medio de una interfaz gráfica|
| RF-007 | La interfaz muestra desde el inicio el horario y sus disponibilidades|
| RF-008 | Cada que reinicia la semana se vuelven a habilitar todos los horarios segun la clasificación de horas de la semana anterior.|

Definición de requisitos funcionales:
| RNF # | Requisitos NO funcionales del sitema|
| ------ | ------ |
| RNF # 001 | Es que el sistema fácil de usar. `(revisar reglas de diseño)` |
| RNF # 002 | Es que el sistema sea responsive.|

Actualmente en julio de 2022, el laboratorio pide en sus formatos `nombres completos`, `documento de identidad`.

Definición de historias usuario:
| HU # | Descripción del paquete de acceso/ingreso|
| ------ | ------ |
| HU-000 | El superusuario puede crear administradores, usuarios y observar como administrador o usuario.|
| HU-001 | El superusuario  puede crear o modificar reglas de habeas data con su timestamp.|
| HU-002 | El administrador puede agregar usuarios (se crea usuario en estado activo), validar usuarios (activo/inactivo).|
| HU-003 | El usuario puede registrarse ingresando sus datos y aceptando el habeas data que requiera el laboratorio con `su correo de google`.|
| HU-004 | El usuario puede auntenticarse desde `su correo de google` siempre y cuando esté habilitado.|
| HU-005 | El usuario puede seleccionar el/los horario(s) que desea reservar desde una interfaz gráfica.|
| HU-006 | El usuario puede seleccionar la(s) maquinaria(s) que desea reservar.|
| HU-007 | El usuario puede completar la reserva.|
| HU-008 | El usuario puede consultar, editar HU-005, cancelar su(s) reserva(s).|
| HU-008 | El administrador y superusuario pueden habilitar y deshabilitar horarios.|
| HU-009 | El administrador y superusuario pueden nombrar las secciones de horario de acuerdo a su uso.|
| HU-010 | El administrador y superusuario pueden crear, modificar, deshabilitar maquinas.|
| HU-012 | El administrador y superusuario pueden asignar maquinas a horarios.|
| HU-013 | El administrador y superusuario pueden establecer reglas de horas maximo de uso semanal por usuario.|
| HU-013 | El administrador y superusuario pueden crear reservas genericas HU-005, HU-008.|
| HU-014 | El administrador y superusuario pueden deshabilitar todas las reservas de la semana|
| HU-015 | El administrador y superusuario pueden deshabilitar usuarios**|
| HU-015 | El administrador y superusuario pueden generar informes con un rango de fechas que ellos determinen ( por días, mensual, trimestral, semestral, anual, o cualquier cantidad de meses que seleccione).|

### En este sistema, aún no está claro como el laboratorio validaría que las horas reservadas fueron utilizadas. En el momento, el laboratorio valida este tipo de cuestiones desde unos formatos en papel que diligencian los usuarios dentro del laboratorio.

# Informe que se presenta cada cierto tiempo que se requiera

En este rango: `1 de julio de 2022 a 30 de julio de 2022`
El laboratorio de `ingeniería mecánica` se utilizó durante `689` horas.
`Fresado` durante `89` horas.
`Tornos` durante `200` horas.
`Soldadura` durante `149` horas.
`Mecanizado` durante `151` horas.
`Mesas de trabajo` durante `100` horas.
Lista de usuarios:
....
...
...
