import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import the withInterceptorsFromDi function
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
    importProvidersFrom(
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule
    )
 ]
})
  .catch((err) => console.error(err));

