import React from "react";

function Modal(props) {
  const {
    isShowing,
    hide,
    name,
    price,
    description,
    category,
    file,
    stock,
    categorias,
    submit,
  } = props;

  return (
    <>
      {isShowing ? (
        <div className="modal-overlay">
          <div className="modal-">
            <form onSubmit={submit} className="modal-form">
              <label>Nombre</label>
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => name(e.target.value)}
                className="form-control"
                required
              />
              <label>Precio</label>
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                onChange={(e) => price(e.target.value)}
                required
              />
              <label>Descripcion</label>
              <textarea
                type="text"
                name=""
                id=""
                className="form-control"
                style={{ resize: "none" }}
                onChange={(e) => description(e.target.value)}
                required
              />
              <label>Imagen</label>
              <input
                type="file"
                name=""
                id=""
                className="form-control"
                onChange={(e) => file(e.target.files[0])}
              />
              <label>Categoria</label>
              <select
                name=""
                id=""
                className="form-select"
                onChange={(e) => category(e.target.value)}
                required
              >
                <option selected>Elige una categoria</option>
                {categorias.map((item) => (
                  <option value={item.categoria}>{item.categoria}</option>
                ))}
              </select>
              <label>Stock</label>
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                onChange={(e) => stock(e.target.value)}
                required
              />
              <div>
                <button
                  onClick={() => hide()}
                  className="btn btn-danger"
                  style={{ margin: "10px" }}
                >
                  Cancelar
                </button>
                <button className="btn btn-success">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
