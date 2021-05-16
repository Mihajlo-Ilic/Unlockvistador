import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fun-facts',
  templateUrl: './fun-facts.component.html',
  styleUrls: ['./fun-facts.component.css']
})
export class FunFactsComponent implements OnInit {

  constructor() {
    console.log("Napravljen sam!")
  }

  ngOnInit(): void {
  }

}
