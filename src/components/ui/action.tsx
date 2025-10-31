"use client";

import { MoreHorizontalIcon, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";

import { api } from "~/trpc/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LoadingSwap } from "./loading-swap";

// --- Definição de Tipos --- //
type ActionFunction = ({
  utils,
  router,
}: {
  utils: ReturnType<typeof api.useUtils>;
  router: ReturnType<typeof useRouter>;
}) => Promise<{ error: boolean; message?: string }>;

type ActionBase = {
  id: string;
  icon: LucideIcon;
  label: string;
  danger?: boolean;
  disabled?: boolean;
};

/**
 * Ação Rápida Simples: Executada com um único clique.
 */
type QuickActionSimple = ActionBase & {
  type: "quick";
  danger?: false;
  requireConfirmation?: false;
  onClick: ActionFunction;
};

/**
 * Ação Rápida com Confirmação: Exige um dialog de confirmação.
 * Toda ação `danger: true` deve usar este tipo.
 */
type QuickActionConfirm = ActionBase & {
  type: "quick";
  requireConfirmation: true;
  onConfirm: ActionFunction;
  confirmationDescription?: ReactNode;
};

/**
 * Ação Completa: Abre um dialog com conteúdo customizado (ex: formulário).
 */
type FullAction = ActionBase & {
  type: "full";
  modal: {
    title: ReactNode;
    description?: ReactNode;
    content: ReactNode;
    onSubmit: ActionFunction;
  };
};

type Action = QuickActionSimple | QuickActionConfirm | FullAction;

// --- Componentes Auxiliares --- //
function ActionButton({
  action,
  onTrigger,
  isLoading,
  loadingActionId,
}: {
  action: Action;
  onTrigger: (action: Action) => void;
  isLoading: boolean;
  loadingActionId: string | null;
}) {
  const { icon: Icon, label, danger, disabled, type } = action;

  /**
   * O estado de loading só é exibido no botão para ações rápidas simples.
   * Ações de dialog (confirmação ou completas) mostram o loading dentro do dialog.
   */
  const isButtonLoading =
    type === "quick" &&
    !action.requireConfirmation &&
    action.id === loadingActionId;

  return (
    <Button
      variant={danger ? "destructive" : "default"}
      disabled={(disabled ?? false) || isLoading}
      onClick={() => onTrigger(action)}
    >
      <LoadingSwap
        isLoading={isButtonLoading}
        className="inline-flex items-center gap-2"
      >
        <Icon />
        {label}
      </LoadingSwap>
    </Button>
  );
}

/**
 * Renderiza o conteúdo do AlertDialog,
 * seja para confirmação (QuickActionConfirm)
 * ou para ação completa (FullAction).
 */
function ActionDialogContent({
  action,
  isLoading,
  onConfirm,
}: {
  action: Action;
  isLoading: boolean;
  onConfirm: () => void;
}) {
  switch (action.type) {
    case "full": {
      const { title, description, content } = action.modal;
      const { icon: SubmitIcon, label: submitLabel, danger } = action;

      return (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>

          {/* Renderiza o formulário ou conteúdo interativo */}
          <div>{content}</div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              isDangerous={danger}
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
            >
              <LoadingSwap
                isLoading={isLoading}
                className="flex items-center gap-2"
              >
                <SubmitIcon />
                {submitLabel}
              </LoadingSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      );
    }

    case "quick": {
      if (!action.requireConfirmation) return null;

      const {
        icon: ConfirmIcon,
        label: confirmationLabel = "Confirmar",
        confirmationDescription = "Esta ação não pode ser desfeita.",
        danger,
      } = action;

      return (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              isDangerous={danger}
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
            >
              <LoadingSwap
                isLoading={isLoading}
                className="flex items-center gap-2"
              >
                <ConfirmIcon />
                {confirmationLabel}
              </LoadingSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      );
    }
    default:
      return null;
  }
}

// --- Componente Principal --- //
function ActionsGroup({ actions }: { actions: [Action, ...Action[]] }) {
  const [openedAction, setOpenedAction] = useState<Action | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);
  const utils = api.useUtils();
  const router = useRouter();

  const handleAction = async (
    action: Action,
    actionFn: ActionFunction,
    options: {
      /** Fecha o dialog mesmo se houver erro (ex: confirmação) */
      closeOnFinish: boolean;
      /** Fecha o dialog apenas se for bem-sucedido (ex: formulário) */
      closeOnSuccessOnly: boolean;
    },
  ) => {
    if (isLoading) return;
    setLoadingActionId(action.id);

    startTransition(async () => {
      const { closeOnFinish, closeOnSuccessOnly } = options;
      try {
        const data = await actionFn({ utils, router });

        if (data.error) {
          console.error(data.message ?? "Ocorreu um erro.");
          // toast.error(data.message ?? "Ocorreu um erro.");
          if (closeOnFinish) setOpenedAction(null);
          return;
        }
        if (closeOnFinish || closeOnSuccessOnly) setOpenedAction(null);
      } catch (e) {
        console.error(e instanceof Error ? e.message : "Ocorreu um erro.");
        //toast.error("Ocorreu um erro inesperado.");
        if (closeOnFinish) setOpenedAction(null);
      } finally {
        setLoadingActionId(null);
      }
    });
  };

  /**
   * Chamado pelo clique no ActionButton ou DropdownMenuItem.
   * Decide se executa a ação diretamente ou abre o dialog.
   */
  const onTrigger = (action: Action) => {
    if (isLoading) return;

    // Ação rápida simples: executa imediatamente
    if (action.type === "quick" && !action.requireConfirmation)
      return handleAction(action, action.onClick, {
        // Nada para fechar
        closeOnFinish: false,
        closeOnSuccessOnly: false,
      });

    // Ação de confirmação ou completa: abre o dialog
    return setOpenedAction(action);
  };

  const onDialogConfirm = () => {
    if (!openedAction || isLoading) return;

    // Dialog de Ação Completa: fecha apenas no sucesso
    if (openedAction.type === "full") {
      return handleAction(openedAction, openedAction.modal.onSubmit, {
        closeOnFinish: false,
        closeOnSuccessOnly: true,
      });
    }

    // Dialog de confirmação: fecha ao finalizar (sucesso ou erro)
    if (openedAction.type === "quick" && openedAction.requireConfirmation)
      return handleAction(openedAction, openedAction.onConfirm, {
        closeOnFinish: true,
        closeOnSuccessOnly: false,
      });
  };

  const onDialogCancel = () => (isLoading ? null : setOpenedAction(null));

  const renderActions = () => {
    if (actions.length <= 2)
      return (
        <div className="flex items-center gap-2">
          {actions.map((action) => (
            <ActionButton
              key={action.id}
              action={action}
              onTrigger={onTrigger}
              isLoading={isLoading}
              loadingActionId={loadingActionId}
            />
          ))}
        </div>
      );

    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            aria-label="Abrir menu de ações"
            size="icon"
            disabled={isLoading}
          >
            <LoadingSwap isLoading={isLoading}>
              <MoreHorizontalIcon />
            </LoadingSwap>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            {actions.map((action) => (
              <DropdownMenuItem
                key={action.id}
                disabled={(action.disabled ?? false) || isLoading}
                variant={action.danger ? "destructive" : undefined}
                onSelect={() => onTrigger(action)}
              >
                <action.icon />
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      {renderActions()}

      <AlertDialog
        open={openedAction !== null}
        onOpenChange={(open) => {
          if (!open) onDialogCancel();
        }}
      >
        {openedAction && (
          <ActionDialogContent
            action={openedAction}
            isLoading={isLoading}
            onConfirm={onDialogConfirm}
          />
        )}
      </AlertDialog>
    </>
  );
}

export { ActionsGroup, type Action };
