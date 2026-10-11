// Build information and process of all modal dialogs such as import, export, clear, etc.

// The confirm handler of whichever dialog is open
let activeConfirmHandler = null;

// Gets every element the shared dialog is built out of
export function getModalElements() {
    return {
        overlay: document.getElementById("modalOverlay"),
        title: document.getElementById("modalTitle"),
        message: document.getElementById("modalMessage"),
        notes: document.getElementById("modalNotes"),
        link: document.getElementById("modalLink"),
        code: document.getElementById("modalCode"),
        error: document.getElementById("modalError"),
        confirm: document.getElementById("modalConfirm"),
        cancel: document.getElementById("modalCancel"),
        fields: document.getElementById("modalFields"),
        presetName: document.getElementById("modalPresetName"),
        presetColor: document.getElementById("modalPresetColor"),
        presetSwatch: document.getElementById("modalPresetSwatch")
    };
}

// Builds the dialog out of the given config and shows it
export function openModal(config) {
    const modal = getModalElements();
    if (!modal.overlay) return;
    activeConfirmHandler = config.onConfirm || null;
    modal.error.textContent = "";
    modal.title.textContent = config.title;
    modal.message.textContent = config.message || "";
    fillModalNotes(modal, config.notes);
    fillModalLink(modal, config.link);
    modal.fields.classList.toggle("hidden", !config.showFields);
    modal.code.classList.toggle("hidden", !config.code);
    if (config.code) {
        modal.code.readOnly = Boolean(config.code.readOnly);
        modal.code.value = config.code.value || "";
    }
    modal.confirm.textContent = config.confirmLabel;
    modal.confirm.disabled = false;
    modal.cancel.classList.toggle("hidden", !config.cancelLabel);
    if (config.cancelLabel) {
        modal.cancel.textContent = config.cancelLabel;
    }
    modal.overlay.classList.add("open");
    config.onOpen?.(modal);
    focusModalTarget(modal, config.focus);
}

// Rebuilds the dialog's bullet list
function fillModalNotes(modal, notes) {
    if (!modal.notes) return;
    modal.notes.replaceChildren();
    modal.notes.classList.toggle("hidden", !notes?.length);
    for (const note of notes || []) {
        const noteItem = document.createElement("li");
        noteItem.textContent = note;
        modal.notes.append(noteItem);
    }
}

// Shows or hides the dialog's link
function fillModalLink(modal, link) {
    if (!modal.link) return;
    modal.link.classList.toggle("hidden", !link);
    if (!link) return;
    modal.link.textContent = link.label;
    modal.link.href = link.url;
}

// Focuses whichever part of the dialog the config asks for
function focusModalTarget(modal, focusTarget) {
    if (focusTarget === "confirm") {
        modal.confirm.focus();
        return;
    }
    if (focusTarget === "code" || focusTarget === "code-select") {
        modal.code.focus();
        if (focusTarget === "code-select") {
            modal.code.select();
        }
        return;
    }
    if (focusTarget === "name") {
        modal.presetName.focus();
        modal.presetName.select();
        return;
    }
    modal.cancel.focus();
}

// Closes the dialog and forgets its confirm handler
export function closeModal() {
    activeConfirmHandler = null;
    document.getElementById("modalOverlay")?.classList.remove("open");
}

// Attaches handlers at startup, keeping the dialog open to show an error when its confirm handler returns one
export function attachModalHandlers() {
    const modal = getModalElements();
    modal.confirm?.addEventListener("click", async () => {
        const handler = activeConfirmHandler;
        if (!handler) {
            closeModal();
            return;
        }
        modal.confirm.disabled = true;
        try {
            const result = (await handler(modal)) || {};
            if (activeConfirmHandler !== handler) return;
            if (result.error) {
                modal.error.textContent = result.error;
                return;
            }
            closeModal();
        } finally {
            modal.confirm.disabled = false;
        }
    });
    modal.cancel?.addEventListener("click", closeModal);
    modal.overlay?.addEventListener("click", (event) => {
        if (event.target === modal.overlay) closeModal();
    });
}