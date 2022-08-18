import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
	defaultInterpolationFormat,
	I18NextModule,
	I18NEXT_SERVICE,
	ITranslationService,
} from "angular-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";

export function appInit(i18next: ITranslationService) {
	return () =>
		i18next
			.use(Backend)
			.use(LanguageDetector)
			.init({
				supportedLngs: ["en", "ru"],
				fallbackLng: "en",
				debug: false,
				returnEmptyString: false,
				ns: ["translation"],
				interpolation: {
					format: I18NextModule.interpolationFormat(
						defaultInterpolationFormat,
					),
				},
				backend: {
					loadPath: "./assets/locales/{{lng}}/{{ns}}.json",
				},
				detection: {
					order: ["localStorage"],
					caches: ["localStorage"],
				},
			});
}

export function localeIdFactory(i18next: ITranslationService) {
	return i18next.language;
}

export const I18N_PROVIDERS = [
	{
		provide: APP_INITIALIZER,
		useFactory: appInit,
		deps: [I18NEXT_SERVICE],
		multi: true,
	},
	{
		provide: LOCALE_ID,
		deps: [I18NEXT_SERVICE],
		useFactory: localeIdFactory,
	},
];

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		I18NextModule.forRoot(),
		NgxPaginationModule,
		HttpClientModule
	],
	providers: [I18N_PROVIDERS],
	bootstrap: [AppComponent],
})
export class AppModule {}
