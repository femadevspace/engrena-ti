/**
 * ! VOCÊ PROVAVELMENTE NÃO PRECISA EDITAR ESTE ARQUIVO, A MENOS QUE:
 * 1. Você queira modificar o contexto da requisição (veja Parte 1).
 * 2. Você queira criar um novo middleware ou tipo de procedimento (veja Parte 3).
 *
 * TL;DR - Aqui é onde toda a configuração do servidor tRPC é criada e conectada. As partes que você
 * precisará usar estão documentadas adequadamente perto do final.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";

/**
 * 1. CONTEXTO
 *
 * Esta seção define os "contextos" que estão disponíveis na API backend.
 *
 * Eles permitem que você acesse coisas ao processar uma requisição, como o banco de dados, a sessão, etc.
 *
 * Este helper gera os "internals" para um contexto tRPC. O manipulador de API e os clientes RSC
 * envolvem isso e fornecem o contexto necessário.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

/**
 * 2. INICIALIZAÇÃO
 *
 * Aqui é onde a API tRPC é inicializada, conectando o contexto e o transformador. Também analisamos
 * ZodErrors para que você obtenha type safety no frontend se seu procedimento falhar devido a erros
 * de validação no backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

/**
 * 3. ROUTER & PROCEDURE (A PARTE IMPORTANTE)
 *
 * Estas são as peças que você usa para construir sua API tRPC
 */

/**
 * Middleware para cronometrar a execução de procedimentos e adicionar um atraso artificial em desenvolvimento.
 *
 * Poderiamos remover isso, mas pode ajudar a detectar waterfalls indesejados simulando
 * a latência de rede que ocorreria em produção, mas não no desenvolvimento local.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // atraso artificial em dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} demorou ${end - start}ms para executar.`);

  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);
// TODO: Adicionar procedures privadas/autenticadas (ou de "admin-only")
