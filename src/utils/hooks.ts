export const convert_Time = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return hours > 0 ? `${hours} hours ${minutes} minutes` : `${minutes} minutes`;
};
export const convertTime = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return hours > 0 ? `${hours}h${minutes}m` : `${minutes} minutes`;
};

export const formatDate = (date: string) => {
  const _date = new Date(date);
  const day = _date.getDate();
  const month = _date.getMonth() + 1;
  const year = _date.getFullYear();
  return day + '/' + month + '/' + year;
};

interface MovieData {
  Movie_Id: string;
  Movie_Name: string;
  Poster: string;
  Categories: string;
  Duration: number;
  Language: string;
  Censorship: number;
  Release: string;
  Description: string;
  Person_Name: string;
  character: string;
  image: string | null;
}

interface FormattedMovieData {
  Movie_Id: string;
  Movie_Name: string;
  Poster: string;
  Categories: string;
  Duration: number;
  Language: string;
  Censorship: number;
  Release: string;
  Description: string;
  Director: string[];
  imageDirector: (string | null)[];
  Actor: string[];
  imageActor: (string | null)[];
}

export function transformDataMovie(data: MovieData[]): FormattedMovieData {
  const formattedData: FormattedMovieData = {
    Movie_Id: data[0].Movie_Id,
    Movie_Name: data[0].Movie_Name,
    Poster: data[0].Poster,
    Categories: data[0].Categories,
    Duration: data[0].Duration,
    Language: data[0].Language,
    Censorship: data[0].Censorship,
    Release: data[0].Release,
    Description: data[0].Description,
    Director: [],
    imageDirector: [],
    Actor: [],
    imageActor: [],
  };

  data.forEach((item) => {
    if (item.character === 'Director') {
      formattedData.Director.push(item.Person_Name);
      formattedData.imageDirector.push(item.image);
    } else if (item.character === 'Actor') {
      formattedData.Actor.push(item.Person_Name);
      formattedData.imageActor.push(item.image);
    }
  });

  return formattedData;
}
