export interface Friend {
id: number;
friendId: number;
email: string;
nickname: string;
isFriendRequestNew: boolean;
isFriendRequestAccepted: boolean;
isRelationAccepted: boolean;
isRelationDeleted: boolean;
friendCreatedAt: Date;
createdAt: Date;
}
