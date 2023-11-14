import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { Form, useFetcher, useNavigate } from "@remix-run/react";

interface DeleteModalProps {
  actionRoute: string;
  useFetcherForm: boolean;
  deleteName?: string;
  deleteHeader?: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export function DeleteModal({
  actionRoute,
  useFetcherForm = true,
  deleteName,
  deleteHeader,
  isOpen,
  onOpenChange,
}: DeleteModalProps) {
  const fetcher = useFetcher();

  const modalContent = (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            {deleteHeader ?? "Delete confirmation"}
          </ModalHeader>
          <ModalBody>
            <div className="flex h-full w-full flex-row flex-nowrap text-lg">
              <span className="inline whitespace-nowrap text-center">
                Are you sure you want to delete
              </span>
              <span className="mx-2 inline whitespace-nowrap text-center font-bold text-danger-500">
                {deleteName ?? ""}
              </span>
              ?
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onPress={onClose} size="lg">
              Cancel
            </Button>
            <Button
              id="form-create-status"
              color="danger"
              type="submit"
              onPress={onClose}
              size="lg"
            >
              Delete
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="min-w-fit">
      {useFetcherForm ? (
        <fetcher.Form method="delete" action={actionRoute}>
          {modalContent}
        </fetcher.Form>
      ) : (
        <Form method="delete" action={actionRoute}>
          {modalContent}
        </Form>
      )}
    </Modal>
  );
}

export default DeleteModal;
