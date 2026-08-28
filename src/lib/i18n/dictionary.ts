export type Locale = "it" | "en";

// Flat UI-copy dictionary. Keys are dot-namespaced by area of the site.
// Interpolation uses {varName} placeholders, substituted by t() in
// LocaleContext. Product names/descriptions are catalog content and are
// deliberately NOT part of this dictionary — only site structure/UI text.
const it = {
  "header.searchPlaceholder": "Cerca prodotti",
  "header.openMenu": "Apri il menu",
  "header.closeMenu": "Chiudi il menu",
  "header.logIn": "Accedi",
  "header.accountMenu": "Menu account",
  "header.logOut": "Esci",
  "header.favorites": "Preferiti",
  "header.shopAll": "Vedi tutto {category}",
  "header.shopByStyle": "Scopri per stile",
  "header.language": "Lingua",
  "header.storeLocator": "Trova un negozio",

  "nav.men": "Uomo",
  "nav.women": "Donna",
  "nav.promotion": "Promozioni",
  "nav.kids": "Bambini",
  "nav.new": "Novità",
  "nav.newArrivals": "Nuovi Arrivi",
  "nav.bestSellers": "Più venduti",

  "stores.title": "I nostri negozi",
  "stores.subtext": "I nostri punti vendita in Piemonte e Liguria. Seleziona una città per vedere la mappa.",
  "stores.selectPrompt": "Seleziona un negozio dall'elenco per vedere la mappa.",
  "stores.viewOnMaps": "Apri in Google Maps",

  "category.men.desc": "Stili a rotazione rapida per tutti i giorni, a un prezzo che tiene il passo.",
  "category.women.desc": "Un'ampia gamma di stili per ogni occasione, a un prezzo che ti permette di comprare spesso.",
  "category.promotion.desc": "Le scelte della stagione, scontate. Aggiornate al variare delle promozioni.",
  "category.kids.desc": "In arrivo — la linea bambini sta per arrivare.",
  "category.new.desc": "Gli ultimi arrivi, tutti in un posto.",
  "category.bestSellers.desc": "Quello che va sempre a ruba.",

  "footer.shopHeader": "Shop",
  "footer.helpHeader": "Assistenza",
  "footer.followHeader": "Seguici",
  "footer.newsletterHeader": "Newsletter",
  "footer.newsletterBlurb": "Iscriviti per l'accesso anticipato alle novità.",
  "footer.about": "Chi siamo",
  "footer.sizeGuide": "Guida alle taglie",
  "footer.contact": "Contatti",
  "footer.instagram": "Instagram",
  "footer.pinterest": "Pinterest",
  "footer.tiktok": "TikTok",
  "footer.copyright": "© {year} Ishue. Tutti i diritti riservati.",

  "newsletter.placeholder": "Indirizzo email",
  "newsletter.join": "Iscriviti",
  "newsletter.thanks": "Grazie — sei in lista.",

  "breadcrumb.home": "Home",

  "hero.tag": "Nuova stagione, appena arrivata",
  "hero.headline": "Uno stile al passo con te",
  "hero.subtext": "I look che vuoi, a un prezzo che ti permette di comprare per ogni occasione.",

  "home.currentPromotion": "Promozione in corso",
  "home.bestsellers": "Più venduti",

  "promo.shopEditWomen": "Scopri la selezione — Donna",
  "promo.shopEditMen": "Scopri la selezione — Uomo",

  "brand.body":
    "Ishue si basa su tre pilastri: un'ampia gamma di stili per ogni età e occasione, prezzi più bassi dei grandi marchi a parità di qualità, e un catalogo che si rinnova in fretta così c'è sempre qualcosa di nuovo da scoprire.",
  "brand.moreLink": "Scopri di più su Ishue",

  "style.header": "Scopri per stile",
  "style.subtext": "Un solo brand, ogni occasione — scegli uno stile da esplorare.",

  "shopTheLook.header": "Scopri il look",
  "shopTheLook.subtext": "Abbinamenti d'esempio dal nostro catalogo — presto con i look reali.",
  "look.casual": "L'abbinamento casual",
  "look.goingOut": "L'abbinamento per la serata",
  "look.layered": "L'abbinamento a strati",

  "arrow.viewAll": "Vedi tutto",
  "arrow.scrollLeft": "Scorri {title} a sinistra",
  "arrow.scrollRight": "Scorri {title} a destra",

  "filters.title": "Filtri",
  "filters.clearAll": "Cancella tutto",
  "filters.promoOnly": "Mostra solo le promozioni",
  "filters.price": "Prezzo",
  "filters.priceAll": "Tutti i prezzi",
  "filters.priceUnder75": "Sotto i 75 €",
  "filters.price75to150": "75 € – 150 €",
  "filters.priceOver150": "Oltre 150 €",
  "filters.type": "Tipo",
  "filters.typeAll": "Tutti i tipi",
  "filters.color": "Colore",
  "filters.colorAll": "Tutti i colori",
  "filters.fit": "Vestibilità",
  "filters.fitAll": "Tutte le vestibilità",
  "filters.features": "Dettagli",
  "filters.featuresAll": "Tutti i dettagli",
  "filters.size": "Taglia",
  "filters.sizeAll": "Tutte",

  "vibe.casual": "Casual",
  "vibe.everyday": "Tutti i giorni",
  "vibe.goingOut": "Serata",
  "vibe.statement": "Statement",
  "vibe.layering": "A strati",
  "filters.mobileButton": "Filtri",
  "filters.mobileClose": "Chiudi filtri",
  "filters.showItems": "Mostra {count} {item}",

  "grid.sortBy": "Ordina per",
  "grid.sortFeatured": "In evidenza",
  "grid.sortNewest": "Novità",
  "grid.sortPriceAsc": "Prezzo: dal più basso",
  "grid.sortPriceDesc": "Prezzo: dal più alto",
  "grid.itemCount": "{count} {item}",
  "grid.itemSingular": "articolo",
  "grid.itemPlural": "articoli",
  "grid.noMatches": "Nessun articolo corrisponde a questi filtri.",

  "comingSoon.label": "In arrivo",

  "badge.new": "Novità",
  "badge.bestSeller": "Più venduto",
  "badge.backInStock": "Di nuovo disponibile",

  "fav.addCard": "Aggiungi {name} ai preferiti",
  "fav.removeCard": "Rimuovi {name} dai preferiti",
  "fav.add": "Aggiungi ai preferiti",
  "fav.remove": "Rimuovi dai preferiti",

  "pdp.size": "Taglia",
  "pdp.sizeGuide": "Guida alle taglie",
  "pdp.contactInstagram": "Scrivici su Instagram",
  "pdp.youMightAlsoLike": "Potrebbe piacerti anche",
  "pdp.showImage": "Mostra immagine {n}",

  "search.title": "Cerca",
  "search.placeholder": "Cerca prodotti",
  "search.closeAria": "Chiudi la ricerca",
  "search.popularSearches": "Ricerche popolari",
  "search.noMatches": "Nessun risultato per “{query}” — prova con “{term1}” o “{term2}”.",

  "auth.title": "Registrati o accedi",
  "auth.subtitle": "Salva i preferiti e vai più veloce la prossima volta.",
  "auth.emailLabel": "Email",
  "auth.emailPlaceholder": "tu@esempio.com",
  "auth.continue": "Continua",
  "auth.or": "oppure",
  "auth.appleSignIn": "Accedi con Apple",
  "auth.appleNote":
    "Accedi con Apple richiede un vero account Apple Developer e un backend per verificare i token — non disponibile in questa versione di anteprima. Continua con l'email qui sopra.",
  "auth.disclaimer": "Questo è un accesso segnaposto per l'anteprima — non serve password né verifica.",
  "auth.close": "Chiudi",

  "favoritesPage.title": "Preferiti",
  "favoritesPage.loginPrompt": "Accedi per vedere gli articoli che hai salvato.",
  "favoritesPage.loginButton": "Accedi",
  "favoritesPage.empty": "Non hai ancora salvato nulla.",
  "favoritesPage.continueShopping": "Continua lo shopping",

  "about.h1": "Chi siamo",
  "about.p1":
    "Testo segnaposto — paragrafo \"Chi siamo\". Sarà sostituito con i contenuti reali del brand non appena saranno pronti.",
  "about.p2":
    "Testo segnaposto — paragrafo \"Cosa rappresentiamo\". Sarà sostituito con i contenuti reali del brand non appena saranno pronti.",
  "about.photoStorefront": "Foto della vetrina — in arrivo",
  "about.photoInterior": "Foto dell'interno del negozio — in arrivo",
} as const;

