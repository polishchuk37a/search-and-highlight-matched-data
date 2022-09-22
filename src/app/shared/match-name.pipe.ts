import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchName'
})
export class MatchNamePipe implements PipeTransform {

  transform(value: string, args: string): string {
    const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
    if (startIndex !== -1) {
      const matching = value.substr(startIndex, args.length);

      return value.replace(matching, "<span class='highlight'>" + matching + '</span>');
    }

    return value;
  }
}
