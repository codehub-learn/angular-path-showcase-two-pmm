import { Component, OnInit } from '@angular/core';
import {JokeApiService} from "../../services/joke-api.service";
import {Joke} from "../../shared/domain/joke";
import {catchError, EMPTY, Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jokeFromApi?: Joke;
  joke$!: Observable<Joke>;

  constructor(private jokeApiService: JokeApiService) {}

  ngOnInit(): void {
    this.jokeApiService.get()
      .pipe(
        catchError(err => {
        console.log("error in component");
        return of(new Joke("error", "error category"));
      }))
      .subscribe(joke => this.jokeFromApi = joke);
    this.joke$ = this.jokeApiService.get();
  }

}
