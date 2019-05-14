import { Component } from '@angular/core';

import { InputPropertyComponent } from './input-property.component'

@Component({
    moduleId: module.id,
    selector: 'exemplo-data-binding',
    templateUrl: 'data-binding.component.html',
    styleUrls: ['data-binding.component.css'],
    directives: [InputPropertyComponent]
})

export class DataBindingComponent {
    constructor() { }

    url = 'http://loiane.com'
    urlImg = 'http://lorempixel.com/400/200/nature/'

    conteudoAtual : string = '';
    conteudoSalvo : string = '';
    isMouseOver : boolean = false;

    nome : string = '';

    pessoa : object = {
        nome: '',
        idade: 18
    };

    nomeCurso : string = 'Curso Angular 2';

    getValor() {
        return 1;
    }

    onClick() {
        alert('Botão clicado!');
    }

    onKeyup(event:KeyboardEvent) {
        console.log(event);
        this.conteudoAtual = (<HTMLInputElement>event.target).value;
    }

    onSave(valor : string) {
        this.conteudoSalvo = valor;
    }

    onMouseSpan() {
        this.isMouseOver = !this.isMouseOver;
    }
}