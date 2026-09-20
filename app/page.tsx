import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-5 text-sm font-medium uppercase tracking-widest text-gray-500">
            Engineering Research Lab
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Research real systems.
            <br />
            Build what we learn.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            A personal engineering research lab where I study how real-world
            systems are designed, understand the engineering decisions behind
            them, and turn those learnings into practical projects.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/research"
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Explore Research
            </Link>

            <Link
              href="/projects"
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Areas of research
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            What I Research
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">
                Engineering Systems
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Architecture, distributed systems, databases, APIs, scaling,
                reliability and infrastructure.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">
                AI & LLMs
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                LLM applications, RAG, agents, evaluations and practical AI
                engineering.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">
                Real-World Products
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                How companies like Uber, Spotify, Stripe and GitHub solve
                engineering problems at scale.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Research Process */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            The process
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Research → Build → Learn
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Real company → Research → Understand → Design → Build → Deploy →
            Measure → Learn
          </p>
        </div>
      </section>
    </main>
  );
}