import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createRequire } from 'module';

// 1. INYECCIÓN ANTI-CRASH: Evitamos el process.exit(1) de tu app.js
vi.hoisted(() => {
  process.env.DB_URL = 'mongodb://fake-url/donaton';
});

const require = createRequire(import.meta.url);

// 2. APAGAMOS MONGOOSE DESDE LA RAÍZ (Escudo NPM)
vi.mock('mongoose', () => {
  const mockMongoose = {
    connect: vi.fn().mockResolvedValue(true),
    connection: { readyState: 1 } // Simula conexión exitosa para tu /health
  };
  return { default: mockMongoose, ...mockMongoose };
});

// 3. IMPORTAMOS TODO AL MISMO UNIVERSO
const reporteRepository = require('../repositories/reporteRepository');
const app = require('../app');

describe('Microservicio - API de Terreno (MongoDB)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  /* --- RUTAS FELICES --- */
  it('GET / - Debe devolver la lista de reportes', async () => {
    // Espiamos el método que vimos en tu reporteRepository.js
    vi.spyOn(reporteRepository, 'obtenerTodos').mockResolvedValue([
      { id: '1', titulo: 'Incendio forestal', estado: 'Activo' }
    ]);

    const response = await request(app).get('/'); // Ajusta la ruta si tu controlador usa otra

    expect([200, 201]).toContain(response.status);
    // Nota: Como no tengo el código de tu controlador, no valido si envías { data: [] } o solo el array.
    // Si falla, ajusta el expect según la estructura que devuelva tu controlador.
  });

  it('POST / - Debe crear un reporte', async () => {
    vi.spyOn(reporteRepository, 'crear').mockResolvedValue({ id: '2', titulo: 'Inundación' });

    const response = await request(app)
      .post('/')
      .send({ titulo: 'Inundación', descripcion: 'Fuerte lluvia' });

    expect([200, 201]).toContain(response.status);
  });

  /* --- RUTAS TRISTES --- */
  it('GET / - Debe manejar errores de la BD', async () => {
    vi.spyOn(reporteRepository, 'obtenerTodos').mockRejectedValue(new Error('Mongo Timeout'));

    const response = await request(app).get('/');
    expect(response.status).toBeGreaterThanOrEqual(400); // Dependiendo de si devuelves 400 o 500
  });

  it('GET /health - Debe confirmar que el servicio está vivo', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.db).toBeDefined();
  });
});