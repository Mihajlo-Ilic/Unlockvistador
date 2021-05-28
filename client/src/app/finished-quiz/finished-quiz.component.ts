import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finished-quiz',
  templateUrl: './finished-quiz.component.html',
  styleUrls: ['./finished-quiz.component.css']
})
export class FinishedQuizComponent implements OnInit {
  @Output() closeEmitter3 = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public close() : void {
    console.log("Izlazim iz ovoga!");
    this.closeEmitter3.emit(true);
  }

}
