import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';

// Suprimir erros conhecidos e inofensivos do console (View Transitions e bug do Chrome DevTools)
window.addEventListener('unhandledrejection', (event) => {
    const isTransitionSkipped = event.reason?.name === 'AbortError' && event.reason?.message?.includes('Transition was skipped');
    const isChromeDevToolsBug = event.reason instanceof TypeError && event.reason.message?.includes("reading 'startTime'");
    
    if (isTransitionSkipped || isChromeDevToolsBug) {
        event.preventDefault();
    }
});

window.addEventListener('error', (event) => {
    if (event.error instanceof TypeError && event.error.message?.includes("reading 'startTime'")) {
        event.preventDefault();
    }
});

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
