import { Injectable } from "@angular/core";
import endPointsApi from "../utils/endPointsApi";
import { UserInformationImp } from "./UserInformationImp";

@Injectable({
  providedIn: 'root'
})
export class UrlHelper {

  constructor(private userInfomration: UserInformationImp){}

  formatApiEndPointFindProductByUserIdAndProductId(productId: number): string {
    const endPoints = {
      ":userId": this.userInfomration.getUserInformation().id,
      ":productId" : productId
    }

    let url: string = endPointsApi.uri + endPointsApi.findProductByUserIdAndProductId.url;

    Object.keys(endPoints).forEach(key=>{
      //@ts-ignore
    url = url.replace(key, endPoints[key]);
    });
    return url;
  }
}