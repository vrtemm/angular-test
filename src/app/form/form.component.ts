import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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


export class FormComponent implements OnInit {
    file: string;
    url = ''
    animation = ''
    uploadForm: FormGroup;
    phones: Phone[] = []
    animations: string[] = [
        'Slide from left to right',
        'Slide from right to left',
    ]

    addPhone(file: string, url: string, animation: string) {
        this.phones.push(new Phone(file, url, animation))
    }

    constructor(public fb: FormBuilder) {
        this.uploadForm = this.fb.group({
            avatar: [null, Validators.required],
            userUrl: ['', Validators.required],
            userAnimations: ['', Validators.required]
        })
    }

    ngOnInit(): void { }

    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.uploadForm.patchValue({
            avatar: file
        });
        this.uploadForm.get('avatar').updateValueAndValidity()

        const reader = new FileReader();
        reader.onload = () => {
            this.file = reader.result as string;
        }
        reader.readAsDataURL(file)

    }

    submit() {
        console.log(this.uploadForm.value)
    }
}