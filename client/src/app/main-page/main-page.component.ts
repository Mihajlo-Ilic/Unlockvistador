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
    clickedRegionDialog = false;



    currentUser = null;
    isAdminUser = false;
    unlockedRegions = []

    regionsArray = ["Banat","Backa","Srem","Nisava","Beograd","Raska","Istok","Sumadija","Kosovo"];


  	constructor(private rout : ActivatedRoute, private regionService : RegionService, private userService : UserService) {
      this.currentUser = this.userService.currentUser;
      this.isAdminUser = this.currentUser.admin;
      this.unlockedRegions = this.currentUser.unlockedRegions

      console.log(this.currentUser);
      console.log(this.isAdminUser);
      console.log(this.unlockedRegions);
    }

  	ngOnInit(): void {
      this.initalizeMap();
  	}

    public initalizeMap() : void {
      this.unlockedRegions = this.currentUser.unlockedRegions
      console.log(this.unlockedRegions)
      for(let i = 0; i < this.regionsArray.length; i++) {
        const el = document.getElementById(this.regionsArray[i] + "ID");
        let isUnlocked = false;
        for(let j = 0; j < this.unlockedRegions.length; j++) {
          if(this.regionsArray[i] == this.unlockedRegions[j]) {
            isUnlocked = true;
          }
        }
        if(isUnlocked == false)
          el.setAttribute("style","fill:url(#diagonalHatch" + this.regionsArray[i]);
      }
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
      this.clickedRegionDialog = true;

    }

    public clickHandlerBacka() {
      this.clickedRegion = "Backa"
      this.clickedRegionDialog = true;
    }

    public clickHandlerSrem() {
      this.clickedRegion = "Srem"
      this.clickedRegionDialog = true;
    }

    public clickHandlerBeograd() {
      this.clickedRegion = "Beograd"
      this.clickedRegionDialog = true;
    }

    public clickHandlerIstok() {
      this.clickedRegion = "Istok"
      this.clickedRegionDialog = true;
    }

    public clickHandlerSumadija() {
      this.clickedRegion = "Sumadija"
      this.clickedRegionDialog = true;
    }

    public clickHandlerNisava() {
      this.clickedRegion = "Nisava"
      this.clickedRegionDialog = true;
    }

    public clickHandlerRaska() {
      this.clickedRegion = "Raska"
      this.clickedRegionDialog = true;
    }

    public clickHandlerKosovo() {
      this.clickedRegion = "Kosovo"
      this.clickedRegionDialog = true;
    }
    public randomFja() : void {
      console.log(this.clickedShowFunFacts);
    }
}
