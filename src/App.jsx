import './App.css';
import { useState } from 'react';

function App() {
  const [resultado, setResultado] = useState(null);

  const [cash, setCash] = useState({
    monedas: "",
    billetes: "",
    digital: "",
  });

  const [clientes, setClientes] = useState({
    debenDia: "",
    pagosRetrasados: "",
    pagosAdelantados: "",
    anteriormentePagado: "",
  });


  const [pagosDia, setPagosDia] = useState([
    { id: 1, nombre: 'Desayuno', monto: '' },
    { id: 2, nombre: 'Gas', monto: '' },
  ]);

  const [caja, setCaja] = useState({
    cajaInicial: "",
    cajaAgregada: "",
  });

  const [gastosFijosDiario, setGastosFijosDiario] = useState({
    fijo: 160,
    diario: 300,
  });

  const calcular = () => {
    const cashTotal = Number(cash.monedas) + Number(cash.billetes) + Number(cash.digital)

    const ClientesTotal = Number(clientes.debenDia) - Number(clientes.pagosRetrasados) - Number(clientes.pagosAdelantados) + Number(clientes.anteriormentePagado)

    const pagosTotal = pagosDia.reduce((total, pago) => total + Number(pago.monto || 0), 0);

    const CajaTotal = Number(caja.cajaInicial) + Number(caja.cajaAgregada);


    const VentaTotal = cashTotal + ClientesTotal + pagosTotal - CajaTotal 
    const ganancia = VentaTotal - Number(gastosFijosDiario.fijo) - Number(gastosFijosDiario.diario) - pagosTotal

    /*console.log({
      VentaTotal,
      ganancia})*/


    setResultado({
      VentaTotal: VentaTotal.toFixed(2),
      ganancia: ganancia.toFixed(2),
    });
  };

   // 🆕 Función para agregar un nuevo gasto dinámico
  const agregarPago = () => {
    const nuevo = {
      id: Date.now(),
      nombre: '',
      monto: '',
    };
    setPagosDia([...pagosDia, nuevo]);
  };

  // 🆕 Función para actualizar un pago
  const actualizarPago = (id, campo, valor) => {
    setPagosDia((prev) =>
      prev.map((pago) =>
        pago.id === id ? { ...pago, [campo]: valor } : pago
      )
    );
  };

  // 🆕 Función para eliminar un pago
  const eliminarPago = (id) => {
    setPagosDia((prev) => prev.filter((pago) => pago.id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Calculadora de Ganancias</h1>

      {/* Acordeón 1 */}
      <div className="accordion mb-4">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCash"
            >
              CASH
            </button>
          </h2>
          <div id="collapseCash" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="card mb-2">
                <label className="m-1">Monedas</label>
                <input
                  type="number"
                  className="form-control"
                  value={cash.monedas}
                  placeholder="0.00"
                  onChange={(e) =>
                    setCash({ ...cash, monedas: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Billetes</label>
                <input
                  type="number"
                  className="form-control"
                  value={cash.billetes}
                  placeholder="0.00"
                  onChange={(e) =>
                    setCash({ ...cash, billetes: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Plin + Yape</label>
                <input
                  type="number"
                  className="form-control"
                  value={cash.digital}
                  placeholder="0.00"
                  onChange={(e) =>
                    setCash({ ...cash, digital: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acordeón 2 */}
      <div className="accordion mb-4">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseClientes"
            >
              CLIENTES
            </button>
          </h2>
          <div id="collapseClientes" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="card mb-2">
                <label className="m-1">Deben (del día)</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.debenDia}
                  placeholder="0.00"
                  onChange={(e) =>
                    setClientes({ ...clientes, debenDia: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Pagos Retrasados</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.pagosRetrasados}
                  placeholder="0.00"
                  onChange={(e) =>
                    setClientes({ ...clientes, pagosRetrasados: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Pagos Adelantados</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.pagosAdelantados}
                  placeholder="0.00"
                  onChange={(e) =>
                    setClientes({ ...clientes, pagosAdelantados: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Anteriormente Pagado</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.anteriormentePagado}
                  placeholder="0.00"
                  onChange={(e) =>
                    setClientes({ ...clientes, anteriormentePagado: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acordeón 3 */}
      <div className="accordion mb-4">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePagosDia"
            >
              PAGOS DEL DÍA
            </button>
          </h2>
          <div id="collapsePagosDia" className="accordion-collapse collapse">
            <div className="accordion-body">

              {/* 🔁 Render dinámico de los pagos */}
              {pagosDia.map((pago) => (
                <div key={pago.id} className="card mb-2 p-2">
                  <div className="row g-2 align-items-center">
                    <div className="col-md-6">
                      <label className="form-label">Concepto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Leche, Arroz, etc."
                        value={pago.nombre}
                        onChange={(e) =>
                          actualizarPago(pago.id, 'nombre', e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Monto</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0.00"
                        value={pago.monto}
                        onChange={(e) =>
                          actualizarPago(pago.id, 'monto', e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <button
                        className="btn btn-outline-danger mt-1"
                        onClick={() => eliminarPago(pago.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* ➕ Botón para agregar más pagos */}
              <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={agregarPago}>
                  <i className="bi bi-plus-circle"></i> Agregar gasto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acordeón 4 */}
      <div className="accordion mb-4">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCaja"
            >
              CAJA
            </button>
          </h2>
          <div id="collapseCaja" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="card mb-2">
                <label className="m-1">Caja Inicial</label>
                <input
                  type="number"
                  className="form-control"
                  value={caja.cajaInicial}
                  placeholder="0.00"
                  onChange={(e) =>
                    setCaja({ ...caja, cajaInicial: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Caja agregada</label>
                <input
                  type="number"
                  className="form-control"
                  value={caja.cajaAgregada}
                  placeholder="0.00"
                  onChange={(e) =>
                    setCaja({ ...caja, cajaAgregada: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="bg-primary"></hr>

      {/* Acordeón 5 */}
      <div className="accordion mb-4 accordion-verde">
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed accordion-verde"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFijosDiario"
            >
              GASTOS FIJOS Y DIARIO
            </button>
          </h2>
          <div id="collapseFijosDiario" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="card mb-2">
                <label className="m-1">Costo del día</label>
                <input
                  type="number"
                  className="form-control"
                  value={gastosFijosDiario.fijo}
                  placeholder="0.00"
                  onChange={(e) =>
                    setGastosFijosDiario({ ...gastosFijosDiario, fijo: e.target.value })
                  }
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Compra del día</label>
                <input
                  type="number"
                  className="form-control"
                  value={gastosFijosDiario.diario}
                  placeholder="0.00"
                  onChange={(e) =>
                    setGastosFijosDiario({ ...caja, cajaAgregada: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Botón calcular */}
      <div className="text-center">
        <button className="btn btn-info" onClick={calcular}>
          Calcular
        </button>
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="alert alert-info mt-3">
          <div className="card-header mb-3">Resultados</div>
          <p>
            <strong>Venta total del día:</strong> s/{resultado.VentaTotal}
          </p>
          <p>
            <strong>Ganancia del día:</strong> s/{resultado.ganancia}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
