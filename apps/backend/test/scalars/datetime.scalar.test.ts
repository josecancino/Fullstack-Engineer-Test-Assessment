import { Kind } from 'graphql';
import { DateTimeScalar } from '../../src/resolvers/index';

describe('DateTimeScalar', () => {
  describe('serialize', () => {
    it('serializes a Date to ISO 8601 UTC string', () => {
      const d = new Date('2026-01-24T10:15:30.123Z');
      const result = DateTimeScalar.serialize(d);
      expect(result).toBe('2026-01-24T10:15:30.123Z');
    });

    it('throws if value is not a Date', () => {
      expect(() => DateTimeScalar.serialize('2026-01-24T10:15:30.123Z' as any)).toThrow(
        'DateTime must be a Date'
      );
      expect(() => DateTimeScalar.serialize(123 as any)).toThrow('DateTime must be a Date');
      expect(() => DateTimeScalar.serialize(null as any)).toThrow('DateTime must be a Date');
    });
  });

  describe('parseValue', () => {
    it('parses an ISO string into a Date', () => {
      const iso = '2026-01-24T10:15:30.123Z';
      const result = DateTimeScalar.parseValue(iso) as Date;
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe(iso);
    });

    it('throws if value is not a string', () => {
      expect(() => DateTimeScalar.parseValue(123 as any)).toThrow('DateTime must be a string');
      expect(() => DateTimeScalar.parseValue(new Date() as any)).toThrow(
        'DateTime must be a string'
      );
      expect(() => DateTimeScalar.parseValue(null as any)).toThrow('DateTime must be a string');
    });
  });

  describe('parseLiteral', () => {
    it('parses a STRING literal AST node into a Date', () => {
      const iso = '2026-01-24T10:15:30.123Z';
      const ast = { kind: Kind.STRING, value: iso } as any;
      const result = DateTimeScalar.parseLiteral(ast) as Date;

      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe(iso);
    });

    it('returns null for non-STRING literals', () => {
      const nullAst = { kind: Kind.NULL } as any;
      expect(DateTimeScalar.parseLiteral(nullAst)).toBeNull();
    });

    it('throws for invalid date strings', () => {
      expect(() => DateTimeScalar.parseValue('not-a-date' as any)).toThrow(
        'DateTime must be a valid ISO date string'
      );
    });

    it('returns null for invalid STRING literals', () => {
      const ast = { kind: Kind.STRING, value: 'not-a-date' } as any;
      expect(DateTimeScalar.parseLiteral(ast)).toBeNull();
    });

    it('throws for Invalid Date objects', () => {
      const bad = new Date('not-a-date');
      expect(() => DateTimeScalar.serialize(bad)).toThrow('DateTime must be a valid Date');
    });

    it('parses an INT literal as epoch milliseconds (optional feature)', () => {
      const ast = { kind: Kind.INT, value: '1769200436954' } as any;
      const d = DateTimeScalar.parseLiteral(ast) as Date;
      expect(d).toBeInstanceOf(Date);
      expect(d.getTime()).toBe(1769200436954);
    });
  });
});
