import { useShallow } from "zustand/shallow";
import useAppStore, { TestimonialsSection } from "../../../stores/appStore";
import Heading from "../Heading";
import Feedback from "./Feedback";
import { Fragment } from "react/jsx-runtime";

export default function Testimonial() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const testimonials = readByPath<TestimonialsSection>(
    "website.landing.testimonials"
  );
  if (!testimonials.visibility) return null;

  return (
    <section id="testimonial" className="pt-36">
      <Heading
        heading="Testimonial"
        description={testimonials.subheading}
        align="center"
      />
      <div className="grid lg:grid-cols-2 gap-12 items-center pt-14">
        {testimonials.testimonials.map((testimonial, index) => {
          return (
            <Fragment key={testimonial.id}>
              <Feedback
                photo={testimonial.photo}
                feedback={testimonial.feedback}
                name={testimonial.name}
                location={testimonial.location}
              />
              {index === 0 && (
                <img
                  src={testimonials.image}
                  className="lg:px-[70px] xl:px-[130px] 2xl:px-[200px] lg:-mt-10 max-w-80 lg:max-w-full mx-auto w-full"
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
