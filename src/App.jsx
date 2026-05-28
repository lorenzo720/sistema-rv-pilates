import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Shield,
  ListChecks,
  Trash2,
} from "lucide-react";

const STORAGE_KEY = "rv_pilates_agendamentos";

const horarios = [
  "Segunda - 07:00",
  "Segunda - 08:00",
  "Segunda - 09:00",
  "Segunda - 17:00",
  "Terça - 07:00",
  "Terça - 08:00",
  "Terça - 18:00",
  "Quarta - 09:00",
  "Quarta - 17:00",
  "Quinta - 08:00",
  "Quinta - 18:00",
  "Sexta - 07:00",
  "Sexta - 09:00",
  "Sexta - 17:00",
];

export default function App() {
  const [tela, setTela] = useState("inicio");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) setAgendamentos(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
  }, [agendamentos]);

  const horariosOcupados = useMemo(
    () => agendamentos.map((item) => item.horario),
    [agendamentos]
  );

  const horariosDisponiveis = horarios.filter(
    (h) => !horariosOcupados.includes(h)
  );

  function agendarAula() {
    if (!nome || !telefone || !horarioSelecionado) {
      alert("Preencha nome, telefone e escolha um horário.");
      return;
    }

    const novo = {
      id: Date.now(),
      nome,
      telefone,
      horario: horarioSelecionado,
      criadoEm: new Date().toLocaleString("pt-BR"),
    };

    setAgendamentos([...agendamentos, novo]);
    setNome("");
    setTelefone("");
    setHorarioSelecionado("");
    setTela("confirmado");
  }

  function desmarcar(id) {
    const confirmar = confirm("Deseja desmarcar esta aula?");
    if (!confirmar) return;

    setAgendamentos(agendamentos.filter((item) => item.id !== id));
  }

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; background: #f1f5f9; color: #0f172a; }
        button { font-family: inherit; }
        .page { min-height: 100vh; padding: 22px; background: linear-gradient(180deg, #effaff, #f8fafc); }
        .container { max-width: 1100px; margin: 0 auto; }
        .header {
          background: rgba(255,255,255,.9);
          backdrop-filter: blur(14px);
          border-radius: 28px;
          padding: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 18px 40px rgba(15,23,42,.08);
          position: sticky;
          top: 12px;
          z-index: 10;
        }
        .brand h1 { margin: 0; color: #0ea5e9; font-size: 28px; }
        .brand p { margin: 5px 0 0; color: #64748b; }
        .btn {
          border: none;
          border-radius: 999px;
          padding: 15px 22px;
          background: #0ea5e9;
          color: white;
          font-weight: 800;
          box-shadow: 0 14px 30px rgba(14,165,233,.25);
          cursor: pointer;
        }
        .hero {
          margin-top: 28px;
          border-radius: 38px;
          padding: 48px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: white;
          box-shadow: 0 22px 55px rgba(14,165,233,.28);
        }
        .hero h2 { font-size: 52px; line-height: 1; margin: 0 0 18px; }
        .hero p { font-size: 20px; line-height: 1.7; max-width: 720px; margin: 0; }
        .cards {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .card {
          border: none;
          text-align: left;
          background: white;
          border-radius: 28px;
          padding: 28px;
          min-height: 145px;
          box-shadow: 0 18px 38px rgba(15,23,42,.08);
          cursor: pointer;
          transition: .25s;
        }
        .card:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(15,23,42,.12); }
        .card svg { color: #0ea5e9; margin-bottom: 16px; }
        .card h3 { margin: 0; font-size: 21px; }
        .panel {
          margin-top: 30px;
          background: white;
          border-radius: 32px;
          padding: 30px;
          box-shadow: 0 18px 40px rgba(15,23,42,.08);
        }
        .panel h2 { margin-top: 0; font-size: 34px; }
        .form { display: grid; gap: 16px; max-width: 620px; }
        input, select {
          width: 100%;
          border: 1px solid #dbeafe;
          border-radius: 18px;
          padding: 16px;
          font-size: 16px;
          outline: none;
        }
        input:focus, select:focus { border-color: #0ea5e9; box-shadow: 0 0 0 4px rgba(14,165,233,.12); }
        .list { display: grid; gap: 14px; }
        .item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
        }
        .item strong { color: #0f172a; }
        .item p { margin: 6px 0 0; color: #64748b; }
        .danger {
          border: none;
          background: #ef4444;
          color: white;
          padding: 12px 16px;
          border-radius: 16px;
          font-weight: 800;
          cursor: pointer;
        }
        .success {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          color: #166534;
          border-radius: 24px;
          padding: 24px;
        }
        .empty {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 24px;
          padding: 24px;
          color: #64748b;
        }
        .footer {
          text-align: center;
          color: #64748b;
          padding: 35px 10px 10px;
        }

        @media (max-width: 850px) {
          .page { padding: 14px; }
          .header { border-radius: 24px; padding: 18px; }
          .brand h1 { font-size: 22px; }
          .btn { padding: 13px 18px; }
          .hero { padding: 34px 24px; border-radius: 32px; }
          .hero h2 { font-size: 40px; }
          .hero p { font-size: 18px; }
          .cards { grid-template-columns: 1fr; }
          .card { min-height: auto; }
          .panel { padding: 22px; border-radius: 28px; }
          .item { flex-direction: column; align-items: flex-start; }
          .danger { width: 100%; }
        }
      `}</style>

      <div className="page">
        <div className="container">
          <header className="header">
            <div className="brand">
              <h1>Portal RV Pilates</h1>
              <p>Sistema de agendamento</p>
            </div>
            <button className="btn" onClick={() => setTela("admin")}>
              Admin
            </button>
          </header>

          <section className="hero">
            <h2>Área do aluno</h2>
            <p>
              Agende aulas, acompanhe horários disponíveis e gerencie seu plano
              de forma simples e rápida.
            </p>
          </section>

          <section className="cards">
            <button className="card" onClick={() => setTela("agendar")}>
              <Calendar size={34} />
              <h3>Agendar aula</h3>
            </button>

            <button className="card" onClick={() => setTela("desmarcar")}>
              <XCircle size={34} />
              <h3>Desmarcar aula</h3>
            </button>

            <button className="card" onClick={() => setTela("horarios")}>
              <Clock size={34} />
              <h3>Horários disponíveis</h3>
            </button>

            <button className="card" onClick={() => setTela("admin")}>
              <Shield size={34} />
              <h3>Área administrativa</h3>
            </button>
          </section>

          {tela === "inicio" && (
            <section className="panel">
              <h2>Bem-vinda ao portal</h2>
              <p>
                Escolha uma opção acima para agendar, desmarcar ou consultar os
                horários disponíveis.
              </p>
            </section>
          )}

          {tela === "agendar" && (
            <section className="panel">
              <h2>Agendar aula</h2>

              <div className="form">
                <input
                  placeholder="Nome do aluno"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <input
                  placeholder="Telefone / WhatsApp"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />

                <select
                  value={horarioSelecionado}
                  onChange={(e) => setHorarioSelecionado(e.target.value)}
                >
                  <option value="">Escolha um horário</option>
                  {horariosDisponiveis.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>

                <button className="btn" onClick={agendarAula}>
                  Confirmar agendamento
                </button>
              </div>
            </section>
          )}

          {tela === "confirmado" && (
            <section className="panel">
              <div className="success">
                <CheckCircle size={34} />
                <h2>Agendamento confirmado!</h2>
                <p>A aula foi salva com sucesso neste dispositivo.</p>
              </div>
            </section>
          )}

          {tela === "horarios" && (
            <section className="panel">
              <h2>Horários disponíveis</h2>

              {horariosDisponiveis.length === 0 ? (
                <div className="empty">Nenhum horário disponível no momento.</div>
              ) : (
                <div className="list">
                  {horariosDisponiveis.map((h) => (
                    <div className="item" key={h}>
                      <div>
                        <strong>{h}</strong>
                        <p>Disponível para agendamento</p>
                      </div>
                      <button
                        className="btn"
                        onClick={() => {
                          setHorarioSelecionado(h);
                          setTela("agendar");
                        }}
                      >
                        Agendar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {tela === "desmarcar" && (
            <section className="panel">
              <h2>Desmarcar aula</h2>

              {agendamentos.length === 0 ? (
                <div className="empty">Nenhuma aula agendada ainda.</div>
              ) : (
                <div className="list">
                  {agendamentos.map((item) => (
                    <div className="item" key={item.id}>
                      <div>
                        <strong>{item.nome}</strong>
                        <p>{item.horario}</p>
                        <p>WhatsApp: {item.telefone}</p>
                      </div>

                      <button
                        className="danger"
                        onClick={() => desmarcar(item.id)}
                      >
                        <Trash2 size={16} /> Desmarcar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {tela === "admin" && (
            <section className="panel">
              <h2>Área administrativa</h2>

              <p>
                Total de agendamentos: <strong>{agendamentos.length}</strong>
              </p>

              {agendamentos.length === 0 ? (
                <div className="empty">Ainda não há agendamentos.</div>
              ) : (
                <div className="list">
                  {agendamentos.map((item) => (
                    <div className="item" key={item.id}>
                      <div>
                        <strong>{item.nome}</strong>
                        <p>{item.horario}</p>
                        <p>WhatsApp: {item.telefone}</p>
                        <p>Agendado em: {item.criadoEm}</p>
                      </div>

                      <button
                        className="danger"
                        onClick={() => desmarcar(item.id)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          <footer className="footer">
            RV Pilates Studio • Portal de agendamento
          </footer>
        </div>
      </div>
    </main>
  );
}
