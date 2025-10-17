import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const theme = localStorage.getItem('theme');
const html = document.documentElement;
const body = document.body;

if (theme === 'dark') {
  html.classList.add('dark');
  body.classList.add('dark:bg-gray-900');
} else {
  html.classList.remove('dark');
  body.classList.remove('dark:bg-gray-900');
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
