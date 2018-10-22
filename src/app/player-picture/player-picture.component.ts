import { PlayersService } from './../_service/players.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-picture',
  templateUrl: './player-picture.component.html',
  styleUrls: ['./player-picture.component.scss']
})
export class PlayerPictureComponent implements OnInit {
  public errorMessage;
  public player;

  public photoStyle = {
    width: '200px',
    height: '200px'
  };

  constructor(private _route: ActivatedRoute, private _playersService: PlayersService) { }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this._playersService.getPlayerByID(params.id).
        subscribe(
          (data) => {
            this.player = data;
            console.log('player', this.player);
          },
          (error) => this.errorMessage = error
        );
    });
  }

  openCloseDock() {
    if (window.name === 'playerpic') {
      window.close();
    } else {
      window.open('/playerpic/' + this.player._id['$oid'], 'playerpic', 'width = 300, height = 300');
    }
  }

}
