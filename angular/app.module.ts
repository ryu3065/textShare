import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
// import { TreeModule } from 'tree-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { PageInfo } from './service/single_info';
import { UserInfo } from './service/single_user';
import { StudyInfo } from './service/single_study';
import { StudyPageInfo } from './service/single_studypage';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';

import { UserpageComponent } from './component/userpage/userpage.component';
import { UserMyPageComponent } from './component/userpage/mypage/userMyPage.component';
import { UserTextShareComponent, UserTextShareNewComponent } from './component/userpage/textShare/userTextShare.component';
import { UserTextBagComponent} from './component/userpage/textBag/userTextBag.component';
import { UserSTDJoinComponent } from './component/userpage/userStudyJoin/userSTDJoin.component';
import { UserSTDAdminComponent } from './component/userpage/userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './component/userpage/userStudySearch/userSTDSearch.component';

// import { UserModule } from './user.module';

import { StudyComponent } from './component/study/study.component';
import { StudyIndex } from './component/study/index/study_index.component';
import { StudyAcc } from './component/study/account/study_acc.component';
import { StudyAdmin } from './component/study/admin/study_admin.component';
import { StudyFlow } from './component/study/flow/study_flow.component';
import { StudyFreetalk } from './component/study/freetalk/study_freetalk.component';
import { StudyNotice } from './component/study/notice/study_notice.component';
import { StudyData } from './component/study/studydata/study_studydata.component';
import { StudySchedule } from './component/study/schedule/study_schedule.component';
import { StudyNewSchedule } from './component/study/schedule/study_schedule_new.component';

import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app.routing';

@NgModule({
	imports: [
			BrowserModule,
			FormsModule, ReactiveFormsModule,
			HttpModule,
			AppRoutingModule,
			MyDatePickerModule,
			BrowserAnimationsModule,
		//   TreeModule,
			MaterialModule,
	],
	declarations: [
		AppComponent,
		IndexComponent,

		UserpageComponent,
		UserMyPageComponent,
		UserTextShareComponent,
		UserTextShareNewComponent,
		UserTextBagComponent,
		UserSTDJoinComponent,
		UserSTDAdminComponent,
		UserSTDSearchComponent,   

		StudyComponent,
		StudyIndex,
		StudyAcc,
		StudyAdmin,
		StudyFlow,
		StudyFreetalk,
		StudyNotice,
		StudyData,
		StudySchedule, StudyNewSchedule
	],
	providers:[
		PageInfo,
		StudyInfo,
		StudyPageInfo,
		UserInfo
	],
	bootstrap: [
			AppComponent
	]
})
export class AppModule{
		constructor(router: Router){

		}
}
