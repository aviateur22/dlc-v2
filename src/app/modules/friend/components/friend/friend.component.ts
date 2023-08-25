import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend } from '../../models/friend';
import { FriendService } from '../../services/friend.service';
import { AcceptFriend } from '../../models/accept-friend';
import { AddFriend } from '../../models/add-friend';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {
  @Input() friend!: Friend;
  @Output() deleteFriendEmitter: EventEmitter<Friend> = new EventEmitter<Friend>();
  @Output() acceptFriendEmitter: EventEmitter<AcceptFriend> = new EventEmitter<AcceptFriend>();
  @Output() addFriendEmitter: EventEmitter<AddFriend>= new EventEmitter<AddFriend>();

  isAcceptFriendButtonVisible: boolean = false;
  isAddFriendButtonVisible: boolean = false;

  isAddFriendButtonDisable: boolean = false;
  isAcceptFriendButtonDisable: boolean = false;

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.isAcceptFriendButtonVisible = this.friend.isFriendRequestNew && !this.friend.isFriendRequestAccepted;
    this.isAddFriendButtonVisible = this.friend.isRelationDeleted;
  }

  deleteFriend(){    
    this.deleteFriendEmitter.emit(this.friend);
  }

  addFriend() {
    this.isAddFriendButtonDisable = true;

    const addFriend: AddFriend = {
      email: this.friend.email
    }

    this.addFriendEmitter.emit(addFriend);

    this.isAddFriendButtonVisible = false;
  }

  acceptFriend() {
    this.isAcceptFriendButtonDisable = true;

    const acceptFriend: AcceptFriend = {
      friendId: this.friend.friendId,
      isFriendRequestAccepted: true
    }

    this.isAcceptFriendButtonVisible = false;

    this.acceptFriendEmitter.emit(acceptFriend);    
  }

}
