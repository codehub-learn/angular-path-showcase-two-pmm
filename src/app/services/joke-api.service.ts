import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Joke} from "../shared/domain/joke";

@Injectable({
  providedIn: 'root'
})
export class JokeApiService {

  private baseUrl: string = "https://v12.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

  constructor(private http: HttpClient) {
  }

  get(): Observable<Joke> {
    return this.http.get(this.baseUrl).pipe(
      map((response: any) => {
        return new Joke(response.joke, response.category);
      }),
      /*catchError(err => {
        console.log("error occurred...", err)
        return of(new Joke("error", "error category"));
      })*/
      catchError(err => {
        console.log("error occurred...", err)
        return throwError(err);
      })
    );
  }
}
