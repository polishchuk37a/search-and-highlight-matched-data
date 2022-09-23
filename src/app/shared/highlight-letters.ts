import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[highlightLetters]'
})
export class HighlightLetters implements OnChanges {
  @Input() searchedValue: string;
  @Input() carName: string;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) { }

  ngOnChanges(): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.highlightLetters());
  }

  highlightLetters(): string {
    const startIndex = this.carName?.toLowerCase().indexOf(this.searchedValue)
    if (startIndex !== -1) {
      const matching = this.carName.substr(startIndex, this.searchedValue.length);

      return this.carName.replace(matching, "<span class='highlight'>" + matching + '</span>');
    }

    return this.carName;
  }

}
