import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableModule} from "primeng/table";
import {environment} from "../../../environments/environment";

interface User {
    id: string;
    name: string;
    email: string;
    year: number;
    company: string;
}

@Component({
    selector: 'app-landing-page-component',
    standalone: true,
    imports: [
        TableModule,
    ],
    templateUrl: './landing-page-component.component.html',
    styleUrls: ['./landing-page-component.component.css']
})
export class LandingPageComponentComponent implements OnInit {

    users: User[] = [];
    appVersion: string | undefined;
    apiUrl: string | undefined;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.appVersion = (window as any).config?.IMAGE_VERSION;
        this.apiUrl = (window as any).config?.API_URL;
        this.getUsers();
    }

    getUsers() {
        this.http.get<User[]>(`${(this.apiUrl)}/users`)
            .subscribe({
                next: (data) => {
                    this.users = data;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                },
                complete: () => {
                    console.log('Request completed');
                }
            });
    }

    protected readonly window = window;
}
