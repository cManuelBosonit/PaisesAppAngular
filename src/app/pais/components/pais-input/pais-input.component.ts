import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounce, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder = '';

  dbouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
    this.dbouncer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      this.onDebounce.emit( valor )
    })
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    
    this.dbouncer.next( this.termino );
  }
  
}
