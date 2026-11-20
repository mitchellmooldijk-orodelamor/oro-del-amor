/** Veelgestelde vragen op de Pups-pagina. Tekst afgestemd met de kennel. */

export type FaqBlock =
  | { type: "p"; text: string }
  | { type: "list"; intro?: string; items: { lead?: string; text: string }[] };

export type FaqItem = { id: string; question: string; answer: FaqBlock[] };

export type FaqGroup = {
  /** Wordt ook gebruikt als anker op de pagina, bijv. /faq#dekreu. */
  id: string;
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export const puppyFaq: FaqGroup = {
  id: "faq",
  eyebrow: "Voor toekomstige puppybaasjes",
  title: "Van wachtlijst tot thuis",
  items: [
    {
      id: "wachtlijst",
      question: "Hoe werkt de inschrijving op de wachtlijst en de toewijzing van een pup?",
      answer: [
        {
          type: "p",
          text: "Via het aanmeldformulier op onze wachtlijstpagina kun je je interesse kenbaar maken. Wij vinden het welzijn van onze pups en een perfecte match met het nieuwe thuis het allerbelangrijkste. Daarom werken wij met een vragenlijst waarin we vragen naar jouw woonsituatie, leefritme en ervaring.",
        },
        {
          type: "p",
          text: "Aan de hand van de antwoorden uit het formulier nodigen wij je wel of niet uit voor een persoonlijke kennismaking. Zo kan het ook voorkomen dat we op basis van de antwoorden besluiten dit niet te doen. Zo waarborgen we dat ieder hondje in het best passende gouden mandje terechtkomt.",
        },
      ],
    },
    {
      id: "kraamvisite",
      question: "Vanaf welke leeftijd mogen we op kraamvisite komen?",
      answer: [
        {
          type: "p",
          text: "De eerste weken hebben de moederhond en haar pups absolute rust nodig om te herstellen en goed te groeien. De bezoeken vinden plaats op twee momenten: bij een leeftijd van 4 weken en bij 6 weken. De persoonlijke kennismaking is dan al geweest, zoals vermeld bij de vraag over de wachtlijst.",
        },
      ],
    },
    {
      id: "updates",
      question: "Hoe houden jullie ons op de hoogte na de bevalling?",
      answer: [
        {
          type: "p",
          text: "We houden iedereen op de hoogte via WhatsApp. Hier delen we verhalen, updates en foto's van de groei van de pups. Ook kunnen onze socials gevolgd worden voor de dagelijkse foto's en updates.",
        },
      ],
    },
    {
      id: "socialisatie",
      question: "Hoe groeien de pups bij jullie op (socialisatie)?",
      answer: [
        {
          type: "p",
          text: "Onze pups worden met veel liefde in onze huiskamer geboren en grootgebracht, midden in ons gezin van 7. Hierdoor wennen ze vanaf dag één aan alle dagelijkse huishoudelijke geluiden (zoals de stofzuiger en tv), het samenzijn met onze kinderen Chezz en Romée, en onze andere honden. Zo krijgen ze een stabiele, zelfverzekerde en sociale basis mee.",
        },
      ],
    },
    {
      id: "leeftijd",
      question: "Op welke leeftijd mag de pup mee naar huis?",
      answer: [
        {
          type: "p",
          text: "Onze pups mogen rond de leeftijd van 8 à 9 weken verhuizen naar hun nieuwe gouden mandje. Op dat moment zijn ze zelfstandig genoeg, meermalen ontwormd, ingeënt, gechipt en grondig gecontroleerd door onze dierenarts.",
        },
      ],
    },
    {
      id: "meegeven",
      question: "Wat krijgt de pup allemaal mee bij vertrek?",
      answer: [
        {
          type: "list",
          intro: "Iedere pup vertrekt met:",
          items: [
            {
              text: "Een officiële FCI-stamboom — deze schrijven wij over en wordt later door de Raad van Beheer opgestuurd",
            },
            { text: "Een geregistreerd Europees dierenpaspoort" },
            { text: "Een microchip en officiële registratie in de databank" },
            { text: "Leeftijdsgebonden vaccinaties en ontwormingsschema" },
            {
              text: "Een uitgebreid puppypakket inclusief het vertrouwde voer en een dekentje of speeltje met de geur van het nest",
            },
          ],
        },
      ],
    },
    {
      id: "koopovereenkomst",
      question: "Werken jullie met een officiële koopovereenkomst?",
      answer: [
        {
          type: "p",
          text: "Ja, al onze pups worden verkocht met een duidelijke, schriftelijke koopovereenkomst. Hierin zijn alle afspraken, gezondheidsverklaringen en garanties conform het fokreglement vastgelegd, zodat beide partijen met een vertrouwd en gerust gevoel de toekomst tegemoet gaan.",
        },
      ],
    },
    {
      id: "eerste-weken",
      question: "Wat kunnen we verwachten in de eerste weken thuis (en de eerste nachten)?",
      answer: [
        {
          type: "p",
          text: "De verhuizing naar een nieuwe omgeving is een enorme verandering voor een jonge pup. Hij verlaat zijn vertrouwde omgeving, zijn moeder en zijn nestgenootjes. Het is dan ook volkomen begrijpelijk dat je pup de eerste dagen en nachten best spannend vindt en onrustig kan zijn of wat piept.",
        },
        {
          type: "list",
          intro: "Onze tips voor een veilige en rustige start:",
          items: [
            {
              lead: "Slapen in een bench",
              text: "Wij raden aan om je pup de eerste weken in een bench te laten slapen. Hier ligt hij rustig, geborgen en het veiligst; zo kan hij ’s nachts niet door het huis gaan ronddwalen of zich ergens aan bezeren. Bovendien bevordert het slapen in een bench het zindelijk maken.",
            },
            {
              lead: "Vaste slaapplek",
              text: "Zet de bench direct op de plek waar je later ook zijn vaste kussen of mand neer wilt zetten. Zo went hij vanaf dag één aan zijn eigen vertrouwde slaapplaats.",
            },
            {
              lead: "Veiligheid eerst",
              text: "Doe ’s nachts altijd de halsband af (ook in de bench), zodat je pup nergens met zijn halsband achter kan blijven haken.",
            },
            {
              lead: "Rust en regelmaat",
              text: "De eerste weken staan volledig in het teken van wennen binnen jullie gezin. Wees in het begin terughoudend met te veel visite en drukke uitstapjes, zodat de pup in alle rust een hechte, veilige band met jullie kan opbouwen.",
            },
          ],
        },
      ],
    },
    {
      id: "puppycursus",
      question: "Raden jullie een puppycursus aan?",
      answer: [
        {
          type: "p",
          text: "Zeker, dat raden wij van harte aan! Een positieve puppycursus bij een erkende hondenschool is niet alleen heel leerzaam voor de basiscommando’s, maar vooral cruciaal voor de verdere socialisatie. Jouw pup leert op een gecontroleerde manier omgaan met andere honden, mensen en prikkels. Bovendien versterkt het samen trainen op een speelse manier de band en het wederzijds vertrouwen tussen jou en je pup.",
        },
      ],
    },
    {
      id: "dierenarts",
      question: "Moeten we na thuiskomst direct naar de eigen dierenarts?",
      answer: [
        {
          type: "p",
          text: "Wij adviseren altijd om binnen de eerste twee weken na aankomst een afspraak te maken bij een dierenarts bij jullie in de buurt. Dit is een ideale, ontspannen kennismaking: de dierenarts kan de pup even rustig nakijken, het paspoort registreren en het vaccinatieschema doornemen. Zo staat jullie pup direct ingeschreven en weet je zeker waar je terecht kunt als er onverhoopt eens iets aan de hand is.",
        },
      ],
    },
    {
      id: "nazorg",
      question: "Kunnen we ook na de verhuizing bij jullie terecht voor vragen?",
      answer: [
        {
          type: "p",
          text: "Absoluut. Onze betrokkenheid stopt niet bij de voordeur. Wij staan altijd klaar voor advies over opvoeding, vachtverzorging, voeding of gewoon voor een gezellige update met foto's. We bouwen graag een levenslange band op met de baasjes van onze pups.",
        },
      ],
    },
  ],
};

export const studFaq: FaqGroup = {
  id: "dekreu",
  eyebrow: "Voor fokkers",
  title: "Dekaanvragen Nacho",
  items: [
    {
      id: "beschikbaar",
      question: "Is Nacho beschikbaar als dekreu voor andere fokkers?",
      answer: [
        {
          type: "p",
          text: "Ja, Nacho staat op beperkte basis ter dekking voor goedgekeurde, passende teven van serieuze fokkers. Omdat wij de gezondheid en het welzijn van het ras vooropstellen, hanteren wij strikte selectiecriteria en fokken wij uitsluitend volgens de normen van de Nederlandse Keeshonden Club (NKC) en de Raad van Beheer.",
        },
      ],
    },
    {
      id: "voorwaarden",
      question: "Aan welke voorwaarden moet de teef voldoen voor een dekking?",
      answer: [
        {
          type: "list",
          intro:
            "Om de kwaliteit en gezondheid van de nakomelingen te waarborgen, stellen wij de volgende voorwaarden aan de teef:",
          items: [
            {
              lead: "FCI-stamboom",
              text: "De teef dient in het bezit te zijn van een officiële, door de FCI erkende stamboom.",
            },
            {
              lead: "Gezondheidstesten conform NKC",
              text: "Een officiële Patella Luxatie beoordeling (volgens het Meutstege-protocol van de Raad van Beheer) en een geldige officiële SM/CM screening (Syringomyelie / Chiari-like Malformatie) via MRI.",
            },
            {
              lead: "Leeftijd & welzijn",
              text: "De teef voldoet aan de minimale en maximale leeftijds- en nestgrenzen van het fokreglement (minimaal 18 maanden oud bij de eerste dekking).",
            },
            {
              lead: "Algemene conditie",
              text: "De teef is klinisch kerngezond, up-to-date met vaccinaties en ontworming, en vrij van overdraagbare aandoeningen of parasieten.",
            },
            {
              lead: "Verantwoorde combinatie",
              text: "De stambomen worden vooraf gecontroleerd op een verantwoord inteeltpercentage (inteeltcoëfficiënt) en er mag geen sprake zijn van verboden kleurcombinaties (zoals merle × merle).",
            },
          ],
        },
      ],
    },
    {
      id: "verloop",
      question: "Hoe verloopt de dekking en wat zijn de afspraken als de teef leeg blijft?",
      answer: [
        {
          type: "list",
          intro: "Wij werken altijd met een schriftelijke dekovereenkomst waarin alle afspraken transparant zijn vastgelegd.",
          items: [
            {
              lead: "Timing",
              text: "We adviseren om tijdig progesteron te laten prikken bij de dierenarts, zodat het optimale dekmoment nauwkeurig kan worden bepaald.",
            },
            {
              lead: "Begeleiding",
              text: "De dekking vindt plaats in een rustige, ontspannen setting bij ons thuis, waarbij het welzijn van beide hondjes te allen tijde centraal staat.",
            },
            {
              lead: "Dekgarantie",
              text: "Blijft de teef onverhoopt leeg (aangetoond met een officiële echoverklaring van de dierenarts binnen de gestelde termijn), dan heeft de eigenaar van de teef bij de eerstvolgende loopsheid recht op een kosteloze herdekking door Nacho (mits hij beschikbaar is).",
            },
          ],
        },
      ],
    },
  ],
};
