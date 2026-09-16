# Critical Ops — Skin Market (Local Dev)

This repo contains a React (Vite) frontend and a small Express backend that enforces buy/sell taxes.

It also includes a standalone Streamlit version of the calculator in `streamlit_app.py`.

Features included:
- Frontend: React + Vite + Tailwind UI with a Price Calculator and a sample Skin Card
- Backend: Express server with /api/tax and /api/listings endpoints that enforce 25% buy tax and 20% sell tax

Local setup
1. Ensure Node.js (18+) and npm are installed. Vite 5 requires Node.js 18 or newer.
2. From the project root:

   npm install

3. (Tailwind) If using the pinned devDeps above, the postcss and tailwind configs are included; Tailwind should work after npm install.

4. Run the servers in separate terminals:

   # Terminal 1 - backend
   npm run dev:server

   # Terminal 2 - frontend
   npm run dev:client

5. Open http://localhost:5173 for the frontend (Vite default). Backend runs on http://localhost:4000.

Streamlit app
1. Install the Python dependencies:

   python -m pip install -r requirements.txt

2. Start the shareable calculator locally:

   streamlit run streamlit_app.py

3. Open http://localhost:8501.

Deploy for others
1. Upload this project to a GitHub repository, including `streamlit_app.py`, `requirements.txt`, and the `public` folder.
2. Sign in at https://share.streamlit.io/.
3. Choose the repository and branch, then set the main file to `streamlit_app.py`.
4. Deploy and share the generated `streamlit.app` URL.

The hosted Streamlit URL is what other people should use. The `localhost` URL only works on the computer running the app.

API examples
- POST /api/tax  { "value": 100, "mode": "buy" }
- GET /api/listings

Security & production notes
- Do NOT trust client calculations for payments — always validate and persist on the server.
- Store amounts in integer cents on backend to avoid floating point errors.
- Use HTTPS and a proper payment processor for real transactions.

Enjoy — the UI is ready. If you'd like, I can run npm install and start the servers here if Node/npm is available in the environment, or help deploy this to Vercel/Heroku.
