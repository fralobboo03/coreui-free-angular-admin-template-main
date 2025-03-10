import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
      ContainerComponent
      , RowComponent
      , ColComponent
      , CardGroupComponent
      , TextColorDirective
      , CardComponent
      , CardBodyComponent
      , FormDirective
      , InputGroupComponent
      , InputGroupTextDirective
      , IconDirective
      , FormControlDirective
      , ButtonDirective
      , NgStyle
      , RouterModule,
      SHARED_DEPENDENCIES
    ]
})
export class LoginComponent {
  formGroup = new FormGroup({
    username: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required])
  })

  constructor(
    private router: Router,
    private commonService: CommonHttpService
  ) { }

  ngOnInit() {
    let accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      this.router.navigate(["/"])
    }
  }

  home() {
    this.router.navigate(["/"])
  }


  login() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched()
      return
    }
    const controls = this.formGroup.controls
    this.commonService.login(controls.username.value || "", controls.password.value || "").subscribe({next: (res: any) => {
      localStorage.setItem("accessToken", res.accessToken)
      this.router.navigate(["Default","artisanry","product"])
    } , error: (err) => {
      alert("ผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
    }})
    
    
  }
}
