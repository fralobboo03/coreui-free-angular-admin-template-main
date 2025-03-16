import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonHttpService } from 'src/app/service/common-http.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, SHARED_DEPENDENCIES]
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private commonHttpService: CommonHttpService
  ) { }

  formGroup = new FormGroup({
    "username": new FormControl(null, Validators.required),
    "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
    "confirmPassword": new FormControl(null, [Validators.required,Validators.minLength(6)]),
    "email": new FormControl(null, Validators.required)
  })

  register() {
    console.log(this.formGroup.controls.password.errors)
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched()
      return
    }
    this.commonHttpService.register(this.formGroup.value).subscribe({next: (res: any) => {
      alert(res.message)
      this.router.navigate(["/login"])
    },error: (err) => {
      alert(err.error.error)
    }})
  }

  back() {
    this.router.navigate(["/"])
  }
}
