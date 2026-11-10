# Publicación posterior a GitHub

En la carpeta `registro-taller-estudiante` abre la terminal y comprueba:

```bash
git --version
git status
git log --oneline
```

Configura tu propio nombre y correo (el correo de ejemplo utilizado en las pruebas no representa tu identidad real):

```bash
git config user.name "María José Girón Tol"
git config user.email "TU_CORREO_REAL_DE_GIT"
```

Crea un repositorio vacío en GitHub y copia su URL exacta. Después:

```bash
git remote add origin URL_REAL_DE_TU_REPOSITORIO
git push -u origin main
```

No introduzcas credenciales ni tokens dentro de archivos del proyecto.
