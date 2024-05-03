class MovieModel {
  id: string;
  name: string;
  duration: number;
  censorship: number;
  language: string;
  release: string;
  expiration: string;
  description: string;
  poster: string;
  categories: string;
  directors: Array<any>;
  actors: Array<any>;

  constructor(args: any) {
    this.id = args.id ?? null;
    this.name = args.name ?? '';
    this.duration = args.duration ?? 0;
    this.censorship = args.censorship ?? 0;
    this.language = args.language ?? '';
    this.release = args.release ?? '';
    this.expiration = args.expiration ?? '';
    this.description = args.description ?? '';
    this.poster = args.poster ?? '';
    this.categories = args.categories ?? '';
    this.directors = args.directors ?? [];
    this.actors = args.actors ?? [];
  }
}
