webpackJsonp([0],{

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_company_add_company_component__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__company_info_company_info_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompanyListPage = /** @class */ (function () {
    function CompanyListPage(modalCtrl, menuCtrl, navCtrl, companyService, auth, util) {
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.companyService = companyService;
        this.auth = auth;
        this.util = util;
    }
    CompanyListPage.prototype.ionViewDidLoad = function () {
        this.loadCompany(true);
        this.userId = this.auth.getUserId();
        this.menuCtrl.enable(true, 'myMenu');
    };
    CompanyListPage.prototype.refreshAll = function (refresher) {
        this.loadCompany(false);
        refresher.complete();
    };
    CompanyListPage.prototype.loadCompany = function (isForce) {
        var _this = this;
        this.companyService.getCompanies(isForce).subscribe(function (companies) {
            _this.companyList = _this.companyListAll = companies;
        });
    };
    CompanyListPage.prototype.goToCompanyInfo = function (company) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__company_info_company_info_component__["a" /* CompanyInfoPage */], company);
    };
    CompanyListPage.prototype.addCompany = function (slidingItem) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__add_company_add_company_component__["a" /* AddCompanyPage */]);
        modal.onDidDismiss(function (data) {
            if (data) {
                data.createdDate = new Date().toUTCString();
                data.createdBy = _this.userId;
                _this.companyService.addCompany(data);
                _this.util.showToast('Company added successfully!');
                slidingItem.close();
            }
        });
        modal.present();
    };
    CompanyListPage.prototype.editCompany = function (slidingItem, company) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__add_company_add_company_component__["a" /* AddCompanyPage */], { company: company });
        modal.onDidDismiss(function (data) {
            if (data) {
                data.createdDate = new Date().toUTCString();
                data.createdBy = _this.userId;
                _this.companyService
                    .updateCompany(data.key, data)
                    .then(function () {
                    return _this.util.showToast("Company " + company.name + " edited successfully!");
                })
                    .catch(function (e) { return _this.util.showToast('Error: ' + e); });
            }
        });
        modal.present();
        slidingItem.close();
    };
    CompanyListPage.prototype.deleteCompany = function (slidingItem, company) {
        var _this = this;
        this.util.showAlert('Remove Company', "Are you sure to delete '" + company.name + "'?", [
            { text: 'Cancel', handler: function () { return slidingItem.close(); } },
            {
                text: 'Remove',
                handler: function () {
                    _this.companyService
                        .deleteCompany(company.key)
                        .then(function () {
                        slidingItem.close();
                        _this.util.showToast("'" + company.name + "' was removed successfully!");
                    })
                        .catch(function (e) { return _this.util.showToast('Error: ', e); });
                }
            }
        ]);
    };
    CompanyListPage.prototype.updateCompany = function () {
        var queryTextLower = this.queryText.toLowerCase();
        if (queryTextLower.trim() !== '') {
            this.companyList = this.companyListAll.filter(function (item) {
                return (item.name.toLowerCase().indexOf(queryTextLower.toLowerCase()) > -1);
            });
        }
        else {
            this.companyList = this.companyListAll;
        }
    };
    CompanyListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-company-list',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\company-list\company-list.component.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n\n    <button menuToggle ion-button icon-only>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title> Company List</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar>\n\n    <ion-searchbar placeholder="Search" [(ngModel)]="queryText" (ionInput)="updateCompany()">\n\n    </ion-searchbar>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshAll($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-list>\n\n    <ion-item-sliding #slidingItem *ngFor="let company of companyList">\n\n      <ion-item button class="company-label" (click)="goToCompanyInfo(company)">\n\n        <ion-label>{{ company?.name }}</ion-label>\n\n        <p>{{ company?.createdBy }}</p>\n\n        <p>{{ userId }}</p>\n\n      </ion-item>\n\n      <ion-item-options *ngIf="company.createdBy === userId" side="right">\n\n        <button ion-button color="primary" (click)="editCompany(slidingItem, company)">\n\n          <ion-icon name="create"></ion-icon>\n\n          Edit\n\n        </button>\n\n        <button ion-button expandable color="danger" (click)="deleteCompany(slidingItem, company)">\n\n          <ion-icon name="trash"></ion-icon>\n\n          Delete\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="danger" (click)="addCompany()">\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"E:\Webapi\event-app\src\pages\company-list\company-list.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__core_service__["c" /* CompanyService */],
            __WEBPACK_IMPORTED_MODULE_4__core_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__core_service__["e" /* UtilProvider */]])
    ], CompanyListPage);
    return CompanyListPage;
}());

