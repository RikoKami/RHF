import { CreateForm } from "./components/create-form";
import { EditForm } from "./components/edit-form";
import { UserProvider, useUser } from "./users-context";

import "./style.scss";

export function Users() {
  return (
    <UserProvider>
      <UsersComponent />
    </UserProvider>
  );
}

export function UsersComponent() {
  const { setModalType, modalType, reset } = useUser();

  return (
    <main>
      <h1>Users</h1>

      {modalType === null && (
        <div className="btnGroup">
          <button onClick={() => setModalType("create")}>create</button>
          <button disabled onClick={() => setModalType("edit")}>
            edit
          </button>
        </div>
      )}

      {modalType === "create" && <CreateForm />}
      {modalType === "edit" && <EditForm />}

      {modalType !== null && (
        <button onClick={reset} className="btnReset">
          x
        </button>
      )}
    </main>
  );
}
