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



  ngOnInit(): void {
    const sub = this.regionService.getRegionFacts(this.regionName).subscribe(e => {
      this.funFact = e.fact;
      this.regionPicture = "./assets/images/region/" + e.picture +".jpg";
      console.log(this.regionPicture);
    });
  }

  close() : void {
    console.log("Iz klose emitera: " + this.regionPicture);
    console.log("LOOOOOOOOOOOOOG");
    this.closeEmiter.emit(true);
  }

}