//# sourceMappingURL=company-list.component.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(navCtrl, navParams, fb, auth, loadingCtrl, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.util = util;
        this.resetPasswordForm = this.fb.group({
            'email': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])
        });
    }
    ForgotPasswordPage.prototype.submit = function (obj, isValid) {
        var _this = this;
        if (isValid) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please Wait',
                spinner: 'crescent'
            });
            loading_1.present();
            this.auth.resetPassword(obj.email).subscribe(function () {
                loading_1.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginPage */], {}, { animate: true, direction: 'forward' });
            }, function (registerError) {
                _this.util.showToast(registerError.message);
            });
        }
    };
    ForgotPasswordPage.prototype.goToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginPage */], {}, { animate: true, direction: 'forward' });
    };
    ForgotPasswordPage.prototype.goToSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register_component__["a" /* RegisterPage */], {}, { animate: true, direction: 'forward' });
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot-password',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\forgot-password\forgot-password.component.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <ion-title>Forgot Password</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forgot-password">\n  <div text-center>\n    <ion-img width="120" height="120" src="../../assets/imgs/logo-icon.png" class="logo"></ion-img>\n  </div>\n  <ion-card>\n    <ion-card-header text-center [style.background-color]="\'#c9c5cc\'" color="light">Forgot password</ion-card-header>\n    <form novalidate [formGroup]="resetPasswordForm" (ngSubmit)="submit(resetPasswordForm.value, resetPasswordForm.valid)">\n      <ion-list no-lines>\n        <ion-item>\n          <ion-label for="email" floating></ion-label>\n          <ion-input type="text" formControlName="email"></ion-input>\n        </ion-item>\n        <div padding>\n          <button type="submit" ion-button block color="danger">Forgot\n            Password</button>\n        </div>\n      </ion-list>\n    </form>\n  </ion-card>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar text-center>\n    <ion-buttons>\n      <button small ion-button block (click)="login()">\n        <small>Already have an account?&nbsp;<strong>Log in</strong></small>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\forgot-password\forgot-password.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__core_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__core_service__["e" /* UtilProvider */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forgot_password_forgot_password_component__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register_component__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register_component__["a" /* RegisterPage */]);
    };
    WelcomePage.prototype.forgotPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__forgot_password_forgot_password_component__["a" /* ForgotPasswordPage */]);
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\welcome\welcome.component.html"*/'<ion-content padding color="danger">\n  <div class="center_screen">\n    <img class="logo" src="../../assets/imgs/logo-icon.png" alt="Logo">\n    <br />\n    <br /><br />\n    <br />\n    <button ion-button icon-left full color="facebook" round (click)="login()">\n      Log in\n    </button>\n\n    <button ion-button icon-left full color="secondary" round (click)="register()">\n      Sign up\n    </button>\n    <br />\n    <br /><br />\n    <br />\n    <button ion-button round full color="dark" (click)="forgotPassword()">Forgot password</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\welcome\welcome.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.component.js.map

/***/ }),

/***/ 204:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 204;

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 260;

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_models__ = __webpack_require__(532);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddCompanyPage = /** @class */ (function () {
    function AddCompanyPage(viewCtrl, navCtrl, companyService, menuCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.companyService = companyService;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        var params = this.navParams.get('company');
        if (params) {
            this.company = this.navParams.data.company;
            this.editMode = true;
        }
        else {
            this.company = new __WEBPACK_IMPORTED_MODULE_3__shared_models__["a" /* Company */]();
            this.editMode = false;
        }
    }
    AddCompanyPage.prototype.addNewCompany = function () {
        this.viewCtrl.dismiss({
            name: this.company.name,
            email: this.company.email,
            mobileno: this.company.mobileno,
            address: this.company.address,
            city: this.company.city,
            state: this.company.state,
            country: this.company.country
        });
    };
    AddCompanyPage.prototype.editCompany = function () {
        this.viewCtrl.dismiss({
            key: this.company.key,
            name: this.company.name,
            email: this.company.email,
            mobileno: this.company.mobileno,
            address: this.company.address,
            city: this.company.city,
            state: this.company.state,
            country: this.company.country
        });
    };
    AddCompanyPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    AddCompanyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-company',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\add-company\add-company.component.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="cancel()" class="my-style-for-modal">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>{{ editMode ? \'Edit company\' : \'Add new company\' }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col>\n\n        Fill the following fields:\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <ion-item>\n\n          <ion-label floating>Company name</ion-label>\n\n          {{ company.name}}\n\n          <ion-input type="text" [(ngModel)]="company.name"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label floating>Email</ion-label>\n\n          <ion-input type="text" [(ngModel)]="company.email"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label floating>Mobile No</ion-label>\n\n          <ion-input type="text" [(ngModel)]="company.mobileno"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label floating>Address</ion-label>\n\n          <ion-textarea type="text" [(ngModel)]="company.address"></ion-textarea>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label floating>City</ion-label>\n\n          <ion-input type="text" [(ngModel)]="company.city"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label floating>State</ion-label>\n\n          <ion-input type="text" [(ngModel)]="company.state"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label floating>Country</ion-label>\n\n          <ion-input type="text" [(ngModel)]="company.country"></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer class="stick-footer">\n\n  <ion-toolbar>\n\n    <button ion-button full color="primary" *ngIf="!editMode" (click)="addNewCompany()">Create</button>\n\n    <button ion-button full color="primary" *ngIf="editMode" (click)="editCompany()">Modify</button>\n\n    <button type="button" ion-button full color="secondary" (click)="cancel()">Cancel</button>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"E:\Webapi\event-app\src\pages\add-company\add-company.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__core_service__["c" /* CompanyService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AddCompanyPage);
    return AddCompanyPage;
}());

