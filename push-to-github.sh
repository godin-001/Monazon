#!/bin/bash
# Subir Monazon a https://github.com/ToryDom/Monazon
# Ejecutar desde la carpeta del proyecto: cd monad-pagos-mvp && bash push-to-github.sh

set -e
cd "$(dirname "$0")"

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ToryDom/Monazon.git
git push -u origin main

echo "Listo: https://github.com/ToryDom/Monazon"
