import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { RegionService } from './../services/region.service'
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

  constructor(private http : HttpClient,private fb: FormBuilder, private regionService : RegionService) {


  }

  public close() : void {
    this.closeEmiter.emit(true);
  }

  ngOnInit(): void {
  }

  public showFunFacts() {
    this.closeEmiter2.emit(true);
  }

  public showComments() {
    this.closeEmiter3.emit(true);
  }

}
