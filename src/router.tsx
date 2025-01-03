import { createBrowserRouter } from "react-router-dom";
import { Layout, layoutLoader } from "./components/Layout";
import WebsiteLayout from "./components/website/Layout";
import App, { appLoader } from "./components/App";
import { planLoader } from "./pages/admin/Plans";
import { planEditLoader } from "./pages/admin/PlanEdit";
import { pagesPublicLoader } from "./pages/user/PagesPublic";
import { colorLoader } from "./pages/user/Color";
import { checkoutLoader } from "./pages/user/Checkout";
import { landingLoader } from "./pages/Landing";
import { pagesFavoriteLoader } from "./pages/user/PagesFavorite";
import { pagesColoredLoader } from "./pages/user/PagesColored";
import { pagesLoader } from "./pages/user/Pages";
import { adminPagesLoader } from "./pages/admin/Pages";
import { adminUsersLoader } from "./pages/admin/Users";
import { adminSubscriptionsLoader } from "./pages/admin/Subscriptions";
import { userAccountLoader } from "./pages/user/Account";
import { adminColoredsLoader } from "./pages/admin/PagesColored";
import { dashboardLoader } from "./pages/admin/Dashboard";
import { adminAccountLoader } from "./pages/admin/Account";
import { userPageCreateLoader } from "./pages/user/PageCreate";
import { userEditLoader } from "./pages/admin/UserEdit";

