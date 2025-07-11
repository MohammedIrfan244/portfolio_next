export interface INavigation {
    id: string;
  name: string;
  value: string;
}

export interface IDep{
  id:string;
  color:string;
  tool:string;
}

export interface IProject {
  id: string;
  title: string;
  video: string;
  cover: string;
  dep:IDep[];
  github: string;
  live: string;
}