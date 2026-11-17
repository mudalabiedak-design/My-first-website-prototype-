document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // 1. SYSTEM PRZEŁĄCZANIA MOTYWÓW (Light / Dark)
    // ==========================================================================
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        // Sprawdzamy, czy użytkownik miał już wcześniej ustawiony motyw (np. w pamięci przeglądarki)
        const savedTheme = localStorage.getItem("bento-theme");
        if (savedTheme === "dark") {
            themeToggle.checked = true;
            document.documentElement.setAttribute("data-theme", "dark");
        }

        // Słuchacz zdarzeń dla suwaka motywów
        themeToggle.addEventListener("change", () => {
            if (themeToggle.checked) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("bento-theme", "dark"); // Zapisujemy wybór użytkownika
            } else {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("bento-theme", "light");
            }
        });
    }

    // ==========================================================================
    // 2. AUTOMATYCZNY ROK W STOPCE
    // ==========================================================================
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 3. INTERAKTYWNY SYSTEM PROGNOZOWANIA WYNIKÓW IT
    // ==========================================================================

    // Definiujemy Twoje realne, dotychczasowe wyniki z dokumentacji PGF
    const wynik_pgf04_certyfikat = 92.0;
    const wynik_pgf05_certyfikat = 88.0;
    const wynik_dyplom_technika_grafiki_i_poligrafii_cyfrowej = 90.0;

    // Pobieramy Twoje cele za pomocą okienek dialogowych (Prompt)
    let prognoza_inf02 = parseFloat(prompt("Wpisz Twój cel procentowy dla INF.02 (0-100):", ""));
    let prognoza_inf03 = parseFloat(prompt("Wpisz Twój cel procentowy dla INF.03 (0-100):", ""));
    let prognoza_dyplom_technika_informatyka = parseFloat(prompt("Wpisz Twój cel procentowy dla dyplomu zawodowego technika informatyka (0-100):", ""));

    // Zabezpieczenie przed kliknięciem "Anuluj" lub wpisaniem tekstu zamiast liczb
    if (isNaN(prognoza_inf02)) prognoza_inf02 = 0;
    if (isNaN(prognoza_inf03)) prognoza_inf03 = 0;
    if (isNaN(prognoza_dyplom_technika_informatyka)) prognoza_dyplom_technika_informatyka = 0;
    // Obliczenia matematyczne nowej średniej ogólnej (6 wskaźników)
    const nowa_srednia_ogolna = (wynik_pgf04_certyfikat +
        wynik_pgf05_certyfikat + wynik_dyplom_technika_grafiki_i_poligrafii_cyfrowej
        + prognoza_inf02 + prognoza_inf03 + prognoza_dyplom_technika_informatyka) / 6;

    // Logika warunkowa określająca rangę w branży IT na podstawie INF.03 (Programowanie)
    let status_it = "";
    if (prognoza_inf03 >= 85.0) {
        status_it = "🔥 Przyszły Master Web Developer (Unicorn)!";
    } else {
        status_it = "💻 Stabilny Specjalista IT";
    }

    // Dynamiczne wstrzykiwanie wygenerowanego raportu do dedykowanego kafelka statystyk
    const statsCard = document.getElementById("stats-kafel");

    if (statsCard) {
        // Generujemy bezpieczną strukturę HTML opartą na stylach Twojego bento
        const statsHtml = `
            <div class="it-prognosis" style="margin-top: 18px; border-top: 1px dashed var(--border-color); padding-top: 14px;">
                <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 10px; color: var(--text-main);">Prognoza systemu IT:</h3>
                <ul class="roboto-list" style="list-style-type: none;">
                    <li style="font-size: 0.95rem; margin-bottom: 8px; position: relative; padding-left: 18px;">
                        Cel dla przedmiotów IT: <strong>INF.02 (${prognoza_inf02}%)</strong> | <strong>INF.03 (${prognoza_inf03}%)</strong>
                    </li>
                    <li style="font-size: 0.95rem; margin-bottom: 8px; position: relative; padding-left: 18px;">
                        Prognozowana średnia ogólna: <strong>${nowa_srednia_ogolna.toFixed(2)}%</strong>
                    </li>
                    <li style="font-size: 0.95rem; position: relative; padding-left: 18px; color: #e65c00; font-weight: 500;">
                        Ranga: <strong>${status_it}</strong>
                    </li>
                </ul>
            </div>
        `;
        // Doklejamy sekcję prognozy na dole kafelka ze statystykami
        statsCard.insertAdjacentHTML('beforeend', statsHtml);
    }
});
// ==========================================================================
// AUTOMATYCYZNY ROK W STOPCE (Aktualizacja dynamiczna)
// ==========================================================================
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
