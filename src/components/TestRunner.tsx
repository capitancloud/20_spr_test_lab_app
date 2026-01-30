import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, XCircle, Clock, ChevronDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestSuite, TestCase, TestStatus, TestResult } from '@/types/test';
import { cn } from '@/lib/utils';

interface TestRunnerProps {
  suites: TestSuite[];
}

export function TestRunner({ suites }: TestRunnerProps) {
  const [testStates, setTestStates] = useState<Record<string, TestStatus>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [results, setResults] = useState<TestResult | null>(null);

  const resetTests = useCallback(() => {
    setTestStates({});
    setResults(null);
    setCurrentTest(null);
  }, []);

  const runTests = useCallback(async () => {
    setIsRunning(true);
    resetTests();
    
    const allTests = suites.flatMap(s => s.tests);
    let passed = 0, failed = 0, skipped = 0;
    const startTime = Date.now();

    for (const test of allTests) {
      setCurrentTest(test.id);
      setTestStates(prev => ({ ...prev, [test.id]: 'running' }));
      
      // Simula tempo di esecuzione
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      
      // 90% passa, 10% fallisce per demo
      const success = Math.random() > 0.1;
      const status: TestStatus = success ? 'passed' : 'failed';
      
      if (success) passed++;
      else failed++;
      
      setTestStates(prev => ({ ...prev, [test.id]: status }));
    }

    setResults({
      passed,
      failed,
      skipped,
      total: allTests.length,
      duration: Date.now() - startTime
    });
    
    setCurrentTest(null);
    setIsRunning(false);
  }, [suites, resetTests]);

  const allTests = suites.flatMap(s => s.tests);
  const completedTests = Object.keys(testStates).filter(
    k => testStates[k] === 'passed' || testStates[k] === 'failed'
  ).length;
  const progress = allTests.length > 0 ? (completedTests / allTests.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-info/10 border border-info/20 rounded-xl p-5 flex gap-4"
      >
        <Info className="w-6 h-6 text-info flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-info mb-1">Come funziona questo playground?</h3>
          <p className="text-sm text-muted-foreground">
            Premi <strong>"Esegui tutti i test"</strong> per vedere una simulazione di come funziona un test runner. 
            I test passeranno o falliranno in modo casuale per mostrarti entrambi gli scenari. 
            <strong> Clicca su ogni test</strong> per espandere il codice e leggere cosa viene testato!
          </p>
        </div>
      </motion.div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={runTests}
              disabled={isRunning}
              className="bg-success hover:bg-success/90 text-success-foreground gap-2 shadow-lg shadow-success/20"
            >
              <motion.div
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Play className="w-4 h-4" />
              </motion.div>
              {isRunning ? 'Esecuzione...' : 'Esegui tutti i test'}
            </Button>
          </motion.div>
          <Button
            variant="outline"
            onClick={resetTests}
            disabled={isRunning}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            className="flex-1 max-w-xs"
          >
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary to-success"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {completedTests} / {allTests.length} test completati
            </p>
          </motion.div>
        )}

        {/* Results Summary */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-4 text-sm bg-secondary/50 rounded-lg px-4 py-2"
            >
              <motion.span 
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                className="text-success flex items-center gap-1.5 font-medium"
              >
                <CheckCircle2 className="w-4 h-4" />
                {results.passed} passati
              </motion.span>
              <motion.span 
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-error flex items-center gap-1.5 font-medium"
              >
                <XCircle className="w-4 h-4" />
                {results.failed} falliti
              </motion.span>
              <motion.span 
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                {(results.duration / 1000).toFixed(1)}s
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Test Suites */}
      <div className="space-y-4">
        {suites.map((suite, suiteIndex) => (
          <motion.div
            key={suite.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: suiteIndex * 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {/* Suite Header */}
            <div className="px-5 py-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: suiteIndex * 0.2 }}
                >
                  {suite.icon}
                </motion.span>
                <div>
                  <h3 className="font-semibold">{suite.name}</h3>
                  <p className="text-sm text-muted-foreground">{suite.description}</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {suite.tests.length} test
                </div>
              </div>
            </div>

            {/* Tests List */}
            <div className="divide-y divide-border">
              {suite.tests.map((test) => (
                <TestRow
                  key={test.id}
                  test={test}
                  status={testStates[test.id] || 'idle'}
                  isCurrentlyRunning={currentTest === test.id}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface TestRowProps {
  test: TestCase;
  status: TestStatus;
  isCurrentlyRunning: boolean;
}

function TestRow({ test, status, isCurrentlyRunning }: TestRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center gap-4 hover:bg-secondary/20 transition-colors text-left"
      >
        {/* Status Indicator */}
        <div className="relative flex-shrink-0">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6 rounded-full border-2 border-muted-foreground/30"
              />
            )}
            {status === 'running' && (
              <motion.div
                key="running"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' } }}
                className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent"
              />
            )}
            {status === 'passed' && (
              <motion.div
                key="passed"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="text-success"
              >
                <CheckCircle2 className="w-6 h-6" />
              </motion.div>
            )}
            {status === 'failed' && (
              <motion.div
                key="failed"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="text-error"
              >
                <XCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Running pulse */}
          {isCurrentlyRunning && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 rounded-full bg-primary"
            />
          )}
        </div>

        {/* Test Name */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-medium truncate transition-colors",
            status === 'passed' && "text-success",
            status === 'failed' && "text-error",
            isCurrentlyRunning && "text-primary"
          )}>
            {test.name}
          </p>
          <p className="text-sm text-muted-foreground truncate">{test.description}</p>
        </div>

        {/* Category Badge */}
        <span className={cn(
          "px-2.5 py-1 text-xs font-medium rounded-full hidden sm:inline-flex",
          test.category === 'unit' && "bg-info/20 text-info",
          test.category === 'mock' && "bg-pending/20 text-pending",
          test.category === 'api' && "bg-success/20 text-success",
          test.category === 'isolation' && "bg-warning/20 text-warning"
        )}>
          {test.explanation.concept}
        </span>

        {/* Expand Arrow */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-muted-foreground"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Code Block */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  📝 Codice del test (simulato)
                </p>
                <div className="code-block overflow-x-auto scrollbar-thin max-h-64">
                  <pre className="text-sm leading-relaxed">
                    <code>{test.code}</code>
                  </pre>
                </div>
              </div>

              {/* Expected Result */}
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "px-4 py-3 rounded-lg font-mono text-sm flex items-center gap-3",
                    status === 'passed' ? "bg-success/10 border border-success/30" : "bg-error/10 border border-error/30"
                  )}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="text-xl"
                  >
                    {status === 'passed' ? '✅' : '❌'}
                  </motion.span>
                  <span className={status === 'passed' ? 'text-success' : 'text-error'}>
                    {test.expectedResult}
                  </span>
                </motion.div>
              )}

              {/* Explanation Cards */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  🎓 Cosa impari da questo test
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <ExplanationCard
                    title="✅ Cosa viene testato"
                    content={test.explanation.whatIsTested}
                    variant="success"
                    delay={0}
                  />
                  <ExplanationCard
                    title="⚠️ Cosa NON viene testato"
                    content={test.explanation.whatIsNotTested}
                    variant="warning"
                    delay={0.1}
                  />
                  <ExplanationCard
                    title="💡 Perché è importante"
                    content={test.explanation.whyItMatters}
                    variant="info"
                    delay={0.2}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ExplanationCardProps {
  title: string;
  content: string;
  variant: 'success' | 'warning' | 'info';
  delay?: number;
}

function ExplanationCard({ title, content, variant, delay = 0 }: ExplanationCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "p-4 rounded-xl border",
        variant === 'success' && "bg-success/5 border-success/20",
        variant === 'warning' && "bg-warning/5 border-warning/20",
        variant === 'info' && "bg-info/5 border-info/20"
      )}
    >
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </motion.div>
  );
}
