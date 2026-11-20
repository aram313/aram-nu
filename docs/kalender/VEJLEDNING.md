# TimeOut-kalender – vejledning

Systemet består af to sider og en gratis database:

| Del | Hvad | Adresse |
|---|---|---|
| **TV-visning** | Viser denne og næste uge + plakater for kommende oplæg. Opdaterer sig selv. | `https://aram.nu/kalender/` |
| **Redigering** | Log ind og tilføj/ret/aflys begivenheder. Virker på mobil og computer. | `https://aram.nu/kalender/admin.html` |
| **TV-test** | Tjekker om en skærm/browser kan vise kalenderen. | `https://aram.nu/kalender/tv-test.html` |
| **Supabase** (gratis) | Gemmer begivenheder, billeder og logins. | supabase.com → projektet `timeout-kalender` |

Siderne ligger på aram.nu (GitHub-repositoriet `aram313/aram-nu`, mappen `src/kalender`).
Selve kalenderen – begivenheder, plakater og logins – ligger i Supabase.

---

## Sådan er det sat op

- **Supabase-projekt:** `timeout-kalender` i organisationen *Aram/HLM*, gratis plan, Frankfurt.
  Tabellen `events` og billed-mappen `billeder` er lavet med `supabase-opsaetning.sql` (ligger ved siden af denne fil).
