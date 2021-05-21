import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Question} from '../models/question.model'
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz-component.component.html',
  styleUrls: ['./quiz-component.component.css']
})
export class QuizComponentComponent implements OnInit {

  @Input() regionName : string;
  @Output() closeEmitter = new EventEmitter<boolean>();
  public question : Question;
  public displayAnswers: string[]

  constructor(private regionService : RegionService) {
   }


  private shuffle(array : Array<any>) : Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      const tmp = array[i]
      array[i] = array[j]
      array[j] = tmp
  }  
    return array
  }

  ngOnInit(): void {
    //dohvati pitanje; odaberi tacan odgovor i 3 nasumicna netacna
    this.populateFields()
  }

  //Dodati neki osluskivac kada ova funkcija treba da se zove; 
  public populateFields() {
    this.regionService.getRegionQuestion(this.regionName).subscribe( e => {
      this.question = new Question(e._id, e.region, e.text, e.answer, e.false_answer1,
       e.false_answer2, e.false_answer3, e.false_answer4, e.false_answer5, e.false_answer6);


    this.displayAnswers = []
    //mora se naci tacan odgovor
    this.displayAnswers.push(this.question.answer)
    let false_answers = [this.question.false_answer1, this.question.false_answer2, this.question.false_answer3, 
      this.question.false_answer4, this.question.false_answer5, this.question.false_answer6]
    //nasumicna 3 pogresna odgovora
    let idxs = Array.from({length : 6}, (x, i) => i);
    
    //Fisher-Yates algoritam za ispremestanje niza
    idxs = this.shuffle(idxs)

    for (let i = 0; i < 3; i++) {
      this.displayAnswers.push(false_answers[idxs[i]])
    }

    this.displayAnswers = this.shuffle(this.displayAnswers)

    })
  }

  public checkAnswer(answer : string) {
      console.log(this.question.answer === answer);
      //TODO: dodati ovde celu funkcionalnost
  }

  public close() {
      this.closeEmitter.emit(true)
  }

}
