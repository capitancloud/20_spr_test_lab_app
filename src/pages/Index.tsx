import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { WhatIsTesting } from '@/components/WhatIsTesting';
import { StepByStep } from '@/components/StepByStep';
import { Glossary } from '@/components/Glossary';
import { ConceptsSection } from '@/components/ConceptsSection';
import { TestRunner } from '@/components/TestRunner';
import { TestingBenefits } from '@/components/TestingBenefits';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { LoginScreen } from '@/components/LoginScreen';
import { LogoutButton } from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import { testSuites } from '@/data/mockTests';
import { FlaskConical, Heart, ExternalLink, Loader2 } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Caricamento...</p>
        </motion.div>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginScreen />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background relative"
      >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg">TestLab</span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium bg-success/20 text-success rounded-full">
              per principianti
            </span>
          </motion.div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="#what-is-testing" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 hidden md:inline">
              Cos'è un test?
            </a>
            <a href="#concepts" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 hidden md:inline">
              Concetti
            </a>
            <a href="#runner" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 hidden md:inline">
              Playground
            </a>
            <LogoutButton />
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <Hero />

      {/* What is Testing - New educational section */}
      <div id="what-is-testing">
        <WhatIsTesting />
      </div>

      {/* Step by Step Guide */}
      <StepByStep />

      {/* Glossary */}
      <Glossary />

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
            <motion.span 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-semibold uppercase tracking-wider"
            >
              🎮 Simulazione interattiva
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Guarda i test in azione
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Questo è un <strong>playground simulato</strong>: non esegue codice reale, 
              ma ti mostra esattamente come funziona un test runner. 
              Premi play e osserva!
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
            className="relative bg-card border border-border rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring" }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto a scrivere il tuo primo test?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Hai capito le basi! Ora è il momento di sporcarti le mani. 
                Inizia con qualcosa di semplice, tipo <code className="text-primary bg-primary/10 px-2 py-0.5 rounded">expect(1+1).toBe(2)</code>.
                Puoi farcela! 💪
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://vitest.dev/guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/25"
                >
                  Inizia con Vitest
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://jestjs.io/docs/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium border border-border"
                >
                  Prova Jest
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
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
            <span className="hidden sm:inline">—</span>
            <span className="text-sm hidden sm:inline">Impara il testing senza paura</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Fatto con</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-4 h-4 text-error fill-error" />
            </motion.div>
            <span>per chi vuole imparare</span>
          </div>
        </div>
      </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
