import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Question} from '../models/question.model'
import { RegionService } from '../services/region.service';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz-component.component.html',
  styleUrls: ['./quiz-component.component.css']
})
export class QuizComponentComponent implements OnInit {

  @Input() regionName : string;
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Output() closeEmitter2 = new EventEmitter<boolean>();
  public question : Question;
  public displayAnswers: string[];
  public answersRemaining : number;
  public triesRemaining : number;
  public regionNamePravo : string;

  constructor(private regionService : RegionService, private userService : UserService) {
    this.question = new Question("", "", "", "", "", "", "", "", "", "");
    this.answersRemaining = 5
    this.triesRemaining = 3
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
    this.triesRemaining = 3;
    this.answersRemaining = 5;
    //dohvati pitanje; odaberi tacan odgovor i 3 nasumicna netacna
    this.populateFields();
    this.regionNamePravo = this.regionName
    if(this.regionName === "Nisava"){
      this.regionNamePravo = "Jugoistočna Srbija"
    } else if(this.regionName === "Backa"){
      this.regionNamePravo = "Bačka"
    } else if(this.regionName === "Kosovo"){
      this.regionNamePravo = "Kosovo i Metohija"
    } else if(this.regionName === "Raska"){
      this.regionNamePravo = "Raška"
    } else if(this.regionName === "Sumadija"){
      this.regionNamePravo = "Šumadija"
    } else if(this.regionName === "Istok"){
      this.regionNamePravo = "Istočna Srbija"
    }
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
      //console.log(this.question.answer === answer);
    let correct = this.question.answer === answer;
    let el = document.getElementById(answer)
    if(correct){
      this.answersRemaining --;
      el.setAttribute("style", "background-color: green")
    }
    else {
      this.triesRemaining --;
      el.setAttribute("style", "background-color: red")
    }

    setTimeout(() => {
      if(this.triesRemaining === 0) {
          window.alert("Ponestalo Vam je zivota za ovu regiju! Pokrenite novi kviz...")
          this.close()
          return;
      }

      if(this.answersRemaining > 0) {
        this.populateFields()
      }
      else {
        //otkljucavanje regije
        this.userService.addRegion(this.userService.currentUser.email, this.regionName).subscribe(e => {
          this.userService.currentUser.unlockedRegions.push(this.regionName);
          this.close2();
        });

      }

      el.setAttribute("style", "background-color: rgba(255, 228, 196, 0.4);")
    }, 1000)
  }

  public close() {
      this.closeEmitter.emit(true)
  }

  public close2() {
    this.closeEmitter2.emit(true);
    console.log("DOBIO SAM KVIZ")
  }

}
