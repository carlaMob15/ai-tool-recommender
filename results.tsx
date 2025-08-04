import { useRouter } from 'next/router'
import tools from '../data/tools.json'
import ToolCard from '../components/ToolCard'

export default function ResultsPage() {
  const router = useRouter()
  const { role, task, preference } = router.query

  if (!role || !task || !preference) {
    return <p>Loading results...</p>
  }

  function matchTools(tools, role, task, preference) {
    return tools
      .map((tool) => {
        let score = 0

        // Match role
        if (tool.roles.includes(role)) score += 2

        // Match task by checking if tag includes task keyword
        if (tool.tags.some((tag) => tag.toLowerCase().includes(task.toLowerCase()))) {
          score += 2
        }

        // Match free/paid preference
        if (preference === 'free' && tool.free) score += 1
        if (preference === 'paid' && !tool.free) score += 1

        return { ...tool, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }

  const matchedTools = matchTools(tools, role, task, preference)
  const fallbackTools = tools.slice(0, 5)
  const results = matchedTools.length > 0 ? matchedTools : fallbackTools

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Tools</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {results.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  )
}