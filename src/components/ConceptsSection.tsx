import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FlaskConical, Repeat, Wifi, Lock, MousePointer } from 'lucide-react';
import { useState } from 'react';

const concepts = [
  {
    icon: <FlaskConical className="w-8 h-8" />,
    title: 'Unit Testing',
    shortDesc: 'Testa una cosa alla volta',
    description: 'Come assaggiare ogni ingrediente separatamente prima di fare la torta. Testi UNA sola funzione, in isolamento completo.',
    example: 'expect(somma(2,2)).toBe(4)',
    color: 'info',
    analogy: '🍰 = testi la farina, poi le uova, poi lo zucchero... ognuno da solo!'
  },
  {
    icon: <Repeat className="w-8 h-8" />,
    title: 'Mocking',
    shortDesc: 'Usa versioni finte',
    description: 'Come usare i soldi del Monopoly invece di quelli veri durante una prova. Sostituisci le parti "vere" con versioni controllate.',
    example: 'const fakeDB = { getUser: () => {...} }',
    color: 'pending',
    analogy: '🎮 = invece del database vero, ne usi uno finto che risponde sempre uguale!'
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    title: 'API Testing',
    shortDesc: 'Simula il server',
    description: 'Fingi le risposte del server senza fare chiamate reali. I test diventano veloci, affidabili e funzionano anche offline.',
    example: 'mockServer.get("/api/user").reply(200, {...})',
    color: 'success',
    analogy: '📱 = il tuo test "finge" di essere il server e risponde quello che vuoi tu!'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Isolamento',
    shortDesc: 'Separa le dipendenze',
    description: 'Come fare un esame in aule separate: niente copiature! Ogni test è indipendente dagli altri e dall\'ambiente esterno.',
    example: 'beforeEach(() => resetDatabase())',
    color: 'warning',
    analogy: '🧪 = ogni test parte da zero, come se fosse il primo!'
  }
];

const colorVariants = {
  info: 'bg-info/10 border-info/20 text-info',
  pending: 'bg-pending/10 border-pending/20 text-pending',
  success: 'bg-success/10 border-success/20 text-success',
  warning: 'bg-warning/10 border-warning/20 text-warning'
};

const hoverColors = {
  info: 'group-hover:shadow-info/20',
  pending: 'group-hover:shadow-pending/20',
  success: 'group-hover:shadow-success/20',
  warning: 'group-hover:shadow-warning/20'
};

export function ConceptsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
          >
            I 4 pilastri
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Concetti che userai sempre
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Questi sono i mattoncini fondamentali. Una volta capiti questi, 
            tutto il resto viene naturale!
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground"
          >
            <MousePointer className="w-4 h-4" />
            <span>Passa il mouse sopra per saperne di più</span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                animate={{ 
                  scale: hoveredIndex === index ? 1.02 : 1,
                  y: hoveredIndex === index ? -5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`h-full bg-card border border-border rounded-2xl p-6 transition-all duration-300 ${hoverColors[concept.color as keyof typeof hoverColors]} group-hover:shadow-xl group-hover:border-opacity-50`}
              >
                {/* Icon */}
                <motion.div 
                  animate={{ rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-xl ${colorVariants[concept.color as keyof typeof colorVariants]} border flex items-center justify-center mb-4`}
                >
                  {concept.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-1">{concept.title}</h3>
                <p className="text-primary text-sm font-medium mb-3">{concept.shortDesc}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {concept.description}
                </p>

                {/* Example code */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="code-block text-xs mb-3">
                    <code>{concept.example}</code>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-xs">
                    {concept.analogy}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
