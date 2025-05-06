import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule)],
});

// bootstrapApplication(AppComponent)
//   .catch(err => console.error(err));


// //   bootstrapApplication(AppComponent, {
// //     providers: [
// //       HttpClientModule,  // Provide HttpClientModule here
// //     ]
// //   })
// //     .catch(err => console.error(err));