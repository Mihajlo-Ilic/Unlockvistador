import { Router, ActivatedRoute } from '@angular/router';
import { ModelForAddingQuestionsComponent } from './../model-for-adding-questions/model-for-adding-questions.component';
import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    clickedRegion  = null;
    localUserName = null;

  	constructor(private rout : ActivatedRoute) {
      this.localUserName = this.rout.snapshot.params.username
      console.log(this.localUserName)
    }

  	ngOnInit(): void {
  	}

  	public sendGetReq(ime_oblasti) {

    }

    public openAdderQuestion(ime_oblasti) {

      // otvoriti adderquestion ako je user admin za neku oblast!

    }

    public clickHandlerBanat() {
      this.clickedRegion = "Banat"
      alert("KLIK")
    }
    public mouseOverHandlerBanat() {

    }
    public mouseOutHandlerBanat() {

    }

    public clickHandlerBacka() {

    }
    public mouseOverHandlerBacka() {

    }
    public mouseOutHandlerBacka() {

    }

    public clickHandlerSrem() {

    }
    public mouseOverHandlerSrem() {

    }
    public mouseOutHandlerSrem() {

    }

    public clickHandlerBeograd() {

    }
    public mouseOverHandlerBeograd() {

    }
    public mouseOutHandlerBeograd() {

    }

    public clickHandlerIstok() {
      }
    public mouseOverHandlerIstok() {

    }
    public mouseOutHandlerIstok() {

    }

    public clickHandlerSumadija() {

    }
    public mouseOverHandlerSumadija() {

    }
    public mouseOutHandlerSumadija() {

    }

    public clickHandlerNisava() {

    }
    public mouseOverHandlerNisava() {

    }
    public mouseOutHandlerNisava() {

    }

    public clickHandlerRaska() {

    }
    public mouseOverHandlerRaska() {

    }
    public mouseOutHandlerRaska() {

    }

    public clickHandlerKosovo() {

    }
    public mouseOverHandlerKosovo() {

    }
    public mouseOutHandlerKosovo() {
    }

}
