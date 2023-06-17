import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})

export class SearchPageComponent{
    public searchInput = new FormControl('');
    public heroes:Hero[] = [];
    public selectedHero?: Hero;

    constructor(private heroesService: HeroesService, private router: Router){}

    searchHero(){
      const value:string = this.searchInput.value || '';
      this.heroesService.searchHeroByName(value)
      .subscribe(heroes => this.heroes = heroes)
    }

    navigateToHero(hero:string){
      this.router.navigateByUrl(`heroes/${hero}`)
    }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;

  }

  }

