import { createSkill } from "../actions"

export default function Page() {

  return (
    <form action={createSkill}>

      <input
        name="name"
        placeholder="Skill name"
        required
      />

      <button>Create</button>

    </form>
  )
}