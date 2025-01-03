import { redirect, useLoaderData } from "react-router-dom";
import planApi, { PlanData } from "../apis/planApi";
import CallToAction from "../components/website/landing/CallToAction";
import Contact from "../components/website/landing/Contact";
import Faqs from "../components/website/landing/Faqs";
import Features from "../components/website/landing/Features";
import Home from "../components/website/landing/Home";
import HowItWorks from "../components/website/landing/HowItWorks";
import Metrics from "../components/website/landing/Metrics";
import Pricing from "../components/website/landing/Pricing";
import Testimonial from "../components/website/landing/Testimonial";
import platformUtil from "../utils/platformUtil";

interface LoaderProps {
  plans: PlanData[];
}

export async function landingLoader() {
  if (!platformUtil.is("web")) return redirect("/splash");
  const plans = await planApi.list();
  return { plans };
}

export function Landing() {
  const { plans } = useLoaderData() as LoaderProps;

  return (
    <>
      <Home />
      <HowItWorks />
      <Features />
      <Testimonial />
      <Metrics />
      <Pricing plans={plans} />
      <Faqs />
      <CallToAction />
      <Contact />
    </>
  );
}
