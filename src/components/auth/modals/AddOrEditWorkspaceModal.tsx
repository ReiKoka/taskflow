import { useCallback, useState } from "react";
import { WorkspaceType, WorkspaceWithBoardsType } from "../../../utils/types";
import { TYPES_OF_WORKSPACES } from "../../../utils/constants";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { nanoid } from "nanoid";
import { createWorkspace, editWorkspace } from "../../../services/workspaces";
import { showToast } from "../../../utils/showToast";
import { normalizeWorkspaceType } from "../../../utils/helpers";
import useAuth from "../../../hooks/useAuth";
import useAllWorkspaces from "../../../hooks/useAllWorkspaces";
import useModal from "../../../hooks/useModal";

type AddOrEditWorkspaceModalProps = {
  title: string;
  modalType: "createWorkspace" | "editWorkspace";
  oldWorkspace?: WorkspaceWithBoardsType;
  setOldWorkspace?: React.Dispatch<
    React.SetStateAction<WorkspaceWithBoardsType>
  >;
};

//prettier-ignore
function AddOrEditWorkspaceModal({title, oldWorkspace, setOldWorkspace, modalType}: AddOrEditWorkspaceModalProps) {

  const {user} = useAuth();
  const userId = user?.id;
  const {setWorkspaces} = useAllWorkspaces()
  const {activeModal, closeModal} = useModal()

  const isOpen = activeModal === modalType;

  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceType | undefined>(() => {
    if (modalType === "createWorkspace") {
      return {
        id: "",
        name: "",
        workspaceType: "",
        userId: userId || "",
        members: [],
      };
    } else if (modalType === "editWorkspace" && oldWorkspace) {
      return {
        ...oldWorkspace,
        workspaceType: normalizeWorkspaceType(oldWorkspace.workspaceType),
        id: oldWorkspace.id || "",
      };
    }
    return undefined;
  });

  // Handle form field changes
  const handleFieldChange = useCallback(
    (field: keyof WorkspaceType, value: string) => {
      setCurrentWorkspace((prev) => prev ? { ...prev, [field]: value } : prev);
    },
    []
  );

  if (!isOpen) return null;


  const resetFields = () => {
    if (modalType === "createWorkspace") {
      setCurrentWorkspace({
        id: "",
        name: "",
        workspaceType: "",
        userId: userId || "",
        members: [],
      });
    } else if (modalType === "editWorkspace" && oldWorkspace) {
      setCurrentWorkspace({
        ...oldWorkspace,
        workspaceType: normalizeWorkspaceType(oldWorkspace.workspaceType),
        id: oldWorkspace.id || "",
      });
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (modalType === "createWorkspace") {
      const id = nanoid(15);
      const newData = { ...currentWorkspace, id, userId };
      const updatedWorkspace = await createWorkspace(newData as WorkspaceType);
      if (setWorkspaces) {
        setWorkspaces((prevWorkspaces) => {
          const updatedAdminWorkspaces = [...prevWorkspaces[0], updatedWorkspace];
          return [updatedAdminWorkspaces, prevWorkspaces[1]];
        });
      }
      showToast("success", "New workspace added successfully");
    } 
    else if (modalType === "editWorkspace" && oldWorkspace) {
      const id = oldWorkspace.id;
      const newData = { ...currentWorkspace, id };
      const updatedWorkspace = await editWorkspace(id, newData as WorkspaceType);
      if (setWorkspaces) {
        setWorkspaces((prevWorkspaces) => {
          return [
            prevWorkspaces[0].map((workspace) =>
              workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace
            ),
            prevWorkspaces[1],
          ];
        });
        setOldWorkspace?.((prevWorkspace) => ({
          ...prevWorkspace,
          ...updatedWorkspace,
        } as WorkspaceWithBoardsType));
      }
      showToast("success", `Workspace ${oldWorkspace.name} updated successfully!`);
    }
  
    if (closeModal) closeModal();
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
        required={true}
      />

      <Select
        id="workspaceType"
        placeholderSelected="Choose Workspace Type"
        options={TYPES_OF_WORKSPACES}
        value={currentWorkspace?.workspaceType ?? ""}
        onChange={(e) => handleFieldChange("workspaceType", normalizeWorkspaceType(e.target.value))}
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={resetFields}>
          Cancel
        </Button>
        <Button type="submit" variant="default">
        {modalType === "createWorkspace" ? "Create Workspace" : "Edit Workspace"}
        </Button>
      </div>
    </form>
  </Modal>
);
}

export default AddOrEditWorkspaceModal;
