import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import {
  get as getByPath,
  omit,
  set as setByPath,
  some,
  values,
} from "lodash-es";
import { StatusResult } from "../apis/appApi";

interface Website {
  landing: LandingSection;
  privacy: Privacy;
  terms: Terms;
}

interface LandingSection {
  home: HomeSection;
  howItWorks: HowItWorksSection;
  features: FeaturesSection;
  testimonials: TestimonialsSection;
  metrics: MetricsSection;
  pricing: PricingSection;
  faqs: FaqsSection;
  callToAction: CallToActionSection;
  contact: ContactSection;
  footer: FooterSection;
}

export interface HomeSection {
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  image: string;
  platforms: Platforms;
  visibility: boolean;
}

export interface HowItWorksSection {
  subheading: string;
  instructions: Instruction[];
  visibility: boolean;
}

export interface Instruction {
  id: string;
  content: string;
}

export interface FeaturesSection {
  subheading: string;
  image: string;
  features: Feature[];
  visibility: boolean;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialsSection {
  subheading: string;
  image: string;
  testimonials: Testimonial[];
  visibility: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  photo: string;
  feedback: string;
}

export interface MetricsSection {
  metrics: Metric[];
  visibility: boolean;
}

export interface Metric {
  id: string;
  key: string;
  value: string;
}

export interface PricingSection {
  subheading: string;
  visibility: boolean;
}

export interface FaqsSection {
  subheading: string;
  image: string;
  support: Support;
  faqs: Faq[];
  visibility: boolean;
}

interface Support {
  heading: string;
  description: string;
  link: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface CallToActionSection {
  heading: string;
  description: string;
  visibility: boolean;
}

export interface ContactSection {
  subheading: string;
  image: string;
  location: string;
  phone: string;
  email: string;
  visibility: boolean;
}

export interface FooterSection {
  socials: Social[];
  visibility: boolean;
}

export interface Social {
  id: string;
  icon: string;
  url: string;
}

export interface Privacy {
  article: string;
  visibility: boolean;
}

export interface Terms {
  article: string;
  visibility: boolean;
}

export interface Platforms {
  web: string;
  android: string;
  ios: string;
  windows: string;
  mac: string;
  debian: string;
}

interface Store {
  status: StatusResult;
  name: string;
  tagline: string;
  favicon: string;
  website: Website | null;
  replaceStatus(status: StatusResult): void;
  readByPath<Data>(path: string): Data;
  updateName(name: string): void;
  updateTagline(tagline: string): void;
  updateFavicon(favicon: string): void;
  updateByPath<Data>(path: string, data: Data): void;
  toggleVisibilityByPath(path: string): void;
  replaceWebsite(website: Website): void;
}

const useAppStore = create<Store>()(
  persist(
    immer((set, get) => ({
      status: {
        openaiApi: false,
        stripeApi: false,
        stripeWebhook: false,
        plans: false,
      },
      name: "",
      tagline: "",
      favicon: "",
      website: null,
      replaceStatus(status) {
        set((state) => {
          state.status = status;
        });
      },
      readByPath(path) {
        const store = get();
        return getByPath(store, path);
      },
      updateName(name) {
        set((state) => {
          state.name = name;
        });
      },
      updateTagline(tagline) {
        set((state) => {
          state.tagline = tagline;
        });
      },
      updateFavicon(favicon) {
        set((state) => {
          state.favicon = favicon;
        });
      },
      toggleVisibilityByPath(path) {
        set((state) => {
          const section = getByPath(state, path);
          section.visibility = !section.visibility;
        });
      },
      updateByPath(path, data) {
        set((state) => {
          setByPath(state, path, data);
        });
      },
      replaceWebsite(website) {
        set((state) => {
          state.website = website;
        });
      },
    })),
    { name: "app" }
  )
);

export function selectHasAnyPlatfrom(state: Store) {
  if (!state.website) return false;
  const platforms = state.website.landing.home.platforms;
  return some(values(platforms), (platform) => platform);
}

export function selectHasAnyDownloadablePlatfrom(state: Store) {
  if (!state.website) return false;
  const platforms = state.website.landing.home.platforms;
  const downloadablePlatforms = omit(platforms, ["web"]);
  return some(values(downloadablePlatforms), (platform) => platform);
}

export const appStore = useAppStore.getState;
export default useAppStore;