//# sourceMappingURL=add-company.component.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(afAuth, db) {
        var _this = this;
        this.afAuth = afAuth;
        this.db = db;
        afAuth.authState.subscribe(function (auth) {
            _this.authState = auth;
            _this.logged = auth;
        });
    }
    AuthService.prototype.signUp = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
                .then(function (result) {
                user.userid = result.user.uid;
                _this.setUserData(user);
                resolve(result);
            }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.signInWithEmail = function (credentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.getCurrentUser = function () {
        return (this.authState !== null) ? this.authState : null;
    };
    AuthService.prototype.getEmail = function () {
        return this.authState && this.authState.email;
    };
    AuthService.prototype.getUserId = function () {
        return (this.authState !== null) ? this.authState.uid : '';
    };
    AuthService.prototype.setUserData = function (user) {
        this.db.object("users/" + user.userid).update(user)
            .catch(function (error) { return console.log(error); });
    };
    AuthService.prototype.getUserByUid = function (uid) {
        return this.db.object("/users/" + uid);
    };
    AuthService.prototype.getUsers = function () {
        return this.db.list('/users');
    };
    AuthService.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthService.prototype.resetPassword = function (emailAddress) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].create(function (observer) {
            _this.afAuth.auth.sendPasswordResetEmail(emailAddress).then(function (success) {
                observer.next(success);
            }, function (error) {
                observer.error(error);
            });
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddEventPage = /** @class */ (function () {
    function AddEventPage(toastCtrl, fb, navCtrl, db, menuCtrl) {
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.isEventFormSubmitted = false;
        this.menuCtrl.enable(false, 'myMenu');
        this.eventList = db.list('event');
        this.bindData();
    }
    AddEventPage.prototype.bindData = function () {
        this.eventForm = this.fb.group({
            title: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required]),
            description: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required]),
            startDate: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required]),
            endDate: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('')
        });
    };
    AddEventPage.prototype.addEvent = function (obj, isValid) {
        this.isEventFormSubmitted = true;
        if (isValid) {
            var data = {
                title: obj.title,
                description: obj.description,
                startDate: obj.startDate,
                endDate: obj.endDate,
            };
            var result = this.eventList.push(data);
            var eventId = result.key;
            var toast = this.toastCtrl.create({
                message: 'Successfully add event' + eventId,
                duration: 2000,
                position: 'top'
            });
            toast.present();
            this.isEventFormSubmitted = false;
            this.navCtrl.pop();
        }
    };
    AddEventPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    AddEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-event',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\add-event\add-event.component.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <ion-title>Add Event</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon name="home"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <form novalidate [formGroup]="eventForm" (ngSubmit)="addEvent(eventForm.value, eventForm.valid)">\n    <ion-item [ngClass]="{\'error-border\':!eventForm.controls.title.valid && eventForm.controls.title.touched}">\n      <ion-label stacked>Title</ion-label>\n      <ion-input type="text" formControlName="title" [ngClass]="{\'error-border\':!eventForm.controls[\'title\'].valid}" ></ion-input>\n    </ion-item><br />\n    <div class="error-box" *ngIf="eventForm.controls[\'title\'].hasError(\'required\') && eventForm.controls[\'title\'].touched">*\n      Title is required!</div>\n    <ion-item>\n      <ion-label stacked>Description</ion-label>\n      <ion-textarea type="text" formControlName="description"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Startdate</ion-label>\n      <ion-datetime type="text" displayFormat="M/D/YYYY HH:MM" pickerFormat="M/D/YYYY HH:MM" formControlName="startDate"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Enddate</ion-label>\n      <ion-datetime type="text" displayFormat="M/D/YYYY HH:MM" pickerFormat="M/D/YYYY HH:MM" formControlName="endDate"></ion-datetime>\n    </ion-item>\n    <button type="submit" ion-button block color="primary" [disabled]="!eventForm.valid"> Add Event </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\add-event\add-event.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* MenuController */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__company_member_company_member_component__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var CompanyInfoPage = /** @class */ (function () {
    function CompanyInfoPage(auth, modalCtrl, navParams, companyMemberService, util) {
        this.auth = auth;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.companyMemberService = companyMemberService;
        this.util = util;
        this.companySwitch = 'information';
    }
    CompanyInfoPage.prototype.ionViewWillEnter = function () {
        this.company = this.navParams.data;
        this.loadCompanyMember(true);
    };
    CompanyInfoPage.prototype.refreshAll = function (refresher) {
        this.loadCompanyMember(true);
        refresher.complete();
    };
    CompanyInfoPage.prototype.loadCompanyMember = function (isForce) {
        var _this = this;
        this.companyMemberService.getCompanyMember().subscribe(function (companyMember) {
            _this.companyMemberList = companyMember;
        });
    };
    CompanyInfoPage.prototype.AddCompanyMember = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__company_member_company_member_component__["a" /* CompanyMemberPage */], { company: this.company });
                        return [4 /*yield*/, modal.present()];
                    case 1:
                        _a.sent();
                        modal.onDidDismiss(function (data) {
                            if (data) {
                                data.createdDate = new Date().toDateString();
                                data.createdBy = _this.auth.getUserId();
                                _this.companyMemberService.addCompanyMember(data);
                                _this.util.showToast('Company member added successfully!');
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CompanyInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-company-info',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\company-info\company-info.component.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n\n    <ion-title>{{ company?.name }}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button color="white" icon-only (click)="AddCompanyMember()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar>\n\n    <ion-segment class="primary" [(ngModel)]="companySwitch">\n\n      <ion-segment-button value="information">\n\n        Information\n\n      </ion-segment-button>\n\n      <ion-segment-button value="member">\n\n        Member\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div [ngSwitch]="companySwitch">\n\n    <div *ngSwitchCase="\'information\'">\n\n      <ion-list>\n\n        <ion-card>\n\n          <ion-card-header text-capitalize style="font-weight: bold;">{{ company?.name }}</ion-card-header>\n\n          <ion-card-content>\n\n            <p>\n\n              <b>Email</b>: {{ company?.email }}</p>\n\n            <br/>\n\n            <p>\n\n              <b>Mobile no</b>: {{ company?.mobileno }}</p>\n\n            <br/>\n\n            <p>\n\n              <b>Address</b>: {{ company?.address }}</p>\n\n            <br/>\n\n            <p>\n\n              <b>City</b>: {{ company?.city }}</p>\n\n            <br/>\n\n            <p>\n\n              <b>State</b>: {{ company?.state }}</p>\n\n            <br/>\n\n            <p>\n\n              <b>Country</b>: {{ company?.country }}</p>\n\n            <br/>\n\n            <p>\n\n              <b>CreatedDate</b>: {{ company?.createdDate | appDateFormat }}\n\n            </p>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </ion-list>\n\n      <ion-fab right bottom>\n\n        <button ion-fab color="light">\n\n          <ion-icon name="arrow-dropup"></ion-icon>\n\n        </button>\n\n        <ion-fab-list side="top">\n\n          <button ion-fab>\n\n            <ion-icon name="logo-facebook"></ion-icon>\n\n          </button>\n\n          <button ion-fab>\n\n            <ion-icon name="logo-twitter"></ion-icon>\n\n          </button>\n\n        </ion-fab-list>\n\n      </ion-fab>\n\n    </div>\n\n\n\n    <div *ngSwitchCase="\'member\'">\n\n      <ion-refresher (ionRefresh)="refreshAll($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n      </ion-refresher>\n\n      <ion-list>\n\n        <ion-item *ngFor="let companyMember of companyMemberList" #slidingItem button>\n\n          <ion-label>\n\n            <h3>{{ companyMember.email }}</h3>\n\n            <p>\n\n              {{ companyMember.createdDate | appDateFormat }}\n\n            </p>\n\n          </ion-label>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n  </div>\n\n\n\n\n\n</ion-content>\n\nc'/*ion-inline-end:"E:\Webapi\event-app\src\pages\company-info\company-info.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__core_service__["b" /* CompanyMemberService */], __WEBPACK_IMPORTED_MODULE_2__core_service__["e" /* UtilProvider */]])
    ], CompanyInfoPage);
    return CompanyInfoPage;
}());

