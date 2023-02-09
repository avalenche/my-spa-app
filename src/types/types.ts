export enum TECH {
  CSS = "css",
  HTML = "html",
  REACTJS = "reactjs",
}

export type TCandidate = {
  id: number;
  name: string;
  surname: string;
  tech?: TECH[];
  about?: string;
  addDate: string;
}

