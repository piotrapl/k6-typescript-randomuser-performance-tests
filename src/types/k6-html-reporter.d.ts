    declare module "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js" {
  export function htmlReport(data: any): string;
}

// To jest deklaracja modułu dla k6-reporter, który jest używany do generowania 
// raportów HTML z wyników testów k6. Funkcja `htmlReport` przyjmuje dane testowe 
// i zwraca string zawierający wygenerowany raport HTML.