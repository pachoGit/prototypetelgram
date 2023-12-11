import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthTelegramService } from '@core/auth/api-auth-telegram.service';
import { SignInParams } from '@core/auth/sign-in-params.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formAuth: FormGroup;

  params: SignInParams = {} as SignInParams;

  constructor(
    private fb: FormBuilder,
    private apiAuthTelegram: ApiAuthTelegramService,
    private router: Router,
  ) {
    this.formAuth = this.fb.group({
      phone: [''],
      phoneCode: [''],
    });
  }

  async sendCode() {
    const phone = this.phoneField.value;
    const resultCode = await this.apiAuthTelegram.sendCode(phone);
    console.log({ resultCode });
    this.params.phone_number = phone;
    this.params.phone_code_hash = resultCode.phone_code_hash;
  }

  async signIn() {
    this.params.phone_code = this.phoneCodeField.value;
    console.log(this.params);
    const login = await this.apiAuthTelegram.signIn(this.params);
    console.log({ login });
    this.router.navigate(['home']);
  }

  get phoneField() {
    return this.formAuth.get('phone')!;
  }

  get phoneCodeField() {
    return this.formAuth.get('phoneCode')!;
  }
}