//# sourceMappingURL=company-info.component.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CompanyMemberPage = /** @class */ (function () {
    function CompanyMemberPage(viewCtrl, navCtrl, companyService, menuCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.companyService = companyService;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        var params = this.navParams.get('company');
        this.companyId = params.key;
        this.companyName = params.name;
    }
    CompanyMemberPage.prototype.addCompanyMember = function () {
        this.viewCtrl.dismiss({
            key: this.companyId,
            email: this.email,
        });
    };
    CompanyMemberPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    CompanyMemberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-company-member',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\company-member\company-member.component.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="cancel()" class="my-style-for-modal">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Add Company Member</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        Fill the following fields:\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>Company Name : {{ companyName }}</ion-label>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Enter email address</ion-label>\n          <ion-input type="text" [(ngModel)]="email"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n<ion-footer class="stick-footer">\n  <ion-toolbar>\n    <button ion-button full color="primary" (click)="addCompanyMember()">Add Member</button>\n    <button type="button" ion-button full color="danger" (click)="cancel()">Cancel</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\company-member\company-member.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__core_service__["c" /* CompanyService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], CompanyMemberPage);
    return CompanyMemberPage;
}());

//# sourceMappingURL=company-member.component.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventDetailPage = /** @class */ (function () {
    function EventDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EventDetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    EventDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-detail',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\event-detail\event-detail.component.html"*/'<ion-header>\n    <ion-navbar color="danger">\n      <ion-title>Event Detail</ion-title>\n      <ion-buttons right>\n        <button ion-button icon-only (click)="goBack()">\n          <ion-icon name="home"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  <ion-content padding>\n  </ion-content>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\event-detail\event-detail.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], EventDetailPage);
    return EventDetailPage;
}());

//# sourceMappingURL=event-detail.component.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_list_company_list_component__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_list_event_list_component__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventTab = __WEBPACK_IMPORTED_MODULE_3__event_list_event_list_component__["a" /* EventListPage */];
        this.companyTab = __WEBPACK_IMPORTED_MODULE_2__company_list_company_list_component__["a" /* CompanyListPage */];
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\home\home.component.html"*/'<ion-tabs>\n  <ion-tab tabTitle="Event" [root]="eventTab" tabIcon="basketball"></ion-tab>\n  <ion-tab tabTitle="Company" [root]="companyTab" tabIcon="podium"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\home\home.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome_welcome_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = /** @class */ (function () {
    function ProfilePage(auth, navCtrl, navParams) {
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.email = this.auth.getEmail();
        this.userId = this.auth.getUserId();
    }
    ProfilePage.prototype.logOut = function () {
        this.auth.signOut();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__welcome_welcome_component__["a" /* WelcomePage */]);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\profile\profile.component.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <button menuToggle ion-button icon-only>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title> My Profile</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only>\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-list-header>My Profile:</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      {{ email }}\n      {{ userId }}\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <button ion-button block (click)="logOut()">Logout</button>\n</ion-footer>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\profile\profile.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__core_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlphabetOnlyDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlphabetOnlyDirective = /** @class */ (function () {
    function AlphabetOnlyDirective() {
    }
    AlphabetOnlyDirective.prototype.onKeydown = function (event) {
        this.key = event.keyCode;
        if ((this.key >= 15 && this.key <= 64) || (this.key >= 123) || (this.key >= 96 && this.key <= 105)) {
            event.preventDefault();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], AlphabetOnlyDirective.prototype, "onKeydown", null);
    AlphabetOnlyDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[appAlphabetOnly]'
        })
    ], AlphabetOnlyDirective);
    return AlphabetOnlyDirective;
}());

