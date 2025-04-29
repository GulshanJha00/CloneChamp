import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Rohit Singh",
    role: "Frontend Intern",
    quote:
      "CloneChamp helped me practice real UI layouts. This platform gave me confidence before interviews.",
  },
  {
    name: "Aisha Patel",
    role: "UI Designer",
    quote:
      "Finally a place where I can upload my designs and get clean, production-ready code. Total gamechanger.",
  },
  {
    name: "Aditya Varma",
    role: "Bootcamp Mentor",
    quote:
      "I use CloneChamp in my frontend workshops. It’s like LeetCode but for layout mastery.",
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-primary">What People Are Saying</h2>
        <Carousel className="relative">
          <CarouselContent className="flex gap-6 overflow-hidden">
            {testimonials.map((t, idx) => (
              <CarouselItem
                key={idx}
                className="bg-background p-8 rounded-lg shadow-xl max-w-[320px] mx-auto transition-transform duration-300 ease-in-out"
              >
                <p className="italic text-muted-foreground text-lg">“{t.quote}”</p>
                <div className="mt-6 text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <Button variant="outline" className="w-10 h-10 rounded-full flex items-center justify-center">
              <span className="material-icons">arrow_forward</span>
            </Button>
          </CarouselNext>
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <Button variant="outline" className="w-10 h-10 rounded-full flex items-center justify-center">
              <span className="material-icons">arrow_back</span>
            </Button>
          </CarouselPrevious>
        </Carousel>
      </div>
    </section>
  )
}
