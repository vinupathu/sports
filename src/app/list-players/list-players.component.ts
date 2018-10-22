import { PlayersService } from '../_service/players.service';
import { Component, OnInit, HostListener, Input } from '@angular/core';
import { tap, skipWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.scss']
})
export class ListPlayersComponent implements OnInit {
  data = [];
  players = {};
  categories = [];
  currentCategory = 'country';
  errorMessage;
  deleteId;
  submittedSuccess;
  submittedFailure;
  interval;

  public httpReqestInProgress = false;
  private currentPage = 0;

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  @Input() globalUserRole: string;
  isAdmin = false;

  constructor(private _playersService: PlayersService, private http: HttpClient) { }

  ngOnInit() {
    if (this.globalUserRole === 'admin') {
      this.isAdmin = true;
    }
    // this.listPlayers();
    this.refreshData();
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
        this.currentPage = 0;
        this.data = [];
        this.refreshData();
    }, 30000);
  }

  refreshData() {
    this.listPlayers(
      this.currentPage++,
      (data) => {
        this.data = this.data.concat(data);
        this.groupPlayers(this.currentCategory);
      });
  }

  onrightClick(event, deleteId) {
    if (!this.isAdmin) { return false; }
    event.preventDefault();
    this.contextmenuX = event.clientX - 80;
    this.contextmenuY = event.clientY - 110;
    this.contextmenu = true;
    this.deleteId = deleteId;
  }
  disableContextMenu() {
    this.contextmenu = false;
  }

  deletePlayer(id) {
    this._playersService.deletePlayer(id)
      .subscribe(
        () => {
        this.submittedSuccess = 'Player Deleted Successfully';
      },
      (error) => this.submittedFailure = error
    );
  }
  @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
        this.disableContextMenu();
    }

  public onScrollDown(): void {console.log(this.currentPage);
    this.listPlayers(
      this.currentPage++,
      (data) => {
        this.data = this.data.concat(data);
        this.groupPlayers(this.currentCategory);
      });
  }

  listPlayers(page: number = 1, saveResultsCallback: (data) => void) {
    /* this._playersService.getPlayers().
    subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        this.groupPlayers('country');
      },
      (error) => this.errorMessage = error
    );*/
    return this._playersService.getLazyPlayers(page).pipe(
      skipWhile(() => this.httpReqestInProgress),
      tap(() => { this.httpReqestInProgress = true; })
    ).subscribe((data: any[]) => {
        // this.currentPage++;
        saveResultsCallback(data);
        this.httpReqestInProgress = false;
      });
  }

  groupPlayers(category) {
    this.currentCategory = category;
    const playersObj = {};
    this.data.forEach(function(player) {
      playersObj[player[category]] = playersObj[player[category]] || [];
      playersObj[player[category]].push(player);
    });
    this.categories = Object.keys(playersObj);
    this.players = Object.values(playersObj);
  }

}
