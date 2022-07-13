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
10. Paquete de reservas

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

| HU # | Descripción del paquete de reservas|
| ------ | ------ |
| HU-005 | El usuario puede seleccionar el/los horario(s) que desea reservar desde una interfaz gráfica.|
| HU-006 | El usuario puede seleccionar la(s) maquinaria(s) que desea reservar.|
| HU-007 | El usuario puede completar la reserva.|
| HU-008 | El usuario puede consultar, editar HU-005, cancelar su(s) reserva(s).|
| HU-009 | El administrador y superusuario pueden habilitar y deshabilitar horarios.|
| HU-010 | El administrador y superusuario pueden nombrar las secciones de horario de acuerdo a su uso.|
| HU-011 | El administrador y superusuario pueden crear, modificar, deshabilitar maquinas.|
| HU-012 | El administrador y superusuario pueden asignar maquinas a horarios.|
| HU-013 | El administrador y superusuario pueden establecer reglas de horas maximo de uso semanal por usuario.|
| HU-014 | El administrador y superusuario pueden crear reservas genericas HU-005, HU-008.|
| HU-015 | El administrador y superusuario pueden deshabilitar todas las reservas de la semana|
| HU-016 | El administrador y superusuario pueden deshabilitar usuarios**|
| HU-017 | El administrador y superusuario pueden generar informes con un rango de fechas que ellos determinen ( por días, mensual, trimestral, semestral, anual, o cualquier cantidad de meses que seleccione).|

#HU-000 HU-001

Comienzo a proporcionar mis datos basado que nadie excepto yo tengo los derechos exclusivos sobre ellos, dicho esto, me acojo a la ley vigente de Habeas Data que tiene este sitio resevado para mi.

Este compendio recibido o permisos de proporcionar mis datos están limitados al/los bien(es) o servicio(s) que voy a recibir y que ha sido emitido desde un lugar físico con sus leyes vigentes en la Republica de Colombia, la ultima actualización de este documento fué realizada en junio de 2022. 

Reporte de versiones de Habeas Data previamente aceptadas por mi y los datos proporcionados:
HD-V1.0.0 Datos:
HD-V1.0.0 Datos:

Eliminación de datos del repositorio de Habeas Data:
Debido a que los registros realizados por ley son suceptibles de ser eliminados siempre que el usuario que es el dueño de la información solicite borrarlo, la información deberá ser reemplazada en la base de datos por datos genéricos con consecutivos que tengan el mismo número en cada dato recopilado.

Los datos que proporcionaré y su uso serán los siguientes:
Los datos que he proporcionado y su uso son los siguientes:

Documentación para programadores futuros que deseen mejorar el sistema:

Cambio mayor de versionado x.0.0 
Cambio menor de versionado 1.x.0
Cambio mínimo de versionado 1.0.x

Definición para cambios de versión con Habeas Data

Cambio mayor de versionado x.0.0 con Habeas Data: 

El sistema se entrega utilizando tres datos importantes para funcionar: nombre del usuario, número de identificación, registros de actividad en la plataforma.  Los tres datos importantes serán utilizados por los algoritmos que dan funcionamiento al sistema.

Se considera un cambio mayor al Habeas Data original, eliminar cualquiera de estos tres datos o cambiarlo por uno diferente que requiera un cambio de reglas en los algoritmos 

Cada cambio reiniciará los contadores de cambios menores y mínimos en cero, ejemplo, HD-V1.0.0, HD-V2.0.0, HD-V3.0.0, etc HD-Vx.0.0

Cambio menor de versionado 1.x.0 con Habeas Data:
Se genera la inclusión de nuevos datos que no requieren el uso de algoritmos. Cada cambio reiniciará los contadores de cambios mínimos en cero, ejemplo, HDV1.1.0, HDV1.2.0, HDV1.3.0, etc HDV1.x.0.

Cambio mínimo de versionado 1.0.x:
Se hace leves correciones textuales al dato que se requiere y al uso que se le va a dar a la información recolectada que usualmente son conocidas como fe de erratas o cambios de buena fe.

Requisito:
Cada cambio generado al Habeas Data en cualquiera de sus versiones requerirá nuevamente de la aprobación del usuario

Data:
Based on:
Querys:
Entrances:

Documento de Habeas Data - Versión 1.0.0
Dato:	Nombre del usuario
Uso: 	Permitirá identificarme como usuario real. Es un requisito importante para funcionamiento del sistema.
Dato: 	Número de identificación.
Uso:	Es el número de verificación que se requiere para establecer mi responsabilidad en el uso del bien o servicio que recibo. Es un requisito importante para funcionamiento del sistema.
Dato: Registros de actividad en la plataforma.
Uso: Le permite conocer a quienes proporcionan el bien o servicio que estoy dando buen uso de las herramientas que me proporcionan. Es un requisito importante para funcionamiento del sistema.

Dato:
Uso:

Dato:
Uso:

Dato:
Uso:

Dato:
Uso:



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
