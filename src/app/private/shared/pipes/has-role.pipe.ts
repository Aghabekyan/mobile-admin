import { Pipe, PipeTransform } from '@angular/core';
import {UserType} from '../../../infrastructure/enums/index';

@Pipe({name: 'hasRole'})
export class HasRolePipe implements PipeTransform {
  transform(user: IUser, role: UserType): boolean {
    return user.typeID === role;
  }
}
