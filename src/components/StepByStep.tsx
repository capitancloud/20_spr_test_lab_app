import { motion } from 'framer-motion';
import { ArrowDown, FileCode, Play, Check, Bug, Repeat } from 'lucide-react';

const steps = [
  {
    icon: <FileCode className="w-6 h-6" />,
    title: '1. Scrivi il codice',
    description: 'Prima crei la funzione che vuoi testare. Esempio: una funzione che calcola lo sconto.',
    code: 'function sconto(prezzo, percentuale) {\n  return prezzo * (1 - percentuale/100);\n}',
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: '2. Scrivi il test',
    description: 'Poi scrivi un test che verifica se la funzione fa quello che ti aspetti.',
    code: 'test("10% di sconto su 100€ = 90€", () => {\n  expect(sconto(100, 10)).toBe(90);\n});',
  },
  {
    icon: <Check className="w-6 h-6" />,
    title: '3. Esegui il test',
    description: 'Lanci i test. Se passano → verde! Se falliscono → rosso, e ti dice cosa non va.',
    result: { passed: true, message: '✅ PASS: 10% di sconto su 100€ = 90€' },
  },
  {
    icon: <Bug className="w-6 h-6" />,
    title: '4. Se fallisce, correggi',
    description: 'Il test ti mostra esattamente dove hai sbagliato. Correggi e riprova!',
    result: { passed: false, message: '❌ FAIL: Expected 90, got 9\n   Hai dimenticato di sottrarre da 1!' },
  },
  {
    icon: <Repeat className="w-6 h-6" />,
    title: '5. Ripeti',
    description: 'Aggiungi altri test per altri casi: sconto 0%? Sconto 100%? Prezzo negativo?',
    code: 'test("sconto 0% = prezzo originale", ...)\ntest("sconto 100% = gratis", ...)',
  },
];

export function StepByStep() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Come si scrive un test?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Segui questi 5 passi. È più semplice di quanto pensi!
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Step Card */}
              <div className="md:ml-20 bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                {/* Step Number (Mobile) */}
                <div className="md:hidden flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                </div>

                {/* Step Number (Desktop) */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="hidden md:flex absolute left-0 top-6 w-16 h-16 rounded-2xl bg-card border-2 border-primary items-center justify-center text-primary shadow-lg shadow-primary/20"
                >
                  {step.icon}
                </motion.div>

                <h3 className="font-bold text-lg mb-2 hidden md:block">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>

                {/* Code Block */}
                {step.code && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="code-block text-sm"
                  >
                    <pre><code>{step.code}</code></pre>
                  </motion.div>
                )}

                {/* Result Block */}
                {step.result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                      step.result.passed 
                        ? 'bg-success/10 border border-success/30 text-success' 
                        : 'bg-error/10 border border-error/30 text-error'
                    }`}
                  >
                    {step.result.message}
                  </motion.div>
                )}
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex justify-center my-4 md:hidden"
                >
                  <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
