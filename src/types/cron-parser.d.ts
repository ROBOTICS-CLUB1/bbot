declare module "cron-parser" {
  interface CronDate {
    toDate(): Date;
  }

  interface CronExpression {
    next(): CronDate;
    prev(): CronDate;
  }

  interface ParseOptions {
    utc?: boolean;
    currentDate?: Date;
    startDate?: Date;
    endDate?: Date;
    iterator?: boolean;
    tz?: string;
  }

  function parseExpression(
    expression: string,
    options?: ParseOptions,
  ): CronExpression;

  export { parseExpression, CronExpression, CronDate, ParseOptions };
}
