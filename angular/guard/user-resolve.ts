import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../service/user.service';

@Injectable()
export class UserResolve implements Resolve<any>{
		constructor(private userService:UserService, private router:Router){}

		resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any{
				return this.userService.userInfo()
		}
}

