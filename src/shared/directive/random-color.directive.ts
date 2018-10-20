import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})

export class RandomColorDirective {
  colorArray = ['teal', 'lightred', 'blue', 'yellow', 'red', 'orange', 'green', 'indigo'];

  constructor(renderer: Renderer, el: ElementRef) {
    const className = this.colorArray[Math.floor(Math.random() * 9)];
    renderer.setElementClass(
      el.nativeElement,
      className === undefined ? 'teal' : className,
      true
    );
  }
}
