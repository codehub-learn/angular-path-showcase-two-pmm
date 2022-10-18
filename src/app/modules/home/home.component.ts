import {Component, OnInit} from '@angular/core';
import {JokeApiService} from "../../services/joke-api.service";
import {Joke} from "../../shared/domain/joke";
import {catchError, Observable, of} from "rxjs";
import {JokePublisherService} from "../../services/joke-publisher.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jokeFromApi!: Joke;
  joke$!: Observable<Joke>;

  constructor(private jokeApiService: JokeApiService, private jokePublisherService: JokePublisherService) {
  }

  ngOnInit(): void {
    this.fetchDataFromApi();
    this.joke$ = this.jokeApiService.get();
  }

  submitJoke() {
    this.jokePublisherService.publishJoke(this.jokeFromApi);
    this.fetchDataFromApi();
    console.log("joke published...");
  }

  fetchDataFromApi() {
    this.jokeApiService.get()
      .pipe(
        catchError(err => {
          console.log("error in component");
          return of(new Joke("error", "error category"));
        }))
      .subscribe(joke => this.jokeFromApi = joke);
  }

}
