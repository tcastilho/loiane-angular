import { Directive, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    /* this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'backgroundColor',
      'yellow'
    ); */
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    /* this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'backgroundColor',
      'white'
    ); */
    this.backgroundColor = 'white';
  }

  // @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostBinding('style.backgroundColor') get setColor() {
    return this.backgroundColor;
  }

  private backgroundColor: string;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer
    ) { }

}
