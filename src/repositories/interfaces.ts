export interface Repository<T> {
  all(): Promise<T[]>;
  findByDate(date: Date): Promise<boolean>;
  create(input: Omit<T, "id">): Promise<T>;
}
