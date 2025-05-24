import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
 providers: [
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration:"top"}),
    withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
 ]
};
