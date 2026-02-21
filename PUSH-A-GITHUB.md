# Subir Monazon a GitHub

Abre una **terminal** (fuera de Cursor si hace falta) y ejecuta:

```bash
cd /Users/familiazavala/monad-pagos-mvp

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ToryDom/Monazon.git
git push -u origin main
```

Si el repo en GitHub ya tiene contenido (por ejemplo el README creado al inicializarlo):

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

O en GitHub: borra el README por defecto, deja el repo vacío y luego ejecuta los comandos del primer bloque.
