import { Component, OnInit } from '@angular/core';
import {JokePublisherService} from "../../services/joke-publisher.service";
import {Joke} from "../../shared/domain/joke";

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {

  jokesToBeApproved: Joke[] = [];

  constructor(private jokePublisherService: JokePublisherService) { }

  ngOnInit(): void {
    this.jokePublisherService.listenForJokes().subscribe(joke => {
      this.jokesToBeApproved.push(joke);
    });
    this.jokePublisherService.resetSubject();
  }

  removeJoke(index: number) {
    this.jokesToBeApproved.splice(index, 1);
  }
}
