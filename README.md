# UK Parliament Frontend Home Exercise

A web application that displays UK parliament member information based on URL query parameters.

---

### Installation

1. Clone the repository into [directory-name]:

   ```bash
   git clone https://github.com/alanabishop/ukparliament.git
   cd [directory-name]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

---

### Usage

1. The application will automatically open in your default browser at `http://localhost:8080`

2. To view member data, append a query parameter to the URL:

   ```
   http://localhost:8080/?id=1049
   ```

   (Replace `1049` with the desired member ID)

3. The application will:
   - Fetch and display the member data
   - Show loading indicators during API calls
   - Display error messages if there is no member ID, or the member ID is not valid.

---

### Project Structure

```text
├── src/
│   ├── scripts/        # TypeScript source files
│   │   └── index.ts    # Application entry point
│   ├── styles/         # SCSS stylesheets
│   │   └── main.scss   # Main styles
├── public/             # Static files
│   ├── index.html      # Main HTML
│   └── favicon.ico     # Favicon
├── package.json        # Project config
└── webpack.config.js   # Build config
```

---

### Available Scripts

| Script      | Description               |
| ----------- | ------------------------- |
| `npm start` | Starts development server |
| `npm build` | Creates production build  |

---

### Troubleshooting

**Page not updating?**

- Try a hard refresh (`Ctrl+F5` or `Cmd+Shift+R`)
- Ensure the dev server is running (`npm start`)

**Getting an error message on the frontend?**

- Ensure there is a member ID query parameter in the URL in this format:

  ```
  http://localhost:8080/?id=1049
  ```

- Make sure the ID is a valid member ID.
- Check the console for more information.
