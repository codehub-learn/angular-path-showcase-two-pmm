import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {Joke} from "../shared/domain/joke";

@Injectable({
  providedIn: 'root'
})
export class JokePublisherService {

  private jokeSubject = new ReplaySubject<Joke>();

  constructor() { }

  publishJoke(joke: Joke){
    this.jokeSubject.next(joke);
  }

  listenForJokes(){
    return this.jokeSubject.asObservable();
  }

  resetSubject(){
    this.jokeSubject = new ReplaySubject<Joke>();
  }
}
