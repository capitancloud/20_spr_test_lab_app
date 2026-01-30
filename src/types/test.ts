// Types for our simulated testing system

export type TestStatus = 'idle' | 'running' | 'passed' | 'failed' | 'skipped';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  code: string;
  expectedResult: string;
  status: TestStatus;
  duration?: number;
  explanation: TestExplanation;
  category: 'unit' | 'mock' | 'api' | 'isolation';
}

export interface TestExplanation {
  whatIsTested: string;
  whatIsNotTested: string;
  whyItMatters: string;
  concept?: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  icon: string;
}

export interface TestResult {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration: number;
}
