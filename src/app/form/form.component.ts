import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class Container {
    constructor(
        public file: string,
        public url: string,
        public animation: Object
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
    containers: Container[] = []
    animations: Object = [
        { title: 'Slide from left to right', value: 'left-to-right' },
        { title: 'Slide from right to left', value: 'right-to-left' },
    ]

    addContainer(file: string, url: string, animation: Object) {
        this.containers.push(new Container(file, url, animation))
    }

    constructor(public fb: FormBuilder) {
        this.uploadForm = this.fb.group({
            userImg: [null, Validators.required],
            userUrl: ['', Validators.required],
            userAnimations: ['', Validators.required]
        })
    }

    ngOnInit(): void { }

    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.uploadForm.patchValue({
            userImg: file
        });
        this.uploadForm.get('userImg').updateValueAndValidity()

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