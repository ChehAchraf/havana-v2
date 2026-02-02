import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);

    if (req.url.includes('/auth/')) {
        return next(req);
    }

    if (isPlatformBrowser(platformId)) {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(`Attaching token to request to: ${req.url}`);
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next(clonedReq);
        } else {
            console.warn(`No token found in localStorage for request to: ${req.url}`);
        }
    }

    return next(req);
};
