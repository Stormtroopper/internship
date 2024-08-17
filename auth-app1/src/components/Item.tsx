"use client"
type Itemprops = {
    id: string
    title: string
    completed: boolean
    persist: (id: string, completed: boolean) => void
}
export default function Item({ id, title, completed, persist }: Itemprops) {

    return (
        <>
            <li className="flex gap-1 items-center">
                <input id={id} type="checkbox" className="cursor-pointer peer" defaultChecked={completed} onChange={e => persist(id, e.target.checked)} />
                <label htmlFor={id} className="peer-checked:line-through peer-checked:text-slate-650">{title}</label>
            </li>

        </>
    )
}