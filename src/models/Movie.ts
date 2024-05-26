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
  imageDirectors: Array<any>;
  actors: Array<any>;
  imageActors: Array<any>;
  isLoading: boolean;

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
    this.imageDirectors = args.imageDirectors ?? [];
    this.actors = args.actors ?? [];
    this.imageActors = args.imageActors ?? [];
    this.isLoading = args.imageActors ?? true;
  }
}
