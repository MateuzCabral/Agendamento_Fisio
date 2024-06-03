-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('Pendente', 'Cancelado', 'Aceito');

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "pedido_medico" TEXT NOT NULL,
    "primeira_consulta" BOOLEAN NOT NULL,
    "data_agendamento" TIMESTAMP(3),
    "status" "StatusAgendamento" NOT NULL DEFAULT 'Pendente',
    "idPaciente" INTEGER NOT NULL,
    "idFisioterapeuta" INTEGER,
    "idCoordenador" INTEGER,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);
