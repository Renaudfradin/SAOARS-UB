import React from "react";

export default function Frame({ label, children }) {
  return (
    <section className="modal">
      <div className="modal__top">
        <div className="modal__topLeft" />
        <div className="modal__topMid" />
        <div className="modal__topRight" />
        {label && <div className="modal__label">{label}</div>}
      </div>
      <div className="modal__body">
        <div className="modal__inner">{children}</div>
      </div>
      <div className="modal__foot">
        <div className="modal__footLeft" />
        <div className="modal__footMid" />
        <div className="modal__footRight" />
      </div>
    </section>
  );
}
