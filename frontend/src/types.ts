export type Example = {
  input: string;
  output: string;
};

export type ExerciseSummary = {
  id: string;
  level: number;
  step: number;
  title: string;
  zone: string;
  short_objective: string;
};

export type ExerciseDetail = ExerciseSummary & {
  story: string;
  instructions: string;
  function_name: string;
  starter_code: string;
  examples: Example[];
  success_message: string;
  failure_hint: string;
};

export type TestResult = {
  name: string;
  passed: boolean;
  message: string;
};

export type RunResponse = {
  success: boolean;
  passed_tests: number;
  total_tests: number;
  details: TestResult[];
  message: string;
};

export type ProgressState = {
  completedIds: string[];
  draftCode: Record<string, string>;
};
