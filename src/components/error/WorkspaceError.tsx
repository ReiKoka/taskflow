import { renderNotFound } from "../ui/NotFound";

function WorkspaceErrorComponent({ error }: { error: Error }) {
  console.log(error);
  return (
    <div>
      <p>{error.message}</p>
      {renderNotFound}
    </div>
  );
}

export default WorkspaceErrorComponent;
