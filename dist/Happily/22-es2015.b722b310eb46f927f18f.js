(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{yTL2:function(e,t,i){"use strict";i.r(t);var o=i("tyNb"),r=i("ofXK"),s=i("d2mR"),n=i("mrSG"),a=i("j8vv"),l=i("3Pt+"),c=i("PSD3"),u=i.n(c),b=i("6Pyk"),d=i("EVdn"),g=i("fXoL"),m=i("H+bZ"),p=i("xHyB"),h=i("QpCR"),v=i("Egam"),f=i("aKWF");function y(e,t){1&e&&(g.Xb(0,"div",29),g.Sb(1,"img",30),g.Wb())}function w(e,t){1&e&&(g.Xb(0,"label"),g.Pc(1,"Age in Years"),g.Wb())}function S(e,t){1&e&&(g.Xb(0,"div",31),g.Pc(1," Please enter age "),g.Wb())}function W(e,t){1&e&&(g.Xb(0,"label"),g.Pc(1,"Country"),g.Wb())}function X(e,t){if(1&e&&(g.Xb(0,"option",32),g.Pc(1),g.Wb()),2&e){const e=t.$implicit;g.sc("value",e),g.Db(1),g.Rc(" ",e," ")}}function P(e,t){1&e&&(g.Xb(0,"div",31),g.Pc(1," Please select country "),g.Wb())}function C(e,t){1&e&&(g.Xb(0,"label"),g.Pc(1,"Language"),g.Wb())}function T(e,t){if(1&e&&(g.Xb(0,"option",32),g.Pc(1),g.Wb()),2&e){const e=t.$implicit;g.sc("value",e.name),g.Db(1),g.Rc(" ",e.name," ")}}function D(e,t){1&e&&(g.Xb(0,"div",31),g.Pc(1," Please select language "),g.Wb())}function N(e,t){1&e&&(g.Xb(0,"label"),g.Pc(1,"Religion"),g.Wb())}function q(e,t){if(1&e&&(g.Xb(0,"option",32),g.Pc(1),g.Wb()),2&e){const e=t.$implicit;g.sc("value",e),g.Db(1),g.Rc(" ",e," ")}}function I(e,t){1&e&&(g.Xb(0,"div",31),g.Pc(1," Please select religion "),g.Wb())}function x(e,t){1&e&&(g.Xb(0,"div",31),g.Pc(1," Please enter description "),g.Wb())}function F(e,t){1&e&&(g.Xb(0,"div",31),g.Pc(1," Please enter review "),g.Wb())}function L(e,t){if(1&e&&(g.Xb(0,"option",32),g.Pc(1),g.Wb()),2&e){const e=t.$implicit;g.sc("value",e.id),g.Db(1),g.Rc(" ",e.problem," ")}}let k=(()=>{class e{constructor(e,t,i,o){this.router=e,this.formBuilder=t,this.apiService=i,this.customValidator=o,this.mindTestData={},this.userLogin=!1,this.imageLoader=!1,this.withoutPin=!0,this.countryData=[],this.submitted=!1,this.questionsdropdownSettings={},this.languageList=a,this.labelShow=!1,this.religionList=["None","African Traditional & Diasporic","Agnostic","Atheist","Bah\xe1\u2019\xed","Buddhism","Christianity","Confucianism","Druze","Gnosticism","Hinduism","Indigenous American Religions","Islam","Jainism","Judaism","Juche","Neo-Paganism","Nonreligious","primal-indigenous","Rastafarianism","Secular","Shinto","Sikhism","Tenrikyo","Traditional African Religions","Unitarian-Universalism","Zoroastrianism"],this.countryData=b.a}ngOnInit(){let e=JSON.parse(localStorage.getItem("tempUserDetails"));this.problemListData();try{localStorage.getItem("happily_user")&&(this.userName=JSON.parse(localStorage.getItem("happily_user")).username,this.userID=JSON.parse(localStorage.getItem("happily_user")).userId,this.userLogin=!0)}catch(t){console.log(t)}this.privacyTestForm=this.formBuilder.group({problems:[""],generalFeeling:[""],mindPower:[""],age:["",l.v.required],country:["",l.v.required],religion:["",l.v.required],language:["",l.v.required],description:["",l.v.required],review:["",l.v.required]}),e&&(this.labelShow=!0,this.privacyTestForm.patchValue(e)),this.questions=[],this.deleteQuestions=[],this.questionsdropdownSettings={singleSelection:!1,idField:"id",textField:"problem",selectAllText:"Select All",unSelectAllText:"UnSelect All",itemsShowLimit:4,enableCheckAll:!1,allowSearchFilter:!0}}get privacyTestControl(){return this.privacyTestForm.controls}trigger(e,t){const i=d("#"+t).val(),o=i.length;switch(t){case"description":if(this.remain=(1e3-o).toString(),+this.remain<=0&&0!==e.which&&0!==e.charCode)return d("#"+t).val(i.substring(0,o-1)),!1;break;case"review":if(this.remainReview=(1e3-o).toString(),+this.remainReview<=0&&0!==e.which&&0!==e.charCode)return d("#"+t).val(i.substring(0,o-1)),!1}}problemListData(){return Object(n.a)(this,void 0,void 0,(function*(){try{const e=yield this.apiService.get("problems");e.statusMessage&&"Success"===e.statusMessage&&(this.problemList=e.results)}catch(e){console.log(e.error)}}))}onQuestionsItemSelect(e){let t=this.deleteQuestions.findIndex(t=>t.question_id===e.question_id);-1!==t&&this.deleteQuestions.splice(t,1),this.questions.push(e)}onQuestionsDeSelect(e){this.questions.splice(this.questions.findIndex(t=>t.question_id===e.question_id),1);let t=this.serverQuestions.find(t=>t.question_id===e.question_id);t&&this.deleteQuestions.push(t)}onSubmit(){return Object(n.a)(this,void 0,void 0,(function*(){if(this.submitted=!0,this.privacyTestForm.valid){if(""==this.privacyTestForm.value.problems&&""==this.privacyTestForm.value.generalFeeling&&""==this.privacyTestForm.value.mindPower)u.a.fire({position:"center",icon:"error",title:"Please select atleast one checkbox!",showConfirmButton:!0});else if(""!=this.privacyTestForm.value.problems||""!=this.privacyTestForm.value.generalFeeling||""!=this.privacyTestForm.value.mindPower){""==this.privacyTestForm.value.problems&&(this.privacyTestForm.value.problems=[]);let t="";if(!0===this.userLogin){console.log("withLogin");try{this.imageLoader=!0;let e={user:{id:this.userID}};e=Object.assign(e,this.privacyTestForm.value);let i=yield this.apiService.post("user/details",e);this.imageLoader=!1,t=i.statusMessage;const o=i.results;i.statusMessage&&"Success"===i.statusMessage?(u.a.fire({position:"center",icon:"success",title:"User data submitted successfully!",showConfirmButton:!1,timer:2e3}),localStorage.setItem("tempUserDetails",JSON.stringify(o)),this.router.navigateByUrl("/how-happy-you-details")):i.statusMessage&&"Success"!==i.statusMessage&&(u.a.fire({position:"center",icon:"info",title:t,showConfirmButton:!1,timer:2e3}),this.router.navigateByUrl("/how-happy-you-details"),t=i.Error)}catch(e){t=e.error,console.log(t)}}else{console.log("withoutLogin");try{this.imageLoader=!0;let e=yield this.apiService.post("user/details",this.privacyTestForm.value);this.imageLoader=!1,t=e.statusMessage;const i=e.results;e.statusMessage&&"Success"===e.statusMessage?(u.a.fire({position:"center",icon:"success",title:"User data submitted successfully!",showConfirmButton:!1,timer:2e3}),localStorage.setItem("tempUserDetails",JSON.stringify(i)),this.router.navigateByUrl("/how-happy-you-details")):e.statusMessage&&"Success"!==e.statusMessage&&(t=e.Error,u.a.fire(e.statusCode&&"HP999"===e.statusCode?{position:"center",icon:"error",title:"Refreshing page is taking too long. Please click on OK, move out of this page, and return to try again. Or try closing browser and re-opening the website. Sorry for the inconvenience.",showConfirmButton:!0}:{position:"center",icon:"info",title:t,showConfirmButton:!1,timer:2e3}),this.router.navigateByUrl("/how-happy-you-details"))}catch(e){t=e.error,console.log(t)}}}}else u.a.fire({position:"center",icon:"error",title:"Please enter all information.",showConfirmButton:!0})}))}}return e.\u0275fac=function(t){return new(t||e)(g.Rb(o.b),g.Rb(l.d),g.Rb(m.a),g.Rb(p.a))},e.\u0275cmp=g.Lb({type:e,selectors:[["app-privacy-protected-test"]],decls:77,vars:20,consts:[["class","image-loader",4,"ngIf"],[1,"know_section","contact_text","userinfo_page"],[1,"container"],[1,"know_text"],[1,"title-box"],[1,"page-title"],["src","./assets/images/border_center.png","alt","img"],[1,"row"],[1,"col-md-10","col-sm-10","col-xs-12","center"],[1,"contacy_form"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"col-md-6","col-sm-6","col-xs-12"],[4,"ngIf"],["type","text","required","","placeholder","Age in Years","formControlName","age","minlength","1","maxlength","3","onkeypress","return event.charCode >= 48 && event.charCode <= 57 ||event.charCode == '.' || event.charCode == 250 "],["class","text-danger",4,"ngIf"],["required","","formControlName","country",1,"form-control"],["value","","selected",""],[3,"value",4,"ngFor","ngForOf"],["id","languages","required","","formControlName","language",1,"form-control"],["required","","formControlName","religion",1,"form-control"],[1,"col-md-12","col-sm-12","col-xs-12"],[2,"text-align","right","font-size","15px","margin","0","color","#ffffff"],["required","","maxlength","1000","id","description","formControlName","description","rows","5","placeholder","Summarize what you want to improve or problems to solve, in less than 250 words.","data-validation-required-message","Please enter a message.",3,"keyup"],["required","","maxlength","1000","id","review","formControlName","review","rows","5","placeholder","Which solutions have you tried already?  How effective were the solutions? Give details of specific services, products, sources and your rating: Very Satisfied \u2013 OK \u2013 Very Unsatisfied.","data-validation-required-message","Please enter a message.",3,"keyup"],["type","checkbox","formControlName","generalFeeling"],["type","checkbox","formControlName","mindPower"],["placeholder","Solve specific problems (drop down list to select from)","formControlName","problems",3,"data","settings","onSelect","onDeSelect"],[1,"col-md-12","col-sm-12","col-xs-12","text-center"],["id","submitBtn",1,"webBtn"],[1,"image-loader"],["src","./assets/images/1477.gif"],[1,"text-danger"],[3,"value"]],template:function(e,t){1&e&&(g.Nc(0,y,2,0,"div",0),g.Sb(1,"app-header"),g.Xb(2,"div",1),g.Xb(3,"div",2),g.Xb(4,"div",3),g.Xb(5,"div",4),g.Xb(6,"h1",5),g.Pc(7,"Enter your basic information. Talk about what difficulties you are facing, what have you done to overcome them, and what help you need to strengthen your mind."),g.Wb(),g.Sb(8,"img",6),g.Wb(),g.Xb(9,"p"),g.Pc(10,"Your data is confidential and privacy protected. No one will know your identity, not even HAPPILY!"),g.Wb(),g.Wb(),g.Xb(11,"div",7),g.Xb(12,"div",8),g.Xb(13,"div",9),g.Xb(14,"form",10),g.fc("ngSubmit",(function(){return t.onSubmit()})),g.Xb(15,"div",7),g.Xb(16,"div",11),g.Nc(17,w,2,0,"label",12),g.Sb(18,"input",13),g.Nc(19,S,2,0,"div",14),g.Wb(),g.Xb(20,"div",11),g.Nc(21,W,2,0,"label",12),g.Xb(22,"select",15),g.Xb(23,"option",16),g.Pc(24,"Select Country"),g.Wb(),g.Nc(25,X,2,2,"option",17),g.Wb(),g.Nc(26,P,2,0,"div",14),g.Wb(),g.Wb(),g.Xb(27,"div",7),g.Xb(28,"div",11),g.Nc(29,C,2,0,"label",12),g.Xb(30,"select",18),g.Xb(31,"option",16),g.Pc(32," Select Language"),g.Wb(),g.Nc(33,T,2,2,"option",17),g.Wb(),g.Nc(34,D,2,0,"div",14),g.Wb(),g.Xb(35,"div",11),g.Nc(36,N,2,0,"label",12),g.Xb(37,"select",19),g.Xb(38,"option",16),g.Pc(39,"Select Religion"),g.Wb(),g.Nc(40,q,2,2,"option",17),g.Wb(),g.Nc(41,I,2,0,"div",14),g.Xb(42,"p"),g.Xb(43,"i"),g.Pc(44,"\u201cRequired if you want to see faith specific solutions.\u201d "),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Xb(45,"div",7),g.Xb(46,"div",20),g.Xb(47,"p",21),g.Pc(48),g.Wb(),g.Xb(49,"textarea",22),g.fc("keyup",(function(e){return t.trigger(e,"description")})),g.Wb(),g.Nc(50,x,2,0,"div",14),g.Wb(),g.Wb(),g.Xb(51,"div",7),g.Xb(52,"div",20),g.Xb(53,"p",21),g.Pc(54),g.Wb(),g.Xb(55,"textarea",23),g.fc("keyup",(function(e){return t.trigger(e,"review")})),g.Wb(),g.Nc(56,F,2,0,"div",14),g.Wb(),g.Wb(),g.Xb(57,"div",7),g.Xb(58,"div",20),g.Xb(59,"label"),g.Sb(60,"input",24),g.Pc(61," Improve general feeling of well-being "),g.Wb(),g.Wb(),g.Wb(),g.Xb(62,"div",7),g.Xb(63,"div",20),g.Xb(64,"label"),g.Sb(65,"input",25),g.Pc(66," Make my mind powerful for career and life. Popular among high school and college students! "),g.Wb(),g.Wb(),g.Wb(),g.Sb(67,"br"),g.Xb(68,"div",7),g.Xb(69,"div",20),g.Xb(70,"ng-multiselect-dropdown",26),g.fc("onSelect",(function(e){return t.onQuestionsItemSelect(e)}))("onDeSelect",(function(e){return t.onQuestionsDeSelect(e)})),g.Nc(71,L,2,2,"option",17),g.Wb(),g.Wb(),g.Wb(),g.Xb(72,"div",7),g.Xb(73,"div",27),g.Xb(74,"button",28),g.Pc(75,"Next"),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Wb(),g.Sb(76,"app-footer")),2&e&&(g.sc("ngIf",t.imageLoader),g.Db(14),g.sc("formGroup",t.privacyTestForm),g.Db(3),g.sc("ngIf",t.labelShow),g.Db(2),g.sc("ngIf",(t.privacyTestControl.age.touched||t.submitted)&&(null==t.privacyTestControl.age.errors?null:t.privacyTestControl.age.errors.required)),g.Db(2),g.sc("ngIf",t.labelShow),g.Db(4),g.sc("ngForOf",t.countryData),g.Db(1),g.sc("ngIf",(t.privacyTestControl.country.touched||t.submitted)&&(null==t.privacyTestControl.country.errors?null:t.privacyTestControl.country.errors.required)),g.Db(3),g.sc("ngIf",t.labelShow),g.Db(4),g.sc("ngForOf",t.languageList),g.Db(1),g.sc("ngIf",(t.privacyTestControl.language.touched||t.submitted)&&(null==t.privacyTestControl.language.errors?null:t.privacyTestControl.language.errors.required)),g.Db(2),g.sc("ngIf",t.labelShow),g.Db(4),g.sc("ngForOf",t.religionList),g.Db(1),g.sc("ngIf",(t.privacyTestControl.religion.touched||t.submitted)&&(null==t.privacyTestControl.religion.errors?null:t.privacyTestControl.religion.errors.required)),g.Db(7),g.Qc(t.remain),g.Db(2),g.sc("ngIf",(t.privacyTestControl.description.touched||t.submitted)&&(null==t.privacyTestControl.description.errors?null:t.privacyTestControl.description.errors.required)),g.Db(4),g.Qc(t.remainReview),g.Db(2),g.sc("ngIf",(t.privacyTestControl.review.touched||t.submitted)&&(null==t.privacyTestControl.review.errors?null:t.privacyTestControl.review.errors.required)),g.Db(14),g.sc("data",t.problemList)("settings",t.questionsdropdownSettings),g.Db(1),g.sc("ngForOf",t.problemList))},directives:[r.m,h.a,l.x,l.n,l.f,l.c,l.t,l.m,l.e,l.i,l.h,l.u,l.q,l.w,r.l,l.a,v.a,f.a],styles:[""]}),e})();i.d(t,"PrivacyProtectedTestModule",(function(){return B}));const R=[{path:"",component:k}];let B=(()=>{class e{}return e.\u0275mod=g.Pb({type:e}),e.\u0275inj=g.Ob({factory:function(t){return new(t||e)},imports:[[o.f.forChild(R),v.b.forRoot(),r.b,s.a],o.f]}),e})()}}]);