const router = createBrowserRouter([
  {
    path: "",
    loader: appLoader,
    element: <App />,
    children: [
      {
        path: "/admin/create",
        async lazy() {
          const { AdminCreate } = await import("./pages/AdminCreate");
          return { Component: AdminCreate };
        },
      },
      {
        path: "/sign-in",
        async lazy() {
          const { SignIn } = await import("./pages/SignIn");
          return { Component: SignIn };
        },
      },
      {
        path: "/sign-up",
        async lazy() {
          const { SignUp } = await import("./pages/SignUp");
          return { Component: SignUp };
        },
      },
      {
        path: "/verify/:token",
        async lazy() {
          const { Verify } = await import("./pages/Verify");
          return { Component: Verify };
        },
      },
      {
        path: "/payment",
        async lazy() {
          const { PaymentResult } = await import("./pages/PaymentResult");
          return { Component: PaymentResult };
        },
      },
      {
        path: "/splash",
        async lazy() {
          const { Splash } = await import("./pages/Splash");
          return { Component: Splash };
        },
      },
      {
        path: "/",
        element: <WebsiteLayout />,
        children: [
          {
            path: "",
            loader: landingLoader,
            async lazy() {
              const { Landing } = await import("./pages/Landing");
              return { Component: Landing };
            },
          },
          {
            path: "privacy",
            async lazy() {
              const { Privacy } = await import("./pages/Privacy");
              return { Component: Privacy };
            },
          },
          {
            path: "terms",
            async lazy() {
              const { Terms } = await import("./pages/Terms");
              return { Component: Terms };
            },
          },
        ],
      },
      {
        path: "/",
        element: <Layout />,
        loader: layoutLoader,
        children: [
          {
            path: "/pages/:id/color",
            loader: colorLoader,
            async lazy() {
              const { Color } = await import("./pages/user/Color");
              return { Component: Color };
            },
          },
          {
            path: "/pages",
            loader: pagesLoader,
            async lazy() {
              const { Pages } = await import("./pages/user/Pages");
              return { Component: Pages };
            },
          },
          {
            path: "/pages/create",
            loader: userPageCreateLoader,
            async lazy() {
              const { PageCreate } = await import("./pages/user/PageCreate");
              return { Component: PageCreate };
            },
          },
          {
            path: "/pages/public",
            loader: pagesPublicLoader,
            async lazy() {
              const { PagesPublic } = await import("./pages/user/PagesPublic");
              return { Component: PagesPublic };
            },
          },
          {
            path: "/pages/favorite",
            loader: pagesFavoriteLoader,
            async lazy() {
              const { PagesFavorite } = await import(
                "./pages/user/PagesFavorite"
              );
              return { Component: PagesFavorite };
            },
          },
          {
            path: "/pages/colored",
            loader: pagesColoredLoader,
            async lazy() {
              const { PagesColored } = await import(
                "./pages/user/PagesColored"
              );
              return { Component: PagesColored };
            },
          },
          {
            path: "/checkout",
            loader: checkoutLoader,
            async lazy() {
              const { Checkout } = await import("./pages/user/Checkout");
              return { Component: Checkout };
            },
          },
          {
            path: "/account",
            loader: userAccountLoader,
            async lazy() {
              const { Account } = await import("./pages/user/Account");
              return { Component: Account };
            },
          },
        ],
      },
      {
        path: "/admin",
        element: <Layout />,
        loader: layoutLoader,
        children: [
          {
            path: "",
            loader: dashboardLoader,
            async lazy() {
              const { Dashboard } = await import("./pages/admin/Dashboard");
              return { Component: Dashboard };
            },
          },
          {
            path: "pages",
            loader: adminPagesLoader,
            async lazy() {
              const { Pages } = await import("./pages/admin/Pages");
              return { Component: Pages };
            },
          },
          {
            path: "pages/colored",
            loader: adminColoredsLoader,
            async lazy() {
              const { PagesColored } = await import(
                "./pages/admin/PagesColored"
              );
              return { Component: PagesColored };
            },
          },
          {
            path: "website",
            async lazy() {
              const { Website } = await import("./pages/admin/Website");
              return { Component: Website };
            },
          },
          {
            path: "website/home",
            async lazy() {
              const { HomeEdit } = await import(
                "./pages/admin/website/HomeEdit"
              );
              return { Component: HomeEdit };
            },
          },
          {
            path: "website/how-it-works",
            async lazy() {
              const { HowItWorksEdit } = await import(
                "./pages/admin/website/HowItWorksEdit"
              );
              return { Component: HowItWorksEdit };
            },
          },
          {
            path: "website/features",
            async lazy() {
              const { FeaturesEdit } = await import(
                "./pages/admin/website/FeaturesEdit"
              );
              return { Component: FeaturesEdit };
            },
          },
          {
            path: "website/testimonial",
            async lazy() {
              const { TestimonialEdit } = await import(
                "./pages/admin/website/TestimonialEdit"
              );
              return { Component: TestimonialEdit };
            },
          },
          {
            path: "website/metrics",
            async lazy() {
              const { MetricsEdit } = await import(
                "./pages/admin/website/MetricsEdit"
              );
              return { Component: MetricsEdit };
            },
          },
          {
            path: "website/pricing",
            async lazy() {
              const { PricingEdit } = await import(
                "./pages/admin/website/PricingEdit"
              );
              return { Component: PricingEdit };
            },
          },
          {
            path: "website/faqs",
            async lazy() {
              const { FaqsEdit } = await import(
                "./pages/admin/website/FaqsEdit"
              );
              return { Component: FaqsEdit };
            },
          },
          {
            path: "website/call-to-action",
            async lazy() {
              const { CallToActionEdit } = await import(
                "./pages/admin/website/CallToActionEdit"
              );
              return { Component: CallToActionEdit };
            },
          },
          {
            path: "website/contact",
            async lazy() {
              const { ContactEdit } = await import(
                "./pages/admin/website/ContactEdit"
              );
              return { Component: ContactEdit };
            },
          },
          {
            path: "website/footer",
            async lazy() {
              const { FooterEdit } = await import(
                "./pages/admin/website/FooterEdit"
              );
              return { Component: FooterEdit };
            },
          },
          {
            path: "website/terms",
            async lazy() {
              const { TermsEdit } = await import(
                "./pages/admin/website/TermsEdit"
              );
              return { Component: TermsEdit };
            },
          },
          {
            path: "website/privacy",
            async lazy() {
              const { PrivacyEdit } = await import(
                "./pages/admin/website/PrivacyEdit"
              );
              return { Component: PrivacyEdit };
            },
          },
          {
            path: "users",
            loader: adminUsersLoader,
            async lazy() {
              const { Users } = await import("./pages/admin/Users");
              return { Component: Users };
            },
          },
          {
            path: "users/create",
            async lazy() {
              const { UserCreate } = await import("./pages/admin/UserCreate");
              return { Component: UserCreate };
            },
          },
          {
            path: "users/:id/edit",
            loader: userEditLoader,
            async lazy() {
              const { UserEdit } = await import("./pages/admin/UserEdit");
              return { Component: UserEdit };
            },
          },
          {
            path: "subscriptions",
            loader: adminSubscriptionsLoader,
            async lazy() {
              const { Subscriptions } = await import(
                "./pages/admin/Subscriptions"
              );
              return { Component: Subscriptions };
            },
          },
          {
            path: "plans",
            loader: planLoader,
            async lazy() {
              const { Plans } = await import("./pages/admin/Plans");
              return { Component: Plans };
            },
          },
          {
            path: "plans/:id/edit",
            loader: planEditLoader,
            async lazy() {
              const { PlanEdit } = await import("./pages/admin/PlanEdit");
              return { Component: PlanEdit };
            },
          },
          {
            path: "account",
            loader: adminAccountLoader,
            async lazy() {
              const { Account } = await import("./pages/admin/Account");
              return { Component: Account };
            },
          },
        ],
      },
      {
        path: "*",
        async lazy() {
          const { NotFound } = await import("./pages/NotFound");
          return { Component: NotFound };
        },
      },
    ],
  },
]);

export default router;
