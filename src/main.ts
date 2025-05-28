import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setTheme } from './assets/theme-toggle';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

(window as any).setTheme = setTheme;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}
