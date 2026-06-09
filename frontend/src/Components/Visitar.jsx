// import React, { useState } from "react";

export default function Visitar() {
  return (
    <div className="text-start p-2">
      <h3 className="mb-3 text-center">Agendar visita</h3>
      <form onSubmit="">
        <div className="mb-3">
          <label className="form-label">Dia</label>
          <input
            className="form-control"
            type="date"
            name="date"
            format="DD-MM-YYYY"
            range="06-07-2026 - 10-07-2026"
            placeholder="Ingresá un día la semana del 6 al 10 de julio de 2026"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            className="form-control"
            type="time"
            name="time"
            range="09:00-18:00"
            placeholder="Ingresá un horario entre las 9:00 y las 18:00"
            required
          />
        </div>
        <button
          className="btn btn-success w-100 mt-2"
          onClick={() => alert("¡Visita agendada correctamente!")}
        >
          Solicitar visita
        </button>
      </form>
    </div>
  );
}
