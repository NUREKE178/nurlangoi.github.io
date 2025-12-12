Node.js and PHP upload examples

Node.js (Express + multer)

1. Install dependencies:

```bash
cd html5up-spectral
npm install
```

2. Start server (will serve files and accept POST /upload):

```bash
UPLOAD_PASSWORD=ibilim2025 npm start
```

3. Uploaded files will be saved to `uploads/` and served at `/uploads/<filename>`.

Notes: the example checks a simple password sent in the form field `password` (or header `x-upload-password`). For production, use proper authentication, HTTPS and storage.

PHP example

1. Ensure PHP is installed and `uploads/` directory writable by webserver.
2. Place `upload.php` and `gallery.html` in the same folder on your PHP-enabled server.
3. Use POST request to `upload.php` with `image` file and `password` field.

Security

- These are simple examples for local/testing only.
- Do not use client-side password checks as security.
- For production, use proper authentication and server-side validation, virus scanning, rate limiting, and storage (S3 etc.).
