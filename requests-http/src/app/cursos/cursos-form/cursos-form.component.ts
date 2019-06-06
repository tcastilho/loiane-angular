import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CursosService } from '../cursos.service';
import { AlertModelService } from 'src/app/shared/alert-model.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, concatMap, mergeMap, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModelService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    /* this.route.params.subscribe((params: any) => {
      const id = params['id'];
      const curso$ = this.service.loadByID(id);
      curso$.subscribe(curso => {
        this.updateForm(curso);
      });
    }); */

    /* this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.service.loadByID(id))
      )
      .subscribe(curso => this.updateForm(curso)); */

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  /* updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  } */

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSucesso = 'Curso criado com sucesso!';
      let msgErro = 'Erro ao atualizar curso, tente novamente';
      if (this.form.value.id) {
        msgSucesso = 'Curso atualizado com sucesso!';
        msgErro = 'Erro ao atualizar curso, tente novamente';
      }

      this.service
        .save(this.form.value)
        .subscribe(
          success => {
            this.modal.showAlertSuccess(msgSucesso);
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger(msgErro);
          }
        );

      /* if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso atualizado com sucesso!');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente'),
          () => console.log('req completed')
        );
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
          () => console.log('req completed')
        );
      } */
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('cancel');
  }

}
