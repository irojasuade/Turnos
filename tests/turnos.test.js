const request = require('supertest');
const app = require('../server');
const db = require('../db');

jest.mock('../db');

describe('Turnos API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /turnos returns all turnos', async () => {
    const fakeTurnos = [
      { id: 1, cliente: 'Ana', fecha: '2023-01-01', hora: '10:00', tratamiento: 'corte', realizado: false },
      { id: 2, cliente: 'Juan', fecha: '2023-01-02', hora: '11:00', tratamiento: 'peinado', realizado: false }
    ];
    db.query.mockResolvedValue({ rows: fakeTurnos });
    const res = await request(app).get('/turnos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeTurnos);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM turnos ORDER BY fecha, hora');
  });

  test('POST /turnos creates a turno', async () => {
    const newTurno = { cliente: 'Eva', fecha: '2023-01-03', hora: '12:00', tratamiento: 'tinte' };
    const created = { id: 3, ...newTurno, realizado: false };
    db.query.mockResolvedValue({ rows: [created] });
    const res = await request(app).post('/turnos').send(newTurno);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(created);
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO turnos'),
      [newTurno.cliente, newTurno.fecha, newTurno.hora, newTurno.tratamiento]
    );
  });

  test('GET /turnos/:fecha returns turnos by date', async () => {
    const fakeTurnos = [
      { id: 4, cliente: 'Leo', fecha: '2023-01-04', hora: '13:00', tratamiento: 'corte', realizado: false }
    ];
    db.query.mockResolvedValue({ rows: fakeTurnos });
    const res = await request(app).get('/turnos/2023-01-04');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeTurnos);
    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM turnos WHERE fecha = $1 ORDER BY hora',
      ['2023-01-04']
    );
  });
});
