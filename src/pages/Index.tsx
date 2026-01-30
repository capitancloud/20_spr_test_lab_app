import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { ConceptsSection } from '@/components/ConceptsSection';
import { TestRunner } from '@/components/TestRunner';
import { TestingBenefits } from '@/components/TestingBenefits';
import { testSuites } from '@/data/mockTests';
import { FlaskConical, Github, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg">TestLab</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#concepts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Concetti
            </a>
            <a href="#runner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Playground
            </a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefici
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Concepts Section */}
      <div id="concepts">
        <ConceptsSection />
      </div>

      {/* Test Runner Section */}
      <section id="runner" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Simulazione interattiva
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Guarda i test in azione
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premi "Esegui" e osserva come ogni test viene eseguito. 
              Espandi i test per vedere il codice e capire cosa viene verificato.
            </p>
          </motion.div>

          <TestRunner suites={testSuites} />
        </div>
      </section>

      {/* Benefits Section */}
      <div id="benefits">
        <TestingBenefits />
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card border border-border rounded-3xl p-12 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto a testare?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Il testing non è difficile, è solo diverso. 
                Inizia con un test semplice e costruisci da lì. 
                Ogni grande codebase testata è iniziata con <code className="text-primary">expect(true).toBe(true)</code>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://vitest.dev/guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Inizia con Vitest
                </a>
                <a
                  href="https://jestjs.io/docs/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors"
                >
                  Prova Jest
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FlaskConical className="w-5 h-5 text-primary" />
            <span className="font-semibold">TestLab</span>
            <span>—</span>
            <span className="text-sm">Impara il testing senza paura</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Fatto con</span>
            <Heart className="w-4 h-4 text-error" />
            <span>per gli sviluppatori</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
