import { motion } from 'framer-motion';
import { FlaskConical, Repeat, Wifi, Lock } from 'lucide-react';

const concepts = [
  {
    icon: <FlaskConical className="w-8 h-8" />,
    title: 'Unit Testing',
    description: 'Testa singole funzioni in isolamento. Come verificare che ogni ingrediente sia buono prima di fare la torta.',
    color: 'info'
  },
  {
    icon: <Repeat className="w-8 h-8" />,
    title: 'Mocking',
    description: 'Sostituisci dipendenze esterne con versioni "finte" controllate. Come usare soldi del Monopoly invece di quelli veri.',
    color: 'pending'
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    title: 'API Testing',
    description: 'Simula risposte del server senza fare chiamate reali. Test veloci e affidabili, sempre.',
    color: 'success'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Isolamento',
    description: 'Separa le dipendenze per test predicibili. Come fare esami in aule separate: niente copiature!',
    color: 'warning'
  }
];

const colorVariants = {
  info: 'bg-info/10 border-info/20 text-info',
  pending: 'bg-pending/10 border-pending/20 text-pending',
  success: 'bg-success/10 border-success/20 text-success',
  warning: 'bg-warning/10 border-warning/20 text-warning'
};

export function ConceptsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Concetti chiave del testing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Prima di iniziare, familiarizza con i pilastri fondamentali. 
            Non preoccuparti, li vedrai in azione subito dopo!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl p-6 card-hover"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity ${
                concept.color === 'info' ? 'bg-info/5' :
                concept.color === 'pending' ? 'bg-pending/5' :
                concept.color === 'success' ? 'bg-success/5' :
                'bg-warning/5'
              }`} />
              
              <div className="relative">
                <div className={`w-16 h-16 rounded-xl ${colorVariants[concept.color as keyof typeof colorVariants]} border flex items-center justify-center mb-4`}>
                  {concept.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{concept.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {concept.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
