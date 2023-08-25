import { Friend } from "../friend";

export class FindFriendResponse {
  friends: Array<Friend>;
  constructor(friends: Array<Friend>) {
    this.friends = friends;
  }
}