import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  accessToken = "201336971937014";

  currentHero: any;

  currentId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  next() {
    console.log("Calling next item");

    const id = this.route.snapshot.paramMap.get("id");

    const num = Number(id) + 1;

    // this.router.navigateByUrl(['/hero',]);
    this.router.navigate(['/hero', num]);

    this.currentId = num;

    this.ngOnInit();

  }

  previous() {
    console.log("Calling previous item");

    const id = this.route.snapshot.paramMap.get("id");

    const num = Number(id) - 1;

    // this.router.navigateByUrl(['/hero',]);
    this.router.navigate(['/hero', num]);

    this.currentId = num;

    this.ngOnInit();

  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get("id");

    if (this.currentId == null) {
      this.http.get("https://www.superheroapi.com/api.php/" + this.accessToken + "/" + id).subscribe(
        (res) => {
          this.currentHero = res;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.http.get("https://www.superheroapi.com/api.php/" + this.accessToken + "/" + this.currentId).subscribe(
        (res) => {
          this.currentHero = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }

}
