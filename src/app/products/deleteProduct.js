"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProduct(product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }
  async function handleDelete(productId) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });
    setIsMutating(false);

    router.refresh();

    setModal(false);
  }
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        delete
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete {product.title} ...?
          </h3>
          <div className="modal-action">
            <button className="btn" type="button" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            ) : (
              <button className="btn loading" type="button">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
