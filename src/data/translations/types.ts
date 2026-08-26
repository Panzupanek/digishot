export type Language = "cz" | "en" | "de";
export type Currency = "CZK" | "EUR";

export interface TranslationData {
  nav: {
    features: string;
    variants: string;
    howItWorks: string;
    gallery: string;
    specs: string;
    faq: string;
    orderNow: string;
    cart: string;
  };
  announcement: {
    dropPrefix: string;
    dropSuffix: string;
    soldOutBadge: string;
  };
  hero: {
    badge: string;
    urgencyTag: string;
    dropDateTitle: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    flashBtn: string;
    flashHint: string;
    socialProof: string;
    priceTag: string;
    soldOutNotice: string;
  };
  variants: {
    sectionTag: string;
    heading: string;
    subheading: string;
    selectColor: string;
    soldOutStatus: string;
    stockBadge: string;
    nextDropNotice: string;
    reserveBtn: string;
    includedInBox: string;
    boxItems: string[];
    sageName: string;
    sageDesc: string;
    blushName: string;
    blushDesc: string;
    classicName: string;
    classicDesc: string;
  };
  specs: {
    sectionTag: string;
    heading: string;
    noScreenTitle: string;
    noScreenDesc: string;
    flashTitle: string;
    flashDesc: string;
    usbTransferTitle: string;
    usbTransferDesc: string;
    unlimitedStorageTitle: string;
    unlimitedStorageDesc: string;
    grainQualityTitle: string;
    grainQualityDesc: string;
  };
  howItWorks: {
    sectionTag: string;
    heading: string;
    subheading: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    demoTitle: string;
    demoSubtitle: string;
    plugBtn: string;
    unplugBtn: string;
    syncingText: string;
    syncedText: string;
    photosDumped: string;
  };
  beforeAfter: {
    sectionTag: string;
    heading: string;
    subheading: string;
    beforeLabel: string;
    afterLabel: string;
    beforeDesc: string;
    afterDesc: string;
    ctaBtn: string;
    scene1: string;
    scene2: string;
    scene3: string;
  };
  comparison: {
    sectionTag: string;
    heading: string;
    subheading: string;
    feature: string;
    digishot: string;
    smartphone: string;
    disposableFilm: string;
    rows: {
      feature: string;
      digishot: string;
      smartphone: string;
      disposableFilm: string;
    }[];
  };
  gallery: {
    sectionTag: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterFestival: string;
    filterParty: string;
    filterAfters: string;
    filterFlash: string;
    hoverHint: string;
  };
  testimonials: {
    sectionTag: string;
    heading: string;
    subheading: string;
    ratingText: string;
    items: {
      name: string;
      handle: string;
      age: string;
      location: string;
      quote: string;
      variantBought: string;
    }[];
  };
  faq: {
    sectionTag: string;
    heading: string;
    subheading: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  waitlist: {
    modalTitle: string;
    modalSubtitle: string;
    selectVariantTitle: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    namePlaceholder: string;
    submitBtn: string;
    perksTitle: string;
    perk1: string;
    perk2: string;
    perk3: string;
    successTitle: string;
    successSubtitle: string;
    vipNumberLabel: string;
    successCodeNote: string;
    closeBtn: string;
  };
  footer: {
    brandTagline: string;
    newsletterTitle: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    subscribeBtn: string;
    subscribed: string;
    privacy: string;
    terms: string;
    shippingPolicy: string;
    copyright: string;
  };
}