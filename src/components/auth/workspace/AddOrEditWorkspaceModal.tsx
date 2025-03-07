import { use, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

type AddOrEditWorkspaceModalProps = {
  title: string;
};

function AddOrEditWorkspaceModal({ title }: AddOrEditWorkspaceModalProps) {
  const modalContext = use(ModalContext);
  const isOpen =
    modalContext?.activeModal === "createWorkspace" ||
    modalContext?.activeModal === "editWorkspace";
  const closeModal = modalContext?.closeModal || (() => {});

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <form className="mt-4">
        <div className="mb-4">
          <Input
            id="name"
            type="text"
            label="Workspace Name"
            placeholder="Enter workspace name..."
          />
        </div>
        <div className="mb-4">
          <Select
            id="country"
            value={selectedCountry}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedCountry(e.target.value)
            }
            placeholderSelected="Select a country"
            options={[
              { value: "US", textValue: "United States" },
              { value: "CA", textValue: "Canada" },
              { value: "FR", textValue: "France" },
              { value: "DE", textValue: "Germany" },
            ]}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="reset" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Create workspace
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddOrEditWorkspaceModal;
