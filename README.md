# De la idea al MVP con IA

Presentación web y Kit MVP de la charla para el Círculo Trends & Innovation Marketing (Universidad de Lima), 17 de noviembre de 2026.

- **Presentación:** `index.html`
- **Kit MVP** (prompts y guía para los equipos): `kit/index.html`

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/ (funciona sin internet)
```

## Controles de la presentación

| Tecla | Acción |
|---|---|
| → / Espacio / AvPág | Siguiente paso o diapositiva |
| ← / RePág | Paso o diapositiva anterior |
| Inicio / Fin | Primera o última diapositiva |
| F | Pantalla completa |
| T | Mostrar u ocultar el reloj de presentador |
| R | Reiniciar el reloj (arranca solo al salir de la portada) |
| Enter | Iniciar o pausar el cronómetro del sprint |
| 0 | Reiniciar el cronómetro del sprint |
| B | Mostrar la captura de respaldo del paso actual de la demo |

La URL guarda la posición (`#/diapositiva/paso`), así que recargar no pierde el lugar.

## Dónde editar

- `src/content/talk.ts`: textos, tiempos por bloque, marca de la demo, URL pública de los QR.
- `src/content/prompts.ts`: prompt maestro y prompts del kit.
- `src/slides/`: una diapositiva por archivo; el orden está en `src/slides/index.ts`.
- Capturas de respaldo de la demo: guárdalas en `public/demo/` y lístalas en `DEMO_BACKUP` (`talk.ts`).

## Publicación

Cada push a `main` publica en GitHub Pages mediante `.github/workflows/deploy.yml`.
