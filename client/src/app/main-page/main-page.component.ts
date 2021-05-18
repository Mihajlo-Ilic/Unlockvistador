import { RegionService } from './../services/region.service';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelForAddingQuestionsComponent } from './../model-for-adding-questions/model-for-adding-questions.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    clickedRegion  = null;
    localUserName = null;
    clickedShowComments = false;
    clickedShowFunFacts = false;

    currentUser = null;
    isAdminUser = false;
    unlockedRegions = []


  	constructor(private rout : ActivatedRoute, private regionService : RegionService, private userService : UserService) {
      this.currentUser = this.userService.currentUser;
      this.isAdminUser = this.currentUser.admin;
      this.unlockedRegions = this.currentUser.unlockedRegions
      console.log(this.currentUser);
      console.log(this.isAdminUser);
      console.log(this.unlockedRegions);
    }

  	ngOnInit(): void {
  	}


    public isUnlockedRegion() {
      for(let i = 0; i < this.unlockedRegions.length; i++) {
        if(this.unlockedRegions[i] == this.clickedRegion.toString()) {
          return true;
        }
      }
      return false;
    }

    public clickHandlerBanat() {
      this.clickedRegion = "Banat"

    }

    public clickHandlerBacka() {
      this.clickedRegion = "Backa"
    }

    public clickHandlerSrem() {
      this.clickedRegion = "Srem"
    }

    public clickHandlerBeograd() {
      this.clickedRegion = "Beograd"
    }

    public clickHandlerIstok() {
      this.clickedRegion = "Istok"
    }

    public clickHandlerSumadija() {
      this.clickedRegion = "Sumadija"
    }

    public clickHandlerNisava() {
      this.clickedRegion = "Nisava"
    }

    public clickHandlerRaska() {
      this.clickedRegion = "Raska"
    }

    public clickHandlerKosovo() {
      this.clickedRegion = "Kosovo"
    }
    public randomFja() : void {
      console.log(this.clickedShowFunFacts);
    }
}