//# sourceMappingURL=alphabet-only.directive.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(442);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__(301);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__company_service__ = __webpack_require__(528);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__company_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_member_service__ = __webpack_require__(529);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__company_member_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_service__ = __webpack_require__(530);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__event_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(531);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__util__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_add_company_add_company_component__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_add_event_add_event_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_company_list_company_list_component__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_company_member_company_member_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_event_detail_event_detail_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_event_list_event_list_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_forgot_password_forgot_password_component__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile_component__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_welcome_welcome_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_login_login_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_register_register_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_company_info_company_info_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__app_component__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__shared__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__core__ = __webpack_require__(543);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Import the AF2 Module





















var firebaseConfig = {
    apiKey: 'AIzaSyCOhwNHsYRh8PT49djMQkvfXKI9kbQahDo',
    authDomain: 'event-app-1234.firebaseapp.com',
    databaseURL: 'https://event-app-1234.firebaseio.com',
    projectId: 'event-app-1234',
    storageBucket: 'event-app-1234.appspot.com',
    messagingSenderId: '991073427296'
};
var page = [__WEBPACK_IMPORTED_MODULE_15__pages_event_list_event_list_component__["a" /* EventListPage */], __WEBPACK_IMPORTED_MODULE_14__pages_event_detail_event_detail_component__["a" /* EventDetailPage */], __WEBPACK_IMPORTED_MODULE_11__pages_add_event_add_event_component__["a" /* AddEventPage */], __WEBPACK_IMPORTED_MODULE_20__pages_login_login_component__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_21__pages_register_register_component__["a" /* RegisterPage */], __WEBPACK_IMPORTED_MODULE_10__pages_add_company_add_company_component__["a" /* AddCompanyPage */], __WEBPACK_IMPORTED_MODULE_12__pages_company_list_company_list_component__["a" /* CompanyListPage */],
    __WEBPACK_IMPORTED_MODULE_13__pages_company_member_company_member_component__["a" /* CompanyMemberPage */], __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile_component__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_16__pages_forgot_password_forgot_password_component__["a" /* ForgotPasswordPage */], __WEBPACK_IMPORTED_MODULE_19__pages_welcome_welcome_component__["a" /* WelcomePage */], __WEBPACK_IMPORTED_MODULE_17__pages_home_home_component__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_22__pages_company_info_company_info_component__["a" /* CompanyInfoPage */]];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */]
            ].concat(page),
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_25__core__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_24__shared__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["AngularFireModule"].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__["AngularFirestoreModule"],
                __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["AngularFireAuthModule"],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */]
            ].concat(page),
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["AngularFireDatabase"],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__["AngularFirestore"],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["c" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(16);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CompanyService = /** @class */ (function () {
    function CompanyService(database) {
        this.database = database;
    }
    CompanyService.prototype.getCompanies = function (isForced) {
        if (this.companies !== undefined && !isForced) {
            return this.companies;
        }
        else {
            this.companyRef = this.database.list('company');
            this.companies = this.companyRef.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (changes) {
                return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
            }));
            return this.companies;
        }
    };
    CompanyService.prototype.addCompany = function (company) {
        this.database.list('company').push(company);
    };
    CompanyService.prototype.updateCompany = function (id, company) {
        return this.database.list('company').update(id, company);
    };
    CompanyService.prototype.deleteCompany = function (id) {
        return this.database.list('company').remove(id);
    };
    CompanyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["AngularFireDatabase"]])
    ], CompanyService);
    return CompanyService;
}());

//# sourceMappingURL=company.service.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyMemberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(301);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompanyMemberService = /** @class */ (function () {
    function CompanyMemberService(database, auth) {
        this.database = database;
        this.auth = auth;
    }
    CompanyMemberService.prototype.getCompanyMember = function () {
        this.companyMemberRef = this.database.list('company_member');
        this.companyMembers = this.companyMemberRef.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        }));
        return this.companyMembers;
    };
    CompanyMemberService.prototype.checkEmailExist = function (companyMember) {
        this.database.list('company_member').push(companyMember);
    };
    CompanyMemberService.prototype.addCompanyMember = function (companyMember) {
        this.database.list('company_member').push(companyMember);
    };
    CompanyMemberService.prototype.updateCompanyMember = function (id, companyMember) {
        return this.database.list('company_member').update(id, companyMember);
    };
    CompanyMemberService.prototype.deleteCompanyMember = function (id) {
        return this.database.list('company_member').remove(id);
    };
    CompanyMemberService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]])
    ], CompanyMemberService);
    return CompanyMemberService;
}());

