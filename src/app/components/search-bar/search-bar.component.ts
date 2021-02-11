import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  @Input() val:any;
  @Output() onValueChanged: EventEmitter<any>=new EventEmitter<any>();
  @Output() onClickingCross: EventEmitter<any>=new EventEmitter<any>();
  isNotSearching=true;
  ngOnInit(): void {

  }
  removeList(event:any){
    console.log("it should work");
    this.val="";
    this.onClickingCross.emit(event);
  }
  
  filterItem(event:any){
    this.isNotSearching=false;
    this.onValueChanged.emit(event);
  }
 
}
