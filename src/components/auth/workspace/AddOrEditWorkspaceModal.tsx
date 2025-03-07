import { use, useCallback, useEffect, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";

import { WorkspaceType, WorkspaceWithBoardsType } from "../../../utils/types";
import { AuthContext } from "../../../context/AuthContext";
import { TYPES_OF_WORKSPACES } from "../../../utils/constants";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { nanoid } from "nanoid";
import { createWorkspace, editWorkspace } from "../../../services/workspaces";
import { showToast } from "../../../utils/showToast";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
import { normalizeWorkspaceType } from "../../../utils/helpers";

type AddOrEditWorkspaceModalProps = {
  title: string;
  oldWorkspace?: WorkspaceWithBoardsType;
  setOldWorkspace?: React.Dispatch<
    React.SetStateAction<WorkspaceWithBoardsType | undefined>
  >;
};

//prettier-ignore
function AddOrEditWorkspaceModal({title, oldWorkspace, setOldWorkspace}: AddOrEditWorkspaceModalProps) {
  const authContext = use(AuthContext);
  const workspaceContext = use(WorkspaceContext)
  const modalContext = use(ModalContext);
  const userId = authContext?.user?.id;
  const setWorkspaces = workspaceContext?.setWorkspaces;
  const isOpen = modalContext?.activeModal === "createWorkspace" || modalContext?.activeModal === "editWorkspace";
  const closeModal = modalContext?.closeModal || (() => {});

  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceType | undefined>(oldWorkspace || {
    name: "",
    id: "",
    workspaceType: "",
    userId: userId as string,
    members: [],
  });

  useEffect(() => {
    if (oldWorkspace) {
      setCurrentWorkspace({
        ...oldWorkspace,
        workspaceType: normalizeWorkspaceType(oldWorkspace.workspaceType),
      });
    }
  }, [oldWorkspace, userId]);

  // Handle form field changes
  const handleFieldChange = useCallback(
    (field: keyof WorkspaceType, value: string) => {
      setCurrentWorkspace((prev) => prev ? { ...prev, [field]: value } : prev);
    },
    []
  );

  if (!isOpen) return null;


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const id = oldWorkspace ? oldWorkspace.id : nanoid(15);
  const newData = { ...currentWorkspace, id };

  // Create or edit workspace
  let updatedWorkspace: WorkspaceType;
  if (!oldWorkspace) {
    updatedWorkspace = await createWorkspace(newData as WorkspaceType);
    if (setWorkspaces) {
      setWorkspaces((prevWorkspaces) => {
        const updatedAdminWorkspaces = [...prevWorkspaces[0], updatedWorkspace];
        return [updatedAdminWorkspaces, prevWorkspaces[1]]; 
      });
    }
  } else {
    updatedWorkspace = await editWorkspace(id, newData as WorkspaceType);
    if (setWorkspaces) {
      setWorkspaces((prevWorkspaces) => {
        return [
          prevWorkspaces[0].map((workspace) =>
            workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace
          ),
          prevWorkspaces[1], 
        ];
      });
      setOldWorkspace?.((prevWorkspace) => ({ ...prevWorkspace, ...updatedWorkspace } as WorkspaceWithBoardsType))
    }
  }

  closeModal();
  showToast("success", `${oldWorkspace ? `Workspace ${oldWorkspace.name} updated successfully!` : "New workspace added successfully"}`);
};

return (
  <Modal isOpen={isOpen} onClose={closeModal} title={title}>
    <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
     
      <Input
        id="name"
        type="text"
        label="Workspace Name"
        placeholder="Enter workspace name..."
        value={currentWorkspace?.name || ""}
        onChange={(e) => handleFieldChange("name", e.target.value)}
      />

      <Select
        id="workspaceType"
        placeholderSelected="Choose Workspace Type"
        options={TYPES_OF_WORKSPACES}
        value={currentWorkspace?.workspaceType ?? ""}
        onChange={(e) => handleFieldChange("workspaceType", normalizeWorkspaceType(e.target.value))}
      />

      <div className="flex justify-end gap-2">
        <Button type="reset" variant="outline">
          Cancel
        </Button>
        <Button type="submit" variant="default">
          {oldWorkspace ? "Edit Workspace" : "Create Workspace"}
        </Button>
      </div>
    </form>
  </Modal>
);
}

export default AddOrEditWorkspaceModal;
