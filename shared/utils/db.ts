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

export interface Attendances {
  id?: number;
  month: Date,
  list: [
    {
      date: Date;
      workingTime?: number;
      breakingTime?: number;
      realWorkingTime?: number;
      memo?: string;
    }
  ];
}

export class MySubClassedDexie extends Dexie {
  works!: Table<Works>;
  breaks!: Table<Breaks>;
  attendances!: Table<Attendances>;

  constructor() {
    super("kintaiManagerDatabase");
    this.version(1).stores({
      works: "++id, startedAt, finishedAt, memo",
      breaks: "++id, startedAt, finishedAt, workId",
      attendances: "++id, month, list"
    });
  }
}

export const db = new MySubClassedDexie();
