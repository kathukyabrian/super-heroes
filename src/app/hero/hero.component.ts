import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  // put into a variable to avoid redundancy
  accessToken = "201336971937014";

  currentHero: any;

  currentId: number | undefined;

  constructor(
    // we are creating an instance of ActivatedRoute
    // so that we can use it to get the id from the url
    private route: ActivatedRoute,

    // we are creating an instance of HttpClient
    // so that we can make http requests
    private http: HttpClient,

    // we are creating an instance of Router 
    // so that we can route by url
    private router: Router
  ) { }

  next() {
    console.log("Calling next item");

    const id = this.route.snapshot.paramMap.get("id");

    const num = Number(id) + 1;

    // navigate -> reload -> remounting of the component
    this.router.navigate(['/hero', num]);

    // we save the currentId so that we know the basis of the reload
    this.currentId = num;

    // we call -> we can make an API call again 
    this.getSuperHero();

  }

  previous() {

    // same logic as next - -1
    console.log("Calling previous item");

    const id = this.route.snapshot.paramMap.get("id");

    const num = Number(id) - 1;

    // this.router.navigateByUrl(['/hero',]);
    this.router.navigate(['/hero', num]);

    this.currentId = num;

    this.getSuperHero();

  }

  getSuperHero(){

    const id = this.route.snapshot.paramMap.get("id");

    if (this.currentId == null) {
      // api call -> subscribe -> 
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

  ngOnInit(): void {
    // everytime there is a reload, this guy is called
    this.getSuperHero();
  }

}
