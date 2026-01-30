import {CanActivateFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';


export const authGuard: CanActivateFn = (route , state )=>{
    const router = inject(Router)
    const platformId = inject(PLATFORM_ID);

    if(isPlatformBrowser(platformId)){
        const token : string|null = localStorage.getItem('token');
        if(token){
            return true;
        }else{
            router.navigate(['/login']);
            return false;
        }
    }
    return true;
}
