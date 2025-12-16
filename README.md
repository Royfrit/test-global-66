## 🛠️ Requisitos

- **Node.js 16.x**
- npm

> ⚠️ Es importante usar Node 16 para evitar incompatibilidades con Nuxt 2 y dependencias del backend.

---

## 🌐 Frontend (Nuxt 2)

### Ubicación
test-global-66-front
npm install

### Ejecutar en desarrollo
npm run dev

### Puerto
http://localhost:3000

### Rutas disponibles
http://localhost:3000/precio/sol-peruano
http://localhost:3000/precio/peso-chileno

### ⚙️ Backend (Express.js)

### Ubicación
test-global-66-back
npm install

### Ejecutar
npm run start

### Puerto
http://localhost:3001

Comunicación Frontend ↔ Backend

El frontend consume los endpoints expuestos por el backend.

Ambos proyectos deben estar levantados al mismo tiempo:

Frontend → puerto 3000

Backend → puerto 3001


### Variables de entorno (Backend)

GOOGLE_TYPE=service_account
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_service_account
SPREADSHEET_ID=your_spreadsheet_id


Documento para verificar la inserción correcta en Google Sheets:
https://docs.google.com/spreadsheets/d/16qJlO0Lk971st_DHY-ySWd72-mryGNBHIShW1AN5ans/edit?gid=0#gid=0