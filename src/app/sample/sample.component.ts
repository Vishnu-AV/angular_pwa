import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit {
  contact$: any;
  users: any;
  userStatus: any;
  currnt: any;
  listUsers$: any;
  constructor(private comm: CommunicationService) {}

  ngOnInit() {
    // example 1
    this.users = ['ramj', 'raj', 'man', 'map'];
    this.contact$ = of(this.users);
    this.contact$.subscribe((data: any) => {
      this.currnt = data;
    });
    console.log(this.contact$);

    // example 2
    new Observable((obs) => {
      setTimeout(() => {
        obs.next('In progress');
      }, 2000);
      setTimeout(() => {
        obs.next('Pending');
      }, 4000);
      setTimeout(() => {
        obs.next('Completed');
      }, 6000);
    }).subscribe(
      (data) => {
        this.userStatus = data;
      },
      (err) => {
        console.log(err);
      }
    );

    // example 3
    this.comm.getUser().subscribe((data) => {
      this.listUsers$ = data;
    }, (err) => {
      console.log(err);
    });
  }
}
