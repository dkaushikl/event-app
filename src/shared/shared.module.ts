import { DateFormatPipe } from './pipes';
import { NumberOnlyDirective, RandomColorDirective, AlphabetOnlyDirective } from './directive';
import { NgModule } from '@angular/core';

const pipes = [DateFormatPipe];

const directives = [NumberOnlyDirective, AlphabetOnlyDirective, RandomColorDirective
];

@NgModule({
  imports: [
  ],
  declarations: [...pipes, ...directives],
  exports: [
    ...pipes,
    ...directives,
  ],
})

export class SharedModule { }
