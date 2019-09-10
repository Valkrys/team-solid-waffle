import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  formIsValid:boolean = false;
  user: User;
  data: DataService; 

  
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    // date: new FormControl('', Validators.required),
    // location: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    // trainer_names: new FormControl('', [Validators.required,Validators.maxLength(100)]),
    // duration_hours: new FormControl('', Validators.required)

    // email: new FormControl('', [
    //   Validators.required,
    //   Validators.email
    // ]),
    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(6)
    // ])
    
   });

  constructor(dataService: DataService, private router: Router) 
  { 
    this.data = dataService;
  }

  ngOnInit() {
    this.user = new User();
  }

  checkLogin(loginForm) {
    console.log(loginForm);
    if (loginForm.valid) {
        this.data.login(this.user);
        if(this.data.loggedIn())
        {
          this.router.navigate(['/details']);
        }
      } else {
        alert("Please make sure that email and password are filled correctly")
      }
  }

}
