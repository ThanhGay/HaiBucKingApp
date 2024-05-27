class TicketModel {
  invoiceId: number;
  movieId: string;
  movieName: string;
  duration: number;
  categories: string;
  poster: string;
  invoiceDate: string;
  seats: Array<any>;
  room: string;
  amount: number;
  showtime: any;

  constructor(args: any) {
    this.invoiceId = args.invoiceId ?? -1;
    this.movieId = args.movieId ?? '';
    this.movieName = args.movieName ?? '';
    this.duration = args.duration ?? 0;
    this.categories = args.categories ?? '';
    this.poster = args.poster ?? '';
    this.invoiceDate = args.invoiceDate ?? '';
    this.seats = args.seats ?? [];
    this.room = args.room ?? '';
    this.amount = args.amount ?? 0;
    this.showtime = args.showtime ?? '';
  }
}
