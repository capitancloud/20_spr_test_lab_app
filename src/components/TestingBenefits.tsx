import { motion } from 'framer-motion';
import { Bug, Rocket, Shield, RefreshCw, Clock, Heart } from 'lucide-react';

const benefits = [
  {
    icon: <Bug className="w-6 h-6" />,
    title: 'Trova i bug prima degli utenti',
    description: 'Meglio scoprire un problema durante lo sviluppo che alle 3 di notte in produzione.'
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Rilascia con fiducia',
    description: 'Se i test passano, puoi deployare senza quella sensazione di terrore.'
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Refactoring senza paura',
    description: 'Vuoi riscrivere quel codice orribile? I test ti dicono subito se hai rotto qualcosa.'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Risparmia tempo',
    description: 'Sì, scrivere test richiede tempo. Ma ne risparmierai 10x in debugging.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Documenta il comportamento',
    description: 'I test sono documentazione vivente: mostrano come il codice DEVE funzionare.'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Migliora la qualità del codice',
    description: 'Codice testabile = codice modulare = codice migliore. È matematica.'
  }
];

export function TestingBenefits() {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Perché testare?</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Il testing non è un lusso
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            È un investimento. Ecco perché ogni sviluppatore dovrebbe abbracciare i test.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 p-6 bg-card border border-border rounded-xl card-hover"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
