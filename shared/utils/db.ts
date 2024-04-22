import Dexie, { Table } from "dexie";

export interface Works {
  id?: number;
  startedAt: Date;
  finishedAt?: Date;
  memo?: string;
}

export interface Breaks {
  id?: number;
  startedAt: Date;
  finishedAt?: Date;
  workId: number;
}

export class MySubClassedDexie extends Dexie {
  works!: Table<Works>;
  breaks!: Table<Breaks>;

  constructor() {
    super('kintaiManagerDatabase');
    this.version(1).stores({
      works: '++id, startedAt, finishedAt, memo',
      breaks: '++id, startedAt, finishedAt, workId',
    });
  }
}

export const db = new MySubClassedDexie();