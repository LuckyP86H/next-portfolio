declare module '@eslint/eslintrc' {
  // Minimal types used by the project to satisfy TS at build-time.
  export class FlatCompat {
    constructor(options?: { baseDirectory?: string });
    extends(...configs: string[]): string[];
  }
}
