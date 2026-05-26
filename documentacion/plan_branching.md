# Plan de Branching

## Proyecto
Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Estrategia utilizada

Para el control de versiones se utilizó una estrategia de branching simplificada, adecuada al tamaño del equipo de desarrollo, compuesto por dos integrantes.

La estrategia consistió en mantener una rama principal estable y ramas de desarrollo individuales para cada integrante. Esta decisión permitió trabajar de forma ordenada sin incorporar una estrategia más compleja como GitFlow, considerando que el equipo era reducido.

## Ramas utilizadas

### main

Rama principal del repositorio. Se utiliza como base estable del proyecto y contiene la versión consolidada del desarrollo.

### dev-bastian

Rama de desarrollo individual utilizada por Bastian para trabajar funcionalidades del proyecto antes de integrarlas a la rama principal.

En GitHub se observa que esta rama presenta avances respecto de main y tiene asociado un Pull Request abierto identificado como PR #1.

### dev-antonia

Rama de desarrollo individual utilizada por Antonia para trabajar funcionalidades del proyecto de forma separada.

## Evidencia observada en GitHub

En el repositorio se evidencian las siguientes ramas:

- main
- dev-bastian
- dev-antonia

También se observa un Pull Request abierto:

- PR #1: Dev bastian
- Estado: Open
- Fecha de apertura: 23 de abril de 2026
- Autor: Bastian97

Además, en la rama dev-bastian se observan commits asociados al desarrollo del proyecto, entre ellos:

- chore: estructura inicial proyecto colegio (vistas y roles principales separados)
- feat: actualizar login
- Revert "feat: actualizar login"
- vista asignaturas del alumno creada, importada y agregada
- conexion de botones navbar con vistas
- Creacion de BDD MySQL, conexion a backend y creacion de MVC con clases

## Justificación de la estrategia

Se eligió una estrategia simple porque el equipo estaba compuesto por dos personas. Cada integrante trabajó en su propia rama, evitando modificar directamente la rama main.

Esta estrategia permitió:

- Separar el trabajo de cada integrante.
- Mantener main como rama estable.
- Revisar avances antes de integrarlos.
- Mantener trazabilidad mediante commits.
- Preparar la integración mediante Pull Request.

## Flujo de trabajo utilizado

1. Se creó o mantuvo main como rama principal.
2. Cada integrante trabajó en una rama individual.
3. Los cambios se realizaron de forma local.
4. Los cambios se subieron al repositorio remoto.
5. Se registraron commits descriptivos según el avance realizado.
6. Se abrió Pull Request para preparar la integración de la rama dev-bastian hacia la rama principal.

## Gestión de conflictos

En la evidencia revisada no se observan conflictos activos ni Pull Requests cerrados con conflictos resueltos.

En caso de presentarse conflictos, el procedimiento definido para resolverlos es:

1. Identificar los archivos en conflicto.
2. Revisar los cambios de ambas ramas.
3. Mantener la versión funcional y coherente con el proyecto.
4. Ejecutar pruebas locales antes de confirmar la resolución.
5. Realizar commit de la resolución del conflicto.
6. Continuar con la integración mediante Pull Request.

## Comandos utilizados o sugeridos para evidenciar el branching

```bash
git branch
 cat > documentacion/plan_branching.md <<'EOF'
# Plan de Branching

## Proyecto
Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Estrategia utilizada

Para el control de versiones se utilizó una estrategia de branching simplificada, adecuada al tamaño del equipo de desarrollo, compuesto por dos integrantes.

La estrategia consistió en mantener una rama principal estable y ramas de desarrollo individuales para cada integrante. Esta decisión permitió trabajar de forma ordenada sin incorporar una estrategia más compleja como GitFlow, considerando que el equipo era reducido.

## Ramas utilizadas

### main

Rama principal del repositorio. Se utiliza como base estable del proyecto y contiene la versión consolidada del desarrollo.

### dev-bastian

Rama de desarrollo individual utilizada por Bastian para trabajar funcionalidades del proyecto antes de integrarlas a la rama principal.

En GitHub se observa que esta rama presenta avances respecto de main y tiene asociado un Pull Request abierto identificado como PR #1.

### dev-antonia

Rama de desarrollo individual utilizada por Antonia para trabajar funcionalidades del proyecto de forma separada.

## Evidencia observada en GitHub

En el repositorio se evidencian las siguientes ramas:

- main
- dev-bastian
- dev-antonia

También se observa un Pull Request abierto:

- PR #1: Dev bastian
- Estado: Open
- Fecha de apertura: 23 de abril de 2026
git branchs utilizados o sugeridos para evidenciar el branchingra resolverlos es:dos con conflictos resueltos. su propia rama, evitando
- Autor: Bastian97

Además, en la rama dev-bastian se observan commits asociados al desarrollo del proyecto, entre ellos:

- chore: estructura inicial proyecto colegio (vistas y roles principales separados)
- feat: actualizar login
- Revert "feat: actualizar login"
- vista asignaturas del alumno creada, importada y agregada
- conexion de botones navbar con vistas
- Creacion de BDD MySQL, conexion a backend y creacion de MVC con clases

## Justificación de la estrategia

Se eligió una estrategia simple porque el equipo estaba compuesto por dos personas. Cada integrante trabajó en su propia rama, evitando modificar directamente la rama main.

Esta estrategia permitió:

- Separar el trabajo de cada integrante.
- Mantener main como rama estable.
- Revisar avances antes de integrarlos.
- Mantener trazabilidad mediante commits.
- Preparar la integración mediante Pull Request.

## Flujo de trabajo utilizado

1. Se creó o mantuvo main como rama principal.
2. Cada integrante trabajó en una rama individual.
3. Los cambios se realizaron de forma local.
4. Los cambios se subieron al repositorio remoto.
5. Se registraron commits descriptivos según el avance realizado.
6. Se abrió Pull Request para preparar la integración de la rama dev-bastian hacia la rama principal.

## Gestión de conflictos

En la evidencia revisada no se observan conflictos activos ni Pull Requests cerrados con conflictos resueltos.

En caso de presentarse conflictos, el procedimiento definido para resolverlos es:

1. Identificar los archivos en conflicto.
2. Revisar los cambios de ambas ramas.
3. Mantener la versión funcional y coherente con el proyecto.
4. Ejecutar pruebas locales antes de confirmar la resolución.
5. Realizar commit de la resolución del conflicto.
6. Continuar con la integración mediante Pull Request.

## Comandos utilizados o sugeridos para evidenciar el branching

```bash
git branch
