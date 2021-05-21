
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

  constructor() {
      
  }

  public close() : void {
    this.closeEmiter.emit(true);
  }

  ngOnInit(): void {
    console.log(this.regionName)
  }

  public showFunFacts() {
    this.closeEmiter2.emit(true);
  }

  public showComments() {
    this.closeEmiter3.emit(true);
  }

}