- **Adgang:** alle (også TV'et) kan *se* kalenderen. Kun folk, der er logget ind, kan rette.
  Fremmede kan **ikke** oprette sig selv – nye redaktører tilføjes i hånden (se nedenfor).
- **Forbindelsen** står i `src/kalender/config.js`: projektets adresse og den offentlige *anon*-nøgle.
  Den nøgle må gerne være offentlig – den giver kun lov til at læse.
  Den hemmelige *service_role*-nøgle må aldrig stå i en fil på hjemmesiden.

### Giv en ny person adgang til at rette
1. Supabase → projektet **timeout-kalender** → **Authentication → Users → Add user → Create new user**.
2. Skriv personens e-mail og en adgangskode, og sæt flueben i **Auto Confirm User**.
3. Send personen linket `https://aram.nu/kalender/admin.html` og adgangskoden.

I kan også lave ét fælles klub-login. Vil I fjerne en persons adgang, sletter I brugeren samme sted.

---

## TV'et

### Test TV'ets egen browser
TV-siden er bygget uden nyere teknik, så den også kan køre i gamle TV-browsere. Sådan tester I:

1. Åbn TV'ets internetbrowser og skriv: `https://aram.nu/kalender/tv-test.html`
2. Siden tjekker TV'et og viser resultatet med store bogstaver:
   - **Grøn øverst** → tryk på **Åbn kalenderen**. Ser den pæn ud, er I færdige.
   - **"Kalenderdata" er rød** → TV'et kan ikke hente kalenderen. Brug pc'en med Chrome i stedet.
   - **"TV'ets dato og klokkeslæt" er forkert** → ret uret i TV'ets menu (ellers viser kalenderen forkert dag).
3. Viser TV'et en **certifikat-/sikkerhedsfejl** allerede på adressen, så prøv `http://` i stedet for `https://`.
   Det virker kun, hvis **Enforce HTTPS** er slået fra under *Settings → Pages* i `aram313/aram-nu` på GitHub
   (det gælder hele hjemmesiden – slå det til igen, hvis I ender med at bruge pc'en).
4. Opstår der en fejl, mens kalenderen kører, står den med orange skrift øverst på skærmen.
   Tag et billede af skærmen, så kan fejlen rettes.

### Hvorfor det gamle TV måske ikke holder i længden
TV'er fra omkring 2014 har typisk disse problemer:
- browseren kan ikke åbne mange nutidige sikre (https) sider, fordi TV'ets certifikater er forældede
- den starter ikke af sig selv, når TV'et tændes, og går i pauseskærm eller lukker efter et stykke tid
- den er langsom og løber tør for hukommelse

### Den bedste løsning: en lille boks i HDMI-stikket
Sæt en billig enhed i TV'ets HDMI-indgang, som viser siden i fuld skærm:

1. **En gammel bærbar eller mini-pc** (gratis, hvis klubben har en liggende)
   Tilslut med HDMI, åbn siden i Chrome og tryk **F11** for fuld skærm. Sæt Windows til aldrig at gå i dvale.
   Skal den starte af sig selv, så læg en Chrome-genvej i Windows' Start-mappe med:
   `chrome.exe --kiosk https://aram.nu/kalender/`
2. **En streaming-stick** (fx Fire TV Stick eller en Android/Google TV-boks) med en "kiosk-browser"-app som
   **Fully Kiosk Browser**. Den viser én side i fuld skærm, holder skærmen tændt og starter selv efter strømsvigt.

### Indstillinger på TV'et
- Slå **Auto Power Off / Eco / sleep-timer** fra, så TV'et ikke slukker af sig selv.
- Brug evt. TV'ets **tænd-/sluk-timer** (Menu → System → Tid), så det tænder, når klubben åbner, og slukker om natten.
- Slå **Anynet+ (HDMI-CEC)** til, så boksen kan tænde TV'et.

Siden henter ændringer hvert 2. minut og genindlæser sig selv hver nat kl. 04. Mister den internetforbindelsen,
viser den den senest hentede kalender med en lille advarsel.

---

## Sådan bruges redigeringen

- **Ny begivenhed:** tryk **Ny begivenhed** → titel, type, dato og tid → **Gem**.
- **Gentagende begivenheder:** vælg under *Gentages*:
  - *Hver uge* / *Hver anden uge* → vælg ugedagene (fx tirsdag + torsdag til kvindernes tid)
  - *Hver måned* / *Hvert kvartal* → vælg fx **"Den sidste onsdag"** eller **"Den 15. i måneden"**
  - *Slutter* → "Fortsætter indtil videre" eller en slutdato
- **Fredagsoplæg med plakat:** lav én fast begivenhed "Fredagsoplæg" hver fredag. Tryk så på den konkrete fredag
  under *Kalender* → **Ret kun denne dag** → skriv emne og oplægsholder, og tilføj plakaten. Den vises stort på TV'et.
- **Aflys én dag:** tryk på datoen → **Aflys denne dag**. Den vises som *Aflyst* på TV'et (kan genoprettes).
- **Fjern en fast begivenhed helt:** fanen **Faste begivenheder** → tryk på den → **Slet**.
  (Skal den bare stoppe, så sæt en slutdato i stedet.)

Typer og farver (Kvinder, Oplæg, Halaqa, Møde, ...) kan ændres i `config.js`.

---

## Godt at vide

- **Gratis:** Supabase's gratis plan har plads til 500 MB data og 1 GB billeder – det rækker til tusindvis af plakater.
- **Pause ved inaktivitet:** gratis Supabase-projekter sættes på pause, hvis ingen har brugt dem i en uge.
  Så længe TV'et er tændt, sker det ikke. Sker det alligevel (fx i en lang ferie), får I en e-mail og
  trykker **Restore** i Supabase.
- **Billeder** bliver automatisk gjort mindre ved upload, så det går hurtigt – også fra mobilen.

### Hvis noget driller
| Problem | Løsning |
|---|---|
| TV'et viser "Demo – ikke forbundet endnu" | `src/kalender/config.js` mangler adresse og nøgle (se "Sådan er det sat op"). |
| "Forkert e-mail eller adgangskode" | Tjek brugeren i Supabase (Authentication → Users), og at *Auto Confirm User* var slået til. |
| En ændring kommer ikke på TV'et | Vent op til 2 minutter, eller genindlæs siden på TV'et. |
| Billeder vises ikke | Kør `supabase-opsaetning.sql` igen (den sætter billed-mappen op). |
