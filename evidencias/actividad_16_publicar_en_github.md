# Actividad 16 — Publicación del proyecto en GitHub

**Estudiante:** María José Girón Tol  
**Carné:** 1090-23-15450  
**Proyecto local:** `registro-taller-estudiante`  
**Nombre indicado para el repositorio remoto:** `registro-taller-desarrollo-web`

## Preparación comprobada en el proyecto local

- Rama local: `main`.
- Existe un historial de cuatro commits locales anteriores a esta actividad.
- El proyecto contiene `server.js`, `public/`, `README.md` y `bitacora.md`.
- `.gitignore` incluye `node_modules/` y `.env`.
- **No hay un remoto `origin` configurado; no se ha ejecutado `git push` a GitHub.**

## Pasos para publicar desde tu cuenta personal

1. Inicia sesión en https://github.com/ (si no tienes cuenta, créala en https://github.com/signup y completa la verificación de correo). No agregues contraseñas ni códigos de acceso a la bitácora.
2. En GitHub, haz clic en **+ → New repository** y ponle el nombre `registro-taller-desarrollo-web`.
3. Selecciona **Public** si la docente necesita acceder al enlace; si es privado, configura acceso para ella. Deja **desmarcados** los cuadros de README, `.gitignore` y licencia, porque el proyecto ya tiene esos archivos.
4. Haz clic en **Create repository** y copia la URL HTTPS real del repositorio que termine en `.git`.
5. Abre la carpeta `registro-taller-estudiante` en VS Code y abre la terminal. Configura Git con **tu propio correo de GitHub** (no uses un correo inventado).
6. Después de revisar el contenido y las capturas, registra el cambio más reciente y conecta el remoto usando la URL real:

```bash
git config user.name "María José Girón Tol"
git config user.email "TU_CORREO_ASOCIADO_A_GITHUB"
git status
git add .
git commit -m "Documenta las actividades 16 y 17"   # solo si hay cambios

git branch -M main
git remote add origin URL_HTTPS_REAL_DEL_REPOSITORIO
git push -u origin main
```

Si `origin` ya existe, usa `git remote set-url origin URL_HTTPS_REAL_DEL_REPOSITORIO` en vez de `git remote add origin ...`.

7. Actualiza la página del repositorio y verifica la presencia de `server.js`, `public/`, `README.md` y `bitacora.md`. Copia el enlace visible de la página a la entrega.

## ¿Por qué no añadimos otro README al crear el repositorio?

**Respuesta correcta: opción A.** Ya existe `README.md` en el proyecto local. Crear uno nuevo al iniciar el repositorio remoto puede introducir un commit adicional innecesario y complicar la primera publicación.

## Estado de esta práctica

**Preparación local comprobada; publicación y enlace remoto pendientes de autorización/inicio de sesión de la cuenta de GitHub.** No se incluye un enlace ficticio ni una captura simulada del sitio.

**Evidencia de la preparación:** [resumen local de rama, commits, archivos y remoto](actividad_16_preparacion_publicacion_git.png) y [registro de comandos de verificación](actividad_16_estado_local.txt).
