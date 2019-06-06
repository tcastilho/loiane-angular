import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModelService } from 'src/app/shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];

  // bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado: Curso;

  constructor(
    private modalService: BsModalService,
    private service: CursosService,
    private alertService: AlertModelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
          this.handleError();
          return empty();
        })
      );

    /* this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(dados => {
        console.log(dados);
      }// ,
      //   error => console.log(error),
      //   () => console.log('Observable completo')
      ); */
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar curso. Tente novamente mais tarde');
    /* this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar curso. Tente novamente mais tarde'; */

  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.deletar(curso) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        }
      );
  }

  onConfirmDelete() {
    this.service
      .deletar(this.cursoSelecionado)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde');
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