//# sourceMappingURL=company-member.service.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventService = /** @class */ (function () {
    function EventService(auth, database) {
        this.auth = auth;
        this.database = database;
    }
    EventService.prototype.getEvents = function () {
        return this.database.list('/event', function (ref) { return ref.orderByChild('createdDate'); }).valueChanges();
    };
    EventService.prototype.addEvent = function (event) {
        this.database.list('/event').push(event);
    };
    EventService.prototype.editEvent = function (key, event) {
        this.database.list('/event').update(key, event);
    };
    EventService.prototype.deleteEvent = function (key) {
        this.database.list('/event').remove(key);
    };
    EventService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]])
    ], EventService);
    return EventService;
}());

//# sourceMappingURL=event.service.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilProvider = /** @class */ (function () {
    function UtilProvider(alertCtrl, platformSrv, toastCtrl, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.platformSrv = platformSrv;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    UtilProvider.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Please wait',
            duration: 2000
        });
        this.loading.present();
    };
    UtilProvider.prototype.disableLoader = function () {
        this.loading.present();
    };
    UtilProvider.prototype.isNativePlatform = function () {
        return (this.platformSrv.is('cordova') && this.platformSrv.is('mobile'));
    };
    UtilProvider.prototype.showToast = function (message, duration, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration || 3000,
            position: position || 'bottom'
        });
        toast.present();
    };
    UtilProvider.prototype.showAlert = function (title, msg, buttons) {
        this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: buttons || ['OK']
        }).present();
    };
    UtilProvider.prototype.showPromptAlert = function (title, message, inputs, buttons) {
        this.alertCtrl.create({
            title: title,
            message: message,
            inputs: inputs || [],
            buttons: buttons || ['OK']
        }).present();
    };
    UtilProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], UtilProvider);
    return UtilProvider;
}());

//# sourceMappingURL=util.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__company_model__ = __webpack_require__(533);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__company_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_model__ = __webpack_require__(534);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_model__ = __webpack_require__(535);
/* unused harmony namespace reexport */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Company; });
var Company = /** @class */ (function () {
    function Company() {
    }
    return Company;
}());

//# sourceMappingURL=company.model.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Event */
var Event = /** @class */ (function () {
    function Event() {
    }
    return Event;
}());

//# sourceMappingURL=event.model.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_event_list_event_list_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile_component__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_company_list_company_list_component__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var MyApp = /** @class */ (function () {
    function MyApp(auth, platform, statusBar, splashScreen) {
        this.auth = auth;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
        this.pages = [
            { title: 'Home', icon: 'fa-home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home_component__["a" /* HomePage */] },
            { title: 'Event', icon: 'fa-calendar', component: __WEBPACK_IMPORTED_MODULE_4__pages_event_list_event_list_component__["a" /* EventListPage */] },
            { title: 'Company', icon: 'fa-building-o', component: __WEBPACK_IMPORTED_MODULE_6__pages_company_list_company_list_component__["a" /* CompanyListPage */] },
            { title: 'Profile', icon: 'fa-user', component: __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile_component__["a" /* ProfilePage */] },
            { title: 'Logout', icon: 'fa-sign-out', component: null },
        ];
        this.userEmail = this.auth.getEmail();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.auth.afAuth.authState.subscribe(function (user) {
                if (user) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_company_list_company_list_component__["a" /* CompanyListPage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome_component__["a" /* WelcomePage */];
                }
            }, function () {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome_component__["a" /* WelcomePage */];
            });
        });
    };
    MyApp.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.auth.signOut();
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome_component__["a" /* WelcomePage */], {}, { animate: true, direction: 'forward' });
                return [2 /*return*/];
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (page.component) {
                    this.nav.setRoot(page.component);
                    this.activePage = page;
                }
                else {
                    this.logout();
                }
                return [2 /*return*/];
            });
        });
    };
    MyApp.prototype.checkActivePage = function (page) {
        return page === this.activePage;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Webapi\event-app\src\app\app.component.html"*/'<ion-menu [content]="content" side="left" id="myMenu">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title color="white">Event Manager</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list no-lines>\n\n      <!-- <ion-list-header>{{ this.auth.getEmail() }}</ion-list-header> -->\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" [class.active]="checkActivePage(p)">\n\n        <i class="fa {{p.icon}} font-awesome" item-left aria-hidden="true"></i>\n\n        {{ p.title }}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n  <ion-footer>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col menuClose>T & C</ion-col>\n\n        <ion-col menuClose>Privacy</ion-col>\n\n        <ion-col menuClose>\n\n          <ion-icon name="share"></ion-icon>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-footer>\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" class="my-navbar"></ion-nav>'/*ion-inline-end:"E:\Webapi\event-app\src\app\app.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__core_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_module__ = __webpack_require__(538);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_module__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directive__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directive_alphabet_only_directive__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var pipes = [__WEBPACK_IMPORTED_MODULE_0__pipes__["a" /* DateFormatPipe */]];
var directives = [__WEBPACK_IMPORTED_MODULE_1__directive__["a" /* NumberOnlyDirective */], __WEBPACK_IMPORTED_MODULE_2__directive_alphabet_only_directive__["a" /* AlphabetOnlyDirective */]];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            imports: [],
            declarations: pipes.concat(directives),
            exports: pipes.concat(directives),
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date_format_pipe__ = __webpack_require__(540);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__date_format_pipe__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DateFormatPipe = /** @class */ (function (_super) {
    __extends(DateFormatPipe, _super);
    function DateFormatPipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFormatPipe.prototype.transform = function (value) {
        var datePipe = new __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* DatePipe */]('en-US');
        value = datePipe.transform(value, 'dd-MM-yyyy hh:mm:ss');
        return value;
    };
    DateFormatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["S" /* Pipe */])({
            name: 'appDateFormat'
        })
    ], DateFormatPipe);
    return DateFormatPipe;
}(__WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* DatePipe */]));

