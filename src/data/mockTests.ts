import { TestSuite } from '@/types/test';

export const testSuites: TestSuite[] = [
  {
    id: 'unit-tests',
    name: 'Unit Tests',
    description: 'Test singole funzioni in isolamento',
    icon: '🧪',
    tests: [
      {
        id: 'unit-1',
        name: 'calculateTotal calcola correttamente',
        description: 'Verifica che la funzione sommi i prezzi correttamente',
        category: 'unit',
        code: `// Funzione da testare
function calculateTotal(items) {
  return items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0
  );
}

// Test
describe('calculateTotal', () => {
  it('dovrebbe sommare correttamente', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    
    expect(calculateTotal(items))
      .toBe(35); // ✅ 10*2 + 5*3 = 35
  });
});`,
        expectedResult: 'expect(35).toBe(35)',
        status: 'idle',
        explanation: {
          whatIsTested: 'La logica di calcolo pura della funzione',
          whatIsNotTested: 'Validazione input, gestione errori, integrazione DB',
          whyItMatters: 'I test unitari verificano che ogni "mattoncino" funzioni prima di costruire la casa',
          concept: 'Unit Testing'
        }
      },
      {
        id: 'unit-2',
        name: 'formatCurrency formatta in Euro',
        description: 'Verifica la formattazione monetaria',
        category: 'unit',
        code: `// Funzione da testare
function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

// Test
describe('formatCurrency', () => {
  it('formatta 1234.56 in €1.234,56', () => {
    expect(formatCurrency(1234.56))
      .toBe('1.234,56 €');
  });
});`,
        expectedResult: 'expect("1.234,56 €").toBe("1.234,56 €")',
        status: 'idle',
        explanation: {
          whatIsTested: 'Output formattato per un input specifico',
          whatIsNotTested: 'Altre valute, numeri negativi, edge cases',
          whyItMatters: 'Garantisce consistenza nella UI per gli utenti italiani',
          concept: 'Pure Functions'
        }
      },
      {
        id: 'unit-3',
        name: 'validateEmail ritorna true per email valide',
        description: 'Test di validazione email',
        category: 'unit',
        code: `// Funzione da testare
function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

// Test
describe('validateEmail', () => {
  it('accetta email valide', () => {
    expect(validateEmail('user@example.com'))
      .toBe(true);
  });

  it('rifiuta email senza @', () => {
    expect(validateEmail('userexample.com'))
      .toBe(false);
  });
});`,
        expectedResult: 'expect(true).toBe(true)',
        status: 'idle',
        explanation: {
          whatIsTested: 'Pattern matching per formato email base',
          whatIsNotTested: 'Esistenza del dominio, deliverability, MX records',
          whyItMatters: 'Primo livello di validazione lato client = UX migliore',
          concept: 'Input Validation'
        }
      }
    ]
  },
  {
    id: 'mock-tests',
    name: 'Mocking',
    description: 'Simulare dipendenze esterne',
    icon: '🎭',
    tests: [
      {
        id: 'mock-1',
        name: 'fetchUserData usa il mock invece della API reale',
        description: 'Dimostra come sostituire chiamate HTTP con dati finti',
        category: 'mock',
        code: `// 🎭 MOCK: Sostituiamo fetch con una versione fake
const mockFetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({
      id: 1,
      name: 'Mario Rossi',
      email: 'mario@test.com'
    })
  })
);

// Iniettiamo il mock
global.fetch = mockFetch;

// Test
describe('fetchUserData', () => {
  it('ritorna dati utente (mockati)', async () => {
    const user = await fetchUserData(1);
    
    // ✅ Verifichiamo che fetch sia stato chiamato
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/users/1'
    );
    
    // ✅ Verifichiamo i dati ritornati
    expect(user.name).toBe('Mario Rossi');
  });
});`,
        expectedResult: 'expect("Mario Rossi").toBe("Mario Rossi")',
        status: 'idle',
        explanation: {
          whatIsTested: 'Logica di parsing della risposta, chiamata corretta endpoint',
          whatIsNotTested: 'Connessione di rete, risposta reale del server, latenza',
          whyItMatters: 'I mock rendono i test veloci, affidabili e indipendenti da servizi esterni',
          concept: 'Mocking'
        }
      },
      {
        id: 'mock-2',
        name: 'sendEmail chiama il servizio email',
        description: 'Mock di un servizio di invio email',
        category: 'mock',
        code: `// 🎭 MOCK: Servizio email finto
const mockEmailService = {
  send: jest.fn(() => Promise.resolve({
    success: true,
    messageId: 'mock-123'
  }))
};

// Test
describe('sendWelcomeEmail', () => {
  it('invia email con template corretto', async () => {
    await sendWelcomeEmail(
      'user@test.com',
      'Mario',
      mockEmailService  // Iniettiamo il mock
    );
    
    // ✅ Verifichiamo la chiamata
    expect(mockEmailService.send)
      .toHaveBeenCalledWith({
        to: 'user@test.com',
        template: 'welcome',
        data: { name: 'Mario' }
      });
  });
});`,
        expectedResult: 'expect(mockEmailService.send).toHaveBeenCalled()',
        status: 'idle',
        explanation: {
          whatIsTested: 'Che la funzione chiami il servizio email con i parametri giusti',
          whatIsNotTested: 'Consegna effettiva email, template rendering, spam score',
          whyItMatters: 'Non vogliamo inviare email vere durante i test!',
          concept: 'Service Mocking'
        }
      }
    ]
  },
  {
    id: 'api-tests',
    name: 'API Testing',
    description: 'Test di endpoint simulati',
    icon: '🌐',
    tests: [
      {
        id: 'api-1',
        name: 'GET /products ritorna lista prodotti',
        description: 'Test endpoint con risposta simulata',
        category: 'api',
        code: `// 🌐 Simuliamo un server di test
const mockServer = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Mouse', price: 29 }
    ]));
  })
);

// Test
describe('GET /api/products', () => {
  it('ritorna array di prodotti', async () => {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Laptop');
  });
});`,
        expectedResult: 'expect(products.length).toBe(2)',
        status: 'idle',
        explanation: {
          whatIsTested: 'Formato risposta, struttura dati, status code',
          whatIsNotTested: 'Database reale, autenticazione, rate limiting',
          whyItMatters: 'Verifica il contratto API senza dipendere dal backend',
          concept: 'API Mocking (MSW)'
        }
      },
      {
        id: 'api-2',
        name: 'POST /orders crea un ordine',
        description: 'Test creazione risorsa',
        category: 'api',
        code: `// 🌐 Mock del POST
const mockServer = setupServer(
  rest.post('/api/orders', async (req, res, ctx) => {
    const body = await req.json();
    
    return res(ctx.status(201), ctx.json({
      id: 'order-789',
      items: body.items,
      total: 128.00,
      status: 'pending'
    }));
  })
);

// Test
describe('POST /api/orders', () => {
  it('crea ordine e ritorna 201', async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: [{ productId: 1, qty: 2 }]
      })
    });
    
    expect(response.status).toBe(201);
    const order = await response.json();
    expect(order.status).toBe('pending');
  });
});`,
        expectedResult: 'expect(201).toBe(201)',
        status: 'idle',
        explanation: {
          whatIsTested: 'Status code corretto, struttura risposta, stato iniziale',
          whatIsNotTested: 'Persistenza dati, validazione business rules, pagamenti',
          whyItMatters: 'Testa il flusso frontend → API senza effetti collaterali',
          concept: 'Integration Testing'
        }
      }
    ]
  },
  {
    id: 'isolation-tests',
    name: 'Isolamento',
    description: 'Separare le dipendenze',
    icon: '🔒',
    tests: [
      {
        id: 'iso-1',
        name: 'UserService non dipende dal DB reale',
        description: 'Dependency Injection per testabilità',
        category: 'isolation',
        code: `// 🔒 Pattern: Dependency Injection
class UserService {
  // Il repository viene INIETTATO, non creato
  constructor(private userRepo: IUserRepository) {}

  async getActiveUsers() {
    const users = await this.userRepo.findAll();
    return users.filter(u => u.isActive);
  }
}

// Test con FAKE repository
describe('UserService', () => {
  it('filtra solo utenti attivi', async () => {
    // 🎭 Repository finto
    const fakeRepo = {
      findAll: () => Promise.resolve([
        { id: 1, name: 'Mario', isActive: true },
        { id: 2, name: 'Luigi', isActive: false }
      ])
    };
    
    const service = new UserService(fakeRepo);
    const active = await service.getActiveUsers();
    
    expect(active).toHaveLength(1);
    expect(active[0].name).toBe('Mario');
  });
});`,
        expectedResult: 'expect(1).toBe(1)',
        status: 'idle',
        explanation: {
          whatIsTested: 'Logica di filtro del service in totale isolamento',
          whatIsNotTested: 'Query SQL, connessione DB, performance',
          whyItMatters: 'Isolare le dipendenze rende i test predicibili e veloci',
          concept: 'Dependency Injection'
        }
      },
      {
        id: 'iso-2',
        name: 'Timer mocckato per test deterministici',
        description: 'Controllare il tempo nei test',
        category: 'isolation',
        code: `// 🔒 Il tempo è una dipendenza esterna!
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buongiorno';
  if (hour < 18) return 'Buon pomeriggio';
  return 'Buonasera';
}

// Test SENZA mock = impredicibile ❌
// Test CON mock = sempre uguale ✅

describe('getGreeting', () => {
  beforeEach(() => {
    // 🎭 "Congeliamo" il tempo alle 10:00
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T10:00:00'));
  });

  it('dice Buongiorno alle 10', () => {
    expect(getGreeting()).toBe('Buongiorno');
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});`,
        expectedResult: 'expect("Buongiorno").toBe("Buongiorno")',
        status: 'idle',
        explanation: {
          whatIsTested: 'Logica condizionale basata sull\'ora',
          whatIsNotTested: 'Timezone diverse, orari di confine reali',
          whyItMatters: 'Senza mock, questo test passerebbe solo in certe ore del giorno!',
          concept: 'Time Mocking'
        }
      }
    ]
  }
];
