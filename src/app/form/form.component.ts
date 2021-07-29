import { Component } from "@angular/core";
import {
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms'

export class Phone {
    constructor(
        public file: string,
        public url: string,
        public animation: string
    ) { }
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent {
    file = ''
    url = ''
    animation = ''
    phones: Phone[] = []
    animations: string[] = [
        'slide from left to right',
        'slide from right to left',
    ]
    addPhone(file: string, url: string, animation: string) {
        this.phones.push(new Phone(file, url, animation))
    }
    myForm: FormGroup
    constructor() {
        this.myForm = new FormGroup({
            userUrl: new FormControl('', Validators.required),
            userAnimations: new FormControl('', Validators.required),
            userImg: new FormControl('', Validators.required),
        })
    }

    submit() {
        console.log(this.myForm)
    }
}
