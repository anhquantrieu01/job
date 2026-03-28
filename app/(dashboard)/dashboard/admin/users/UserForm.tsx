"use client";

import { useTransition } from "react";
import { updateUser } from "./actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserForm({ user }: { user?: any }) {
  const [isPending, startTransition] = useTransition();

  const action =  updateUser

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
      className="max-w-md space-y-4"
    >
      {user && <input type="hidden" name="id" value={user.id} />}

      <div>
        <label className="block mb-1">Name</label>
        <input
          name="name"
          defaultValue={user?.name}
          className="w-full border p-2"
        />
      </div>


      <div>
        <label className="block mb-1">Role</label>
        <select
          name="role"
          defaultValue={user?.role || "USER"}
          className="w-full border p-2"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="EMPLOYER">EMPLOYER</option>
        </select>
      </div>

      <button
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2"
      >
        {user ? "Update User" : "Create User"}
      </button>
    </form>
  );
}