//# sourceMappingURL=date-format.pipe.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number_only_directive__ = __webpack_require__(542);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__number_only_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alphabet_only_directive__ = __webpack_require__(308);
/* unused harmony namespace reexport */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberOnlyDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NumberOnlyDirective = /** @class */ (function () {
    function NumberOnlyDirective(el) {
        this.el = el;
        this.regex = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
        this.specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'Ctrl'];
    }
    NumberOnlyDirective.prototype.onKeyDown = function (event) {
        this.key = event.code;
        if (this.key === 65 && event.ctrlKey) {
            return;
        }
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        var current = this.el.nativeElement.value;
        var next = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NumberOnlyDirective.prototype, "onKeyDown", null);
    NumberOnlyDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[appNumberOnly]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], NumberOnlyDirective);
    return NumberOnlyDirective;
}());

//# sourceMappingURL=number-only.directive.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_module__ = __webpack_require__(544);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__core_module__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var service = [__WEBPACK_IMPORTED_MODULE_1__service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__service__["c" /* CompanyService */], __WEBPACK_IMPORTED_MODULE_1__service__["b" /* CompanyMemberService */], __WEBPACK_IMPORTED_MODULE_1__service__["d" /* EventService */], __WEBPACK_IMPORTED_MODULE_1__service__["e" /* UtilProvider */]];
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: service.slice()
        })
    ], CoreModule);
    return CoreModule;
}());

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_event_add_event_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_detail_event_detail_component__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventListPage = /** @class */ (function () {
    function EventListPage(menuCtrl, navCtrl, eventService) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.eventService = eventService;
        this.eventService.getEvents().subscribe(function (event) {
            _this.eventList = event;
        });
    }
    EventListPage.prototype.ionViewDidLoad = function () {
        this.menuCtrl.enable(true, 'myMenu');
    };
    EventListPage.prototype.addEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__add_event_add_event_component__["a" /* AddEventPage */]);
    };
    EventListPage.prototype.goToEventDetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__event_detail_event_detail_component__["a" /* EventDetailPage */]);
    };
    EventListPage.prototype.refreshAll = function (refresher) {
        var _this = this;
        this.eventService.getEvents().subscribe(function (event) {
            refresher.complete();
            _this.ionViewDidLoad();
        });
    };
    EventListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-list',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\event-list\event-list.component.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <button menuToggle ion-button icon-only>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title> Event List</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addEvent()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar placeholder="Search" [(ngModel)]="queryText">\n    <ion-searchbar></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshAll($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="eventList != undefined && eventList != null">\n    <ion-card *ngFor="let event of eventList">\n      <ion-item text-capitalize (click)="goToEventDetail()">\n        <h2>{{ event.title }}</h2>\n      </ion-item>\n      <ion-card-content>\n        <p>{{ event.description }}</p>\n        <h3>{{ event.startDate }}, {{ event.endDate }}</h3>\n      </ion-card-content>\n    </ion-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Webapi\event-app\src\pages\event-list\event-list.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__core_service__["d" /* EventService */]])
    ], EventListPage);
    return EventListPage;
}());

