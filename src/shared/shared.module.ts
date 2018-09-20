import { DateFormatPipe } from './pipes';
import { NumberOnlyDirective } from './directive';
import { AlphabetOnlyDirective } from './directive/alphabet-only.directive';
import { NgModule } from '@angular/core';

const pipes = [DateFormatPipe];

const directives = [NumberOnlyDirective, AlphabetOnlyDirective];

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
