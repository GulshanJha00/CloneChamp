// components/Landing/FAQ.tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="py-16 px-4 md:px-10 bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="text-left space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger>How does the challenge system work?</AccordionTrigger>
            <AccordionContent>
              You’ll be given a UI layout to clone using HTML/CSS/JS. Our engine compares your output with the target design and gives you an accuracy score.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Do I need to use GitHub?</AccordionTrigger>
            <AccordionContent>
              Nope. Everything happens in our built-in code editor. No repo setup or manual submission needed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>
              The basic version is free. Premium unlocks full challenge sets, detailed analytics, and timed tests.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
