import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: "Arial",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "white",
            borderRadius: 30,
            padding: 25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0ea5e9",
              }}
            >
              Portal RV Pilates
            </h1>

            <p
              style={{
                marginTop: 5,
                color: "#64748b",
              }}
            >
              Sistema de agendamento
            </p>
          </div>

          <button
            style={{
              background: "#0ea5e9",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: 999,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </div>

        {/* HERO */}
        <div
          style={{
            marginTop: 30,
            background:
              "linear-gradient(135deg,#0ea5e9,#0284c7)",
            borderRadius: 40,
            padding: 50,
            color: "white",
            boxShadow: "0 20px 50px rgba(14,165,233,0.3)",
          }}
        >
          <h2
            style={{
              fontSize: 52,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Área do aluno
          </h2>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.7,
              maxWidth: 700,
            }}
          >
            Agende aulas, acompanhe horários e gerencie seu plano de forma simples e rápida.
          </p>
        </div>

        {/* CARDS */}
        <div
          style={{
            marginTop: 35,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 25,
          }}
        >
          {[
            "Agendar aula",
            "Desmarcar aula",
            "Horários disponíveis",
            "Área administrativa",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "white",
                borderRadius: 30,
                padding: 30,
                boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#0f172a",
                }}
              >
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
