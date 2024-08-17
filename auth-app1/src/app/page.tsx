import Item from "../components/Item"
import { prisma } from "../db"
import Link from "next/link"

function getTodos() {
  return prisma.todo.findMany()
}

async function persist(id: string, completed: boolean) {
  "use server"
  await prisma.todo.update({ where: { id }, data: { completed } })
  // console.log(id, completed)
}
//    await prisma.todo.create({ data: { title: "welcome", completed: false } })
// }

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/first"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <Item key={todo.id} {...todo} persist={persist} />
          // <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}