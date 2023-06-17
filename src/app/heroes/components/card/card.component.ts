import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles:[]
})
export class CardComponent {

  @Input()
    public hero!:Hero


}