type DictKey = keyof typeof it;

const en: Record<DictKey, string> = {
  "header.searchPlaceholder": "Search products",
  "header.openMenu": "Open menu",
  "header.closeMenu": "Close menu",
  "header.logIn": "Log in",
  "header.accountMenu": "Account menu",
  "header.logOut": "Log out",
  "header.favorites": "Favorites",
  "header.shopAll": "Shop all {category}",
  "header.shopByStyle": "Shop by style",
  "header.language": "Language",
  "header.storeLocator": "Find a store",

  "nav.men": "Men",
  "nav.women": "Women",
  "nav.promotion": "Promotion",
  "nav.kids": "Kids",
  "nav.new": "New",
  "nav.newArrivals": "New Arrivals",
  "nav.bestSellers": "Best Sellers",

  "stores.title": "Our Stores",
  "stores.subtext": "Our stores across Piemonte and Liguria. Select a city to see it on the map.",
  "stores.selectPrompt": "Select a store from the list to see its location.",
  "stores.viewOnMaps": "Open in Google Maps",

  "category.men.desc": "Fast-turnover styles for everyday wear, priced to keep up with your rotation.",
  "category.women.desc": "A wide range of styles for every occasion, at a price that lets you shop often.",
  "category.promotion.desc": "This season's picks, marked down. Updated as promotions change.",
  "category.kids.desc": "Coming soon — the kids line is on its way.",
  "category.new.desc": "The latest arrivals, in one place.",
  "category.bestSellers.desc": "What keeps selling out.",

  "footer.shopHeader": "Shop",
  "footer.helpHeader": "Help",
  "footer.followHeader": "Follow",
  "footer.newsletterHeader": "Newsletter",
  "footer.newsletterBlurb": "Sign up for early access to new arrivals.",
  "footer.about": "About",
  "footer.sizeGuide": "Size Guide",
  "footer.contact": "Contact",
  "footer.instagram": "Instagram",
  "footer.pinterest": "Pinterest",
  "footer.tiktok": "TikTok",
  "footer.copyright": "© {year} Ishue. All rights reserved.",

  "newsletter.placeholder": "Email address",
  "newsletter.join": "Join",
  "newsletter.thanks": "Thanks — you're on the list.",

  "breadcrumb.home": "Home",

  "hero.tag": "New season, just in",
  "hero.headline": "Style that keeps up with you",
  "hero.subtext": "The looks you want, at a price that lets you shop for every occasion.",

  "home.currentPromotion": "Current promotion",
  "home.bestsellers": "Bestsellers",

  "promo.shopEditWomen": "Shop the edit — Women",
  "promo.shopEditMen": "Shop the edit — Men",

  "brand.body":
    "Ishue is built on three things: a wide range of styles for every age and occasion, prices below the big names for comparable quality, and a catalog that turns over fast so there's always something new to shop.",
  "brand.moreLink": "More about Ishue",

  "style.header": "Shop by style",
  "style.subtext": "One brand, every occasion — pick a style to explore.",

  "shopTheLook.header": "Shop the Look",
  "shopTheLook.subtext": "Sample pairings from our catalog — real looks coming soon.",
  "look.casual": "The casual pairing",
  "look.goingOut": "The going-out pairing",
  "look.layered": "The layered pairing",

  "arrow.viewAll": "View all",
  "arrow.scrollLeft": "Scroll {title} left",
  "arrow.scrollRight": "Scroll {title} right",

  "filters.title": "Filters",
  "filters.clearAll": "Clear all",
  "filters.promoOnly": "Only show promotions",
  "filters.price": "Price",
  "filters.priceAll": "All prices",
  "filters.priceUnder75": "Under €75",
  "filters.price75to150": "€75 – €150",
  "filters.priceOver150": "Over €150",
  "filters.type": "Type",
  "filters.typeAll": "All types",
  "filters.color": "Color",
  "filters.colorAll": "All colors",
  "filters.fit": "Fit",
  "filters.fitAll": "All fits",
  "filters.features": "Features",
  "filters.featuresAll": "All features",
  "filters.size": "Size",
  "filters.sizeAll": "All",

  "vibe.casual": "Casual",
  "vibe.everyday": "Everyday",
  "vibe.goingOut": "Going Out",
  "vibe.statement": "Statement",
  "vibe.layering": "Layering",
  "filters.mobileButton": "Filters",
  "filters.mobileClose": "Close filters",
  "filters.showItems": "Show {count} {item}",

  "grid.sortBy": "Sort by",
  "grid.sortFeatured": "Featured",
  "grid.sortNewest": "Newest",
  "grid.sortPriceAsc": "Price: low to high",
  "grid.sortPriceDesc": "Price: high to low",
  "grid.itemCount": "{count} {item}",
  "grid.itemSingular": "item",
  "grid.itemPlural": "items",
  "grid.noMatches": "No items match those filters.",

  "comingSoon.label": "Coming soon",

  "badge.new": "New",
  "badge.bestSeller": "Best Seller",
  "badge.backInStock": "Back in Stock",

  "fav.addCard": "Add {name} to favorites",
  "fav.removeCard": "Remove {name} from favorites",
  "fav.add": "Add to favorites",
  "fav.remove": "Remove from favorites",

  "pdp.size": "Size",
  "pdp.sizeGuide": "Size guide",
  "pdp.contactInstagram": "Message us on Instagram",
  "pdp.youMightAlsoLike": "You might also like",
  "pdp.showImage": "Show image {n}",

  "search.title": "Search",
  "search.placeholder": "Search products",
  "search.closeAria": "Close search",
  "search.popularSearches": "Popular searches",
  "search.noMatches": "No matches for “{query}” — try “{term1}” or “{term2}”.",

  "auth.title": "Sign up or log in",
  "auth.subtitle": "Save favorites and check out faster.",
  "auth.emailLabel": "Email",
  "auth.emailPlaceholder": "you@example.com",
  "auth.continue": "Continue",
  "auth.or": "or",
  "auth.appleSignIn": "Sign in with Apple",
  "auth.appleNote":
    "Apple Sign-In needs a real Apple Developer account and backend to verify tokens — not available in this preview build. Continue with email above instead.",
  "auth.disclaimer": "This is a placeholder sign-in for preview purposes — no password or verification required.",
  "auth.close": "Close",

  "favoritesPage.title": "Favorites",
  "favoritesPage.loginPrompt": "Log in to see the items you've saved.",
  "favoritesPage.loginButton": "Log in",
  "favoritesPage.empty": "You haven't saved anything yet.",
  "favoritesPage.continueShopping": "Continue shopping",

  "about.h1": "About us",
  "about.p1": "Placeholder text — \"who we are\" paragraph. This will be replaced with real brand copy once it's ready.",
  "about.p2":
    "Placeholder text — \"what we stand for\" paragraph. This will be replaced with real brand copy once it's ready.",
  "about.photoStorefront": "Storefront photo — coming soon",
  "about.photoInterior": "Store interior photo — coming soon",
};

