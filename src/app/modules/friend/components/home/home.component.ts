import { Component } from '@angular/core';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { Friend } from '../../models/friend';
import { FriendService } from '../../services/friend.service';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';
import { AcceptFriend } from '../../models/accept-friend';
import { AddFriend } from '../../models/add-friend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  addFriendLink: string = frontEndUrl.addFriend.url;
  friends: Array<Friend> = [];

  constructor(
    private friendService: FriendService,
    private userInformation: UserInformationImp
  ) {}
  
  ngOnInit() {
    this.friendService.findFriendsByUserId(this.userInformation.getUserInformation().id).subscribe(res=> {
      console.log(this.friends)
      this.friends = res.friends;
      console.log(this.friends)
      
    });  
  }

  deleteFriend(deleteFriend: Friend) {
    this.friendService.deleteFriendByFriendId(deleteFriend.friendId).subscribe(res=>{
      if( typeof res != 'boolean') {        
        this.friends = this.friends.filter(friend=>friend.friendId != deleteFriend.friendId);        
      }
    });
  }

  acceptFriend(acceptFriend: AcceptFriend) {
    this.friendService.acceptFriend(acceptFriend).subscribe();
  }

  
  addFriend(addFriend: AddFriend){
    this.friendService.addFriend(addFriend).subscribe();
  }
}