//# sourceMappingURL=event-list.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_list_event_list_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgot_password_forgot_password_component__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var LoginPage = /** @class */ (function () {
    function LoginPage(util, menuCtrl, fb, auth, navCtrl, navParams, loadingCtrl) {
        this.util = util;
        this.menuCtrl = menuCtrl;
        this.fb = fb;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.user = {};
        this.isLoginSubmitted = false;
        this.menuCtrl.enable(false, 'myMenu');
        this.BindData();
    }
    LoginPage.prototype.BindData = function () {
        this.loginForm = this.fb.group({
            'email': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email]),
            'password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(6)])
        });
    };
    LoginPage.prototype.login = function (objUser, isValid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loading_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoginSubmitted = true;
                        if (!isValid) return [3 /*break*/, 4];
                        loading_1 = this.loadingCtrl.create({
                            content: 'Please Wait',
                            spinner: 'crescent'
                        });
                        loading_1.present();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.auth.signInWithEmail(objUser).then(function () {
                                _this.isLoginSubmitted = false;
                                loading_1.dismiss();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__event_list_event_list_component__["a" /* EventListPage */], {}, { animate: true, direction: 'forward' });
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        loading_1.dismiss();
                        switch (error_1.code) {
                            case 'auth/invalid-email':
                                this.util.showToast('Please enter a valid email address');
                                break;
                            case 'auth/wrong-password':
                                this.util.showToast('Incorrect username and password combination.');
                                break;
                            case 'auth/user-not-found':
                                this.util.showToast('User not found.');
                                break;
                            default: {
                                this.util.showToast(error_1.message);
                                break;
                            }
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register_component__["a" /* RegisterPage */], {}, { animate: true, direction: 'forward' });
    };
    LoginPage.prototype.goToForgotPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forgot_password_forgot_password_component__["a" /* ForgotPasswordPage */], {}, { animate: true, direction: 'forward' });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\login\login.component.html"*/'<ion-content>\n\n  <ion-header>\n\n    <ion-navbar color="danger">\n\n      <ion-title>Login</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n  <ion-content class="login">\n\n    <div text-center>\n\n      <img class="logo" width="120" height="120" src="../../assets/imgs/logo-icon.png" alt="Logo">\n\n      <!-- <ion-img width="120" height="120" src="../../assets/imgs/logo-icon.png" class="logo"></ion-img> -->\n\n    </div>\n\n    <ion-card>\n\n      <ion-card-header text-center [style.background-color]="\'#c9c5cc\'" color="light">Sign In</ion-card-header>\n\n      <form novalidate [formGroup]="loginForm" (ngSubmit)="login(loginForm.value, loginForm.valid)">\n\n        <ion-list no-lines>\n\n          <ion-item>\n\n            <ion-label floating>Email Address</ion-label>\n\n            <ion-input type="text" formControlName="email"></ion-input>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-label floating>Password</ion-label>\n\n            <ion-input type="password" formControlName="password"></ion-input>\n\n          </ion-item>\n\n          <div padding>\n\n            <button type="submit" ion-button block color="primary">Login</button>\n\n          </div>\n\n        </ion-list>\n\n      </form>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button outline (click)="goToForgotPassword()" float-left>Forgot Password?\n\n            </button>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <button ion-button outline (click)="goToSignup()" float-right>Sign up!</button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card>\n\n    <div class="content-wrapper">\n\n      <div padding>\n\n        <button ion-button block icon-start color="facebook">\n\n          <ion-icon name="logo-facebook"></ion-icon>\n\n          Login With Facebook\n\n        </button>\n\n      </div>\n\n      <div padding>\n\n        <button ion-button block icon-start color="gmail">\n\n          <ion-icon name="logo-googleplus"></ion-icon>\n\n          Login With Google+\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </ion-content>'/*ion-inline-end:"E:\Webapi\event-app\src\pages\login\login.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__core_service__["e" /* UtilProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__core_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var RegisterPage = /** @class */ (function () {
    function RegisterPage(util, menuCtrl, fb, auth, loadingCtrl, navCtrl, navParams) {
        this.util = util;
        this.menuCtrl = menuCtrl;
        this.fb = fb;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = {};
        this.isRegisterSubmitted = false;
        this.menuCtrl.enable(false, 'myMenu');
        this.BindData();
    }
    RegisterPage.prototype.BindData = function () {
        this.registerForm = this.fb.group({
            'firstname': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required])],
            'lastname': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required])],
            'email': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].maxLength(160), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])],
            'mobileno': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].maxLength(13), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required])],
            'password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required])
        });
    };
    RegisterPage.prototype.register = function (objUser, isValid) {
        return __awaiter(this, void 0, void 0, function () {
            var loading, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isRegisterSubmitted = true;
                        if (!isValid) return [3 /*break*/, 4];
                        loading = this.loadingCtrl.create({
                            content: 'Please Wait',
                            spinner: 'crescent'
                        });
                        loading.present();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        objUser.createdDate = new Date().toDateString();
                        objUser.status = true;
                        return [4 /*yield*/, this.auth.signUp(objUser)];
                    case 2:
                        _a.sent();
                        this.isRegisterSubmitted = false;
                        loading.dismiss();
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginPage */], {}, { animate: true, direction: 'forward' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        loading.dismiss();
                        switch (error_1.code) {
                            case 'auth/invalid-email':
                                this.util.showToast('Please enter a valid email address.');
                                break;
                            case 'auth/weak-password':
                                this.util.showToast('Enter strong password.');
                                break;
                            case 'auth/email-already-in-use':
                                this.util.showToast('This email has already been used for another account.');
                                break;
                            default:
                                this.util.showToast(error_1.message);
                                break;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginPage */], {}, { animate: true, direction: 'forward' });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"E:\Webapi\event-app\src\pages\register\register.component.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n\n    <ion-title>Signup</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <div class="center_screen">\n\n    <form novalidate [formGroup]="registerForm" (ngSubmit)="register(registerForm.value, registerForm.valid)">\n\n      <div class="input_area">\n\n        <ion-icon name="md-person"></ion-icon>\n\n        <input type="text" placeholder="Firstname" formControlName="firstname">\n\n      </div>\n\n      <div class="input_area">\n\n        <ion-icon name="md-person"></ion-icon>\n\n        <input type="text" placeholder="Lastname" formControlName="lastname">\n\n      </div>\n\n      <div class="input_area">\n\n        <ion-icon name="md-mail"></ion-icon>\n\n        <input type="text" placeholder="E-mail Id" formControlName="email">\n\n      </div>\n\n      <div class="input_area">\n\n        <ion-icon name="md-call"></ion-icon>\n\n        <input type="text" placeholder="Mobile No" formControlName="mobileno">\n\n      </div>\n\n      <div class="input_area">\n\n        <ion-icon name="md-lock"></ion-icon>\n\n        <input type="password" placeholder="Password" formControlName="password">\n\n      </div>\n\n      <button type="submit" ion-button margin-top full color="danger" round>Sign up</button>\n\n      <button type="button" ion-button margin-top full color="primary" round (click)="login()">Log in</button>\n\n    </form>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\Webapi\event-app\src\pages\register\register.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__core_service__["e" /* UtilProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__core_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.component.js.map

/***/ })

},[309]);
//# sourceMappingURL=main.js.map