export const dictionaries: Record<Locale, Record<DictKey, string>> = { it, en };
export type { DictKey };

// Catalog-derived vocabulary (style/color/fit/feature words) is functional
// data, not copy — the English value stays the canonical value used for
// filtering/URLs/state; these maps only translate what's displayed.
const STYLE_IT: Record<string, string> = {
  Blazer: "Blazer",
  Blouse: "Camicetta",
  Cami: "Canotta",
  Dress: "Abito",
  Jeans: "Jeans",
  Joggers: "Jogger",
  Jumpsuit: "Tuta intera",
  Kimono: "Kimono",
  Set: "Completo",
  Shirt: "Camicia",
  Shorts: "Shorts",
  Skirt: "Gonna",
  Tee: "T-shirt",
  Top: "Top",
  Trousers: "Pantaloni",
};

const COLOR_IT: Record<string, string> = {
  Black: "Nero",
  Blue: "Blu",
  Brown: "Marrone",
  Green: "Verde",
  Gray: "Grigio",
  Multicolor: "Multicolore",
  Orange: "Arancione",
  Pink: "Rosa",
  Purple: "Viola",
  Red: "Rosso",
  White: "Bianco",
  Yellow: "Giallo",
};

const FIT_IT: Record<string, string> = {
  Oversized: "Oversize",
  "Slim / Fitted": "Slim / Aderente",
  Regular: "Regolare",
};

