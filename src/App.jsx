import './App.css';
import { useState } from 'react';

function App() {
  const [resultado, setResultado] = useState(null);

  const [cash, setCash] = useState({
    monedas: '',
    billetes: '',
    yape: '',
    plin: '',
  });

  const [clientes, setClientes] = useState({
    debenDia: '',
    pagosRetrasados: '',
    pagosAdelantados: '',
    anteriormentePagado: '',
  });

  const [pagosDia, setPagosDia] = useState([
    { id: 1, nombre: 'Desayuno', monto: '' },
    { id: 2, nombre: 'Vanessa', monto: '' },
    { id: 3, nombre: 'gas', monto: '' },
  ]);

  const [caja, setCaja] = useState({
    cajaBilletes: '',
    cajaMonedas: '',
    cajaAgregada: '',
  });

  const [gastosFijosDiario, setGastosFijosDiario] = useState({
    fijo: 160,
    diario: 300,
  });

  const [abasto, setAbasto] = useState({
    arroz: '',
    azucar: '',
    aceite: '',
  });

  const [sectores, setSectores] = useState({
    sectorCash: 0,
    sectorClientes: 0,
    sectorPagos: 0,
    sectorCaja: 0,
    sectorProductos: 0,
  });

  // Calcula el total de efectivo
  const calcularCashTotal = ({ m, b, y, p }) => {
    if (m == 0 || m) {
      const T =
        m + Number(cash.billetes) + Number(cash.yape) + Number(cash.plin);
      setSectores({ ...sectores, sectorCash: T });
      return T;
    }
    if (b == 0 || b) {
      const T =
        Number(cash.monedas) + b + Number(cash.yape) + Number(cash.plin);
      setSectores({ ...sectores, sectorCash: T });
      return T;
    }
    if (y == 0 || y) {
      const T =
        Number(cash.monedas) + Number(cash.billetes) + y + Number(cash.plin);
      setSectores({ ...sectores, sectorCash: T });
      return T;
    }
    if (p == 0 || p) {
      const T =
        Number(cash.monedas) + Number(cash.billetes) + Number(cash.yape) + p;
      setSectores({ ...sectores, sectorCash: T });
      return T;
    }
    const T =
      Number(cash.monedas) +
      Number(cash.billetes) +
      Number(cash.yape) +
      Number(cash.plin);
    setSectores({ ...sectores, sectorCash: T });
    return T;
  };

  // Calcula el total de clientes
  const calcularClientesTotal = ({ d, pr, pa, ap }) => {
    if (d == 0 || d) {
      const T =
        d -
        Number(clientes.pagosRetrasados) -
        Number(clientes.pagosAdelantados) +
        Number(clientes.anteriormentePagado);
      setSectores({ ...sectores, sectorClientes: T });
      return T;
    }
    if (pr == 0 || pr) {
      const T =
        Number(clientes.debenDia) -
        pr -
        Number(clientes.pagosAdelantados) +
        Number(clientes.anteriormentePagado);
      setSectores({ ...sectores, sectorClientes: T });
      return T;
    }
    if (pa == 0 || pa) {
      const T =
        Number(clientes.debenDia) -
        Number(clientes.pagosRetrasados) -
        pa +
        Number(clientes.anteriormentePagado);
      setSectores({ ...sectores, sectorClientes: T });
      return T;
    }
    if (ap == 0 || ap) {
      const T =
        Number(clientes.debenDia) -
        Number(clientes.pagosRetrasados) -
        Number(clientes.pagosAdelantados) +
        ap;
      setSectores({ ...sectores, sectorClientes: T });
      return T;
    }
    const T =
      Number(clientes.debenDia) -
      Number(clientes.pagosRetrasados) -
      Number(clientes.pagosAdelantados) +
      Number(clientes.anteriormentePagado);
    setSectores({ ...sectores, sectorClientes: T });
    return T;
  };

  // Calcula el total de pagos del día
  const calcularPagosTotal = (id, valor) => {
    const T = pagosDia.reduce((total, pago) => {
      if (pago.id === id) {
        return total + Number(valor);
      }
      return total + Number(pago.monto);
    }, 0);
    setSectores({ ...sectores, sectorPagos: T });
    return T;
  };

  // Calcula el total de la caja
  const calcularCajaTotal = ({ b, m, a }) => {
    if (b == 0 || b) {
      const T = b + Number(caja.cajaMonedas) + Number(caja.cajaAgregada);
      setSectores({ ...sectores, sectorCaja: T });
      return T;
    }
    if (m == 0 || m) {
      const T = Number(caja.cajaBilletes) + m + Number(caja.cajaAgregada);
      setSectores({ ...sectores, sectorCaja: T });
      return T;
    }
    if (a == 0 || a) {
      const T = Number(caja.cajaBilletes) + Number(caja.cajaMonedas) + a;
      setSectores({ ...sectores, sectorCaja: T });
      return T;
    }
    const T =
      Number(caja.cajaBilletes) +
      Number(caja.cajaMonedas) +
      Number(caja.cajaAgregada);
    setSectores({ ...sectores, sectorCaja: T });
    return T;
  };

  // Calcula el total de abasto
  const calcularAbastoTotal = ({ ar, az, ac }) => {
    if (ar == 0 || ar) {
      const T =
        (ar * 180) / 49 +
        (Number(abasto.azucar) * 120) / 50 +
        (Number(abasto.aceite) * 68) / 12;
      setSectores({ ...sectores, sectorProductos: T });
      return T;
    }
    if (az == 0 || az) {
      const T =
        (Number(abasto.arroz) * 180) / 49 +
        (az * 120) / 50 +
        (Number(abasto.aceite) * 68) / 12;
      setSectores({ ...sectores, sectorProductos: T });
      return T;
    }
    if (ac == 0 || ac) {
      const T =
        (Number(abasto.arroz) * 180) / 49 +
        (Number(abasto.azucar) * 120) / 50 +
        (ac * 68) / 12;
      setSectores({ ...sectores, sectorProductos: T });
      return T;
    }
    const T =
      (Number(abasto.arroz) * 180) / 49 +
      (Number(abasto.azucar) * 120) / 50 +
      (Number(abasto.aceite) * 68) / 12;
    setSectores({ ...sectores, sectorProductos: T });
    return T;
  };

  // Función principal de cálculo
  const calcular = () => {
    const cashTotal = sectores.sectorCash;
    const ClientesTotal = sectores.sectorClientes;
    const pagosTotal = sectores.sectorPagos;
    const CajaTotal = sectores.sectorCaja;
    const abastoTotal = sectores.sectorProductos;

    const VentaTotal = cashTotal + ClientesTotal + pagosTotal - CajaTotal;
    const ganancia =
      VentaTotal -
      pagosTotal -
      abastoTotal -
      Number(gastosFijosDiario.fijo) -
      Number(gastosFijosDiario.diario);

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
      prev.map((pago) => (pago.id === id ? { ...pago, [campo]: valor } : pago))
    );
  };

  // 🆕 Función para eliminar un pago
  const eliminarPago = (id) => {
    setPagosDia((prev) => prev.filter((pago) => pago.id !== id));
    calcularPagosTotal(id, 0);
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
              {`CASH (Total: S/${sectores.sectorCash.toFixed(2)})`}
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
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCash({ ...cash, monedas: newValor });
                    calcularCashTotal({ m: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Billetes</label>
                <input
                  type="number"
                  className="form-control"
                  value={cash.billetes}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCash({ ...cash, billetes: newValor });
                    calcularCashTotal({ b: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Yape</label>
                <input
                  type="number"
                  className="form-control"
                  value={cash.yape}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCash({ ...cash, yape: newValor });
                    calcularCashTotal({ y: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Plin</label>
                <input
                  type="number"
                  className="form-control"
                  value={cash.plin}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCash({ ...cash, plin: newValor });
                    calcularCashTotal({ p: Number(newValor) });
                  }}
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
              {`CLIENTES (Total: S/${sectores.sectorClientes.toFixed(2)})`}
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
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setClientes({ ...clientes, debenDia: newValor });
                    calcularClientesTotal({ d: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Pagos Retrasados</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.pagosRetrasados}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setClientes({ ...clientes, pagosRetrasados: newValor });
                    calcularClientesTotal({ pr: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Pagos Adelantados</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.pagosAdelantados}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setClientes({ ...clientes, pagosAdelantados: newValor });
                    calcularClientesTotal({ pa: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Anteriormente Pagado</label>
                <input
                  type="number"
                  className="form-control"
                  value={clientes.anteriormentePagado}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setClientes({ ...clientes, anteriormentePagado: newValor });
                    calcularClientesTotal({ ap: Number(newValor) });
                  }}
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
              {`PAGOS DEL DÍA (Total: S/${sectores.sectorPagos.toFixed(2)})`}
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
                        onChange={(e) => {
                          const newValor = e.target.value;
                          actualizarPago(pago.id, 'monto', newValor);
                          calcularPagosTotal(pago.id, newValor);
                        }}
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
                <button
                  className="btn btn-outline-primary"
                  onClick={agregarPago}
                >
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
              {`CAJA (Total: S/${sectores.sectorCaja.toFixed(2)})`}
            </button>
          </h2>
          <div id="collapseCaja" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="card mb-2">
                <label className="m-1">Billetes de caja</label>
                <input
                  type="number"
                  className="form-control"
                  value={caja.cajaBilletes}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCaja({ ...caja, cajaBilletes: newValor });
                    calcularCajaTotal({ b: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Monedas de caja</label>
                <input
                  type="number"
                  className="form-control"
                  value={caja.cajaMonedas}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCaja({ ...caja, cajaMonedas: newValor });
                    calcularCajaTotal({ m: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Caja agregada</label>
                <input
                  type="number"
                  className="form-control"
                  value={caja.cajaAgregada}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setCaja({ ...caja, cajaAgregada: newValor });
                    calcularCajaTotal({ a: Number(newValor) });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acordeón 5 */}
      <div className="accordion mb-4">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAbasto"
            >
              {`PRODUCTOS DE ABASTO (Total: S/${sectores.sectorProductos.toFixed(2)})`}
            </button>
          </h2>
          <div id="collapseAbasto" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="card mb-2">
                <label className="m-1">Arroz (kilos)</label>
                <input
                  type="number"
                  className="form-control"
                  value={abasto.arroz}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setAbasto({ ...abasto, arroz: newValor });
                    calcularAbastoTotal({ ar: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Azucar (kilos)</label>
                <input
                  type="number"
                  className="form-control"
                  value={abasto.azucar}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setAbasto({ ...abasto, azucar: newValor });
                    calcularAbastoTotal({ az: Number(newValor) });
                  }}
                />
              </div>
              <div className="card mb-2">
                <label className="m-1">Aceite (botellas)</label>
                <input
                  type="number"
                  className="form-control"
                  value={abasto.aceite}
                  placeholder="0.00"
                  onChange={(e) => {
                    const newValor = e.target.value;
                    setAbasto({ ...abasto, aceite: newValor });
                    calcularAbastoTotal({ ac: Number(newValor) });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="bg-primary"></hr>

      {/* Acordeón 6 */}
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
                    setGastosFijosDiario({
                      ...gastosFijosDiario,
                      fijo: e.target.value,
                    })
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
                    setGastosFijosDiario({
                      ...gastosFijosDiario,
                      diario: e.target.value,
                    })
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
