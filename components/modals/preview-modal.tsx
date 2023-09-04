"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Gallery from "@/components/gallery/gallery";
import Info from "@/components/info";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import { X } from "lucide-react";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  const pathname = usePathname();
  const { onClose } = previewModal;

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!product) {
    return null;
  }

  return (
    <Transition show={previewModal.isOpen} appear as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30 mt-24"
        onClose={previewModal.onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-60" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl overflow-hidden text-left align-middle rounded-lg">
                <div className="relative flex items-center w-full px-4 pb-8 overflow-hidden shadow-2xl bg-background pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="absolute right-4 top-4 ">
                    <IconButton
                      className="bg-primary"
                      onClick={onClose}
                      icon={<X size={15} className="text-primary-foreground" />}
                    />
                  </div>
                  <div className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <Gallery images={product.images} />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <Info data={product} />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreviewModal;
