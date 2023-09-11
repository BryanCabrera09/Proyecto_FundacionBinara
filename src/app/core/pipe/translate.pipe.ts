import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslatorService } from 'src/app/shared/services/translator.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslatorService) { }

  transform(value: string): Observable<string> {

    if (typeof value !== 'string') {
      value = value = '';
    }
    return this.translateService.translateText(value);
  }
}
