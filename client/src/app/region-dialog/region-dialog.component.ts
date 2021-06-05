
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.css']
})
export class RegionDialogComponent implements OnInit {


  //public checkForm: FormGroup;

  @Input() regionName: string;
  @Output() closeEmiter = new EventEmitter<boolean>();
  @Output() closeEmiter2 = new EventEmitter<boolean>();
  @Output() closeEmiter3 = new EventEmitter<boolean>();
  public regionNamePravo : string;

  constructor() {

  }

  public close() : void {
    this.closeEmiter.emit(true);
  }

  ngOnInit(): void {
    console.log(this.regionName)
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

  public showFunFacts() {
    this.closeEmiter2.emit(true);
  }

  public showComments() {
    this.closeEmiter3.emit(true);
  }

}
