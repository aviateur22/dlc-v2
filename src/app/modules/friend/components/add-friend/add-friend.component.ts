import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import frontEndUrl from 'src/app/utils/frontEndUrl';
import { FriendService } from '../../services/friend.service';
import { AddFriend } from '../../models/add-friend';
import { UserInformationImp } from 'src/app/helpers/UserInformationImp';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  friendHomeLink: string = frontEndUrl.friendHome.url;
  inputErrorMessage: string = "";
  userId: number = this.userInformation.getUserInformation().id;
  addFriendDataFormGroup: FormGroup = new FormGroup({});
  isSubmitButtonDisable: boolean = true;

  constructor(
    private userInformation: UserInformationImp,
    private fb: FormBuilder,
    private friendService: FriendService
  ) {}

  ngOnInit() {
    this.addFriendDataFormGroup =  this.fb.group({
      email: ['', Validators.required]
    })
  }

  addFriend() {
    this.isSubmitButtonDisable = true;

    if(!this.addFriendDataFormGroup.valid) {
      this.isSubmitButtonDisable = false;
      return this.addFriendDataFormGroup.markAllAsTouched();
    }

    const addFriend: AddFriend = {
      email: this.addFriendDataFormGroup.get('email')?.value
    }
    this.friendService.addFriend(addFriend).subscribe(()=>this.isSubmitButtonDisable = false)
  }
}
