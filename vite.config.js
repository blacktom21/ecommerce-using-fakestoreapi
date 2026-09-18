import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [
      react(),
      {
        name: 'devrev-api-proxy',
        configureServer(server) {
          server.middlewares.use(async (request, response, next) => {
            if (request.url?.split('?')[0] !== '/api/devrev/me') {
              next()
              return
            }

            if (!env.DEVREV_TOKEN) {
              response.statusCode = 503
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'DEVREV_TOKEN is not configured' }))
              return
            }

            try {
              const devRevResponse = await fetch('https://api.devrev.ai/dev-users.self', {
                headers: { Authorization: `Bearer ${env.DEVREV_TOKEN}` },
              })
              const body = await devRevResponse.text()
              response.statusCode = devRevResponse.status
              response.setHeader('Content-Type', 'application/json')
              response.end(body)
            } catch {
              response.statusCode = 502
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'Unable to reach DevRev API' }))
            }
          })
        },
      },
    ],
  }
})
