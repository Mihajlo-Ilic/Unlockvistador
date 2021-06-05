import { Region } from './../models/region.model';
import { RegionService } from './../services/region.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fun-facts',
  templateUrl: './fun-facts.component.html',
  styleUrls: ['./fun-facts.component.css']
})
export class FunFactsComponent implements OnInit {

  @Input() regionName : string;
  @Output() closeEmiter = new EventEmitter<boolean>();
  public funFact : String;
  public regionPicture : String;

  constructor(private http : HttpClient,private regionService : RegionService) {

  }


// style = "background-image: url('../../assets/images/unnamed.png');"
  ngOnInit(): void {
    const sub = this.regionService.getRegionFacts(this.regionName).subscribe(e => {
      this.funFact = e.fact;
      this.regionPicture = e.picture;
      console.log(e.picture);
      let elem = document.getElementById("ui-grid");
      elem.setAttribute("style", "background-image: url('../../assets/images/region/" +  this.regionPicture +".jpg');");
    });
    if(this.regionName === "Nisava"){
      this.regionName = "Jugoistočna Srbija"
    } else if(this.regionName === "Backa"){
      this.regionName = "Bačka"
    } else if(this.regionName === "Kosovo"){
      this.regionName = "Kosovo i Metohija"
    } else if(this.regionName === "Raska"){
      this.regionName = "Raška"
    } else if(this.regionName === "Sumadija"){
      this.regionName = "Šumadija"
    } else if(this.regionName === "Istok"){
      this.regionName = "Istočna Srbija"
    }
  }

  close() : void {
    this.closeEmiter.emit(true);
  }

}
