import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, XCircle, Clock, SkipForward } from 'lucide-react';
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
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      
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

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={runTests}
            disabled={isRunning}
            className="bg-success hover:bg-success/90 text-success-foreground gap-2"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Esecuzione...' : 'Esegui tutti i test'}
          </Button>
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

        {/* Results Summary */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-4 text-sm"
            >
              <span className="text-success flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {results.passed} passati
              </span>
              <span className="text-error flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                {results.failed} falliti
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {(results.duration / 1000).toFixed(1)}s
              </span>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: suiteIndex * 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {/* Suite Header */}
            <div className="px-5 py-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{suite.icon}</span>
                <div>
                  <h3 className="font-semibold">{suite.name}</h3>
                  <p className="text-sm text-muted-foreground">{suite.description}</p>
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
        <div className="relative">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"
              />
            )}
            {status === 'running' && (
              <motion.div
                key="running"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ rotate: { repeat: Infinity, duration: 1, ease: 'linear' } }}
                className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent"
              />
            )}
            {status === 'passed' && (
              <motion.div
                key="passed"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-success"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}
            {status === 'failed' && (
              <motion.div
                key="failed"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-error"
              >
                <XCircle className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Running pulse */}
          {isCurrentlyRunning && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
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
          "px-2 py-1 text-xs font-medium rounded-full",
          test.category === 'unit' && "bg-info/20 text-info",
          test.category === 'mock' && "bg-pending/20 text-pending",
          test.category === 'api' && "bg-success/20 text-success",
          test.category === 'isolation' && "bg-warning/20 text-warning"
        )}>
          {test.explanation.concept}
        </span>

        {/* Expand Arrow */}
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-muted-foreground"
        >
          ▼
        </motion.span>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Code Block */}
              <div className="code-block overflow-x-auto scrollbar-thin">
                <pre className="text-sm leading-relaxed">
                  <code>{test.code}</code>
                </pre>
              </div>

              {/* Expected Result */}
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "px-4 py-3 rounded-lg font-mono text-sm",
                    status === 'passed' ? "bg-success/10 border border-success/30" : "bg-error/10 border border-error/30"
                  )}
                >
                  {status === 'passed' ? '✅' : '❌'} {test.expectedResult}
                </motion.div>
              )}

              {/* Explanation Cards */}
              <div className="grid md:grid-cols-3 gap-3">
                <ExplanationCard
                  title="✅ Cosa viene testato"
                  content={test.explanation.whatIsTested}
                  variant="success"
                />
                <ExplanationCard
                  title="⚠️ Cosa NON viene testato"
                  content={test.explanation.whatIsNotTested}
                  variant="warning"
                />
                <ExplanationCard
                  title="💡 Perché è importante"
                  content={test.explanation.whyItMatters}
                  variant="info"
                />
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
}

function ExplanationCard({ title, content, variant }: ExplanationCardProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg border",
      variant === 'success' && "bg-success/5 border-success/20",
      variant === 'warning' && "bg-warning/5 border-warning/20",
      variant === 'info' && "bg-info/5 border-info/20"
    )}>
      <h4 className="text-sm font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
}
