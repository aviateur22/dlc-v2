import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

import { Friend } from '../models/friend';
import { FlashMessageService } from 'src/app/services/flash-message.service';
import { AddFriend } from '../models/add-friend';
import { AddFriendResponse } from '../models/implementation/AddFriendResponse';

import frontEndUrl from 'src/app/utils/frontEndUrl';
import endPointsApi from 'src/app/utils/endPointsApi';
import { FindFriendResponse } from '../models/implementation/FindFriendsResponse';
import { DeleteFriendResponse } from '../models/implementation/DeleteFriendResponse';
import { AcceptFriend } from '../models/accept-friend';
import { AcceptFriendResponse } from '../models/implementation/AcceptFriendResponse';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessageService: FlashMessageService
  ) { }

  friends: Array<Friend> = [];

  findFriendsByUserId(userId: number): Observable<FindFriendResponse> {
    return this.http.get<FindFriendResponse>(endPointsApi.uri + endPointsApi.findFriendsByUserId.url.replace(':userId', userId.toString())).pipe(     
      catchError(()=>{        
        return [];
      })
    )
  }

  addFriend(friend: AddFriend):Observable<AddFriendResponse> {
    console.log(friend);
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<AddFriendResponse>(endPointsApi.uri + endPointsApi.addFriend.url, friend).pipe(
      tap(res=>{
        this.flashMessageService.updateFlashMessage({
          isError: false,
          message: res.message
        });        
        this.router.navigate([frontEndUrl.friendHome.url]);
      })
    )
  }

  deleteFriendByFriendId(friendId: number): Observable<DeleteFriendResponse|boolean> {
    return this.http.delete<DeleteFriendResponse>(endPointsApi.uri + endPointsApi.deleteFriendByFriendId.url.replace(":friendId", friendId.toString())).pipe(
      tap((res)=>{
        this.flashMessageService.updateFlashMessage({
          isError: false,
          message: res.message
        })        
      }),
      catchError(()=>{
        return of (false);
      })
    );
  }

  acceptFriend(acceptFriend: AcceptFriend): Observable<AcceptFriendResponse|boolean> {
    return this.http.put<AcceptFriendResponse>(endPointsApi.uri + endPointsApi.acceptFriend.url, acceptFriend).pipe(
      tap((res)=>{
        this.flashMessageService.updateFlashMessage({
          isError: false,
          message: res.message
        })        
      }),
      catchError(()=>{
        return of (false);
      })
    );
  }
}
