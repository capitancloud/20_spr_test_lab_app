import { motion } from 'framer-motion';
import { BookOpen, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const glossaryTerms = [
  {
    term: 'Test',
    emoji: '🧪',
    simple: 'Una verifica automatica',
    detailed: 'Codice che controlla se un altro pezzo di codice fa quello che dovrebbe fare. Come un controllore che verifica la qualità.',
  },
  {
    term: 'expect()',
    emoji: '🎯',
    simple: '"Mi aspetto che..."',
    detailed: 'La funzione che dice al test cosa aspettarsi. expect(2+2).toBe(4) significa "mi aspetto che 2+2 sia uguale a 4".',
  },
  {
    term: 'Mock',
    emoji: '🎭',
    simple: 'Una versione finta',
    detailed: 'Un sostituto controllato di una dipendenza esterna. Come usare soldi finti durante le prove di un film invece di quelli veri.',
  },
  {
    term: 'Unit Test',
    emoji: '🧱',
    simple: 'Test di un singolo pezzo',
    detailed: 'Un test che verifica UNA sola funzione in isolamento, senza dipendere da database, API o altro codice.',
  },
  {
    term: 'Assertion',
    emoji: '✓',
    simple: 'Una affermazione da verificare',
    detailed: 'La parte del test che dice "questo DEVE essere vero". Se non lo è, il test fallisce.',
  },
  {
    term: 'Coverage',
    emoji: '📊',
    simple: 'Quanto codice è testato',
    detailed: 'La percentuale del tuo codice che viene eseguita durante i test. 80% coverage = 80% del codice è verificato dai test.',
  },
];

export function Glossary() {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 mb-6"
          >
            <BookOpen className="w-4 h-4 text-info" />
            <span className="text-sm font-medium text-info">Glossario rapido</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Parole che sentirai spesso
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Non preoccuparti se non le conosci! Clicca su ognuna per una spiegazione semplice.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {glossaryTerms.map((item, index) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  expandedTerm === item.term 
                    ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/10' 
                    : 'bg-card border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono font-bold text-primary">{item.term}</h3>
                      <motion.div
                        animate={{ rotate: expandedTerm === item.term ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.simple}</p>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedTerm === item.term ? 'auto' : 0,
                        opacity: expandedTerm === item.term ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-foreground mt-3 pt-3 border-t border-border">
                        {item.detailed}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
