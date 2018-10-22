import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PlayersService } from '../_service/players.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  errorMessage;
  showPlayerDetails = false;
  player;
  sub: any;
  playerForm: FormGroup;
  hideloadedform = true;
  submittedSuccess = '';
  submittedFailure = '';
  isReadOnly = true;

  @Input() globalUserRole: string;
  isAdmin = false;

  playerForm1: FormGroup;

  constructor(private _route: ActivatedRoute, private _playersService: PlayersService, private formBuilder: FormBuilder) {
    this.playerForm = formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      role: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.playerForm1 = formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      role: ['', Validators.required],
      photo: ['/assets/images/profile_default.jpg']
    });
  }

  ngOnInit() {
    if (this.globalUserRole === 'admin') {
      this.isAdmin = true;
    }
    console.log(this.globalUserRole, this.isAdmin);
    this.sub = this._route.params.subscribe((params) => {
      this._playersService.getPlayerByID(params.id).
        subscribe(
          (data) => {
            this.player = data;
            this.showPlayerDetails = true;
          },
          (error) => this.errorMessage = error
        );
    });
  }

  edit() {
    if (this.isAdmin) {
      this.isReadOnly = false;
    }
  }

  addnewplayer() {
    this.hideloadedform = !this.hideloadedform;
  }

  addPlayer(data) {
    if (this.playerForm1.valid) {
      this._playersService.addPlayer(data)
        .subscribe(
          () => {
          this.submittedSuccess = 'Player Added Successfully';
        },
        (error) => this.submittedFailure = error
      );
    }
  }

  updatePlayer(data) {console.log(data);
    if (this.playerForm.valid) {
      this._playersService.updatePlayer(data, this.player._id['$oid'])
        .subscribe(
          () => {
          this.submittedSuccess = 'Player Updated Successfully';
        },
        (error) => this.submittedFailure = error
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
