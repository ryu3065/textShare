import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import { StudyService } from '../../../service/study.service';
import { AccountService } from '../../../service/account.service';
import { StudyPageInfo } from '../../../global/single_studypage';
import { StudyInfo } from '../../../global/single_study';

import { Acc_user } from '../../../vo/acc_user';
import { Acc_info } from '../../../vo/acc_info';
import { Account } from '../../../vo/account';

import { fadeInAnimation } from '../../animation/fadein';

declare var $ : any;
declare var naver : any;

@Component({
		styleUrls: ['client/component/study/account/study_acc.component.css'],
		templateUrl: 'client/component/study/account/study_acc.component.html',
		providers: [StudyService, AccountService],
		animations:[
			trigger('tableToggle',[
				state('open', style({})),
				state('close', style({
					height: '0px',
					display: 'none'
				})),
				transition('open => close', animate('300ms ease-in')),
				transition('close => open', animate('300ms ease-out'))
			]),
			trigger('infoToggle',[
				state('open', style({})),
				state('close', style({
					height: '0px',
					display: 'none'
				})),
				transition('open => close', animate('300ms ease-in')),
				transition('close => open', animate('300ms ease-out'))
			]),
			fadeInAnimation
		]
})
export class StudyAcc {
		private title:string;
		private accLatest:Account = new Account();
		private newInfo:Acc_info = new Acc_info();
		private upUser:Acc_user = new Acc_user();
		private totalCost:number = 0;
		private resCost:number = 0;
		//state
		private tableState:string = 'close';
		private infoState:string = 'close';
		// is
		private isAccLatest:boolean;
		private isInfoList:boolean;
		private isUserList:boolean;
		// list
		private accList:any[] = [];
		private userList:any[] = [];
		private infoList:any[] = [];

		private pageState:Boolean = false;

		constructor(
			public studyPage:StudyPageInfo,
			public accountService:AccountService
		){
			this.studyPage.init();
		}
		ngOnInit(){
			this.accountService.accList()
			.flatMap(
				data=>{
					if(!data.msg){
						this.accList = data;
						this.accLatest = data[0];
						this.isAccLatest = true;
						return this.accountService.userList(this.accList[0].idx);
					}else{
						this.isAccLatest = false;
						return Observable.of({msg:'no_res'});
					}
				}
			)
			.flatMap(
				data=>{
					if(!data.msg){
						this.userList = data;
						this.userList.map(function(input){
							input.is_pay = input.is_pay == "true";
						})
						this.isUserList = true;
						return this.accountService.infoList(this.accList[0].idx);
					}else{
						this.isUserList = false;
						return Observable.of({msg:'no_res'});
					}
				}
			)
			.subscribe(
				data=>{
					if(!data.msg){
						let obj = this;
						this.infoList = data;
						this.infoList.map(function(input){
							obj.totalCost += Number(input.cost);
						})
						this.resCost =this.accLatest.total_cost - this.totalCost;
						this.isInfoList = true;
						this.pageState = true;
					}else{
						this.isInfoList = false;
						this.pageState = true;
					}
				}
			)
		}
		getAccOne(input){
			this.accountService.accGetOne(input)
			.flatMap(
				data=>{
					if(!data.msg){
						this.accLatest = data;
						this.isAccLatest = true;
					}else{
						this.isAccLatest = false;
					}
					return this.accountService.userList(this.accLatest.idx);
				}
			)
			.flatMap(
				data=>{
					if(!data.msg){
						this.userList = data;
						this.userList.map(function(input){
							input.is_pay = input.is_pay == "true";
						})
						this.isUserList = true;
					}else{
						this.isUserList = false;
					}
					return this.accountService.infoList(this.accLatest.idx);
				}
			)
			.subscribe(
				data=>{
					this.infoList = [];
					this.totalCost = 0;
					if(!data.msg){
						let obj = this;
						this.infoList = data;
						this.infoList.map(function(input){
							obj.totalCost += Number(input.cost);
						})
						this.resCost = this.accLatest.total_cost - this.totalCost;
						this.isInfoList = true;
					}else{
						this.resCost = this.accLatest.total_cost;
						this.isInfoList = false;
					}
				}
			)
		}
		tableOpener(){
			this.tableState = (this.tableState == 'close') ? 'open' : 'close';
		}
		infoAddOpener(){
			this.infoState = (this.infoState == 'close') ? 'open' : 'close';
			this.newInfo = new Acc_info();
		}
		infoSubmit(){
			if(this.accLatest.idx){
			this.newInfo.acc_idx = this.accLatest.idx;
			this.accountService
				.infoCreate(this.newInfo)
				.flatMap(
					data=>{
						return this.accountService.infoList(this.accLatest.idx);
					}
				)
				.subscribe(
					data=>{
						let obj = this;
						this.infoList = data;
						this.totalCost = 0;
						this.isInfoList = true;
						this.infoList.map(function(input){
								obj.totalCost += Number(input.cost);
						})
						this.resCost =this.accLatest.total_cost - this.totalCost;
						this.newInfo = new Acc_info();
					}
				)
			}else{
				alert("지정된 회계가 없습니다.");
			}
		}
		infoRemove(input){
			if(confirm('삭제하시겠습니까?')){
			this.accountService
				.infoDelete(input)
				.flatMap(
					data=>{
						if(data.msg == 'done'){
							return this.accountService.infoList(this.accLatest.idx);
						}
					}
				)
				.subscribe(
					data=>{
						if(!data.msg){
							let obj = this;
							this.infoList = data;
							this.totalCost = 0;
							this.infoList.map(function(input){
								obj.totalCost += Number(input.cost);
							})
							this.resCost =this.accLatest.total_cost - this.totalCost;
							this.isInfoList = true;
							alert('삭제되었습니다.');
						}else{
							this.totalCost = 0;
							this.resCost =this.accLatest.total_cost - this.totalCost;
							this.isInfoList = false;
						}
					}
				)
			}
		}
		userIsPayUpdate(){
			let obj = this;
			let res = true;
			if(confirm('변경하시겠습니까?')){
				this.userList.map(function(input){
					let upUser = new Acc_user();
					upUser.idx = input.idx;
					upUser.is_pay = input.is_pay;
					obj.accountService
					.userUpdate(upUser)
					.subscribe(
						data =>{
							if(data.msg != 'done'){
								res = false;
							}
						}
					)
				})
				if(res){
					alert('변경되었습니다.');
				}else{
					alert('오류가 발생했습니다.');
				}
			}
		}
		
}