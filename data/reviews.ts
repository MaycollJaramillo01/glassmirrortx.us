import type { Testimonial } from "@/types";

/**
 * Google Business Profile social proof.
 *
 * Rating and count verified on the public Google Knowledge Panel /
 * Maps place for Martinez Orlyn Glass & Mirror (Aug 2026).
 * Quotes are recent Google reviews pasted by the team — never invented.
 */
export const googleReviews = {
  rating: 4.9,
  count: 158,
  url: "https://maps.app.goo.gl/DzruyyJ2gzJxSssC6",
  label: "Google",
} as const;

/**
 * Featured recent Google reviews (manual curated set for the home carousel).
 * Newest first. Paste additional Google quotes here when the team wants updates.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We had a fantastic experience having our broken window replaced. Victor was professional, meticulous, and clearly takes pride in his work, ensuring every detail was done right without rushing. The price was very reasonable for the high level of service provided. Highly recommended!",
    author: "Yi Xie",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Mr Martinez and his crew(grandson& helper) did a fantastic job reattaching a 4ft X 8ft wall mirror that had come loose and was about to fall. Fair price and great service. Highly recommended!",
    author: "Don Keding",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "I finally found the best window, shower glass, and mirror company in Houston that was willing to fix this broken glass in Round Top. Thank You",
    author: "ROBERT LEE",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "I've been working with Orlyn for several years now and he has always gone above and beyond to meet and exceed our customers expectations. Punctual, professsional service at a great price!",
    author: "mario striever",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Very professional guys! They show up and get the job done in a timely fashion. They did a commercial building for us and came out excellent. Highly recommend",
    author: "Rami Ghuneim",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Muy buen servicio y atento a los detalles, Mr Orlyn Martinez me iso un buen trabajo con mi baño bien preciso, limpio y buena comunicacion.",
    author: "Mike July",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "The service was fast, enjoyable, and easy to understand great and reasonable prices! They got our hotel door fixed very quick! La Quinta approved 💯",
    author: "Isaac Wellsman",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "We hired Martinez Orlyn Glass & Mirror for a custom window project, and they did an excellent job. The installation came out very clean, and the craftsmanship and attention to detail really stood out, especially on the custom corner glass work. Their team was professional, responsive, and easy to work with throughout the process. We truly appreciated their communication, quality of work, and overall professionalism. Highly recommend Martinez Orlyn Glass & Mirror for anyone looking for quality glass and window installation.",
    author: "Hector Mendeze",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Orlyn again did a great job in replacing two double-pane glass panels for my windows. He completed the job quickly with a good price. I'm a happy repeat customer. JimmyS",
    author: "Jimmy Shaw",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Amazing service, worked with my schedule and urgent dead line of less than 24hrs. Very quick and easy process to book.",
    author: "Grabiel Manzano",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Orlyn did a great job fairly priced for making us 4 framed mirrors and then installing them. He is very professional and what we like most of all is he responds to texts very quickly and shows up when he says he will.",
    author: "Tom Kelly",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "These guys did an amazing job with the glass door for our shower. Beautiful gold accents were used to match our design. They put a rod between the window and glass for additional support. They sealed off the door and corners with plastic trim to ensure no water would drain out. Very pleased with the outcome!",
    author: "Ashley Bridgemohan",
    location: "Houston, TX",
    source: "Google",
    rating: 5,
  },
];
