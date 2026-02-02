import {AuthService} from './auth-service';
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginRequest} from '../models/login.request';
import {AuthResponse} from '../models/auth.response';
import {RegisterRequest} from '../models/register.request';


describe('AuthService', ()=>{
    let service: AuthService;
    let httpMock : HttpTestingController;


    const routerMock = {
        navigate: ()=>{}
    }


    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideHttpClient(),
                provideHttpClientTesting(),
                {provide:Router,useValue:routerMock},
            ]
        })
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request to login', () => {
        const mockCredentials: LoginRequest = { email: 'test@mail.com', password: '123' };
        const mockResponse: AuthResponse = {
            token: 'fake-jwt-token',
            role: 'USER',       // <--- زدنا هادي
            email: 'test@mail.com' // <--- وهادي
        };

        service.login(mockCredentials).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/authenticate');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockCredentials);

        req.flush(mockResponse);
    });

    it('should send a POST request to register', () => {
        const mockRegisterData: RegisterRequest = {
            username: 'Achraf',
            email: 'achraf@test.com',
            password: 'pass'
        };
        const mockResponse: { token: string } = { token: 'new-token' };

        service.register(mockRegisterData).subscribe(res => {
            // @ts-ignore
            return expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/register');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });
})
