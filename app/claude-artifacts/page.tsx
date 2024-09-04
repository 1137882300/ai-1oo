import Link from 'next/link'
import { ClaudeArtifact } from '@/types'

const artifacts: ClaudeArtifact[] = [
  { title: 'Enhanced BMI Calculator', image: '/images/bmi-calculator.png',link:'https://claude.site/artifacts/6fd95417-f0cd-4f4c-b9a2-a31a80982ca9'},
  { title: 'Claw\'d\'s Closet', image: '/images/clawds-closet.png',link:'https://claude.site/artifacts/47ffed7b-ad2e-4259-b071-414f42d585e2' },
  // ... 添加更多 artifacts
]

export default function ClaudeArtifactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 underline">100.AI</h1>
      
      <section className="bg-gray-100 rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">What are Claude Artifacts?</h2>
        <p className="text-xl mb-4">A new way to work with Claude AI to draft, iterate, and create downloadable projects.</p>
        <Link href="/learn-more" className="inline-block bg-white text-gray-800 px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow">
          Learn More
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-pink-600">
          <span className="mr-2">🎨</span> Claude Artifacts
        </h2>
        <div className="bg-pink-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artifacts.map((artifact, index) => (
              <Link href={artifact.link} target="_blank" rel="noopener noreferrer" className="block">
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={artifact.image} alt={artifact.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{artifact.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}