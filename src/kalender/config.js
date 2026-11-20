/*
 * ======================================================
 *  TimeOut-kalender – indstillinger
 *  Det er KUN denne fil, du behøver at rette i.
 * ======================================================
 */
window.KALENDER_CONFIG = {

  // 1) Forbindelse til Supabase-projektet "timeout-kalender" (se docs/kalender/VEJLEDNING.md).
  //    Så længe de to felter er tomme, kører kalenderen i DEMO-tilstand
  //    med eksempler, som kun gemmes i din egen browser.
  supabaseUrl: 'https://vrvdymbtoamaywyssvny.supabase.co',
  // "anon public"-nøglen: må gerne være offentlig – den giver kun lov til at LÆSE kalenderen
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydmR5bWJ0b2FtYXl3eXNzdm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyMDcwMTcsImV4cCI6MjExMDc4MzAxN30.I3AxGPkqAGaV2ZAEyRStwO7Rz8D3DVdHglFUGL4AkoU',

  // 2) Navn der vises i fanebladet / på login-siden
  klubNavn: 'TimeOut',

  // 3) Typer af begivenheder og deres farve på TV'et.
  //    Du kan tilføje, fjerne eller omdøbe – "id" må ikke ændres,
  //    når der først er lagt begivenheder ind med den type.
  kategorier: [
    { id: 'kvinder',   navn: 'Kvinder',   farve: '#FF7EB6' },
    { id: 'oplaeg',    navn: 'Oplæg',     farve: '#FFB547' },
    { id: 'halaqa',    navn: 'Halaqa',    farve: '#3DDC97' },
    { id: 'moede',     navn: 'Møde',      farve: '#5AB8FF' },
    { id: 'aktivitet', navn: 'Aktivitet', farve: '#B49BFF' },
    { id: 'andet',     navn: 'Andet',     farve: '#A3A9C9' }
  ],

  // 4) TV-skærmen
  hentNyeDataHvertMinut: 2,   // hvor ofte TV'et tjekker for ændringer (minutter)
  skiftBilledeHvertSekund: 12 // hvor længe hvert billede/oplæg vises i højre side
};
