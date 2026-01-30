import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

export function WhatIsTesting() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-success/40"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-error/40"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[20%] w-8 h-8 rounded-full bg-primary/30"
        />
      </div>

      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6"
          >
            <Lightbulb className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-warning">Per chi parte da zero</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ma cos'è un <span className="gradient-text">test</span>, esattamente?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Immagina di essere uno chef. Prima di servire un piatto, 
            <span className="text-foreground font-medium"> assaggi ogni ingrediente</span> per assicurarti che sia buono.
            Nel codice, facciamo la stessa cosa!
          </p>
        </motion.div>

        {/* Visual Analogy */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Real Life */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-8 h-full">
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold mb-4">Nella vita reale</h3>
              
              <div className="space-y-4">
                <AnalogStep 
                  step={1} 
                  text="Prepari una torta"
                  delay={0.1}
                />
                <AnalogStep 
                  step={2} 
                  text="Assaggi l'impasto → È buono?"
                  delay={0.2}
                />
                <AnalogStep 
                  step={3} 
                  text="Controlli la cottura → È cotta?"
                  delay={0.3}
                />
                <AnalogStep 
                  step={4} 
                  text="Se tutto OK → Servi la torta! 🎂"
                  delay={0.4}
                  success
                />
              </div>
            </div>
          </motion.div>

          {/* In Code */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-8 h-full">
              <div className="text-4xl mb-4">👩‍💻</div>
              <h3 className="text-xl font-bold mb-4">Nel codice</h3>
              
              <div className="space-y-4">
                <AnalogStep 
                  step={1} 
                  text="Scrivi una funzione"
                  delay={0.3}
                />
                <AnalogStep 
                  step={2} 
                  text="Scrivi un test → Funziona?"
                  delay={0.4}
                />
                <AnalogStep 
                  step={3} 
                  text="Il test passa → ✅ Verde"
                  delay={0.5}
                />
                <AnalogStep 
                  step={4} 
                  text="Se tutto OK → Pubblichi! 🚀"
                  delay={0.6}
                  success
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simple Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-border bg-secondary/30">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              Il test più semplice del mondo
            </h3>
          </div>
          
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Code */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">La funzione da testare:</p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="code-block"
              >
                <pre className="text-sm">
                  <code>
                    <span className="code-keyword">function</span>{" "}
                    <span className="code-function">somma</span>(a, b) {"{\n"}
                    {"  "}<span className="code-keyword">return</span> a + b;{"\n"}
                    {"}"}
                  </code>
                </pre>
              </motion.div>
              
              <p className="text-sm text-muted-foreground mb-3 mt-6">Il test:</p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="code-block"
              >
                <pre className="text-sm">
                  <code>
                    <span className="code-comment">// "Mi aspetto che 2 + 2 faccia 4"</span>{"\n"}
                    <span className="code-function">expect</span>(
                    <span className="code-function">somma</span>(
                    <span className="code-number">2</span>, <span className="code-number">2</span>))
                    .<span className="code-function">toBe</span>(<span className="code-number">4</span>);
                  </code>
                </pre>
              </motion.div>
            </div>

            {/* Explanation */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-success">Se il risultato è 4</p>
                    <p className="text-sm text-muted-foreground">Il test PASSA → Luce verde ✅</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-error/10 border border-error/20">
                  <XCircle className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-error">Se il risultato è diverso</p>
                    <p className="text-sm text-muted-foreground">Il test FALLISCE → Luce rossa ❌</p>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-sm text-muted-foreground mt-4 p-4 rounded-xl bg-info/10 border border-info/20"
                >
                  💡 <strong className="text-info">Ecco tutto!</strong> Un test è semplicemente: 
                  "mi aspetto che <em>questo</em> dia <em>quello</em>". Niente magia!
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnalogStep({ step, text, delay = 0, success = false }: { 
  step: number; 
  text: string; 
  delay?: number;
  success?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        success ? 'bg-success/10 border border-success/20' : 'bg-secondary/50'
      }`}
    >
      <motion.span 
        whileHover={{ scale: 1.1 }}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          success ? 'bg-success text-success-foreground' : 'bg-primary/20 text-primary'
        }`}
      >
        {step}
      </motion.span>
      <span className={success ? 'font-medium' : ''}>{text}</span>
    </motion.div>
  );
}
