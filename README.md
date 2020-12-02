# back_e-shop
back-end en NodeJS de tienda electronica

# Comandos
npx tsc --version

# comando para iniciar archivo de configuracion tsconfig.ts
npx tsc --init --rootDir src --outDir buid --lib dom,es6 --module commonjs --target es6 --removeComments

# Comando para agregar dependencias de produccion
npm install express graphql ncp graphql-import-node compression cors graphql-tools graphql-playground-middleware-express apollo-server-express

# Comando para agregar dependencias de desarrollo
 npm install -D @types/cors @types/compression @types/express @types/node @types/graphql nodemon ts-node

# Comando para correr aplicacion
npm run dev

# Librerias extras
npm install dotenv
npm install -D typescript-tslint-plugin