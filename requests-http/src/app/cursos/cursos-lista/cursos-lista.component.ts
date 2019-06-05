import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) { }

  ngOnInit() {
    // this.service.list().subscribe(dados => this.cursos = dados);
    /* this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.error$.next(true);
          return empty();
        })
      ); */
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.error$.next(true);
          return empty();
        })
      );

    this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(dados => {
        console.log(dados);
      }// ,
      //   error => console.log(error),
      //   () => console.log('Observable completo')
      );
  }

}
