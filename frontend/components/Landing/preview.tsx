// components/Landing/ChallengePreview.tsx
import Image from "next/image"

const previews = [
  {
    title: "🔘 Button Clone (Easy)",
    image: "/previews/button-challenge.png",
    difficulty: "Easy",
    accuracy: "Passed: 97.3%",
  },
  {
    title: "📃 Pricing Layout (Medium)",
    image: "/previews/pricing-layout.png",
    difficulty: "Medium",
    accuracy: "Passed: 95.1%",
  },
  {
    title: "📊 Dashboard Section (Hard)",
    image: "/previews/dashboard.png",
    difficulty: "Hard",
    accuracy: "Failed: 83.7%",
  },
]

export default function ChallengePreview() {
  return (
    <section className="py-20 bg-gray-950 px-6 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Challenge Previews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previews.map((challenge, idx) => (
            <div key={idx} className="bg-muted/20 p-4 rounded-xl shadow hover:shadow-md transition">
              <Image
                src={challenge.image}
                alt={challenge.title}
                width={500}
                height={300}
                className="rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{challenge.title}</h3>
              <p className="text-sm text-muted-foreground">{challenge.difficulty}</p>
              <p className="text-sm font-medium mt-2">{challenge.accuracy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