const FEATURE_IT: Record<string, string> = {
  Rhinestone: "Strass",
  Sequin: "Paillettes",
  Beaded: "Perline",
  Embroidered: "Ricamato",
  "Polka dot": "Pois",
  Floral: "Floreale",
  "Tie-dye": "Tie-dye",
  "Leopard print": "Stampa leopardata",
  "Chevron knit": "Maglia a chevron",
  Pleated: "Plissettato",
  Ruffle: "Rouches",
  Drawstring: "Coulisse",
  Linen: "Lino",
  Denim: "Denim",
  Silk: "Seta",
  Lace: "Pizzo",
  Mesh: "Rete",
  Applique: "Applicazioni",
  Striped: "A righe",
  Colorblock: "Color block",
  Cutout: "Cut-out",
  Halter: "Halter",
  Strapless: "Senza spalline",
  "Off-shoulder": "Spalle scoperte",
  "Puff sleeve": "Manica a sbuffo",
};

export function translateTag(
  kind: "style" | "color" | "fit" | "feature",
  value: string,
  locale: Locale
): string {
  if (locale === "en") return value;
  const map = kind === "style" ? STYLE_IT : kind === "color" ? COLOR_IT : kind === "fit" ? FIT_IT : FEATURE_IT;
  return map[value] ?? value;
}
