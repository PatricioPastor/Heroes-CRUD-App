import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HeroesService } from '../../services/heroes.service';

import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { filter, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'] ,
})
export class NewPageComponent implements OnInit {


  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ){}



  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe(hero => {
      if(!hero) return this.router.navigateByUrl('/')

      return this.heroForm.reset(hero)
    })
  }

  get currentHero(): Hero {

    const hero = this.heroForm.value as Hero
    return hero

  }


  submitForm() {
    // Invocar el método submit() del formulario
    if (this.heroForm.invalid) throw new Error('Form is invalid')



    if (!this.currentHero.id){
      this.heroesService.addHero(this.currentHero)
      .subscribe( heroes => {

        this.router.navigate(['/heroes/edit', heroes.id])
        this.snackBarMessage(`${heroes.superhero} added successfully`)

      })
    }

    this.heroesService.updateHero(this.currentHero)
      .subscribe(heroes => {
        this.snackBarMessage(`${heroes.superhero} updated successfully`)
  })}




  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().pipe(
      filter((result:boolean) => result),
      switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
      filter((wasDeleted:boolean) => wasDeleted)
    ).subscribe(result => {
      this.router.navigate(['/heroes']);
    });
  }


  snackBarMessage(message:string){
    this.snackbar.open(message, 'Done', {
      duration: 2500
    })
  }
}
